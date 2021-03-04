import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { account, ErrorMessages } from '../../../../environments/environment';
import { ConfirmationDialogService } from '../../../../app/confirmation-dialog/confirmation-dialog.service';
import { debounce } from 'rxjs/operators';

@Component({
    selector: 'app-bank-list',
    templateUrl: './bank-list.component.html',
    styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent implements OnInit {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('status') status: TemplateRef<any>;
    @ViewChild('action') action: TemplateRef<any>;
    rows = [];
    bankData: any;
    columns = [];
    loadingIndicator: boolean;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            this.setPageData();
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'No', width: 25 },
            { prop: 'BankName' },
            { prop: 'BankLogo' },
            { prop: 'BankIconLogo' },
            { prop: 'AccountName' },
            { prop: 'AccountNo' },
            { prop: 'Created' },
            { prop: 'Action', cellTemplate: this.status, sortable: false, width: 250 }
        ];
    }

    setPageData() {
        this.loadingIndicator = true;
        this.adminService.get<any>(account.adminbanklist).subscribe(res => {
            let i = 0;
            this.rows = [];
            this.bankData = res.data.bankDetails;
            res.data.bankDetails.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Id: el.id,
                    BankName: el.BankName != null ? el.BankName : "<b>Not Available</b>",
                    BankLogo: el.BankLogo != null ? "<img src= '" + el.BankLogo + "' height=30px width=90px/>" : "<b>Not Available</b>",
                    BankIconLogo: el.BankLogo != null ? "<img src= '" + el.BankIconLogo + "' height=30px width=30px/>" : "<b>Not Available</b>",
                    AccountName: el.AccountName != null ? el.AccountName : "<b>Not Available</b>",
                    Created: el.Created != null ? el.Created : "<b>Not Available</b>",
                    AccountNo: el.AccountNo != null ? el.AccountNo : "<b>Not Available</b>",
                });
                this.loadingIndicator = false;
                this.rows = [...this.rows]
            })
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    async navigateEdit(BankData) {
        if (await this.checkUpdatePermission()) {
            localStorage.setItem('data', JSON.stringify(BankData));
            this.router.navigate(['/admin/customers/bank-edit']);
        }
    }

    async manualUpdateEvent(id, value: boolean) {
        if (await this.checkUpdatePermission()) {
            let data = {
                id: id,
                active: value
            }
            this.adminService.add<any>(account.adminBankStatus, data).subscribe(res => {
                if (value == true)
                    this.toasterService.pop('success', 'Success', "Bank is active.");
                else
                    this.toasterService.pop('success', 'Success', "Bank is deactive.");
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    async navigateAdd() {
        if (await this.checkAddPermission()) this.router.navigate(['/admin/customers/bank-add']);
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[3].Permissions[0].IsChecked === true) {
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

    async checkUpdatePermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[3].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[3].Permissions[2].IsChecked === true) {
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