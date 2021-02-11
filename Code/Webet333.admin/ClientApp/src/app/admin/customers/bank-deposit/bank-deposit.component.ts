import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';
import { ToasterService } from 'angular2-toaster';
import { CommonService } from '../../../common/common.service';

@Component({
    selector: 'app-bank-deposit',
    templateUrl: './bank-deposit.component.html',
    styleUrls: ['./bank-deposit.component.scss']
})

export class BankDepositComponent implements OnInit {
    constructor(
        private datePipe: DatePipe,
        private adminService: AdminService,
        private toasterService: ToasterService,
        private modalService: NgbModal,
        private router: Router,
        private commonService: CommonService
    ) { }

    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
    @ViewChild('receipt') receipt: TemplateRef<any>;

    rows = [];
    Data = [];
    rowDetails = [];
    columnDetails = [];
    columns = [];
    loadingIndicator: boolean = true;
    totalDeposit: any;
    totalDepositAmount: any;
    uniqueId: any;
    usersDetailsForReportPage: any;

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            //this.setPage();
            this.setToday();
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'BankName' },
            { prop: 'TotalDeposit' },
            { prop: 'TotoalDepositAmount' },
            { prop: 'Receipt', cellTemplate: this.receipt, sortable: false }
        ];
        this.columnDetails = [
            { prop: 'No' },
            { prop: 'UserId' },
            { prop: 'Username' },
            { prop: 'BankName' },
            { prop: 'Type' },
            { prop: 'OrderId' },
            { prop: 'Amount' },
            { prop: 'Created' },
            { prop: 'Approved' },
        ];
    }

    setPage() {
        let data = {
            method: "DEPOSIT"
        }
        this.adminService.add<any>(customer.paymentStatics, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            this.Data = res.data.responses;
            this.totalDeposit = res.data.total;
            this.totalDepositAmount = res.data.depositTotalAmount;
            this.uniqueId = res.data.totalUniqueUser;
            res.data.responses.forEach(el => {
                this.rows.push({
                    No: ++i,
                    BankName: el.bankName,
                    TotalDeposit: el.totalDeposit,
                    TotoalDepositAmount: el.totalDepositAmount
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
        var dates = this.commonService.getTodatDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.commonService.setDateOtherPicker(new Date(fromdate), new Date(todate));

        this.GetDetails(fromdate, todate);
    }

    setYesterday() {
        var dates = this.commonService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.commonService.setDateOtherPicker(new Date(fromdate), new Date(todate));

        this.GetDetails(fromdate, todate);
    }

    setThisWeek() {
        var dates = this.commonService.getThisWeekDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.commonService.setDateOtherPicker(new Date(fromdate), new Date(todate));

        this.GetDetails(fromdate, todate);
    }

    setThisYear() {
        var dates = this.commonService.getThisYearDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.commonService.setDateOtherPicker(new Date(fromdate), new Date(todate));

        this.GetDetails(fromdate, todate);
    }

    //#endregion

    GetDetails(startingDate = null, endingDate = null) {
        this.loadingIndicator = true;
        let data = {
            fromDate: startingDate === null ? this.datePipe.transform((document.getElementById("txt_fromdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss") : startingDate,
            toDate: endingDate === null ? this.datePipe.transform((document.getElementById("txt_todatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss") : endingDate,
            method: "DEPOSIT"
        }

        //let data = {
        //    fromDate: this.datePipe.transform((document.getElementById("txt_fromdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss"),
        //    toDate: this.datePipe.transform((document.getElementById("txt_todatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss"),
        //    method: "DEPOSIT"
        //}

        //if (startingDate !== null && endingDate !== null) {
        //    data.fromDate = startingDate;
        //    data.toDate = endingDate;
        //    (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = null;
        //    (document.getElementById("txt_todatetime") as HTMLInputElement).value = null;
        //}


        this.adminService.add<any>(customer.paymentStatics, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            this.Data = res.data.responses;
            this.totalDeposit = res.data.totalUser;
            this.totalDepositAmount = res.data.DepositTotalAmount;
            this.uniqueId = res.data.totalUniqueUser;
            res.data.responses.forEach(el => {
                this.rows.push({
                    No: ++i,
                    BankName: el.bankName,
                    TotalDeposit: el.totalDeposit,
                    TotoalDepositAmount: el.totalDepositAmount
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
            fromDate: this.datePipe.transform((document.getElementById("txt_fromdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss"),
            toDate: this.datePipe.transform((document.getElementById("txt_todatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss"),
            method: "DEPOSIT"
        }

        this.adminService.add<any>(customer.paymentStaticsDetails, model).subscribe(res => {
            this.usersDetailsForReportPage = res.data;
            let i = 0;
            res.data.forEach(el => {
                this.rowDetails.push({
                    No: ++i,
                    Username: el.UserName,
                    UserId: el.UserId,
                    BankName: el.BankName,
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
            if (usersPermissions.permissionsList[3].submenu[14].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[14].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[14].Permissions[2].IsChecked === true) {
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