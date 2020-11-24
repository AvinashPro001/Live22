import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer } from '../../../../environments/environment';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from '../../../../app/confirmation-dialog/confirmation-dialog.service';

@Component({
    selector: 'app-admin/announcement/retrive-list',
    templateUrl: './announcement-list.component.html',
    styleUrls: ['./announcement-list.component.scss']
})
export class AnnouncementListComponent implements OnInit {

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
    announcementData: any;
    soritngColumn = "";
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
    ngOnInit() {
        this.setColumn();
        this.setPageData();
    }
    //#endregion

    //#region setCoumn
    setColumn() {
        this.columns = [
            { prop: 'Announcement' },
            { prop: 'Language' },
            { prop: 'Action', cellTemplate: this.status, sortable: false }
        ];
    }
    //#endregion

    //#region setPageData
    setPageData() {
        this.adminService.getAll<any>(customer.announcementList).subscribe(res => {
            this.rows = [];
            this.announcementData = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    Announcement: el.announcement,
                    Language: el.LanguageName,
                    id: el.id,
                });
            })
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion

    //#region navigateAdd
    navigateAdd() {
        this.router.navigate(['/admin/customers/announcement-add']);
        //this.openUnderconstructionDialog();
    }
    //#endregion


    //#region rejectRequest
    rejectRequest(id) {
        if (this.final == true) {
            let data = {
                id: id,
                approved: "rejected"
            }
            this.adminService.add<any>(customer.announcementDelete, data).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.ngOnInit();
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }
    //#endregion


    //#region openRejectConfirmationDialog
    openRejectConfirmationDialog(id) {
        this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to Delete Announcement ?')
            .then((confirmed) => {
                this.final = confirmed
                this.rejectRequest(id)
            });
    }
    //#endregion

    edit(data) {
        localStorage.setItem('announcementData', JSON.stringify(data));
        this.router.navigate(['/admin/customers/announcement-edit']);
    }

    //#region openUnderconstructionDialog
    openUnderconstructionDialog() {
        this.confirmationDialogService.alert('Alert!!!!', 'The Add Deposit is under development.')
    }
    //#endregion
}


