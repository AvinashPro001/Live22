//#region
//#endregion

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-sbo-set-league-bet-limit',
    templateUrl: './sbo-set-league-bet-limit.component.html',
    styleUrls: ['./sbo-set-league-bet-limit.component.scss']
})

export class SboSetLeagueBetLimitComponent implements OnInit {
    //#region Variable & constructor

    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('minBetTextBox') minBetTextBox: TemplateRef<any>;
    @ViewChild('maxBetTextBox') maxBetTextBox: TemplateRef<any>;
    @ViewChild('maxBetRatioTextBox') maxBetRatioTextBox: TemplateRef<any>;
    @ViewChild('groupTypeDropdown') groupTypeDropdown: TemplateRef<any>;
    datePickerfromdate: string;
    datePickertodate: string;
    groupTypeId: any;
    groupType: any = [
        { id: "SMALL", type: "SMALL" },
        { id: "MEDIUM", type: "MEDIUM" },
        { id: "BIG", type: "BIG" }
    ];
    rows = [];
    columns = [];
    loadingIndicator: boolean = false;
    selectedLeagueList = [];
    customerData: any;
    T: any;
    dataTable: any;
    isDisable: boolean = false;

    constructor(
        private commonService: CommonService,
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router) { }

    //#endregion Variable & constructor

    //#region ngOnInit

    ngOnInit() {
        this.setDatePicker(new Date(), new Date());
        this.setColumn();
    }

    //#endregion ngOnInit

    //#region Set today date in date-picker

    setDatePicker(fromdate = null, todate = null) {
        this.datePickerfromdate = this.commonService.setDatePickerFormate(fromdate);
        this.datePickertodate = this.commonService.setDatePickerFormate(todate);
    }

    //#endregion Set today date in date-picker

    //#region Set column

    setColumn() {
        this.columns = [
            {
                prop: 'selected',
                name: '',
                headerCheckboxable: true,
                checkboxable: true
            },
            { prop: 'No' },
            { prop: 'LeagueKeyword' },
            { prop: 'SportType' },
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

        let temp = {
            leagueKeyWord: (document.getElementById("txt_league_keyword") as HTMLInputElement).value,
            fromDate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            toDate: (document.getElementById("txt_todatetime") as HTMLInputElement).value
        }

        if (this.commonService.CheckVariable(temp.fromDate)) {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectFromDate);
            return;
        }

        if (this.commonService.CheckVariable(temp.toDate)) {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectToDate);
            return;
        }

        let model = {
            leagueKeyWord: temp.leagueKeyWord,
            fromDate: temp.fromDate + ' 00:00:00.000',
            toDate: temp.toDate + ' 23:59:59.999'
        }

