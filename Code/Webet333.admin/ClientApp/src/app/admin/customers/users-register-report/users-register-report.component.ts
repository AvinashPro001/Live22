import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer } from '../../../../environments/environment';

@Component({
    selector: 'app-users-register-report',
    templateUrl: './users-register-report.component.html',
    styleUrls: ['./users-register-report.component.scss']
})
export class UsersRegisterReportComponent implements OnInit {

    rows = [];
    columns = [];
    loadingIndicator: boolean;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
    ) { }

    ngOnInit() {
        this.setColumn();
        this.setPageData();
    }



    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'Username' },
            { prop: 'Name' },
            { prop: 'MobileNo' },
            { prop: 'UserICNumber' },
            { prop: 'MobileNoConfirmed' },
            { prop: 'TotalDepositAmount' },
            { prop: 'TotalWithdrawAmount' },
            { prop: 'Created' },
        ];

    }




    setPageData() {
        this.rows = [];
        this.loadingIndicator = true;
        let i = 0;
        let data = {
        }
        this.adminService.add<any>(customer.userRegisterReport, data).subscribe(res => {
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Username: el.Username,
                    Name: el.Name,
                    MobileNo: el.MobileNo,
                    UserICNumber: el.UserICNumber,
                    MobileNoConfirmed: el.MobileNoConfirmed ? "<b class='Available'>" + el.MobileNoConfirmed + "</lable>" : "<lable class='notAvailable'>" + el.MobileNoConfirmed + "</lable>",
                    TotalDepositAmount: el.TotalDeposit,
                    TotalWithdrawAmount: el.TotalWithdraw,
                    Created: el.Created,
                });

            });
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    FilterData() {
        this.rows = [];
        this.loadingIndicator = true;
        let i = 0;
        
        var otpCheck;

        var verified = (document.getElementById("Verified") as HTMLInputElement).checked
        var unverified = (document.getElementById("Unverified") as HTMLInputElement).checked

        if (verified)
            otpCheck = verified;

        if (unverified)
            otpCheck = unverified;        

        if (unverified && unverified)
            otpCheck = null;

        let data = {
            fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value == "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value == "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value,
            otpVerified: otpCheck
        }
        this.adminService.add<any>(customer.userRegisterReport, data).subscribe(res => {
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Username: el.Username,
                    Name: el.Name,
                    MobileNo: el.MobileNo,
                    UserICNumber: el.UserICNumber,
                    MobileNoConfirmed: el.MobileNoConfirmed ? "<b class='Available'>" + el.MobileNoConfirmed + "</lable>" : "<lable class='notAvailable'>" + el.MobileNoConfirmed + "</lable>",
                    TotalDepositAmount: el.TotalDeposit,
                    TotalWithdrawAmount: el.TotalWithdraw,
                    Created: el.Created,
                });

            });
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

}
