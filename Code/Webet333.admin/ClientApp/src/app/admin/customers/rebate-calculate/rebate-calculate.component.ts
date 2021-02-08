import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';

@Component({
    selector: 'app-rebate-calculate',
    templateUrl: './rebate-calculate.component.html',
    styleUrls: ['./rebate-calculate.component.scss']
})

export class RebateCalculateComponent implements OnInit {
    rows = [];
    columns = [];
    listType: any;
    TotolCommAmount: any = 0;
    TotolRollingAmount: any = 0;
    TotolBetAmount: any = 0;
    TotolWinloseAmount: any = 0;
    loadingIndicator: boolean;
    TotolTurnoverAmount: any = 0;
    rebateData: string;
    fromDate: any;
    toDate: any;
    gameType: any;
    RebatePercentage: number;
    disable: boolean = false;
    constructor(
        private datePipe: DatePipe,
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private getDateService: CommonService
    ) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setGameCategoryList();
            this.setColumn();
            this.setDateOtherPicker(new Date(), new Date());
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'No', width: 55 },
            { prop: 'GameName' },
            { prop: 'UserName' },
            { prop: 'APIUserName' },
            { prop: 'Turnover' },
            { prop: 'BetAmount' },
            { prop: 'Rolling' },
            { prop: 'WinLose' },
            { prop: 'CommAmount' },
        ];
    }

    setGameCategoryList() {
        this.adminService.get<any>(customer.GameCategory).subscribe(res => {
            this.listType = res.data.filter(obj => obj.Category != "SLOT");;
        })
    }

    //#region Filter Data

    setDateOtherPicker(fromdate = null, todate = null) {
        //Date formate :: Month / date / yesr, Hours: Minitus AM

        var selectDate, selectMonth, selectYear, selectFromDate, selectToDate, checkExists;

        selectDate = fromdate.getDate();
        selectMonth = fromdate.getMonth() + 1;
        selectYear = fromdate.getFullYear();
        selectFromDate = selectMonth + '/' + selectDate + '/' + selectYear + ', 12:00 AM';

        selectDate = todate.getDate();
        selectMonth = todate.getMonth() + 1;
        selectYear = todate.getFullYear();
        selectToDate = selectMonth + '/' + selectDate + '/' + selectYear + ', 11:59 PM';

        checkExists = document.getElementById("txt_fromdatetime");
        if (checkExists != null) (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = selectFromDate;

        checkExists = document.getElementById("txt_todatetime");
        if (checkExists != null) (document.getElementById("txt_todatetime") as HTMLInputElement).value = selectToDate;

        checkExists = document.getElementById("txt_startdatetime");
        if (checkExists != null) (document.getElementById("txt_startdatetime") as HTMLInputElement).value = selectFromDate;
    }

    setToday() {
        var dates = this.getDateService.getTodatDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDateOtherPicker(new Date(fromdate), new Date(todate));

        this.Calculate(fromdate, todate);
    }

    setYesterday() {
        var dates = this.getDateService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDateOtherPicker(new Date(fromdate), new Date(todate));

        this.Calculate(fromdate, todate);
    }

    //#endregion

    Calculate(startingDate = null, endingDate = null) {
        this.disable = true;
        this.fromDate = startingDate === null ? this.datePipe.transform((document.getElementById("txt_fromdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss") : startingDate;
        this.toDate = endingDate === null ? this.datePipe.transform((document.getElementById("txt_todatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss") : endingDate;
        this.gameType = (document.getElementById("gameCategory") as HTMLInputElement).value;
        this.RebatePercentage = Number((document.getElementById("txt_rebate") as HTMLInputElement).value);
        let model = {
            fromdate: this.fromDate,
            todate: this.toDate,
            gametype: this.gameType,
            rebate: this.RebatePercentage
        }
        if (model.rebate <= 0) {
            return this.toasterService.pop('error', 'Error', "Please Insert Rebate value Greater Then 0 !!!");
        }

        if (model.fromdate === null || model.fromdate === "" || model.fromdate === undefined ||
            model.todate === null || model.todate === "" || model.todate === undefined ||
            model.rebate === 0) {
            return this.toasterService.pop('error', 'Error', "Please Fill All Mandatory Field !!!");
        }

        if (model.fromdate === model.todate) {
            return this.toasterService.pop('error', 'Error', "Please Select Different Dates !!!");
        }

        this.rows = [];
        this.loadingIndicator = true;
        this.adminService.add<any>(customer.RebateCalculate, model).subscribe(res => {
            let i = 0;
            this.TotolBetAmount = res.data.betTotal;
            this.TotolCommAmount = res.data.commTotal;
            this.TotolRollingAmount = res.data.rollingTotal;
            this.TotolTurnoverAmount = res.data.turrnoverTotal;
            this.TotolWinloseAmount = res.data.winLoseTotal;
            this.rebateData = res.data.calculateData;
            res.data.calculateData.forEach(el => {
                this.rows.push({
                    No: ++i,
                    UserName: el.username,
                    GameName: el.gameName,
                    APIUserName: el.apiUsername,
                    Turnover: el.turnover,
                    BetAmount: el.bet,
                    Rolling: el.rolling,
                    WinLose: el.winLose,
                    CommAmount: el.commAmount
                });
                this.rows = [...this.rows]
            });
            this.loadingIndicator = false;
            this.disable = false;
        })
    }

    async Rebate() {
        if (await this.checkAddPermission()) {
            this.disable = true;
            let model = {
                fromdate: this.fromDate,
                todate: this.toDate,
                gametype: this.gameType,
                rebate: this.RebatePercentage
            }
            if (model.fromdate === undefined || model.todate === undefined || model.gametype === undefined || model.rebate === undefined) {
                this.disable = false;
                return this.toasterService.pop('error', 'Error', "First Calculate the Rebate data !!!!");
            }
            this.adminService.add<any>(customer.Rebate, model).subscribe(res => {
                this.toasterService.pop('success', 'Successfully', res.message);
                this.router.navigate(['/admin/customers/rebate-list']);
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
                this.disable = false;
            });
        }
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[2].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[5].Permissions[0].IsChecked === true) {
                if (usersPermissions.permissionsList[2].submenu[5].submenu[1].Permissions[0].IsChecked === true) {
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
                if (usersPermissions.permissionsList[2].submenu[5].submenu[1].Permissions[1].IsChecked === true) {
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
                if (usersPermissions.permissionsList[2].submenu[5].submenu[2].Permissions[2].IsChecked === true) {
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