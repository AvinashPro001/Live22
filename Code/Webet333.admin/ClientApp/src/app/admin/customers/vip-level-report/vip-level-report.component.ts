//#region
//#endregion

import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterService } from 'angular2-toaster';
import { customer, VIPSetting } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-vip-level-report',
    templateUrl: './vip-level-report.component.html',
    styleUrls: ['./vip-level-report.component.scss']
})

export class VipLevelReportComponent implements OnInit {

    //#region Variable and Constructor

    VIPLevelData: any;
    VIPLevelIdList = [];
    UserListRows: any;
    UserListColumns: any;
    loadingIndicator: boolean = false;
    pageSize: number = 10;
    totalRowCount: number = 0;
    offset: number = 0;
    pageNumber: number = 0;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService) { }

    //#endregion 

    ngOnInit() {
        this.GetVIPLevel();
        this.SetColumns();
    }

    //#region Get VIP Category

    GetVIPLevel() {
        this.adminService.get<any>(VIPSetting.VIPLevelList).subscribe(res => {
            this.VIPLevelData = res.data;
        });
    }

    //#endregion

    //#region Remove Item From Array

    RemoveElementFromStringArray(element: string) {
        this.VIPLevelIdList.forEach((value, index) => {
            if (value == element) this.VIPLevelIdList.splice(index, 1);
        });
    }

    //#endregion

    //#region Add VIP id into list

    AddVIPLevelId(VIPLevelId) {
        if (this.VIPLevelIdList.includes(VIPLevelId)) this.RemoveElementFromStringArray(VIPLevelId);
        else this.VIPLevelIdList.push(VIPLevelId);
    }

    //#endregion

    SetColumns() {
        this.UserListColumns = [
            { prop: 'No' },
            { prop: 'Name' },
            { prop: 'Username' },
            { prop: 'VIPLevel' },
            { prop: 'LastVIPLevelUpdate' },
            { prop: 'TotalDeposit' },
            { prop: 'DepositCount' },
            { prop: 'TotalWithdraw' },
            { prop: 'WithdrawCount' },
            { prop: 'TotalBonus' },
            { prop: 'TotalWinLose' },
            { prop: 'RegisteredDateTime' }
        ]
    }

    GetUserList() {
        this.loadingIndicator = true;

        let temp = '';
        if (this.VIPLevelIdList.length != 0) {
            for (let i = 0; i < this.VIPLevelIdList.length; i++) {
                if (i == this.VIPLevelIdList.length - 1) temp += this.VIPLevelIdList[i]
                else temp += this.VIPLevelIdList[i] + ','
            }
        }

        console.log(temp);

        let model = {
            VIPLevelId: temp,
            pageNo: this.pageNumber,
            pageSize: this.pageSize
        };

        this.adminService.add<any>(customer.getVIPLevelReport, model).subscribe(res => {
            this.UserListRows = [];

            let i = ((this.pageNumber + 1) * this.pageSize) - this.pageSize;
            this.offset = res.data.offset;
            this.totalRowCount = res.data.total;

            res.data.result.forEach(el => {
                this.UserListRows.push({
                    No: ++i,

                    Name: el.name,
                    Username: el.userName,

                    VIPLevel: el.VIPLavelName,
                    LastVIPLevelUpdate: this.replaceDateTime(el.VIPLevelModified),

                    TotalDeposit: el.totalDepositAmount,
                    DepositCount: el.totalDepositCount,

                    TotalWithdraw: el.totalWithdrawAmount,
                    WithdrawCount: el.totalWithdrawCount,

                    TotalBonus: el.totalBonusAmount,

                    TotalWinLose: el.totalWinLoseAmount,

                    RegisteredDateTime: this.replaceDateTime(el.created)
                });
            });
            this.UserListRows = [...this.UserListRows];

            this.loadingIndicator = false;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;
        });
    }

    //#region Replace Time

    replaceDateTime(date) { return date.replace("T", " "); }

    //#endregion

    Next_Previous_Page(pageInfo) {
        this.pageNumber = pageInfo.offset;
        this.GetUserList();
    }

}