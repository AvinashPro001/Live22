import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { account, ErrorMessages } from '../../../../environments/environment';

@Component({
    selector: 'app-bank-add',
    templateUrl: './bank-add.component.html',
    styleUrls: ['./bank-add.component.scss']
})
export class BankAddComponent implements OnInit {

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
        await this.checkAddPermission();
    }


    navigateCancle() {
        this.router.navigate(['admin/customers/bank-list']);
    }

    AddBank(data) {
        let dataSelect = {
            accountName: ((document.getElementById("txt_accountname") as HTMLInputElement).value),
            accountNo: ((document.getElementById("txt_accountno") as HTMLInputElement).value),
            bankName: ((document.getElementById("txt_bankname") as HTMLInputElement).value),
            bankCode: ((document.getElementById("txt_bankcode") as HTMLInputElement).value),
        }
        this.adminService.add<any>(account.adminbankadd, dataSelect).subscribe(res => {
            if (this.urls.length > 0 || this.IconUrls.length > 0) {
                this.uploadFile(res.data[0].Id);
            }
            else {
                this.toasterService.pop('success', 'Success', res.message);
            }
            this.router.navigate(['admin/customers/bank-list']);
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
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
        var baseImage = this.urls[0].base64images.split(",");
        var baseIconImage = this.IconUrls[0].base64images.split(",");

        var dataSelect = {
            file: baseImage[1],
            fileIcon: baseIconImage[1],
            id: Id
        }
        this.adminService.add<any>(account.adminBankImageadd, dataSelect).subscribe(res => {
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
