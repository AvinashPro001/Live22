import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { ConfirmationDialogService } from '../../../../app/confirmation-dialog/confirmation-dialog.service';
import { account, customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-admin/customer/retrive-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})

export class CustomerListComponent implements OnInit {
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
    loadingIndicator: boolean;
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
        this.Profile();     // To check user token expire or not.
        if (await this.checkViewPermission()) {
            this.setColumn();
            // this.setPageData("");
        }
    }

    Profile() {
        let data = {}
        this.adminService.add<any>(account.profile, data).subscribe(res => {
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);

            if (error.error.message === "Your access token is expired, please login again.") {
                localStorage.removeItem('currentUser');
                this.router.navigate(['/']);
            }
        });
    }

    setColumn() {
        this.columns = [
            { prop: 'No', sortable: false },
            { prop: 'Username', sortable: false },
            { prop: 'FullName', sortable: false },
            { prop: 'ICNumber', sortable: false },
            { prop: 'MobileNo', sortable: false },
            { prop: 'BankName', sortable: false },
            { prop: 'BankAccount', sortable: false },
            { prop: 'RegisterDate', sortable: false },
            { prop: 'Action', cellTemplate: this.status, sortable: true, width: 250 }
        ];
    }

    setPageData(search) {
        this.loadingIndicator = true;
        let data = {
            keyword: search
        }
        this.adminService.add<any>(customer.customerList, data).subscribe(res => {
            let i = 0;
            this.rows = [];
            this.customerData = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Id: el.id,
                    Username: el.username != null ? el.username : "<b  class='notAvailable'>Not Available</b>",
                    FullName: el.name != null ? el.name : "<b class='notAvailable'>Not Available</b>",
                    ICNumber: el.userICNumber != null ? "<b class='Available'>" + el.userICNumber + "</b>" : "<b class='notAvailable'>Not Available</b>",
                    MobileNo: el.mobileNo != null ? el.mobileNo : "<b class='notAvailable'>Not Available</b>",
                    BankName: el.bankName != null ? el.bankName : "<b class='notAvailable'>Not Available</b>",
                    BankAccount: el.accountNo != null ? el.accountNo : "<b class='notAvailable'>Not Available</b>",
                    RegisterDate: this.replaceDateTime(el.registeredOn)
                });
                this.rows = [...this.rows]
                this.loadingIndicator = false;
            })
        }, error => {
            this.rows = [];
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    replaceDateTime(date) {
        return date.replace("T", " ");
    }

    //#region timeFormat
    toDate(date) {
        if (date === void 0) {
            return new Date(0);
        }
        if (this.isDate(date)) {
            return date;
        } else {
            return new Date(parseFloat(date.toString()));
        }
    }
    isDate(date) {
        return (date instanceof Date);
    }
    time(date, format) {
        var d = this.toDate(date);
        return format
            .replace(/Y/gm, d.getFullYear().toString())
            .replace(/m/gm, ('0' + (d.getMonth() + 1)).substr(-2))
            .replace(/d/gm, ('0' + (d.getDate())).substr(-2))
            .replace(/H/gm, ('0' + (d.getHours() + 0)).substr(-2))
            .replace(/i/gm, ('0' + (d.getMinutes() + 0)).substr(-2))
            .replace(/s/gm, ('0' + (d.getSeconds() + 0)).substr(-2))
            .replace(/v/gm, ('0000' + (d.getMilliseconds() % 1000)).substr(-3));
    }
    //#endregion

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

    async openRejectConfirmationDialog(id) {
        if (await this.checkUpdatePermission()) this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete customer?')
            .then((confirmed) => {
                this.final = confirmed
                this.deleteCustomer(id)
            });
    }

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

    async navigateEdit(customerData) {
        if (await this.checkUpdatePermission()) {
            localStorage.setItem('data', JSON.stringify(customerData));
            this.router.navigate(['/admin/customers/customer-edit']);
        }
    }

    async manualUpdateEvent(id, value: boolean) {
        if (await this.checkUpdatePermission()) this.rejectCustomer(id, value);
    }

    searchHandler() {
        var parameter = ((document.getElementById("searchText") as HTMLInputElement).value)
        if (parameter != "") {
            var data = {
                SearchParam: parameter,
            }

            this.setPageData(data.SearchParam)
        }
    }

    show(row, content) {
        //this.viewData = row;
        //this.openWindowCustomClass(content);

        localStorage.setItem('id', JSON.stringify(row));
        window.open('admin/customers/users-details', '_blank');
    }

    openWindowCustomClass(content) {
        this.modalService.open(content, { windowClass: 'dark-modal', });
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[0].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[0].submenu[1].Permissions[0].IsChecked === true) {
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

    async checkUpdatePermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[0].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[0].submenu[1].Permissions[1].IsChecked === true) {
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
        if (usersPermissions.permissionsList[0].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[0].submenu[1].Permissions[2].IsChecked === true) {
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