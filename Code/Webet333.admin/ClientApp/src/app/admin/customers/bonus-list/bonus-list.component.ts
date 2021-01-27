import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from '../../../../app/confirmation-dialog/confirmation-dialog.service';

@Component({
    selector: 'app-admin/bonus/retrive-list',
    templateUrl: './bonus-list.component.html',
    styleUrls: ['./bonus-list.component.scss']
})
export class BonusListComponent implements OnInit {

    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('status') status: TemplateRef<any>;
    @ViewChild('action') action: TemplateRef<any>;
    toaster: any;
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });
    rows = [];
    columns = [];
    totalRecords = 0;
    filteredData = [];
    selectedList: any;
    bonusData: any;
    loadingIndicator: boolean;
    soritngColumn = "";
    searchString = "";
    pager: any = {};
    pagedItems: any[];
    res: any;
    model1: any;
    model2: any;
    totalBonus: any;
    data: any;
    final: any;
    listType: any = [
        { verified: "pending" },
        { verified: "approved" },
        { verified: "rejected" }
    ];

    forEach: any;
    confirmed: boolean;

    //#region constructor
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private confirmationDialogService: ConfirmationDialogService
    ) { }
    //#endregion

    //#region Init
    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            this.setPageData(null, null);
        }
    }
    //#endregion

    //#region setCoumn
    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'DateTime' },
            { prop: 'Username' },
            { prop: 'PromotionTitle' },
            { prop: 'BonusType' },
            { prop: 'BonusAmount' },
            { prop: 'Remark' },
            { prop: 'Operator' },
        ];
    }
    //#endregion

    //#region setPageData
    setPageData(fromdate, todate) {
        this.rows = [];
        this.loadingIndicator = true;
        let i = 0;
        let data = {
            fromDate: fromdate,
            toDate: todate
        }
        this.adminService.add<any>(customer.bonusList, data).subscribe(res => {
            this.bonusData = res.data.bonus;
            this.totalBonus = res.data.total;
            res.data.bonus.forEach(el => {
                this.rows.push({
                    No: ++i,
                    DateTime: this.ReplaceTime(el.created),
                    Username: el.username,
                    PromotionTitle: el.promotionTitle,
                    BonusType: el.depositMethod,
                    BonusAmount: el.amount,
                    Remark: el.referenceNo,
                    Operator: el.operatorName,
                });
            });
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion


    //#region timeFormat
    ReplaceTime(Date) {
        return Date.replace("T", " ")
    }

    toDate(date) {
        if (date === void 0) {
            return new Date(0);
        }
        if (this.isDate(date)) {
            return date;
        } else {
            return new Date(parseFloat(date.toString()));
        }
    }
    isDate(date) {
        return (date instanceof Date);
    }
    time(date, format) {
        var d = this.toDate(date);
        return format
            .replace(/Y/gm, d.getFullYear().toString())
            .replace(/m/gm, ('0' + (d.getMonth() + 1)).substr(-2))
            .replace(/d/gm, ('0' + (d.getDate())).substr(-2))
            .replace(/H/gm, ('0' + (d.getHours() + 0)).substr(-2))
            .replace(/i/gm, ('0' + (d.getMinutes() + 0)).substr(-2))
            .replace(/s/gm, ('0' + (d.getSeconds() + 0)).substr(-2))
            .replace(/v/gm, ('0000' + (d.getMilliseconds() % 1000)).substr(-3));
    }
    //#endregion

    //#region navigateAdd
    async navigateAdd() {
        if (await this.checkAddPermission()) {
            this.router.navigate(['/admin/customers/bonus-add']);
            //this.openUnderconstructionDialog();
        }
    }
    //#endregion

    //#region openUnderconstructionDialog
    openUnderconstructionDialog() {
        this.confirmationDialogService.alert('Alert!!!!', 'The Add Deposit is under development.')
    }
    //#endregion

    //#region openRejectConfirmationDialog
    openRejectConfirmationDialog(id) {
        this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to reject deposit ?')
            .then((confirmed) => {
                this.final = confirmed
            });
    }
    //#endregion

    searchHandlerByDate() {
        let fromdate, todate
        fromdate = (document.getElementById("txt_fromdatetime") as HTMLInputElement).value
        todate = (document.getElementById("txt_todatetime") as HTMLInputElement).value
        if (todate === "")
            todate = fromdate;
        if (fromdate === "")
            fromdate = todate;
        if (fromdate === "" && todate === "")
            this.toasterService.pop('error', 'Error', "Please select Date.");
        else if ((fromdate !== undefined && todate !== null) || (todate !== null && fromdate !== null)) {
            this.setPageData(fromdate, todate);
        }
        else {
            this.setPageData(null, null)
        }
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[2].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[3].Permissions[0].IsChecked === true) {
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
        if (usersPermissions.permissionsList[2].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[3].Permissions[1].IsChecked === true) {
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
        if (usersPermissions.permissionsList[2].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[3].Permissions[2].IsChecked === true) {
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