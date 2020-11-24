import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer, account } from '../../../../environments/environment';
import { NgbPaginationModule, NgbAlertModule, NgbDateStruct, NgbCalendar, NgbTimeStruct, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';

class ImageSnippet {
    pending: boolean = false;
    status: string = 'init';

    constructor(public src: string, public file: File) { }
}
@Component({
    selector: 'app-admin/announcement/announcement-add',
    templateUrl: './announcement-add.component.html',
    styleUrls: ['./announcement-add.component.scss']
})

export class AnnouncementAddComponent implements OnInit {
    disabled: boolean = false;
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;
    timeStart = { hour: 13, minute: 30 };
    timeEnd = { hour: 13, minute: 30 };
    meridian = true;
    myInput: any;
    files: any;
    model1: any;
    model: any;
    list: any;
    T: any;
    ddlData: any;
    walletType: any;
    promotionList: any;
    promotionListhtml: string;
    depositType: any;
    selectedList1: any;
    selectedList3: any;
    itemCount: any;
    length: any;
    myVar: any;
    toggleMeridian() {
        this.meridian = !this.meridian;
    }
    Language: any;

    //#region variable
    customerData: any
    customerWallet: any
    kissBal: any
    mainBal: any
    //#endregion
    //#region ngOnInit
    ngOnInit() {
        this.getLanguage();
    }
    //#endregion

    getLanguage() {
        this.adminService.get<any>(account.getLanguageList).subscribe(res => {
            this.Language = res.data;
        });
    }

    //#region onChange
    onChange(event) {
        var newVal = event.target.value;
    }
    //#endregion

    //#region constructor
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router
    ) { }
    //#endregion

    //#region AddPromotion
    addAnnouncement() {
        this.disabled = true;
        let dataSelect = {
            announcement: ((document.getElementById("txt_reference") as HTMLInputElement).value),
            languageid: (document.getElementById("ddlLanguage") as HTMLInputElement).value
        }



        this.adminService.add<any>(customer.announcementAdd, dataSelect).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            this.router.navigate(['admin/customers/announcement-list']);
        }, error => {
            this.disabled = false;
            this.ngOnInit();
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }
}
