import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-usergroup-add',
    templateUrl: './usergroup-add.component.html',
    styleUrls: ['./usergroup-add.component.scss']
})

export class UsergroupAddComponent implements OnInit {
    usersPermissions: any;
    disabled: boolean = false;
    toaster: any;
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });
    res: any;
    forEach: any;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService) { }

    ngOnInit() {
        this.usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        this.checkAddPermission();
    }

    addUserGroup() {
        this.disabled = true;
        let userGroupName = (document.getElementById("txt_usergroupname") as HTMLInputElement).value;

        if (userGroupName == null || userGroupName == '' || userGroupName == undefined) this.toasterService.pop('error', 'Error', this.commonService.errorMessage.InvalidateUserGroupName);

        let model = {
            name: userGroupName
        }

        this.adminService.add<any>(customer.userGroupInsert, model).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            (document.getElementById("txt_usergroupname") as HTMLInputElement).value = '';
            this.router.navigate(['admin/customers/usergroup-list']);
        }, error => {
            this.disabled = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region Check Permission

    async checkViewPermission() {
        if (this.usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (this.usersPermissions.permissionsList[1].submenu[14].Permissions[0].IsChecked === true) {
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
        if (this.usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (this.usersPermissions.permissionsList[1].submenu[14].Permissions[1].IsChecked === true) {
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
        if (this.usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
            if (this.usersPermissions.permissionsList[1].submenu[14].Permissions[2].IsChecked === true) {
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