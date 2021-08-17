import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { ConfirmationDialogService } from '../../../../app/confirmation-dialog/confirmation-dialog.service';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-admin/customer/retrive-list',
    templateUrl: './transfer-list.component.html',
    styleUrls: ['./transfer-list.component.scss']
})

export class TransferListComponent implements OnInit {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('status') status: TemplateRef<any>;
    @ViewChild('action') action: TemplateRef<any>;
    toaster: any;
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });
    rows = [];
    loadingIndicator: boolean;
    columns = [];
    totalRecords = 0;
    filteredData = [];
    customerData: any;
    soritngColumn = "";
    searchString = "";
    res: any;
    forEach: any;
    model2: any;
    model1: any;

    datePickerfromdate: string;
    datePickertodate: string;

    final: any;
    transferData: any;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private confirmationDialogService: ConfirmationDialogService,
        private commonService: CommonService
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
            { prop: 'No' },
            { prop: 'Created' },
            { prop: 'CreatedBy' },
            { prop: 'Username' },
            { prop: 'TransferNo' },
            { prop: 'FromWallet' },
            { prop: 'ToWallet' },
            { prop: 'Amount' },
        ];
    }

    setPageData(search, fromdate, todate) {
        this.rows = [];
        this.loadingIndicator = true;
        let data = {
            keyword: search,
            fromDate: fromdate,
            toDate: todate
        }

        this.adminService.add<any>(customer.transferList, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            this.transferData = res.data.result;
            res.data.result.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Id: el.id,
                    Username: el.username,
                    TransferNo: el.orderId,
                    FromWallet: el.fromWallet,
                    ToWallet: el.toWallet,
                    Amount: el.amount,
                    Created: this.ReplaceTime(el.created),
                    CreatedBy: el.createdByName === '' || el.createdByName === null || el.createdByName === undefined
                        || el.createdByName === NaN ? 'Not Available' : el.createdByName
                });
            })
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region timeFormat

    ReplaceTime(Date) {
        if (Date === null || Date === undefined || Date === NaN || Date === '') return 'Not Available';
        else return Date.replace("T", " ");
    }

    toDate(date) {
        if (date === void 0) {
            return new Date(0);
        }
        if (this.isDate(date)) {
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

    //#region navigateAdd

    async navigateAdd() {
        if (await this.checkAddPermission()) {
            this.router.navigate(['/admin/customers/transfer-add']);
            //this.openUnderconstructionDialog();
        }
    }

    //#endregion

    //#region openUnderconstructionDialog

    openUnderconstructionDialog() {
        this.confirmationDialogService.alert('Alert!!!!', 'The Add Deposit is under development.')
    }

    //#endregion

    //#region Filter Data

    setDatePicker(fromdate = null, todate = null) {
        this.datePickerfromdate = this.commonService.setDatePickerFormate(fromdate);
        this.datePickertodate = this.commonService.setDatePickerFormate(todate);
    }

    setToday() {
        var dates = this.commonService.getTodatDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.searchHandlerByDate(fromdate, todate);
    }

    setYesterday() {
        var dates = this.commonService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.searchHandlerByDate(fromdate, todate);
    }

    //#endregion

    //#region Search

    searchHandler(event) {
        let data;
        if (event.target.value) {
            data = {
                SearchParam: event.target.value,
            }
            this.searchString = event.target.value
            this.setPageData(data.SearchParam, null, null)
        } else {
            data = {
                SearchParam: ""
            }
            this.setPageData(data.SearchParam, null, null)
        }
    }

    searchHandlerByDate(startingDate = null, endingDate = null) {
        let fromdate, todate, searchParameters;
        fromdate = startingDate === null ? (document.getElementById("txt_fromdatetime") as HTMLInputElement).value : startingDate
        todate = endingDate === null ? (document.getElementById("txt_todatetime") as HTMLInputElement).value : endingDate
        if (todate === "") todate = fromdate;
        if (fromdate === "") fromdate = todate;
        if (fromdate === "" && todate === "") this.toasterService.pop('error', 'Error', "Please select Date.");
        else if ((fromdate !== undefined && todate !== null) || (todate !== null && fromdate !== null)) this.setPageData("", fromdate, todate);
        else this.setPageData("", null, null);
    }

    //#endregion Search

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[2].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[2].Permissions[0].IsChecked === true) {
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
        if (usersPermissions.permissionsList[2].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[2].Permissions[1].IsChecked === true) {
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
        if (usersPermissions.permissionsList[2].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[2].Permissions[2].IsChecked === true) {
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