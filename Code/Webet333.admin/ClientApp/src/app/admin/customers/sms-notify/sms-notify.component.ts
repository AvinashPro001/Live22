import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { customer, smsConst } from '../../../../environments/environment';

@Component({
    selector: 'app-sms-notify',
    templateUrl: './sms-notify.component.html',
    styleUrls: ['./sms-notify.component.scss']
})
export class SmsNotifyComponent implements OnInit {

    TotalUser: any = 0;
    userList: any;
    totaCharaters: any = 0;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
    ) { }

    ngOnInit() {
    }


    lengthCount() {
        var txt = ((document.getElementById("msg") as HTMLInputElement).value)
        this.totaCharaters = txt.length;
    }

    GetUsers() {
        let data = {
            minute: ((document.getElementById("minute") as HTMLInputElement).value)
        }
        if (data.minute != "") {
            this.adminService.add<any>(customer.SmsUserList, data).subscribe(res => {
                this.userList = res.data.result;
                this.TotalUser = res.data.toalUser;
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        } else {
            this.toasterService.pop('error', 'Error', "Please Insert Minute !!");
        }
    }

    SendSMS() {
        this.userList.forEach(el => {
            var SMSMessage = ((document.getElementById("msg") as HTMLInputElement).value);
            let data = {
                username: el.userName,
                mobileNo: el.mobileNo,
                message: SMSMessage
            };
            this.adminService.add<any>(customer.SendSMS,data).subscribe(res => {
            });
        })
        this.ClearData();
    }

    ClearData() {
        (document.getElementById("msg") as HTMLInputElement).value = "";
        (document.getElementById("minute") as HTMLInputElement).value = "";
        this.userList = null;
        this.TotalUser = 0;
    }
}
