import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-tracking-list',
    templateUrl: './tracking-list.component.html',
    styleUrls: ['./tracking-list.component.scss']
})
export class TrackingListComponent implements OnInit {
    rows = [];
    columns = [];
    listType: any = [
        { Type: "Login" },
        { Type: "Register" },
    ];
    selectedlist: any;
    loadingIndicator: boolean = false;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router
    ) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColoum();
            this.setData();
        }
    }

    setColoum() {
        this.columns = [
            { prop: 'No' },
            { prop: 'UserName' },
            { prop: 'Process' },
            { prop: 'Created' },
        ];
    }

    setData() {
        this.loadingIndicator = true;
        let data = {
        }
        this.adminService.add<any>(customer.trackingSelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    UserName: el.Usernames,
                    Process: el.Process,
                    Created: this.replaceDate(el.Created),
                });
            });
            this.loadingIndicator = false;
        }, error => {
            this.rows = [];
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;
        });
    }

    replaceDate(date) {
        return date.replace("T", " ");
    }

    //#region       Filter Data

    setToday() {
        var preDate = new Date().getDate();
        var preMonth = new Date().getMonth() + 1;
        var preYear = new Date().getFullYear();

        var fromdate = preYear + '-' + preMonth + '-' + preDate;
        var todate = preYear + '-' + preMonth + '-' + preDate;

        this.Search(fromdate, todate);
    }

    setYesterday() {
        var lastday = function (y, m) { return new Date(y, m, 0).getDate(); }

        var preDate = new Date().getDate() - 1;
        var preMonth = new Date().getMonth() + 1;
        var preYear = new Date().getFullYear();

        //#region Testing

        //preDate = 1 - 1;
        //preMonth = 1;
        //preYear = 2021;

        //#endregion Testing

        if (preDate === 0) {
            preMonth = preMonth - 1
            if (preMonth === 0) {

                preYear = preYear - 1;
                preMonth = 12;
                preDate = lastday(preYear, preMonth);
            }
            else {
                preDate = lastday(preYear, preMonth);
            }
        }

        var fromdate = preYear + '-' + preMonth + '-' + preDate;
        var todate = preYear + '-' + preMonth + '-' + preDate;

        this.Search(fromdate, todate);
    }

    setThisWeek() {

        //#region Get start date and end date of week.

        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6
        var firstday = new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));

        //#endregion Get start date and end date of week.

        var fromdate = firstday.getFullYear() + '-' + firstday.getMonth() + 1 + '-' + firstday.getDate();
        var todate = lastday.getFullYear() + '-' + lastday.getMonth() + 1 + '-' + lastday.getDate();

        this.Search(fromdate, todate);
    }

    setThisYear() {
        var fromdate = new Date().getFullYear() + '-' + 1 + '-' + 1;
        var todate = new Date().getFullYear() + '-' + 12 + '-' + 31;

        this.Search(fromdate, todate);
    }

    //#endregion

    Search(startingDate = null, endingDate = null) {
        this.loadingIndicator = true;
        let data = {
            process: this.selectedlist === undefined ? null : this.selectedlist,
            fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value
        }

        if (startingDate !== null && endingDate !== null) {
            data.fromdate = startingDate;
            data.todate = endingDate
        }

        this.adminService.add<any>(customer.trackingSelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    UserName: el.Usernames,
                    Process: el.Process,
                    Created: this.replaceDate(el.Created),
                });
            });
            this.loadingIndicator = false;
        }, error => {
            this.rows = [];
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;
        });
    }

    onChange(event) {
        this.selectedlist = event.target.value;
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[1].Permissions[0].IsChecked === true) {
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

    async checkUpdatePermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[1].Permissions[1].IsChecked === true) {
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
        if (usersPermissions.permissionsList[3].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[1].Permissions[2].IsChecked === true) {
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