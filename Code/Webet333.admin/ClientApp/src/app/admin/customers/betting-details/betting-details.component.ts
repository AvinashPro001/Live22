import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-betting-details',
    templateUrl: './betting-details.component.html',
    styleUrls: ['./betting-details.component.scss']
})

export class BettingDetailsComponent implements OnInit {
    rows = [];
    columns = [];
    selectedList = "";
    gmtlist = "";
    FetchIdList: any = [];
    fromDate: any;
    toDate: any;
    startdate: any;
    disable: boolean = false;
    gmtDisable: boolean = true;
    loadingIndicator: boolean = true;
    TableData: string;
    @ViewChild('status') status: TemplateRef<any>;
    listType: any = [
        { gameName: this.commonService.GameName.M8 },
        { gameName: this.commonService.GameName.AG },
        { gameName: this.commonService.GameName.Playtech },
        { gameName: this.commonService.GameName.Joker },
        { gameName: this.commonService.GameName.Mega888 },
        { gameName: this.commonService.GameName._918Kiss },
        { gameName: this.commonService.GameName.DG },
        { gameName: this.commonService.GameName.SexyBaccarat },
        { gameName: this.commonService.GameName.SA },
        { gameName: this.commonService.GameName.Pussy888 },
        { gameName: this.commonService.GameName.AllBet },
        { gameName: this.commonService.GameName.WM },
        { gameName: this.commonService.GameName.PragmaticPlay },
        { gameName: this.commonService.GameName.YeeBet },
        { gameName: this.commonService.GameName.SBO },
        { gameName: this.commonService.GameName.GamePlay },
        { gameName: this.commonService.GameName.CQ9 }
    ];

    gmtList: any = [
        { gmt: "+01:00" },
        { gmt: "+02:00" },
        { gmt: "+03:00" },
        { gmt: "+03:30" },
        { gmt: "+04:00" },
        { gmt: "+05:00" },
        { gmt: "+05:30" },
        { gmt: "+06:00" },
        { gmt: "+07:00" },
        { gmt: "+08:00" },
        { gmt: "+09:00" },
        { gmt: "+09:30" },
        { gmt: "+10:00" },
        { gmt: "+11:00" },
        { gmt: "+12:00" },
        { gmt: "-11:00" },
        { gmt: "-10:00" },
        { gmt: "-09:00" },
        { gmt: "-08:00" },
        { gmt: "-07:00" },
        { gmt: "-06:00" },
        { gmt: "-05:00" },
        { gmt: "-04:00" },
        { gmt: "-03:30" },
        { gmt: "-03:00" },
        { gmt: "-02:00" },
        { gmt: "-01:00" },
    ];

