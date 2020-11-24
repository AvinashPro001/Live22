import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import { account } from '../../../../environments/environment';

@Component({
    selector: 'app-ref-keyword-analytics',
    templateUrl: './ref-keyword-analytics.component.html',
    styleUrls: ['./ref-keyword-analytics.component.scss']
})
export class RefKeywordAnalyticsComponent implements OnInit {
    refRows = [];
    refColumns = [];
    Rows = [];
    Columns = [];
    loadingIndicator: boolean;
    totalNewUser: any;
    totalVerfiedUser: any;
    totalNotVerfiedUser: any;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.setColumn();
        this.setPageData();
    }

    setColumn() {
        this.refColumns = [
            { prop: 'Keyword'},
            { prop: 'TotalClick' },
            { prop: 'RegisterUser' },
            { prop: 'TotalDepoist' },
            { prop: 'TotalWithdraw' },
            { prop: 'TotalBonus' },
            { prop: 'totalWinLose' }
        ];

        this.Columns = [
            { prop: 'Platform', width: 50 },
            { prop: 'Total' }
        ];

    }

    refersh() {
        this.refRows = [];
        this.Rows = [];
        this.setPageData();
    }

    setPageData() {
        this.Rows = [];
        this.loadingIndicator = true;
        let model = {
            fromdate: null,
            todate: null
        }
        this.adminService.add<any>(account.analytics, model).subscribe(res => {
            this.totalNewUser = res.data.totalNewUser;
            this.totalVerfiedUser = res.data.totalVerfiedUser;
            this.totalNotVerfiedUser = res.data.totalNotVerfiedUser;
            res.data.refkeyword.forEach(el => {
                this.refRows.push({
                    Keyword: el.refkeyword,
                    TotalClick: el.total,
                    RegisterUser: el.totaluser,
                    TotalDepoist: el.totalDepoist,
                    TotalWithdraw: el.totalWithdraw,
                    TotalBonus: el.totalBonus,
                    totalWinLose: el.totalWinLose
                });
                this.refRows = [...this.refRows]
            })

            res.data.withoutrefkeyword.forEach(el => {
                this.Rows.push({
                    Platform: el.refkeyword,
                    Total: el.total
                });
                this.Rows = [...this.Rows]
                this.loadingIndicator = false;
            })
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }


    filter() {
        this.loadingIndicator = true;
        this.Rows = [];
        this.refRows = [];
        let RefFilterModel = {
            fromdate: ((document.getElementById("txt_fromdatetime") as HTMLInputElement).value),
            todate: ((document.getElementById("txt_todatetime") as HTMLInputElement).value)
        }
        if (RefFilterModel.fromdate !== "" && RefFilterModel.todate !== "") {
            this.adminService.add<any>(account.analytics, RefFilterModel).subscribe(res => {
                this.totalNewUser = res.data.totalNewUser;
                this.refRows = [];
                this.Rows = [];
                res.data.refkeyword.forEach(el => {
                    this.refRows.push({
                        Keyword: el.refkeyword,
                        TotalClick: el.total,
                        RegisterUser: el.totaluser,
            TotalDepoist: el.totalDepoist,
                    TotalWithdraw: el.totalWithdraw,
                    TotalBonus: el.totalBonus,
                    totalWinLose: el.totalWinLose
                    });
                    this.refRows = [...this.refRows]
                })

                res.data.withoutrefkeyword.forEach(el => {
                    this.Rows.push({
                        Platform: el.refkeyword,
                        Total: el.total
                    });
                    this.loadingIndicator = false;
                    this.Rows = [...this.Rows]
                })
            }, error => {
                this.loadingIndicator = false;
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
        else {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', "Please Provide From Date and To Date !!!");
        }
    }
}
