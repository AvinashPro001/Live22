import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-freecreditevent-add',
    templateUrl: './freecreditevent-add.component.html',
    styleUrls: ['./freecreditevent-add.component.scss']
})

export class FreecrediteventAddComponent implements OnInit {
    usersPermissions: any;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });
    rows = [];
    columns = [];
    customerData: any;
    res: any;
    forEach: any;
    loadingIndicator: boolean = false;
    userGroupId: any;
    userGroupList: any;
    completedUsers: any = 0;
    totalUsers: any = 0;
    freecreditterm: any;
    totalRowForTerm: number = 20;
    disabled: boolean = false;
    totalWinLossAmount: any = 0;
    totalFreeCredit: any = 0;
    data: any;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService,
        private modalService: NgbModal) { }

    async ngOnInit() {
        this.usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (await this.checkViewPermission()) {
            this.setColumn();
            this.loadUserGroup();
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'UserId' },
            { prop: 'Username' },
            { prop: 'Winloss' },
            { prop: 'FreeCredit' }
        ];
    }

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
            if (this.userGroupId === '0') {
                this.rows = [];
                this.setCount(0, 0);
            }
            else this.LoadUserBasedOnUserGroupId(this.userGroupId);
        }
        catch (ex) {
            this.userGroupId = null;
            this.rows = [];
            this.setCount(0, 0);
        }
    }

    //#endregion On UserGroup Select

    //#region Load user based on usergroup

    LoadUserBasedOnUserGroupId(userGroupId) {
        this.loadingIndicator = true;

        let model = {
            UserGroupId: userGroupId,
            searchParam: null,
            id: null,
            fromDate: null,
            toDate: null,
            pageSize: null,
            pageNo: null,
            orderBy: null
        }

        try {
            this.adminService.add<any>(customer.freeCreditEventUsersSelect, model).subscribe(res => {
                let i = 1;
                this.rows = [];
                this.customerData = res.data;

                res.data.forEach(el => {
                    this.rows.push({
                        No: i,
                        UserId: el.userId,
                        Username: el.userName,
                        Winloss: el.winLossAmount,
                        FreeCredit: el.freeCreditAmount
                    });
                    i++;
                    this.rows = [...this.rows]
                    this.setCount(this.customerData[0].completedUsers, this.customerData[0].totalUsers);
                    this.totalFreeCredit = this.customerData[0].totalFreeCredit;
                    this.totalWinLossAmount = this.customerData[0].totalWinLossAmount;
                    this.loadingIndicator = false;
                })

                if (this.customerData.length == 0) this.setCount(0, 0);
                this.loadingIndicator = false;
            }, error => {
                this.setCount(0, 0);
                this.loadingIndicator = false;
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
        catch (ex) {
            this.setCount(0, 0);
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', ex.message);
        }
    }

    //#endregion Load user based on usergroup

    setCount(completedUsers, totalUsers) {
        this.completedUsers = completedUsers;
        this.totalUsers = totalUsers;
    }

    //#region Open Free Credit Event Term window

    ViewData(content) {
        if (this.commonService.CheckVariable(this.userGroupId)) {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectUserGroup);
        }
        else {
            if (this.freecreditterm == null) this.freecreditterm = this.counter(this.totalRowForTerm);

            this.openWindowCustomClass(content);
        }
    }

    openWindowCustomClass(content) { this.modalService.open(content, { windowClass: 'dark-modal', size: 'sm' }); }

    //#endregion Open Free Credit Event Term window

    SetFreeCreditEventTerm(id = null) {
        this.loadingIndicator = true;

        this.freecreditterm = new Array(this.totalRowForTerm);

        for (let i = 0; i < this.totalRowForTerm; i++) {
            let temp = {
                fromAmount: (document.getElementById("txt_from_" + i) as HTMLInputElement).value,
                toAmount: (document.getElementById("txt_to_" + i) as HTMLInputElement).value,
                freeCreditAmount: (document.getElementById("txt_freecredit_" + i) as HTMLInputElement).value
            };
            this.freecreditterm[i] = temp;
        }

        let model = {
            id: id,
            usergroupId: this.userGroupId,
            freeCreditEventTerm: this.freecreditterm
        }

        try {
            this.adminService.add<any>(customer.freeCreditEventSetFreeCreditTerm, model).subscribe(res => {
                let i = 1;
                this.rows = [];
                this.customerData = res.data;

                res.data.forEach(el => {
                    this.rows.push({
                        No: i,
                        UserId: el.userId,
                        Username: el.userName,
                        Winloss: el.winLossAmount,
                        FreeCredit: el.freeCreditAmount
                    });
                    i++;
                    this.rows = [...this.rows]
                    this.setCount(this.customerData[0].completedUsers, this.customerData[0].totalUsers);
                    this.totalFreeCredit = this.customerData[0].totalFreeCredit;
                    this.totalWinLossAmount = this.customerData[0].totalWinLossAmount;
                    this.loadingIndicator = false;
                })

                if (this.customerData.length == 0) this.setCount(0, 0);
                this.loadingIndicator = false;
            }, error => {
                this.setCount(0, 0);
                this.loadingIndicator = false;
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
        catch (ex) {
            this.setCount(0, 0);
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', ex.message);
        }

        this.modalService.dismissAll(); //  Close Model
    }

    //#region For dynamic row

    counter(i: number) {
        this.freecreditterm = new Array(i);

        for (let j = 0; j < i; j++) {
            let temp = {
                fromAmount: 0,
                toAmount: 0,
                freeCreditAmount: 0
            };
            this.freecreditterm[j] = temp;
        }

        //return new Array(i);
        return this.freecreditterm;
    }

    //#endregion For dynamic row

    //#region Clear free credit terms

    ClearFreeCreditEventTerm() {
        //this.freecreditterm = null;
        if (this.freecreditterm != null) {
            for (var i = 0; i < this.freecreditterm.length; i++) {
                this.freecreditterm[i].fromAmount = 0;
                this.freecreditterm[i].toAmount = 0;
                this.freecreditterm[i].freeCreditAmount = 0;
            }
        }
    }

    //#endregion Clear free credit terms

    //#region Save Free Credit Event

    SaveFreeCreditEvent() {
        this.disabled = true;

        let model = {
            name: (document.getElementById("txt_freecrediteventname") as HTMLInputElement).value,
            usergroupId: this.userGroupId,
            freeCreditEventTerm: this.freecreditterm
        }

        if (this.commonService.CheckVariable(model.name)) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseEnterValidFreeCreditEventName);
        }

        if (this.commonService.CheckVariable(model.usergroupId)) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectUserGroup);
        }

        if (this.commonService.CheckVariable(model.freeCreditEventTerm)) {
            this.disabled = false;
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSetFreeCreditEventTerm);
        }

        try {
            this.adminService.add<any>(customer.freeCreditEventInsert, model).subscribe(res => {
                this.disabled = false;
                this.toasterService.pop('success', 'Success', res.message);
                this.router.navigate(['/admin/customers/freecreditevent-list']);
            }, error => {
                this.disabled = true;
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
        catch (ex) {
            this.disabled = true;
            this.toasterService.pop('error', 'Error', ex.message);
        }
    }

    //#endregion Save Free Credit Event

    //#region Export Excel

    DownloadExcel() {
        if (this.customerData == null) { this.toasterService.pop('error', 'Error', this.commonService.errorMessage.EmptyTable); }
        else {
            let freeCreditEventName = (document.getElementById("txt_freecrediteventname") as HTMLInputElement).value;
            this.data = this.customerData.map(({ userId, name, userName, phoneNumber, winLossAmount, freeCreditAmount }) => ({ userId, name, userName, phoneNumber, winLossAmount, freeCreditAmount }));

            let model = {
                json: this.data,
                fileName: freeCreditEventName + "-Free-Credit-Event"
            }

            this.adminService.add<any>(customer.DownlaodExcel, model).subscribe(res => {
                window.self.location = res.data.path;
            }, error => {
                this.loadingIndicator = false;
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#endregion Export Excel

    //#region Check Permission

    async checkViewPermission() {
        if (this.usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (this.usersPermissions.permissionsList[1].submenu[15].Permissions[0].IsChecked === true) {
                return true;
            }
            else {
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
        if (this.usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (this.usersPermissions.permissionsList[1].submenu[15].Permissions[1].IsChecked === true) {
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
        if (this.usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
            if (this.usersPermissions.permissionsList[1].submenu[15].Permissions[2].IsChecked === true) {
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