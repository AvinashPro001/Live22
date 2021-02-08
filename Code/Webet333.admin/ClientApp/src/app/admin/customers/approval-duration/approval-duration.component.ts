import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { error } from 'protractor';
import { Router } from '@angular/router';
import { CommonService } from '../../../common/common.service';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-approval-duration',
    templateUrl: './approval-duration.component.html',
    styleUrls: ['./approval-duration.component.scss']
})

export class ApprovalDurationComponent implements OnInit {
    rows = [];
    columns = [];
    selectedlist: any;
    listType: any = [
        { Type: "Deposit" },
        { Type: "Withdraw" },
    ];
    data: any;
    loadingIndicator: boolean = false;

    datePickerfromdate: string;
    datePickertodate: string;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private getDateService: CommonService,
        private dateAdapter: NgbDateAdapter<string>,

    ) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColoum();
            //this.setData();
            this.setToday();
        }
    }

    setColoum() {
        this.columns = [
            { prop: 'No' },
            { prop: 'UserName' },
            { prop: 'AdminUser' },
            { prop: 'Type' },
            { prop: 'Approval' },
            { prop: 'Created' },
            { prop: 'Duration' },
        ];
    }

    //#region Filter Data

    setDatePicker(fromdate = null, todate = null) {
        this.datePickerfromdate = this.getDateService.setDatePickerFormate(fromdate);
        this.datePickertodate = this.getDateService.setDatePickerFormate(todate);
    }

    setToday() {
        var dates = this.getDateService.getTodatDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.Search(fromdate, todate);
    }

    setYesterday() {
        var dates = this.getDateService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.Search(fromdate, todate);
    }

    setThisWeek() {
        var dates = this.getDateService.getThisWeekDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.Search(fromdate, todate);
    }

    setThisYear() {
        var dates = this.getDateService.getThisYearDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.Search(fromdate, todate);
    }

    //#endregion

    Search(startingDate = null, endingDate = null) {
        this.loadingIndicator = true;

        let data = {
            type: this.selectedlist === undefined ? null : this.selectedlist,
            duration: (document.getElementById("txt_second") as HTMLInputElement).value === "" ? 0 : (document.getElementById("txt_second") as HTMLInputElement).value,
            fromdate: startingDate === null ? (document.getElementById("txt_fromdatetime") as HTMLInputElement).value : startingDate,
            todate: endingDate === null ? (document.getElementById("txt_todatetime") as HTMLInputElement).value : endingDate
        }

        this.setDatePicker(new Date(data.fromdate), new Date(data.todate));

        //let data = {
        //    type: this.selectedlist === undefined ? null : this.selectedlist,
        //    duration: (document.getElementById("txt_second") as HTMLInputElement).value === "" ? 0 : (document.getElementById("txt_second") as HTMLInputElement).value,
        //    fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
        //    todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value
        //}

        //if (startingDate !== null && endingDate !== null) {
        //    data.fromdate = startingDate;
        //    data.todate = endingDate;
        //    (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = null;
        //    (document.getElementById("txt_todatetime") as HTMLInputElement).value = null;
        //}

        if (data.fromdate === null || data.fromdate === '' || data.todate === null || data.todate === '') {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', ErrorMessages.PleaseProvideFromDateToDate);
        }
        else {
            this.adminService.add<any>(customer.approvalTimeSelect, data).subscribe(res => {
                this.rows = [];
                let i = 0;
                this.data = res.data;
                res.data.forEach(el => {
                    this.rows.push({
                        No: ++i,
                        UserName: el.UserName,
                        AdminUser: el.adminName,
                        Type: el.Type,
                        Approval: this.replaceDate(el.ApprovalTime),
                        Created: this.replaceDate(el.Created),
                        Duration: el.Duration
                    });
                });
            }, error => {
                this.rows = [];
                this.toasterService.pop('error', 'Error', error.error.message)
                this.loadingIndicator = false;
            });
            this.loadingIndicator = false;
        }
    }

    setData() {
        this.loadingIndicator = true;
        let data = {
        }
        this.adminService.add<any>(customer.approvalTimeSelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            this.data = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    UserName: el.UserName,
                    AdminUser: el.adminName,
                    Type: el.Type,
                    Approval: this.replaceDate(el.ApprovalTime),
                    Created: this.replaceDate(el.Created),
                    Duration: el.Duration
                });
            });
            this.loadingIndicator = false;
        }, error => {
            this.rows = [];
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;
        });
        this.loadingIndicator = false;
    }

    replaceDate(date) { return date.replace("T", " "); }

    onChange(event) { this.selectedlist = event.target.value; }

    edit(data) { debugger; }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[9].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[9].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[9].Permissions[2].IsChecked === true) {
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