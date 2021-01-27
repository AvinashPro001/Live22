import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-users-register-report',
    templateUrl: './users-register-report.component.html',
    styleUrls: ['./users-register-report.component.scss']
})
export class UsersRegisterReportComponent implements OnInit {

    rows = [];
    columns = [];
    loadingIndicator: boolean;
    Data: any;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router
    ) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            this.setPageData();
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'Username' },
            { prop: 'Name' },
            { prop: 'MobileNo' },
            { prop: 'UserICNumber' },
            { prop: 'MobileNoConfirmed' },
            { prop: 'TotalDepositAmount' },
            { prop: 'TotalWithdrawAmount' },
            { prop: 'Created' },
        ];

    }

    setPageData() {
        this.rows = [];
        this.loadingIndicator = true;
        let i = 0;
        let data = {
        }
        this.adminService.add<any>(customer.userRegisterReport, data).subscribe(res => {
            this.Data = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Username: el.Username,
                    Name: el.Name,
                    MobileNo: el.MobileNo,
                    UserICNumber: el.UserICNumber,
                    MobileNoConfirmed: el.MobileNoConfirmed ? "<b class='Available'>" + el.MobileNoConfirmed + "</lable>" : "<lable class='notAvailable'>" + el.MobileNoConfirmed + "</lable>",
                    TotalDepositAmount: el.TotalDeposit,
                    TotalWithdrawAmount: el.TotalWithdraw,
                    Created: el.Created,
                });

            });
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    FilterData() {
        this.rows = [];
        this.loadingIndicator = true;
        let i = 0;

        var otpCheck;

        var verified = (document.getElementById("Verified") as HTMLInputElement).checked
        var unverified = (document.getElementById("Unverified") as HTMLInputElement).checked

        if (verified)
            otpCheck = verified;

        if (unverified)
            otpCheck = unverified;

        if (unverified && unverified)
            otpCheck = null;

        let data = {
            fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value == "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value == "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value,
            otpVerified: otpCheck
        }
        this.adminService.add<any>(customer.userRegisterReport, data).subscribe(res => {
            this.Data = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Username: el.Username,
                    Name: el.Name,
                    MobileNo: el.MobileNo,
                    UserICNumber: el.UserICNumber,
                    MobileNoConfirmed: el.MobileNoConfirmed ? "<b class='Available'>" + el.MobileNoConfirmed + "</lable>" : "<lable class='notAvailable'>" + el.MobileNoConfirmed + "</lable>",
                    TotalDepositAmount: el.TotalDeposit,
                    TotalWithdrawAmount: el.TotalWithdraw,
                    Created: el.Created,
                });

            });
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    DownloadExcel() {

        let data = {
            json: this.Data,
            fileName: "Users-Register"
        }

        this.adminService.add<any>(customer.DownlaodExcel, data).subscribe(res => {

            window.self.location = res.data.path;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[5].Permissions[0].IsChecked === true) {
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
        if (usersPermissions.permissionsList[3].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[5].Permissions[1].IsChecked === true) {
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
        if (usersPermissions.permissionsList[3].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[5].Permissions[2].IsChecked === true) {
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