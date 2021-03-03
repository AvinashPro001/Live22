import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { debug } from 'util';
import { async } from 'rxjs/internal/scheduler/async';
import { CommonService } from '../../../common/common.service';

@Component({
    selector: 'app-adjustment-list',
    templateUrl: './adjustment-list.component.html',
    styleUrls: ['./adjustment-list.component.scss']
})
export class AdjustmentListComponent implements OnInit {
    toaster: any;
    model1: any;
    model2: any;

    datePickerfromdate: string;
    datePickertodate: string;

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
            private adminService: AdminService,
            private getDateService: CommonService
        ) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            //this.setPageData("", null, null);
            this.setToday();
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'No', width: 55 },
            { prop: 'Created' },
            { prop: 'CreatedBy' },
            { prop: 'UserName' },
            { prop: 'AdjustmemtNo' },
            { prop: 'FromWallet' },
            { prop: 'WalletBalance' },
            { prop: 'Amount' },
            { prop: 'AdminRemarks' }
        ];
    }

    searchHandlerByDate(startingDate = null, endingDate = null) {
        let fromdate, todate;

        fromdate = startingDate === null ? (document.getElementById("txt_fromdatetime") as HTMLInputElement).value : startingDate;
        todate = endingDate === null ? (document.getElementById("txt_todatetime") as HTMLInputElement).value : endingDate;

        if (fromdate === "" && todate === "") this.toasterService.pop('error', 'Error', "Please select Date.");
        else if ((fromdate !== undefined && todate !== null && todate !== "") || (todate !== undefined && fromdate !== null && fromdate !== "")) {
            this.setPageData("", fromdate, todate);
        }
        else {
            this.setPageData("", null, null);
        }
    }

    async navigateAdd() {
        if (await this.checkAddPermission()) this.router.navigate(['/admin/customers/adjustment-add']);
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

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.searchHandlerByDate(fromdate, todate);
    }

    setYesterday() {
        var dates = this.getDateService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.searchHandlerByDate(fromdate, todate);
    }

    //#endregion

    //#region Search

    searchHandler(event) {
        if (event.target.value) this.setPageData(event.target.value, null, null);
        else this.setPageData("", null, null);
    }

    setPageData(keyword, fromDate, toDate) {
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
                    CreatedBy: el.createdByName === '' || el.createdByName === null || el.createdByName === undefined
                        || el.createdByName === NaN ? 'Not Available' : el.createdByName,
                    UserName: el.UserName,
                    AdjustmemtNo: el.AdjustmentNo,
                    FromWallet: el.WalletType,
                    Amount: el.AdjustmentAmount,
                    WalletBalance: el.UserCurrentBalance,
                    AdminRemarks: el.AdminRemarks === '' || el.AdminRemarks === null || el.AdminRemarks === undefined
                        || el.AdminRemarks === NaN ? "No Remarks" : el.AdminRemarks
                });
            });
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion Search

    //#region timeFormat
    replaceDate(date) {
        if (date === null || date === undefined || date === NaN || date === '') return 'Not Available';
        else return date.replace("T", " ");
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

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[2].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[4].Permissions[0].IsChecked === true) {
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
        if (usersPermissions.permissionsList[2].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[4].Permissions[1].IsChecked === true) {
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
        if (usersPermissions.permissionsList[2].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[4].Permissions[2].IsChecked === true) {
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