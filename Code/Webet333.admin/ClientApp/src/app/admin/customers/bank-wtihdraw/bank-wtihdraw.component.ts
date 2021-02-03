import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';
import { ToasterService } from 'angular2-toaster';

@Component({
    selector: 'app-bank-wtihdraw',
    templateUrl: './bank-wtihdraw.component.html',
    styleUrls: ['./bank-wtihdraw.component.scss']
})

export class BankWtihdrawComponent implements OnInit {
    constructor(
        private datePipe: DatePipe,
        private adminService: AdminService,
        private toasterService: ToasterService,
        private modalService: NgbModal,
        private router: Router
    ) { }

    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
    @ViewChild('receipt') receipt: TemplateRef<any>;

    rows = [];
    Data = [];
    rowDetails = [];
    columnDetails = [];
    columns = [];
    loadingIndicator: boolean = true;
    totalWithdraw: any;
    totalWithdrawAmount: any;
    uniqueId: any;

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            this.setPage();
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'BankName' },
            { prop: 'TotalWithdraw' },
            { prop: 'TotoalWithdrawAmount' },
            { prop: 'Receipt', cellTemplate: this.receipt, sortable: false }
        ];
        this.columnDetails = [
            { prop: 'No' },
            { prop: 'UserId' },
            { prop: 'Username' },
            { prop: 'BankName' },
            { prop: 'AccountNo' },
            { prop: 'AccountName' },
            { prop: 'Type' },
            { prop: 'OrderId' },
            { prop: 'Amount' },
            { prop: 'Created' },
            { prop: 'Approved' },
        ];
    }

    setPage() {
        let data = {
            method: "WITHDRAW"
        }
        this.adminService.add<any>(customer.paymentStatics, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            this.Data = res.data.responses;
            this.totalWithdraw = res.data.total;
            this.totalWithdrawAmount = res.data.withdrawTotalAmount;
            this.uniqueId = res.data.totalUniqueUser;
            res.data.responses.forEach(el => {
                this.rows.push({
                    No: ++i,
                    BankName: el.bankName,
                    TotalWithdraw: el.totalWithdraw,
                    TotoalWithdrawAmount: el.totalWithdrawAmount
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

        this.GetDetails(fromdate, todate);
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

        this.GetDetails(fromdate, todate);
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

        this.GetDetails(fromdate, todate);
    }

    setThisYear() {
        var fromdate = new Date().getFullYear() + '-' + 1 + '-' + 1 + ' ' + '00:00:00';;
        var todate = new Date().getFullYear() + '-' + 12 + '-' + 31 + ' ' + '23:59:59';

        this.GetDetails(fromdate, todate);
    }

    //#endregion

    GetDetails(startingDate = null, endingDate = null) {
        let data = {
            fromDate: this.datePipe.transform((document.getElementById("txt_fromdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss"),
            toDate: this.datePipe.transform((document.getElementById("txt_todatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss"),
            method: "WITHDRAW"
        }

        if (startingDate !== null && endingDate !== null) {
            data.fromDate = startingDate;
            data.toDate = endingDate;
            (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = null;
            (document.getElementById("txt_todatetime") as HTMLInputElement).value = null;
        }

        this.adminService.add<any>(customer.paymentStatics, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            this.Data = res.data.responses;
            this.totalWithdraw = res.data.totalUser;
            this.totalWithdrawAmount = res.data.withdrawTotalAmount;
            this.uniqueId = res.data.totalUniqueUser;
            res.data.responses.forEach(el => {
                this.rows.push({
                    No: ++i,
                    BankName: el.bankName,
                    TotalWithdraw: el.totalWithdraw,
                    TotoalWithdrawAmount: el.totalWithdrawAmount
                });
            });
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    ViewData(BankName, content) {
        this.rowDetails = [];
        this.loadingIndicator = true;
        let model = {
            bankName: BankName,
            fromDate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            toDate: (document.getElementById("txt_todatetime") as HTMLInputElement).value,
            method: "WITHDRAW",
        }

        this.adminService.add<any>(customer.paymentStaticsDetails, model).subscribe(res => {
            let i = 0;
            res.data.forEach(el => {
                this.rowDetails.push({
                    No: ++i,
                    Username: el.UserName,
                    UserId: el.UserId,
                    BankName: el.BankName,
                    AccountNo: el.AccountNo,
                    AccountName: el.AccountName,
                    Type: el.Type,
                    OrderId: el.OrderId,
                    Amount: el.Amount,
                    Created: this.replaceDate(el.Created),
                    Approved: this.replaceDate(el.Modified)
                });
                this.rowDetails = [...this.rowDetails]
            });
        });
        this.loadingIndicator = false;
        this.openWindowCustomClass(content);
    }

    openWindowCustomClass(content) {
        this.modalService.open(content, { windowClass: 'dark-modal', });
    }

    replaceDate(date) {
        return date.replace('T', ' ')
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[13].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[13].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[13].Permissions[2].IsChecked === true) {
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