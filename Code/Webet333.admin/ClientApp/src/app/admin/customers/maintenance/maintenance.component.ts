import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { account, customer } from '../../../../environments/environment';
import { error } from 'util';
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


    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
    ) { }

    ngOnInit() {
        this.setData();
        this.VaderPay();
        this.GetSMSSetting();
        console.log(document.getElementsByName("radio").item);
    }

    setData() {
        this.adminService.get<any>(account.walletSelect).subscribe(res => {
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].walletType === "Joker Wallet") {
                    this.jokerMainteance = res.data[i].isMaintenance;
                    this.jokerId = res.data[i].id
                }
                if (res.data[i].walletType === "M8 Wallet") {
                    this.M8Mainteance = res.data[i].isMaintenance;
                    this.M8Id = res.data[i].id
                }
                if (res.data[i].walletType === "AG Wallet") {
                    this.AGMainteance = res.data[i].isMaintenance;
                    this.AGId = res.data[i].id
                }
                if (res.data[i].walletType === "918Kiss Wallet") {
                    this.Kiss918Mainteance = res.data[i].isMaintenance
                    this.Kiss918Id = res.data[i].id
                }
                if (res.data[i].walletType === "PlayTech Wallet") {
                    this.PlaytechMainteance = res.data[i].isMaintenance
                    this.PlaytechId = res.data[i].id
                }
                if (res.data[i].walletType === "MaxBet Wallet") {
                    this.MaxBetMainteance = res.data[i].isMaintenance
                    this.MaxBetId = res.data[i].id
                }
                if (res.data[i].walletType === "Mega888 Wallet") {
                    this.Mega888Mainteance = res.data[i].isMaintenance
                    this.Mega888Id = res.data[i].id
                }
                if (res.data[i].walletType === "DG Wallet") {
                    this.DGMainteance = res.data[i].isMaintenance
                    this.DGId = res.data[i].id
                }
                if (res.data[i].walletType === "Sexy Wallet") {
                    this.SexyMainteance = res.data[i].isMaintenance
                    this.SexyId = res.data[i].id
                }
                if (res.data[i].walletType === "SA Wallet") {
                    this.SAMainteance = res.data[i].isMaintenance
                    this.SAId = res.data[i].id
                }
                if (res.data[i].walletType === "Pussy888 Wallet") {
                    this.Pussy888Mainteance = res.data[i].isMaintenance
                    this.Pussy888Id = res.data[i].id
                }
                if (res.data[i].walletType === "AllBet Wallet") {
                    this.AllBetMainteance = res.data[i].isMaintenance
                    this.AllBetId = res.data[i].id
                }
                if (res.data[i].walletType === "WM Wallet") {
                    this.WMMainteance = res.data[i].isMaintenance
                    this.WMId = res.data[i].id
                }
                if (res.data[i].walletType === "Pragmatic Wallet") {
                    this.PragmaticMainteance = res.data[i].isMaintenance
                    this.PragmaticId = res.data[i].id
                }
            }
        })
    }

    WalletMaintenanceUpdate(Id, value: boolean) {

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

    VaderPay() {
        this.adminService.get<any>(account.VaderPayParameterSelect).subscribe(res => {
            this.VaderPayMainteance = res.data.vaderPay.value == "true" ? true : false;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    VaderPayMaintenanceUpdate(value: boolean) {

        let model = {
            value: value
        }
        this.adminService.add<any>(account.VaderPayParameterUpdate, model).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
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

    UpdateSMSSetting(Name, Value) {

        if (Name == "Etracker" && Value) {
            let Model = {
                name: "Trio",
                value: false
            }
            this.adminService.add<any>(customer.GlobalparameterUpdate, Model).subscribe(res => {});
        }

        if (Name == "Trio" && Value) {
            let Model = {
                name: "Etracker",
                value: false
            }
            this.adminService.add<any>(customer.GlobalparameterUpdate, Model).subscribe(res => {});
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
