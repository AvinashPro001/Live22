import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { account, ErrorMessages } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { error } from '@angular/compiler/src/util';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    totalCustomer: any;
    activeCustomer: any;
    deactiveCustomer: any;
    depositPending: any;
    depositApproved: any;
    depositRejected: any;
    withdrowPending: any;
    withdrowApproved: any;
    withdrowRejected: any;
    totalTransfer: any;
    totalAdjustment: any;
    totalAnnouncement: any;
    totalPromotion: any;
    totalBonus: any;
    //FB: any;
    //TELE: any;
    //SMS: any;
    //FBV: any;
    //WA: any;
    //FBP: any;
    //WEB: any;
    //INT: any;
    //FBA: any;
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    constructor(private adminService: AdminService, private toasterService: ToasterService, private router: Router) {
    }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            history.pushState(null, null, '/admin/dashboard');
            window.onpopstate = function () {
                history.go(1);
            };
            this.DashboardLoad();
        }
    }

    DashboardLoad() {
        this.adminService.getAll<any>(account.dashboard).subscribe(res => {
            this.totalCustomer = res.data[0].TotalUsers;
            this.activeCustomer = res.data[0].TotalUsersActive;
            this.deactiveCustomer = res.data[0].TotalUsersInActive;
            this.depositPending = res.data[0].TotalDepositePending;
            this.depositApproved = res.data[0].TotalDepositeApproved;
            this.depositRejected = res.data[0].TotalDepositeRejected;
            this.withdrowPending = res.data[0].TotalWithdrawPending;
            this.withdrowApproved = res.data[0].TotalWithdrawApproved;
            this.withdrowRejected = res.data[0].TotalWithdrawRejected;
            this.totalAnnouncement = res.data[0].TotalAnnouncement;
            this.totalPromotion = res.data[0].TotalPromotin;
            this.totalBonus = res.data[0].TotalBonus;
            this.totalTransfer = res.data[0].TotalTransfer;
            this.totalAdjustment = res.data[0].TotalAdjustment;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
        let model = {
            todate: null,
            formdate: null
        }
        //this.adminService.add<any>(account.analytics, model).subscribe(res => {
        //    this.FB = res.data[0].FB;
        //    this.TELE = res.data[0].TELE;
        //    this.SMS = res.data[0].SMS;
        //    this.FBV = res.data[0].FBV;
        //    this.WA = res.data[0].WA;
        //    this.FBP = res.data[0].FBP;
        //    this.WEB = res.data[0].WEB;
        //    this.INT = res.data[0].INT;
        //    this.FBA = res.data[0].FBA;
        //}, error => {
        //    this.toasterService.pop('error', 'Error', error.error.message);
        //});
    }

    Navigation(data) {
        switch (data) {
            case "Customer": {
                this.router.navigate(['admin/customers/list']);
                break;
            }
            case "DepositPending": {
                this.router.navigate(['admin/customers/deposit-list'], { queryParams: { depositStatus: 'Pending' } });
                break;
            }
            case "DepositApproved": {
                this.router.navigate(['admin/customers/deposit-list'], { queryParams: { depositStatus: 'Approved' } });
                break;
            }
            case "DepositRejected": {
                this.router.navigate(['admin/customers/deposit-list'], { queryParams: { depositStatus: 'Rejected' } });
                break;
            }
            case "WithdrowPending": {
                this.router.navigate(['admin/customers/withdraw-list'], { queryParams: { withdrawStatus: 'Pending' } });
                break;
            }
            case "WithdrowApproved": {
                this.router.navigate(['admin/customers/withdraw-list'], { queryParams: { withdrawStatus: 'Approved' } });
                break;
            }
            case "WithdrowRejected": {
                this.router.navigate(['admin/customers/withdraw-list'], { queryParams: { withdrawStatus: 'Rejected' } });
                break;
            }
            case "Announcement": {
                this.router.navigate(['admin/customers/announcement-list']);
                break;
            }
            case "Transfer": {
                this.router.navigate(['admin/customers/transfer-list']);
                break;
            }
            case "Bonus": {
                this.router.navigate(['admin/customers/bonus-list']);
                break;
            }
            case "Promotion": {
                this.router.navigate(['admin/customers/promotion-list']);
                break;
            }
            case "Adjustment": {
                this.router.navigate(['admin/customers/adjustment-list']);
                break;
            }
        }
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[0].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[0].submenu[0].Permissions[0].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
                //this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
            //this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkUpdatePermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[0].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[0].submenu[0].Permissions[1].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
                //this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
            //this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkAddPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[0].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[0].submenu[0].Permissions[2].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
                //this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
            //this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    //#endregion Check Permission
}