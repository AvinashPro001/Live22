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

    filterdata() {
        this.rows = [];
        this.loadingIndicator = true;
        let fromdate, todate
        fromdate = (document.getElementById("txt_fromdatetime") as HTMLInputElement).value
        todate = (document.getElementById("txt_todatetime") as HTMLInputElement).value
        let data = {
            toDate: todate,
            fromDate: fromdate
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