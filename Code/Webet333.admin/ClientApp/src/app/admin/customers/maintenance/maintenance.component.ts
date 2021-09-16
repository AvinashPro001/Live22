import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { account, customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.scss']
})

export class MaintenanceComponent implements OnInit {
    radioSelected: string;

    jokerMainteance: boolean;
    WMMainteance: boolean;
    M8Mainteance: boolean;
    AGMainteance: boolean;
    DGMainteance: boolean;
    SAMainteance: boolean;
    SexyMainteance: boolean;
    Kiss918Mainteance: boolean;
    MaxBetMainteance: boolean;
    PlaytechMainteance: boolean;
    Mega888Mainteance: boolean;
    Pussy888Mainteance: boolean;
    AllBetMainteance: boolean;
    PragmaticMainteance: boolean;
    YeeBetMainteance: boolean;

    VaderPayMainteance: boolean;

    EtrackerMainteance: boolean;
    TrioMainteance: boolean;

    SAId: boolean;
    jokerId: any;
    PragmaticId: any;
    M8Id: any;
    AGId: any;
    DGId: any;
    SexyId: any;
    WMId: any;
    Kiss918Id: any;
    PlaytechId: any;
    MaxBetId: any;
    Mega888Id: any;
    Pussy888Id: any;
    AllBetId: any;
    YeeBetId: any;

    SBOMainteance: boolean;
    SBOId: any;

    GamePlayMainteance: boolean;
    GamePlayId: any;

    JDBMainteance: boolean;
    JDBId: any;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setData();
            this.VaderPay();
            this.GetSMSSetting();
            console.log(document.getElementsByName("radio").item);
        }
    }

    setData() {
        this.adminService.get<any>(account.walletSelect).subscribe(res => {
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].walletType === this.commonService.WalletName.Joker) {
                    this.jokerMainteance = res.data[i].isMaintenance;
                    this.jokerId = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName.M8) {
                    this.M8Mainteance = res.data[i].isMaintenance;
                    this.M8Id = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName.AG) {
                    this.AGMainteance = res.data[i].isMaintenance;
                    this.AGId = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName._918Kiss) {
                    this.Kiss918Mainteance = res.data[i].isMaintenance
                    this.Kiss918Id = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName.Playtech) {
                    this.PlaytechMainteance = res.data[i].isMaintenance
                    this.PlaytechId = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName.MaxBet) {
                    this.MaxBetMainteance = res.data[i].isMaintenance
                    this.MaxBetId = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName.Mega888) {
                    this.Mega888Mainteance = res.data[i].isMaintenance
                    this.Mega888Id = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName.DG) {
                    this.DGMainteance = res.data[i].isMaintenance
                    this.DGId = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName.SexyBaccarat) {
                    this.SexyMainteance = res.data[i].isMaintenance
                    this.SexyId = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName.SA) {
                    this.SAMainteance = res.data[i].isMaintenance
                    this.SAId = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName.Pussy888) {
                    this.Pussy888Mainteance = res.data[i].isMaintenance
                    this.Pussy888Id = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName.AllBet) {
                    this.AllBetMainteance = res.data[i].isMaintenance
                    this.AllBetId = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName.WM) {
                    this.WMMainteance = res.data[i].isMaintenance
                    this.WMId = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName.PragmaticPlay) {
                    this.PragmaticMainteance = res.data[i].isMaintenance
                    this.PragmaticId = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName.YeeBet) {
                    this.YeeBetMainteance = res.data[i].isMaintenance
                    this.YeeBetId = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName.SBO) {
                    this.SBOMainteance = res.data[i].isMaintenance
                    this.SBOId = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName.GamePlay) {
                    this.GamePlayMainteance = res.data[i].isMaintenance
                    this.GamePlayId = res.data[i].id
                }
                if (res.data[i].walletType === this.commonService.WalletName.JDB) {
                    this.JDBMainteance = res.data[i].isMaintenance
                    this.JDBId = res.data[i].id
                }
            }
        })
    }

    async WalletMaintenanceUpdate(Id, value: boolean) {
        if (await this.checkUpdatePermission()) {
            let model = {
                id: Id,
                maintenance: value
            }
            this.adminService.add<any>(account.walletMainteanceUpdat, model).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    VaderPay() {
        this.adminService.get<any>(account.VaderPayParameterSelect).subscribe(res => {
            this.VaderPayMainteance = res.data.vaderPay.value == "true" ? true : false;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    async VaderPayMaintenanceUpdate(value: boolean) {
        if (await this.checkUpdatePermission()) {
            let model = {
                value: value
            }
            this.adminService.add<any>(account.VaderPayParameterUpdate, model).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    GetSMSSetting() {
        let etrackerModel = {
            name: "Etracker"
        }
        this.adminService.add<any>(customer.GlobalparameterSelect, etrackerModel).subscribe(res => {
            this.EtrackerMainteance = res.data.value == "true" ? true : false;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });

        let trioModel = {
            name: "Trio"
        }
        this.adminService.add<any>(customer.GlobalparameterSelect, trioModel).subscribe(res => {
            this.TrioMainteance = res.data.value == "true" ? true : false;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    async UpdateSMSSetting(Name, Value) {
        if (await this.checkUpdatePermission()) {
            if (Name == "Etracker" && Value) {
                let Model = {
                    name: "Trio",
                    value: false
                }
                this.adminService.add<any>(customer.GlobalparameterUpdate, Model).subscribe(res => { });
            }

            if (Name == "Trio" && Value) {
                let Model = {
                    name: "Etracker",
                    value: false
                }
                this.adminService.add<any>(customer.GlobalparameterUpdate, Model).subscribe(res => { });
            }

            let Model = {
                name: Name,
                value: Value
            }
            this.adminService.add<any>(customer.GlobalparameterUpdate, Model).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[1].Permissions[0].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkUpdatePermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[1].Permissions[1].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkAddPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[1].Permissions[2].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    //#endregion Check Permission
}