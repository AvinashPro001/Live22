import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';
import { CommonService } from '../../../common/common.service';

@Component({
    selector: 'app-maxbet-betting-limit',
    templateUrl: './maxbet-betting-limit.component.html',
    styleUrls: ['./maxbet-betting-limit.component.scss']
})

export class MaxbetBettingLimitComponent implements OnInit {
    sportmin: any;
    sportmax: any;
    sportmatch: any;
    othersportmin: any;
    othersportmax: any;
    othersportmatch: any;
    othersportball: any;
    maxparleymin: any;
    maxparleymax: any;
    maxparleymatch: any;

    sporttype1min: any;
    sporttype1max: any;
    sporttype1match: any;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) this.GetData();
    }

    GetData() {
        this.adminService.getAll<any>(customer.MaxbetGetDefaultVariable).subscribe(res => {
            this.sportmin = res.data.sportMin;
            this.sportmax = res.data.sportMax;
            this.sportmatch = res.data.sportMatch;
            this.othersportmin = res.data.otherSportMin;
            this.othersportmax = res.data.otherSportMax;
            this.othersportmatch = res.data.otherSportMatch;
            this.othersportball = res.data.otherSportBall;
            this.maxparleymin = res.data.maxParleyMin;
            this.maxparleymax = res.data.maxParleyMax;
            this.maxparleymatch = res.data.maxParleyMatch;

            this.sporttype1min = res.data.maxbetSportsType1Min;
            this.sporttype1max = res.data.maxbetSportsType1Max;
            this.sporttype1match = res.data.maxbetSportsType1Match;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    async Update() {
        if (await this.checkUpdatePermission()) {
            var sportmin = ((document.getElementById("sportmin") as HTMLInputElement).value);
            var sportmax = ((document.getElementById("sportmax") as HTMLInputElement).value);
            var sportmatch = ((document.getElementById("sportmatch") as HTMLInputElement).value);
            var othersportmin = ((document.getElementById("othersportmin") as HTMLInputElement).value);
            var othersportmax = ((document.getElementById("othersportmax") as HTMLInputElement).value);
            var othersportmatch = ((document.getElementById("othersportmatch") as HTMLInputElement).value);
            var othersportball = ((document.getElementById("othersportball") as HTMLInputElement).value);
            var maxparleymin = ((document.getElementById("maxparleymin") as HTMLInputElement).value);
            var maxparleymax = ((document.getElementById("maxparleymax") as HTMLInputElement).value);
            var maxparleymatch = ((document.getElementById("maxparleymatch") as HTMLInputElement).value);

            var sporttype1min = ((document.getElementById("sporttype1min") as HTMLInputElement).value);
            var sporttype1max = ((document.getElementById("sporttype1max") as HTMLInputElement).value);
            var sporttype1match = ((document.getElementById("sporttype1match") as HTMLInputElement).value);

            let model = {
                sportmin: sportmin == "" ? null : sportmin,
                sportmax: sportmax == "" ? null : sportmax,
                sportmatch: sportmatch == "" ? null : sportmatch,
                othersportmin: othersportmin == "" ? null : othersportmin,
                othersportmax: othersportmax == "" ? null : othersportmax,
                othersportmatch: othersportmatch == "" ? null : othersportmatch,
                othersportball: othersportball == "" ? null : othersportball,
                maxparleymin: maxparleymin == "" ? null : maxparleymin,
                maxparleymax: maxparleymax == "" ? null : maxparleymax,
                maxparleymatch: maxparleymatch == "" ? null : maxparleymatch,

                maxbetSportsType1Min: sporttype1min == "" ? null : sporttype1min,
                maxbetSportsType1Match: sporttype1match == "" ? null : sporttype1match,
                maxbetSportsType1Max: sporttype1max == "" ? null : sporttype1max
            }

            this.adminService.add<any>(customer.MaxbetDefaultBettingLimit, model).subscribe(res => {
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
            if (usersPermissions.permissionsList[1].submenu[5].Permissions[0].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[5].submenu[2].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[5].Permissions[1].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[5].submenu[2].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[5].Permissions[2].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[5].submenu[2].Permissions[2].IsChecked === true) {
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