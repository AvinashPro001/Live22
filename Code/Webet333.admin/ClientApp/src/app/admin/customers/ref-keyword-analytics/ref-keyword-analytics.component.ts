import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { account, ErrorMessages } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-ref-keyword-analytics',
    templateUrl: './ref-keyword-analytics.component.html',
    styleUrls: ['./ref-keyword-analytics.component.scss']
})
export class RefKeywordAnalyticsComponent implements OnInit {
    refRows = [];
    refColumns = [];
    Rows = [];
    Columns = [];
    loadingIndicator: boolean;
    totalNewUser: any;
    totalVerfiedUser: any;
    totalNotVerfiedUser: any;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
    ) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            this.setPageData();
        }
    }

    setColumn() {
        this.refColumns = [
            { prop: 'Keyword' },
            { prop: 'TotalClick' },
            { prop: 'RegisterUser' },
            { prop: 'TotalDepoist' },
            { prop: 'TotalWithdraw' },
            { prop: 'TotalBonus' },
            { prop: 'totalWinLose' }
        ];

        this.Columns = [
            { prop: 'Platform', width: 50 },
            { prop: 'Total' }
        ];
    }

    refersh() {
        this.refRows = [];
        this.Rows = [];
        this.setPageData();
    }

    setPageData() {
        this.Rows = [];
        this.loadingIndicator = true;
        let model = {
            fromdate: null,
            todate: null
        }
        this.adminService.add<any>(account.analytics, model).subscribe(res => {
            this.totalNewUser = res.data.totalNewUser;
            this.totalVerfiedUser = res.data.totalVerfiedUser;
            this.totalNotVerfiedUser = res.data.totalNotVerfiedUser;
            res.data.refkeyword.forEach(el => {
                this.refRows.push({
                    Keyword: el.refkeyword,
                    TotalClick: el.total,
                    RegisterUser: el.totaluser,
                    TotalDepoist: el.totalDepoist,
                    TotalWithdraw: el.totalWithdraw,
                    TotalBonus: el.totalBonus,
                    totalWinLose: el.totalWinLose
                });
                this.refRows = [...this.refRows]
            })

            res.data.withoutrefkeyword.forEach(el => {
                this.Rows.push({
                    Platform: el.refkeyword,
                    Total: el.total
                });
                this.Rows = [...this.Rows]
                this.loadingIndicator = false;
            })
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region       Filter Data

    setToday() {
        var preDate = new Date().getDate();
        var preMonth = new Date().getMonth() + 1;
        var preYear = new Date().getFullYear();

        var fromdate = preYear + '-' + preMonth + '-' + preDate;
        var todate = preYear + '-' + preMonth + '-' + preDate;

        this.filter(fromdate, todate);
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

        var fromdate = preYear + '-' + preMonth + '-' + preDate;
        var todate = preYear + '-' + preMonth + '-' + preDate;

        this.filter(fromdate, todate);
    }

    setThisWeek() {

        //#region Get start date and end date of week.

        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6
        var firstday = new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));

        //#endregion Get start date and end date of week.

        var fromdate = firstday.getFullYear() + '-' + firstday.getMonth() + 1 + '-' + firstday.getDate();
        var todate = lastday.getFullYear() + '-' + lastday.getMonth() + 1 + '-' + lastday.getDate();

        this.filter(fromdate, todate);
    }

    setThisYear() {
        var fromdate = new Date().getFullYear() + '-' + 1 + '-' + 1;
        var todate = new Date().getFullYear() + '-' + 12 + '-' + 31;

        this.filter(fromdate, todate);
    }

    //#endregion

    filter(startingDate = null, endingDate = null) {

        this.loadingIndicator = true;
        this.Rows = [];
        this.refRows = [];
        let RefFilterModel = {
            fromdate: ((document.getElementById("txt_fromdatetime") as HTMLInputElement).value),
            todate: ((document.getElementById("txt_todatetime") as HTMLInputElement).value)
        }

        if (startingDate !== null && endingDate !== null) {
            RefFilterModel.fromdate = startingDate;
            RefFilterModel.todate = endingDate
        }

        if (RefFilterModel.fromdate !== "" && RefFilterModel.todate !== "") {
            this.adminService.add<any>(account.analytics, RefFilterModel).subscribe(res => {
                this.totalNewUser = res.data.totalNewUser;
                this.totalVerfiedUser = res.data.totalVerfiedUser;
                this.totalNotVerfiedUser = res.data.totalNotVerfiedUser;
                this.refRows = [];
                this.Rows = [];
                res.data.refkeyword.forEach(el => {
                    this.refRows.push({
                        Keyword: el.refkeyword,
                        TotalClick: el.total,
                        RegisterUser: el.totaluser,
                        TotalDepoist: el.totalDepoist,
                        TotalWithdraw: el.totalWithdraw,
                        TotalBonus: el.totalBonus,
                        totalWinLose: el.totalWinLose
                    });
                    this.refRows = [...this.refRows]
                })

                res.data.withoutrefkeyword.forEach(el => {
                    this.Rows.push({
                        Platform: el.refkeyword,
                        Total: el.total
                    });
                    this.loadingIndicator = false;
                    this.Rows = [...this.Rows]
                })
            }, error => {
                this.loadingIndicator = false;
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
        else {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', "Please Provide From Date and To Date !!!");
        }
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[0].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[0].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[0].Permissions[2].IsChecked === true) {
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