import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer, VIPSetting } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-vip-page-setting',
    templateUrl: './vip-page-setting.component.html',
    styleUrls: ['./vip-page-setting.component.scss']
})

export class VipPageComponent implements OnInit {
    disabled: boolean = false;
    TotalUser: any = 0;
    userList: any;
    totaCharaters: any = 0;
    promotionData: any;
    vipData: any;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.getVIPcategory();
            this.FreeCreditSetting();
        }
    }

    config = {
        displayKey: "title", //if objects array passed which key to be displayed defaults to description
        search: true, //true/false for the search functionlity defaults to false,
        height: '300px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        placeholder: 'Select Promotion.', // text to be displayed when no item is selected defaults to Select,
        customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
        limitTo: Option.length,// a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
        moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
        searchPlaceholder: 'Search', // label thats displayed in search input,
        searchOnKey: 'title' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

    //#region customerUser
    FreeCreditSetting() {
        this.adminService.getAll<any>(VIPSetting.VIPFreeCreditPromotionSetting).subscribe(res => {
            this.promotionData = res.data;
            (document.getElementById("freeCreditTurnover") as HTMLInputElement).value = this.promotionData.TurnoverTime
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion

    //#region customerUser
    GiveFreeCreditSetting() {
        this.disabled = true;
        this.adminService.getAll<any>(VIPSetting.VIPGiveFreeCredit).subscribe(res => {
            this.disabled = false;
            this.toasterService.pop('success', 'Success', res.message);
        }, error => {
            this.disabled = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion

    onChange(event) {
    }

    //#region Get Vip Category

    getVIPcategory() {
        this.adminService.get<any>(VIPSetting.getVIP).subscribe(res => {
            this.vipData = res.data;
            (document.getElementById("depositNormal") as HTMLInputElement).value = this.vipData.NormalDeposit,
                (document.getElementById("weekelyCredNormal") as HTMLInputElement).value = this.vipData.NormalWeeklyExtraFreeCREDIT,
                (document.getElementById("birthdayBonusNormal") as HTMLInputElement).value = this.vipData.NormalBirthdayBonus,
                (document.getElementById("liveCasinoSportRebateNormal") as HTMLInputElement).value = this.vipData.NormalLiveCasicnoSlotRebate,
                (document.getElementById("sportBookRebateNormal") as HTMLInputElement).value = this.vipData.NormalSportBookRebate,
                (document.getElementById("kissandPussyRebateNormal") as HTMLInputElement).value = this.vipData.NormalKiss918AndPussyLoseReabate,
                (document.getElementById("withdrawTimeNormal") as HTMLInputElement).value = this.vipData.NormalWithdrawTimes,
                (document.getElementById("withdrawAmountNormal") as HTMLInputElement).value = this.vipData.NormalWithdrawAmount,
                (document.getElementById("weeklyFreeCreditMinDepositAmountNormal") as HTMLInputElement).value = this.vipData.NormalWeeklyFreeCreditMinDepositAmount,

                (document.getElementById("depositBrooze") as HTMLInputElement).value = this.vipData.BronzeDeposit,
                (document.getElementById("weekelyCredBrooze") as HTMLInputElement).value = this.vipData.BronzeWeeklyExtraFreeCREDIT,
                (document.getElementById("birthdayBonusBrooze") as HTMLInputElement).value = this.vipData.BronzeBirthdayBonus,
                (document.getElementById("liveCasinoSportRebateBrooze") as HTMLInputElement).value = this.vipData.BronzeLiveCasicnoSlotRebate,
                (document.getElementById("sportBookRebateBrooze") as HTMLInputElement).value = this.vipData.BronzeSportBookRebate,
                (document.getElementById("kissandPussyRebateBrooze") as HTMLInputElement).value = this.vipData.BronzeKiss918AndPussyLoseReabate,
                (document.getElementById("withdrawTimeBrooze") as HTMLInputElement).value = this.vipData.BronzeWithdrawTimes,
                (document.getElementById("withdrawAmountBrooze") as HTMLInputElement).value = this.vipData.BronzeWithdrawAmount,
                (document.getElementById("weeklyFreeCreditMinDepositAmountBrooze") as HTMLInputElement).value = this.vipData.BronzeWeeklyFreeCreditMinDepositAmount,

                (document.getElementById("weekelyCredSilver") as HTMLInputElement).value = this.vipData.SilverWeeklyExtraFreeCREDIT,
                (document.getElementById("depositSilver") as HTMLInputElement).value = this.vipData.SilverDeposit,
                (document.getElementById("birthdayBonusSilver") as HTMLInputElement).value = this.vipData.SilverBirthdayBonus,
                (document.getElementById("liveCasinoSportRebateSilver") as HTMLInputElement).value = this.vipData.SilverLiveCasicnoSlotRebate,
                (document.getElementById("sportBookRebateSilver") as HTMLInputElement).value = this.vipData.SilverSportBookRebate,
                (document.getElementById("kissandPussyRebateSilver") as HTMLInputElement).value = this.vipData.SilverKiss918AndPussyLoseReabate,
                (document.getElementById("withdrawTimeSilver") as HTMLInputElement).value = this.vipData.SilverWithdrawTimes,
                (document.getElementById("withdrawAmountSilver") as HTMLInputElement).value = this.vipData.SilverWithdrawAmount,
                (document.getElementById("weeklyFreeCreditMinDepositAmountSilver") as HTMLInputElement).value = this.vipData.SilverWeeklyFreeCreditMinDepositAmount,

                (document.getElementById("depositGold") as HTMLInputElement).value = this.vipData.GoldDeposit,
                (document.getElementById("weekelyCredGold") as HTMLInputElement).value = this.vipData.GoldWeeklyExtraFreeCREDIT,
                (document.getElementById("birthdayBonusGold") as HTMLInputElement).value = this.vipData.GoldBirthdayBonus,
                (document.getElementById("liveCasinoSportRebateGold") as HTMLInputElement).value = this.vipData.GoldLiveCasicnoSlotRebate,
                (document.getElementById("sportBookRebateGold") as HTMLInputElement).value = this.vipData.GoldSportBookRebate,
                (document.getElementById("kissandPussyRebateGold") as HTMLInputElement).value = this.vipData.GoldKiss918AndPussyLoseReabate,
                (document.getElementById("withdrawTimeGold") as HTMLInputElement).value = this.vipData.GoldWithdrawTimes,
                (document.getElementById("withdrawAmountGold") as HTMLInputElement).value = this.vipData.GoldWithdrawAmount,
                (document.getElementById("weeklyFreeCreditMinDepositAmountGold") as HTMLInputElement).value = this.vipData.GoldWeeklyFreeCreditMinDepositAmount,

                (document.getElementById("depositPlatinum") as HTMLInputElement).value = this.vipData.PlatinumDeposit,
                (document.getElementById("weekelyCredPlatinum") as HTMLInputElement).value = this.vipData.PlatinumWeeklyExtraFreeCREDIT,
                (document.getElementById("birthdayBonusPlatinum") as HTMLInputElement).value = this.vipData.PlatinumBirthdayBonus,
                (document.getElementById("liveCasinoSportRebatePlatinum") as HTMLInputElement).value = this.vipData.PlatinumLiveCasicnoSlotRebate,
                (document.getElementById("sportBookRebatePlatinum") as HTMLInputElement).value = this.vipData.PlatinumSportBookRebate,
                (document.getElementById("kissandPussyRebatePlatinum") as HTMLInputElement).value = this.vipData.PlatinumKiss918AndPussyLoseReabate,
                (document.getElementById("withdrawTimePlatinum") as HTMLInputElement).value = this.vipData.PlatinumWithdrawTimes,
                (document.getElementById("withdrawAmountPlatinum") as HTMLInputElement).value = this.vipData.PlatinumWithdrawAmount,
                (document.getElementById("weeklyFreeCreditMinDepositAmountPlatinum") as HTMLInputElement).value = this.vipData.PlatinumWeeklyFreeCreditMinDepositAmount,

                (document.getElementById("depositDiamond") as HTMLInputElement).value = this.vipData.DiamondDeposit,
                (document.getElementById("weekelyCredDiamond") as HTMLInputElement).value = this.vipData.DiamondWeeklyExtraFreeCREDIT,
                (document.getElementById("birthdayBonusDiamond") as HTMLInputElement).value = this.vipData.DiamondBirthdayBonus,
                (document.getElementById("liveCasinoSportRebateDiamond") as HTMLInputElement).value = this.vipData.DiamondLiveCasicnoSlotRebate,
                (document.getElementById("sportBookRebateDiamond") as HTMLInputElement).value = this.vipData.DiamondSportBookRebate,
                (document.getElementById("kissandPussyRebateDiamond") as HTMLInputElement).value = this.vipData.DiamondKiss918AndPussyLoseReabate,
                (document.getElementById("withdrawTimeDiamond") as HTMLInputElement).value = this.vipData.DiamondWithdrawTimes,
                (document.getElementById("withdrawAmountDiamond") as HTMLInputElement).value = this.vipData.DiamondWithdrawAmount,
                (document.getElementById("weeklyFreeCreditMinDepositAmountDiamond") as HTMLInputElement).value = this.vipData.DiamondWeeklyFreeCreditMinDepositAmount
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion get Vip Category

    //#region Add Vip Category

    async addVIPcategory() {
        if (await this.checkUpdatePermission()) {
            this.disabled = true;
            let dataSelect = {
                depositNormal: (document.getElementById("depositNormal") as HTMLInputElement).value,
                depositBrooze: (document.getElementById("depositBrooze") as HTMLInputElement).value,
                depositSilver: (document.getElementById("depositSilver") as HTMLInputElement).value,
                depositGold: (document.getElementById("depositGold") as HTMLInputElement).value,
                depositPlatinum: (document.getElementById("depositPlatinum") as HTMLInputElement).value,
                depositDiamond: (document.getElementById("depositDiamond") as HTMLInputElement).value,
                weekelyCredNormal: (document.getElementById("weekelyCredNormal") as HTMLInputElement).value,
                weekelyCredBrooze: (document.getElementById("weekelyCredBrooze") as HTMLInputElement).value,
                weekelyCredSilver: (document.getElementById("weekelyCredSilver") as HTMLInputElement).value,
                weekelyCredGold: (document.getElementById("weekelyCredGold") as HTMLInputElement).value,
                weekelyCredPlatinum: (document.getElementById("weekelyCredPlatinum") as HTMLInputElement).value,
                weekelyCredDiamond: (document.getElementById("weekelyCredDiamond") as HTMLInputElement).value,
                birthdayBonusNormal: (document.getElementById("birthdayBonusNormal") as HTMLInputElement).value,
                birthdayBonusBrooze: (document.getElementById("birthdayBonusBrooze") as HTMLInputElement).value,
                birthdayBonusSilver: (document.getElementById("birthdayBonusSilver") as HTMLInputElement).value,
                birthdayBonusGold: (document.getElementById("birthdayBonusGold") as HTMLInputElement).value,
                birthdayBonusPlatinum: (document.getElementById("birthdayBonusPlatinum") as HTMLInputElement).value,
                birthdayBonusDiamond: (document.getElementById("birthdayBonusDiamond") as HTMLInputElement).value,
                liveCasinoSportRebateNormal: (document.getElementById("liveCasinoSportRebateNormal") as HTMLInputElement).value,
                liveCasinoSportRebateBrooze: (document.getElementById("liveCasinoSportRebateBrooze") as HTMLInputElement).value,
                liveCasinoSportRebateSilver: (document.getElementById("liveCasinoSportRebateSilver") as HTMLInputElement).value,
                liveCasinoSportRebateGold: (document.getElementById("liveCasinoSportRebateGold") as HTMLInputElement).value,
                liveCasinoSportRebatePlatinum: (document.getElementById("liveCasinoSportRebatePlatinum") as HTMLInputElement).value,
                liveCasinoSportRebateDiamond: (document.getElementById("liveCasinoSportRebateDiamond") as HTMLInputElement).value,
                sportBookRebateNormal: (document.getElementById("sportBookRebateNormal") as HTMLInputElement).value,
                sportBookRebateBrooze: (document.getElementById("sportBookRebateBrooze") as HTMLInputElement).value,
                sportBookRebateSilver: (document.getElementById("sportBookRebateSilver") as HTMLInputElement).value,
                sportBookRebateGold: (document.getElementById("sportBookRebateGold") as HTMLInputElement).value,
                sportBookRebatePlatinum: (document.getElementById("sportBookRebatePlatinum") as HTMLInputElement).value,
                sportBookRebateDiamond: (document.getElementById("sportBookRebateDiamond") as HTMLInputElement).value,
                kissandPussyRebateNormal: (document.getElementById("kissandPussyRebateNormal") as HTMLInputElement).value,
                kissandPussyRebateBrooze: (document.getElementById("kissandPussyRebateBrooze") as HTMLInputElement).value,
                kissandPussyRebateSilver: (document.getElementById("kissandPussyRebateSilver") as HTMLInputElement).value,
                kissandPussyRebateGold: (document.getElementById("kissandPussyRebateGold") as HTMLInputElement).value,
                kissandPussyRebatePlatinum: (document.getElementById("kissandPussyRebatePlatinum") as HTMLInputElement).value,
                kissandPussyRebateDiamond: (document.getElementById("kissandPussyRebateDiamond") as HTMLInputElement).value,
                withdrawTimeNormal: (document.getElementById("withdrawTimeNormal") as HTMLInputElement).value,
                withdrawTimeBrooze: (document.getElementById("withdrawTimeBrooze") as HTMLInputElement).value,
                withdrawTimeSilver: (document.getElementById("withdrawTimeSilver") as HTMLInputElement).value,
                withdrawTimeGold: (document.getElementById("withdrawTimeGold") as HTMLInputElement).value,
                withdrawTimePlatinum: (document.getElementById("withdrawTimePlatinum") as HTMLInputElement).value,
                withdrawTimeDiamond: (document.getElementById("withdrawTimeDiamond") as HTMLInputElement).value,
                withdrawAmountNormal: (document.getElementById("withdrawAmountNormal") as HTMLInputElement).value,
                withdrawAmountBrooze: (document.getElementById("withdrawAmountBrooze") as HTMLInputElement).value,
                withdrawAmountSilver: (document.getElementById("withdrawAmountSilver") as HTMLInputElement).value,
                withdrawAmountGold: (document.getElementById("withdrawAmountGold") as HTMLInputElement).value,
                withdrawAmountPlatinum: (document.getElementById("withdrawAmountPlatinum") as HTMLInputElement).value,
                withdrawAmountDiamond: (document.getElementById("withdrawAmountDiamond") as HTMLInputElement).value,
                weeklyFreeCreditMinDepositAmountNormal: (document.getElementById("weeklyFreeCreditMinDepositAmountNormal") as HTMLInputElement).value,
                weeklyFreeCreditMinDepositAmountBrooze: (document.getElementById("weeklyFreeCreditMinDepositAmountBrooze") as HTMLInputElement).value,
                weeklyFreeCreditMinDepositAmountSilver: (document.getElementById("weeklyFreeCreditMinDepositAmountSilver") as HTMLInputElement).value,
                weeklyFreeCreditMinDepositAmountGold: (document.getElementById("weeklyFreeCreditMinDepositAmountGold") as HTMLInputElement).value,
                weeklyFreeCreditMinDepositAmountPlatinum: (document.getElementById("weeklyFreeCreditMinDepositAmountPlatinum") as HTMLInputElement).value,
                weeklyFreeCreditMinDepositAmountDiamond: (document.getElementById("weeklyFreeCreditMinDepositAmountDiamond") as HTMLInputElement).value
            }
            this.adminService.add<any>(VIPSetting.addVIP, dataSelect).subscribe(res => {
                let freeCreditUpdateModel = {
                    id: this.promotionData.Id,
                    turnovertime: (document.getElementById("freeCreditTurnover") as HTMLInputElement).value,
                    isAG: (document.getElementById("ck_ag") as HTMLInputElement).checked,
                    isDG: (document.getElementById("ck_dg") as HTMLInputElement).checked,
                    isSA: (document.getElementById("ck_sa") as HTMLInputElement).checked,
                    isPlaytech: (document.getElementById("ck_playtech") as HTMLInputElement).checked,
                    isPragmatic: (document.getElementById("ck_pragmatic") as HTMLInputElement).checked,
                    isSexyBaccarat: (document.getElementById("ck_sexy") as HTMLInputElement).checked,
                    isWM: (document.getElementById("ck_wm") as HTMLInputElement).checked,
                    isAllBet: (document.getElementById("ck_allbet") as HTMLInputElement).checked,
                    isMaxbet: (document.getElementById("ck_maxbet") as HTMLInputElement).checked,
                    isM8: (document.getElementById("ck_m8") as HTMLInputElement).checked
                }
                this.adminService.add<any>(customer.promotionUpdate, freeCreditUpdateModel).subscribe(res => {
                    this.disabled = false;
                    this.toasterService.pop('success', 'Success', res.message);
                }, error => {
                    this.disabled = false;
                    this.ngOnInit();
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
            }, error => {
                this.disabled = false;
                this.ngOnInit();
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#endregion Add Vip Category

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[11].Permissions[0].IsChecked === true) {
                return true;
            }
            else {
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
        if (usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[11].Permissions[1].IsChecked === true) {
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
        if (usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[11].Permissions[2].IsChecked === true) {
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