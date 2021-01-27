import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-ref-keyword-add',
    templateUrl: './ref-keyword-add.component.html',
    styleUrls: ['./ref-keyword-add.component.scss']
})
export class RefKeywordAddComponent implements OnInit {
    @ViewChild('status') status: TemplateRef<any>;
    rows = [];
    columns = [];
    Refdata: any;
    loadingIndicator: boolean;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router
    ) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.setColumn();
            this.setPageData();
        }
    }

    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'ReferenceKeyword' },
            { prop: 'Created' },
            { prop: 'Modified' },
            { prop: 'Actions', cellTemplate: this.status, sortable: false, width: 50 }
        ];
    }

    async addKeyword() {
        if (await this.checkAddPermission()) {
            let RefModel = {
                keyword: ((document.getElementById("txt_keyword") as HTMLInputElement).value),
            }
            this.adminService.add<any>(customer.refKeywordAdd, RefModel).toPromise().then(res => {
                this.toasterService.pop('success', 'Successfully', res.message);
                this.ngOnInit()
            }).catch(error => {
                this.toasterService.pop('error', 'Error', error.error.message);
                this.ngOnInit()
            });
        }
    }

    setPageData() {
        this.rows = [];
        this.loadingIndicator = true;
        this.adminService.getAll<any>(customer.refKeywordList).subscribe(res => {
            this.Refdata = res.data;
            let i = 0;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    ReferenceKeyword: el.RefKeyword,
                    Created: this.ReplaceTime(el.Created),
                    Modified: this.ReplaceTime(el.Modified),
                });
            })
            this.rows = [...this.rows]
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    async Delete(Id) {
        if (await this.checkUpdatePermission()) {
            let model = {
                id: Id
            }
            this.adminService.add<any>(customer.refKeywordDelete, model).subscribe(res => {
                this.toasterService.pop('success', 'Successfully', res.message);
                this.ngOnInit();
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    ReplaceTime(Date) {
        return Date.replace("T", " ")
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[0].Permissions[0].IsChecked === true) {
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
        if (usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[0].Permissions[1].IsChecked === true) {
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
        if (usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[0].Permissions[2].IsChecked === true) {
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