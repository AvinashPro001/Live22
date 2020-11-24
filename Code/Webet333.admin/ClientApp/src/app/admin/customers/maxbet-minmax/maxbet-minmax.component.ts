import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';

@Component({
    selector: 'app-maxbet-minmax',
    templateUrl: './maxbet-minmax.component.html',
    styleUrls: ['./maxbet-minmax.component.scss']
})
export class MaxbetMinmaxComponent implements OnInit {

    minimum: any;
    maximum: any;
    newVal: any;
    customerData: any;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
    ) { }

    ngOnInit() {
        this.Getlimit();
        this.customerUser();
    }

    Getlimit() {
        this.adminService.get<any>(customer.maxbetMinMaxGet).toPromise().then(res => {
            this.minimum = res.data.maxBetMinimum;
            this.maximum = res.data.maxBetMaximum;
        }).catch(error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    async SetLimit() {
        var minVal = ((document.getElementById("txt_min") as HTMLInputElement).value);
        var maxVal = ((document.getElementById("txt_max") as HTMLInputElement).value)

        if (minVal === "" || maxVal === "")
            return this.toasterService.pop('error', 'Error', "Please Provide both value Minimum and Maximum !!!");

        if (+minVal <= 0 || +maxVal <= 0)
            return this.toasterService.pop('error', 'Error', "Please Insert Positive Number !!!");

        if (+minVal === +maxVal)
            return this.toasterService.pop('error', 'Error', "Please Provide different Numbers !!!");

        let model = {
            minValue: minVal,
            maxValue: maxVal
        }

        await this.adminService.add<any>(customer.maxbetMinMaxSet, model).toPromise().then(res => {
            this.toasterService.pop('success', 'Successfully', res.message);
            this.ngOnInit();
        }).catch(error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });


    }

    onChange(event) {
        this.newVal = event.value.id;
    }

    //#region customerUser
    customerUser() {
        var model = {};
        this.adminService.add<any>(customer.customerList, model).subscribe(res => {
            this.customerData = res.data;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion

    config = {
        displayKey: "username", //if objects array passed which key to be displayed defaults to description
        search: true, //true/false for the search functionlity defaults to false,
        height: '250px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        placeholder: 'Select Username.', // text to be displayed when no item is selected defaults to Select,
        customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
        limitTo: Option.length,// a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
        moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
        searchPlaceholder: 'Search', // label thats displayed in search input,
        searchOnKey: 'username' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

    async updateUserLimit() {
        var minVal = ((document.getElementById("txt_user_min") as HTMLInputElement).value);
        var maxVal = ((document.getElementById("txt_user_max") as HTMLInputElement).value)

        if (minVal === "" || maxVal === "")
            return this.toasterService.pop('error', 'Error', "Please Provide both value Minimum and Maximum !!!");

        if (+minVal <= 0 || +maxVal <= 0)
            return this.toasterService.pop('error', 'Error', "Please Insert Positive Number !!!");

        if (+minVal === +maxVal)
            return this.toasterService.pop('error', 'Error', "Please Provide different Numbers !!!");

        let model = {
            userId: this.newVal,
            minValue: minVal,
            maxValue: maxVal
        }
        debugger
        await this.adminService.add<any>(customer.maxbetUserMinMax, model).toPromise().then(res => {
            if (res.data.error_code==0)
                this.toasterService.pop('success', 'Successfully', res.message);
            else
                this.toasterService.pop('error', 'Error', res.data.message);
        }).catch(error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
}
