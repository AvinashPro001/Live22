import { Component, OnInit } from '@angular/core';
import { account, ErrorMessages } from '../../../../environments/environment';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-game-last-betting-update',
    templateUrl: './game-last-betting-update.component.html',
    styleUrls: ['./game-last-betting-update.component.scss']
})
export class GameLastBettingUpdateComponent implements OnInit {
    rows = [];
    columns = [];
    loadingIndicator: boolean;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router
    ) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            this.setPageData();
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'No', width: 25 },
            { prop: 'GameName' },
            { prop: 'LastUpdate' },
        ];
    }

    setPageData() {
        this.loadingIndicator = true;
        this.adminService.get<any>(account.lastUpdateDetails).subscribe(res => {
            let i = 0;
            this.rows = [];
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Id: el.id,
                    GameName: el.GameName,
                    LastUpdate: el.LastUpdate
                });
                this.loadingIndicator = false;
                this.rows = [...this.rows]
            })
        });
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[8].Permissions[0].IsChecked === true) {
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

    async checkUpdatePermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[8].Permissions[1].IsChecked === true) {
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
        if (usersPermissions.permissionsList[3].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[8].Permissions[2].IsChecked === true) {
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