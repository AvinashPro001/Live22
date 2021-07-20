import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-homepagebanner-list',
    templateUrl: './homepagebanner-list.component.html',
    styleUrls: ['./homepagebanner-list.component.scss']
})

export class HomepagebannerListComponent implements OnInit {

    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('status') status: TemplateRef<any>;
    @ViewChild('action') action: TemplateRef<any>;
    rows = [];
    columns = [];
    homepageBannerData: any;
    loadingIndicator: boolean;
    final: any;
    res: any;
    data: any;
    forEach: any;
    confirmed: boolean;
    pageNumber = 0;
    pageSize = 10;
    totalRowCount = 0;
    offset = 0;

    constructor(
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService,
        private adminService: AdminService,
        private confirmationDialogService: ConfirmationDialogService) { }

    //#region Init

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            this.setPageData();
        }
    }

    //#endregion

    //#region Set Column

    setColumn() {
        this.columns = [
            { prop: 'No', width: 90 },
            { prop: 'Title' },
            { prop: 'WebBanner' },
            { prop: 'MobileBanner' },
            { prop: 'Language' },
            { prop: 'Sequence' },
            { prop: 'Actions', cellTemplate: this.status, sortable: true, width: 250 },
        ];
    }

    //#endregion

    //#region SetPageData

    setPageData() {
        this.loadingIndicator = true;

        let model = {
            pageNo: this.pageNumber,
            pageSize: this.pageSize
        };

        this.adminService.add<any>(customer.homePageBannerList, model).subscribe(res => {
            this.rows = [];

            //let i = 0;
            let i = ((this.pageNumber + 1) * this.pageSize) - this.pageSize;
            this.offset = res.data.offset;
            this.totalRowCount = res.data.total;

            this.homepageBannerData = res.data.result;
            res.data.result.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Title: el.title,
                    WebBanner: "<img src= '" + el.bannerWeb + "' height=30px width=60px />",
                    MobileBanner: "<img src= '" + el.bannerMobile + "' height=30px width=60px/>",
                    Language: el.languageName,
                    Sequence: el.sequence,
                    id: el.id,
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

    //#region Navigate to Add

    async navigateAdd() {
        if (await this.checkAddPermission()) {
            this.router.navigate(['/admin/customers/homepage-banner-add']);
        }
    }

    //#endregion

    //#region Navigate to Edit

    async navigateEdit(homepageBannerData) {
        if (await this.checkUpdatePermission()) {
            localStorage.setItem('homepageBannerData', JSON.stringify(homepageBannerData));
            this.router.navigate(['/admin/customers/homepage-banner-edit']);
        }
    }

    //#endregion

    //#region Delete

    async openRejectConfirmationDialog(id) {
        if (await this.checkUpdatePermission()) this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to Delete this home page banner ?')
            .then((confirmed) => {
                this.final = confirmed
                this.HomepageBannerDelete(id)
            });
    }

    HomepageBannerDelete(id) {
        if (this.final == true) {
            let data = {
                id: id,
            }
            this.adminService.add<any>(customer.homePageBannerDelete, data).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.ngOnInit()
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#endregion

    //#region Active

    async HomepageBannerActive(id, event) {
        if (await this.checkUpdatePermission()) {
            let data = {
                id: id,
                active: event
            }
            this.adminService.add<any>(customer.homePageBannerChangeStatus, data).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#endregion

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[7].Permissions[0].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[7].submenu[0].Permissions[0].IsChecked === true) {
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
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkUpdatePermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[7].Permissions[1].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[7].submenu[0].Permissions[1].IsChecked === true) {
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
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkAddPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[7].Permissions[2].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[7].submenu[0].Permissions[2].IsChecked === true) {
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
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    //#endregion Check Permission
}