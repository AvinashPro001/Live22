import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer } from '../../../../environments/environment';
@Component({
    selector: 'app-rebate-setting',
    templateUrl: './rebate-setting.component.html',
    styleUrls: ['./rebate-setting.component.scss']
})
export class RebateSettingComponent implements OnInit {

    hoursValue: any;
    minuteValue: any;
    secondValue: any;

    slotsvalue: any;
    livevalue: any;
    sportsvalue: any;
    Timevalue: any;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService
    ) { }

    Hours: any = [
        { hour: "00" },
        { hour: "01" },
        { hour: "02" },
        { hour: "03" },
        { hour: "04" },
        { hour: "05" },
        { hour: "06" },
        { hour: "07" },
        { hour: "08" },
        { hour: "09" },
        { hour: "10" },
        { hour: "11" },
        { hour: "12" },
        { hour: "13" },
        { hour: "14" },
        { hour: "15" },
        { hour: "16" },
        { hour: "17" },
        { hour: "18" },
        { hour: "19" },
        { hour: "20" },
        { hour: "21" },
        { hour: "22" },
        { hour: "23" }
    ];

    Minutes: any = [
        { minute: "00" }, { minute: "01" }, { minute: "02" }, { minute: "03" }, { minute: "04" }, { minute: "05" },
        { minute: "06" }, { minute: "07" }, { minute: "08" }, { minute: "09" }, { minute: "10" }, { minute: "11" },
        { minute: "12" }, { minute: "13" }, { minute: "14" }, { minute: "15" }, { minute: "16" }, { minute: "17" },
        { minute: "18" }, { minute: "19" }, { minute: "20" }, { minute: "21" }, { minute: "22" }, { minute: "23" },
        { minute: "24" }, { minute: "25" }, { minute: "26" }, { minute: "27" }, { minute: "28" }, { minute: "29" },
        { minute: "30" }, { minute: "31" }, { minute: "32" }, { minute: "33" }, { minute: "34" }, { minute: "35" },
        { minute: "36" }, { minute: "37" }, { minute: "38" }, { minute: "39" }, { minute: "40" }, { minute: "41" },
        { minute: "42" }, { minute: "43" }, { minute: "44" }, { minute: "45" }, { minute: "46" }, { minute: "47" },
        { minute: "48" }, { minute: "49" }, { minute: "50" }, { minute: "51" }, { minute: "52" }, { minute: "53" },
        { minute: "54" }, { minute: "55" }, { minute: "56" }, { minute: "57" }, { minute: "58" }, { minute: "59" },
    ];

    Seconds: any = [
        { second: "00" }, { second: "01" }, { second: "02" }, { second: "03" }, { second: "04" }, { second: "05" },
        { second: "06" }, { second: "07" }, { second: "08" }, { second: "09" }, { second: "10" }, { second: "11" },
        { second: "12" }, { second: "13" }, { second: "14" }, { second: "15" }, { second: "16" }, { second: "17" },
        { second: "18" }, { second: "19" }, { second: "20" }, { second: "21" }, { second: "22" }, { second: "23" },
        { second: "24" }, { second: "25" }, { second: "26" }, { second: "27" }, { second: "28" }, { second: "29" },
        { second: "30" }, { second: "31" }, { second: "32" }, { second: "33" }, { second: "34" }, { second: "35" },
        { second: "36" }, { second: "37" }, { second: "38" }, { second: "39" }, { second: "40" }, { second: "41" },
        { second: "42" }, { second: "43" }, { second: "44" }, { second: "45" }, { second: "46" }, { second: "47" },
        { second: "48" }, { second: "49" }, { second: "50" }, { second: "51" }, { second: "52" }, { second: "53" },
        { second: "54" }, { second: "55" }, { second: "56" }, { second: "57" }, { second: "58" }, { second: "59" },
    ];

    ngOnInit() {
        this.GetSetting();
    }

    HourChange($event) {
        this.hoursValue = $event.target.value;
    }

    MinuteChange($event) {
        this.minuteValue = $event.target.value;
    }

    SecondChange($event) {
        this.secondValue = $event.target.value;
    }

    GetSetting() {
        let slotModel = {
            name: "SlotsRebatePercentage"
        }

        this.adminService.add<any>(customer.GlobalparameterSelect, slotModel).subscribe(res => {
            this.slotsvalue = res.data.value;
        });

        let LiveModel = {
            name: "LiveRebatePercentage"
        }

        this.adminService.add<any>(customer.GlobalparameterSelect, LiveModel).subscribe(res => {
            this.livevalue= res.data.value;
        });

        let sportsModel = {
            name: "SportsRebatePercentage"
        }

        this.adminService.add<any>(customer.GlobalparameterSelect, sportsModel).subscribe(res => {
            this.sportsvalue = res.data.value;
        });

        let rebateTime = {
            name: "RebateTime"
        }

        this.adminService.add<any>(customer.GlobalparameterSelect, rebateTime).subscribe(res => {
            this.Timevalue = res.data.value;
        });
    }

    SaveRebateBetting() {

        if (this.hoursValue == undefined)
            return this.toasterService.pop('error', 'Error', "Please Select Hours");

        if (this.minuteValue == undefined)
            return this.toasterService.pop('error', 'Error', "Please Select minute");

        if (this.secondValue == undefined)
            return this.toasterService.pop('error', 'Error', "Please Select Second");

        let Model = {
            dateTime: this.hoursValue + this.minuteValue + this.secondValue
        }

        try {
            let slotModel={
                name: "SlotsRebatePercentage",
                value: ((document.getElementById("slotspercentage") as HTMLInputElement).value)
            }

            this.adminService.add<any>(customer.GlobalparameterUpdate, slotModel).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
        catch{

        }

        try {
            let liveModel = {
                name: "LiveRebatePercentage",
                value: ((document.getElementById("livepercentage") as HTMLInputElement).value)
            }

            this.adminService.add<any>(customer.GlobalparameterUpdate, liveModel).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
        catch{

        }

        try {

            let sportsModel = {
                name: "SportsRebatePercentage",
                value: ((document.getElementById("sportpercentage") as HTMLInputElement).value)
            }
            this.adminService.add<any>(customer.GlobalparameterUpdate, sportsModel).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
        catch{

        }

        try {
            this.adminService.add<any>(customer.RebateSettingUpdate, Model).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
        catch{

        }

        this.ngOnInit();
    }
}
