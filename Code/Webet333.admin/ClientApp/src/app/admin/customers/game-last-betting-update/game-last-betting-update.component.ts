import { Component, OnInit } from '@angular/core';
import { account } from '../../../../environments/environment';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { AdminService } from '../../admin.service';

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
        private toasterService: ToasterService
    ) { }

    ngOnInit() {
        this.setColumn();
        this.setPageData();
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
}
