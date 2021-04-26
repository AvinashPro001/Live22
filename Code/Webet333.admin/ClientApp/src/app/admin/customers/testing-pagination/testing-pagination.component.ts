import { Component, OnInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { forEach } from 'core-js/fn/array';

@Component({
    selector: 'app-testing-pagination',
    templateUrl: './testing-pagination.component.html',
    styleUrls: ['./testing-pagination.component.scss']
})
export class TestingPaginationComponent implements OnInit {
    rows = [];
    totalRecord = 0;
    offset = 0;
    pageZise = 10;

    constructor() {
    }

    ngOnInit() { this.setdata(); }

    setdata() {
        var i;
        for (i = 1; i <= this.pageZise; i++) {
            this.rows.push({
                Name: 'Name_' + i,
                Gender: 'Gender_' + i,
                Company: 'Company_' + i,
            });
        }
        this.rows = [...this.rows];

        this.totalRecord = 100;
    }

    setPage(pageInfo) {
        console.log(pageInfo);

        this.offset = pageInfo.offset;

        this.rows = []

        if (this.offset == 0) {
            for (let j = 1; j <= this.pageZise; j++) {
                this.rows.push({
                    Name: 'Name_' + j,
                    Gender: 'Gender_' + j,
                    Company: 'Company_' + j,
                });
            }
        }
        else {
            for (let j = ((this.offset) * this.pageZise) + 1; j <= ((this.offset) * this.pageZise) + this.pageZise; j++) {
                this.rows.push({
                    Name: 'Name_' + j,
                    Gender: 'Gender_' + j,
                    Company: 'Company_' + j,
                });
            }
        }

        this.rows = [...this.rows];

        this.totalRecord = 100;
    }
}