import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()

export class CommonService {
    authToken;
    options: HttpHeaders;

    constructor(
        private http: HttpClient,
        private router: Router,
        private dateAdapter: NgbDateAdapter<string>,
    ) { }

    public add<T>(apiPath, data): Observable<T> {
        return this.http.post<T>(apiPath, data);
    }

    public addWithoutParam<T>(apiPath): Observable<T> {
        return this.http.post<T>(apiPath, '');
    }

    public get<T>(apiPath): Observable<T> {
        return this.http.get<T>(apiPath);
    }

    //#region       Get Dates

    public getTodatDate() {
        var preDate = new Date().getDate();
        var preMonth = new Date().getMonth() + 1;
        var preYear = new Date().getFullYear();

        var fromdate = preYear + '-' + preMonth + '-' + preDate + ' ' + '00:00:00';
        var todate = preYear + '-' + preMonth + '-' + preDate + ' ' + '23:59:59';

        return { fromdate, todate }
    }

    public getYesterDate() {
        var lastday = function (y, m) { return new Date(y, m, 0).getDate(); }

        var preDate = new Date().getDate() - 1;
        var preMonth = new Date().getMonth() + 1;
        var preYear = new Date().getFullYear();

        //#region Testing

        //preDate = 1 - 1;
        //preMonth = 1;
        //preYear = 2021;

        //#endregion Testing

        if (preDate === 0) {
            preMonth = preMonth - 1
            if (preMonth === 0) {
                preYear = preYear - 1;
                preMonth = 12;
                preDate = lastday(preYear, preMonth);
            }
            else {
                preDate = lastday(preYear, preMonth);
            }
        }

        var fromdate = preYear + '-' + preMonth + '-' + preDate + ' ' + '00:00:00';
        var todate = preYear + '-' + preMonth + '-' + preDate + ' ' + '23:59:59';

        return { fromdate, todate }
    }

    public getThisWeekDate() {
        //#region Get start date and end date of week.

        var curr = new Date; // get current date

        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var firstday = new Date(curr.setDate(first));

        var lastdayTemp = curr.getDate() - (curr.getDay() - 1) + 6;
        var lastday = new Date(curr.setDate(lastdayTemp));

        //#endregion Get start date and end date of week.

        var weekStartYear = firstday.getFullYear();
        var weekStartMonth = firstday.getMonth() + 1;
        var weekStartDate = firstday.getDate();
        var fromdate = weekStartYear + '-' + weekStartMonth + '-' + weekStartDate + ' ' + '00:00:00';

        var weekEndYear = lastday.getFullYear();
        var weekEndMonth = lastday.getMonth() + 1;
        var weekEndDate = lastday.getDate();
        var todate = weekEndYear + '-' + weekEndMonth + '-' + weekEndDate + ' ' + '23:59:59';

        return { fromdate, todate }
    }

    public getThisYearDate() {
        var fromdate = new Date().getFullYear() + '-' + 1 + '-' + 1 + ' ' + '00:00:00';
        var todate = new Date().getFullYear() + '-' + 12 + '-' + 31 + ' ' + '23:59:59';

        return { fromdate, todate }
    }

    //#endregion    Get Dates

    //#region set Date

    setDatePickerFormate(fromdate) {
        //let temp = { day: 3, month: 1, year: 2020 };

        var preDate = fromdate.getDate();
        var preMonth = fromdate.getMonth() + 1;
        var preYear = fromdate.getFullYear();

        let temp = { day: preDate, month: preMonth, year: preYear };

        return this.dateAdapter.toModel(temp);
    }

    setDateOtherPicker(fromdate = null, todate = null) {
        //Date formate :: Month / date / yesr, Hours: Minitus AM

        var selectDate, selectMonth, selectYear, selectFromDate, selectToDate, checkExists;

        selectDate = fromdate.getDate();
        selectMonth = fromdate.getMonth() + 1;
        selectYear = fromdate.getFullYear();
        selectFromDate = selectMonth + '/' + selectDate + '/' + selectYear + ', 12:00 AM';

        selectDate = todate.getDate();
        selectMonth = todate.getMonth() + 1;
        selectYear = todate.getFullYear();
        selectToDate = selectMonth + '/' + selectDate + '/' + selectYear + ', 11:59 PM';

        checkExists = document.getElementById("txt_fromdatetime");
        if (checkExists != null) (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = selectFromDate;

        checkExists = document.getElementById("txt_todatetime");
        if (checkExists != null) (document.getElementById("txt_todatetime") as HTMLInputElement).value = selectToDate;

        checkExists = document.getElementById("txt_startdatetime");
        if (checkExists != null) (document.getElementById("txt_startdatetime") as HTMLInputElement).value = selectFromDate;
    }

    //#endregion set Date
}