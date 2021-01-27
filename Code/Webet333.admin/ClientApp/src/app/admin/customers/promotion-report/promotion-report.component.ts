import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer, ErrorMessages } from '../../../../environments/environment';
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

    FilterData() {
        this.rows = [];
        this.Totalrows = [];
        this.loadingIndicator = true;
        let i = 0;
        let data = {
            fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value
        }

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