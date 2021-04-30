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
    selector: 'app-admin-list',
    templateUrl: './admin-list.component.html',
    styleUrls: ['./admin-list.component.scss']
})

export class AdminListComponent implements OnInit {
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

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private confirmationDialogService: ConfirmationDialogService,
        private modalService: NgbModal,
        private commonService: CommonService) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            this.setPageData("");
        }
    }

    setColumn() {
        this.columns = [
            //{ prop: 'No', sortable: false },
            { prop: 'id', sortable: false },
            { prop: 'username', sortable: false },
            { prop: 'name', sortable: false },
            { prop: 'createdBy', sortable: false },
            { prop: 'modifiedDateTime', sortable: false },
            { prop: 'Action', cellTemplate: this.status, sortable: true, width: 250 }
        ];
    }

    setPageData(search) {
        this.loadingIndicator = true;

        let data = {
            keyword: search
        }

        this.adminService.add<any>(customer.adminList, data).subscribe(res => {
            let i = 0;
            this.rows = [];
            this.customerData = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    //No: ++i,
                    id: el.UserId,
                    username: el.username != null ? el.username : "<b  class='notAvailable'>Not Available</b>",
                    name: el.name != null ? el.name : "<b class='notAvailable'>Not Available</b>",
                    createdBy: el.CreatedBy != null ? "<b class='Available'>" + el.CreatedBy + "</b>" : "<b class='notAvailable'>Not Available</b>",
                    modifiedDateTime: el.Modified != null ? this.replaceDateTime(el.Modified) : "<b class='notAvailable'>Not Available</b>"
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

    replaceDateTime(date) {
        return date.replace("T", " ");
    }

    //#endregion Replace "T" from date time

    //#region Delete

    async openRejectConfirmationDialog(id) {
        if (await this.checkUpdatePermission()) this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete admin?')
            .then((confirmed) => {
                this.final = confirmed
                this.deleteCustomer(id)
            });
    }

    deleteCustomer(id) {
        if (this.final == true) {
            let data = {
                id: id,
                active: "true"
            }
            this.adminService.add<any>(customer.customerDelete, data).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.ngOnInit();
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#endregion Delete

    //#region Active/InActive

    rejectCustomer(id, value) {
        let data = {
            id: id,
            active: value
        }
        this.adminService.add<any>(customer.customerStatus, data).subscribe(res => {
            if (value == true)
                this.toasterService.pop('success', 'Success', "Customer is active.");
            else
                this.toasterService.pop('success', 'Success', "Customer is deactive.");
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion

    async manualUpdateEvent(id, value: boolean) {
        if (await this.checkUpdatePermission()) this.rejectCustomer(id, value)
    }

    searchHandler(event) {
        let data;

        if (event.target.value.length >= 3) {
            if (event.target.value) {
                data = {
                    SearchParam: event.target.value,
                }
                this.searchString = event.target.value,
                    this.setPageData(data.SearchParam)
            } else {
                data = {
                    SearchParam: ""
                }
                this.setPageData(data.SearchParam)
            }
        }
        if (event.target.value.length == 0) {
            data = {
                SearchParam: ""
            }
            this.setPageData(data.SearchParam)
        }
    }

    async show(row, content) {
        //this.viewData = row;
        //this.openWindowCustomClass(content);

        localStorage.setItem('id', JSON.stringify(row));
        window.open('admin/customers/users-details', '_blank');
    }

    openWindowCustomClass(content) {
        this.modalService.open(content, { windowClass: 'dark-modal', });
    }

    //#region Navigate to add admin page

    async navigateAdd() {
        if (await this.checkAddPermission()) this.router.navigate(['/admin/customers/admin-add']);
    }

    //#endregion Navigate to add admin page

    //#region Navigate to edit admin page

    async navigateEdit(customerData) {
        if (await this.checkUpdatePermission()) {
            localStorage.setItem('adminData', JSON.stringify(customerData));
            this.router.navigate(['/admin/customers/admin-edit']);
        }
    }

    //#endregion Navigate to edit admin page

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[12].Permissions[0].IsChecked === true) {
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
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[12].Permissions[1].IsChecked === true) {
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
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[12].Permissions[2].IsChecked === true) {
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