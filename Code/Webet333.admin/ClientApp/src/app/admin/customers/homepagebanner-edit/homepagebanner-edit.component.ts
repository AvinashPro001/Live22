//#region
//#endregion

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-homepagebanner-edit',
    templateUrl: './homepagebanner-edit.component.html',
    styleUrls: ['./homepagebanner-edit.component.scss']
})

export class HomepagebannerEditComponent implements OnInit {

    //#region Variable

    disabled: boolean = false;
    files: any;
    T: any;
    sequenceList: any = [];
    data: any;

    languageIdEnglish: any;
    baseDesktopEnglish: any;
    baseMobileEnglish: any;

    languageIdMalay: any;
    baseDesktopMalay: any;
    baseMobileMalay: any;

    languageIdChinese: any;
    baseDesktopChinese: any;
    baseMobileChinese: any;

    //#endregion

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService) { }

    async ngOnInit() {
        if (await this.checkUpdatePermission()) {
            this.getHomepageBanner();
            Array(40).fill(0).map((x, i) => {
                this.sequenceList.push({ id: i + 1, sequence: i + 1 })
            });
        }
    }

    //#region Get Homepage Banner

    getHomepageBanner() {
        let homepageBannerData = JSON.parse(localStorage.getItem('homepageBannerData'));
        this.data = homepageBannerData as object[];

        let model = {
            id: this.data.id
        };

        this.adminService.add<any>(customer.homePageBannerSelectById, model).subscribe(res => {
            this.data = res.data;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
            this.router.navigate(['admin/customers/homepage-banner-list']);
        });
    }

    //#endregion

    //#region Update

    UpdateHomePageBanner() {
        let model = {
            id: this.data.id,
            sequence: (document.getElementById("ddlSequence") as HTMLInputElement).value,
            titleEnglish: (document.getElementById("txt_title_english") as HTMLInputElement).value,
            titleMalay: (document.getElementById("txt_title_malay") as HTMLInputElement).value,
            titleChinese: (document.getElementById("txt_title_chinese") as HTMLInputElement).value,
        };

        if (this.commonService.CheckVariable(model.sequence)) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectSequence);
        }

        if (this.commonService.CheckVariable(model.titleEnglish)) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseInsertTitle);
        }
        if (this.commonService.CheckVariable(model.titleChinese)) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseInsertTitle);
        }
        if (this.commonService.CheckVariable(model.titleMalay)) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseInsertTitle);
        }

        this.adminService.add<any>(customer.homePageBannerUpdate, model).subscribe(res => {
            if (this.baseDesktopEnglish !== undefined || this.baseMobileEnglish !== undefined ||
                this.baseMobileChinese !== undefined || this.baseDesktopChinese !== undefined ||
                this.baseMobileMalay !== undefined || this.baseDesktopMalay !== undefined
            ) this.uploadFile(res.data);
            else this.router.navigate(['admin/customers/homepage-banner-list']);
        }, error => {
            this.disabled = false;
            this.ngOnInit();
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion

    //#region uploadImage

    uploadFile(res) {
        let model = {
            bannerIdEnglish: res.idEnglish,
            bannerWebEnglish: this.baseDesktopEnglish === undefined ? null : this.baseDesktopEnglish,
            bannerMobileEnglish: this.baseMobileEnglish === undefined ? null : this.baseMobileEnglish,

            bannerIdMalay: res.idMalay,
            bannerWebMalay: this.baseDesktopMalay === undefined ? null : this.baseDesktopMalay,
            bannerMobileMalay: this.baseMobileMalay === undefined ? null : this.baseMobileMalay,

            bannerIdChinese: res.idChinese,
            bannerWebChinese: this.baseDesktopChinese === undefined ? null : this.baseDesktopChinese,
            bannerMobileChinese: this.baseMobileChinese === undefined ? null : this.baseMobileChinese,

            id: res.id
        };

        this.adminService.add<any>(customer.homePageBannerImageUpdate, model).subscribe(res => {
            this.router.navigate(['admin/customers/homepage-banner-list']);
        }, error => {
            this.disabled = false;
            this.ngOnInit();
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion

    //#region File select

    async fileSelectDestopEnglish(event) {
        let file = event.target.files[0];
        this.baseDesktopEnglish = await this.readUploadedFileAsDataURL(file);
    }

    async fileSelectMobileEnglish(event) {
        let file = event.target.files[0];
        this.baseMobileEnglish = await this.readUploadedFileAsDataURL(file);
    }

    async fileSelectDestopMalay(event) {
        let file = event.target.files[0];
        this.baseDesktopMalay = await this.readUploadedFileAsDataURL(file);
    }

    async fileSelectMobileMalay(event) {
        let file = event.target.files[0];
        this.baseMobileMalay = await this.readUploadedFileAsDataURL(file);
    }

    async fileSelectDestopChinese(event) {
        let file = event.target.files[0];
        this.baseDesktopChinese = await this.readUploadedFileAsDataURL(file);
    }

    async fileSelectMobileChinese(event) {
        let file = event.target.files[0];
        this.baseMobileChinese = await this.readUploadedFileAsDataURL(file);
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

    //#endregion

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[17].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[17].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[17].Permissions[2].IsChecked === true) {
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