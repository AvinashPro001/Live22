import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-users-behaviour-reports',
    templateUrl: './users-behaviour-reports.component.html',
    styleUrls: ['./users-behaviour-reports.component.scss']
})

export class UsersBehaviourReportsComponent implements OnInit {
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
            { prop: 'TotalDepositAmount' },
            { prop: 'TotalWithdrawAmount' },
            { prop: 'TotalBonusAmount' },
        ];
    }

    setPageData() {
        this.rows = [];
        this.loadingIndicator = true;
        let i = 0;
        let data = {
        }
        this.adminService.add<any>(customer.userBehaviorReport, data).subscribe(res => {
            this.Data = res.data.res;
            res.data.res.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Username: el.username,
                    Name: el.name,
                    MobileNo: el.mobileNo,
                    UserICNumber: el.userICNumber,
                    TotalDepositAmount: el.totalDeposit,
                    TotalWithdrawAmount: el.totalWithdraw,
                    TotalBonusAmount: el.totalBonus,
                });
            });
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region Filter Data

    setToday() {
        var preDate = new Date().getDate();
        var preMonth = new Date().getMonth() + 1;
        var preYear = new Date().getFullYear();

        var fromdate = preYear + '-' + preMonth + '-' + preDate + ' ' + '00:00:00';
        var todate = preYear + '-' + preMonth + '-' + preDate + ' ' + '23:59:59';

        this.FilterData(fromdate, todate);
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

        this.FilterData(fromdate, todate);
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

        this.FilterData(fromdate, todate);
    }

    setThisYear() {
        var fromdate = new Date().getFullYear() + '-' + 1 + '-' + 1 + ' ' + '00:00:00';;
        var todate = new Date().getFullYear() + '-' + 12 + '-' + 31 + ' ' + '23:59:59';

        this.FilterData(fromdate, todate);
    }

    //#endregion

    FilterData(startingDate = null, endingDate = null) {
        this.rows = [];
        this.loadingIndicator = true;
        let i = 0;

        let data = {
            fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value == "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value == "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value,
            depositTimes: (document.getElementById("depositTimes") as HTMLInputElement).value == "" ? 0 : (document.getElementById("depositTimes") as HTMLInputElement).value,
            promotionApply: (document.getElementById("applypromotion") as HTMLInputElement).checked,
            playSlot: (document.getElementById("isslot") as HTMLInputElement).checked,
            playSports: (document.getElementById("issport") as HTMLInputElement).checked,
            playLiveCasino: (document.getElementById("islive") as HTMLInputElement).checked,
            depositAmount: (document.getElementById("depositamount") as HTMLInputElement).value == "" ? 0 : (document.getElementById("depositamount") as HTMLInputElement).value,
            loseAmount: (document.getElementById("loseamount") as HTMLInputElement).value == "" ? 0 : (document.getElementById("loseamount") as HTMLInputElement).value,
            winAmount: (document.getElementById("winamount") as HTMLInputElement).value == "" ? 0 : (document.getElementById("winamount") as HTMLInputElement).value,
        }

        if (startingDate !== null && endingDate !== null) {
            data.fromdate = startingDate;
            data.todate = endingDate;
            (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = null;
            (document.getElementById("txt_todatetime") as HTMLInputElement).value = null;
        }

        this.adminService.add<any>(customer.userBehaviorReport, data).subscribe(res => {
            this.Data = res.data.res;
            res.data.res.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Username: el.username,
                    Name: el.name,
                    MobileNo: el.mobileNo,
                    UserICNumber: el.userICNumber,
                    TotalDepositAmount: el.totalDeposit,
                    TotalWithdrawAmount: el.totalWithdraw,
                    TotalBonusAmount: el.totalBonus,
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
            fileName: "Users-Behaviour"
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
            if (usersPermissions.permissionsList[3].submenu[6].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[6].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[6].Permissions[2].IsChecked === true) {
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