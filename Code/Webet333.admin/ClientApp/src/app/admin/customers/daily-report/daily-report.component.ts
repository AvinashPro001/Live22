import { formatDate } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
import { ConfirmationDialogService } from '../../../../app/confirmation-dialog/confirmation-dialog.service';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-daily-report',
    templateUrl: './daily-report.component.html',
    styleUrls: ['./daily-report.component.scss']
})

export class DailyReportComponent implements OnInit {
    datePickerfromdate: string;
    datePickertodate: string;

    VaderPay: any;
    Normal: any;
    Deposit: any;
    Withdrawal: any;
    Winloss: any;
    Bonus: any;
    UniqueUser: any;
    UniqueUserWithdrawal: any;
    DepositCount: any;
    WithdrawalCount: any;
    DepositPromotion: any;
    NewUser: any;
    OldUser: any;
    WithdrawalPromotion: any;

    fromdate: string;
    todate: string;

    depositPromotionColumns: any;
    depositPromotionRows: any;

    withdrawalPromotionColumns: any;
    withdrawalPromotionRows: any;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private confirmationDialogService: ConfirmationDialogService,
        private modalService: NgbModal,
        private commonService: CommonService) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) { this.setToday(); }
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

        this.search(fromdate, todate);
    }

    setYesterday() {
        var dates = this.commonService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.search(fromdate, todate);
    }

    setThisWeek() {
        var dates = this.commonService.getThisWeekDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.search(fromdate, todate);
    }

    setThisYear() {
        var dates = this.commonService.getThisYearDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.search(fromdate, todate);
    }

    search(fromdate = null, todate = null) {
        let data = {
            fromDate: fromdate === null ? (document.getElementById("txt_fromdatetime") as HTMLInputElement).value : fromdate,
            toDate: todate === null ? (document.getElementById("txt_todatetime") as HTMLInputElement).value : todate
        };

        this.fromdate = formatDate(new Date(data.fromDate), 'dd/MM/yyyy', 'en-US');
        this.todate = data.toDate;

        this.setDatePicker(new Date(data.fromDate), new Date(data.toDate));

        if (data.fromDate === null || data.fromDate === '' || data.fromDate === undefined || data.fromDate === NaN ||
            data.toDate === null || data.toDate === '' || data.toDate === undefined || data.toDate === NaN) {
            this.toasterService.pop('error', 'Error', ErrorMessages.PleaseProvideFromDateToDate);
        }
        else {
            this.adminService.add<any>(customer.dailyReport, data).subscribe(res => {
                res.data.forEach(el => {
                    this.VaderPay = el.VaderPay,
                        this.Normal = el.Normal,
                        this.Deposit = el.Deposit,
                        this.Withdrawal = el.Withdrawal,
                        this.Winloss = el.Winloss,
                        this.Bonus = el.Bonus,
                        this.UniqueUser = el.UniqueUser,
                        this.UniqueUserWithdrawal = el.UniqueUserWithdrawal,
                        this.DepositCount = el.DepositCount,
                        this.WithdrawalCount = el.WithdrawalCount,
                        this.DepositPromotion = el.DepositPromotion,
                        this.NewUser = el.NewUser,
                        this.OldUser = el.OldUser,
                        this.WithdrawalPromotion = el.WithdrawalPromotion
                });

                if (this.DepositPromotion != null) { this.depositPromotionRows = JSON.parse(this.DepositPromotion); }
                else { this.depositPromotionRows = null; }

                if (this.WithdrawalPromotion != null) { this.withdrawalPromotionRows = JSON.parse(this.WithdrawalPromotion); }
                else { this.withdrawalPromotionRows = null; }
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#endregion Filter Data

    //#region Check Permission

    async checkViewPermission() {
        const usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[16].Permissions[0].IsChecked === true) {
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
        const usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[16].Permissions[1].IsChecked === true) {
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
        const usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[16].Permissions[2].IsChecked === true) {
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