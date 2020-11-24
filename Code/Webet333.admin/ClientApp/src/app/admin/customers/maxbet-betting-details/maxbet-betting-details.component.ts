import { Component, OnInit, } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer } from '../../../../environments/environment';

@Component({
    selector: 'app-maxbet-betting-details',
    templateUrl: './maxbet-betting-details.component.html',
    styleUrls: ['./maxbet-betting-details.component.scss']
})
export class MaxbetBettingDetailsComponent implements OnInit {

    rows = [];
    columns = [];
    rowsDetails = [];
    columnsDetails = [];
    BettingDetailList: string;
    BettingNumberDetailList: string;
    versionKey: any;
    loadingIndicator: boolean = true;
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService
    ) { }

    ngOnInit() {

    }

    setColumn() {
        this.columns = [
            { prop: 'trans_id' },
            { prop: 'vendor_member_id' },
            { prop: 'operator_id' },
            { prop: 'league_id' },
            { prop: 'match_id' },
            { prop: 'home_id' },
            { prop: 'away_id' },
            { prop: 'match_datetime' },
            { prop: 'sport_type' },
            { prop: 'bet_type' },
            { prop: 'parlay_ref_no' },
            { prop: 'odds' },
            { prop: 'stake' },
            { prop: 'transaction_time' },
            { prop: 'ticket_status' },
            { prop: 'winlost_amount' },
            { prop: 'after_amount' },
            { prop: 'currency' },
            { prop: 'winlost_datetime' },
            { prop: 'odds_type' },
            { prop: 'bet_team' },
            { prop: 'isLucky' },
            { prop: 'home_hdp' },
            { prop: 'away_hdp' },
            { prop: 'hdp' },
            { prop: 'betfrom' },
            { prop: 'islive' },
            { prop: 'home_score' },
            { prop: 'away_score' },
            { prop: 'settlement_time' },
            { prop: 'customInfo1' },
            { prop: 'customInfo2' },
            { prop: 'customInfo3' },
            { prop: 'customInfo4' },
            { prop: 'customInfo5' },
            { prop: 'ba_status' },
            { prop: 'version_key' },
            { prop: 'parlayData' },
        ];
        this.columnsDetails = [
            { prop: 'trans_id' },
            { prop: 'vendor_member_id' },
            { prop: 'operator_id' },
            { prop: 'match_id' },
            { prop: 'transaction_time' },
            { prop: 'odds' },
            { prop: 'stake' },
            { prop: 'ticket_status' },
            { prop: 'betfrom' },
            { prop: 'islive' },
            { prop: 'last_ball_no' },
            { prop: 'bet_team' },
            { prop: 'winlost_datetime' },
            { prop: 'bet_type' },
            { prop: 'currency' },
            { prop: 'odds_type' },
            { prop: 'sport_type' },
            { prop: 'winlost_amount' },
            { prop: 'after_amount' },
            { prop: 'customInfo1' },
            { prop: 'customInfo2' },
            { prop: 'customInfo3' },
            { prop: 'customInfo4' },
            { prop: 'customInfo5' },
            { prop: 'ba_status' },
            { prop: 'version_key' },
        ];
    }


    BettingDetails() {
        this.loadingIndicator = true;
        this.rows = [];
        this.versionKey = (document.getElementById("txt_versionkey") as HTMLInputElement).value === "" ? null : (document.getElementById("txt_versionkey") as HTMLInputElement).value
        let Model = {
            versionKey: this.versionKey
        }

        this.adminService.add<any>(customer.MaxbetBettingDetails, Model).subscribe(res => {
            this.rows = [];
            this.versionKey = res.data.versionKey;
            if (res.data.betDetail.length > 0) {
                this.BettingDetailList = res.data.betDetail;
                this.BettingNumberDetailList = res.data.betNumberDetail;
                this.setColumn();
                res.data.betDetail.forEach(el => {
                    this.rows.push({
                        after_amount: el.after_amount === null || el.after_amount === "" ? "NULL" : el.after_amount,
                        away_hdp: el.away_hdp === null || el.away_hdp === "" ? "NULL" : el.away_hdp,
                        away_id: el.away_id === null || el.away_id === "" ? "NULL" : el.away_id,
                        away_score: el.away_score === null || el.away_score === "" ? "NULL" : el.away_score,
                        ba_status: el.ba_status === null || el.ba_status === "" ? "NULL" : el.ba_status,
                        bet_team: el.bet_team === null || el.bet_team === "" ? "NULL" : el.bet_team,
                        bet_type: el.bet_type === null || el.bet_type === "" ? "NULL" : el.bet_type,
                        betfrom: el.betfrom === null || el.betfrom === "" ? "NULL" : el.betfrom,
                        currency: el.currency === null || el.currency === "" ? "NULL" : el.currency,
                        customInfo1: el.customInfo1 === null || el.customInfo1 === "" ? "NULL" : el.customInfo1,
                        customInfo2: el.customInfo2 === null || el.customInfo2 === "" ? "NULL" : el.customInfo2,
                        customInfo3: el.customInfo3 === null || el.customInfo3 === "" ? "NULL" : el.customInfo3,
                        customInfo4: el.customInfo4 === null || el.customInfo4 === "" ? "NULL" : el.customInfo4,
                        customInfo5: el.customInfo5 === null || el.customInfo5 === "" ? "NULL" : el.customInfo5,
                        hdp: el.hdp === null || el.hdp === "" ? "NULL" : el.hdp,
                        home_hdp: el.home_hdp === null || el.home_hdp === "" ? "NULL" : el.home_hdp,
                        home_id: el.home_id === null || el.home_id === "" ? "NULL" : el.home_id,
                        home_score: el.home_score === null || el.home_score === "" ? "NULL" : el.home_score,
                        isLucky: el.isLucky === null || el.isLucky === "" ? "NULL" : el.isLucky,
                        islive: el.islive === null || el.islive === "" ? "NULL" : el.islive,
                        league_id: el.league_id === null || el.league_id === "" ? "NULL" : el.league_id,
                        match_datetime: el.match_datetime === null || el.match_datetime === "" ? "NULL" : el.match_datetime,
                        match_id: el.match_id === null || el.match_id === "" ? "NULL" : el.match_id,
                        odds: el.odds === null || el.odds === "" ? "NULL" : el.odds,
                        odds_type: el.odds_type === null || el.odds_type === "" ? "NULL" : el.odds_type,
                        operator_id: el.operator_id === null || el.operator_id === "" ? "NULL" : el.operator_id,
                        parlayData: el.parlayData === null || el.parlayData === "" ? "NULL" : el.parlayData,
                        parlay_ref_no: el.parlay_ref_no === null || el.parlay_ref_no === "" ? "NULL" : el.parlay_ref_no,
                        settlement_time: el.settlement_time === null || el.settlement_time === "" ? "NULL" : el.settlement_time,
                        sport_type: el.sport_type === null || el.sport_type === "" ? "NULL" : el.sport_type,
                        stake: el.stake === null || el.stake === "" ? "NULL" : el.stake,
                        ticket_status: el.ticket_status === null || el.ticket_status === "" ? "NULL" : el.ticket_status,
                        trans_id: el.trans_id === null || el.trans_id === "" ? "NULL" : el.trans_id,
                        transaction_time: el.transaction_time === null || el.transaction_time === "" ? "NULL" : el.transaction_time,
                        vendor_member_id: el.vendor_member_id === null || el.vendor_member_id === "" ? "NULL" : el.vendor_member_id,
                        version_key: el.version_key === null || el.version_key === "" ? "NULL" : el.version_key,
                        winlost_amount: el.winlost_amount === null || el.winlost_amount === "" ? "NULL" : el.winlost_amount,
                        winlost_datetime: el.winlost_datetime === null || el.winlost_datetime === "" ? "NULL" : el.winlost_datetime,
                    });
                });
                res.data.betNumberDetail.forEach(el => {
                    this.rowsDetails.push({
                        trans_id: el.trans_id === null || el.trans_id === "" ? "NULL" : el.trans_id,
                        vendor_member_id: el.vendor_member_id === null || el.vendor_member_id === "" ? "NULL" : el.vendor_member_id,
                        operator_id: el.operator_id === null || el.operator_id === "" ? "NULL" : el.operator_id,
                        match_id: el.match_id === null || el.match_id === "" ? "NULL" : el.match_id,
                        transaction_time: el.transaction_time === null || el.transaction_time === "" ? "NULL" : el.transaction_time,
                        odds: el.odds === null || el.odds === "" ? "NULL" : el.odds,
                        stake: el.stake === null || el.stake === "" ? "NULL" : el.stake,
                        ticket_status: el.ticket_status === null || el.ticket_status === "" ? "NULL" : el.ticket_status,
                        betfrom: el.betfrom === null || el.betfrom === "" ? "NULL" : el.betfrom,
                        islive: el.islive === null || el.islive === "" ? "NULL" : el.islive,
                        last_ball_no: el.last_ball_no === null || el.last_ball_no === "" ? "NULL" : el.last_ball_no,
                        bet_team: el.bet_team === null || el.bet_team === "" ? "NULL" : el.bet_team,
                        winlost_datetime: el.winlost_datetime === null || el.winlost_datetime === "" ? "NULL" : el.winlost_datetime,
                        bet_type: el.bet_type === null || el.bet_type === "" ? "NULL" : el.bet_type,
                        currency: el.currency === null || el.currency === "" ? "NULL" : el.currency,
                        odds_type: el.odds_type === null || el.odds_type === "" ? "NULL" : el.odds_type,
                        sport_type: el.sport_type === null || el.sport_type === "" ? "NULL" : el.sport_type,
                        winlost_amount: el.winlost_amount === null || el.winlost_amount === "" ? "NULL" : el.winlost_amount,
                        after_amount: el.after_amount === null || el.after_amount === "" ? "NULL" : el.after_amount,
                        customInfo1: el.customInfo1 === null || el.customInfo1 === "" ? "NULL" : el.customInfo1,
                        customInfo2: el.customInfo2 === null || el.customInfo2 === "" ? "NULL" : el.customInfo2,
                        customInfo3: el.customInfo3 === null || el.customInfo3 === "" ? "NULL" : el.customInfo3,
                        customInfo4: el.customInfo4 === null || el.customInfo4 === "" ? "NULL" : el.customInfo4,
                        customInfo5: el.customInfo5 === null || el.customInfo5 === "" ? "NULL" : el.customInfo5,
                        ba_status: el.ba_status === null || el.ba_status === "" ? "NULL" : el.ba_status,
                        version_key: el.version_key === null || el.version_key === "" ? "NULL" : el.version_key,
                    });
                });
                this.rows = [...this.rows];
                this.rowsDetails = [...this.rowsDetails];
            }
            else {
                this.setColumn();
            }
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    Save() {
        if ((this.BettingDetailList === null || this.BettingDetailList === undefined) && (this.BettingNumberDetailList === null || this.BettingNumberDetailList === undefined)) {
            return this.toasterService.pop('error', 'Error', "No data Available");
        }
        let model = {
            bettingDetailsJsonData: JSON.stringify(this.BettingDetailList),
            bettingNumberDetailsJsonData: JSON.stringify(this.BettingNumberDetailList),
            versionKey: this.versionKey
        }
        this.adminService.add<any>(customer.SaveMaxBetBettingDetails, model).subscribe(res => {
            this.toasterService.pop('success', 'Successfully', res.message);
            this.loadingIndicator = false;
            this.rows = [];
            this.BettingDetailList = null;
            this.BettingNumberDetailList = null;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
            this.rows = [];
        });
    }
}
