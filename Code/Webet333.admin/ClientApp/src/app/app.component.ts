import { Component, HostBinding, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../src/app/admin/admin.service';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { account, customer } from '../../src/environments/environment';
declare var $: any;

import { SettingsService } from './core/settings/settings.service';
import { ToasterConfig } from 'angular2-toaster';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    changeTitile: any;

    @HostBinding('class.layout-fixed') get isFixed() { return this.settings.layout.isFixed; };
    @HostBinding('class.aside-collapsed') get isCollapsed() { return this.settings.layout.isCollapsed; };
    @HostBinding('class.layout-boxed') get isBoxed() { return this.settings.layout.isBoxed; };
    @HostBinding('class.layout-fs') get useFullLayout() { return this.settings.layout.useFullLayout; };
    @HostBinding('class.hidden-footer') get hiddenFooter() { return this.settings.layout.hiddenFooter; };
    @HostBinding('class.layout-h') get horizontal() { return this.settings.layout.horizontal; };
    @HostBinding('class.aside-float') get isFloat() { return this.settings.layout.isFloat; };
    @HostBinding('class.offsidebar-open') get offsidebarOpen() { return this.settings.layout.offsidebarOpen; };
    @HostBinding('class.aside-toggled') get asideToggled() { return this.settings.layout.asideToggled; };
    @HostBinding('class.aside-collapsed-text') get isCollapsedText() { return this.settings.layout.isCollapsedText; };
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true,
        tapToDismiss: false,
        timeout: 5000
    });
    constructor(public settings: SettingsService, private spinner: NgxSpinnerService, private toasterService: ToasterService, private adminService: AdminService, private titleService: Title) { }

    ngOnInit() {
        //this.hubConnection();

        $(document).on('click', '[href="#"]', e => e.preventDefault());
        this.spinner.show();
        setTimeout(() => {
            this.spinner.hide();
        }, 3000);

        setInterval(() => {
            this.CheckDeposit();
            this.CheckWithdraw();
        },5000)
    }

    hubConnection() {
        let Connection = new HubConnectionBuilder().withUrl("http://api.webet333.com/signalrhub").build();

        Connection.on("WithdrawApprovalList", () => {
            let data = {
                name: "WithdrawAutoRefersh",
            }
            this.adminService.add<any>(account.AdminNotificationParameterSelect, data).subscribe(res => {
                var AutoRefersh = res.data.value == "true" ? true : false;
                if (AutoRefersh == true)
                    this.playAudio(2);
            });
        });

        Connection.on("DepositApprovalList", () => {
            let data = {
                name: "DepositAutoRefersh",
            }
            this.adminService.add<any>(account.AdminNotificationParameterSelect, data).subscribe(res => {
                var AutoRefersh = res.data.value == "true" ? true : false;
                if (AutoRefersh == true)
                    this.playAudio(1);
            });
        });

        Connection.start().then(res =>
            console.log("Connection started")
        ).catch(err => this.hubConnection());
    }

    playAudio(process) {
        let audio = new Audio();
        audio.src = "../../src/assets/audio/notification.mp3";
        audio.load();
        audio.play();
    }

    intvDeposit: any;
    intvWithdraw: any;

    CheckDeposit() {
        let data = {
            status: 'Pending',
            keyword: null,
            fromDate: null,
            toDate: null
        }
        this.adminService.add<any>(customer.depositList, data).subscribe(resDeposit => {
            if (resDeposit.data.length > 0) {
                let data = {
                    name: "DepositAutoRefersh",
                }
                this.adminService.add<any>(account.AdminNotificationParameterSelect, data).subscribe(res => {
                    var AutoRefersh = res.data.value == "true" ? true : false;
                    if (AutoRefersh == true) {
                        this.blink("Deposit Request (" + resDeposit.data.length + ")", 10);
                        //this.titleService.setTitle("Deposit Request (" + resDeposit.data.length + ")");
                       // this.titleService.setTitle(" ");
                        //this.intvDeposit = window.setInterval(function () {
                        //    document.title = this.titleService.getTitle() != "" ? this.titleService.setTitle(""): "Deposit Request (" + resDeposit.data.length + ")";
                        //}, 1000);
                    }
                });
            }
            else {
                //this.stopBlinkDeposit();
                this.titleService.setTitle("Account Managment System");
            }
        })
    }

    stopBlinkDeposit() {
        window.clearInterval(this.intvDeposit);
        document.title = "Account Managment System";
    }

    stopBlinkWithdraw() {
        window.clearInterval(this.intvWithdraw);
        document.title = "Account Managment System";
    }

    CheckWithdraw() {
        let data = {
            status: 'Pending',
            keyword: null,
            fromDate: null,
            toDate: null
        }
        this.adminService.add<any>(customer.withdrawList, data).subscribe(resWithdraw => {
            if (resWithdraw.data.length > 0) {
                let data = {
                    name: "WithdrawAutoRefersh",
                }
                this.adminService.add<any>(account.AdminNotificationParameterSelect, data).subscribe(res => {
                    var AutoRefersh = res.data.value == "true" ? true : false;
                    if (AutoRefersh == true) {
                       // this.titleService.setTitle("Withdraw Request (" + resWithdraw.data.length + ")");
                        //this.titleService.setTitle(" ");
                        //this.intvWithdraw = window.setInterval(function () {
                        //    document.title = "Withdraw Request (" + resWithdraw.data.length + ")";
                        //}, 500);
                        this.blink("Withdraw Request (" + resWithdraw.data.length + ")", 10);
                    }
                });
            } else {
                this.stopBlinkWithdraw();
                //this.titleService.setTitle("Account Managment System");
            }
        })
    }

    private timeout;


    blink(msg: string, count: number = 5): void {
        const prevTitle = this.titleService.getTitle();

        const step = () => {
            const newTitle = this.titleService.getTitle() === prevTitle ?
                msg : prevTitle;

            this.titleService.setTitle(newTitle);

            if (--count) {
                this.timeout = setTimeout(step.bind(this), 1000);
            } else {
                this.titleService.setTitle(prevTitle);
            }
        };

        clearTimeout(this.timeout);
        step();
    }
}