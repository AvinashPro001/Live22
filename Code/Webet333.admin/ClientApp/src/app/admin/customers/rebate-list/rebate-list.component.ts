import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';
import { CommonService } from '../../../common/common.service';

@Component({
    selector: 'app-rebate-list',
    templateUrl: './rebate-list.component.html',
    styleUrls: ['./rebate-list.component.scss']
})
export class RebateListComponent implements OnInit {
    rows = [];
    columns = [];
    rowDetails = [];
    columnDetails = [];
    listType: any;
    rebateData: any;
    disable: boolean = false;
    loadingIndicator: boolean;

    datePickerfromdate: string;
    datePickertodate: string;

    @ViewChild('status') status: TemplateRef<any>;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private modalService: NgbModal,
        private commonService: CommonService
    ) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            this.setGameCategoryList();
            //this.setPagedata();
            this.setToday();
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'DateFrom' },
            { prop: 'DateTo' },
            { prop: 'GameType' },
            { prop: 'TotalUser' },
            { prop: 'BetAmount' },
            { prop: 'Rolling' },
            { prop: 'CommAmount' },
            { prop: 'CommPrecentage' },
            { prop: 'Created' },
            { prop: 'Actions', cellTemplate: this.status, sortable: false, width: 250 },
        ];
        this.columnDetails = [
            { prop: 'No' },
            { prop: 'GameName' },
            { prop: 'Username' },
            { prop: 'ApiUsername' },
            { prop: 'Turnover' },
            { prop: 'BetAmount' },
            { prop: 'Rolling' },
            { prop: 'CommAmount' },
            { prop: 'WinLose' },
        ];
    }

    setPagedata() {
        this.loadingIndicator = true;
        this.rows = [];
        let model = {}
        this.adminService.add<any>(customer.RebateList, model).subscribe(res => {
            let i = 0;
            this.rebateData = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    DateFrom: this.ReplaceDate(el.DateFrom),
                    DateTo: this.ReplaceDate(el.DateTo),
                    GameType: el.GameType,
                    TotalUser: el.TotalUsers,
                    BetAmount: el.BetAmount,
                    Rolling: el.Rolling,
                    CommPrecentage: el.CommPrecentage,
                    CommAmount: el.CommAmount,
                    Created: this.ReplaceDateTime(el.Created)
                });
                this.rows = [...this.rows]
            });
            this.loadingIndicator = false;
        });
        this.loadingIndicator = false;
    }

    setGameCategoryList() {
        this.adminService.get<any>(customer.GameCategory).subscribe(res => {
            this.listType = res.data;
        })
    }

    ReplaceDate(date) {
        return date.replace("T00:00:00", " ");
    }

    ReplaceDateTime(date) {
        return date.replace("T", " ");
    }

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

        this.Filter(fromdate, todate);
    }

    setYesterday() {
        var dates = this.commonService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.Filter(fromdate, todate);
    }

    //#endregion

    Filter(startingDate = null, endingDate = null) {
        this.rows = [];
        this.loadingIndicator = true;
        let model = {
            fromDate: startingDate === null ? (document.getElementById("txt_fromdatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value : startingDate,
            toDate: endingDate === null ? (document.getElementById("txt_todatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value : endingDate,
            gamename: (document.getElementById("gameCategory") as HTMLInputElement).value === "" ? null : (document.getElementById("gameCategory") as HTMLInputElement).value,
        }

        if (model.fromDate === null && model.toDate === null && model.gamename === "") {
            this.loadingIndicator = false;
            return this.toasterService.pop('error', 'Error', "Please Select Atleast one filter");
        }

        this.adminService.add<any>(customer.RebateList, model).subscribe(res => {
            let i = 0;
            this.rebateData = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    DateFrom: this.ReplaceDate(el.DateFrom),
                    DateTo: this.ReplaceDate(el.DateTo),
                    GameType: el.GameType,
                    TotalUser: el.TotalUsers,
                    BetAmount: el.BetAmount,
                    Rolling: el.Rolling,
                    CommPrecentage: el.CommPrecentage,
                    CommAmount: el.CommAmount,
                    Created: this.ReplaceDate(el.Created)
                });
                this.loadingIndicator = false;
                this.rows = [...this.rows]
            });
        });
        this.loadingIndicator = false;
    }

    ViewData(id, content) {
        this.rowDetails = [];
        this.loadingIndicator = true;
        let model = {
            id: id
        }
        this.adminService.add<any>(customer.RebateDetailsList, model).subscribe(res => {
            let i = 0;
            res.data.forEach(el => {
                this.rowDetails.push({
                    No: ++i,
                    GameName: el.gameName,
                    Username: el.username,
                    ApiUsername: el.apiUsername,
                    Turnover: el.turnover,
                    BetAmount: el.bet,
                    Rolling: el.rolling,
                    CommAmount: el.commAmount,
                    WinLose: el.winLose
                });
                this.rowDetails = [...this.rowDetails]
            });
        });
        this.loadingIndicator = false;
        this.openWindowCustomClass(content);
    }

    async Delete(Id) {
        if (await this.checkUpdatePermission()) {
            this.disable = true;
            let model = {
                id: Id
            }
            this.adminService.add<any>(customer.RebateDelete, model).subscribe(res => {
                this.toasterService.pop('success', 'Successfully', res.message);
                this.disable = false;
                this.ngOnInit();
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
                this.disable = false;
            });
        }
    }

    openWindowCustomClass(content) {
        this.modalService.open(content, { windowClass: 'dark-modal', });
    }

    async navigateAdd() {
        if (await this.checkAddPermission()) this.router.navigate(['/admin/customers/rebate-calculate']);
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[2].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[5].Permissions[0].IsChecked === true) {
                if (usersPermissions.permissionsList[2].submenu[5].submenu[0].Permissions[0].IsChecked === true) {
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
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkUpdatePermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[2].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[5].Permissions[1].IsChecked === true) {
                if (usersPermissions.permissionsList[2].submenu[5].submenu[0].Permissions[1].IsChecked === true) {
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
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkAddPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[2].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[5].Permissions[2].IsChecked === true) {
                if (usersPermissions.permissionsList[2].submenu[5].submenu[0].Permissions[2].IsChecked === true) {
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
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    //#endregion Check Permission
}