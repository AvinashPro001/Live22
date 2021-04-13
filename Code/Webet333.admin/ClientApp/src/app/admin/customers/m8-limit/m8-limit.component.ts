import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ToasterService } from 'angular2-toaster';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { async } from '@angular/core/testing';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';

@Component({
    selector: 'app-m8-limit',
    templateUrl: './m8-limit.component.html',
    styleUrls: ['./m8-limit.component.scss']
})
export class m8LimitComponent implements OnInit {
    comType: any = [
        { comtype: "A" },
        { comtype: "B" },
        { comtype: "C" },
        { comtype: "D" },
        { comtype: "E" },
        { comtype: "F" },
        { comtype: "4" },
        { comtype: "V" },
    ];

    suspendList: any = [
        { suspend: "0" },
        { suspend: "1" },
    ];

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
                com: (document.getElementById("Com") as HTMLInputElement).value,
                comtype: (document.getElementById("ComType") as HTMLInputElement).value,
                lim1: (document.getElementById("Lim1") as HTMLInputElement).value,
                lim2: (document.getElementById("Lim2") as HTMLInputElement).value,
                lim3: (document.getElementById("Lim3") as HTMLInputElement).value,
                lim4: (document.getElementById("Lim4") as HTMLInputElement).value,
                max1: (document.getElementById("Max1") as HTMLInputElement).value,
                max2: (document.getElementById("Max2") as HTMLInputElement).value,
                max3: (document.getElementById("Max3") as HTMLInputElement).value,
                max4: (document.getElementById("Max4") as HTMLInputElement).value,
                max5: (document.getElementById("Max5") as HTMLInputElement).value,
                max6: (document.getElementById("Max6") as HTMLInputElement).value,
                max7: (document.getElementById("Max7") as HTMLInputElement).value,
                suspend: (document.getElementById("Suspend") as HTMLInputElement).value
            }
            await this.adminService.add<any>(customer.M8UsersLimitSet, model).toPromise().then(res => {
                this.toasterService.pop('success', 'Successfully', res.message);
                this.ngOnInit()
            }).catch(error => {
                var splitted = error.error.message.split(";");
                for (var i = 0; i < splitted.length; i++)
                    this.toasterService.pop('error', 'Error', splitted[i]);
            });
        }
    }

    async ResetLimit() {
        if (await this.checkUpdatePermission()) {
            this.adminService.get<any>(customer.M8UsersLimitReset).toPromise().then(res => {
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
            if (usersPermissions.permissionsList[1].submenu[6].Permissions[0].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[6].submenu[1].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[6].Permissions[1].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[6].submenu[1].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[6].Permissions[2].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[6].submenu[1].Permissions[2].IsChecked === true) {
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