    constructor(
        private datePipe: DatePipe,
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) this.setColumn(this.selectedList);
    }

    //#region setCoumn

    setColumn(selectedList) {
        if (selectedList == this.commonService.GameName.M8) {
            this.columns = [
                { prop: 'Action', cellTemplate: this.status, width: 60 },
                { prop: 'FetchId' },
                { prop: 'LastModifiedDate' },
                { prop: 'UserID' },
                { prop: 'UserName' },
                { prop: 'WinLoseAmount' },
                { prop: 'WinAmount' },
                { prop: 'ComAmount' },
                { prop: 'SubCommission' },
                { prop: 'BetIP' },
                { prop: 'ModuleId' },
                { prop: 'HomeId' },
                { prop: 'AwayId' },
                { prop: 'DangerStatus' },
                { prop: 'Game' },
                { prop: 'Odds' },
                { prop: 'Side' },
                { prop: 'Info' },
                { prop: 'Half' },
                { prop: 'TransDate' },
                { prop: 'WorkingDate' },
                { prop: 'MatchDate' },
                { prop: 'RunScore' },
                { prop: 'Score' },
                { prop: 'HalfScore' },
                { prop: 'FLGRes' },
                { prop: 'Status' },
                { prop: 'SportTypeId' },
                { prop: 'OddsType' },
                { prop: 'TodayDate' },
                { prop: 'CurrencyCode' },
                { prop: 'LeagueName' },
                { prop: 'HomeName' },
                { prop: 'AwayName' },
            ];
        }
        else if (selectedList == this.commonService.GameName.Playtech) {
            this.columns = [
                { prop: 'PlayerName' },
                { prop: 'WindowCode' },
                { prop: 'GameId' },
                { prop: 'GameCode' },
                { prop: 'GameType' },
                { prop: 'GameName' },
                { prop: 'SessionId' },
                { prop: 'CurrencyCode' },
                { prop: 'Bet' },
                { prop: 'Win' },
                { prop: 'ProgressiveBet' },
                { prop: 'ProgressiveWin' },
                { prop: 'Balance' },
                { prop: 'CurrentBet' },
                { prop: 'GameDate' },
                { prop: 'LiveNetwork' },
            ];
        }
        else if (selectedList == this.commonService.GameName.AG) {
            this.columns = [
                { prop: 'user_id' },
                { prop: 'operator_id' },
                { prop: 'transaction_time' },
                { prop: 'trans_id' },
                { prop: 'winlost_amount' },
                { prop: 'game_code' },
                { prop: 'game_type' },
                { prop: 'stake' },
                { prop: 'valid_stake' },
                { prop: 'play_type' },
                { prop: 'platform_type' },
                { prop: 'currency' },
                { prop: 'table_code' },
                { prop: 'ip' },
                { prop: 'recaculate_time' },
                { prop: 'remark' },
                { prop: 'status' },
                { prop: 'jackpotcomm' },
                { prop: 'jackpotwin' },
                { prop: 'round' },
                { prop: 'shoeCode' },
                { prop: 'bankerPoint' },
                { prop: 'playerPoint' },
                { prop: 'cardNum' },
                { prop: 'pair' },
                { prop: 'dragonPoint' },
                { prop: 'tigerPoint' },
                { prop: 'cardList' },
                { prop: 'vid' },
            ];
        }
        else if (selectedList == this.commonService.GameName.Joker) {
            this.columns = [
                { prop: 'Username', width: 60 },
                { prop: 'OCode' },
                { prop: 'Amount' },
                { prop: 'Result' },
            ];
        }
        else if (selectedList == this.commonService.GameName.Mega888) {
            this.columns = [
                { prop: 'Name' },
                { prop: 'LoginId' },
                { prop: 'UserId' },
                { prop: 'Bet' },
                { prop: 'Win' },
                { prop: 'Yield' },
                { prop: 'Idx' },
                { prop: 'Sn' },
                { prop: 'Tel' },
                { prop: 'StatisticDate' },
                { prop: 'Memo' },
            ];
        }
        else if (selectedList == this.commonService.GameName._918Kiss) {
            this.columns = [
                { prop: 'Account' },
                { prop: 'Agentwin' },
                { prop: 'Idx' },
                { prop: 'Jtime' },
                { prop: 'Win' },
                { prop: 'Press' },
                { prop: 'Pump' },
                { prop: 'SelfWin' },
                { prop: 'Type' },
                { prop: 'Yield' },
                { prop: 'Memo' },
                { prop: 'MyDate' },
                { prop: 'Name' },
                { prop: 'Tel' },
            ];
        }
        else if (selectedList == this.commonService.GameName.DG) {
            this.columns = [
                { prop: "id" },
                { prop: "tableId" },
                { prop: "shoeId" },
                { prop: "playId" },
                { prop: "lobbyId" },
                { prop: "gameType" },
                { prop: "gameId" },
                { prop: "memberId" },
                { prop: "parentId" },
                { prop: "betTime" },
                { prop: "calTime" },
                { prop: "winOrLoss" },
                { prop: "balanceBefore" },
                { prop: "betPoints" },
                { prop: "betPointsz" },
                { prop: "availableBet" },
                { prop: "userName" },
                { prop: "result", width: 500 },
                { prop: "betDetail", width: 400 },
                { prop: "ip" },
                { prop: "ext" },
                { prop: "isRevocation" },
                { prop: "currencyId" },
                { prop: "deviceType" },
                { prop: "roadid" },
                { prop: "pluginid" }
            ];
        }
        else if (selectedList == this.commonService.GameName.SexyBaccarat) {
            this.columns = [
                { prop: "ID" },
                { prop: "gameType" },
                { prop: "winAmount" },
                { prop: "txTime" },
                { prop: "gameInfo" },
                { prop: "realWinAmount" },
                { prop: "updateTime" },
                { prop: "realBetAmount" },
                { prop: "userId" },
                { prop: "betType" },
                { prop: "platform" },
                { prop: "txStatus" },
                { prop: "betAmount" },
                { prop: "platformTxId" },
                { prop: "gameCode" },
                { prop: "currency" },
                { prop: "jackpotWinAmount" },
                { prop: "jackpotBetAmount" },
                { prop: "turnover" },
                { prop: "roundId" },
            ];
        }
        else if (selectedList == this.commonService.GameName.SA) {
            this.columns = [
                { prop: "BetID" },
                { prop: "Balance" },
                { prop: "BetSource" },
                { prop: "BetAmount" },
                { prop: "BetTime" },
                { prop: "BetType" },
                { prop: "Username" },
                { prop: "PayoutTime" },
                { prop: "ResultAmount" },
                { prop: "Rolling" },
                { prop: "Round" },
                { prop: "HostID" },
                { prop: "GameType" },
                { prop: "GameID" },
                { prop: "State" },
                { prop: "TransactionID" },
                { prop: "Set" },
                { prop: "Detail" },
            ];
        }
        else if (selectedList == this.commonService.GameName.Pussy888) {
            this.columns = [
                { prop: "Account" },
                { prop: "Agentwin" },
                { prop: "Idx" },
                { prop: "Jtime" },
                { prop: "Memo" },
                { prop: "Mydate" },
                { prop: "Name" },
                { prop: "Press" },
                { prop: "Pump" },
                { prop: "Selfwin" },
                { prop: "Tel" },
                { prop: "Type" },
                { prop: "Win" },
                { prop: "Yield" },
            ];
        }
        else if (selectedList == this.commonService.GameName.AllBet) {
            this.columns = [
                { prop: "AppType" },
                { prop: "BetAmount" },
                { prop: "BetNum" },
                { prop: "BetTime" },
                { prop: "BetType" },
                { prop: "Client" },
                { prop: "Commission" },
                { prop: "Currency" },
                { prop: "ExchangeRate" },
                { prop: "GameResult" },
                { prop: "GameRoundEndTime" },
                { prop: "GameRoundId" },
                { prop: "GameRoundStartTime" },
                { prop: "GameType" },
                { prop: "State" },
                { prop: "TableName" },
                { prop: "ValidAmount" },
                { prop: "WinOrLoss" },
            ];
        }
        else if (selectedList == this.commonService.GameName.WM) {
            this.columns = [
                { prop: "Gid" },
                { prop: "User" },
                { prop: "Gname" },
                { prop: "BeforeCash" },
                { prop: "Bet" },
                { prop: "BetCode" },
                { prop: "BetId" },
                { prop: "BetResult" },
                { prop: "BetTime" },
                { prop: "Commission" },
                { prop: "Event" },
                { prop: "EventChild" },
                { prop: "GameResult" },
                { prop: "Ip" },
                { prop: "Reset" },
                { prop: "Result" },
                { prop: "Round" },
                { prop: "Settime" },
                { prop: "Subround" },
                { prop: "TableId" },
                { prop: "Validbet" },
                { prop: "Water" },
                { prop: "Waterbet" },
                { prop: "WinLoss" },
            ];
        }
        else if (selectedList == this.commonService.GameName.PragmaticPlay) {
            this.columns = [
                { prop: "Bet" },
                { prop: "BonusCode" },
                { prop: "EndDate" },
                { prop: "ExtPlayerID" },
                { prop: "GameID" },
                { prop: "Jackpot" },
                { prop: "ParentSessionID" },
                { prop: "PlaySessionID" },
                { prop: "PlayerID" },
                { prop: "StartDate" },
                { prop: "Status" },
                { prop: "Type" },
                { prop: "Win" },
            ];
        }
        else if (selectedList == this.commonService.GameName.YeeBet) {
            this.columns = [
                { prop: "GameId" },
                { prop: "CreateTime" },
                { prop: "UserStatus" },
                { prop: "BetPoint" },
                { prop: "BetOdds" },
                { prop: "UserId" },
                { prop: "CommAmount" },
                { prop: "GameRoundId" },
                { prop: "UId" },
                { prop: "SettleTime" },
                { prop: "GameResult" },
                { prop: "WinLost" },
                { prop: "GameType" },
                { prop: "Currency" },
                { prop: "Id" },
                { prop: "State" },
                { prop: "Describe" },
                { prop: "GameNo" },
                { prop: "BetType" },
                { prop: "CId" },
                { prop: "Username" },
                { prop: "BetAmount" }
            ];
        }
        else if (selectedList == this.commonService.GameName.SBO) {
            this.columns = [
                { prop: 'SportsType' },
                { prop: 'Odds' },
                { prop: 'OddsStyle' },
                { prop: 'ActualStake' },
                { prop: 'Turnover' },
                { prop: 'IsHalfWonLose' },
                { prop: 'IsLive' },
                { prop: 'MaxWinWithoutActualStake' },
                { prop: 'IP' },
                { prop: 'IsSystemTagRisky' },
                { prop: 'IsCustomerTagRisky' },
                { prop: 'OrderTime' },
                { prop: 'ModifyDate' },
                { prop: 'SettleTime' },
                { prop: 'WinLostDate' },
                { prop: 'RefNo' },
                { prop: 'Username' },
                { prop: 'Currency' },
                { prop: 'Stake' },
                { prop: 'WinLost' },
                { prop: 'Status' },
                { prop: 'TopDownline' },
                { prop: 'SubBet' }
            ];
        }
        else if (selectedList == this.commonService.GameName.GamePlay) {
            this.columns = [
                { prop: 'Username' },
                { prop: 'BetAmount' },
                { prop: 'ValidBetAmount' },
                { prop: 'WinAmount' },
                { prop: 'NetPnl' },
                { prop: 'Currency' },
                { prop: 'TransactionTime' },
                { prop: 'GameCode' },
                { prop: 'GameName' },
                { prop: 'BetOrderNo' },
                { prop: 'BetTime' },
                { prop: 'ProductType' },
                { prop: 'GameCategory' },
                { prop: 'SessionId' },
                { prop: 'AdditionalDetails' }
            ];
        }
        else if (selectedList == this.commonService.GameName.CQ9) {
            this.columns = [
                { prop: 'GameHall' },
                { prop: 'GameType' },
                { prop: 'GamePlat' },
                { prop: 'GameCode' },
                { prop: 'Account' },
                { prop: 'Round' },
                { prop: 'Balance' },
                { prop: 'Win' },
                { prop: 'Bet' },
                { prop: 'ValidBet' },
                { prop: 'Jackpot' },
                { prop: 'JackpotContribution' },
                { prop: 'JackpotType' },
                { prop: 'Status' },
                { prop: 'EndroundTime' },
                { prop: 'CreateTime' },
                { prop: 'BetTime' },
                { prop: 'Detail' },
                { prop: 'SingleRowBet' },
                { prop: 'GameRole' },
                { prop: 'BankerType' },
                { prop: 'Rake' },
                { prop: 'RoomFee' },
                { prop: 'TableType' },
                { prop: 'TableId' },
                { prop: 'RoundNumber' },
                { prop: 'BetType' },
                { prop: 'GameResult' }
            ];
        }
        else {
            this.columns = [];
        }
    }

    //#endregion

    onChange($event) {
        let gameName = $event.target.value;

        if (gameName === this.commonService.GameName.M8 ||
            gameName === this.commonService.GameName.DG ||
            gameName === this.commonService.GameName.PragmaticPlay ||
            gameName === this.commonService.GameName.YeeBet ||
            gameName === this.commonService.GameName.GamePlay) {
            this.disable = true;
            this.gmtDisable = true;
            (document.getElementById("fromDate") as HTMLInputElement).style.display = "none";
            (document.getElementById("toDate") as HTMLInputElement).style.display = "none";
            (document.getElementById("startDate") as HTMLInputElement).style.display = "none";
            (document.getElementById("gmtDiv") as HTMLInputElement).style.display = "none";
            (document.getElementById("todayFilter") as HTMLInputElement).style.display = "none";
            (document.getElementById("yesterdayFilter") as HTMLInputElement).style.display = "none";
            (document.getElementById("thisWeekFilter") as HTMLInputElement).style.display = "none";
            (document.getElementById("thisYearFilter") as HTMLInputElement).style.display = "none";
        }
        else {
            this.disable = false;
            this.gmtDisable = true;
            (document.getElementById("fromDate") as HTMLInputElement).style.display = "";
            (document.getElementById("toDate") as HTMLInputElement).style.display = "";
            (document.getElementById("startDate") as HTMLInputElement).style.display = "none";
            (document.getElementById("gmtDiv") as HTMLInputElement).style.display = "none";
            (document.getElementById("todayFilter") as HTMLInputElement).style.display = "";
            (document.getElementById("yesterdayFilter") as HTMLInputElement).style.display = "";
            (document.getElementById("thisWeekFilter") as HTMLInputElement).style.display = "";
            (document.getElementById("thisYearFilter") as HTMLInputElement).style.display = "";
        }

        if (gameName === this.commonService.GameName.PragmaticPlay ||
            gameName === this.commonService.GameName.GamePlay) {
            (document.getElementById("startDate") as HTMLInputElement).style.display = "";
            (document.getElementById("todayFilter") as HTMLInputElement).style.display = "";
            (document.getElementById("yesterdayFilter") as HTMLInputElement).style.display = "";
            (document.getElementById("thisWeekFilter") as HTMLInputElement).style.display = "";
            (document.getElementById("thisYearFilter") as HTMLInputElement).style.display = "";
        }

        if (gameName === this.commonService.GameName.SexyBaccarat) {
            this.gmtDisable = false;
            (document.getElementById("gmtDiv") as HTMLInputElement).style.display = "";
        }

        this.selectedList = gameName;
        this.setDateOtherPicker(new Date(), new Date());
        this.BettingDetails();
    }

    SelectGMT($event) { this.gmtlist = $event.target.value; }

    //#region       Filter Data

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

    setToday() {
        var dates = this.commonService.getTodatDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.BettingDetails(fromdate, todate);
    }

    setYesterday() {
        var dates = this.commonService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.BettingDetails(fromdate, todate);
    }

    setThisWeek() {
        var dates = this.commonService.getThisWeekDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.BettingDetails(fromdate, todate);
    }

    setThisYear() {
        var dates = this.commonService.getThisYearDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.BettingDetails(fromdate, todate);
    }

    //#endregion

    BettingDetails(startingDate = null, endingDate = null) {
        if (this.commonService.CheckVariable(this.selectedList)) return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectGame);

        this.loadingIndicator = true;
        this.rows = [];

        let Model = {
            fromdate: startingDate === null ? this.datePipe.transform((document.getElementById("txt_fromdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss") : startingDate,
            todate: endingDate === null ? this.datePipe.transform((document.getElementById("txt_todatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss") : endingDate
        };

        this.startdate = startingDate === null ? this.datePipe.transform((document.getElementById("txt_startdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss") : startingDate;

        //this.fromDate = this.datePipe.transform((document.getElementById("txt_fromdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss");
        //this.toDate = this.datePipe.transform((document.getElementById("txt_todatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss");
        //this.startdate = this.datePipe.transform((document.getElementById("txt_startdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss");

        //if (startingDate !== null && endingDate !== null) {
        //    this.fromDate = startingDate;
        //    this.toDate = endingDate;
        //    this.startdate = startingDate;
        //    (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = null;
        //    (document.getElementById("txt_todatetime") as HTMLInputElement).value = null;
        //    (document.getElementById("txt_startdatetime") as HTMLInputElement).value = null;
        //}

        //let Model = {
        //    fromdate: this.fromDate,
        //    todate: this.toDate
        //}

        if (this.selectedList !== this.commonService.GameName.M8 &&
            this.selectedList !== this.commonService.GameName.DG &&
            this.selectedList !== this.commonService.GameName.PragmaticPlay &&
            this.selectedList !== this.commonService.GameName.GamePlay)
            if (Model.fromdate === null ||
                Model.todate === null) return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseProvideFromDateToDate);

        this.setDateOtherPicker(new Date(Model.fromdate), new Date(Model.todate));

        this.setColumn(this.selectedList);
        switch (this.selectedList) {
            case this.commonService.GameName.M8: {
                this.adminService.get<any>(customer.M8BettingDetails).subscribe(res => {
                    this.rows = [];
                    if (res.data.response.result !== "") {
                        this.TableData = res.data.response.result.ticket;
                        res.data.response.result.ticket.forEach(el => {
                            this.rows.push({
                                FetchId: el.fid,
                                LastModifiedDate: el.t,
                                UserID: el.id,
                                UserName: el.u,
                                WinLoseAmount: el.b,
                                WinAmount: el.w,
                                ComAmount: el.a,
                                SubCommission: el.c,
                                BetIP: el.ip,
                                ModuleId: el.league,
                                HomeId: el.home,
                                AwayId: el.away,
                                DangerStatus: el.status,
                                Game: el.game,
                                Odds: el.odds,
                                Side: el.side,
                                Info: el.info,
                                Half: el.half,
                                TransDate: el.trandate,
                                WorkingDate: el.workdate,
                                MatchDate: el.matchdate,
                                RunScore: el.runscore,
                                Score: el.score,
                                HalfScore: el.htscore,
                                FLGRes: el.flg,
                                Status: el.res,
                                SportTypeId: el.sportstype,
                                OddsType: el.oddstype,
                                TodayDate: el.matchdatetime,
                                CurrencyCode: el.curcode,
                                LeagueName: el.leaguename["#cdata-section"],
                                HomeName: el.homename["#cdata-section"],
                                AwayName: el.awayname["#cdata-section"],
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case this.commonService.GameName.AG: {
                this.adminService.add<any>(customer.AGBettingDetails, Model).subscribe(res => {
                    this.rows = [];
                    if (res.data.trans !== null) {
                        this.TableData = res.data;
                        res.data.trans.forEach(el => {
                            this.rows.push({
                                user_id: el.user_id,
                                operator_id: el.operator_id,
                                transaction_time: el.transaction_time,
                                trans_id: el.trans_id,
                                winlost_amount: el.winlost_amount,
                                game_code: el.game_code,
                                game_type: el.game_type,
                                stake: el.stake,
                                valid_stake: el.valid_stake,
                                play_type: el.play_type,
                                platform_type: el.platform_type,
                                currency: el.currency,
                                table_code: el.table_code,
                                ip: el.ip,
                                recaculate_time: el.recaculate_time,
                                remark: el.remark,
                                status: el.status,
                                jackpotcomm: el.jackpotcomm,
                                jackpotwin: el.jackpotwin,
                                round: el.round,
                                shoeCode: el.details.shoeCode,
                                bankerPoint: el.details.bankerPoint,
                                playerPoint: el.details.playerPoint,
                                cardNum: el.details.cardNum,
                                pair: el.details.pair,
                                dragonPoint: el.details.dragonPoint,
                                tigerPoint: el.details.tigerPoint,
                                cardList: el.details.cardList,
                                vid: el.details.vid,
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case this.commonService.GameName.Playtech: {
                this.adminService.add<any>(customer.PlaytechBettingDetails, Model).subscribe(res => {
                    this.rows = [];
                    if (res.data.length > 0) {
                        this.TableData = res.data;
                        res.data.forEach(el => {
                            this.rows.push({
                                PlayerName: el.playername,
                                WindowCode: el.windowcode,
                                GameId: el.gameid,
                                GameCode: el.gamecode,
                                GameType: el.gametype,
                                GameName: el.gamename,
                                SessionId: el.sessionid,
                                CurrencyCode: el.currencycode,
                                Bet: el.bet,
                                Win: el.win,
                                ProgressiveBet: el.progressivebet,
                                ProgressiveWin: el.progressivewin,
                                Balance: el.balance,
                                CurrentBet: el.currentbet,
                                GameDate: el.gamedate,
                                LiveNetwork: el.livenetwork,
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                    this.setColumn("");
                });
                break;
            }
            case this.commonService.GameName.Joker: {
                this.adminService.add<any>(customer.JokerBettingDetails, Model).subscribe(res => {
                    this.rows = [];
                    if (res.data.winloss.length > 0) {
                        this.TableData = res.data.winloss;
                        res.data.winloss.forEach(el => {
                            this.rows.push({
                                Username: el.username,
                                OCode: el.oCode,
                                Amount: el.amount,
                                Result: el.result,
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case this.commonService.GameName.Mega888: {
                this.adminService.add<any>(customer.Mega888BettingDetails, Model).subscribe(res => {
                    this.loadingIndicator = true;
                    this.rows = [];
                    if (res.data.result.length > 0) {
                        this.TableData = res.data;
                        res.data.result.forEach(el => {
                            this.rows.push({
                                Name: el.name,
                                LoginId: el.loginId,
                                UserId: el.userId,
                                Bet: el.bet,
                                Win: el.win,
                                Yield: el.yield,
                                Idx: el.idx,
                                Sn: el.sn,
                                Tel: el.tel,
                                StatisticDate: el.statisticDate,
                                Memo: el.memo,
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case this.commonService.GameName._918Kiss: {
                this.adminService.add<any>(customer.Kiss918BettingDetails, Model).subscribe(res => {
                    this.loadingIndicator = true;
                    this.rows = [];
                    if (res.data.results.length > 0) {
                        this.TableData = res.data;
                        res.data.results.forEach(el => {
                            this.rows.push({
                                Account: el.account,
                                Agentwin: el.agentwin,
                                Idx: el.idx,
                                Jtime: el.jtime,
                                Win: el.win,
                                Press: el.press,
                                Pump: el.pump,
                                SelfWin: el.selfwin,
                                Type: el.type,
                                Yield: el.yield,
                                Memo: el.memo,
                                MyDate: el.mydate,
                                Name: el.name,
                                Tel: el.tel,
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case this.commonService.GameName.DG: {
                this.adminService.get<any>(customer.DGBettingDetails).subscribe(res => {
                    this.rows = [];
                    if (res.data.list !== null) {
                        this.TableData = res.data;
                        res.data.list.forEach(el => {
                            this.rows.push({
                                id: el.id,
                                tableId: el.tableId,
                                shoeId: el.shoeId,
                                playId: el.playId,
                                lobbyId: el.lobbyId,
                                gameType: el.gameType,
                                gameId: el.gameId,
                                memberId: el.memberId,
                                parentId: el.parentId,
                                betTime: el.betTime,
                                calTime: el.calTime,
                                winOrLoss: el.winOrLoss,
                                balanceBefore: el.balanceBefore,
                                betPoints: el.betPoints,
                                betPointsz: el.betPointsz,
                                availableBet: el.availableBet,
                                userName: el.userName,
                                result: el.result,
                                betDetail: el.betDetail,
                                ip: el.ip,
                                ext: el.ext,
                                isRevocation: el.isRevocation,
                                currencyId: el.currencyId,
                                deviceType: el.deviceType,
                                roadid: el.roadid,
                                pluginid: el.pluginid
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case this.commonService.GameName.SexyBaccarat: {
                let sexyModel = {
                    fromdate: this.fromDate.replace(" ", "T") + this.gmtlist,
                    todate: this.toDate.replace(" ", "T") + this.gmtlist
                }
                this.adminService.add<any>(customer.SexyBettingDetails, sexyModel).subscribe(res => {
                    this.rows = [];
                    if (res.data.response.transactions.length > 0) {
                        this.TableData = res.data.response;
                        res.data.response.transactions.forEach(el => {
                            this.rows.push({
                                ID: el.id,
                                gameType: el.gameType,
                                winAmount: el.winAmount,
                                txTime: el.txTime,
                                gameInfo: el.gameInfo,
                                realWinAmount: el.realWinAmount,
                                updateTime: el.updateTime,
                                realBetAmount: el.realBetAmount,
                                userId: el.userId,
                                betType: el.betType,
                                platform: el.platform,
                                txStatus: el.txStatus,
                                betAmount: el.betAmount,
                                platformTxId: el.platformTxId,
                                gameCode: el.gameCode,
                                currency: el.currency,
                                jackpotWinAmount: el.jackpotWinAmount,
                                jackpotBetAmount: el.jackpotBetAmount,
                                turnover: el.turnover,
                                roundId: el.roundId,
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case this.commonService.GameName.SA: {
                let saModel = {
                    fromdate: this.fromDate,
                    todate: this.toDate
                }
                this.adminService.add<any>(customer.SABettingDetails, saModel).subscribe(res => {
                    this.rows = [];
                    if (res.data.length > 0) {
                        this.TableData = res.data;
                        res.data.forEach(el => {
                            this.rows.push({
                                BetID: el.BetDetail.BetID,
                                Balance: el.BetDetail.Balance,
                                BetSource: el.BetDetail.BetSource,
                                BetAmount: el.BetDetail.BetAmount,
                                BetTime: el.BetDetail.BetTime,
                                BetType: el.BetDetail.BetType,
                                Username: el.BetDetail.Username,
                                PayoutTime: el.BetDetail.PayoutTime,
                                ResultAmount: el.BetDetail.ResultAmount,
                                Rolling: el.BetDetail.Rolling,
                                Round: el.BetDetail.Round,
                                HostID: el.BetDetail.HostID,
                                GameType: el.BetDetail.GameType,
                                GameID: el.BetDetail.GameID,
                                State: el.BetDetail.State,
                                TransactionID: el.BetDetail.TransactionID,
                                Set: el.BetDetail.Set,
                                Detail: el.BetDetail.Detail,
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case this.commonService.GameName.Pussy888: {
                let pussy888Model = {
                    fromdate: this.fromDate,
                    todate: this.toDate
                }
                this.adminService.add<any>(customer.Pussy888BettingDetails, pussy888Model).subscribe(res => {
                    this.rows = [];
                    if (res.data.results.length > 0) {
                        this.TableData = res.data;
                        res.data.results.forEach(el => {
                            this.rows.push({
                                Account: el.account,
                                Agentwin: el.agentwin,
                                Idx: el.idx,
                                Jtime: el.jtime,
                                Memo: el.memo,
                                Mydate: el.mydate,
                                Name: el.name,
                                Press: el.press,
                                Pump: el.pump,
                                Selfwin: el.selfwin,
                                Tel: el.tel,
                                Type: el.type,
                                Win: el.win,
                                Yield: el.yield,
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case this.commonService.GameName.AllBet: {
                let allbetModel = {
                    fromdate: this.fromDate,
                    todate: this.toDate
                }
                this.adminService.add<any>(customer.AllBetBettingDetails, allbetModel).subscribe(res => {
                    this.rows = [];
                    if (res.data.histories.length > 0) {
                        this.TableData = res.data.histories;
                        res.data.histories.forEach(el => {
                            this.rows.push({
                                AppType: el.appType,
                                BetAmount: el.betAmount,
                                BetNum: el.betNum,
                                BetTime: el.betTime,
                                BetType: el.betType,
                                Client: el.client,
                                Commission: el.commission,
                                Currency: el.currency,
                                ExchangeRate: el.exchangeRate,
                                GameResult: el.gameResult,
                                GameRoundEndTime: el.gameRoundEndTime,
                                GameRoundId: el.gameRoundId,
                                GameRoundStartTime: el.gameRoundStartTime,
                                GameType: el.gameType,
                                State: el.state,
                                TableName: el.tableName,
                                ValidAmount: el.validAmount,
                                WinOrLoss: el.winOrLoss,
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case this.commonService.GameName.WM: {
                let wmModel = {
                    fromdate: this.fromDate,
                    todate: this.toDate
                }
                this.adminService.add<any>(customer.WMBettingDetails, wmModel).subscribe(res => {
                    this.rows = [];

                    if (res.data.result.length > 0) {
                        this.TableData = res.data.result;
                        res.data.result.forEach(el => {
                            this.rows.push({
                                BeforeCash: el.beforeCash,
                                Bet: el.bet,
                                BetCode: el.betCode,
                                BetId: el.betId,
                                BetResult: el.betResult,
                                BetTime: el.betTime,
                                Commission: el.commission,
                                Event: el.event,
                                EventChild: el.eventChild,
                                GameResult: el.gameResult,
                                Gid: el.gid,
                                Gname: el.gname,
                                Ip: el.ip,
                                Reset: el.reset,
                                Result: el.result,
                                Round: el.round,
                                Settime: el.settime,
                                Subround: el.subround,
                                TableId: el.tableId,
                                User: el.user,
                                Validbet: el.validbet,
                                Water: el.water,
                                Waterbet: el.waterbet,
                                WinLoss: el.winLoss,
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case this.commonService.GameName.PragmaticPlay: {
                let pragmaticModel = {
                    startTime: this.startdate,
                }
                this.adminService.add<any>(customer.PragmaticBettingDetails, pragmaticModel).subscribe(res => {
                    this.rows = [];
                    if (res.data.length > 0) {
                        this.TableData = res.data;
                        res.data.forEach(el => {
                            this.rows.push({
                                Bet: el.bet,
                                BonusCode: el.bonusCode,
                                EndDate: el.endDate,
                                ExtPlayerID: el.extPlayerID,
                                GameID: el.gameID,
                                Jackpot: el.jackpot,
                                ParentSessionID: el.parentSessionID,
                                PlaySessionID: el.playSessionID,
                                PlayerID: el.playerID,
                                StartDate: el.startDate,
                                Status: el.status,
                                Type: el.type,
                                Win: el.win,
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case this.commonService.GameName.YeeBet: {
                this.adminService.get<any>(customer.YeeBetBettingDetails).subscribe(res => {
                    this.rows = [];
                    if (res.data.arraysize > 0) {
                        this.TableData = res.data.array;
                        res.data.array.forEach(el => {
                            this.rows.push({
                                GameId: el.gameid,
                                CreateTime: el.createtime,
                                UserStatus: el.userstatus,
                                BetPoint: el.betpoint,
                                BetOdds: el.betodds,
                                UserId: el.userid,
                                CommAmount: el.commamount,
                                GameRoundId: el.gameroundid,
                                UId: el.uid,
                                SettleTime: el.settletime,
                                GameResult: el.gameresult,
                                WinLost: el.winlost,
                                GameType: el.gametype,
                                Currency: el.currency,
                                Id: el.id,
                                State: el.state,
                                Describe: el.describe,
                                GameNo: el.gameno,
                                BetType: el.bettype,
                                CId: el.cid,
                                Username: el.username,
                                BetAmount: el.betamount
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case this.commonService.GameName.SBO: {
                this.adminService.add<any>(customer.SBOBettingDetails, Model).subscribe(res => {
                    if (res.data.error.id == 0 &&
                        res.data.result.length > 0) {
                        //let list = res.data.result.filter(s => s.username == this.SBOUsername)
                        this.rows = [];

                        this.TableData = res.data.result;

                        res.data.result.forEach(el => {
                            this.rows.push({
                                SportsType: el.sportsType,
                                Odds: el.odds,
                                OddsStyle: el.oddsStyle,
                                ActualStake: el.actualStake,
                                Turnover: el.turnover,
                                IsHalfWonLose: el.isHalfWonLose,
                                IsLive: el.isLive,
                                MaxWinWithoutActualStake: el.maxWinWithoutActualStake,
                                IP: el.ip,
                                IsSystemTagRisky: el.isSystemTagRisky,
                                IsCustomerTagRisky: el.isCustomerTagRisky,
                                OrderTime: el.orderTime,
                                ModifyDate: el.modifyDate,
                                SettleTime: el.settleTime,
                                WinLostDate: el.winLostDate,
                                RefNo: el.refNo,
                                Username: el.username,
                                Currency: el.currency,
                                Stake: el.stake,
                                WinLost: el.winLost,
                                Status: el.status,
                                TopDownline: el.topDownline,
                                SubBet: JSON.stringify(el.subBet)
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case this.commonService.GameName.GamePlay: {
                let model = { startTime: this.startdate };
                this.adminService.add<any>(customer.GamePlayBettingDetails, model).subscribe(res => {
                    if (res.data.status == 0 &&
                        res.data.details.length > 0) {
                        this.rows = [];
                        this.TableData = res.data.details;

                        res.data.details.forEach(el => {
                            this.rows.push({
                                Username: el.username,
                                BetAmount: el.betAmount,
                                ValidBetAmount: el.validBetAmount,
                                WinAmount: el.winAmount,
                                NetPnl: el.netPnl,
                                Currency: el.currency,
                                TransactionTime: this.ReplaceDateTime(el.transactionTime),
                                GameCode: el.gameCode,
                                GameName: el.gameName,
                                BetOrderNo: el.betOrderNo,
                                BetTime: this.ReplaceDateTime(el.betTime),
                                ProductType: el.productType,
                                GameCategory: el.gameCategory,
                                SessionId: el.sessionId,
                                AdditionalDetails: JSON.stringify(el.additionalDetails)
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case this.commonService.GameName.CQ9: {
                let model = { fromdate: this.fromDate, todate: this.toDate };
                this.adminService.add<any>(customer.CQ9BettingDetails, model).subscribe(res => {
                    if (res.data.status.code == '0' &&
                        res.data.data.length > 0) {
                        this.rows = [];
                        this.TableData = res.data.data.data;

                        res.data.data.data.forEach(el => {
                            this.rows.push({
                                GameHall: el.gameHall,
                                GameType: el.gameType,
                                GamePlat: el.gamePlat,
                                GameCode: el.gameCode,
                                Account: el.account,
                                Round: el.round,
                                Balance: el.balance,
                                Win: el.win,
                                Bet: el.bet,
                                ValidBet: el.validBet,
                                Jackpot: el.jackpot,
                                JackpotContribution: el.jackpotContribution,
                                JackpotType: el.jackpotType,
                                Status: el.status,
                                EndroundTime: el.endroundTime,
                                CreateTime: el.createTime,
                                BetTime: el.betTime,
                                Detail: el.detail == null ? null : JSON.stringify(el.detail),
                                SingleRowBet: el.singleRowBet,
                                GameRole: el.gameRole,
                                BankerType: el.bankerType,
                                Rake: el.rake,
                                RoomFee: el.roomFee,
                                TableType: el.tableType,
                                TableId: el.tableId,
                                RoundNumber: el.roundNumber,
                                BetType: el.betType,
                                GameResult: JSON.stringify(el.gameResult)
                            });
                        });
                        this.rows = [...this.rows];
                    }
                    else this.setColumn("");
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            default: {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectGame);
            }
        }
    }

    //#region Replace Time

    ReplaceDateTime(date) { return date.replace("T", " "); }

    //#endregion

    onSelect(event, row) {
        if (event.target.checked)
            this.FetchIdList.push(row);
        else
            this.FetchIdList = this.FetchIdList.filter(item => item != row);
    }

    async Save() {
        if (await this.checkAddPermission()) {
            if (this.commonService.CheckVariable(this.TableData)) return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseGetTheBettingDetailsOfGames);

            let model = {
                jsondata: JSON.stringify(this.TableData)
            }
            switch (this.selectedList) {
                case this.commonService.GameName.M8: {
                    let m8Model = {
                        jsondata: model.jsondata,
                        fetchId: this.FetchIdList
                    }
                    this.adminService.add<any>(customer.SaveM8BettingDetails, m8Model).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                case this.commonService.GameName.AG: {
                    console.log(model);
                    this.adminService.add<any>(customer.SaveAGBettingDetails, model).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                case this.commonService.GameName.Playtech: {
                    this.adminService.add<any>(customer.SavePlaytechBettingDetails, model).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                case this.commonService.GameName.Joker: {
                    this.adminService.add<any>(customer.SaveJokerBettingDetails, model).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                case this.commonService.GameName.Mega888: {
                    this.adminService.add<any>(customer.SaveMega888BettingDetails, model).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                case this.commonService.GameName._918Kiss: {
                    this.adminService.add<any>(customer.SaveKiss918BettingDetails, model).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                case this.commonService.GameName.DG: {
                    this.adminService.add<any>(customer.SaveDGBettingDetails, model).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                case this.commonService.GameName.SexyBaccarat: {
                    this.adminService.add<any>(customer.SaveSABettingDetails, model).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                case this.commonService.GameName.SA: {
                    let saModel = {
                        jsondata: this.TableData
                    }
                    this.adminService.add<any>(customer.SaveSABettingDetails, saModel).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                case this.commonService.GameName.Pussy888: {
                    this.adminService.add<any>(customer.SavePussy888BettingDetails, model).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                case this.commonService.GameName.AllBet: {
                    let allbetModel = {
                        jsondata: this.TableData
                    }
                    this.adminService.add<any>(customer.SaveAllbetBettingDetails, allbetModel).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                case this.commonService.GameName.WM: {
                    let wmModel = {
                        jsondata: this.TableData
                    }
                    this.adminService.add<any>(customer.SaveWMBettingDetails, wmModel).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                case this.commonService.GameName.PragmaticPlay: {
                    let wmModel = {
                        jsondata: this.TableData
                    }
                    this.adminService.add<any>(customer.SavePragmaticBettingDetails, wmModel).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                case this.commonService.GameName.YeeBet: {
                    this.adminService.add<any>(customer.SaveYeeBetBettingDetails, model).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                case this.commonService.GameName.SBO: {
                    this.adminService.add<any>(customer.SaveSBOBettingDetails, model).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                case this.commonService.GameName.GamePlay: {
                    this.adminService.add<any>(customer.SaveGamePlayBettingDetails, model).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                case this.commonService.GameName.CQ9: {
                    this.adminService.add<any>(customer.SaveCQ9BettingDetails, model).subscribe(res => {
                        this.toasterService.pop('success', 'Successfully', res.message);
                        this.loadingIndicator = false;
                        this.rows = [];
                        this.setColumn("");
                        this.TableData = null;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.rows = [];
                        this.setColumn("");
                    });
                    break;
                }
                default: {
                    this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectGame);
                }
            }
        }
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[2].Permissions[0].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkUpdatePermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[2].Permissions[1].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkAddPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[2].Permissions[2].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    //#endregion Check Permission
}