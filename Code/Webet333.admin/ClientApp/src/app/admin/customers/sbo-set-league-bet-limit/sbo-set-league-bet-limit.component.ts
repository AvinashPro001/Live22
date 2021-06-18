import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CommonService } from '../../../common/common.service';

@Component({
    selector: 'app-sbo-set-league-bet-limit',
    templateUrl: './sbo-set-league-bet-limit.component.html',
    styleUrls: ['./sbo-set-league-bet-limit.component.scss']
})

export class SboSetLeagueBetLimitComponent implements OnInit {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    datePickerfromdate: string;
    datePickertodate: string;
    groupTypeId: any;
    groupType: any = [
        { id: "SMALL", type: "SMALL" },
        { id: "MEDIUM", type: "MEDIUM" },
        { id: "BIG", type: "BIG" }
    ];
    rows = [];
    columns = [];
    loadingIndicator: boolean = true;
    selectedUserList = [];

    constructor(private commonService: CommonService) { }

    ngOnInit() {
        this.setDatePicker(new Date(), new Date());
    }

    setDatePicker(fromdate = null, todate = null) {
        this.datePickerfromdate = this.commonService.setDatePickerFormate(fromdate);
        this.datePickertodate = this.commonService.setDatePickerFormate(todate);
    }

    getLeagueList() {

    }

    setForChecked() {

    }
    //#region Set Group type on dropdown change

    onGroupTypeSelected(value: string) {
        this.groupTypeId = value;
    }

    //#endregion Set Group type on dropdown change

    //#region Onselect on checkbox

    onSelect({ selected }) {
        // console.log('Select Event', selected, this.selectedUserList);

        this.selectedUserList.splice(0, this.selectedUserList.length);
        this.selectedUserList.push(...selected);
    }

    //#endregion Onselect on checkbox
}