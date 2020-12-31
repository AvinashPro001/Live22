import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router  } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer } from '../../../../environments/environment';

@Component({
    selector: 'app-rebate-list',
    templateUrl: './rebate-list.component.html',
    styleUrls: ['./rebate-list.component.scss']
})
export class RebateListComponent implements OnInit {
    rows = [];
    columns = [];
    rowDetails = [];
    columnDetails = [];
    listType: any;
    rebateData: any;
    disable: boolean = false;
    loadingIndicator: boolean;
    @ViewChild('status') status: TemplateRef<any>;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private modalService: NgbModal,
    ) { }

    ngOnInit() {
        this.setColumn();
        this.setGameCategoryList();
        this.setPagedata();
    }

    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'DateFrom' },
            { prop: 'DateTo' },
            { prop: 'GameType' },
            { prop: 'TotalUser' },
            { prop: 'BetAmount' },
            { prop: 'Rolling' },
            { prop: 'CommAmount' },
            { prop: 'CommPrecentage' },
            { prop: 'Created' },
            { prop: 'Actions', cellTemplate: this.status, sortable: false, width: 250 },
        ];
        this.columnDetails = [
            { prop: 'No' },
            { prop: 'GameName' },
            { prop: 'Username' },
            { prop: 'ApiUsername' },
            { prop: 'Turnover' },
            { prop: 'BetAmount' },
            { prop: 'Rolling' },
            { prop: 'CommAmount' },
            { prop: 'WinLose' },
        ];
    }

    setPagedata() {
        this.loadingIndicator = true;
        this.rows = [];
        let model = {}
        this.adminService.add<any>(customer.RebateList, model).subscribe(res => {
            let i = 0;
            this.rebateData = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    DateFrom: this.ReplaceDate(el.DateFrom),
                    DateTo: this.ReplaceDate(el.DateTo),
                    GameType: el.GameType,
                    TotalUser: el.TotalUsers,
                    BetAmount: el.BetAmount,
                    Rolling: el.Rolling,
                    CommPrecentage: el.CommPrecentage,
                    CommAmount: el.CommAmount,
                    Created: this.ReplaceDateTime(el.Created)
                });
                this.rows = [...this.rows]
            });
            this.loadingIndicator = false;
        });
        this.loadingIndicator = false;
    }

    setGameCategoryList() {
        this.adminService.get<any>(customer.GameCategory).subscribe(res => {
            this.listType = res.data;
        })
    }

    ReplaceDate(date) {
        return date.replace("T00:00:00", " ");
    }

    ReplaceDateTime(date) {
        return date.replace("T", " ");
    }

    Filter() {
        this.rows = [];
        this.loadingIndicator = true;
        let model = {
            fromDate: (document.getElementById("txt_fromdatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_fromdatetime") as HTMLInputElement).value,
            toDate: (document.getElementById("txt_todatetime") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_todatetime") as HTMLInputElement).value,
            gamename: (document.getElementById("gameCategory") as HTMLInputElement).value === "" ? null : (document.getElementById("gameCategory") as HTMLInputElement).value,
        }

        if (model.fromDate === null && model.toDate === null && model.gamename === "") {
            this.loadingIndicator = false;
            return this.toasterService.pop('error', 'Error', "Please Select Atleast one filter");
        }

        this.adminService.add<any>(customer.RebateList, model).subscribe(res => {
            let i = 0;
            this.rebateData = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    DateFrom: this.ReplaceDate(el.DateFrom),
                    DateTo: this.ReplaceDate(el.DateTo),
                    GameType: el.GameType,
                    TotalUser: el.TotalUsers,
                    BetAmount: el.BetAmount,
                    Rolling: el.Rolling,
                    CommPrecentage: el.CommPrecentage,
                    CommAmount: el.CommAmount,
                    Created: this.ReplaceDate(el.Created)
                });
                this.loadingIndicator = false;
                this.rows = [...this.rows]
            });
        });
        this.loadingIndicator = false;
    }

    ViewData(id, content) {
        this.rowDetails = [];
        this.loadingIndicator = true;
        let model = {
            id: id
        }
        this.adminService.add<any>(customer.RebateDetailsList, model).subscribe(res => {
            let i = 0;
            res.data.forEach(el => {
                this.rowDetails.push({
                    No: ++i,
                    GameName: el.gameName,
                    Username: el.username,
                    ApiUsername: el.apiUsername,
                    Turnover: el.turnover,
                    BetAmount: el.bet,
                    Rolling: el.rolling,
                    CommAmount: el.commAmount,
                    WinLose: el.winLose
                });
                this.rowDetails = [...this.rowDetails]
            });
        });
        this.loadingIndicator = false;
        this.openWindowCustomClass(content);
    }

    Delete(Id) {
        this.disable = true;
        let model = {
            id: Id
        }
        this.adminService.add<any>(customer.RebateDelete, model).subscribe(res => {
            this.toasterService.pop('success', 'Successfully', res.message);
            this.disable = false;
            this.ngOnInit();
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
            this.disable = false;
        });
    }

    openWindowCustomClass(content) {
        this.modalService.open(content, { windowClass: 'dark-modal', });

    }

    navigateAdd() {
        this.router.navigate(['/admin/customers/rebate-calculate']);
    }
}
