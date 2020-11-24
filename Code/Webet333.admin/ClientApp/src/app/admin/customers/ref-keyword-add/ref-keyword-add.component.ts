import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import { customer, account } from '../../../../environments/environment';

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
        private router: Router,
    ) { }

    ngOnInit() {
        this.setColumn();
        this.setPageData();
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

    addKeyword() {
        let RefModel = {
            keyword: ((document.getElementById("txt_keyword") as HTMLInputElement).value),
        }
        this.adminService.add<any>(customer.refKeywordAdd, RefModel).toPromise().then(res => {
            this.toasterService.pop('success', 'Successfully', res.message);
            this.ngOnInit()
        }).catch(error => {            this.toasterService.pop('error', 'Error', error.error.message);            this.ngOnInit()        });    }


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

    Delete(Id) {
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


    ReplaceTime(Date) {
        return Date.replace("T", " ")
    }
}
