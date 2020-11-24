import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer } from '../../../../environments/environment';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from '../../../../app/confirmation-dialog/confirmation-dialog.service';
import { debounce } from 'rxjs/operators';
import { debug } from 'util';

@Component({
    selector: 'app-admin/promotion/retrive-list',
    templateUrl: './promotion-list.component.html',
    styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent implements OnInit {

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
    promotionData: any;
    soritngColumn = "";
    loadingIndicator: boolean;
    searchString = "";
    pager: any = {};
    pagedItems: any[];
    res: any;
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
    ngOnInit() {
        this.setColumn();
        this.setPageData();
    }
    //#endregion

    //#region setCoumn
    setColumn() {
        this.columns = [
            { prop: 'No', width: 90 },
            { prop: 'DateStart' },
            { prop: 'DateEnd' },
            { prop: 'TimeStart' },
            { prop: 'TimeEnd' },
            { prop: 'Title' },
            { prop: 'Banner' },
            { prop: 'MobileBanner' },
            { prop: 'Amount' },
            { prop: 'Type' },
            { prop: 'TurnoverTime' },
            { prop: 'Winturn' },
            { prop: 'Language' },
            { prop: 'Sequence' },
            { prop: 'Actions', cellTemplate: this.status, sortable: false, width: 250 },
        ];
    }
    //#endregion

    //#region setPageData
    setPageData() {
        this.loadingIndicator = true;
        let data = {
        }
        this.adminService.get<any>(customer.promotionAdminList).subscribe(res => {
            this.rows = [];
            let i = 0;
            this.promotionData = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    DateStart: this.replaceDate(el.startDate),
                    DateEnd: this.replaceDate(el.endDate),
                    TimeStart: el.startTime,
                    TimeEnd: el.endTime,
                    Title: el.title,
                    Banner: "<img src= '" + el.banner + "' height=30px width=60px />",
                    MobileBanner: "<img src= '" + el.mobilebanner + "' height=30px width=60px/>",
                    Amount: el.discount,
                    Type: el.discountType,
                    Sequence: el.sequence,
                    Language: el.languageName,
                    id: el.id,
                    TurnoverTime: el.turnovertime + "X",
                    Winturn: el.winturn + "X"
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
    navigateAdd() {
        this.router.navigate(['/admin/customers/promotion-add']);
        //this.openUnderconstructionDialog();
    }
    //#endregion

    //#region openUnderconstructionDialog
    openUnderconstructionDialog() {
        this.confirmationDialogService.alert('Alert!!!!', 'The Add Deposit is under development.')
    }
    //#endregion

    //#region promotionDelete
    promotionDelete(id) {
        if (this.final == true) {
            let data = {
                id: id,
            }
            this.adminService.add<any>(customer.promotionDelete, data).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.ngOnInit()
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }
    //#endregion

    //#region navigate Edit
    navigateEdit(promotionData) {
        localStorage.setItem('promotionData', JSON.stringify(promotionData));
        this.router.navigate(['/admin/customers/promotion-edit']);
    }
    //#endregion 

    //#region openRejectConfirmationDialog
    openRejectConfirmationDialog(id) {
        this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to Delete Promotion ?')
            .then((confirmed) => {
                this.final = confirmed
                this.promotionDelete(id)
            });
    }
    //#endregion
}


