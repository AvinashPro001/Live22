import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { debug } from 'console';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';
import { CommonService } from '../../../common/common.service';

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
    showText: boolean;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private modalService: NgbModal,
        private commonService: CommonService
    ) { }



    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.commonService.CheckUserToken();    //  Check User token is not expire.

            this.setColumn();
            this.LoadType();
            this.LoadTypeDetails();
        }
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
                    TypeImage: el.TypeImage != null ? '<img width="35px" src="' + el.TypeImage + '"/>' : "<b class='notAvailable'>Not Available</b>",
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

    async Delete(id) {
        if (await this.checkUpdatePermission()) {
            this.commonService.CheckUserToken();    //  Check User token is not expire.

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
    }

    async Active(id, event) {
        if (await this.checkUpdatePermission()) {
            this.commonService.CheckUserToken();    //  Check User token is not expire.

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

    }

    async EditOpen(data, content) {
        if (await this.checkUpdatePermission()) {
            this.commonService.CheckUserToken(); //  Check User token is not expire.

            this.editTypes = data;
            this.showText = data.Text == null ? false : true;
            this.modalService.open(content, { windowClass: 'dark-modal', });
        }
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
            Text: null,
            classCheck: (document.getElementById("ClassChecked") as HTMLInputElement).checked,
            isOpenInNewPage: (document.getElementById("IsOpenInNewPage") as HTMLInputElement).checked,
        }

        try {
            model.Text = (document.getElementById("text") as HTMLInputElement).value
        }
        catch (e) { }


        if (model.contactTypeId == "") {
            this.toasterService.pop('error', 'Error', 'Please Select Type  !!!');
            return;
        }

        if (model.csName == "") {
            this.toasterService.pop('error', 'Error', 'Please Insert CS Name !!!');
            return;
        }

        if (model.csId == "") {
            this.toasterService.pop('error', 'Error', 'Please Insert CS Id !!!');
            return;
        }

        this.adminService.add<any>(customer.contactDetailsUpdate, model).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            this.modalService.dismissAll();
            this.csImage = null;
            this.ngOnInit();
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });

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

    async RedirectContactAddPage() {
        if (await this.checkAddPermission()) {
            this.commonService.CheckUserToken();    //  Check User token is not expire.

            this.router.navigate(['/admin/customers/contact-details-add']);
        }
    }

    //#region Check Permission

    async checkViewPermission() {
        const usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[13].Permissions[0].IsChecked === true) {
                return true;
            }
            else {
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
        const usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[13].Permissions[1].IsChecked === true) {
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
        const usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[13].Permissions[2].IsChecked === true) {
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
