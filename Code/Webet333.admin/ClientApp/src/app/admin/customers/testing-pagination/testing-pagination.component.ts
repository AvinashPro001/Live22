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

    constructor() {
    }

    ngOnInit() {
        //this.setPage({ offset: 0 });
        this.setdata();
    }

    setdata() {
        var i;
        for (i = 0; i < 100; i++) {
            this.rows.push({
                Name: ++i,
                Gender: 'name'+i,
                Company: 'male',
            });
        }
        this.rows = [...this.rows];
    }

    setPage(pageInfo) {
        console.log(pageInfo);
    }
}
