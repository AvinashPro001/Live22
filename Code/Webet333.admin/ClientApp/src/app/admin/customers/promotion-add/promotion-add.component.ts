import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer, account } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

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

    displayCategory: boolean = false;
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
    ngOnInit() {
        this.getLanguage();
        this.getHtml();

        for (let i = 0; i <= 100; i++) {
            this.quantities.push(i + "X")
            this.WinTurnquantities.push(i + "X")
        }
        Array(40).fill(0).map((x, i) => {
            this.listType.push({ id: i + 1, sequence: i + 1 })
        });
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
        private router: Router
    ) { }
    //#endregion

    OnSelect(event) {
        this.turnoverValue = event.value != undefined ? Number(event.value.replace("X", "")) : event.value;
        if (this.turnoverValue == undefined) {
            this.displayCategory = false;
        }
        else {
            this.displayCategory = true;
        }
    }

    OnSelectWinTurn(event) {
        this.WinTurn = event.value != undefined ? Number(event.value.replace("X", "")) : event.value;
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
            isLiveCategory: (document.getElementById("chk_isLiveCategory") as HTMLInputElement).checked,
            isSportsCategory: (document.getElementById("chk_isSportsCategory") as HTMLInputElement).checked,
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

        if (dataSelect.turnovertime != 0) {
            if (dataSelect.isSportsCategory == false && dataSelect.isLiveCategory == false) {
                this.disabled = false;
                return this.toasterService.pop('error', 'Error', "Please Select Atleast one category !!");
            }
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


    empList: Array<{ GameName: string, GameValue: number }> = [];

    makeModelJsonString(event, gamename) {
        if (this.empList.some((item) => item.GameName == gamename)) {
            this.empList = this.empList.filter(x => x.GameName != gamename);
        }

        this.empList.push({ GameName: gamename, GameValue: event.target.checked });
        console.log(JSON.stringify(this.empList));
    }

    getHtml() {
        this.adminService.getAll<any>(customer.promotionHtml).subscribe(res => {
            debugger
            document.getElementById("turnover_CheckBoxs").innerHTML = res.data.turnoverHtml;
            document.getElementById("winover_CheckBoxs").innerHTML = res.data.winover;
        }, error => {
        });
    }

}