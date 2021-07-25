import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterService } from 'angular2-toaster';
import { debug } from 'console';
import { ConfirmationDialogService } from '../../../../app/confirmation-dialog/confirmation-dialog.service';
import { account, customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';


@Component({
    selector: 'app-slot-game-list',
    templateUrl: './slot-game-list.component.html',
    styleUrls: ['./slot-game-list.component.scss']
})
export class SlotGameListComponent implements OnInit {

    @ViewChild('status') status: TemplateRef<any>;
    @ViewChild('IsHot') IsHot: TemplateRef<any>;
    @ViewChild('IsNew') IsNew: TemplateRef<any>;
    @ViewChild('IsSlot') IsSlot: TemplateRef<any>;
    @ViewChild('IsArcade') IsArcade: TemplateRef<any>;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private confirmationDialogService: ConfirmationDialogService,
        private commonService: CommonService) { }

    pageNumber = 0;
    offset = 0;
    pageSize = 7;
    columns: any;
    totalRowCount = 0;
    rows: any;
    loadingIndicator = false;
    PlaytechImagePath = "../../../../assets/img/playtech.png";
    PragmaticImagePath = "../../../../assets/img/pragmatic.png";
    SlotGameData: any;
    viewData:any;

    ngOnInit() {
        this.LoadGameList();
        this.coloumSet();
    }

    coloumSet() {
        this.columns = [
            { prop: 'No', sortable: false},
            { prop: 'Wallet', sortable: false},
            { prop: 'GameName', sortable: false },
            { prop: 'GameCode', sortable: false },
            { prop: 'IsArcade', cellTemplate: this.IsArcade, sortable: false},
            { prop: 'IsHot', cellTemplate: this.IsHot, sortable: false},
            { prop: 'IsNew', cellTemplate: this.IsNew, sortable: false},
            { prop: 'IsSlot', cellTemplate: this.IsSlot, sortable: false},
            { prop: 'Created', sortable: false},
            { prop: 'Action', cellTemplate: this.status, sortable: false, width: 250 }

        ];
    }

    LoadGameList() {
        let data = {
            pageNo: this.pageNumber,
            pageSize: this.pageSize
        }
        this.adminService.add<any>(customer.slotsGameList, data).subscribe(async res => {

            this.rows = [];
            let i = ((this.pageNumber + 1) * this.pageSize) - this.pageSize;
            this.offset = res.data.offset;
            this.totalRowCount = res.data.total;
            this.SlotGameData = res.data.result;
            res.data.result.forEach(el => {

                var path = "";
                if (el.WalletName == "Playtech Slot")
                    path = this.PlaytechImagePath

                if (el.WalletName == "Pragmatic Play")
                    path = this.PragmaticImagePath



                this.rows.push({
                    No: ++i,
                    Wallet: '<img class="game-wallet-image" src="' + path + '" />',
                    GameName: el.GameName,
                    GameCode: el.GameCode,
                    IsArcade: el.IsArcade,
                    IsHot: el.IsHot,
                    IsNew: el.IsNew,
                    IsSlot: el.IsSlot,
                    Created: this.replaceDateTime(el.Created)
                });
            });
            this.rows = [...this.rows];
            this.loadingIndicator = false;



        });
    }

    replaceDateTime(date) { return date.replace("T", " "); }

    setPage(pageInfo) {
        this.pageNumber = pageInfo.offset;
        this.LoadGameList();
    }

    SetIsSlot(id, event) {
        let data = {
            id: id,
            isSlot: event
        }
        this.adminService.add<any>(customer.slotsGameUpdate, data).subscribe(async res => {
            this.toasterService.pop('success', 'Success', res.message);
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    SetIsArcade(id, event) {
        let data = {
            id: id,
            isArcade: event
        }
        this.adminService.add<any>(customer.slotsGameUpdate, data).subscribe(async res => {
            this.toasterService.pop('success', 'Success', res.message);
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    CallUpdateAPI(data) {
        this.adminService.add<any>(customer.slotsGameUpdate, data).subscribe(async res => {
            this.toasterService.pop('success', 'Success', res.message);
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    SetIsHot(id,event) {
        let data = {
            id: id,
            isHot: event
        }
        this.CallUpdateAPI(data);
    }

    SetIsNew(id,event) {
        let data = {
            id: id,
            isNew: event
        }
        this.CallUpdateAPI(data);
    }

    SetActive(id, event) {
        let data = {
            id: id,
            active: event
        }
        this.CallUpdateAPI(data);
    }

    SetDelete(id, event) {
        let data = {
            id: id,
            active: true
        }
        this.CallUpdateAPI(data);
    }

    show(row, content) {
        this.viewData = row;
        this.openWindowCustomClass(content);
    }

    openWindowCustomClass(content) {
        this.modalService.open(content, { windowClass: 'dark-modal', });
    }

    RefreshPragmaticGame() {
        debugger
    }
}
