import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { ConfirmationDialogService } from '../../../../app/confirmation-dialog/confirmation-dialog.service';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-usergroup-edit',
    templateUrl: './usergroup-edit.component.html',
    styleUrls: ['./usergroup-edit.component.scss']
})

export class UsergroupEditComponent implements OnInit {
    usersPermissions: any;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('status') status: TemplateRef<any>;
    toaster: any;
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });
    rows = [];
    columns = [];
    customerData: any;
    res: any;
    forEach: any;
    loadingIndicator: boolean = true;
    final: any;
    userGroupId: any;
    userGroupName: any;
    id: any;
    selectedUserList = [];

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private confirmationDialogService: ConfirmationDialogService,
        private commonService: CommonService) { }

    async ngOnInit() {
        this.usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (await this.checkViewPermission()) {
            this.id = JSON.parse(localStorage.getItem('userGroupid'));
            this.setColumn();
            this.setPageData();
        }
    }

    setColumn() {
        this.columns = [
            {
                prop: 'selected',
                name: '',
                headerCheckboxable: true,
                checkboxable: true
            },
            { prop: 'UserId' },
            { prop: 'Username' },
            { prop: 'VIPLavel' },
            { prop: 'CountDeposit' },
            { prop: 'TotalDepositAmount' },
            { prop: 'CreatedDateTime' },
            { prop: 'LastModifyDateTime' },
            { prop: 'Action', cellTemplate: this.status, sortable: false }
        ];
    }

    setPageData(search = null) {
        this.loadingIndicator = true;

        let model = {
            searchParam: search,
            id: this.id,
            fromDate: null,
            toDate: null,
            pageSize: null,
            pageNo: null,
            orderBy: null
        }

        this.adminService.add<any>(customer.userGroupList, model).subscribe(res => {
            let i = 0;
            this.rows = [];

            this.userGroupId = res.data[0].groupId;
            this.userGroupName = res.data[0].groupName;

            this.getUsersUserGroup(model.searchParam);
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    getUsersUserGroup(search = null) {
        let model = {
            searchParam: search,
            id: this.id,
            fromDate: null,
            toDate: null,
            pageSize: null,
            pageNo: null,
            orderBy: null
        }

        this.adminService.add<any>(customer.userGroupUserList, model).subscribe(res => {
            let i = 0;
            this.rows = [];
            this.customerData = res.data;

            res.data.forEach(el => {
                this.rows.push({
                    id: el.id,
                    UserId: el.userId,
                    UsersId: el.usersId,
                    Username: el.userName,
                    VIPLavel: el.VIPLevelName,
                    CountDeposit: el.depositCount,
                    TotalDepositAmount: el.depositAmount,
                    CreatedDateTime: this.replaceDateTime(el.created),
                    LastModifyDateTime: this.replaceDateTime(el.modified)
                });
                this.rows = [...this.rows]
                this.loadingIndicator = false;
            })
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region Replace "T" from date time

    replaceDateTime(date) { return date.replace("T", " "); }

    //#endregion Replace "T" from date time

    //#region Delete

    async openRejectConfirmationDialog(id) {
        if (await this.checkUpdatePermission()) {
            let userName = this.customerData.find(item => item.id === id).userName;
            let userGroup = this.customerData.find(item => item.id === id).groupName;

            this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete user ' + userName + ' from ' + userGroup + ' user group?')
                .then((confirmed) => {
                    this.final = confirmed
                    this.deleteCustomer(id)
                });
        }
    }

    deleteCustomer(id) {
        if (this.final == true) {
            let model =
            {
                id: id
            };

            this.adminService.add<any>(customer.userGroupUserDelete, model).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.ngOnInit();
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    async openRejectConfirmationDialogForSelectedCustomer() {
        if (await this.checkUpdatePermission()) {
            if (this.isUserSelected()) {
                this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete selected user from ' + this.userGroupName + ' user group?')
                    .then((confirmed) => {
                        this.final = confirmed;
                        this.deleteSelectedCustomer(this.selectedUserList);
                    });
            }
        }
    }

    deleteSelectedCustomer(idList) {
        if (this.final == true) {
            let model =
            {
                userGroupId: this.id,
                usersIdList: idList.map(function (a) { return a.UsersId; })
            };

            this.adminService.add<any>(customer.userGroupUserDelete, model).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.selectedUserList = [];
                this.ngOnInit();
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#endregion Delete

    //#region Update User Group Name

    async updateUserGroupName() {
        if (await this.checkUpdatePermission()) {
            let userGroupName = (document.getElementById("txt_usergroupname") as HTMLInputElement).value;

            if (userGroupName == undefined || userGroupName == null || userGroupName == '') this.toasterService.pop('error', 'Error', this.commonService.errorMessage.InvalidateUserGroupName);

            let model = {
                id: this.id,
                name: userGroupName
            }

            this.adminService.add<any>(customer.userGroupUpdate, model).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.ngOnInit();
            }, error => {
                this.loadingIndicator = false;
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#endregion Update User Group Name

    //#region Search

    Search() {
        let searchParm = (document.getElementById("txt_search") as HTMLInputElement).value;

        this.getUsersUserGroup(searchParm);
    }

    //#endregion Search

    //#region Onselect on checkbox

    onSelect({ selected }) {
        // console.log('Select Event', selected, this.selectedUserList);

        this.selectedUserList.splice(0, this.selectedUserList.length);
        this.selectedUserList.push(...selected);
    }

    //#endregion Onselect on checkbox

    isUserSelected() {
        if (this.selectedUserList == null || this.selectedUserList.length == 0) {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectAtLeastOneUser);

            return false;
        }
        else return true;
    }

    //#region Check Permission

    async checkViewPermission() {
        if (this.usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (this.usersPermissions.permissionsList[1].submenu[14].Permissions[0].IsChecked === true) {
                return true;
            }
            else {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkUpdatePermission() {
        if (this.usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (this.usersPermissions.permissionsList[1].submenu[14].Permissions[1].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkAddPermission() {
        if (this.usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
            if (this.usersPermissions.permissionsList[1].submenu[14].Permissions[2].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    //#endregion Check Permission
}