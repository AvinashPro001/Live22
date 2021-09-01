import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ToasterService } from 'angular2-toaster';
import { account, customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-promotion-edit',
    templateUrl: './promotion-edit.component.html',
    styleUrls: ['./promotion-edit.component.scss']
})

export class PromotionEditComponent implements OnInit {
    selectOverCategory: any;
    overValue: any;

    data: any;
    editorData: any;
    startDate: any;
    endDate: any;
    baseDesktop: any;
    baseMobile: any;
    Language: any;
    disabled: boolean = false;
    model: any;
    isselected: Number;
    timeStart = { hour: 13, minute: 30 };
    timeEnd = { hour: 13, minute: 30 };
    public Editor = DecoupledEditor;
    meridian = true;
    toggleMeridian() {
        this.meridian = !this.meridian;
    }
    selectedTurnOverValue: any;
    selectedWinTurnValue: any;
    turnoverValue: any;
    WinTurn: any;
    displayTurnoverCategory: boolean = false;
    displayWinoverCategory: boolean = false;
    public quantities: Array<string> = [];
    public WinTurnquantities: Array<string> = [];

    turnoverCheck: boolean;
    winoverCheck: boolean;

    public onReady(editor) {
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement(),

        );
        editor.setData(this.data.description);
    }

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService) { }

    listType: any = [];

    Type: any = [
        { id: "Percentage", type: "Percentage" },
        { id: "Amount", type: "Amount" },
        { id: "PromotionFixedBonusAmount", type: "Promotion Fixed Bonus Amount" }
    ];

    showMinDeposit: boolean = true;
    minDepositValue: any = 0;
    promotionFixedBonusAmount: any;
    totalRowForPromotionFixedBonus: number = 10;
    showPromotionFixedBonus: boolean = false;
    discountTypeId: any;
    showMaxBonus: boolean = true;
    maxBonusValue: any = 0;
    showDiscount: boolean = true;
    discountValue: any = 0;

    async ngOnInit() {
        if (await this.checkUpdatePermission()) {
            this.getPromotion();
            this.getLanguage();
            for (let i = 1; i <= 100; i++) {
                this.quantities.push(i + "X");
                this.WinTurnquantities.push(i + "X");
            }
            Array(40).fill(0).map((x, i) => {
                this.listType.push({ id: i + 1, sequence: i + 1 })
            });
        }
    }

    OnSelectWinTurn(event) {
        this.overValue = event.value != undefined ? Number(event.value.replace("X", "")) : event.value;
        if (this.selectOverCategory == 'Winover') {
            this.WinTurn = this.overValue;
            this.turnoverValue = 0;
        }

        if (this.selectOverCategory == 'Turnover') {
            this.WinTurn = 0;
            this.turnoverValue = this.overValue;
        }
    }

    UpdateOverSetting(Name, Value) {
        if (Name == 'Winover' && Value == true) {
            this.displayTurnoverCategory = false;
            this.displayWinoverCategory = true;
            this.selectOverCategory = Name;
        }

        if (Name == 'Turnover' && Value == true) {
            this.displayTurnoverCategory = true;
            this.displayWinoverCategory = false;
            this.selectOverCategory = Name;
        }

        if (this.selectOverCategory == 'Winover') {
            this.WinTurn = this.overValue;
            this.turnoverValue = 0;
        }

        if (this.selectOverCategory == 'Turnover') {
            this.WinTurn = 0;
            this.turnoverValue = this.overValue;
        }
    }

    config = {
        displayKey: this.quantities, //if objects array passed which key to be displayed defaults to description
        search: true, //true/false for the search functionlity defaults to false,
        height: '200px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        placeholder: 'Select TurnOver.', // text to be displayed when no item is selected defaults to Select,
        customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
        limitTo: Option.length,// a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
        moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
        searchPlaceholder: 'Search', // label thats displayed in search input,
        searchOnKey: this.quantities  // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

    configWinTurn = {
        displayKey: this.WinTurnquantities, //if objects array passed which key to be displayed defaults to description
        search: true, //true/false for the search functionlity defaults to false,
        height: '200px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        placeholder: 'Select WinTurn.', // text to be displayed when no item is selected defaults to Select,
        customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
        limitTo: Option.length,// a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
        moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
        searchPlaceholder: 'Search', // label thats displayed in search input,
        searchOnKey: this.WinTurnquantities  // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

    getLanguage() {
        this.adminService.get<any>(account.getLanguageList).subscribe(res => {
            this.Language = res.data;
        });
    }

    public onChange({ editor }: ChangeEvent) {
        this.editorData = editor.getData();
    }

    getPromotion() {
        let datapromotion = JSON.parse(localStorage.getItem('promotionData'));
        this.data = datapromotion as object[];
        this.startDate = this.data.startDate.split("T", 1);
        this.endDate = this.data.endDate.split("T", 1);
        var startTime = this.data.startTime.split(":", 2);
        this.timeStart = { hour: Number(startTime[0]), minute: Number(startTime[1]) };
        var endTime = this.data.endTime.split(":", 2);
        this.timeEnd = { hour: Number(endTime[0]), minute: Number(endTime[1]) };

        this.selectedTurnOverValue = this.data.turnovertime + "X";
        this.selectedWinTurnValue = this.data.winturn + "X";

        this.turnoverValue = this.data.turnovertime;
        this.WinTurn = this.data.winturn;

        //turnoverCheck: boolean;
        //winoverCheck: boolean;

        if (this.turnoverValue == 0) {
            //this.turnoverCheck = false;
            this.turnoverCheck = true;
            this.winoverCheck = true;
            this.selectedWinTurnValue = this.data.winturn + "X";
            this.selectOverCategory = 'Winover';
            //this.displayTurnoverCategory = false;
            this.displayTurnoverCategory = true;
            this.displayWinoverCategory = true;
        }

        if (this.WinTurn == 0) {
            this.turnoverCheck = true;
            this.winoverCheck = false;
            this.selectedWinTurnValue = this.data.turnovertime + "X";
            this.displayTurnoverCategory = true;
            this.displayWinoverCategory = false;
            this.selectOverCategory = 'Turnover';
        }

        this.discountTypeId = this.data.discountType;
        if (this.discountTypeId == this.Type[2].id) {
            this.showPromotionFixedBonus = true;
            this.showDiscount = false;
            this.showMinDeposit = false;
            this.showMaxBonus = false;
        }
        else {
            this.showPromotionFixedBonus = false;
            this.showDiscount = true;
            this.showMinDeposit = true;
            this.showMaxBonus = true;
        }

        this.minDepositValue = this.data.minDeposit;

        let temp = this.data.promotionFixedBonus;
        this.promotionFixedBonusAmount = JSON.parse(temp);

        this.maxBonusValue = this.data.maxbonus;
        this.discountValue = this.data.discount;
    }

    UpdatePromotion() {
        var objtimeStart = this.timeStart;
        var objtimeEnd = this.timeEnd;
        let dataSelect = {
            id: this.data.id,
            startDate: Date.parse((document.getElementById("dp_startDate") as HTMLInputElement).value).toString(),
            endDate: Date.parse((document.getElementById("dp_endDate") as HTMLInputElement).value).toString(),
            startTime: (objtimeStart.hour + ":" + objtimeStart.minute).toString(),
            endTime: (objtimeEnd.hour + ":" + objtimeEnd.minute).toString(),
            title: (document.getElementById("txt_titleId") as HTMLInputElement).value,
            discountType: (document.getElementById("txt_discountTypeId") as HTMLInputElement).value,
            //discount: (document.getElementById("txt_discountId") as HTMLInputElement).value,
            discount: this.discountValue,
            sequence: (document.getElementById("ddlSequence") as HTMLInputElement).value,
            languageid: (document.getElementById("ddlLanguage") as HTMLInputElement).value,
            description: this.editorData === undefined ? null : this.editorData,
            isdailyavail: (document.getElementById("chk_isdaily") as HTMLInputElement).checked,
            isdepositpage: (document.getElementById("chk_isdepositpage") as HTMLInputElement).checked,
            turnovertime: this.turnoverValue,
            //maxbonus: (document.getElementById("txt_maxbonus") as HTMLInputElement).value,
            maxbonus: this.maxBonusValue,
            isadmin: (document.getElementById("chk_isAdmin") as HTMLInputElement).checked,
            ismain: (document.getElementById("chk_isMainPage") as HTMLInputElement).checked,
            isperuseronly: (document.getElementById("chk_isPerUser") as HTMLInputElement).checked,
            bankAccountClaimOnce: (document.getElementById("chk_isBankAccountClaimOnce") as HTMLInputElement).checked,
            winturn: this.WinTurn,
            //minDeposit: (document.getElementById("txt_minDepositAmount") as HTMLInputElement).value,
            minDeposit: this.minDepositValue,
            fixedBonus: this.promotionFixedBonusAmount,

            isYeeBetBetLimit: (document.getElementById("chk_isYeeBetBetLimit") as HTMLInputElement).checked,

            isAG: (document.getElementById("ag_id") as HTMLInputElement).checked,
            isDG: (document.getElementById("dg_id") as HTMLInputElement).checked,
            isSA: (document.getElementById("sa_id") as HTMLInputElement).checked,
            isPlaytech: (document.getElementById("playtech_id") as HTMLInputElement).checked,
            isPlaytechSlot: (document.getElementById("playtechSlots_id") as HTMLInputElement).checked,
            isPragmatic: (document.getElementById("pragmatic_id") as HTMLInputElement).checked,
            isSexyBaccarat: (document.getElementById("sexybaccarat_id") as HTMLInputElement).checked,
            isWM: (document.getElementById("wm_id") as HTMLInputElement).checked,
            isYeeBet: (document.getElementById("YeeBet_id") as HTMLInputElement).checked,
            isAllBet: (document.getElementById("allbet_id") as HTMLInputElement).checked,
            isMaxbet: (document.getElementById("maxbet_id") as HTMLInputElement).checked,
            isM8: (document.getElementById("m8") as HTMLInputElement).checked,
            is918Kiss: (document.getElementById("918Kiss_id") as HTMLInputElement).checked,
            isPussy888: (document.getElementById("pussy888_id") as HTMLInputElement).checked,
            isMega888: (document.getElementById("mega888_id") as HTMLInputElement).checked,
            isJoker: (document.getElementById("joker_id") as HTMLInputElement).checked,
            isSBO: (document.getElementById("SBO_id") as HTMLInputElement).checked,
            isGamePlayCasino: (document.getElementById("GamePlayCasino_id") as HTMLInputElement).checked,
            isGamePlaySlot: (document.getElementById("GamePlaySlot_id") as HTMLInputElement).checked,
            isCQ9Casino: (document.getElementById("CQ9Casino_id") as HTMLInputElement).checked,
            isCQ9Slot: (document.getElementById("CQ9Slot_id") as HTMLInputElement).checked,

            isNewMember: (document.getElementById("newmember_id") as HTMLInputElement).checked,
            isSports: (document.getElementById("sports_id") as HTMLInputElement).checked,
            isCasino: (document.getElementById("casino_id") as HTMLInputElement).checked,
            isSlots: (document.getElementById("slot_id") as HTMLInputElement).checked,
            isRebate: (document.getElementById("rebate_id") as HTMLInputElement).checked,
            isLimitedTime: (document.getElementById("limitedtime_id") as HTMLInputElement).checked,

            isNormal: (document.getElementById("normal_id") as HTMLInputElement).checked,
            isBronze: (document.getElementById("Bronze_id") as HTMLInputElement).checked,
            isSilver: (document.getElementById("silver_id") as HTMLInputElement).checked,
            isGold: (document.getElementById("gold_id") as HTMLInputElement).checked,
            isPlatinum: (document.getElementById("platinum_id") as HTMLInputElement).checked,
            isDiamond: (document.getElementById("diamond_id") as HTMLInputElement).checked,
        }

        //if (this.selectOverCategory == 'Winover') {
        //    dataSelect.isAG = false;
        //    dataSelect.isDG = false;
        //    dataSelect.isSA = false;
        //    dataSelect.isPlaytech = false;
        //    dataSelect.isPragmatic = false;
        //    dataSelect.isSexyBaccarat = false;
        //    dataSelect.isWM = false;
        //    dataSelect.isYeeBet = false;
        //    dataSelect.isAllBet = false;
        //    dataSelect.isMaxbet = false;
        //    dataSelect.isM8 = false;
        //    dataSelect.isSBO = false;
        //    dataSelect.isGamePlayCasino = false;
        //    dataSelect.isGamePlaySlot = false;
        //}

        //if (this.selectOverCategory == 'Turnover') {
        //    dataSelect.is918Kiss = false;
        //    dataSelect.isPussy888 = false;
        //    dataSelect.isMega888 = false;
        //    dataSelect.isJoker = false;
        //}

        if (dataSelect.turnovertime == 0 &&
            dataSelect.winturn == 0) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectTurnoverTimesOrWinturn);
        }

        if (dataSelect.turnovertime != 0 &&
            dataSelect.winturn != 0) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectOnlyOneValueEitherTurnoverTimesOrWinturn);
        }

        if (dataSelect.startDate === "NaN") {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectStartDate);
        }
        if (dataSelect.endDate === "NaN") {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectEndDate);
        }

        if (dataSelect.description === undefined) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseGiveProperDescription);
        }

        if (this.discountTypeId != this.Type[2].id &&
            dataSelect.discount === "") {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseInsertDiscount);
        }

        if (dataSelect.discountType === "") {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectDiscountType);
        }

        if (dataSelect.sequence === "") {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectSequence);
        }

        if (dataSelect.title === "") {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseInsertTitle);
        }

        if (this.discountTypeId != this.Type[2].id) {
            dataSelect.fixedBonus = null;
        }
        else {
            dataSelect.maxbonus = 0;
            dataSelect.discount = 0;
        }

        this.adminService.add<any>(customer.promotionUpdate, dataSelect).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            if (this.baseDesktop !== undefined || this.baseMobile !== undefined) this.uploadFile(res.data);
            else this.router.navigate(['admin/customers/promotion-list']);
        }, error => {
            this.disabled = false;
            this.ngOnInit();
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region uploadImage

    uploadFile(Id) {
        var dataSelect = {
            file: this.baseDesktop === undefined ? null : this.baseDesktop,
            mobilefile: this.baseMobile === undefined ? null : this.baseMobile,
            id: Id
        }
        this.adminService.add<any>(customer.promotionImageUpdate, dataSelect).subscribe(res => {
            this.router.navigate(['admin/customers/promotion-list']);
        }, error => {
            this.disabled = false;
            this.ngOnInit();
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion

    async fileSelectMobile(event) {
        let file = event.target.files[0];
        this.baseMobile = await this.readUploadedFileAsDataURL(file);
    }
    async fileSelectDesktop(event) {
        let file = event.target.files[0];
        this.baseDesktop = await this.readUploadedFileAsDataURL(file);
    }

    readUploadedFileAsDataURL(file) {
        const temporaryFileReader = new FileReader();
        return new Promise((resolve, reject) => {
            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };
            temporaryFileReader.onload = () => {
                resolve(temporaryFileReader.result);
            };
            temporaryFileReader.readAsDataURL(file);
        });
    }

    //#region For dynamic row

    counter(i: number) {
        this.promotionFixedBonusAmount = new Array(i);

        for (let j = 0; j < i; j++) {
            let temp = {
                depositAmount: 0,
                bonusAmount: 0
            };
            this.promotionFixedBonusAmount[j] = temp;
        }

        return this.promotionFixedBonusAmount;
    }

    //#endregion For dynamic row

    //#region Set discount type on dropdown change

    onDiscountTypeSelected(value: string) {
        this.discountTypeId = value;
        if (this.discountTypeId == this.Type[2].id) {
            this.showPromotionFixedBonus = true;
            this.showDiscount = false;
            this.showMinDeposit = false;
            this.showMaxBonus = false;
            if (this.promotionFixedBonusAmount == null) this.promotionFixedBonusAmount = this.counter(this.totalRowForPromotionFixedBonus);
        }
        else {
            this.showPromotionFixedBonus = false;
            this.showDiscount = true;
            this.showMinDeposit = true;
            this.showMaxBonus = true;
            //  this.promotionFixedBonusAmount == null;
        }
    }

    //#endregion Set discount type on dropdown change

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[7].Permissions[0].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[7].submenu[0].Permissions[0].IsChecked === true) {
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
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkUpdatePermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[7].Permissions[1].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[7].submenu[0].Permissions[1].IsChecked === true) {
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
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkAddPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[7].Permissions[2].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[7].submenu[0].Permissions[2].IsChecked === true) {
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
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    //#endregion Check Permission
}