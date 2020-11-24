import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ToasterService, } from 'angular2-toaster';
import { account, playtech, Game, Joker, M8Game, AGGame, customer } from '../../../../environments/environment';
import { debug } from 'util';

@Component({
    selector: 'app-promotion-apply',
    templateUrl: './promotion-apply.component.html',
    styleUrls: ['./promotion-apply.component.scss']
})
export class PromotionApplyComponent implements OnInit {

    rows = [];
    columns = [];
    loadingIndicator: boolean = true;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
    ) { }

    listType: any = [
        { status: "Active" },
        { status: "Expire" },
        { status: "Completed" }
    ];
    ngOnInit() {
        this.setColoum();
        this.setPageData();
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
        let data = {
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

        });
        this.loadingIndicator = false;
    }


    filter() {
        this.loadingIndicator = true;
        var status = (document.getElementById("status") as HTMLInputElement).value;
        var statusModel,fromdate,todate;
        if (status === "Active")
            statusModel = 1;
        if (status === "Expire")
            statusModel = 2;
        if (status === "Completed")
            statusModel = 3;

        if (status === "")
            statusModel = 0;

        let data = {
            status: statusModel,
            fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value,
        }
        this.adminService.add<any>(customer.promotionApplySelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    UserName: el.Username,
                    Turnover: el.UserTurnover,
                    Title: el.Title,
                    TurnoverTime: el.TurnoverTime,
                    Created: this.replaceDateTime(el.Created),
                    Status: el.Staus,
                });
            });
            this.rows = [...this.rows];

        });
        this.loadingIndicator = false;
    }

    replaceDateTime(date) {
        return date.replace("T", " ");
    }
}
