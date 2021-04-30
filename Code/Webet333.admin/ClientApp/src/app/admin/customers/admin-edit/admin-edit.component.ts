import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-admin-edit',
    templateUrl: './admin-edit.component.html',
    styleUrls: ['./admin-edit.component.scss']
})

export class AdminEditComponent implements OnInit {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('status') status: TemplateRef<any>;
    @ViewChild('action') action: TemplateRef<any>;

    toaster: any;
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });

    rows = [];
    columns = [];
    totalRecords = 0;
    filteredData = [];
    defaultPermissionsList: any;
    defaultPermissionsListUpdate: any;
    soritngColumn = "";
    searchString = "";
    res: any;
    forEach: any;
    manualUpdate: any;
    loadingIndicator: boolean;
    final: any;
    viewData: any;
    disabled: boolean = false;

    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
    editCustomerForm: FormGroup;
    data: any;

    //#region Constructor

    constructor(
        public http: HttpClient,
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService) { }

    //#endregion Constructor

    //#region Init

    async ngOnInit() { if (await this.checkUpdatePermission()) this.getProfile(); }

    //#endregion

    //#region Get Profile

    getProfile() {
        let dataCustomer = JSON.parse(localStorage.getItem('adminData'));
        this.data = dataCustomer as object[];

        console.log(this.data);

        this.defaultPermissionsListUpdate = JSON.parse(this.data.Permissions);
        this.defaultPermissionsList = this.defaultPermissionsListUpdate;

        console.log(this.defaultPermissionsList);
    }

    //#endregion Get Profile

    //#region Change Password

    changePassword() {
        this.loadingIndicator = true;

        let model = {
            id: this.data.id,
            password: ((document.getElementById("txt_password") as HTMLInputElement).value),
        };

        if (model.password == null || model.password == undefined || model.password == '' || model.password == 'Nan' || model.password == 'null') {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', "Please fill password filed");
        }

        if (model.password.length < 6) {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', "This value is too short. It should have 6 characters or more");
        }

        this.adminService.add<any>(customer.adminUpdate, model).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);

            localStorage.removeItem('adminData');

            this.router.navigate(['admin/customers/admin-list']);
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });

        this.loadingIndicator = false;
    }

    //#endregion Change Password

    //#region Change Permission

    changePermission() {
        this.loadingIndicator = true;

        let model = {
            id: this.data.id,
            permissionsList: this.defaultPermissionsListUpdate
        };

        this.adminService.add<any>(customer.adminUpdate, model).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);

            localStorage.removeItem('adminData');

            this.router.navigate(['admin/customers/admin-list']);
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });

        this.loadingIndicator = false;
    }

    //#endregion Change Permission

    //#region Check Unchecked All

    //#region OldCode

    //checkUncheckAll(value) {
    //    for (var i = 0; i < this.defaultPermissionsListUpdate.length; i++) {
    //        //this.defaultPermissionsListUpdate[i].IsChecked = value;

    //        for (var j = 0; j < this.defaultPermissionsListUpdate[i].Permissions.length; j++) {
    //            this.defaultPermissionsListUpdate[i].Permissions[j].IsChecked = value;
    //        }

    //        if (this.defaultPermissionsListUpdate[i].submenu) {
    //            for (var k = 0; k < this.defaultPermissionsListUpdate[i].submenu.length; k++) {
    //                //this.defaultPermissionsListUpdate[i].submenu[k].IsChecked = value;

    //                for (var l = 0; l < this.defaultPermissionsListUpdate[i].submenu[k].Permissions.length; l++) {
    //                    this.defaultPermissionsListUpdate[i].submenu[k].Permissions[l].IsChecked = value;
    //                }

    //                if (this.defaultPermissionsListUpdate[i].submenu[k].submenu) {
    //                    for (var m = 0; m < this.defaultPermissionsListUpdate[i].submenu[k].submenu.length; m++) {
    //                        //this.defaultPermissionsListUpdate[i].submenu[k].submenu[m].IsChecked = value;

    //                        for (var n = 0; n < this.defaultPermissionsListUpdate[i].submenu[k].submenu[m].Permissions.length; n++) {
    //                            this.defaultPermissionsListUpdate[i].submenu[k].submenu[m].Permissions[n].IsChecked = value;
    //                        }
    //                    }
    //                }
    //            }
    //        }
    //    }

    //    console.log(this.defaultPermissionsListUpdate);
    //}

    //#endregion OldCode

    checkUncheckAll(value) {
        for (var i = 0; i < this.defaultPermissionsListUpdate.length; i++) {
            //this.defaultPermissionsListUpdate[i].IsChecked = value;

            for (var j = 0; j < this.defaultPermissionsListUpdate[i].Permissions.length; j++) {
                this.defaultPermissionsListUpdate[i].Permissions[j].IsChecked = value;
                if (value === true) this.defaultPermissionsListUpdate[i].Permissions[j].IsDisabled = false;
                if (value === false && j > 0) this.defaultPermissionsListUpdate[i].Permissions[j].IsDisabled = true;
            }

            if (this.defaultPermissionsListUpdate[i].submenu) {
                for (var k = 0; k < this.defaultPermissionsListUpdate[i].submenu.length; k++) {
                    //this.defaultPermissionsListUpdate[i].submenu[k].IsChecked = value;

                    for (var l = 0; l < this.defaultPermissionsListUpdate[i].submenu[k].Permissions.length; l++) {
                        this.defaultPermissionsListUpdate[i].submenu[k].Permissions[l].IsChecked = value;
                        if (value === true) this.defaultPermissionsListUpdate[i].submenu[k].Permissions[l].IsDisabled = false;
                        if (value === false && l > 0) this.defaultPermissionsListUpdate[i].submenu[k].Permissions[l].IsDisabled = true;
                    }

                    if (this.defaultPermissionsListUpdate[i].submenu[k].submenu) {
                        for (var m = 0; m < this.defaultPermissionsListUpdate[i].submenu[k].submenu.length; m++) {
                            //this.defaultPermissionsListUpdate[i].submenu[k].submenu[m].IsChecked = value;

                            for (var n = 0; n < this.defaultPermissionsListUpdate[i].submenu[k].submenu[m].Permissions.length; n++) {
                                this.defaultPermissionsListUpdate[i].submenu[k].submenu[m].Permissions[n].IsChecked = value;
                                if (value === true) this.defaultPermissionsListUpdate[i].submenu[k].submenu[m].Permissions[n].IsDisabled = false;
                                if (value === false && n > 0) this.defaultPermissionsListUpdate[i].submenu[k].submenu[m].Permissions[n].IsDisabled = true;
                            }
                        }
                    }
                }
            }
        }

        console.log(this.defaultPermissionsListUpdate);
    }

    //#endregion Check Unchecked All

    //#region Get Updated PermissionsList

    //#region Old Code

    //getUpdatedPermissionsList(permissionsList, menuList, permissionName = null,columnNumber = null) {
    //    //var viewPermission = menuList.Permissions[0].IsChecked;
    //    //var updatePermission = menuList.Permissions[1].IsChecked;
    //    //var addPermission = menuList.Permissions[2].IsChecked;

    //    //for (var i = 0; i < 1; i++) {
    //    //    for (var j = 0; j < menuList.Permissions.length; j = j + 3) {
    //    //        menuList.Permissions[j].IsChecked = viewPermission;
    //    //        menuList.Permissions[j + 1].IsChecked = updatePermission;
    //    //        menuList.Permissions[j + 2].IsChecked = addPermission;
    //    //    }

    //    //    if (menuList.submenu) {
    //    //        for (var k = 0; k < menuList.submenu.length; k++) {
    //    //            for (var l = 0; l < menuList.submenu[k].Permissions.length; l = l + 3) {
    //    //                menuList.submenu[k].Permissions[l].IsChecked = viewPermission;
    //    //                menuList.submenu[k].Permissions[l + 1].IsChecked = updatePermission;
    //    //                menuList.submenu[k].Permissions[l + 2].IsChecked = addPermission;
    //    //            }

    //    //            if (menuList.submenu[k].submenu) {
    //    //                for (var m = 0; m < menuList.submenu[k].submenu.length; m++) {
    //    //                    for (var n = 0; n < menuList.submenu[k].submenu[m].Permissions.length; n = n + 3) {
    //    //                        menuList.submenu[k].submenu[m].Permissions[n].IsChecked = viewPermission;
    //    //                        menuList.submenu[k].submenu[m].Permissions[n + 1].IsChecked = updatePermission;
    //    //                        menuList.submenu[k].submenu[m].Permissions[n + 2].IsChecked = addPermission;
    //    //                    }
    //    //                }
    //    //            }
    //    //        }
    //    //    }
    //    //}

    //    for (var i = 0; i < 1; i++) {
    //        for (var j = 0; j < menuList.Permissions.length; j++) {
    //            //menuList.Permissions[j].IsChecked = menuList.Permissions[j].IsChecked;
    //            menuList.Permissions[columnNumber].IsChecked = menuList.Permissions[columnNumber].IsChecked;
    //        }

    //        if (menuList.submenu) {
    //            for (var k = 0; k < menuList.submenu.length; k++) {
    //                for (var l = 0; l < menuList.submenu[k].Permissions.length; l++) {
    //                    //menuList.submenu[k].Permissions[l].IsChecked = menuList.Permissions[l].IsChecked;
    //                    menuList.submenu[k].Permissions[columnNumber].IsChecked = menuList.Permissions[columnNumber].IsChecked;
    //                }

    //                if (menuList.submenu[k].submenu) {
    //                    for (var m = 0; m < menuList.submenu[k].submenu.length; m++) {
    //                        for (var n = 0; n < menuList.submenu[k].submenu[m].Permissions.length; n++) {
    //                            //menuList.submenu[k].submenu[m].Permissions[n].IsChecked = menuList.Permissions[n].IsChecked;
    //                            menuList.submenu[k].submenu[m].Permissions[columnNumber].IsChecked = menuList.Permissions[columnNumber].IsChecked;
    //                        }
    //                    }
    //                }
    //            }
    //        }
    //    }

    //    if (permissionName === 'View' && menuList.Permissions[0].IsChecked === false) {
    //        for (var i = 0; i < 1; i++) {
    //            for (var j = 0; j < menuList.Permissions.length; j++) {
    //                menuList.Permissions[j].IsChecked = false;
    //            }

    //            if (menuList.submenu) {
    //                for (var k = 0; k < menuList.submenu.length; k++) {
    //                    for (var l = 0; l < menuList.submenu[k].Permissions.length; l++) {
    //                        menuList.submenu[k].Permissions[l].IsChecked = false;
    //                    }

    //                    if (menuList.submenu[k].submenu) {
    //                        for (var m = 0; m < menuList.submenu[k].submenu.length; m++) {
    //                            for (var n = 0; n < menuList.submenu[k].submenu[m].Permissions.length; n++) {
    //                                menuList.submenu[k].submenu[m].Permissions[n].IsChecked = false;
    //                            }
    //                        }
    //                    }
    //                }
    //            }
    //        }
    //    }

    //    this.defaultPermissionsListUpdate = permissionsList;

    //    console.log(this.defaultPermissionsListUpdate);
    //}

    //#endregion Old Code

    getUpdatedPermissionsList(permissionsList, menuList, permissionName = null, columnNumber = null, wholeMenuList = null, subMenuList = null, subSubMenuList = null) {
        //#region OldCode

        //var viewPermission = menuList.Permissions[0].IsChecked;
        //var updatePermission = menuList.Permissions[1].IsChecked;
        //var addPermission = menuList.Permissions[2].IsChecked;

        //for (var i = 0; i < 1; i++) {
        //    for (var j = 0; j < menuList.Permissions.length; j = j + 3) {
        //        menuList.Permissions[j].IsChecked = viewPermission;
        //        menuList.Permissions[j + 1].IsChecked = updatePermission;
        //        menuList.Permissions[j + 2].IsChecked = addPermission;
        //    }

        //    if (menuList.submenu) {
        //        for (var k = 0; k < menuList.submenu.length; k++) {
        //            for (var l = 0; l < menuList.submenu[k].Permissions.length; l = l + 3) {
        //                menuList.submenu[k].Permissions[l].IsChecked = viewPermission;
        //                menuList.submenu[k].Permissions[l + 1].IsChecked = updatePermission;
        //                menuList.submenu[k].Permissions[l + 2].IsChecked = addPermission;
        //            }

        //            if (menuList.submenu[k].submenu) {
        //                for (var m = 0; m < menuList.submenu[k].submenu.length; m++) {
        //                    for (var n = 0; n < menuList.submenu[k].submenu[m].Permissions.length; n = n + 3) {
        //                        menuList.submenu[k].submenu[m].Permissions[n].IsChecked = viewPermission;
        //                        menuList.submenu[k].submenu[m].Permissions[n + 1].IsChecked = updatePermission;
        //                        menuList.submenu[k].submenu[m].Permissions[n + 2].IsChecked = addPermission;
        //                    }
        //                }
        //            }
        //        }
        //    }
        //}

        //#endregion OldCode

        for (var i = 0; i < 1; i++) {
            for (var j = 0; j < menuList.Permissions.length; j++) {
                //menuList.Permissions[j].IsChecked = menuList.Permissions[j].IsChecked;

                if (!menuList.Permissions[j].IsDisabled && j === columnNumber) {
                    //menuList.Permissions[columnNumber].IsChecked = menuList.Permissions[columnNumber].IsChecked;

                    if (permissionName !== 'View' && menuList.Permissions[0].IsChecked) {
                        menuList.Permissions[columnNumber].IsChecked = menuList.Permissions[columnNumber].IsChecked;
                    } else if (permissionName === 'View') {
                        menuList.Permissions[0].IsChecked = menuList.Permissions[columnNumber].IsChecked;
                    }
                }
                else {
                    //menuList.Permissions[j].IsDisabled = false;

                    if (!menuList.Permissions[0].IsDisabled && menuList.Permissions[0].IsChecked) {
                        menuList.Permissions[j].IsDisabled = false;
                    }
                }
            }

            if (menuList.submenu) {
                for (var k = 0; k < menuList.submenu.length; k++) {
                    for (var l = 0; l < menuList.submenu[k].Permissions.length; l++) {
                        //menuList.submenu[k].Permissions[l].IsChecked = menuList.Permissions[l].IsChecked;
                        /*
                         */
                        //if (!menuList.submenu[k].Permissions[columnNumber].IsDisabled) {
                        //    menuList.submenu[k].Permissions[columnNumber].IsChecked = menuList.Permissions[columnNumber].IsChecked;
                        //}

                        if (!menuList.submenu[k].Permissions[l].IsDisabled && l === columnNumber) {
                            //menuList.submenu[k].Permissions[l].IsChecked = menuList.Permissions[columnNumber].IsChecked;

                            if (permissionName !== 'View' && menuList.submenu[k].Permissions[0].IsChecked) {
                                menuList.submenu[k].Permissions[l].IsChecked = menuList.Permissions[columnNumber].IsChecked;
                            } else if (permissionName === 'View') {
                                menuList.submenu[k].Permissions[0].IsChecked = menuList.Permissions[columnNumber].IsChecked;
                            }
                        }
                        else {
                            //menuList.submenu[k].Permissions[l].IsDisabled = false;

                            if (!menuList.submenu[k].Permissions[0].IsDisabled && menuList.submenu[k].Permissions[0].IsChecked) {
                                menuList.submenu[k].Permissions[l].IsDisabled = false;
                            }
                        }
                    }

                    if (menuList.submenu[k].submenu) {
                        for (var m = 0; m < menuList.submenu[k].submenu.length; m++) {
                            for (var n = 0; n < menuList.submenu[k].submenu[m].Permissions.length; n++) {
                                //menuList.submenu[k].submenu[m].Permissions[n].IsChecked = menuList.Permissions[n].IsChecked;

                                /*
                                 */
                                //if (!menuList.submenu[k].submenu[m].Permissions[columnNumber].IsDisabled) {
                                //    menuList.submenu[k].submenu[m].Permissions[columnNumber].IsChecked = menuList.Permissions[columnNumber].IsChecked;
                                //}

                                if (!menuList.submenu[k].submenu[m].Permissions[n].IsDisabled && n === columnNumber) {
                                    //menuList.submenu[k].submenu[m].Permissions[n].IsChecked = menuList.Permissions[columnNumber].IsChecked;

                                    if (permissionName !== 'View' && menuList.submenu[k].submenu[m].Permissions[0].IsChecked) {
                                        menuList.submenu[k].submenu[m].Permissions[n].IsChecked = menuList.Permissions[columnNumber].IsChecked;
                                    } else if (permissionName === 'View') {
                                        menuList.submenu[k].submenu[m].Permissions[0].IsChecked = menuList.Permissions[columnNumber].IsChecked;
                                    }
                                }
                                else {
                                    //menuList.submenu[k].submenu[m].Permissions[n].IsDisabled = false;

                                    if (!menuList.submenu[k].submenu[m].Permissions[0].IsDisabled && menuList.submenu[k].submenu[m].Permissions[0].IsChecked) {
                                        menuList.submenu[k].submenu[m].Permissions[n].IsDisabled = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (menuList.Permissions[columnNumber].IsChecked === true) {
            for (var i = 0; i < 1; i++) {
                wholeMenuList.Permissions[columnNumber].IsChecked = true;

                for (var j = 0; j < menuList.Permissions.length; j++) {
                    //wholeMenuList.Permissions[j].IsDisabled = false;

                    if (wholeMenuList.Permissions[0].IsChecked && j > 0) wholeMenuList.Permissions[j].IsDisabled = false;
                    else if (j > 0) wholeMenuList.Permissions[j].IsDisabled = true;
                }

                if (subMenuList !== null) {
                    subMenuList.Permissions[columnNumber].IsChecked = true;

                    for (var j = 0; j < subMenuList.Permissions.length; j++) {
                        //subMenuList.Permissions[j].IsDisabled = false;
                        if (subMenuList.Permissions[0].IsChecked && j > 0) subMenuList.Permissions[j].IsDisabled = false;
                        else if (j > 0) subMenuList.Permissions[j].IsDisabled = true;
                    }

                    if (subSubMenuList !== null) {
                        subSubMenuList.Permissions[columnNumber].IsChecked = true;

                        for (var j = 0; j < subSubMenuList.Permissions.length; j++) {
                            //subSubMenuList.Permissions[j].IsDisabled = false;
                            if (subSubMenuList.Permissions[0].IsChecked && j > 0) subSubMenuList.Permissions[j].IsDisabled = false;
                            else if (j > 0) subSubMenuList.Permissions[j].IsDisabled = true;
                        }
                    }
                }
            }
        }

        // If click on view nad permisson is false. Then uncheck all menu and sub menu. And Disabled all check box expect view.
        if (permissionName === 'View' && menuList.Permissions[0].IsChecked === false) {
            for (var i = 0; i < 1; i++) {
                for (var j = 0; j < menuList.Permissions.length; j++) {
                    if (menuList.Permissions[j].text !== 'View') {
                        menuList.Permissions[j].IsChecked = false;
                        menuList.Permissions[j].IsDisabled = true;
                    }
                    else {
                        menuList.Permissions[j].IsChecked = false;
                        menuList.Permissions[j].IsDisabled = false;
                    }
                }

                if (menuList.submenu) {
                    for (var k = 0; k < menuList.submenu.length; k++) {
                        for (var l = 0; l < menuList.submenu[k].Permissions.length; l++) {
                            if (menuList.Permissions[l].text !== 'View') {
                                menuList.submenu[k].Permissions[l].IsChecked = false;
                                menuList.submenu[k].Permissions[l].IsDisabled = true;
                            }
                            else {
                                menuList.submenu[k].Permissions[l].IsChecked = false;
                                menuList.submenu[k].Permissions[l].IsDisabled = false;
                            }
                        }

                        if (menuList.submenu[k].submenu) {
                            for (var m = 0; m < menuList.submenu[k].submenu.length; m++) {
                                for (var n = 0; n < menuList.submenu[k].submenu[m].Permissions.length; n++) {
                                    if (menuList.Permissions[n].text !== 'View') {
                                        menuList.submenu[k].submenu[m].Permissions[n].IsChecked = false;
                                        menuList.submenu[k].submenu[m].Permissions[n].IsDisabled = true;
                                    }
                                    else {
                                        menuList.submenu[k].submenu[m].Permissions[n].IsChecked = false;
                                        menuList.submenu[k].submenu[m].Permissions[n].IsDisabled = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        this.defaultPermissionsListUpdate = permissionsList;

        console.log(this.defaultPermissionsListUpdate);
    }

    //#endregion Get Updated PermissionsList

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[12].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[12].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[12].Permissions[2].IsChecked === true) {
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