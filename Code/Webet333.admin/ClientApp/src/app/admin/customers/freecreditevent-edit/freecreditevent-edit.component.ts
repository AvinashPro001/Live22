import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-freecreditevent-edit',
    templateUrl: './freecreditevent-edit.component.html',
    styleUrls: ['./freecreditevent-edit.component.scss']
})

export class FreecrediteventEditComponent implements OnInit {
    usersPermissions: any;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('status') status: TemplateRef<any>;
    toaster: any;
    toasterConfig: any;
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
    final: any;
    userGroupId: any;
    userGroupName: any;
    id: any;
    selectedUserList = [];
    userGroupList: any;
    completedUsers: any = 0;
    totalUsers: any = 0;
    freeCreditEventTerms: any;
    freeCreditEventTermsTemp: any;
    freeCreditEventId: any;
    freeCreditEventName: any;
    freeCreditEventUsersList: any;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService,
        private modalService: NgbModal) { }

    async ngOnInit() {
        this.usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (await this.checkViewPermission()) {
            this.id = JSON.parse(localStorage.getItem('freeCreditEventId'));
            this.setColumn();
            this.setPageData();
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

    setPageData(search = null) {
        this.loadingIndicator = true;

        let model = {
            searchParam: search,
            id: this.id,
            fromDate: null,
            toDate: null,
            pageSize: null,
            pageNo: null,
            orderBy: null
        }

        this.adminService.add<any>(customer.freeCreditEventList, model).subscribe(res => {
            let i = 1;
            this.rows = [];
            this.customerData = res.data;

            res.data.forEach(el => {
                this.freeCreditEventId = el.freeCreditEventId;
                this.freeCreditEventName = el.freeCreditEventName;
                this.userGroupId = el.userGroupId;
                this.userGroupName = el.userGroupName;
                this.completedUsers = el.completed;
                this.totalUsers = el.totalUsers;
                this.freeCreditEventTerms = el.terms;
                if (el.userList != null) {
                    el.userList.forEach(el => {
                        this.rows.push({
                            No: i,
                            UserId: el.userId,
                            Username: el.username,
                            Winloss: el.winLossAmount,
                            FreeCredit: el.freeCredit
                        });
                        i++;
                        this.rows = [...this.rows]
                    })
                }

                this.loadingIndicator = false;
            })
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
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

    setCount(completedUsers, totalUsers) {
        this.completedUsers = completedUsers;
        this.totalUsers = totalUsers;
    }

    //#region Open Free Credit Event Term window

    ViewData(content) {
        if (this.commonService.CheckVariable(this.userGroupId)) this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectUserGroup);
        else this.openWindowCustomClass(content);
    }

    openWindowCustomClass(content) { this.modalService.open(content, { windowClass: 'dark-modal', size: 'sm' }); }

    //#endregion Open Free Credit Event Term window

    //#region Set & Get Free Credit Event Term

    SetFreeCreditEventTerm(id = null) {
        this.loadingIndicator = true;

        try {
            let model = {
                id: this.id,
                usergroupId: this.userGroupId,
                freeCreditEventTerm: this.freeCreditEventTerms
            }

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

    //#endregion Set & Get Free Credit Event Term

    //#region For dynamic row

    counter(i: number) {
        return new Array(i);
    }

    //#endregion For dynamic row

    //#region Clear free credit terms

    ClearFreeCreditEventTerm() {
        for (var i = 0; i < this.freeCreditEventTerms.length; i++) {
            this.freeCreditEventTerms[i].FromAmount = 0;
            this.freeCreditEventTerms[i].ToAmount = 0;
            this.freeCreditEventTerms[i].FreeCreditAmount = 0;
        }
    }

    //#endregion Clear free credit terms

    //#region Save Free Credit Event

    SaveFreeCreditEvent() {
        try {
            let model = {
                id: this.id,
                name: (document.getElementById("txt_freecrediteventname") as HTMLInputElement).value,
                usergroupId: this.userGroupId,
                freeCreditEventTerm: JSON.stringify(this.freeCreditEventTerms)
            }

            if (this.commonService.CheckVariable(model.name)) return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseEnterValidFreeCreditEventName);

            if (this.commonService.CheckVariable(model.usergroupId)) return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectUserGroup);

            if (this.commonService.CheckVariable(model.freeCreditEventTerm)) return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSetFreeCreditEventTerm);

            let model1 = {
                searchParam: null,
                id: this.id,
                fromDate: null,
                toDate: null,
                pageSize: null,
                pageNo: null,
                orderBy: null
            }

            this.adminService.add<any>(customer.freeCreditEventList, model1).subscribe(res => {
                res.data.forEach(el => {
                    this.freeCreditEventTermsTemp = el.terms;
                })

                if (JSON.stringify(this.freeCreditEventTerms) == JSON.stringify(this.freeCreditEventTermsTemp)) model.freeCreditEventTerm = null;

                this.adminService.add<any>(customer.freeCreditEventUpdate, model).subscribe(res => {
                    this.toasterService.pop('success', 'Success', res.message);
                    this.router.navigate(['/admin/customers/freecreditevent-list']);
                }, error => {
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
        catch (ex) {
            this.toasterService.pop('error', 'Error', ex.message);
        }
    }

    //#endregion Save Free Credit Event

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