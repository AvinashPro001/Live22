import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CommonService } from '../../../common/common.service';

@Component({
    selector: 'app-gamereset-password-report',
    templateUrl: './gamereset-password-report.component.html',
    styleUrls: ['./gamereset-password-report.component.scss']
})

export class GameresetPasswordReportComponent implements OnInit {
    rows = [];
    columns = [];
    loadingIndicator: boolean = false;
    datePickerfromdate: string;
    datePickertodate: string;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService
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
            { prop: 'Webet_Username' },
            { prop: 'ResetPassword' },
            { prop: 'GameName' },
            { prop: 'Created' },
        ];
    }

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

        this.Search(fromdate, todate);
    }

    setYesterday() {
        var dates = this.commonService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.Search(fromdate, todate);
    }

    setThisWeek() {
        var dates = this.commonService.getThisWeekDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.Search(fromdate, todate);
    }

    setThisYear() {
        var dates = this.commonService.getThisYearDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.Search(fromdate, todate);
    }

    //#endregion

    Search(startingDate = null, endingDate = null) {
        this.loadingIndicator = true;

        let data = {
            keyword: (document.getElementById("txt_keyword") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_keyword") as HTMLInputElement).value,
            fromDate: startingDate === null ? (document.getElementById("txt_fromdatetime") as HTMLInputElement).value : startingDate,
            toDate: endingDate === null ? (document.getElementById("txt_todatetime") as HTMLInputElement).value : endingDate
        }

        //let data = {
        //    keyword: (document.getElementById("txt_keyword") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_keyword") as HTMLInputElement).value,
        //    fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
        //    todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value
        //}

        //if (startingDate !== null && endingDate !== null) {
        //    data.fromdate = startingDate;
        //    data.todate = endingDate;
        //    (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = null;
        //    (document.getElementById("txt_todatetime") as HTMLInputElement).value = null;
        //}

        this.adminService.add<any>(customer.passwordResetSelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;

            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    id: el.id,
                    Webet_Username: el.Webet_Username,
                    ResetPassword: el.ResetPassword,
                    GameName: el.GameName,
                    Created: this.replaceDate(el.Created)
                });
            });
            this.loadingIndicator = false;
        }, error => {
            this.rows = [];
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;
        });
    }

    setData() {
        this.loadingIndicator = true;
        let data = {
        }
        this.adminService.add<any>(customer.passwordResetSelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    id: el.id,
                    Webet_Username: el.Webet_Username,
                    ResetPassword: el.ResetPassword,
                    GameName: el.GameName,
                    Created: this.replaceDate(el.Created)
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

    replaceDate(date) {
        return date.replace("T", " ");
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[11].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[11].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[11].Permissions[2].IsChecked === true) {
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

    show(row = null) {
        localStorage.setItem('id', JSON.stringify(row));
        window.open('admin/customers/users-details', '_blank');
    }

    //#endregion Redirect to user details page
}