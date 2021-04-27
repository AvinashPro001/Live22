import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-admin-log-report',
    templateUrl: './admin-log-report.component.html',
    styleUrls: ['./admin-log-report.component.scss']
})

export class AdminLogReportComponent implements OnInit {
    @ViewChild('link') link: TemplateRef<any>;

    loadingIndicator: boolean;

    rows = [];

    adminList: any;
    userList: any;
    actionList: any;
    moduleList: any;

    datePickerfromdate: string;
    datePickertodate: string;

    adminId: string = null;
    userId: string = null;
    actionId: string = null;
    moduleId: string = null;

    columns = [];

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.commonService.CheckUserToken();    //  Check User token is not expire.

            this.loadAction();
            this.loadAdmin();
            this.loadModule();
            this.loadUsers();

            this.setColumn();
            this.setToday();
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'No', width: 25 },
            { prop: 'Admin' },
            { prop: 'Username' },
            { prop: 'Action' },
            { prop: 'Module' },
            { prop: 'TransactionId' },
            { prop: 'Description' },
            { prop: 'DateTime' }
        ];
    }

    //#region Load AdminList

    loadAdmin() {
        let model = {
            role: "admin"
        };
        this.adminService.add<any>(customer.customerListForDropdown, model).subscribe(res => {
            this.adminList = res.data;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion Load AdminList

    //#region Users AdminList

    loadUsers() {
        let model = {
            role: "user"
        };
        this.adminService.add<any>(customer.customerListForDropdown, model).subscribe(res => {
            this.userList = res.data;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion Load AdminList

    //#region Load Action List

    loadAction() {
        this.adminService.get<any>(customer.adminAction).subscribe(res => {
            this.actionList = res.data;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion Load Action List

    //#region Load Module List

    loadModule() {
        this.adminService.get<any>(customer.adminModule).subscribe(res => {
            this.moduleList = res.data;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion Load Module List

    //#region config for username dropdown

    config = {
        displayKey: "username",                 //if objects array passed which key to be displayed defaults to description
        search: true,                           //true/false for the search functionlity defaults to false,
        height: '500px',                        //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        placeholder: 'Select Username.',        // text to be displayed when no item is selected defaults to Select,
        customComparator: () => { },            // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
        limitTo: Option.length,                 // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
        moreText: 'more',                       // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        noResultsFound: 'No results found!',    // text to be displayed when no items are found while searching
        searchPlaceholder: 'Search',            // label thats displayed in search input,
        searchOnKey: 'username'                 // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

    //#endregion config for username dropdown

    //#region Filter Data

    setDatePicker(fromdate = null, todate = null) {
        this.datePickerfromdate = this.commonService.setDatePickerFormate(fromdate);
        this.datePickertodate = this.commonService.setDatePickerFormate(todate);
    }

    setToday() {
        var dates = this.commonService.getTodatDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.search(fromdate, todate);
    }

    setYesterday() {
        var dates = this.commonService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.search(fromdate, todate);
    }

    setThisWeek() {
        var dates = this.commonService.getThisWeekDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.search(fromdate, todate);
    }

    setThisYear() {
        var dates = this.commonService.getThisYearDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.search(fromdate, todate);
    }

    search(fromdate = null, todate = null, searchParam = null) {
        // Empty search box alue.
        ((document.getElementById("searchText") as HTMLInputElement).value) = null;

        this.loadingIndicator = true;
        this.rows = [];

        let data = {
            adminId: this.adminId,
            userId: this.userId,
            actionId: this.actionId,
            moduleId: this.moduleId,
            searchParam: searchParam,
            fromDate: fromdate === null ? (document.getElementById("txt_fromdatetime") as HTMLInputElement).value : fromdate,
            toDate: todate === null ? (document.getElementById("txt_todatetime") as HTMLInputElement).value : todate
        };

        this.setDatePicker(new Date(data.fromDate), new Date(data.toDate));

        if (data.fromDate === null || data.fromDate === '' || data.fromDate === undefined || data.fromDate === NaN ||
            data.toDate === null || data.toDate === '' || data.toDate === undefined || data.toDate === NaN) {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', ErrorMessages.PleaseProvideFromDateToDate);
        }
        else {
            this.adminService.add<any>(customer.adminLogList, data).subscribe(res => {
                this.rows = [];
                let i = 0;

                res.data.forEach(el => {
                    this.rows.push({
                        No: ++i,
                        Admin: el.AdminName,
                        userId: el.userId,
                        Username: el.UserName == null ? "Not Available" : el.UserName,
                        Action: el.ActionName,
                        Module: el.ModuleName,
                        TransactionId: el.TransactionId == null ? "Not Available" : el.TransactionId,
                        Description: el.Description,
                        DateTime: this.ReplaceTime(el.Created)
                    });
                })
                this.rows = [...this.rows];
                this.loadingIndicator = false;
            }, error => {
                this.loadingIndicator = false;
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    dropdownFilter(adminId = null, userId = null, actionId = null, moduleId = null, searchParam = null) {
        this.loadingIndicator = true;
        this.rows = [];

        let data = {
            adminId: adminId,
            userId: userId,
            actionId: actionId,
            moduleId: moduleId,
            searchParam: searchParam
        };

        this.adminService.add<any>(customer.adminLogList, data).subscribe(res => {
            this.rows = [];
            let i = 0;

            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Admin: el.AdminName,
                    userId: el.userId,
                    Username: el.UserName == null ? "Not Available" : el.UserName,
                    Action: el.ActionName,
                    Module: el.ModuleName,
                    TransactionId: el.TransactionId == null ? "Not Available" : el.TransactionId,
                    Description: el.Description,
                    DateTime: this.ReplaceTime(el.Created)
                });
            })
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    ReplaceTime(Date) { return Date.replace("T", " ") }

    adminIdOnChange(event) {
        try {
            this.adminId = event.target.value;
            if (this.adminId === '0') this.adminId = null;
        }
        catch (ex) {
            this.adminId = null;
        }
    }

    userIdOnChange(event) {
        try {
            this.userId = event.value.id;
            if (this.userId === '0') this.userId = null;
        }
        catch (ex) {
            this.userId = null;
        }
    }

    actoinIdOnChange(event) {
        try {
            this.actionId = event.target.value;
            if (this.actionId === '0') this.actionId = null;
        }
        catch (ex) {
            this.actionId = null;
        }
    }

    moduleIdOnChange(event) {
        try {
            this.moduleId = event.target.value;
            if (this.moduleId === '0') this.moduleId = null;
        }
        catch (ex) {
            this.moduleId = null;
        }
    }

    searchHandler(event) {
        var parameter = ((document.getElementById("searchText") as HTMLInputElement).value)
        if (parameter != "" && parameter.length >= 3) this.dropdownFilter(null, null, null, null, parameter);
    }

    //#endregion

    //#region Redirect to user details page

    show(row = null) {
        localStorage.setItem('id', JSON.stringify(row));
        window.open('admin/customers/users-details', '_blank');
    }

    //#endregion Redirect to user details page

    //#region Check Permission

    async checkViewPermission() {
        const usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[15].Permissions[0].IsChecked === true) {
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
        const usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[15].Permissions[1].IsChecked === true) {
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
        const usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[15].Permissions[2].IsChecked === true) {
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