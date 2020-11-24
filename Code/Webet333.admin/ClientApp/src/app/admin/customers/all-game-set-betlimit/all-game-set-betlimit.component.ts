import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';

@Component({
    selector: 'app-all-game-set-betlimit',
    templateUrl: './all-game-set-betlimit.component.html',
    styleUrls: ['./all-game-set-betlimit.component.scss']
})
export class AllGameSetBetlimitComponent implements OnInit {

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
    ) { }

    agLimit: any;
    sexyLimit: any;
    dgLimit: any;

    ngOnInit() {
       this.getBetLimit();
    }

    async AgSetLimit() {
        var betlimitVal = ((document.getElementById("txt_ag") as HTMLInputElement).value);

        let model = {
            bettingLimit: betlimitVal
        }

        await this.adminService.add<any>(customer.agBetLimit, model).toPromise().then(res => {
            this.toasterService.pop('success', 'Successfully', res.message);
            this.ngOnInit();
            
        }).catch(error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    async DgSetLimit() {
        var betlimitVal = ((document.getElementById("txt_dgbetLimit") as HTMLInputElement).value);

        let model = {
            bettingLimit: betlimitVal
        }

        await this.adminService.add<any>(customer.dgBetLimit, model).toPromise().then(res => {
            this.toasterService.pop('success', 'Successfully', res.message);
            this.ngOnInit();
            this.adminService.get<any>(customer.SetDGBetLimit).toPromise().then(res => {
            });
        }).catch(error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    async SexySetLimit() {
        var betlimitVal = ((document.getElementById("txt_sexyBetlimit") as HTMLInputElement).value);

        let model = {
            delete:false,
            betLimit: betlimitVal
        }

        await this.adminService.add<any>(customer.sexyBetLimit, model).toPromise().then(res => {
            this.toasterService.pop('success', 'Successfully', res.message);
            this.ngOnInit();
            this.adminService.get<any>(customer.SetSexyBetLimit).toPromise().then(res => {
            });
        }).catch(error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    async SexyDeleteLimit() {
        var betlimitVal = ((document.getElementById("txt_sexyBetlimit") as HTMLInputElement).value);

        let model = {
            delete: true,
            betLimit: betlimitVal
        }

        await this.adminService.add<any>(customer.sexyBetLimit, model).toPromise().then(res => {
            this.toasterService.pop('success', 'Successfully', res.message);
            this.ngOnInit();
            this.adminService.get<any>(customer.SetSexyBetLimit).toPromise().then(res => {
            });
        }).catch(error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    async getBetLimit() {
        this.adminService.get<any>(customer.getBetLimit).toPromise().then(res => {
            this.agLimit = res.data.aGbettingLimits;
            this.dgLimit = res.data.dGbettingLimits;
            this.sexyLimit = res.data.sexybettingLimits.Sexybcrt.Live.LimitId;
        }).catch(error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
}
