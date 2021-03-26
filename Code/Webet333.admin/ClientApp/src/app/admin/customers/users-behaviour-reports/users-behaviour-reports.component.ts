import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CommonService } from '../../../common/common.service';

@Component({
    selector: 'app-users-behaviour-reports',
    templateUrl: './users-behaviour-reports.component.html',
    styleUrls: ['./users-behaviour-reports.component.scss']
})

export class UsersBehaviourReportsComponent implements OnInit {
    rows = [];
    columns = [];
    loadingIndicator: boolean;
    datePickerfromdate: string;
    datePickertodate: string;
    Data: any;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService
    ) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            //this.setPageData();
            this.setToday();
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'Username' },
            { prop: 'Name' },
            { prop: 'MobileNo' },
            { prop: 'Language' },
            { prop: 'UserICNumber' },
            { prop: 'TotalDepositAmount' },
            { prop: 'TotalWithdrawAmount' },
            { prop: 'TotalBonusAmount' },
            { prop: 'TotalWinLoseAmount' },
        ];
    }

    setPageData() {
        this.rows = [];
        this.loadingIndicator = true;
        let i = 0;
        let data = {
        }
        this.adminService.add<any>(customer.userBehaviorReport, data).subscribe(res => {
            this.Data = res.data.res;
            res.data.res.forEach(el => {
                this.rows.push({
                    No: ++i,
                    userId: el.userId,
                    Username: el.username,
                    Name: el.name,
                    MobileNo: el.mobileNo,
                    UserICNumber: el.userICNumber,
                    TotalDepositAmount: el.totalDeposit,
                    TotalWithdrawAmount: el.totalWithdraw,
                    TotalBonusAmount: el.totalBonus,
                    Language: el.languageName,
                    TotalWinLoseAmount: el.totalWinLose
                });
            });
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
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

        this.FilterData(fromdate, todate);
    }

    setYesterday() {
        var dates = this.commonService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.FilterData(fromdate, todate);
    }

    setThisWeek() {
        var dates = this.commonService.getThisWeekDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.FilterData(fromdate, todate);
    }

    setThisYear() {
        var dates = this.commonService.getThisYearDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.FilterData(fromdate, todate);
    }

    //#endregion

    FilterData(startingDate = null, endingDate = null) {
        this.rows = [];
        this.loadingIndicator = true;
        let i = 0;

        let data = {
            fromdate: startingDate === null ? (document.getElementById("txt_fromdatetime") as HTMLInputElement).value : startingDate,
            todate: startingDate === null ? (document.getElementById("txt_todatetime") as HTMLInputElement).value : endingDate,
            depositTimes: (document.getElementById("depositTimes") as HTMLInputElement).value == "" ? 0 : (document.getElementById("depositTimes") as HTMLInputElement).value,
            promotionApply: (document.getElementById("applypromotion") as HTMLInputElement).checked,
            playSlot: (document.getElementById("isslot") as HTMLInputElement).checked,
            playSports: (document.getElementById("issport") as HTMLInputElement).checked,
            playLiveCasino: (document.getElementById("islive") as HTMLInputElement).checked,
            depositAmount: (document.getElementById("depositamount") as HTMLInputElement).value == "" ? 0 : (document.getElementById("depositamount") as HTMLInputElement).value,
            loseAmount: (document.getElementById("loseamount") as HTMLInputElement).value == "" ? 0 : (document.getElementById("loseamount") as HTMLInputElement).value,
            winAmount: (document.getElementById("winamount") as HTMLInputElement).value == "" ? 0 : (document.getElementById("winamount") as HTMLInputElement).value,
        }

        //let data = {
        //    fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value == "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
        //    todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value == "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value,
        //    depositTimes: (document.getElementById("depositTimes") as HTMLInputElement).value == "" ? 0 : (document.getElementById("depositTimes") as HTMLInputElement).value,
        //    promotionApply: (document.getElementById("applypromotion") as HTMLInputElement).checked,
        //    playSlot: (document.getElementById("isslot") as HTMLInputElement).checked,
        //    playSports: (document.getElementById("issport") as HTMLInputElement).checked,
        //    playLiveCasino: (document.getElementById("islive") as HTMLInputElement).checked,
        //    depositAmount: (document.getElementById("depositamount") as HTMLInputElement).value == "" ? 0 : (document.getElementById("depositamount") as HTMLInputElement).value,
        //    loseAmount: (document.getElementById("loseamount") as HTMLInputElement).value == "" ? 0 : (document.getElementById("loseamount") as HTMLInputElement).value,
        //    winAmount: (document.getElementById("winamount") as HTMLInputElement).value == "" ? 0 : (document.getElementById("winamount") as HTMLInputElement).value,
        //}

        //if (startingDate !== null && endingDate !== null) {
        //    data.fromdate = startingDate;
        //    data.todate = endingDate;
        //    (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = null;
        //    (document.getElementById("txt_todatetime") as HTMLInputElement).value = null;
        //}

        this.adminService.add<any>(customer.userBehaviorReport, data).subscribe(res => {
            this.Data = res.data.res;

            res.data.res.forEach(el => {
                this.rows.push({
                    No: ++i,
                    userId: el.userId,
                    Username: el.username,
                    Name: el.name,
                    MobileNo: el.mobileNo,
                    UserICNumber: el.userICNumber,
                    TotalDepositAmount: el.totalDeposit,
                    TotalWithdrawAmount: el.totalWithdraw,
                    TotalBonusAmount: el.totalBonus,
                    Language: el.languageName,
                    TotalWinLoseAmount: el.totalWinLose
                });
            });
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    DownloadExcel() {
        let data = {
            json: this.Data,
            fileName: "Users-Behaviour"
        }

        this.adminService.add<any>(customer.DownlaodExcel, data).subscribe(res => {
            window.self.location = res.data.path;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[6].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[6].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[6].Permissions[2].IsChecked === true) {
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