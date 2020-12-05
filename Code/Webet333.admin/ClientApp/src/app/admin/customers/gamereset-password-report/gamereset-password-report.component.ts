import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer } from '../../../../environments/environment';

@Component({
  selector: 'app-gamereset-password-report',
  templateUrl: './gamereset-password-report.component.html',
  styleUrls: ['./gamereset-password-report.component.scss']
})
export class GameresetPasswordReportComponent implements OnInit {

    rows = [];
    columns = [];
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
            { prop: 'Webet_Username' },
            { prop: 'ResetPassword' },
            { prop: 'GameName' },
            { prop: 'Created' },
        ];
    }

    Search() {
        this.loadingIndicator = true;

        let data = {
            keyword: (document.getElementById("txt_keyword") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_keyword") as HTMLInputElement).value,
            fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value
        }
        this.adminService.add<any>(customer.passwordResetSelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Webet_Username: el.Webet_Username,
                    ResetPassword: el.ResetPassword,
                    GameName: el.GameName,
                    Created: this.replaceDate(el.Created)
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
        this.adminService.add<any>(customer.passwordResetSelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Webet_Username: el.Webet_Username,
                    ResetPassword: el.ResetPassword,
                    GameName: el.GameName,
                    Created: this.replaceDate(el.Created)
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
}
