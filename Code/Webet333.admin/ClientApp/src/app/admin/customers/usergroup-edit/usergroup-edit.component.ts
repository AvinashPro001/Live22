import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { ConfirmationDialogService } from '../../../../app/confirmation-dialog/confirmation-dialog.service';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-usergroup-edit',
    templateUrl: './usergroup-edit.component.html',
    styleUrls: ['./usergroup-edit.component.scss']
})

export class UsergroupEditComponent implements OnInit {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('status') status: TemplateRef<any>;
    @ViewChild('action') action: TemplateRef<any>;
    toaster: any;
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });
    rows = [];
    columns = [];
    totalRecords = 0;
    filteredData = [];
    customerData: any;
    soritngColumn = "";
    searchString = "";
    res: any;
    forEach: any;
    manualUpdate: any;
    loadingIndicator: boolean = true;
    final: any;
    viewData: any;
    userGroupId: any;
    userGroupName: any;
    id: any;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private confirmationDialogService: ConfirmationDialogService,
        private modalService: NgbModal) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            // this.id = JSON.parse(localStorage.getItem('userGroupid'));
            this.id = 'F69B38A3-E157-4D56-ACFB-76D6CDD3E13D';

            this.setColumn();
            this.setPageData();
        }
    }

    setColumn() {
        this.columns = [
            {
                prop: 'selected',
                name: '',
                sortable: false,
                canAutoResize: false,
                draggable: false,
                resizable: false,
                headerCheckboxable: true,
                checkboxable: true,
                width: 30
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

        let data = {
            searchParam: search,
            id: this.id,
            fromDate: null,
            toDate: null,
            pageSize: null,
            pageNo: null,
            orderBy: null
        }

        this.adminService.add<any>(customer.userGroupList, data).subscribe(res => {
            let i = 0;
            this.rows = [];

            this.userGroupId = res.data[0].groupId;
            this.userGroupName = res.data[0].groupName;

            this.getUsersUserGroup(data.searchParam);
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    getUsersUserGroup(search = null) {
        let data = {
            searchParam: search,
            id: this.id,
            fromDate: null,
            toDate: null,
            pageSize: null,
            pageNo: null,
            orderBy: null
        }

        this.adminService.add<any>(customer.userGroupUserList, data).subscribe(res => {
            let i = 0;
            this.rows = [];
            this.customerData = res.data;

            res.data.forEach(el => {
                this.rows.push({
                    UserId: el.userId,
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
            let data =
            {
                id: id
            };

            this.adminService.add<any>(customer.userGroupUserDelete, data).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.ngOnInit();
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#endregion Delete

    //#region Update User Group Name

    updateUserGroupName() {
        let userGroupName = (document.getElementById("txt_usergroupname") as HTMLInputElement).value;

        if (userGroupName == undefined || userGroupName == null || userGroupName == '') this.toasterService.pop('error', 'Error', 'Invalid UserGroup Name!!');

        let data = {
            id: this.id,
            name: userGroupName
        }

        this.adminService.add<any>(customer.userGroupUpdate, data).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            this.ngOnInit();
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion Update User Group Name

    //#region Search

    Search() {
        let searchParm = (document.getElementById("txt_search") as HTMLInputElement).value;

        this.getUsersUserGroup(searchParm);
    }

    //#endregion Search

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[12].Permissions[0].IsChecked === true) {
                return true;
            }
            else {
                this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkUpdatePermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[12].Permissions[1].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkAddPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[12].Permissions[2].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    //#endregion Check Permission
}