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

    //#region Filter Data

    setToday() {
        var preDate = new Date().getDate();
        var preMonth = new Date().getMonth() + 1;
        var preYear = new Date().getFullYear();

        var fromdate = preYear + '-' + preMonth + '-' + preDate + ' ' + '00:00:00';
        var todate = preYear + '-' + preMonth + '-' + preDate + ' ' + '23:59:59';

        this.Search(fromdate, todate);
    }

    setYesterday() {
        var lastday = function (y, m) { return new Date(y, m, 0).getDate(); }

        var preDate = new Date().getDate() - 1;
        var preMonth = new Date().getMonth() + 1;
        var preYear = new Date().getFullYear();

        //#region Testing

        //preDate = 1 - 1;
        //preMonth = 1;
        //preYear = 2021;

        //#endregion Testing

        if (preDate === 0) {
            preMonth = preMonth - 1
            if (preMonth === 0) {
                preYear = preYear - 1;
                preMonth = 12;
                preDate = lastday(preYear, preMonth);
            }
            else {
                preDate = lastday(preYear, preMonth);
            }
        }

        var fromdate = preYear + '-' + preMonth + '-' + preDate + ' ' + '00:00:00';
        var todate = preYear + '-' + preMonth + '-' + preDate + ' ' + '23:59:59';

        this.Search(fromdate, todate);
    }

    setThisWeek() {
        //#region Get start date and end date of week.

        var curr = new Date; // get current date

        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var firstday = new Date(curr.setDate(first));

        var lastdayTemp = curr.getDate() - (curr.getDay() - 1) + 6;
        var lastday = new Date(curr.setDate(lastdayTemp));

        //#endregion Get start date and end date of week.

        var weekStartYear = firstday.getFullYear();
        var weekStartMonth = firstday.getMonth() + 1;
        var weekStartDate = firstday.getDate();
        var fromdate = weekStartYear + '-' + weekStartMonth + '-' + weekStartDate + ' ' + '00:00:00';

        var weekEndYear = lastday.getFullYear();
        var weekEndMonth = lastday.getMonth() + 1;
        var weekEndDate = lastday.getDate();
        var todate = weekEndYear + '-' + weekEndMonth + '-' + weekEndDate + ' ' + '23:59:59';

        this.Search(fromdate, todate);
    }

    setThisYear() {
        var fromdate = new Date().getFullYear() + '-' + 1 + '-' + 1 + ' ' + '00:00:00';;
        var todate = new Date().getFullYear() + '-' + 12 + '-' + 31 + ' ' + '23:59:59';

        this.Search(fromdate, todate);
    }

    //#endregion

    Search(startingDate = null, endingDate = null) {
        this.loadingIndicator = true;

        let data = {
            keyword: (document.getElementById("txt_keyword") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_keyword") as HTMLInputElement).value,
            fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value
        }

        if (startingDate !== null && endingDate !== null) {
            data.fromdate = startingDate;
            data.todate = endingDate;
            (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = null;
            (document.getElementById("txt_todatetime") as HTMLInputElement).value = null;
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