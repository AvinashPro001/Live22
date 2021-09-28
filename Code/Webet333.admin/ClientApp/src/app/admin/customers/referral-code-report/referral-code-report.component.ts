import { Component, OnInit } from '@angular/core';
import { account, customer } from '../../../../environments/environment';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';


@Component({
  selector: 'app-referral-code-report',
  templateUrl: './referral-code-report.component.html',
  styleUrls: ['./referral-code-report.component.scss']
})
export class ReferralCodeReportComponent implements OnInit {

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
            { prop: 'WhoGetBonus' },
            { prop: 'WhoGiveBonus' },
            { prop: 'Turnover' },
            { prop: 'ReferPercentage' },
            { prop: 'ReferralBonus' },
            { prop: 'CalculationDate' },
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
        this.adminService.add<any>(customer.referralBonusReport, data).subscribe(res => {
            this.offset = res.data.offset;
            this.totalRowCount = res.data.total;
            this.rows = [];
            let i = ((this.pageNumber + 1) * 7) - 7;
            res.data.result.forEach(el => {
                this.rows.push({
                    No: ++i,
                    WhoGetBonus: el.Username,
                    WhoGiveBonus: el.ReferUsername,
                    Turnover: el.Turnover,
                    ReferPercentage: el.ReferPercentage,
                    ReferralBonus: el.ReferralBonus,
                    CalculationDate: el.CalculationDate,
                    Created: this.ReplaceTime(el.Created)

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
