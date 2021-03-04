import { Component, OnInit } from '@angular/core';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { debug } from 'console';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';
import { CommonService } from '../../../common/common.service';

@Component({
    selector: 'app-contact-details-add',
    templateUrl: './contact-details-add.component.html',
    styleUrls: ['./contact-details-add.component.scss']
})
export class ContactDetailsAddComponent implements OnInit {

    types: any;
    showImage: boolean = false;
    csImage: any;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService
    ) { }

    async ngOnInit() {
        if (await this.checkAddPermission()) {
            this.commonService.CheckUserToken();    //  Check User token is not expire.

            this.LoadType();
        }
    }


    LoadType() {
        this.adminService.getAll<any>(customer.contactTypeSelect).subscribe(res => {
            this.types = res.data;
        });
    }

    AddContact() {
        let model = {
            contactTypeId: (document.getElementById("typeId") as HTMLInputElement).value,
            csImage: this.csImage == undefined || this.csImage == null ? null : this.csImage,
            csId: (document.getElementById("csId") as HTMLInputElement).value,
            csName: (document.getElementById("csName") as HTMLInputElement).value,
            Text: null,
            classCheck: (document.getElementById("Cssclass") as HTMLInputElement).checked,
            isOpenInNewPage: (document.getElementById("isOpenNewPage") as HTMLInputElement).checked,
        }

        try {
            model.Text = (document.getElementById("Text") as HTMLInputElement).value
        }
        catch (e) { }



        if (model.contactTypeId=="") {
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

        this.adminService.add<any>(customer.contactDetailsAdd, model).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            this.router.navigate(['/admin/customers/contact-details-list']);
            this.csImage = null;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });

    }

    async imageConvert(event) {
        let file = event.target.files[0];
        this.csImage = await this.readUploadedFileAsDataURL(file);
    }

    async readUploadedFileAsDataURL(file) {
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

    onChange() {
        var id = (document.getElementById("typeId") as HTMLInputElement).value
        var selectRow = this.types.filter(x => x.Id == id)
        if (selectRow[0].Type == "Whatsapp") {
            this.showImage = true;
        }
        else {
            this.showImage = false;
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