        this.adminService.add<any>(customer.sboGetLeague, model).subscribe(res => {
            let i = 1;
            this.rows = [];

            let leagueData = res.data.result;
            this.customerData = leagueData;
            leagueData.forEach(el => {
                this.rows.push({
                    No: i,
                    LeagueKeyword: el.league_name,
                    SportType: el.sportType,
                    MinBet: el.MinBet,
                    MaxBet: el.MaxBet,
                    MaxBetRatio: el.MaxBetRatio,
                    GroupType: el.GroupType,
                    LeagueId: el.league_id,
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

    getBlanckLeagueList() {
        this.loadingIndicator = true;

        let temp = {
            leagueKeyWord: (document.getElementById("txt_league_keyword") as HTMLInputElement).value,
            fromDate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            toDate: (document.getElementById("txt_todatetime") as HTMLInputElement).value
        }

        if (this.commonService.CheckVariable(temp.fromDate)) {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectFromDate);
            return;
        }

        if (this.commonService.CheckVariable(temp.toDate)) {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectToDate);
            return;
        }

        let model = {
            leagueKeyWord: temp.leagueKeyWord,
            fromDate: temp.fromDate + ' 00:00:00.000',
            toDate: temp.toDate + ' 23:59:59.999'
        }

        this.adminService.add<any>(customer.sboGetBlankLeague, model).subscribe(res => {
            let i = 1;
            this.rows = [];

            let leagueData = res.data.result;
            this.customerData = leagueData;
            leagueData.forEach(el => {
                this.rows.push({
                    No: i,
                    LeagueKeyword: el.league_name,
                    SportType: el.sportType,
                    MinBet: el.MinBet,
                    MaxBet: el.MaxBet,
                    MaxBetRatio: el.MaxBetRatio,
                    GroupType: el.GroupType,
                    LeagueId: el.league_id,
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

    //#region Set league for selected league

    setForChecked() {
        let temp = {
            minBet: (document.getElementById("main_minBet") as HTMLInputElement).value,
            maxBet: (document.getElementById("main_maxBet") as HTMLInputElement).value,
            maxBetRatio: (document.getElementById("main_maxBetRatio") as HTMLInputElement).value,
            groupType: this.groupTypeId
        };

        if (this.commonService.CheckVariable(temp.minBet)) {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseEnterMinBet);
            return;
        }
        if (this.commonService.CheckVariable(temp.maxBet)) {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseEnterMaxBet);
            return;
        }
        if (this.commonService.CheckVariable(temp.maxBetRatio)) {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseEnterMaxBetRatio);
            return;
        }
        if (this.commonService.CheckVariable(temp.groupType)) {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseEnterSelectGroupType);
            return;
        }

        if (this.selectedLeagueList.length > 0) {
            //let model = [];
            //this.selectedLeagueList.forEach(el => {
            //    model.push({
            //        LeagueName: el.LeagueKeyword,
            //        LeagueId: el.LeagueId,
            //        SportType: el.SportType,
            //        MinBet: temp.minBet,
            //        MaxBet: temp.maxBet,
            //        MaxBetRatio: temp.maxBetRatio,
            //        GroupType: temp.groupType
            //    });
            //    model = [...model]
            //});
            //this.adminService.add<any>(customer.sboSetLeague, model).subscribe(res => {
            //    this.toasterService.pop('success', 'Success', res.message);
            //    this.refreshPage();
            //}, error => {
            //    this.toasterService.pop('error', 'Error', error.error.message);
            //});

            this.selectedLeagueList.forEach(el => {
                //Find index of specific object using findIndex method.
                let objIndex = this.rows.findIndex((obj => obj.LeagueId == el.LeagueId));

                //Update object's name property.
                this.rows[objIndex].MinBet = Number(temp.minBet);
                this.rows[objIndex].MaxBet = Number(temp.maxBet);
                this.rows[objIndex].MaxBetRatio = Number(temp.maxBetRatio);
                this.rows[objIndex].GroupType = temp.groupType;
            });
        }
        else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectMinimumOneLeague);
            return;
        }
    }

    //#endregion Set league for selected league

    //#region Set Group type on dropdown change

    onGroupTypeSelected(value: string) {
        this.groupTypeId = value;
    }

    //#endregion Set Group type on dropdown change

    //#region Onselect on checkbox

    onSelect({ selected }) {
        //console.log('Select Event', selected, this.selectedUserList);

        this.selectedLeagueList.splice(0, this.selectedLeagueList.length);
        this.selectedLeagueList.push(...selected);
    }

    //#endregion Onselect on checkbox

    //#region Update League Bet Setting

    Update() {
        try {
            this.isDisable = true;

            if (this.rows.length > 0) {
                this.SearchInDataTable(1);

                let model = [];

                this.rows.forEach(el => {
                    model.push({
                        LeagueName: el.LeagueKeyword,
                        LeagueId: el.LeagueId,
                        SportType: el.SportType,
                        MinBet: el.MinBet,
                        MaxBet: el.MaxBet,
                        MaxBetRatio: el.MaxBetRatio,
                        GroupType: el.GroupType
                    });
                    model = [...model]
                });

                this.adminService.add<any>(customer.sboSetLeague, model).subscribe(res => {
                    this.isDisable = false;
                    this.toasterService.pop('success', 'Success', res.message);
                    this.refreshPage();
                }, error => {
                    this.isDisable = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
            }
        }
        catch (ex) {
            this.isDisable = false;
            this.toasterService.pop('error', 'Error', ex.message);
        }
    }

    //#endregion Update League Bet Setting

    //#region Refresh page

    refreshPage(): void {
        window.location.reload();
    }

    //#endregion Refresh page

    //#region Search in data table

    SearchInDataTable(IsCallFromUpdate = 0) {
        this.onSomeActionToDeselectAllRows();

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

    //#region Deselect data table

    onSomeActionToDeselectAllRows() {
        this.onSelect({ selected: [] });
        this.table.selected = [];
    }

    //#endregion Deselect data table

    //#region Reset text box value

    ResetLeagueKeyword() {
        (document.getElementById("txt_league_keyword") as HTMLInputElement).value = '';
    }

    //#endregion Reset text box value

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[16].Permissions[0].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[16].submenu[1].Permissions[0].IsChecked === true) {
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
                if (usersPermissions.permissionsList[1].submenu[16].submenu[1].Permissions[1].IsChecked === true) {
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
                if (usersPermissions.permissionsList[1].submenu[16].submenu[1].Permissions[2].IsChecked === true) {
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