import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { debug } from 'console';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-contact-details-list',
    templateUrl: './contact-details-list.component.html',
    styleUrls: ['./contact-details-list.component.scss']
})
export class ContactDetailsListComponent implements OnInit {

    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('status') status: TemplateRef<any>;
    rows = [];
    loadingIndicator: boolean;
    columns = [];
    viewData: any;
    types: any;
    csImage: any;
    editTypes: any;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private modalService: NgbModal,
    ) { }



    ngOnInit() {
        this.setColumn();
        this.LoadType();
        this.LoadTypeDetails();
        
    }

    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'TypeImage' },
            { prop: 'Type' },
            { prop: 'CSName' },
            { prop: 'CSId' },
            { prop: 'CSImage' },
            { prop: 'Created' },
            { prop: 'Action', cellTemplate: this.status, sortable: true, width: 250 }
        ];
    }

    LoadType() {
        this.adminService.getAll<any>(customer.contactTypeSelect).subscribe(res => {
            this.types = res.data;
        });
    }

    LoadTypeDetails() {
        this.loadingIndicator = true;
        
        this.adminService.getAll<any>(customer.contactDetailsSelect).subscribe(res => {
            this.rows = [];
            let i = 0;
            this.viewData = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Type: el.Type,
                    TypeImage: el.TypeImage != null ? '<img width="35px" src="' + el.TypeImage+ '"/>' : "<b class='notAvailable'>Not Available</b>",
                    CSId: el.CSId,
                    CSName: el.CSName,
                    CSImage: el.CSImage != null ? '<img width="50px" src="' + el.CSImage + '"/>' : "<b class='notAvailable'>Not Available</b>",
                    Created: this.ReplaceTime(el.Created)
                });
            })
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    Delete(id) {
        let model = {
            id: id,
            deleted: true
        }
        this.adminService.add<any>(customer.contactDetailsUpdate, model).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            this.ngOnInit();
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    Active(id, event) {
        let model = {
            id: id,
            active: event
        }
        this.adminService.add<any>(customer.contactDetailsUpdate, model).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            this.ngOnInit();
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    EditOpen(data, content) {
        this.editTypes = data;
        (document.getElementById("typeId") as HTMLInputElement).value = data.ContactTypeId;
        this.modalService.open(content, { windowClass: 'dark-modal', });
    }

    ReplaceTime(Date) {
        return Date.replace("T", " ")
    }

    Edit() {
        let model = {
            id: this.editTypes.Id,
            contactTypeId: (document.getElementById("typeId") as HTMLInputElement).value,
            csImage: this.csImage == undefined || this.csImage == null ? null : this.csImage,
            csId: (document.getElementById("csId") as HTMLInputElement).value,
            csName: (document.getElementById("csName") as HTMLInputElement).value,
        }
        this.adminService.add<any>(customer.contactDetailsUpdate, model).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            this.ngOnInit();
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
        this.csImage = null;
    }

    async imageConvert(event) {
        let file = event.target.files[0];
        this.csImage = await this.readUploadedFileAsDataURL(file);
    }

    readUploadedFileAsDataURL(file) {
        const temporaryFileReader = new FileReader();
        return new Promise((resolve, reject) => {
            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };
            temporaryFileReader.onload = () => {
                resolve(temporaryFileReader.result);
            };
            temporaryFileReader.readAsDataURL(file);
        });
    }

}
