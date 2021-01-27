import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { account } from '../../../environments/environment';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Router } from '@angular/router';

const screenfull = require('screenfull');
const browser = require('jquery.browser');

declare var $: any;

import { UserblockService } from '../sidebar/userblock/userblock.service';
import { SettingsService } from '../../core/settings/settings.service';
import { MenuService } from '../../core/menu/menu.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    name: any;
    navCollapsed = true; // for horizontal layout
    menuItems = []; // for horizontal layout

    isNavSearchVisible: boolean;
    @ViewChild('fsbutton') fsbutton;  // the fullscreen button

    constructor(public menu: MenuService, public userblockService: UserblockService, public settings: SettingsService, private adminService: AdminService, private toasterService: ToasterService, private router: Router) {

        // show only a few items on demo
        this.menuItems = menu.getMenu().slice(0, 4); // for horizontal layout

    }

    ngOnInit() {
        this.isNavSearchVisible = false;
        if (browser.msie) { // Not supported under IE
            this.fsbutton.nativeElement.style.display = 'none';
        }
        this.Profile();
    }

    Profile() {
        let data = {}
        this.adminService.add<any>(account.profile, data).subscribe(res => {
            this.name = res.data.username
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);

            if (error.error.message === "Your access token is expired, please login again.") {
                localStorage.removeItem('currentUser');
                this.router.navigate(['/']);
            }
            else if (error.error.message === "Your account is not active.") {
                localStorage.removeItem('currentUser');
                this.router.navigate(['/']);
                }
            else if (error.error.message === "You are not authorised to access this content.") {
                localStorage.removeItem('currentUser');
                this.router.navigate(['/']);
                }
            else if (error.error.message === "Your account is deleted by the administrator.") {
                localStorage.removeItem('currentUser');
                this.router.navigate(['/']);
            }
        });
    }


    toggleUserBlock(event) {
        event.preventDefault();
        this.userblockService.toggleVisibility();
    }

    openNavSearch(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setNavSearchVisible(true);
    }

    setNavSearchVisible(stat: boolean) {
        this.isNavSearchVisible = stat;
    }

    getNavSearchVisible() {
        return this.isNavSearchVisible;
    }

    toggleOffsidebar() {
        this.settings.layout.offsidebarOpen = !this.settings.layout.offsidebarOpen;
    }

    toggleCollapsedSideabar() {
        this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
    }

    isCollapsedText() {
        return this.settings.layout.isCollapsedText;
    }

    toggleFullScreen(event) {

        if (screenfull.enabled) {
            screenfull.toggle();
        }
        // Switch icon indicator
        const el = $(this.fsbutton.nativeElement);
        if (screenfull.isFullscreen) {
            el.children('em').removeClass('fa-expand').addClass('fa-compress');
        }
        else {
            el.children('em').removeClass('fa-compress').addClass('fa-expand');
        }
    }

    logout() {
        this.adminService.get<any>(account.logout).subscribe((res) => {
            this.toasterService.pop('success', 'Success', 'Logout successfully');
            localStorage.removeItem('currentUser');
            this.router.navigate(['/']);
        }, error => {
            localStorage.removeItem('currentUser');
            this.toasterService.pop('error', 'Error', error.statusText);
            this.router.navigate(['/']);
        })
    }

    ChangePassword() {
        this.router.navigate(['/admin/general-settings/changepassword']);
    }
}
