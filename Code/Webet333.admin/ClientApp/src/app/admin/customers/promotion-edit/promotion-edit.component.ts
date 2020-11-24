import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer, account } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';


@Component({
    selector: 'app-promotion-edit',
    templateUrl: './promotion-edit.component.html',
    styleUrls: ['./promotion-edit.component.scss']
})
export class PromotionEditComponent implements OnInit {

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
    displayCategory: boolean;
    public quantities: Array<string> = [];
    public WinTurnquantities: Array<string> = [];
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
        private router: Router
    ) { }

    listType: any = [];

    Type: any = [
        { id: "Percentage", type: "Percentage" },
        { id: "Amount", type: "Amount" },
    ];



    ngOnInit() {
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
        if (this.turnoverValue == 0) {
            this.displayCategory = false;
        }
        else {
            this.displayCategory =true;
        }
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
            discount: (document.getElementById("txt_discountId") as HTMLInputElement).value,
            sequence: (document.getElementById("ddlSequence") as HTMLInputElement).value,
            languageid: (document.getElementById("ddlLanguage") as HTMLInputElement).value,
            description: this.editorData === undefined ? null : this.editorData,
            isdailyavail: (document.getElementById("chk_isdaily") as HTMLInputElement).checked,
            isdepositpage: (document.getElementById("chk_isdepositpage") as HTMLInputElement).checked,
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
        if (dataSelect.turnovertime == 0 && dataSelect.winturn == 0) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', "Please Select Turnover Times Or Winturn");
        }

        if (dataSelect.turnovertime != 0 && dataSelect.winturn != 0) {
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

        this.adminService.add<any>(customer.promotionUpdate, dataSelect).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            if (this.baseDesktop !== undefined || this.baseMobile !== undefined)
                this.uploadFile(res.data);
            else
                this.router.navigate(['admin/customers/promotion-list']);

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

}
