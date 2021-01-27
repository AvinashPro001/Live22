import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gamereset-password-report',
    templateUrl: './gamereset-password-report.component.html',
    styleUrls: ['./gamereset-password-report.component.scss']
})
export class GameresetPasswordReportComponent implements OnInit {

    rows = [];
    columns = [];
    loadingIndicator: boolean = false;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router
    ) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColoum();
            this.setData();
        }
    }

    setColoum() {
        this.columns = [
            { prop: 'No' },
            { prop: 'Webet_Username' },
            { prop: 'ResetPassword' },
            { prop: 'GameName' },
            { prop: 'Created' },
        ];
    }

    Search() {
        this.loadingIndicator = true;

        let data = {
            keyword: (document.getElementById("txt_keyword") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_keyword") as HTMLInputElement).value,
            fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value
        }
        this.adminService.add<any>(customer.passwordResetSelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Webet_Username: el.Webet_Username,
                    ResetPassword: el.ResetPassword,
                    GameName: el.GameName,
                    Created: this.replaceDate(el.Created)
                });
            });

        }, error => {
            this.rows = [];
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;
        });
        this.loadingIndicator = false;
    }

    setData() {
        this.loadingIndicator = true;
        let data = {

        }
        this.adminService.add<any>(customer.passwordResetSelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Webet_Username: el.Webet_Username,
                    ResetPassword: el.ResetPassword,
                    GameName: el.GameName,
                    Created: this.replaceDate(el.Created)
                });
            });
            this.loadingIndicator = false;
        }, error => {
            this.rows = [];
            this.toasterService.pop('error', 'Error', error.error.message)
                this.loadingIndicator = false;

        });
        this.loadingIndicator = false;
    }


    replaceDate(date) {
        return date.replace("T", " ");
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[11].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[11].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[11].Permissions[2].IsChecked === true) {
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