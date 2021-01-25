import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-promotion-grouping-edit',
    templateUrl: './promotion-grouping-edit.component.html',
    styleUrls: ['./promotion-grouping-edit.component.scss']
})
export class PromotionGroupingEditComponent implements OnInit {

    InGroup = [];
    NotInGroup = [];

    PromotionGroupingData: any;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getPromotionList();
    }

    getPromotionList() {
        this.PromotionGroupingData = JSON.parse(localStorage.getItem('promotionGroupData'));
        (document.getElementById("txt_groupingName") as HTMLInputElement).value = this.PromotionGroupingData.promotionGroupName;
        (document.getElementById("chk_only_one") as HTMLInputElement).checked = this.PromotionGroupingData.isPerUserOnly;
        (document.getElementById("chk_daily_claimable") as HTMLInputElement).checked = this.PromotionGroupingData.isDailyOnce;
        (document.getElementById("chk_active") as HTMLInputElement).checked = this.PromotionGroupingData.active;

        let data = {
        }
        this.adminService.add<any>(customer.promotionAdminList,data).subscribe(res => {
            var NotInGroupList = res.data;
            var InGroupList = [];
            this.PromotionGroupingData.details.forEach(EL => {
                NotInGroupList = NotInGroupList.filter(i => i.id != EL.promotionId);
                InGroupList.push(res.data.filter(i => i.id == EL.promotionId)[0]);
                InGroupList = InGroupList.filter(i => i != undefined);
            })
            NotInGroupList.forEach(el => {
                this.NotInGroup.push({
                    Text: el.title,
                    PromotionId: el.id,
                    selected: false
                });
            });
            InGroupList.forEach(el => {
                this.InGroup.push({
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


    UpdatePromotionGroup() {
        let data = {
            groupId: this.PromotionGroupingData.id,
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

        this.adminService.add<any>(customer.promotionGroupUpdate, data).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            this.router.navigate(['/admin/customers/promotion-grouping-list']);
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

}
