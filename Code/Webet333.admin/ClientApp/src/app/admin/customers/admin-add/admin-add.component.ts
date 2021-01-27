import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { ConfirmationDialogService } from '../../../../app/confirmation-dialog/confirmation-dialog.service';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-admin-add',
    templateUrl: './admin-add.component.html',
    styleUrls: ['./admin-add.component.scss']
})

export class AdminAddComponent implements OnInit {
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

    //#region Constructor

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private confirmationDialogService: ConfirmationDialogService,
        private modalService: NgbModal
    ) { }

    //#endregion Constructor

    //#region OnInit

    async ngOnInit() {
        if (await this.checkAddPermission()) this.getDefaultPermissions();
    }

    //#endregion OnInit

    //#region Get Default Permissions

    getDefaultPermissions() {
        this.loadingIndicator = true;

        let data = { role: 'admin' };

        this.adminService.add<any>(customer.defaultPermissionList, data).subscribe(res => {
            this.defaultPermissionsList = res.data;
            this.defaultPermissionsList = this.defaultPermissionsList.permissionsList;
            this.defaultPermissionsListUpdate = this.defaultPermissionsList;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });

        this.loadingIndicator = false;
    }

    //#endregion Get Default Permissions

    //#region Get Updated PermissionsList

    getUpdatedPermissionsList(permissionsList) {
        this.defaultPermissionsListUpdate = permissionsList;

        console.log(this.defaultPermissionsListUpdate);
    }

    //#endregion Get Updated PermissionsList

    //#region Check Unchecked All

    checkUncheckAll() {
        for (var i = 0; i < this.defaultPermissionsListUpdate.length; i++) {
            //this.defaultPermissionsListUpdate[i].IsChecked = false;

            for (var j = 0; j < this.defaultPermissionsListUpdate[i].Permissions.length; j++) {
                this.defaultPermissionsListUpdate[i].Permissions[j].IsChecked = false;
            }

            if (this.defaultPermissionsListUpdate[i].submenu) {
                for (var k = 0; k < this.defaultPermissionsListUpdate[i].submenu.length; k++) {
                    //this.defaultPermissionsListUpdate[i].submenu[k].IsChecked = false;

                    for (var l = 0; l < this.defaultPermissionsListUpdate[i].submenu[k].Permissions.length; l++) {
                        this.defaultPermissionsListUpdate[i].submenu[k].Permissions[l].IsChecked = false;
                    }

                    if (this.defaultPermissionsListUpdate[i].submenu[k].submenu) {
                        for (var m = 0; m < this.defaultPermissionsListUpdate[i].submenu[k].submenu.length; m++) {
                            //this.defaultPermissionsListUpdate[i].submenu[k].submenu[m].IsChecked = false;

                            for (var n = 0; n < this.defaultPermissionsListUpdate[i].submenu[k].submenu[m].Permissions.length; n++) {
                                this.defaultPermissionsListUpdate[i].submenu[k].submenu[m].Permissions[n].IsChecked = false;
                            }
                        }
                    }
                }
            }
        }

        console.log(this.defaultPermissionsListUpdate);
    }

    //#endregion Check Unchecked All

    //#region Add Admin

    addAdmin() {
        this.loadingIndicator = true;

        let data =
        {
            username: ((document.getElementById("txt_username") as HTMLInputElement).value),
            password: ((document.getElementById("txt_password") as HTMLInputElement).value),
            permissionsList: this.defaultPermissionsListUpdate
        };

        if (data.password == null || data.password == undefined || data.password == '') {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', "Please fill password filed");
        }

        if (data.username == null || data.username == undefined || data.username == '') {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', "Please fill username filed");
        }

        if (data.permissionsList == null || data.permissionsList == undefined || data.permissionsList == '') {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', "Please fill permissions filed");
        }

        this.adminService.add<any>(customer.adminAdd, data).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            this.router.navigate(['admin/customers/admin-list']);
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });

        this.loadingIndicator = false;
    }

    //#endregion Add Admin

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[12].Permissions[0].IsChecked === true) {
                return true;
            }
            else {
                this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
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
                this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
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
                this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    //#endregion Check Permission
}