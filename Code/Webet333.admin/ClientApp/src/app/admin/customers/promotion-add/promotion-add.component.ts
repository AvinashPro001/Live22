﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ToasterService } from 'angular2-toaster';
import { account, customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

class ImageSnippet {
    pending: boolean = false;
    status: string = 'init';

    constructor(public src: string, public file: File) { }
}

@Component({
    selector: 'app-admin/promotion/promotion-add',
    templateUrl: './promotion-add.component.html',
    styleUrls: ['./promotion-add.component.scss']
})

export class PromotionAddComponent implements OnInit {
    public Editor = DecoupledEditor;
    public onReady(editor) {
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    }

    selectOverCategory: any;
    overValue: any;

    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;
    timeStart = { hour: 13, minute: 30 };
    timeEnd = { hour: 13, minute: 30 };
    disabled: boolean = false;
    meridian = true;
    files: any;
    model1: any;
    model: any;
    list: any;
    editorData: any;
    Language: any;
    T: any;
    turnoverValue: any;
    WinTurn: any;
    baseDesktop: any;
    baseMobile: any;
    toggleMeridian() {
        this.meridian = !this.meridian;
    }

    displayTurnoverCategory: boolean = false;
    displayWinoverCategory: boolean = false;
    public quantities: Array<string> = [];
    public WinTurnquantities: Array<string> = [];

    //#region variable

    listType: any = [];

    Type: any = [
        { id: "Percentage", type: "Percentage" },
        { id: "Amount", type: "Amount" },
    ];

    //#endregion

    //#region ngOnInit
    async ngOnInit() {
        if (await this.checkAddPermission()) {
            this.getLanguage();

            for (let i = 0; i <= 100; i++) {
                this.quantities.push(i + "X")
                this.WinTurnquantities.push(i + "X")
            }
            Array(40).fill(0).map((x, i) => {
                this.listType.push({ id: i + 1, sequence: i + 1 })
            });
        }
    }

    //#endregion

    getLanguage() {
        this.adminService.get<any>(account.getLanguageList).subscribe(res => {
            this.Language = res.data;
        });
    }

    //#region constructor
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService) { }
    //#endregion

    OnSelect(event) {
        this.turnoverValue = event.value != undefined ? Number(event.value.replace("X", "")) : event.value;
        //if (this.turnoverValue == undefined) {
        //    this.displayTurnoverCategory = false;
        //    this.displayWinoverCategory = false;
        //}
        //else {
        //    this.displayTurnoverCategory = true;
        //    this.displayWinoverCategory = false;
        //}
    }

    OnSelectWinTurn(event) {
        this.overValue = event.value != undefined ? Number(event.value.replace("X", "")) : event.value;
        //if (this.WinTurn == undefined) {
        //    this.displayTurnoverCategory = false;
        //    this.displayWinoverCategory = false;
        //}
        //else {
        //    this.displayTurnoverCategory = false;
        //    this.displayWinoverCategory = true;
        //}
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

    public onChange({ editor }: ChangeEvent) {
        this.editorData = editor.getData();
    }

    //#region AddPromotion
    addPromotion() {
        this.disabled = true;
        var objtimeStart = this.timeStart;
        var objtimeEnd = this.timeEnd;
        let dataSelect = {
            startDate: Date.parse((document.getElementById("dp_startDate") as HTMLInputElement).value).toString(),
            endDate: Date.parse((document.getElementById("dp_endDate") as HTMLInputElement).value).toString(),
            startTime: (objtimeStart.hour + ":" + objtimeStart.minute).toString(),
            endTime: (objtimeEnd.hour + ":" + objtimeEnd.minute).toString(),
            title: (document.getElementById("txt_titleId") as HTMLInputElement).value,
            discountType: (document.getElementById("txt_discountTypeId") as HTMLInputElement).value,
            discount: (document.getElementById("txt_discountId") as HTMLInputElement).value,
            sequence: (document.getElementById("ddlSequence") as HTMLInputElement).value,
            languageid: (document.getElementById("ddlLanguage") as HTMLInputElement).value,
            description: this.editorData,
            isdailyavail: (document.getElementById("chk_isdaily") as HTMLInputElement).checked,
            isdepositpage: (document.getElementById("chk_isDepositePage") as HTMLInputElement).checked,
            turnovertime: this.turnoverValue,
            maxbonus: (document.getElementById("txt_maxbonus") as HTMLInputElement).value,
            isadmin: (document.getElementById("chk_isAdmin") as HTMLInputElement).checked,
            ismain: (document.getElementById("chk_isMainPage") as HTMLInputElement).checked,
            isperuseronly: (document.getElementById("chk_isPerUser") as HTMLInputElement).checked,
            bankAccountClaimOnce: (document.getElementById("chk_isBankAccountClaimOnce") as HTMLInputElement).checked,
            winturn: this.WinTurn,

            isAG: (document.getElementById("ag_id") as HTMLInputElement).checked,
            isDG: (document.getElementById("dg_id") as HTMLInputElement).checked,
            isSA: (document.getElementById("sa_id") as HTMLInputElement).checked,
            isPlaytech: (document.getElementById("playtech_id") as HTMLInputElement).checked,
            isPlaytechSlot: (document.getElementById("playtechSlots_id") as HTMLInputElement).checked,
            isPragmatic: (document.getElementById("pragmatic_id") as HTMLInputElement).checked,
            isSexyBaccarat: (document.getElementById("sexybaccarat_id") as HTMLInputElement).checked,
            isWM: (document.getElementById("wm_id") as HTMLInputElement).checked,
            isAllBet: (document.getElementById("allbet_id") as HTMLInputElement).checked,
            isMaxbet: (document.getElementById("maxbet_id") as HTMLInputElement).checked,
            isM8: (document.getElementById("m8") as HTMLInputElement).checked,
            is918Kiss: (document.getElementById("918Kiss_id") as HTMLInputElement).checked,
            isPussy888: (document.getElementById("pussy888_id") as HTMLInputElement).checked,
            isMega888: (document.getElementById("mega888_id") as HTMLInputElement).checked,
            isJoker: (document.getElementById("joker_id") as HTMLInputElement).checked,

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

        if (this.selectOverCategory == 'Winover') {
            dataSelect.isAG = false;
            dataSelect.isDG = false;
            dataSelect.isSA = false;
            dataSelect.isPlaytech = false;
            dataSelect.isPragmatic = false;
            dataSelect.isSexyBaccarat = false;
            dataSelect.isWM = false;
            dataSelect.isAllBet = false;
            dataSelect.isMaxbet = false;
            dataSelect.isM8 = false;
        }

        if (this.selectOverCategory == 'Turnover') {
            dataSelect.is918Kiss = false;
            dataSelect.isPussy888 = false;
            dataSelect.isMega888 = false;
            dataSelect.isJoker = false;
        }

        if (dataSelect.turnovertime == undefined && dataSelect.winturn == undefined) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', "Please Select Turnover Times Or Winturn");
        }

        if ((dataSelect.turnovertime != undefined && dataSelect.winturn != undefined && dataSelect.winturn != 0 && dataSelect.turnovertime != 0)) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', "Please Select only one value either Turnover Times Or Winturn");
        }

        if ((dataSelect.winturn == 0 && dataSelect.turnovertime == 0)) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', "Please Select only one value either Turnover Times Or Winturn");
        }

        if (dataSelect.startDate === "NaN") {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', "Please Select Start date");
        }

        if (dataSelect.endDate === "NaN") {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', "Please Select End date");
        }

        if (dataSelect.description === undefined) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', "Please Give Proper Decription");
        }

        if (dataSelect.discount === "") {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', "Please Insert Discount");
        }

        if (dataSelect.discountType === "") {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', "Please Select Discount Type");
        }

        if (dataSelect.sequence === "") {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', "Please Select Sequence");
        }

        if (dataSelect.title === "") {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', "Please Insert Title");
        }
        if (this.baseMobile === undefined) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', "Please Select Mobile Banner Image");
        }

        if (this.baseDesktop === undefined) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', "Please Select Desktop Banner Image");
        }
        this.adminService.add<any>(customer.promotionAdd, dataSelect).subscribe(res => {
            this.uploadFile(res.data);
        }, error => {
            this.disabled = false;
            this.ngOnInit();
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion

    //#region uploadImage
    uploadFile(Id) {
        var dataSelect = {
            file: this.baseDesktop,
            mobilefile: this.baseMobile,
            id: Id
        }
        this.adminService.add<any>(customer.promotionImage, dataSelect).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            this.router.navigate(['admin/customers/promotion-list']);
        }, error => {
            this.disabled = false;
            this.ngOnInit();
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion

    async fileSelectDestop(event) {
        let file = event.target.files[0];
        this.baseDesktop = await this.readUploadedFileAsDataURL(file);
    }

    async fileSelectMobile(event) {
        let file = event.target.files[0];
        this.baseMobile = await this.readUploadedFileAsDataURL(file);
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