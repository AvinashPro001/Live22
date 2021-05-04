import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-promotions-users-report',
    templateUrl: './promotions-users-report.component.html',
    styleUrls: ['./promotions-users-report.component.scss']
})

export class PromotionsUsersReportComponent implements OnInit {
    @ViewChild('link') link: TemplateRef<any>;

    loadingIndicator: boolean;
    rows = [];
    promotionList: any;
    datePickerfromdate: string;
    datePickertodate: string;
    promotionId: string = null;
    columns = [];

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.commonService.CheckUserToken();    //  Check User token is not expire.
            this.loadPromotions();
            this.setColumn();
            this.setDatePicker(new Date(), new Date());
        }
    }

    //#region Set Column

    setColumn() {
        this.columns = [
            { prop: 'No', width: 25 },
            { prop: 'Username' },
            { prop: 'KeywordName' },
            { prop: 'PromotionName' },
            { prop: 'HowManyTimesApplyThisPromotion' },
            { prop: 'DateTimeFirstApplyThePromotion' },
            { prop: 'LastDateTimeApplyThisPromotion' },
            { prop: 'DepositCountAfterLastDatetimeApplyThisPromotion' },
            { prop: 'TotalDepositAmountForThisPromotion' },
            { prop: 'WithdrawAmount' },
            { prop: 'TotalBonusAmount' },
            { prop: 'TotalWinlossAmount' }
        ];
    }

    //#endregion Set Column

    //#region Load Promotions

    loadPromotions() {
        this.adminService.get<any>(customer.promotionSelectForDropdown).subscribe(res => {
            this.promotionList = res.data;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion Load Promotions

    //#region Config for promotions dropdown

    config = {
        displayKey: "title",                 //if objects array passed which key to be displayed defaults to description
        search: true,                           //true/false for the search functionlity defaults to false,
        height: '500px',                        //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        placeholder: 'Select Promotion.',        // text to be displayed when no item is selected defaults to Select,
        customComparator: () => { },            // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
        limitTo: Option.length,                 // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
        moreText: 'more',                       // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        noResultsFound: 'No results found!',    // text to be displayed when no items are found while searching
        searchPlaceholder: 'Search',            // label thats displayed in search input,
        searchOnKey: 'title'                 // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

    //#endregion Config for promotions dropdown

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

    search(fromdate = null, todate = null, searchParam = null) {
        this.loadingIndicator = true;
        this.rows = [];

        let data = {
            searchParam: searchParam,
            id: this.promotionId,
            fromDate: fromdate === null ? (document.getElementById("txt_fromdatetime") as HTMLInputElement).value : fromdate,
            toDate: todate === null ? (document.getElementById("txt_todatetime") as HTMLInputElement).value : todate,
            pageSize: null,
            pageNo: null,
            orderBy: null
        };

        this.setDatePicker(new Date(data.fromDate), new Date(data.toDate));

        if (data.fromDate === null || data.fromDate === '' || data.fromDate === undefined || data.fromDate === NaN ||
            data.toDate === null || data.toDate === '' || data.toDate === undefined || data.toDate === NaN) {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseProvideFromDateToDate);
        }
        else if (this.commonService.CheckVariable(data.id)) {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SelectPromotion);
        }
        else {
            this.adminService.add<any>(customer.promotionUsersSelect, data).subscribe(res => {
                this.rows = [];
                let i = 0;

                res.data.forEach(el => {
                    this.rows.push({
                        userId: el.userId,
                        No: ++i,
                        Username: el.username,
                        KeywordName: el.refKeyword == null ? "Not Available" : el.refKeyword,
                        PromotionName: el.title,
                        HowManyTimesApplyThisPromotion: el.promotionCount,
                        DateTimeFirstApplyThePromotion: this.ReplaceTime(el.firstTimePromotionApply),
                        LastDateTimeApplyThisPromotion: this.ReplaceTime(el.lastTimePromotionApply),
                        DepositCountAfterLastDatetimeApplyThisPromotion: el.depositCountAftrerLastTimePromotionApply,
                        TotalDepositAmountForThisPromotion: el.totalDepositAmount,
                        WithdrawAmount: el.totalWithdrawAmount,
                        TotalBonusAmount: el.totalBonusAmount,
                        TotalWinlossAmount: el.totalWinloseAmount,
                    });
                })

                this.rows = [...this.rows];
                this.loadingIndicator = false;
            }, error => {
                this.loadingIndicator = false;
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    ReplaceTime(Date) { return Date.replace("T", " ") }
  
    promotionIdOnChange(event) {
        try {
            this.promotionId = event.value.id;
            if (this.promotionId === '0') this.promotionId = null;
        }
        catch (ex) {
            this.promotionId = null;
        }
    }


    //#endregion Filter Data

    //#region Redirect to user details page

    show(row = null) {
        localStorage.setItem('id', JSON.stringify(row));
        window.open('admin/customers/users-details', '_blank');
    }

    //#endregion Redirect to user details page

    //#region Check Permission

    async checkViewPermission() {
        const usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[15].Permissions[0].IsChecked === true) {
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
        const usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[15].Permissions[1].IsChecked === true) {
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
        const usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[15].Permissions[2].IsChecked === true) {
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