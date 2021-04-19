import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { ConfirmationDialogService } from '../../../../app/confirmation-dialog/confirmation-dialog.service';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-freecreditevent-list',
    templateUrl: './freecreditevent-list.component.html',
    styleUrls: ['./freecreditevent-list.component.scss']
})

export class FreecrediteventListComponent implements OnInit {
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
    loadingIndicator: boolean = true;
    final: any;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private confirmationDialogService: ConfirmationDialogService,
        private modalService: NgbModal,
        private commonService: CommonService) { }

    async ngOnInit() {
        this.usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (await this.checkViewPermission()) {
            this.setColumn();
            this.setPageData();
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'Id' },
            { prop: 'FreeCreditEventName' },
            { prop: 'CompletedUsers' },
            { prop: 'CreatedDateTime' },
            { prop: 'LastModifyDateTime' },
            { prop: 'Action', cellTemplate: this.status, sortable: true, width: 250 }
        ];
    }

    setPageData(search = null) {
        this.loadingIndicator = true;

        let model = {
            searchParam: search,
            id: null,
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
                this.rows.push({
                    Id: i,
                    FreeCreditEventName: el.freeCreditEventName,
                    CompletedUsers: el.completedUsers + '/' + el.totalUsers,
                    CreatedDateTime: this.replaceDateTime(el.created),
                    LastModifyDateTime: this.replaceDateTime(el.modified),
                    active: el.active,
                    id: el.freeCreditEventId
                });
                i++;
                this.rows = [...this.rows]
                this.loadingIndicator = false;
            })
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region Replace "T" from date time

    replaceDateTime(date) { return date.replace("T", " "); }

    //#endregion Replace "T" from date time

    //#region Delete

    async openRejectConfirmationDialog(id) {
        if (await this.checkUpdatePermission()) {
            let freeCreditEventName = this.customerData.find(item => item.freeCreditEventId === id).freeCreditEventName;
            this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete ' + freeCreditEventName + ' free credit Event?')
                .then((confirmed) => {
                    this.final = confirmed
                    this.deleteCustomer(id)
                });
        }
    }

    deleteCustomer(id) {
        if (this.final == true) {
            let model = {
                id: id,
                active: "true"
            }
            this.adminService.add<any>(customer.freeCreditEventDelete, model).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.ngOnInit();
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#endregion Delete

    //#region Active/InActive

    async manualUpdateEvent(id, value: boolean) {
        if (await this.checkUpdatePermission())
            this.rejectCustomer(id, value);
    }

    rejectCustomer(id, value) {
        let freeCreditEventName = this.customerData.find(item => item.freeCreditEventId === id).freeCreditEventName;

        let model = {
            id: id,
            active: value
        }

        this.adminService.add<any>(customer.userGroupUpdateStatus, model).subscribe(res => {
            if (value == true) this.toasterService.pop('success', 'Success', freeCreditEventName + " FreeCreditEvent is active.");
            else this.toasterService.pop('success', 'Success', freeCreditEventName + " FreeCreditEvent is deactive.");
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion Active/InActive

    searchHandler(event) {
        if (event.target.value.length >= 3)
            if (event.target.value) this.setPageData(event.target.value);
            else this.setPageData("");
        else if (event.target.value.length == 0) this.setPageData("");
    }

    //#region Navigate to add page

    async navigateAdd() {
        if (await this.checkAddPermission()) this.router.navigate(['/admin/customers/freecreditevent-add']);
    }

    //#endregion Navigate to add  page

    //#region Navigate to edit page

    async navigateEdit(freeCreditEventId) {
        if (await this.checkUpdatePermission()) {
            localStorage.setItem('freeCreditEventId', JSON.stringify(freeCreditEventId));
            this.router.navigate(['/admin/customers/freecreditevent-edit']);
        }
    }

    //#endregion Navigate to edit  page

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