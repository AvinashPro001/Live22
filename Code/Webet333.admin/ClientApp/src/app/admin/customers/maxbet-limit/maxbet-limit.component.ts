import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ToasterService } from 'angular2-toaster';
import { customer} from '../../../../environments/environment';
import { async } from '@angular/core/testing';

@Component({
    selector: 'app-maxbet-limit',
    templateUrl: './maxbet-limit.component.html',
    styleUrls: ['./maxbet-limit.component.scss']
})
export class MaxbetLimitComponent implements OnInit {

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
    ) { }

    ngOnInit() {
    }


    async SetLimit() {
        let model = {
            sportmin: ((document.getElementById("sportmin") as HTMLInputElement).value),
            sportmax: ((document.getElementById("sportmax") as HTMLInputElement).value),
            sportmatch: ((document.getElementById("sportmatch") as HTMLInputElement).value),
            othersportmin: ((document.getElementById("othersportmin") as HTMLInputElement).value),
            othersportmax: ((document.getElementById("othersportmax") as HTMLInputElement).value),
            othersportmatch: ((document.getElementById("othersportmatch") as HTMLInputElement).value),
            othersportball: ((document.getElementById("othersportball") as HTMLInputElement).value),
            maxparleymin: ((document.getElementById("maxparleymin") as HTMLInputElement).value),
            maxparleymax: ((document.getElementById("maxparleymax") as HTMLInputElement).value),
            maxparleymatch: ((document.getElementById("maxparleymatch") as HTMLInputElement).value),

            maxbetSportsType1Min: ((document.getElementById("sporttype1min") as HTMLInputElement).value),
            maxbetSportsType1Match: ((document.getElementById("sporttype1match") as HTMLInputElement).value),
            maxbetSportsType1Max: ((document.getElementById("sporttype1max") as HTMLInputElement).value),
        }
        await this.adminService.add<any>(customer.maxbetSetLimit, model).toPromise().then(res => {
            this.toasterService.pop('success', 'Successfully', res.message);
        }).catch(error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    ResetLimit() {
        this.adminService.get<any>(customer.maxbetReset).toPromise().then(res => {
            this.toasterService.pop('success', 'Successfully', res.message);
        }).catch(error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
}
