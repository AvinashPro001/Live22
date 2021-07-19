//#region
//#endregion

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ToasterService } from 'angular2-toaster';
import { account } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-homepagebanner-edit',
    templateUrl: './homepagebanner-edit.component.html',
    styleUrls: ['./homepagebanner-edit.component.scss']
})

export class HomepagebannerEditComponent implements OnInit {

    //#region Variable

    public Editor = DecoupledEditor;
    overValue: any;
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;
    disabled: boolean = false;
    meridian = true;
    files: any;
    model1: any;
    model: any;
    list: any;
    editorData: any;
    Language: any;
    T: any;
    baseDesktop: any;
    baseMobile: any;
    public quantities: Array<string> = [];
    public WinTurnquantities: Array<string> = [];
    sequenceList: any = [];
    data: any;
    isselected: Number;
    toggleMeridian() {
        this.meridian = !this.meridian;
    }
    public onReady(editor) {
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement(),

        );
        editor.setData(this.data.description);
    }

    //#endregion

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService) { }

    async ngOnInit() {
        if (await this.checkUpdatePermission()) {
            this.getHomepageBanner();
            this.getLanguage();
            Array(40).fill(0).map((x, i) => {
                this.sequenceList.push({ id: i + 1, sequence: i + 1 })
            });
        }
    }

    //#region Get Homepage Banner

    getHomepageBanner() {
        let datapromotion = JSON.parse(localStorage.getItem('homepageBannerData'));
        this.data = datapromotion as object[];
    }

    //#endregion

    //#region Get Language

    getLanguage() {
        this.adminService.get<any>(account.getLanguageList).subscribe(res => {
            this.Language = res.data;
        });
    }

    //#endregion

    //#region Update

    editHomePageBanner() {

    }

    //#endregion

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