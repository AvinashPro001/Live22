import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { ConfirmationDialogService } from '../../../../app/confirmation-dialog/confirmation-dialog.service';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-usergroup-list',
    templateUrl: './usergroup-list.component.html',
    styleUrls: ['./usergroup-list.component.scss']
})

export class UsergroupListComponent implements OnInit {
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

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private confirmationDialogService: ConfirmationDialogService,
        private modalService: NgbModal,
        private commonService: CommonService) { }

    async ngOnInit() {
        this.usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (await this.checkViewPermission()) {
            this.setColumn();
            this.setPageData();
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'GroupId' },
            { prop: 'UserGroupName' },
            { prop: 'CreatedDateTime' },
            { prop: 'LastModifyDateTime' },
            { prop: 'Action', cellTemplate: this.status, sortable: true, width: 250 }
        ];
    }

    setPageData(search = null) {
        this.loadingIndicator = true;

        let model = {
            searchParam: search,
            id: null,
            fromDate: null,
            toDate: null,
            pageSize: null,
            pageNo: null,
            orderBy: null
        }

        this.adminService.add<any>(customer.userGroupList, model).subscribe(res => {
            let i = 0;
            this.rows = [];
            this.customerData = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    id: el.id,
                    active: el.active,
                    GroupId: el.groupId,
                    UserGroupName: el.groupName,
                    CreatedDateTime: this.replaceDateTime(el.created),
                    LastModifyDateTime: this.replaceDateTime(el.modified),
                });
                this.rows = [...this.rows]
                this.loadingIndicator = false;
            })
            this.loadingIndicator = false;

            //debugger;

            //var result = this.customerData.map(function (a) { return a.id; });
            //console.log(result)

            //let data = {
            //    userIdList: JSON.stringify(result)
            //};

            //console.log(data);
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
            let groupName = this.customerData.find(item => item.id === id).groupName;
            this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete ' + groupName + ' user group?')
                .then((confirmed) => {
                    this.final = confirmed
                    this.deleteCustomer(id)
                });
        }
    }

    deleteCustomer(id) {
        if (this.final == true) {
            let model = {
                id: id,
                active: "true"
            }
            this.adminService.add<any>(customer.userGroupDelete, model).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.ngOnInit();
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#endregion Delete

    //#region Active/InActive

    async manualUpdateEvent(id, value: boolean) {
        if (await this.checkUpdatePermission())
            this.rejectCustomer(id, value);
    }

    rejectCustomer(id, value) {
        let groupName = this.customerData.find(item => item.id === id).groupName;

        let model = {
            id: id,
            active: value
        }

        this.adminService.add<any>(customer.userGroupUpdateStatus, model).subscribe(res => {
            if (value == true) this.toasterService.pop('success', 'Success', groupName + " UserGroup is active.");
            else this.toasterService.pop('success', 'Success', groupName + " UserGroup is deactive.");
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion Active/InActive

    searchHandler(event) {
        if (event.target.value.length >= 3)
            if (event.target.value) this.setPageData(event.target.value);
            else this.setPageData("");
        else if (event.target.value.length == 0) this.setPageData("");
    }

    openWindowCustomClass(content) {
        this.modalService.open(content, { windowClass: 'dark-modal', });
    }

    //#region Navigate to add admin page

    async navigateAdd() {
        if (await this.checkAddPermission()) this.router.navigate(['/admin/customers/usergroup-add']);
    }

    //#endregion Navigate to add admin page

    //#region Navigate to edit admin page

    async navigateEdit(userGroupid) {
        if (await this.checkUpdatePermission()) {
            localStorage.setItem('userGroupid', JSON.stringify(userGroupid));
            this.router.navigate(['/admin/customers/usergroup-edit']);
        }
    }

    //#endregion Navigate to edit admin page

    //#region Check Permission

    async checkViewPermission() {
        if (this.usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (this.usersPermissions.permissionsList[1].submenu[12].Permissions[0].IsChecked === true) {
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
            if (this.usersPermissions.permissionsList[1].submenu[12].Permissions[1].IsChecked === true) {
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
            if (this.usersPermissions.permissionsList[1].submenu[12].Permissions[2].IsChecked === true) {
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