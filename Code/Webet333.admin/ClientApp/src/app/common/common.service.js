"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var CommonService = /** @class */ (function () {
    function CommonService(http, router, dateAdapter, adminService, toasterService) {
        this.http = http;
        this.router = router;
        this.dateAdapter = dateAdapter;
        this.adminService = adminService;
        this.toasterService = toasterService;
        //#endregion set Date
        //#region Error List
        this.errorMessage = {
            unAuthorized: 'You are not authorized to access this page!!',
            PleaseProvideFromDateToDate: 'Please Provide From Date and To Date !!!',
            SelectUserName: 'Please Select Username !!',
            SelectUserGroupFromDropdown: 'Please select the first user group from the dropdown.',
            NotUserInTable: 'Here not user available to add to the user group.',
            InvalidateUserGroupName: 'Invalidate user group name.',
            PleaseSelectAtLeastOneUser: 'Please select at least one user.',
            PleaseSelectUserGroup: 'Please select usergroup.',
            PleaseEnterValidFreeCreditEventName: 'Please enter valid free credit event name',
            PleaseSetFreeCreditEventTerm: 'Please set free credit event term',
            EmptyTable: 'Table is Empty!',
            SelectPromotion: 'Please Select Promotion',
            PleaseSelectGame: 'Please Select Game !!!!',
            PleaseGetTheBettingDetailsOfGames: 'Please Get The Betting Details of games.',
            PleaseSelectFromDate: 'Please Select From Date.',
            PleaseSelectToDate: 'Please Select To Date.',
            PleaseSelectTurnoverTimesOrWinturn: 'Please Select Turnover Times Or Winturn.',
            PleaseSelectOnlyOneValueEitherTurnoverTimesOrWinturn: 'Please select only one value either Turnover Times Or Winturn.',
            PleaseSelectStartDate: 'Please Select Start Date.',
            PleaseSelectEndDate: 'Please Select End Date.',
            PleaseGiveProperDescription: 'Please Give Proper Description.',
            PleaseInsertDiscount: 'Please Insert Discount.',
            PleaseSelectDiscountType: 'Please Select Discount Type.',
            PleaseSelectSequence: 'Please Select Sequence.',
            PleaseInsertTitle: 'Please Insert Title.',
            PleaseSelectUser: 'Please Select User.',
            PleaseSelectBank: 'Please Select Bank.',
            PleaseEnterAmount: 'Please Enter Amount.',
            PleaseInsertGreaterAmount: 'Please Insert Greater Amount.',
            PleaseSelectDepositMethod: 'Please Select Deposit Method.',
            PleaseEnterReferenceNumber: 'Please Enter Reference Number.',
            PleaseSelectDate: 'Please Select Date.',
            PleaseUploadReceipt: 'Please Upload Receipt.',
            YouCannotApplyPromotionBecauseHaveActivePromotion: 'You cannot apply promotion,Because  have active promotion.',
            YouCannotApplyPromotionBecauseGameInMaintenance: 'You cannot apply promotion,Because Game in maintenance.',
            SportsBookStillHavePendingBetsYetToBeUnsettledPleaseWaitUntilAllBetsHasBeenSettled: 'Sports Book still have pending bets yet to be unsettled, please wait until all bets has been settled.',
            PleaseProvideProperValue: 'Please provide proper value.',
            PleaseSelectWalllet: 'Please select wallet.',
            PleaseInsertAmount: 'Please Insert Amount.',
            PleaseSelectPromotion: 'Please select promotion.',
            PleaseAddRemark: 'Please Add Remark.',
            GameInMaintenance: 'Game In Maintenance.',
            PleaseInsertLessAmount: 'Please insert less amount.',
            PleaseEnterAmountGreaterThan0: 'Please enter amount greater than 0.',
            YourPromotionIsOnGoingCannotWithdrawTillThePromotionIsCompleted: 'Your Promotion is on going, cannot withdraw till the promotion is completed',
            PleaseSelectToDateAndFromDate: 'Please Select To Date and From Date.',
            UsernameRequired: 'Username Required.',
            PasswordRequired: 'Password Required.',
            VIPLevelRequired: 'VIP Level Required.',
            PleaseSelectMobileBannerImage: 'Please Select Mobile Banner Image',
            PleaseSelectDesktopBannerImage: 'Please Select Desktop Banner Image',
            PleaseAddPromotionFixedBonusAmount: 'Please Add Promotion Fixed Bonus Amount.'
        };
        //#endregion Check variable null, undefined, NaN
        //#region Game List
        this.GameName = {
            M8: 'M8',
            AG: 'AG',
            Playtech: 'Playtech',
            Joker: 'Joker',
            Mega888: 'Mega888',
            _918Kiss: '918 Kiss',
            DG: 'DG',
            SexyBaccarat: 'Sexy Baccarat',
            SA: 'SA',
            Pussy888: 'Pussy888',
            AllBet: 'AllBet',
            WM: 'WM',
            PragmaticPlay: 'Pragmatic Play',
            MaxBet: 'MaxBet',
            YeeBet: 'YeeBet'
        };
    }
    CommonService.prototype.add = function (apiPath, data) {
        return this.http.post(apiPath, data);
    };
    CommonService.prototype.addWithoutParam = function (apiPath) {
        return this.http.post(apiPath, '');
    };
    CommonService.prototype.get = function (apiPath) {
        return this.http.get(apiPath);
    };
    //#region       Get Dates
    CommonService.prototype.getTodatDate = function () {
        var preDate = new Date().getDate();
        var preMonth = new Date().getMonth() + 1;
        var preYear = new Date().getFullYear();
        var fromdate = preYear + '-' + preMonth + '-' + preDate + ' ' + '00:00:00';
        var todate = preYear + '-' + preMonth + '-' + preDate + ' ' + '23:59:59';
        return { fromdate: fromdate, todate: todate };
    };
    CommonService.prototype.getYesterDate = function () {
        var lastday = function (y, m) { return new Date(y, m, 0).getDate(); };
        var preDate = new Date().getDate() - 1;
        var preMonth = new Date().getMonth() + 1;
        var preYear = new Date().getFullYear();
        //#region Testing
        //preDate = 1 - 1;
        //preMonth = 1;
        //preYear = 2021;
        //#endregion Testing
        if (preDate === 0) {
            preMonth = preMonth - 1;
            if (preMonth === 0) {
                preYear = preYear - 1;
                preMonth = 12;
                preDate = lastday(preYear, preMonth);
            }
            else {
                preDate = lastday(preYear, preMonth);
            }
        }
        var fromdate = preYear + '-' + preMonth + '-' + preDate + ' ' + '00:00:00';
        var todate = preYear + '-' + preMonth + '-' + preDate + ' ' + '23:59:59';
        return { fromdate: fromdate, todate: todate };
    };
    CommonService.prototype.getThisWeekDate = function () {
        // NOTE : Date formate is 'YYYY/mm/dd' eg. '2021/02/14'
        //#region Get start date and end date of week.
        var curr = new Date(); // get current date
        //#region Start date is Sunday - Saturday
        //var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        //var firstday = new Date(curr.setDate(first));
        //var lastdayTemp = curr.getDate() - (curr.getDay() - 1) + 6;
        //var lastday = new Date(curr.setDate(lastdayTemp));
        //#endregion Start date is Sunday - Saturday
        //#region Start date is Monday - Sunday
        // var first = curr.getDate() + 1 - curr.getDay();
        var first = curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? -6 : 1); // First day is the day of the month - the day of the week
        var firstday = new Date(curr.setDate(first));
        var lastdayTemp = curr.getDate() - (curr.getDay() - 1) + 6;
        var lastday = new Date(curr.setDate(lastdayTemp));
        //#endregion Start date is Monday - Sunday
        //#endregion Get start date and end date of week.
        var weekStartYear = firstday.getFullYear();
        var weekStartMonth = firstday.getMonth() + 1;
        var weekStartDate = firstday.getDate();
        var fromdate = weekStartYear + '-' + weekStartMonth + '-' + weekStartDate + ' ' + '00:00:00';
        var weekEndYear = lastday.getFullYear();
        var weekEndMonth = lastday.getMonth() + 1;
        var weekEndDate = lastday.getDate();
        var todate = weekEndYear + '-' + weekEndMonth + '-' + weekEndDate + ' ' + '23:59:59';
        return { fromdate: fromdate, todate: todate };
    };
    CommonService.prototype.getThisYearDate = function () {
        var fromdate = new Date().getFullYear() + '-' + 1 + '-' + 1 + ' ' + '00:00:00';
        var todate = new Date().getFullYear() + '-' + 12 + '-' + 31 + ' ' + '23:59:59';
        return { fromdate: fromdate, todate: todate };
    };
    //#endregion    Get Dates
    //#region set Date
    CommonService.prototype.setDatePickerFormate = function (fromdate) {
        //let temp = { day: 3, month: 1, year: 2020 };
        var preDate = fromdate.getDate();
        var preMonth = fromdate.getMonth() + 1;
        var preYear = fromdate.getFullYear();
        var temp = { day: preDate, month: preMonth, year: preYear };
        return this.dateAdapter.toModel(temp);
    };
    CommonService.prototype.setDateOtherPicker = function (fromdate, todate) {
        //Date formate :: Month / date / yesr, Hours: Minitus AM
        if (fromdate === void 0) { fromdate = null; }
        if (todate === void 0) { todate = null; }
        var selectDate, selectMonth, selectYear, selectFromDate, selectToDate, checkExists;
        selectDate = fromdate.getDate();
        selectMonth = fromdate.getMonth() + 1;
        selectYear = fromdate.getFullYear();
        selectFromDate = selectMonth + '/' + selectDate + '/' + selectYear + ', 12:00 AM';
        selectDate = todate.getDate();
        selectMonth = todate.getMonth() + 1;
        selectYear = todate.getFullYear();
        selectToDate = selectMonth + '/' + selectDate + '/' + selectYear + ', 11:59 PM';
        checkExists = document.getElementById('txt_fromdatetime');
        if (checkExists != null)
            document.getElementById('txt_fromdatetime').value = selectFromDate;
        checkExists = document.getElementById('txt_todatetime');
        if (checkExists != null)
            document.getElementById('txt_todatetime').value = selectToDate;
        checkExists = document.getElementById('txt_startdatetime');
        if (checkExists != null)
            document.getElementById('txt_startdatetime').value = selectFromDate;
    };
    //#endregion Error List
    //#region Check user token expire or not. After save permission user token will expire.
    CommonService.prototype.CheckUserToken = function () {
        var _this = this;
        var data = {};
        this.adminService.add(environment_1.account.profile, data).subscribe(function (res) {
        }, function (error) {
            _this.toasterService.pop('error', 'Error', error.error.message);
            if (error.error.message === 'Your access token is expired, please login again.') {
                localStorage.removeItem('currentUser');
                _this.router.navigate(['/']);
            }
        });
    };
    //#endregion Check user token expire or not. After save permission user token will expire.
    //#region Check variable null, undefined, NaN
    CommonService.prototype.CheckVariable = function (variable) {
        return variable == null || variable == undefined || variable == NaN || variable == '';
    };
    CommonService = __decorate([
        core_1.Injectable()
    ], CommonService);
    return CommonService;
}());
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map