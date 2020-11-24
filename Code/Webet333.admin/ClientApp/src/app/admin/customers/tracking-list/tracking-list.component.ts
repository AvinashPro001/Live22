import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer } from '../../../../environments/environment';

@Component({
  selector: 'app-tracking-list',
  templateUrl: './tracking-list.component.html',
  styleUrls: ['./tracking-list.component.scss']
})
export class TrackingListComponent implements OnInit {

    rows = [];
    columns = [];
    listType: any = [
        { Type: "Login" },
        { Type: "Register" },
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
            { prop: 'UserName' },
            { prop: 'Process' },
            { prop: 'Created' },
        ];
    }

    setData() {
        this.loadingIndicator = true;
        let data = {
        }
        this.adminService.add<any>(customer.trackingSelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    UserName: el.Usernames,
                    Process: el.Process,
                    Created: this.replaceDate(el.Created),
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
            process: this.selectedlist === undefined ? null : this.selectedlist,
            fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value
        }
        this.adminService.add<any>(customer.trackingSelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    UserName: el.Usernames,
                    Process: el.Process,
                    Created: this.replaceDate(el.Created),
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
