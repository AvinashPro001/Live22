import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from '../../../../app/confirmation-dialog/confirmation-dialog.service';
import { debounce } from 'rxjs/operators';
import { debug } from 'util';

@Component({
    selector: 'app-admin/promotion/retrive-list',
    templateUrl: './promotion-grouping-list.component.html',
    styleUrls: ['./promotion-grouping-list.component.scss']
})
export class PromotionGroupingListComponent implements OnInit {

    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('edit') edit: TemplateRef<any>;
    @ViewChild('delete') delete: TemplateRef<any>;
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
    promotionData: any;
    soritngColumn = "";
    loadingIndicator: boolean;
    searchString = "";
    pager: any = {};
    pagedItems: any[];
    res: any;
    data: any;
    final: any;
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
            this.setPageData();
        }        
    }
    //#endregion

    //#region setCoumn
    setColumn() {
        this.columns = [
            { prop: 'No', width: 90 },
            { prop: 'GroupName' },
            { prop: 'CreatedDate' },
            { prop: 'ModifyDate' },
            { prop: 'CreatedBy' },
            { prop: 'TotalPromotion' },
            { prop: 'Status' },
            { prop: 'Edit', cellTemplate: this.edit, sortable: false, width: 250 },
            { prop: 'Delete', cellTemplate: this.delete, sortable: false, width: 250 }
        ];
    }
    //#endregion

    //#region setPageData
    setPageData() {
        this.loadingIndicator = true;
        let data = {
        }
        this.adminService.get<any>(customer.promotionGroupSelect).subscribe(res => {
            this.rows = [];
            let i = 0;
            this.promotionData = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    GroupName: el.promotionGroupName,
                    CreatedDate: this.replaceDate(el.created),
                    ModifyDate: this.replaceDate(el.modified),
                    CreatedBy: el.createdBy,
                    TotalPromotion: el.totalPromotion,
                    Status: el.active == true ? "Active" : "Not Active"
                });
            });
            this.loadingIndicator = false;
            this.rows = [...this.rows]
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion

    ImageOpenNewTab() {
        //window.open(ImageUrl, 'Image', 'width=largeImage.stylewidth,height=largeImage.style.height,resizable=1');
    }

    //#region timeFormat
    replaceDate(date) {
        return date.replace("T", " ");
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
            this.router.navigate(['/admin/customers/promotion-group-add']);
            //this.openUnderconstructionDialog();
        }
    }
    //#endregion

    //#region openUnderconstructionDialog
    openUnderconstructionDialog() {
        this.confirmationDialogService.alert('Alert!!!!', 'The Add Deposit is under development.')
    }
    //#endregion

    //#region promotionDelete
    promotionDelete(id) {
        console.log(id);
        let data = {
            id: id
        }
        this.adminService.add<any>(customer.promotionGroupDelete, data).subscribe(res => {
            this.ngOnInit();
            this.toasterService.pop('success', 'Success', res.message);
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        })
    }
    //#endregion

    //#region navigate Edit
    async navigateEdit(promotionData) {
        if (await this.checkUpdatePermission()) {
            localStorage.setItem('promotionGroupData', JSON.stringify(promotionData));
            this.router.navigate(['/admin/customers/promotion-grouping-edit']);
        }
    }
    //#endregion 

    //#region openRejectConfirmationDialog
    async openRejectConfirmationDialog(id) {
        if (await this.checkUpdatePermission()) this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to Delete Promotion ?')
            .then((confirmed) => {
                this.final = confirmed
                this.promotionDelete(id)
            });
    }
    //#endregion

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[7].Permissions[0].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[7].submenu[2].Permissions[0].IsChecked === true) {
                    return true;
                }
                else {
                    this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
                    this.router.navigate(['admin/dashboard']);
                    return false;
                }
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
        if (usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[7].Permissions[1].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[7].submenu[2].Permissions[1].IsChecked === true) {
                    return true;
                }
                else {
                    this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
                    this.router.navigate(['admin/dashboard']);
                    return false;
                }
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
        if (usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[7].Permissions[2].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[7].submenu[2].Permissions[2].IsChecked === true) {
                    return true;
                }
                else {
                    this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
                    this.router.navigate(['admin/dashboard']);
                    return false;
                }
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


