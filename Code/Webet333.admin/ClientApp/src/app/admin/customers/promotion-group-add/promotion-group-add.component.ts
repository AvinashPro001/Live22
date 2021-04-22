import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-group-add',
    templateUrl: './promotion-group-add.component.html',
    styleUrls: ['./promotion-group-add.component.scss']
})

export class PromotionGroupAddComponent implements OnInit {
    InGroup = [];
    NotInGroup = [];

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService) { }

    async ngOnInit() {
        if (await this.checkAddPermission()) this.getPromotionList();
    }

    getPromotionList() {
        let data = {
        }
        this.adminService.get<any>(customer.promotionAdminList).subscribe(res => {
            res.data.forEach(el => {
                this.NotInGroup.push({
                    Text: el.title,
                    PromotionId: el.id,
                    selected: false
                });
            });
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    public toggleSelection(item, list) {
        item.selected = !item.selected;
    }

    public moveSelected(direction) {
        if (direction === 'left') {
            this.NotInGroup.forEach(item => {
                if (item.selected) {
                    this.InGroup.push(item);
                }
            });
            this.NotInGroup = this.NotInGroup.filter(i => !i.selected);
        } else {
            this.InGroup.forEach(item => {
                if (item.selected) {
                    this.NotInGroup.push(item);
                }
            });
            this.InGroup = this.InGroup.filter(i => !i.selected);
        }
    }

    public moveAll(direction) {
        if (direction === 'left') {
            this.InGroup = [...this.InGroup, ...this.NotInGroup];
            this.NotInGroup = [];
        } else {
            this.NotInGroup = [...this.NotInGroup, ...this.InGroup];
            this.InGroup = [];
        }
    }

    navigateCancle() {
        this.router.navigate(['/admin/customers/promotion-grouping-list']);
    }

    AddPromotionGroup() {
        let data = {
            groupName: (document.getElementById("txt_groupingName") as HTMLInputElement).value,
            jsonString: JSON.stringify(this.InGroup),
            isPerUserOnly: (document.getElementById("chk_only_one") as HTMLInputElement).checked,
            isDailyOnce: (document.getElementById("chk_daily_claimable") as HTMLInputElement).checked,
            active: (document.getElementById("chk_active") as HTMLInputElement).checked,
        };

        if (data.groupName == "")
            return this.toasterService.pop('error', 'Error', "Please Insert Group Name");

        if (data.jsonString == "[]")
            return this.toasterService.pop('error', 'Error', "Please Select atleast 1 Promotion");

        if (data.isDailyOnce == false && data.isPerUserOnly == false)
            return this.toasterService.pop('error', 'Error', "Please Checked Checkbox either ONLY 1 TIME PER USER FOR LIFE TIME or DAILY CLAIMABLE");

        this.adminService.add<any>(customer.promotionGroupInsert, data).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            this.router.navigate(['/admin/customers/promotion-grouping-list']);
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[7].Permissions[0].IsChecked === true) {
                if (usersPermissions.permissionsList[1].submenu[7].submenu[2].Permissions[0].IsChecked === true) {
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
                if (usersPermissions.permissionsList[1].submenu[7].submenu[2].Permissions[1].IsChecked === true) {
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
                if (usersPermissions.permissionsList[1].submenu[7].submenu[2].Permissions[2].IsChecked === true) {
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