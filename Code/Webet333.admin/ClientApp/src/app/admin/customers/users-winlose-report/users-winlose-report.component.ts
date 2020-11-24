import { Component, OnInit } from '@angular/core';
import { ToasterService} from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer } from '../../../../environments/environment';
@Component({
  selector: 'app-users-winlose-report',
  templateUrl: './users-winlose-report.component.html',
  styleUrls: ['./users-winlose-report.component.scss']
})
export class UsersWinloseReportComponent implements OnInit {

    rows = [];
    loadingIndicator: boolean;
    columns = [];

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
    ) { }

    ngOnInit() {
        this.setColumn();
        this.setPageData();
  }


    setColumn() {
        this.columns = [
            { prop: 'No' },
            { prop: 'DateTime'},
            { prop: 'Username' },
            { prop: 'PromotionName' },
            { prop: 'Deposit' },
            { prop: 'Withdraw' },
            { prop: 'Winlose' },
        ];
    }

    setPageData() {
        this.rows = [];
        this.loadingIndicator = true;
        let data = {
        }
        this.adminService.add<any>(customer.customerWinloseReport, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Username: el.UserName,
                    PromotionName: el.PromotionTitle == null ? "Not Available" : el.PromotionTitle,
                    Deposit: el.TotalDeposit,
                    Withdraw: el.TotalWithdraw,
                    Winlose: el.WinLose,
                    DateTime: this.ReplaceTime(el.Created)
                });
            })
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    ReplaceTime(Date) {
        return Date.replace("T", " ")
    }
}
