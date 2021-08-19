//#region
//#endregion

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-homepagebanner-add',
    templateUrl: './homepagebanner-add.component.html',
    styleUrls: ['./homepagebanner-add.component.scss']
})

export class HomepagebannerAddComponent implements OnInit {

    //#region Variable

    disabled: boolean = false;
    files: any;
    list: any;
    Language: any;
    T: any;

    languageIdEnglish: any;
    baseDesktopEnglish: any;
    baseMobileEnglish: any;

    languageIdMalay: any;
    baseDesktopMalay: any;
    baseMobileMalay: any;

    languageIdChinese: any;
    baseDesktopChinese: any;
    baseMobileChinese: any;

    sequenceList: any = [];

    //#endregion

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService) { }

    //#region ngOnInit

    async ngOnInit() {
        if (await this.checkAddPermission()) {
            Array(40).fill(0).map((x, i) => {
                this.sequenceList.push({ id: i + 1, sequence: i + 1 })
            });
        }
    }

    //#endregion ngOnInit

    //#region Select image for web and mobile

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

    //#region Add HomePageBanner

    addHomePageBanner() {
        this.disabled = true;

        let model = {
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

        if (this.commonService.CheckVariable(this.baseMobileEnglish)) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectMobileBannerImage);
        }
        if (this.commonService.CheckVariable(this.baseDesktopEnglish)) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectDesktopBannerImage);
        }

        if (this.commonService.CheckVariable(this.baseMobileChinese)) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectMobileBannerImage);
        }
        if (this.commonService.CheckVariable(this.baseDesktopChinese)) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectDesktopBannerImage);
        }

        if (this.commonService.CheckVariable(this.baseMobileMalay)) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectMobileBannerImage);
        }
        if (this.commonService.CheckVariable(this.baseDesktopMalay)) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectDesktopBannerImage);
        }

        this.adminService.add<any>(customer.homePageBannerAdd, model).subscribe(res => {
            this.uploadFile(res.data);
        }, error => {
            this.disabled = false;
            this.ngOnInit();
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion

    //#region UploadImage

    uploadFile(res) {
        let model = {
            bannerIdEnglish: res.idEnglish,
            bannerWebEnglish: this.baseDesktopEnglish,
            bannerMobileEnglish: this.baseMobileEnglish,

            bannerIdMalay: res.idMalay,
            bannerWebMalay: this.baseDesktopMalay,
            bannerMobileMalay: this.baseMobileMalay,

            bannerIdChinese: res.idChinese,
            bannerWebChinese: this.baseDesktopChinese,
            bannerMobileChinese: this.baseMobileChinese,

            id: res.id
        };

        this.adminService.add<any>(customer.homePageBannerImage, model).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            this.router.navigate(['admin/customers/homepage-banner-list']);
        }, error => {
            this.disabled = false;
            this.ngOnInit();
            this.toasterService.pop('error', 'Error', error.error.message);
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