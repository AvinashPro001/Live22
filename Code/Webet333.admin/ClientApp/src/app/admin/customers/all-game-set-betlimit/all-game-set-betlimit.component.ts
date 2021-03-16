import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ToasterService } from 'angular2-toaster';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-all-game-set-betlimit',
    templateUrl: './all-game-set-betlimit.component.html',
    styleUrls: ['./all-game-set-betlimit.component.scss']
})
export class AllGameSetBetlimitComponent implements OnInit {
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router
    ) { }

    agLimit: any;
    sexyLimit: any;
    dgLimit: any;

    async ngOnInit() {
        if (await this.checkViewPermission()) this.getBetLimit();
    }

    async AgSetLimit() {
        if (await this.checkUpdatePermission()) {
            var betlimitVal = ((document.getElementById("txt_ag") as HTMLInputElement).value);

            let model = {
                bettingLimit: betlimitVal
            }

            await this.adminService.add<any>(customer.agBetLimit, model).toPromise().then(res => {
                this.toasterService.pop('success', 'Successfully', res.message);
                this.ngOnInit();
            }).catch(error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    async DgSetLimit() {
        if (await this.checkUpdatePermission()) {
            var betlimitVal = ((document.getElementById("txt_dgbetLimit") as HTMLInputElement).value);

            let model = {
                bettingLimit: betlimitVal
            }

            await this.adminService.add<any>(customer.dgBetLimit, model).toPromise().then(res => {
                this.toasterService.pop('success', 'Successfully', res.message);
                this.ngOnInit();
                this.adminService.get<any>(customer.SetDGBetLimit).toPromise().then(res => {
                });
            }).catch(error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    async SexySetLimit() {
        if (await this.checkUpdatePermission()) {
            var betlimitVal = ((document.getElementById("txt_sexyBetlimit") as HTMLInputElement).value);

            let model = {
                delete: false,
                betLimit: betlimitVal
            }

            await this.adminService.add<any>(customer.sexyBetLimit, model).toPromise().then(res => {
                this.toasterService.pop('success', 'Successfully', res.message);
                this.ngOnInit();
                this.adminService.get<any>(customer.SetSexyBetLimit).toPromise().then(res => {
                });
            }).catch(error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    async SexyDeleteLimit() {
        if (await this.checkUpdatePermission()) {
            var betlimitVal = ((document.getElementById("txt_sexyBetlimit") as HTMLInputElement).value);

            let model = {
                delete: true,
                betLimit: betlimitVal
            }

            await this.adminService.add<any>(customer.sexyBetLimit, model).toPromise().then(res => {
                this.toasterService.pop('success', 'Successfully', res.message);
                this.ngOnInit();
                this.adminService.get<any>(customer.SetSexyBetLimit).toPromise().then(res => {
                });
            }).catch(error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    async getBetLimit() {
        this.adminService.get<any>(customer.getBetLimit).toPromise().then(res => {
            this.agLimit = res.data.aGbettingLimits;
            this.dgLimit = res.data.dGbettingLimits;
            this.sexyLimit = res.data.sexybettingLimits.SEXYBCRT.LIVE.limitId;
        }).catch(error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[8].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[8].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[8].Permissions[2].IsChecked === true) {
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