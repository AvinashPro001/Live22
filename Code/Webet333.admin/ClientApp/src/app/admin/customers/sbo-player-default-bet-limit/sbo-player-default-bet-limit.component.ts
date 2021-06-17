//#region
//#endregion

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-sbo-player-default-bet-limit',
    templateUrl: './sbo-player-default-bet-limit.component.html',
    styleUrls: ['./sbo-player-default-bet-limit.component.scss']
})

export class SboPlayerDefaultBetLimitComponent implements OnInit {
    //#region Variable & Constructor

    playerDefaultBetLimit: any;

    constructor(
        private adminService: AdminService,
        private commonService: CommonService,
        private toasterService: ToasterService,
        private router: Router) { }

    //#endregion Variable & Constructor

    //#region ngOnInit()

    async ngOnInit() { if (await this.checkViewPermission()) await this.GetData(); }

    //#endregion ngOnInit()

    //#region Get player default bet limit

    async GetData() {
        this.adminService.getAll<any>(customer.getSBOPlayerDefaultBetLimit).subscribe(res => {
            this.playerDefaultBetLimit = res.data;
        });
    }

    //#endregion Get player default bet limit

    //#region Update Player Default bet Limit

    async Update() {
        if (await this.checkUpdatePermission()) {
            let model = [
                {
                    id: this.playerDefaultBetLimit.Football_OthersMatchType_MinBetId,
                    name: 'Football_OthersMatchType_MinBet',
                    value: (document.getElementById("Football_OthersMatchType_MinBet") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.Football_OthersMatchType_MaxBetId,
                    name: 'Football_OthersMatchType_MaxBet',
                    value: (document.getElementById("Football_OthersMatchType_MaxBet") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.Football_OthersMatchType_MaxBetMatchId,
                    name: 'Football_OthersMatchType_MaxBetMatch',
                    value: (document.getElementById("Football_OthersMatchType_MaxBetMatch") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.Football_OverUnder_MinBetId,
                    name: 'Football_OverUnder_MinBet',
                    value: (document.getElementById("Football_OverUnder_MinBet") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.Football_OverUnder_MaxBetId,
                    name: 'Football_OverUnder_MaxBet',
                    value: (document.getElementById("Football_OverUnder_MaxBet") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.Football_OverUnder_MaxBetMatchId,
                    name: 'Football_OverUnder_MaxBetMatch',
                    value: (document.getElementById("Football_OverUnder_MaxBetMatch") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.Football_CorrectScore_MinBetId,
                    name: 'Football_CorrectScore_MinBet',
                    value: (document.getElementById("Football_CorrectScore_MinBet") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.Football_CorrectScore_MaxBetId,
                    name: 'Football_CorrectScore_MaxBet',
                    value: (document.getElementById("Football_CorrectScore_MaxBet") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.Football_CorrectScore_MaxBetMatchId,
                    name: 'Football_CorrectScore_MaxBetMatch',
                    value: (document.getElementById("Football_CorrectScore_MaxBetMatch") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.OthersSport_OthersMatchType_MinBetId,
                    name: 'OthersSport_OthersMatchType_MinBet',
                    value: (document.getElementById("OthersSport_OthersMatchType_MinBet") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.OthersSport_OthersMatchType_MaxBetId,
                    name: 'OthersSport_OthersMatchType_MaxBet',
                    value: (document.getElementById("OthersSport_OthersMatchType_MaxBet") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.OthersSport_OthersMatchType_MaxBetMatchId,
                    name: 'OthersSport_OthersMatchType_MaxBetMatch',
                    value: (document.getElementById("OthersSport_OthersMatchType_MaxBetMatch") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.OthersSport_OverUnder_MinBetId,
                    name: 'OthersSport_OverUnder_MinBet',
                    value: (document.getElementById("OthersSport_OverUnder_MinBet") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.OthersSport_OverUnder_MaxBetId,
                    name: 'OthersSport_OverUnder_MaxBet',
                    value: (document.getElementById("OthersSport_OverUnder_MaxBet") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.OthersSport_OverUnder_MaxBetMatchId,
                    name: 'OthersSport_OverUnder_MaxBetMatch',
                    value: (document.getElementById("OthersSport_OverUnder_MaxBetMatch") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.OthersSport_CorrectScore_MinBetId,
                    name: 'OthersSport_CorrectScore_MinBet',
                    value: (document.getElementById("OthersSport_CorrectScore_MinBet") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.OthersSport_CorrectScore_MaxBetId,
                    name: 'OthersSport_CorrectScore_MaxBet',
                    value: (document.getElementById("OthersSport_CorrectScore_MaxBet") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                },
                {
                    id: this.playerDefaultBetLimit.OthersSport_CorrectScore_MaxBetMatchId,
                    name: 'OthersSport_CorrectScore_MaxBetMatch',
                    value: (document.getElementById("OthersSport_CorrectScore_MaxBetMatch") as HTMLInputElement).value,
                    comment: 'SBO default player bet Limit'
                }
            ];

            this.adminService.add<any>(customer.updateSBOPlayerDefaultBetLimit, model).subscribe(async res => {
                this.toasterService.pop('success', 'Success', res.message);
                await this.GetData();
            }, error => {
                this.ngOnInit();
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#endregion Update Player Default bet Limit

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[16].Permissions[0].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[16].submenu[0].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[16].Permissions[1].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[16].submenu[0].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[16].Permissions[2].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[16].submenu[0].Permissions[2].IsChecked === true) {
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