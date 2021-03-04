import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ToasterService } from 'angular2-toaster';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { debug } from 'util';
import { Number } from 'core-js';
import { Router } from '@angular/router';

@Component({
    selector: 'app-m8-minmax',
    templateUrl: './m8-minmax.component.html',
    styleUrls: ['./m8-minmax.component.scss']
})
export class m8MinmaxComponent implements OnInit {
    selectedList: any;
    suspendValue: any;
    comtypeValue: any;

    com: any;
    comtype: any;
    lim1: any;
    lim2: any;
    lim3: any;
    lim4: any;
    max1: any;
    max2: any;
    max3: any;
    max4: any;
    max5: any;
    max6: any;
    max7: any;
    suspend: any;

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
        if (await this.checkViewPermission()) this.GetData();
    }

    GetData() {
        this.adminService.getAll<any>(customer.M8GetLimit).subscribe(res => {
            this.com = res.data.com,
                this.comtype = res.data.comtype,
                this.lim1 = res.data.lim1,
                this.lim2 = res.data.lim2,
                this.lim3 = res.data.lim3,
                this.lim4 = res.data.lim4,
                this.max1 = res.data.max1,
                this.max2 = res.data.max2,
                this.max3 = res.data.max3,
                this.max4 = res.data.max4,
                this.max5 = res.data.max5,
                this.max6 = res.data.max6,
                this.max7 = res.data.max7,
                this.suspend = res.data.suspend
        });
    }

    async Update() {
        if (await this.checkUpdatePermission()) {
            let dataSelect = {
                com: (document.getElementById("Com") as HTMLInputElement).value === "" ? null : (document.getElementById("Com") as HTMLInputElement).value,
                comtype: (document.getElementById("ComType") as HTMLInputElement).value === "" ? null : (document.getElementById("ComType") as HTMLInputElement).value,
                lim1: (document.getElementById("Lim1") as HTMLInputElement).value === "" ? null : (document.getElementById("Lim1") as HTMLInputElement).value,
                lim2: (document.getElementById("Lim2") as HTMLInputElement).value === "" ? null : (document.getElementById("Lim2") as HTMLInputElement).value,
                lim3: (document.getElementById("Lim3") as HTMLInputElement).value === "" ? null : (document.getElementById("Lim3") as HTMLInputElement).value,
                lim4: (document.getElementById("Lim4") as HTMLInputElement).value === "" ? null : (document.getElementById("Lim4") as HTMLInputElement).value,
                max1: (document.getElementById("Max1") as HTMLInputElement).value === "" ? null : (document.getElementById("Max1") as HTMLInputElement).value,
                max2: (document.getElementById("Max2") as HTMLInputElement).value === "" ? null : (document.getElementById("Max2") as HTMLInputElement).value,
                max3: (document.getElementById("Max3") as HTMLInputElement).value === "" ? null : (document.getElementById("Max3") as HTMLInputElement).value,
                max4: (document.getElementById("Max4") as HTMLInputElement).value === "" ? null : (document.getElementById("Max4") as HTMLInputElement).value,
                max5: (document.getElementById("Max5") as HTMLInputElement).value === "" ? null : (document.getElementById("Max5") as HTMLInputElement).value,
                max6: (document.getElementById("Max6") as HTMLInputElement).value === "" ? null : (document.getElementById("Max6") as HTMLInputElement).value,
                max7: (document.getElementById("Max7") as HTMLInputElement).value === "" ? null : (document.getElementById("Max7") as HTMLInputElement).value,
                suspend: (document.getElementById("Suspend") as HTMLInputElement).value === "" ? null : (document.getElementById("Suspend") as HTMLInputElement).value
            }

            this.adminService.add<any>(customer.M8SetLimit, dataSelect).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.GetData();
            }, error => {
                this.ngOnInit();
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[6].Permissions[0].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[6].submenu[0].Permissions[0].IsChecked === true) {
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
                if (usersPermissions.permissionsList[1].submenu[6].submenu[0].Permissions[1].IsChecked === true) {
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
                if (usersPermissions.permissionsList[1].submenu[6].submenu[0].Permissions[2].IsChecked === true) {
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