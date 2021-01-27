import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ToasterService } from 'angular2-toaster';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
    selector: 'app-maxbet-limit',
    templateUrl: './maxbet-limit.component.html',
    styleUrls: ['./maxbet-limit.component.scss']
})
export class MaxbetLimitComponent implements OnInit {

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router
    ) { }

    async ngOnInit() {
        await this.checkViewPermission();
    }


    async SetLimit() {
        if (await this.checkUpdatePermission()) {
            let model = {
                sportmin: ((document.getElementById("sportmin") as HTMLInputElement).value),
                sportmax: ((document.getElementById("sportmax") as HTMLInputElement).value),
                sportmatch: ((document.getElementById("sportmatch") as HTMLInputElement).value),
                othersportmin: ((document.getElementById("othersportmin") as HTMLInputElement).value),
                othersportmax: ((document.getElementById("othersportmax") as HTMLInputElement).value),
                othersportmatch: ((document.getElementById("othersportmatch") as HTMLInputElement).value),
                othersportball: ((document.getElementById("othersportball") as HTMLInputElement).value),
                maxparleymin: ((document.getElementById("maxparleymin") as HTMLInputElement).value),
                maxparleymax: ((document.getElementById("maxparleymax") as HTMLInputElement).value),
                maxparleymatch: ((document.getElementById("maxparleymatch") as HTMLInputElement).value),

                maxbetSportsType1Min: ((document.getElementById("sporttype1min") as HTMLInputElement).value),
                maxbetSportsType1Match: ((document.getElementById("sporttype1match") as HTMLInputElement).value),
                maxbetSportsType1Max: ((document.getElementById("sporttype1max") as HTMLInputElement).value),
            }
            await this.adminService.add<any>(customer.maxbetSetLimit, model).toPromise().then(res => {
                this.toasterService.pop('success', 'Successfully', res.message);
            }).catch(error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    async ResetLimit() {
        if (await this.checkUpdatePermission()) {
            this.adminService.get<any>(customer.maxbetReset).toPromise().then(res => {
                this.toasterService.pop('success', 'Successfully', res.message);
            }).catch(error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[5].Permissions[0].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[5].submenu[1].Permissions[0].IsChecked === true) {
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
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkUpdatePermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[5].Permissions[1].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[5].submenu[1].Permissions[1].IsChecked === true) {
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
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkAddPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[5].Permissions[2].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[5].submenu[1].Permissions[2].IsChecked === true) {
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
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    //#endregion Check Permission
}
