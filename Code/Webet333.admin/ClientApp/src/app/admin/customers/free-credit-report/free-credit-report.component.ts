import { Component, OnInit } from '@angular/core';
import { account, customer } from '../../../../environments/environment';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-free-credit-report',
    templateUrl: './free-credit-report.component.html',
    styleUrls: ['./free-credit-report.component.scss']
})
export class FreeCreditReportComponent implements OnInit {

    rows = [];
    columns = [];
    totalRowCount = 0;
    offset = 0;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
    ) { }

    ngOnInit() {
        this.setColumn();
        this.setPageData();
    }


    //#region setCoumn
    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'UserName' },
            { prop: 'FullName' },
            { prop: 'FreeCredit' },
            { prop: 'WeeklyTotalDepositAmount' },
            { prop: 'RegisterDate' },
            { prop: 'Created' },
        ];

    }
    //#endregion

    pageNumber = 0;
    setPageData() {
        var fromdates = (document.getElementById("txt_fromdatetime") as HTMLInputElement).value;
        var todates = (document.getElementById("txt_todatetime") as HTMLInputElement).value;
        
        let data = {
            fromDate: fromdates == "" ? null : fromdates,
            toDate: todates == "" ? null : todates,
            pageNo: this.pageNumber,
            pageSize: 7
        }
        this.adminService.add<any>(customer.freeCreditReport, data).subscribe(res => {
            
            this.offset = res.data.offset;
            this.totalRowCount = res.data.total;
            this.rows = [];
            let i = ((this.pageNumber + 1) * 7) - 7;
            res.data.result.forEach(el => {
                this.rows.push({
                    No: ++i,
                    UserName: el.username,
                    FullName: el.fullname,
                    FreeCredit: el.freecredit,
                    WeeklyTotalDepositAmount: el.weeklytotaldepositamount,
                    RegisterDate: this.ReplaceTime(el.registerdate),
                    Created: this.ReplaceTime(el.createddate)

                });
            });
            this.rows = [...this.rows];
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }


    setPage(pageInfo) {
        this.pageNumber = pageInfo.offset;
        this.setPageData();
    }

    SeaachByDate() {
        this.pageNumber = 0;
        this.setPageData();
    }

    ReplaceTime(Date) {
        if (Date === null || Date === undefined || Date === NaN || Date === '') return 'Not Available';
        else return Date.replace("T", " ");
    }
}
