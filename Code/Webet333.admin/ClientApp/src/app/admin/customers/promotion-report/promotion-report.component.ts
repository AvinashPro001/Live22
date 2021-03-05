import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-promotion-report',
    templateUrl: './promotion-report.component.html',
    styleUrls: ['./promotion-report.component.scss']
})

export class PromotionReportComponent implements OnInit {
    rows = [];
    columns = [];

    Totalrows = [];
    Totalcolumns = [];

    NewUserTotalDeposit: any;
    NewUserTotalWithdraw: any;
    OldUserTotalDeposit: any;
    OldUserTotalWithdraw: any;

    totalDepositAmount: any;
    totalIssueBonus: any;
    totalWithdrawAmount: any;
    winLose: any;

    loadingIndicator: boolean;

    datePickerfromdate: string;
    datePickertodate: string;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService
    ) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            //this.setPageData();
            this.setToday();
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'Title' },
            { prop: 'DepositPromotionCount' },
            { prop: 'DepositPromotionCountPercentage' },
            { prop: 'WithdrawPromotionCount' },
            { prop: 'WithdrawPromotionCountPercentage' },

            { prop: 'TotalDepositAmount' },
            { prop: 'TotalWithdrawAmount' },
            { prop: 'TotalIssueBonus' },
            { prop: 'WinLose' },
        ];
        this.Totalcolumns = [
            { prop: 'NewUserTotalDeposit' },
            { prop: 'NewUserTotalWithdraw' },
            { prop: 'OldUserTotalDeposit' },
            { prop: 'OldUserTotalWithdraw' },
            { prop: 'TotalUniqueUserDeposit' },
            { prop: 'TotalUniqueUserWithdraw' },
            { prop: 'NewUserCount' },
            { prop: 'OldUserCount' },
        ];
    }

    //#region setPageData
    setPageData() {
        this.rows = [];
        this.loadingIndicator = true;
        let i = 0;
        let data = {
        }
        this.adminService.add<any>(customer.promotionReport, data).subscribe(res => {
            this.Totalrows.push({
                NewUserTotalDeposit: res.data.newUserTotalDeposit,
                NewUserTotalWithdraw: res.data.newUserTotalWithdraw,
                OldUserTotalDeposit: res.data.oldUserTotalDeposit,
                OldUserTotalWithdraw: res.data.oldUserTotalWithdraw,
                TotalUniqueUserDeposit: res.data.totalUniqueUserDeposit,
                TotalUniqueUserWithdraw: res.data.totalUniqueUserWithdraw,
                NewUserCount: res.data.newUserCount,
                OldUserCount: res.data.oldUserCount
            });

            res.data.promotionReport.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Title: el.title,
                    DepositPromotionCount: el.depositPromotionCount,
                    DepositPromotionCountPercentage: el.depositPromotionCountPercentage.toFixed(2) + " %",
                    WithdrawPromotionCount: el.withdrawPromotionCount,
                    WithdrawPromotionCountPercentage: el.withdrawPromotionCountPercentage.toFixed(2) + " %",

                    TotalDepositAmount: el.totalDepositAmount,
                    TotalWithdrawAmount: el.totalWithdrawAmount,
                    TotalIssueBonus: el.bonusIssue,
                    WinLose: el.winLose
                });
            });
            this.Totalrows = [...this.Totalrows];
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion

    //#region       Filter Data

    setDatePicker(fromdate = null, todate = null) {
        this.datePickerfromdate = this.commonService.setDatePickerFormate(fromdate);
        this.datePickertodate = this.commonService.setDatePickerFormate(todate);
    }

    setToday() {
        var dates = this.commonService.getTodatDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.FilterData(fromdate, todate);
    }

    setYesterday() {
        var dates = this.commonService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.FilterData(fromdate, todate);
    }

    setThisWeek() {
        var dates = this.commonService.getThisWeekDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.FilterData(fromdate, todate);
    }

    setThisYear() {
        var dates = this.commonService.getThisYearDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.FilterData(fromdate, todate);
    }

    //#endregion

    FilterData(startingDate = null, endingDate = null) {
        this.rows = [];
        this.Totalrows = [];
        this.loadingIndicator = true;
        let i = 0;
        let data = {
            fromdate: startingDate === null ? (document.getElementById("txt_fromdatetime") as HTMLInputElement).value : startingDate,
            todate: endingDate === null ? (document.getElementById("txt_todatetime") as HTMLInputElement).value : endingDate
        };

        //let data = {
        //    fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
        //    todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value
        //}

        //if (startingDate !== null && endingDate !== null) {
        //    data.fromdate = startingDate;
        //    data.todate = endingDate;
        //    (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = null;
        //    (document.getElementById("txt_todatetime") as HTMLInputElement).value = null;
        //}

        if (data.fromdate == null) {
            this.loadingIndicator = false;
            return this.toasterService.pop('error', 'Error', "Select From Date !!!");
        }

        if (data.todate == null) {
            this.loadingIndicator = false;
            return this.toasterService.pop('error', 'Error', "Select To Date !!!");
        }

        this.adminService.add<any>(customer.promotionReport, data).subscribe(res => {
            this.Totalrows.push({
                NewUserTotalDeposit: res.data.newUserTotalDeposit,
                NewUserTotalWithdraw: res.data.newUserTotalWithdraw,
                OldUserTotalDeposit: res.data.oldUserTotalDeposit,
                OldUserTotalWithdraw: res.data.oldUserTotalWithdraw,
                TotalUniqueUserDeposit: res.data.totalUniqueUserDeposit,
                TotalUniqueUserWithdraw: res.data.totalUniqueUserWithdraw,
            });

            res.data.promotionReport.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Title: el.title,
                    DepositPromotionCount: el.depositPromotionCount,
                    DepositPromotionCountPercentage: el.depositPromotionCountPercentage.toFixed(2) + " %",
                    WithdrawPromotionCount: el.withdrawPromotionCount,
                    WithdrawPromotionCountPercentage: el.withdrawPromotionCountPercentage.toFixed(2) + " %",
                    TotalDepositAmount: el.totalDepositAmount,
                    TotalWithdrawAmount: el.totalWithdrawAmount,
                    TotalIssueBonus: el.bonusIssue,
                    WinLose: el.winLose
                });
            });
            this.Totalrows = [...this.Totalrows];
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[4].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[4].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[4].Permissions[2].IsChecked === true) {
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