import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
import { account } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

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

    datePickerfromdate: string;
    datePickertodate: string;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private dateAdapter: NgbDateAdapter<string>,
        private commonService: CommonService) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            // this.setPageData();
            this.setToday();
        }
    }

    setColumn() {
        this.refColumns = [
            { prop: 'Keyword' },
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
        //this.setPageData();
        this.filter();
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

    //#region       Filter Data

    setDatePickerFormate(fromdate) {
        //let temp = { day: 3, month: 1, year: 2020 };

        var preDate = fromdate.getDate();
        var preMonth = fromdate.getMonth() + 1;
        var preYear = fromdate.getFullYear();

        let temp = { day: preDate, month: preMonth, year: preYear };

        return this.dateAdapter.toModel(temp);
    }

    setDatePicker(fromdate = null, todate = null) {
        this.datePickerfromdate = this.setDatePickerFormate(fromdate);
        this.datePickertodate = this.setDatePickerFormate(todate);
    }

    setToday() {
        var dates = this.commonService.getTodatDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.filter(fromdate, todate);
    }

    setYesterday() {
        var dates = this.commonService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.filter(fromdate, todate);
    }

    setThisWeek() {
        var dates = this.commonService.getThisWeekDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.filter(fromdate, todate);
    }

    setThisYear() {
        var dates = this.commonService.getThisYearDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.filter(fromdate, todate);
    }

    //#endregion

    filter(startingDate = null, endingDate = null) {
        this.loadingIndicator = true;
        this.Rows = [];
        this.refRows = [];
        let RefFilterModel = {
            fromdate: startingDate === null ? ((document.getElementById("txt_fromdatetime") as HTMLInputElement).value) : startingDate,
            todate: endingDate === null ? ((document.getElementById("txt_todatetime") as HTMLInputElement).value) : endingDate
        };

        //let RefFilterModel = {
        //    fromdate: ((document.getElementById("txt_fromdatetime") as HTMLInputElement).value),
        //    todate: ((document.getElementById("txt_todatetime") as HTMLInputElement).value)
        //}

        //if (startingDate !== null && endingDate !== null) {
        //    RefFilterModel.fromdate = startingDate;
        //    RefFilterModel.todate = endingDate;

        //    (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = RefFilterModel.fromdate;
        //    (document.getElementById("txt_todatetime") as HTMLInputElement).value = RefFilterModel.todate;

        //    //this.setDatePicker(new Date(RefFilterModel.fromdate), new Date(RefFilterModel.todate));
        //} else {
        //    RefFilterModel.fromdate = this.commonService.getTodatDate().fromdate;
        //    RefFilterModel.todate = this.commonService.getTodatDate().todate;

        //    (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = RefFilterModel.fromdate;
        //    (document.getElementById("txt_todatetime") as HTMLInputElement).value = RefFilterModel.todate;

        //    //this.setDatePicker(new Date(RefFilterModel.fromdate), new Date(RefFilterModel.todate));
        //}

        if (RefFilterModel.fromdate !== "" && RefFilterModel.todate !== "") {
            this.adminService.add<any>(account.analytics, RefFilterModel).subscribe(res => {
                this.totalNewUser = res.data.totalNewUser;
                this.totalVerfiedUser = res.data.totalVerfiedUser;
                this.totalNotVerfiedUser = res.data.totalNotVerfiedUser;
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

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[0].Permissions[0].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkUpdatePermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[0].Permissions[1].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkAddPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[0].Permissions[2].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    //#endregion Check Permission
}