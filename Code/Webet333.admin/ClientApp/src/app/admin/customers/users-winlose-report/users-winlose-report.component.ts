import { Component, OnInit, TemplateRef, ViewChild, Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CommonService } from '../../../common/common.service';

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

    datePickerfromdate: string;
    datePickertodate: string;

    usersDetailsForReportPage: any;

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

    setDatePicker(fromdate = null, todate = null) {
        this.datePickerfromdate = this.commonService.setDatePickerFormate(fromdate);
        this.datePickertodate = this.commonService.setDatePickerFormate(todate);
    }

    setToday() {
        var dates = this.commonService.getTodatDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.filterdata(fromdate, todate);
    }

    setYesterday() {
        var dates = this.commonService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.filterdata(fromdate, todate);
    }

    setThisWeek() {
        var dates = this.commonService.getThisWeekDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.filterdata(fromdate, todate);
    }

    setThisYear() {
        var dates = this.commonService.getThisYearDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.filterdata(fromdate, todate);
    }

    //#endregion

    filterdata(startingDate = null, endingDate = null) {
        this.loadingIndicator = true;
        this.rows = []; endingDate

        let data = {
            fromDate: startingDate === null ? (document.getElementById("txt_fromdatetime") as HTMLInputElement).value : startingDate,
            toDate: endingDate === null ? (document.getElementById("txt_todatetime") as HTMLInputElement).value : endingDate
        };

        this.setDatePicker(new Date(data.fromDate), new Date(data.toDate));

        //let fromdate, todate
        //fromdate = (document.getElementById("txt_fromdatetime") as HTMLInputElement).value
        //todate = (document.getElementById("txt_todatetime") as HTMLInputElement).value

        //let data = {
        //    toDate: todate,
        //    fromDate: fromdate
        //}

        //if (startingDate !== null && endingDate !== null) {
        //    data.fromDate = startingDate;
        //    data.toDate = endingDate;
        //    (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = null;
        //    (document.getElementById("txt_todatetime") as HTMLInputElement).value = null;
        //}

        if (data.fromDate === null || data.fromDate === '' || data.toDate === null || data.toDate === '') {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', ErrorMessages.PleaseProvideFromDateToDate);
        }
        else {
            this.adminService.add<any>(customer.customerWinloseReport, data).subscribe(res => {
                this.rows = [];
                let i = 0;
                this.totalDeposit = res.data.totalDeposit;
                this.totalBonus = res.data.totalBonus;
                this.totalWithdraw = res.data.totalWithdraw;
                this.totalWinlose = res.data.totalWinlose;
                this.usersDetailsForReportPage = res.data.users;
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

    //#region Redirect to user details page

    show(row = null, content = null) {
        //this.viewData = row;
        //this.openWindowCustomClass(content);

        localStorage.setItem('id', JSON.stringify(row));
        window.open('admin/customers/users-details', '_blank');
    }

    //#endregion Redirect to user details page
}