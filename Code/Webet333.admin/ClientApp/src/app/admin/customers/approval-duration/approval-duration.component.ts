import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer } from '../../../../environments/environment';
import { error } from 'protractor';

@Component({
    selector: 'app-approval-duration',
    templateUrl: './approval-duration.component.html',
    styleUrls: ['./approval-duration.component.scss']
})
export class ApprovalDurationComponent implements OnInit {

    rows = [];
    columns = [];
    selectedlist: any;
    listType: any = [
        { Type: "Deposit" },
        { Type: "Withdraw" },
    ];
    data: any;
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
            { prop: 'AdminUser' },
            { prop: 'Type' },
            { prop: 'Approval' },
            { prop: 'Created' },
            { prop: 'Duration' },
        ];
    }

    Search() {
        this.loadingIndicator = true;
        let data = {
            type: this.selectedlist === undefined ? null : this.selectedlist,
            duration: (document.getElementById("txt_second") as HTMLInputElement).value === "" ? 0 : (document.getElementById("txt_second") as HTMLInputElement).value,
            fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value
        }
        this.adminService.add<any>(customer.approvalTimeSelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            this.data = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    UserName: el.UserName,
                    AdminUser: el.adminName,
                    Type: el.Type,
                    Approval: this.replaceDate(el.ApprovalTime),
                    Created: this.replaceDate(el.Created),
                    Duration: el.Duration
                });
            });
            
        }, error => {
            this.rows = [];
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;
        });
        this.loadingIndicator = false;
    }

    setData() {
        this.loadingIndicator = true;
        let data = {

        }
        this.adminService.add<any>(customer.approvalTimeSelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            this.data = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    UserName: el.UserName,
                    AdminUser: el.adminName,
                    Type: el.Type,
                    Approval: this.replaceDate(el.ApprovalTime),
                    Created: this.replaceDate(el.Created),
                    Duration: el.Duration
                });
            });
            this.loadingIndicator = false;
        }, error => {
            this.rows = [];
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;

        });
        this.loadingIndicator = false;
    }

    replaceDate(date) {
        return date.replace("T", " ");
    }

    onChange(event) {
        this.selectedlist = event.target.value;
    }

    edit(data) {
        debugger;
    }
}
