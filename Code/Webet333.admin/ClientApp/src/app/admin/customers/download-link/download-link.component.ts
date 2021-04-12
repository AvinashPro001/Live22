import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-download-link',
    templateUrl: './download-link.component.html',
    styleUrls: ['./download-link.component.scss']
})

export class DownloadLinkComponent implements OnInit {
    rows = [];
    columns = [];
    loadingIndicator: boolean;
    downloadLinkData: any;
    @ViewChild('status') status: TemplateRef<any>;
    editData: any;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private modalService: NgbModal,
        private commonService: CommonService) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            this.setPageDate();
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'Name' },
            { prop: 'Link' },
            { prop: 'Barcode' },
            { prop: 'Actions', cellTemplate: this.status, sortable: false },
        ];
    }

    setPageDate() {
        this.loadingIndicator = true;
        this.rows = [];
        this.adminService.get<any>(customer.downloadLinkSelect).subscribe(res => {
            let i = 0;
            this.downloadLinkData = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Name: el.name,
                    Link: el.value,
                    Barcode: "<img src= '" + el.barcodeImage + "' height=60px width=60px/>",
                });
                this.loadingIndicator = false;
                this.rows = [...this.rows]
            });
        });
        this.loadingIndicator = false;
    }

    async show(row, content) {
        if (await this.checkUpdatePermission()) {
            this.editData = row;
            this.openWindowCustomClass(content);
        }
    }

    openWindowCustomClass(content) {
        this.modalService.open(content, { windowClass: 'dark-modal', });
    }

    UpdateDownload() {
        var link = (document.getElementById("txt_downloadlink") as HTMLInputElement).value;

        if (link === "") {
            return this.toasterService.pop('error', 'Error', "Please Insert Link");
        }

        let model = {
            id: this.editData.id,
            link: link
        }
        this.adminService.add<any>(customer.downloadLinkUpdate, model).subscribe(res => {
            this.ngOnInit();
            this.toasterService.pop('success', 'Success', res.message);
            this.modalService.dismissAll();
        }, error => {
            this.ngOnInit();
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[4].Permissions[0].IsChecked === true) {
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
        if (usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[4].Permissions[1].IsChecked === true) {
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
        if (usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[4].Permissions[2].IsChecked === true) {
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