import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-users-winlose-report',
    templateUrl: './users-winlose-report.component.html',
    styleUrls: ['./users-winlose-report.component.scss']
})

export class UsersWinloseReportComponent implements OnInit {
    rows = [];
    loadingIndicator: boolean;
    columns = [];
    tableLimit: any = 10;

    totalDeposit: any;
    totalBonus: any;
    totalWithdraw: any;
    totalWinlose: any;

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
            { prop: 'DateTime' },
            { prop: 'Username' },
            { prop: 'PromotionName' },
            { prop: 'Deposit' },
            { prop: 'Bonus' },
            { prop: 'Withdraw' },
            { prop: 'Winlose' },
        ];
    }

    setPageData() {
        this.rows = [];
        this.loadingIndicator = true;
        let data = {
        }
        this.adminService.add<any>(customer.customerWinloseReport, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            this.totalDeposit = res.data.totalDeposit;
            this.totalBonus = res.data.totalBonus;
            this.totalWithdraw = res.data.totalWithdraw;
            this.totalWinlose = res.data.totalWinlose;
            res.data.users.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Username: el.username,
                    PromotionName: el.promotionTitle == null ? "Not Available" : el.promotionTitle,
                    Deposit: el.totalDeposit,
                    Withdraw: el.totalWithdraw,
                    Bonus: el.totalBonus,
                    Winlose: el.winlose,
                    DateTime: this.ReplaceTime(el.created)
                });
            })
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    ReplaceTime(Date) {
        return Date.replace("T", " ")
    }

    //#region Filter Data

    setToday() {
        var preDate = new Date().getDate();
        var preMonth = new Date().getMonth() + 1;
        var preYear = new Date().getFullYear();

        var fromdate = preYear + '-' + preMonth + '-' + preDate + ' ' + '00:00:00';
        var todate = preYear + '-' + preMonth + '-' + preDate + ' ' + '23:59:59';

        this.filterdata(fromdate, todate);
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

        this.filterdata(fromdate, todate);
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

        this.filterdata(fromdate, todate);
    }

    setThisYear() {
        var fromdate = new Date().getFullYear() + '-' + 1 + '-' + 1 + ' ' + '00:00:00';;
        var todate = new Date().getFullYear() + '-' + 12 + '-' + 31 + ' ' + '23:59:59';

        this.filterdata(fromdate, todate);
    }

    //#endregion

    filterdata(startingDate = null, endingDate = null) {
        this.rows = [];
        this.loadingIndicator = true;
        let fromdate, todate
        fromdate = (document.getElementById("txt_fromdatetime") as HTMLInputElement).value
        todate = (document.getElementById("txt_todatetime") as HTMLInputElement).value

        let data = {
            toDate: todate,
            fromDate: fromdate
        }

        if (startingDate !== null && endingDate !== null) {
            data.fromDate = startingDate;
            data.toDate = endingDate;
            (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = null;
            (document.getElementById("txt_todatetime") as HTMLInputElement).value = null;
        }

        this.adminService.add<any>(customer.customerWinloseReport, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            this.totalDeposit = res.data.totalDeposit;
            this.totalBonus = res.data.totalBonus;
            this.totalWithdraw = res.data.totalWithdraw;
            this.totalWinlose = res.data.totalWinlose;
            res.data.users.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Username: el.username,
                    PromotionName: el.promotionTitle == null ? "Not Available" : el.promotionTitle,
                    Deposit: el.totalDeposit,
                    Withdraw: el.totalWithdraw,
                    Bonus: el.totalBonus,
                    Winlose: el.winlose,
                    DateTime: this.ReplaceTime(el.created)
                });
            })
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    setLimit() {
        this.tableLimit = (document.getElementById("viewLimit") as HTMLInputElement).value;
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[12].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[12].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[12].Permissions[2].IsChecked === true) {
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