import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { customer } from '../../../../environments/environment';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { debug } from 'util';


@Component({
    selector: 'app-adjustment-list',
    templateUrl: './adjustment-list.component.html',
    styleUrls: ['./adjustment-list.component.scss']
})
export class AdjustmentListComponent implements OnInit {
    toaster: any;
    model1: any;
    model2: any;
    searchString: any;
    loadingIndicator: boolean;
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });
    rows = [];
    columns = [];
    constructor
        (
            private router: Router,
            private toasterService: ToasterService,
            private adminService: AdminService
        ) { }

    ngOnInit() {
        this.setColumn();
        this.setPageData("", null,null);
    }

    setColumn() {

        this.columns = [
            { prop: 'No', width: 55 },
            { prop: 'Created' },
            { prop: 'UserName' },
            { prop: 'AdjustmemtNo' },
            { prop: 'FromWallet' },
            { prop: 'WalletBalance' },
            { prop: 'Amount' },
            { prop:'AdminRemarks'}
        ];
    }

    searchHandlerByDate() {        let fromdate, todate        fromdate = (document.getElementById("txt_fromdatetime") as HTMLInputElement).value;        todate = (document.getElementById("txt_todatetime") as HTMLInputElement).value;        if (fromdate === "" && todate === "")            this.toasterService.pop('error', 'Error', "Please select Date.");        else if ((fromdate !== undefined && todate !== null && todate !== "") || (todate !== undefined && fromdate !== null && fromdate !== "")) {            this.setPageData("", fromdate, todate);        }        else {            this.setPageData("", null, null);        }    }

    navigateAdd() {
        this.router.navigate(['/admin/customers/adjustment-add']);
    }



    searchHandler(event) {        if (event.target.value) {            this.setPageData(event.target.value, null, null)        } else {            this.setPageData("", null, null)        }    }

    setPageData(keyword, toDate, fromDate) {
        this.rows = [];
        this.loadingIndicator = true;
        let data = {
            userId: "",
            id: "",
            status: "",
            fromDate: fromDate,
            toDate: toDate,
            keyword: keyword,
        }
        this.adminService.add<any>(customer.adjustmentList, data).subscribe(res => {
            this.rows = [];
            var i = 0
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Created: this.replaceDate(el.Created),
                    UserName: el.UserName,
                    AdjustmemtNo: el.AdjustmentNo,
                    FromWallet: el.WalletType,
                    Amount: el.AdjustmentAmount,
                    WalletBalance: el.UserCurrentBalance,
                    AdminRemarks: el.AdminRemarks
                });
            });
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region timeFormat
    replaceDate(date) {
        return date.replace("T", " ");
    }

    toDate(date) {
        if (date === void 0) {
            return new Date(0);
        }
        if (this.isDate(this.replaceDate(date))) {
            return date;
        } else {
            return new Date(parseFloat(date.toString()));
        }
    }
    isDate(date) {
        return (date instanceof Date);
    }
    time(date, format) {
        var d = this.toDate(date);
        return format
            .replace(/Y/gm, d.getFullYear().toString())
            .replace(/m/gm, ('0' + (d.getMonth() + 1)).substr(-2))
            .replace(/d/gm, ('0' + (d.getDate())).substr(-2))
            .replace(/H/gm, ('0' + (d.getHours() + 0)).substr(-2))
            .replace(/i/gm, ('0' + (d.getMinutes() + 0)).substr(-2))
            .replace(/s/gm, ('0' + (d.getSeconds() + 0)).substr(-2))
            .replace(/v/gm, ('0000' + (d.getMilliseconds() % 1000)).substr(-3));
    }
    //#endregion
}

