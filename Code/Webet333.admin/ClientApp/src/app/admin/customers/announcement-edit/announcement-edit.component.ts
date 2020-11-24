import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { account } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcement-edit',
  templateUrl: './announcement-edit.component.html',
  styleUrls: ['./announcement-edit.component.scss']
})
export class AnnouncementEditComponent implements OnInit {

    Language: any;
    data: any;
    disabled: boolean = false;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getLanguage();
        this.getPromotion();
  }


    getLanguage() {
        this.adminService.get<any>(account.getLanguageList).subscribe(res => {
            this.Language = res.data;
        });
    }

    getPromotion() {
        this.data = JSON.parse(localStorage.getItem('announcementData'));
    }

    updateAnnouncement() {
        let model = {
            id: this.data.id,
            announcement: (document.getElementById("txt_Text") as HTMLInputElement).value,
            languageid:(document.getElementById("ddlLanguage") as HTMLInputElement).value
        }

        this.adminService.add<any>(account.announcementupdate, model).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            this.router.navigate(['admin/customers/announcement-list']);

        }, error => {
            this.disabled = false;
            this.ngOnInit();
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
}
