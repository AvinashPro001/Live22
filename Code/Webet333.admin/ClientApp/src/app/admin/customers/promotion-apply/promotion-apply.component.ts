import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ToasterService, } from 'angular2-toaster';
import { account, playtech, Joker, M8Game, AGGame, customer, ErrorMessages } from '../../../../environments/environment';
import { debug } from 'util';
import { Router } from '@angular/router';
import { CommonService } from '../../../common/common.service';

@Component({
    selector: 'app-promotion-apply',
    templateUrl: './promotion-apply.component.html',
    styleUrls: ['./promotion-apply.component.scss']
})
export class PromotionApplyComponent implements OnInit {
    rows = [];
    columns = [];
    loadingIndicator: boolean = true;
    datePickerfromdate: string;
    datePickertodate: string;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService
    ) { }

    listType: any = [
        { status: "Active" },
        { status: "Expire" },
        { status: "Completed" }
    ];

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColoum();
            //this.setPageData();
            this.setToday();
        }
    }

    setColoum() {
        this.columns = [
            { prop: 'No', width: 55 },
            { prop: 'UserName' },
            { prop: 'UserTurnover' },
            { prop: 'Title' },
            { prop: 'TurnoverTime' },
            { prop: 'WinTurn' },
            { prop: 'TurnoverTarget' },
            { prop: 'WinTarget' },
            { prop: 'Status' },
            { prop: 'Created' }
        ];
    }

    setPageData() {
        this.loadingIndicator = true;
        let data = {}
        this.adminService.add<any>(customer.promotionApplySelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    UserName: el.Username,
                    UserTurnover: el.UserTurnover,
                    Title: el.Title,
                    TurnoverTime: el.TurnoverTime,
                    WinTurn: el.WinTurn,
                    TurnoverTarget: el.TurnoverTarget,
                    WinTarget: el.TurnTarget,
                    Created: this.replaceDateTime(el.Created),
                    Status: el.Staus,
                });
            });
            this.rows = [...this.rows];
        });
        this.loadingIndicator = false;
    }

    filter(startingDate = null, endingDate = null) {
        this.loadingIndicator = true;
        var status = (document.getElementById("status") as HTMLInputElement).value;
        var statusModel, fromdate, todate;
        if (status === "Active") statusModel = 1;
        if (status === "Expire") statusModel = 2;
        if (status === "Completed") statusModel = 3;
        if (status === "") statusModel = 0;

        let data = {
            status: statusModel,
            fromdate: startingDate === null ? (document.getElementById("txt_fromdatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value : startingDate,
            todate: endingDate === null ? (document.getElementById("txt_todatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value : endingDate,
        }

        this.adminService.add<any>(customer.promotionApplySelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    UserName: el.Username,
                    UserTurnover: el.UserTurnover,
                    Title: el.Title,
                    TurnoverTime: el.TurnoverTime,
                    WinTurn: el.WinTurn,
                    TurnoverTarget: el.TurnoverTarget,
                    WinTarget: el.TurnTarget,
                    Created: this.replaceDateTime(el.Created),
                    Status: el.Staus,
                });
            });
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    replaceDateTime(date) {
        return date.replace("T", " ");
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[7].Permissions[0].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[7].submenu[1].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[7].Permissions[1].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[7].submenu[1].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[1].submenu[7].Permissions[2].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[7].submenu[1].Permissions[2].IsChecked === true) {
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

    //#region Filter Data

    setDatePicker(fromdate = null, todate = null) {
        this.datePickerfromdate = this.commonService.setDatePickerFormate(fromdate);
        this.datePickertodate = this.commonService.setDatePickerFormate(todate);
    }

    setToday() {
        var dates = this.commonService.getTodatDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.filter(fromdate, todate);
    }

    setYesterday() {
        var dates = this.commonService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.filter(fromdate, todate);
    }

    //#endregion
}