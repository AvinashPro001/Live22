import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer } from '../../../../environments/environment';

@Component({
  selector: 'app-betdetails-lastupdate-list',
  templateUrl: './betdetails-lastupdate-list.component.html',
  styleUrls: ['./betdetails-lastupdate-list.component.scss']
})
export class BetdetailsLastupdateListComponent implements OnInit {

    rows = [];
    columns = [];
    listType: any = [
        { Type: "M8" },
        { Type: "Playtech" },
        { Type: "AG" },
        { Type: "MaxBet" },
        { Type: "Jsoker" },
    ];
    selectedlist: any;
    loadingIndicator: boolean = false;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
    ) { }

    ngOnInit() {
        this.setColoum();
        this.setData();
    }

    setColoum() {
        this.columns = [
            { prop: 'No' },
            { prop: 'GameName' },
            { prop: 'LastGetBetDetails' },
        ];
    }

    setData() {
        this.loadingIndicator = true;
        let data = {
        }
        this.adminService.add<any>(customer.LastUpdateSelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    GameName: el.GameName,
                    LastGetBetDetails: this.replaceDate(el.LastGetBetDetails),
                });
            });
            this.loadingIndicator = false;
        }, error => {
            this.rows = [];
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;

        });
    }

    replaceDate(date) {
        return date.replace("T", " ");
    }


    Search() {
        this.loadingIndicator = true;
        let data = {
            gamename: this.selectedlist === undefined ? null : this.selectedlist,
            fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value
        }
        this.adminService.add<any>(customer.LastUpdateSelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    GameName: el.GameName,
                    LastGetBetDetails: this.replaceDate(el.LastGetBetDetails),
                });
            });
            this.loadingIndicator = false;
        }, error => {
            this.rows = [];
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;
        });
    }

    onChange(event) {
        this.selectedlist = event.target.value;
    }

}
