import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { account, ErrorMessages } from '../../../../environments/environment';

@Component({
    selector: 'app-bank-edit',
    templateUrl: './bank-edit.component.html',
    styleUrls: ['./bank-edit.component.scss']
})
export class BankEditComponent implements OnInit {
    data: any;
    base: any;
    filenames: any = [];
    fileIconNames: any = [];
    urls: any = [];
    IconUrls: any = [];
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router
    ) { }

    async ngOnInit() {
        if (await this.checkUpdatePermission()) this.getBank();
    }

    getBank() {
        let dataCustomer = JSON.parse(localStorage.getItem('data'));
        this.data = dataCustomer as object[];
    }

    //#region updateProfile
    updateBank(data) {
        let dataSelect = {
            id: data.Id,
            accountName: ((document.getElementById("txt_accountname") as HTMLInputElement).value),
            accountNo: ((document.getElementById("txt_accountno") as HTMLInputElement).value),
            bankName: ((document.getElementById("txt_bankname") as HTMLInputElement).value),
        }
        this.adminService.add<any>(account.adminbankedit, dataSelect).subscribe(res => {
            if (this.urls.length > 0 || this.IconUrls.length > 0) {
                this.uploadFile(data.Id);
            }
            else {
                this.toasterService.pop('success', 'Success', res.message);
            }
            this.router.navigate(['admin/customers/bank-list']);
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion

    navigateCancle() {
        this.router.navigate(['admin/customers/bank-list']);
    }

    async fileSelect(event) {
        if (event.target.files.length >= 0) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                let files = event.target.files[i];
                this.base64(files);
                this.filenames.push(event.target.files[i].name);
            }
        }
    }

    async fileSelectIcon(event) {
        if (event.target.files.length >= 0) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                let files = event.target.files[i];
                this.base64Icon(files);
                this.fileIconNames.push(event.target.files[i].name);
            }
        }
    }

    uploadFile(Id) {
        if (this.urls.length > 0)
            var baseImage = this.urls[0].base64images.split(",");
        if (this.IconUrls.length > 0)
            var baseIconImage = this.IconUrls[0].base64images.split(",");
        var dataSelect = {
            file: baseImage == null || baseImage == undefined ? null : baseImage[1],
            fileIcon: baseIconImage == null || baseIconImage == undefined ? null : baseIconImage[1],
            id: Id
        }
        this.adminService.add<any>(account.adminBankImageUpdate, dataSelect).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            this.router.navigate(['admin/customers/bank-list']);
            location.reload();
        }, error => {
            this.ngOnInit();
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    base64(file) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
            this.urls.push({ base64images: e.target.result });
        }
        reader.readAsDataURL(file);
    }

    base64Icon(file) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
            this.IconUrls.push({ base64images: e.target.result });
        }
        reader.readAsDataURL(file);
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[3].Permissions[0].IsChecked === true) {
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

    async checkUpdatePermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[3].Permissions[1].IsChecked === true) {
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
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[1].submenu[3].Permissions[2].IsChecked === true) {
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