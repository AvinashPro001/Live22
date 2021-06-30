import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-sbo-get-league-limit',
    templateUrl: './sbo-get-league-limit.component.html',
    styleUrls: ['./sbo-get-league-limit.component.scss']
})

export class SboGetLeagueLimitComponent implements OnInit {
    //#region Variable & constructor

    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('minBetTextBox') minBetTextBox: TemplateRef<any>;
    @ViewChild('maxBetTextBox') maxBetTextBox: TemplateRef<any>;
    @ViewChild('maxBetRatioTextBox') maxBetRatioTextBox: TemplateRef<any>;
    @ViewChild('groupTypeDropdown') groupTypeDropdown: TemplateRef<any>;
    groupType: any = [
        { id: "SMALL", type: "SMALL" },
        { id: "MEDIUM", type: "MEDIUM" },
        { id: "BIG", type: "BIG" }
    ];
    rows = [];
    columns = [];
    loadingIndicator: boolean = false;
    T: any;
    dataTable: any;

    constructor(
        private commonService: CommonService,
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router) { }

    //#endregion Variable & constructor

    //#region ngOnInit

    ngOnInit() {
        this.setColumn();
        this.getLeagueList();
    }

    //#endregion ngOnInit

    //#region Set column

    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'LeagueId' },
            { prop: 'LeagueKeyword' },
            { prop: 'MinBet', cellTemplate: this.minBetTextBox, sortable: true },
            { prop: 'MaxBet', cellTemplate: this.maxBetTextBox, sortable: true },
            { prop: 'MaxBetRatio', cellTemplate: this.maxBetRatioTextBox, sortable: true },
            { prop: 'GroupType', cellTemplate: this.groupTypeDropdown, sortable: true }
        ];
    }

    //#endregion Set column

    //#region Get league list

    getLeagueList() {
        this.loadingIndicator = true;

        this.adminService.get<any>(customer.getLeagueBetSetting).subscribe(res => {
            let i = 1;
            this.rows = [];

            let leagueData = res.data.result;
            leagueData.forEach(el => {
                this.rows.push({
                    No: i,
                    LeagueId: el.league_id,
                    LeagueKeyword: el.league_name,
                    MinBet: el.min_bet,
                    MaxBet: el.max_bet,
                    MaxBetRatio: el.max_bet_ratio,
                    GroupType: el.group_type
                });
                i++;
                this.rows = [...this.rows]
            })
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion Get league list

    //#region Search in data table

    SearchInDataTable(IsCallFromUpdate = 0) {
        let searchKeyword = IsCallFromUpdate == 0 ? (document.getElementById("txt_search") as HTMLInputElement).value : '';

        if (searchKeyword.length > 0) {
            if (this.dataTable == null) this.dataTable = this.rows  // Copy value for future use.
            else this.rows = this.dataTable

            let temp = this.rows.filter(x => x.LeagueKeyword.toLowerCase().includes(searchKeyword.toLowerCase()));
            this.rows = temp;
        }
        else {
            if (this.dataTable == null) this.dataTable = this.rows  // Copy value for future use.
            else this.rows = this.dataTable
        }
    }

    //#endregion Search in data table

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[18].Permissions[0].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[18].submenu[0].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[18].Permissions[1].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[18].submenu[0].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[18].Permissions[2].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[18].submenu[0].Permissions[2].IsChecked === true) {
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