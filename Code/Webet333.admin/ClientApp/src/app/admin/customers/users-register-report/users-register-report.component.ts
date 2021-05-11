import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-users-register-report',
    templateUrl: './users-register-report.component.html',
    styleUrls: ['./users-register-report.component.scss']
})

export class UsersRegisterReportComponent implements OnInit {
    rows = [];
    columns = [];
    loadingIndicator: boolean;
    Data: any;
    datePickerfromdate: string;
    datePickertodate: string;
    userGroupList: any;
    userGroupId: any;
    userGroupUsersList: any;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService,
        private modalService: NgbModal
    ) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            //this.setPageData();
            this.setToday();
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'Username' },
            { prop: 'Name' },
            { prop: 'MobileNo' },
            { prop: 'Language' },
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
            this.Data = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    userId: el.userId,
                    Username: el.Username,
                    Name: el.Name,
                    MobileNo: el.MobileNo,
                    UserICNumber: el.UserICNumber,
                    MobileNoConfirmed: el.MobileNoConfirmed ? "<b class='Available'>" + el.MobileNoConfirmed + "</lable>" : "<lable class='notAvailable'>" + el.MobileNoConfirmed + "</lable>",
                    TotalDepositAmount: el.TotalDeposit,
                    TotalWithdrawAmount: el.TotalWithdraw,
                    Created: el.Created,
                    Language: el.LanguageName
                });
            });
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region Filter Data

    setDatePicker(fromdate = null, todate = null) {
        this.datePickerfromdate = this.commonService.setDatePickerFormate(fromdate);
        this.datePickertodate = this.commonService.setDatePickerFormate(todate);
    }

    setToday() {
        var dates = this.commonService.getTodatDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.FilterData(fromdate, todate);
    }

    setYesterday() {
        var dates = this.commonService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.FilterData(fromdate, todate);
    }

    setThisWeek() {
        var dates = this.commonService.getThisWeekDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.FilterData(fromdate, todate);
    }

    setThisYear() {
        var dates = this.commonService.getThisYearDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.setDatePicker(new Date(fromdate), new Date(todate));

        this.FilterData(fromdate, todate);
    }

    //#endregion

    FilterData(startingDate = null, endingDate = null) {
        this.rows = [];
        this.loadingIndicator = true;
        let i = 0;

        var otpCheck;

        var verified = (document.getElementById("Verified") as HTMLInputElement).checked
        var unverified = (document.getElementById("Unverified") as HTMLInputElement).checked

        if (verified) otpCheck = verified;
        if (unverified) otpCheck = unverified;
        if (unverified && unverified) otpCheck = null;

        let data = {
            fromdate: startingDate === null ? (document.getElementById("txt_fromdatetime") as HTMLInputElement).value : startingDate,
            todate: endingDate === null ? (document.getElementById("txt_todatetime") as HTMLInputElement).value : endingDate,
            otpVerified: otpCheck
        }

        //let data = {
        //    fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value == "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
        //    todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value == "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value,
        //    otpVerified: otpCheck
        //}

        //if (startingDate !== null && endingDate !== null) {
        //    data.fromdate = startingDate;
        //    data.todate = endingDate;
        //    (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = null;
        //    (document.getElementById("txt_todatetime") as HTMLInputElement).value = null;
        //}

        this.adminService.add<any>(customer.userRegisterReport, data).subscribe(res => {
            this.Data = res.data;

            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    userId: el.userId,
                    Username: el.Username,
                    Name: el.Name,
                    MobileNo: el.MobileNo,
                    UserICNumber: el.UserICNumber,
                    MobileNoConfirmed: el.MobileNoConfirmed ? "<b class='Available'>" + el.MobileNoConfirmed + "</lable>" : "<lable class='notAvailable'>" + el.MobileNoConfirmed + "</lable>",
                    TotalDepositAmount: el.TotalDeposit,
                    TotalWithdrawAmount: el.TotalWithdraw,
                    Created: el.Created,
                    Language: el.LanguageName
                });
            });
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    DownloadExcel() {
        let data = {
            json: this.Data,
            fileName: "Users-Register"
        }

        this.adminService.add<any>(customer.DownlaodExcel, data).subscribe(res => {
            window.self.location = res.data.path;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[5].Permissions[0].IsChecked === true) {
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
        if (usersPermissions.permissionsList[3].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[5].Permissions[1].IsChecked === true) {
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
        if (usersPermissions.permissionsList[3].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[5].Permissions[2].IsChecked === true) {
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

    //#region Redirect to user details page

    show(row = null) {
        localStorage.setItem('id', JSON.stringify(row));
        window.open('admin/customers/users-details', '_blank');
    }

    //#endregion Redirect to user details page

    //#region Open UserGroup window

    ViewData(content) {
        if (this.isUserAvailable()) {
            this.openWindowCustomClass(content);
            this.loadUserGroup();
        }
    }

    openWindowCustomClass(content) { this.modalService.open(content, { windowClass: 'dark-modal', size: 'sm' }); }

    isUserAvailable() {
        if (this.Data == null || this.Data.length == 0) {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.NotUserInTable);

            return false;
        }
        else return true;
    }

    //#endregion Open UserGroup window

    //#region Config for UserGroup

    config = {
        displayKey: "groupName",                 //if objects array passed which key to be displayed defaults to description
        search: true,                           //true/false for the search functionlity defaults to false,
        height: '500px',                        //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        placeholder: 'Select UserGroup',        // text to be displayed when no item is selected defaults to Select,
        customComparator: () => { },            // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
        limitTo: Option.length,                 // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
        moreText: 'more',                       // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        noResultsFound: 'No results found!',    // text to be displayed when no items are found while searching
        searchPlaceholder: 'Search',            // label thats displayed in search input,
        searchOnKey: 'groupName'                 // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

    //#endregion Config for UserGroup

    //#region Load UserGroup

    loadUserGroup() {
        this.adminService.get<any>(customer.userGroupListForDropdown).subscribe(res => {
            this.userGroupList = res.data;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion Load UserGroup

    //#region On UserGroup Select

    userGroupOnChange(event) {
        try {
            this.userGroupId = event.value.id;
            if (this.userGroupId === '0') this.userGroupId = null;
        }
        catch (ex) {
            this.userGroupId = null;
        }
    }

    //#endregion On UserGroup Select

    //#region Save Users Into UserGroup

    saveUsersIntoUserGroup() {
        if (this.userGroupId == null || this.userGroupId == NaN || this.userGroupId == undefined || this.userGroupId == '0') this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SelectUserGroupFromDropdown);
        else {
            var userIdList = this.Data.map(function (a) { return a.userId; });

            let model = {
                userGroupId: this.userGroupId,
                userId: userIdList,
                fromdate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
                todate: (document.getElementById("txt_todatetime") as HTMLInputElement).value,
            };

            this.adminService.add<any>(customer.userGroupUserInsert, model).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.modalService.dismissAll(); //  Close Model
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#endregion Save Users Into UserGroup
}