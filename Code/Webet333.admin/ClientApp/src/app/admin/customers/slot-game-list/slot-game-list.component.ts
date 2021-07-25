import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
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

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private confirmationDialogService: ConfirmationDialogService,
        private commonService: CommonService) { }


    ngOnInit() {
        this.LoadGameList();
    }


    LoadGameList() {
        let data = {
            
        }
        this.adminService.add<any>(customer.slotsGameList, data).subscribe(async res => {
            debugger
        });
    }
}
