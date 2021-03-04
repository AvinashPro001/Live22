import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { customer, smsConst, ErrorMessages, account } from '../../../../environments/environment';
import { Router } from '@angular/router';

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
        private router: Router
    ) { }

    ngOnInit() {
        if (this.checkViewPermission()) {
            this.Profile();     // To check user token expire or not.
        }
    }

    Profile() {
        let data = {}
        this.adminService.add<any>(account.profile, data).subscribe(res => {
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);

            if (error.error.message === "Your access token is expired, please login again.") {
                localStorage.removeItem('currentUser');
                this.router.navigate(['/']);
            }
        });
    }

    lengthCount() {
        var txt = ((document.getElementById("msg") as HTMLInputElement).value)
        this.totaCharaters = txt.length;
    }

    async GetUsers() {
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

    async SendSMS() {
        if (await this.checkAddPermission()) {
            this.userList.forEach(el => {
                var SMSMessage = ((document.getElementById("msg") as HTMLInputElement).value);
                let data = {
                    username: el.userName,
                    mobileNo: el.mobileNo,
                    message: SMSMessage
                };
                this.adminService.add<any>(customer.SendSMS, data).subscribe(res => {
                });
            })
            this.ClearData();
        }
    }

    ClearData() {
        (document.getElementById("msg") as HTMLInputElement).value = "";
        (document.getElementById("minute") as HTMLInputElement).value = "";
        this.userList = null;
        this.TotalUser = 0;
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[10].Permissions[0].IsChecked === true) {
                return true;
            }
            else {
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
        if (usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[10].Permissions[1].IsChecked === true) {
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
    }

    async checkAddPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[10].Permissions[2].IsChecked === true) {
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
    }

    //#endregion Check Permission
}