import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { customer } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';
import { ToasterService } from 'angular2-toaster';

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
        private modalService: NgbModal
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

    ngOnInit() {
        this.setColumn();
        this.setPage();
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

    GetDetails() {
        let data = {
            fromDate: this.datePipe.transform((document.getElementById("txt_fromdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss"),
            toDate: this.datePipe.transform((document.getElementById("txt_todatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss"),
            method: "DEPOSIT"
        }
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
            fromDate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            toDate: (document.getElementById("txt_todatetime") as HTMLInputElement).value,
            method: "DEPOSIT"
        }

        this.adminService.add<any>(customer.paymentStaticsDetails, model).subscribe(res => {
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
        return date.replace('T',' ')
    }
}