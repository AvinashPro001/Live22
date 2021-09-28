import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-bettingdetails-check',
    templateUrl: './bettingdetails-check.component.html',
    styleUrls: ['./bettingdetails-check.component.scss']
})

export class BettingdetailsCheckComponent implements OnInit {
    rows = [];
    columns = [];
    newVal: any;
    GameName: any;
    loadingIndicator: any;
    customerData: any;
    listType: any = [
        { gameName: this.commonService.GameName._918Kiss },
        { gameName: this.commonService.GameName.AG },
        { gameName: this.commonService.GameName.AllBet },
        { gameName: this.commonService.GameName.DG },
        { gameName: this.commonService.GameName.Joker },
        { gameName: this.commonService.GameName.M8 },
        { gameName: this.commonService.GameName.MaxBet },
        { gameName: this.commonService.GameName.Mega888 },
        { gameName: this.commonService.GameName.Playtech },
        { gameName: this.commonService.GameName.Pussy888 },
        { gameName: this.commonService.GameName.SA },
        { gameName: this.commonService.GameName.SexyBaccarat },
        { gameName: this.commonService.GameName.WM },
        { gameName: this.commonService.GameName.YeeBet },
        { gameName: this.commonService.GameName.SBO },
        { gameName: this.commonService.GameName.GamePlay },
        { gameName: this.commonService.GameName.CQ9 }
    ];

    constructor(
        private datePipe: DatePipe,
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.customerUser();
            this.commonService.setDateOtherPicker(new Date(), new Date());
        }
    }

    //#region setCoumn

    setColumn(selectedList) {
        if (selectedList == this.commonService.GameName.M8) {
            this.columns = [
                { prop: 'UserName' },
                { prop: 'FetchId' },
                { prop: 'LastModifiedDate' },
                { prop: 'UserID' },
                { prop: 'WinLoseDatetime' },
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
                { prop: 'AwayName' }
            ];
        }
        else if (selectedList == this.commonService.GameName.Playtech) {
            this.columns = [
                { prop: 'PlayerName' },
                { prop: 'CurrentBet' },
                { prop: 'Bet' },
                { prop: 'Win' },
                { prop: 'Balance' },
                { prop: 'GameType' },
                { prop: 'GameName' },
                { prop: 'WindowCode' },
                { prop: 'GameId' },
                { prop: 'GameCode' },
                { prop: 'SessionId' },
                { prop: 'CurrencyCode' },
                { prop: 'ProgressiveBet' },
                { prop: 'ProgressiveWin' },
                { prop: 'GameDate' },
                { prop: 'LiveNetwork' }
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
                { prop: 'vid' }
            ];
        }
        else if (selectedList == this.commonService.GameName.Joker) {
            this.columns = [
                { prop: 'Username', width: 60 },
                { prop: 'OCode' },
                { prop: 'Amount' },
                { prop: 'Result' },
                { prop: 'Created' }
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
                { prop: 'StartTime' },
                { prop: 'EndTime' },
                { prop: 'Created' }
            ];
        }
        else if (selectedList == this.commonService.GameName.MaxBet) {
            this.columns = [
                { prop: 'vendor_member_id' },
                { prop: 'after_amount' },
                { prop: 'odds' },
                { prop: 'stake' },
                { prop: 'ticket_status' },
                { prop: 'transaction_time' },
                { prop: 'version_key' },
                { prop: 'winlost_datetime' },
                { prop: 'trans_id' },
                { prop: 'odds_type' },
                { prop: 'winlost_amount' }
            ];
        }
        else if (selectedList == this.commonService.GameName._918Kiss) {
            this.columns = [
                { prop: 'Account' },
                { prop: 'Agentwin' },
                { prop: 'UserName918' },
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
                { prop: 'Created' }
            ];
        }
        else if (selectedList == this.commonService.GameName.Pussy888) {
            this.columns = [
                { prop: 'Account' },
                { prop: 'Agentwin' },
                { prop: 'Pussy888UserName' },
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
                { prop: 'Created' }
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
                { prop: "userId" },
                { prop: "ID" },
                { prop: "gameType" },
                { prop: "winAmount" },
                { prop: "txTime" },
                { prop: "gameInfo" },
                { prop: "realWinAmount" },
                { prop: "updateTime" },
                { prop: "realBetAmount" },
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
                { prop: "DealerDomain" },
                { prop: "IP" },
                { prop: "Odds" },
                { prop: "Result" },
                { prop: "RoundStartTime" },
                { prop: "Status" },
                { prop: "TableId" },
                { prop: "WinLoss" },
                { prop: "Winner" }
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
                { prop: "GameID" },
                { prop: "GameResult" },
                { prop: "Set" },
                { prop: "Detail" }
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
                { prop: "Created" }
            ];
        }
        else if (selectedList == this.commonService.GameName.WM) {
            this.columns = [
                { prop: "Users" },
                { prop: "BeforeCash" },
                { prop: "Bet" },
                { prop: "BetCode" },
                { prop: "BetId" },
                { prop: "BetResult" },
                { prop: "BetTime" },
                { prop: "Commission" },
                { prop: "Event" },
                { prop: "EventChild" },
                { prop: "GName" },
                { prop: "GameResult" },
                { prop: "Gid" },
                { prop: "IP" },
                { prop: "Reset" },
                { prop: "Result" },
                { prop: "Round" },
                { prop: "SetTime" },
                { prop: "SubRound" },
                { prop: "TableId" },
                { prop: "ValidBet" },
                { prop: "Water" },
                { prop: "WaterBet" },
                { prop: "WinLoss" }
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
            this.rows = [];
        }
    }

    //#endregion

    //#region config for Username dropdown

    config = {
        displayKey: "username", //if objects array passed which key to be displayed defaults to description
        search: true, //true/false for the search functionlity defaults to false,
        height: '500px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        placeholder: 'Select Username.', // text to be displayed when no item is selected defaults to Select,
        customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
        limitTo: 100,// a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
        moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
        searchPlaceholder: 'Search', // label thats displayed in search input,
        searchOnKey: 'username' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }

    //#endregion config for Username dropdown

    //#region customerUser

    customerUser() {
        try {
            this.customerData = JSON.parse(localStorage.getItem('Customers'));
        }
        catch { }
        var model = {};
        this.adminService.add<any>(customer.customerList, model).subscribe(res => {
            localStorage.setItem('Customers', JSON.stringify(res.data));
            this.customerData = JSON.parse(localStorage.getItem('Customers'));
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#endregion

    onChange(event) {
        try {
            this.newVal = event.value.id == undefined ? null : event.value.id;
        }
        catch {
            this.newVal = null;
        }
    }

    onGameChange(event) {
        this.GameName = event.target.value;
    }

    //#region       Filter Data

    setToday() {
        var dates = this.commonService.getTodatDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.commonService.setDateOtherPicker(new Date(fromdate), new Date(todate));

        this.BettingDetails(fromdate, todate);
    }

    setYesterday() {
        var dates = this.commonService.getYesterDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.commonService.setDateOtherPicker(new Date(fromdate), new Date(todate));

        this.BettingDetails(fromdate, todate);
    }

    setThisWeek() {
        var dates = this.commonService.getThisWeekDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.commonService.setDateOtherPicker(new Date(fromdate), new Date(todate));

        this.BettingDetails(fromdate, todate);
    }

    setThisYear() {
        var dates = this.commonService.getThisYearDate();
        var fromdate = dates.fromdate;
        var todate = dates.todate;

        this.commonService.setDateOtherPicker(new Date(fromdate), new Date(todate));

        this.BettingDetails(fromdate, todate);
    }

    //#endregion

    BettingDetails(startingDate = null, endingDate = null) {
        let model = {
            gameName: this.GameName,
            userid: this.newVal,
            fromdate: startingDate === null ? this.datePipe.transform((document.getElementById("txt_fromdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss") : startingDate,
            todate: endingDate === null ? this.datePipe.transform((document.getElementById("txt_todatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss") : endingDate
        };

        //let model = {
        //    gameName: this.GameName,
        //    userid: this.newVal,
        //    fromdate: this.datePipe.transform((document.getElementById("txt_fromdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss"),
        //    todate: this.datePipe.transform((document.getElementById("txt_todatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss")
        //}

        //if (startingDate !== null && endingDate !== null) {
        //    model.fromdate = startingDate;
        //    model.todate = endingDate;
        //    (document.getElementById("txt_fromdatetime") as HTMLInputElement).value = null;
        //    (document.getElementById("txt_todatetime") as HTMLInputElement).value = null;
        //}

        if (model.userid == undefined ||
            model.userid == null)
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SelectUserName);

        if (model.gameName == undefined) return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectGame);

        if (model.fromdate != null ||
            model.todate != null) {
            if (model.fromdate == null) return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectFromDate);
            if (model.todate == null) return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectToDate);
        }

        this.adminService.add<any>(customer.BettingDetailsByUsername, model).subscribe(res => {
            if (res.data.length > 0) {
                switch (model.gameName) {
                    case this.commonService.GameName.M8: {
                        this.setColumn(this.commonService.GameName.M8);
                        this.rows = [];
                        res.data.forEach(el => {
                            this.rows.push({
                                FetchId: el.BDM8_FetchId,
                                LastModifiedDate: el.BDM8_LastModifiedDate,
                                UserID: el.BDM8_UserID,
                                UserName: el.BDM8_UserName,
                                WinLoseAmount: el.BDM8_WinLoseAmount,
                                WinAmount: el.BDM8_WinAmount,
                                ComAmount: el.BDM8_ComAmount,
                                SubCommission: el.BDM8_SubCommission,
                                BetIP: el.BDM8_BetIP,
                                ModuleId: el.BDM8_ModuleId,
                                HomeId: el.BDM8_HomeId,
                                AwayId: el.BDM8_AwayId,
                                DangerStatus: el.BDM8_DangerStatus,
                                Game: el.BDM8_Game,
                                Odds: el.BDM8_Odds,
                                Side: el.BDM8_Side,
                                Info: el.BDM8_Info,
                                Half: el.BDM8_Half,
                                TransDate: el.BDM8_TransDate,
                                WorkingDate: el.BDM8_WorkingDate,
                                MatchDate: el.BDM8_MatchDate,
                                RunScore: el.BDM8_RunScore,
                                Score: el.BDM8_Score,
                                HalfScore: el.BDM8_HalfScore,
                                FLGRes: el.BDM8_FLGRes,
                                Status: el.BDM8_Status,
                                SportTypeId: el.BDM8_SportTypeId,
                                OddsType: el.BDM8_OddsType,
                                TodayDate: el.BDM8_TodayDate,
                                CurrencyCode: el.BDM8_CurrencyCode,
                                LeagueName: el.BDM8_LeagueName,
                                HomeName: el.BDM8_HomeName,
                                AwayName: el.BDM8_AwayName,
                                WinLoseDatetime: el.BDM8_WinLoseDatetime
                            });
                        });
                        this.rows = [...this.rows];
                        this.loadingIndicator = false;
                        break;
                    }
                    case this.commonService.GameName.AG: {
                        this.setColumn(this.commonService.GameName.AG);
                        this.rows = [];
                        res.data.forEach(el => {
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
                                shoeCode: el.shoeCode,
                                bankerPoint: el.bankerPoint,
                                playerPoint: el.playerPoint,
                                cardNum: el.cardNum,
                                pair: el.pair,
                                dragonPoint: el.dragonPoint,
                                tigerPoint: el.tigerPoint,
                                cardList: el.cardList,
                                vid: el.vid,
                            });
                        });
                        this.rows = [...this.rows];
                        this.loadingIndicator = false;
                        break;
                    }
                    case this.commonService.GameName.Playtech: {
                        this.setColumn(this.commonService.GameName.Playtech);
                        this.rows = [];
                        debugger
                        res.data.forEach(el => {
                            this.rows.push({
                                PlayerName: el.PlayerName,
                                WindowCode: el.WindowCode,
                                GameId: el.GameId,
                                GameCode: el.GameCode,
                                GameType: el.GameType,
                                GameName: el.GameName,
                                SessionId: el.SessionId,
                                CurrencyCode: el.CurrencyCode,
                                Bet: el.Bet,
                                Win: el.Win,
                                ProgressiveBet: el.ProgressiveBet,
                                ProgressiveWin: el.ProgressiveWin,
                                Balance: el.Balance,
                                CurrentBet: el.CurrentBet,
                                GameDate: el.GameDate,
                                LiveNetwork: el.LiveNetwork,
                            });
                        });
                        this.rows = [...this.rows];
                        this.loadingIndicator = false;
                        break;
                    }
                    case this.commonService.GameName.Joker: {
                        this.setColumn(this.commonService.GameName.Joker);
                        this.rows = [];
                        res.data.forEach(el => {
                            this.rows.push({
                                Username: el.Username,
                                OCode: el.OCode,
                                Amount: el.Amount,
                                Result: el.Result,
                                Created: el.Created
                            });
                        });
                        this.rows = [...this.rows];
                        this.loadingIndicator = false;
                        break;
                    }
                    case this.commonService.GameName.Mega888: {
                        this.setColumn(this.commonService.GameName.Mega888);
                        this.loadingIndicator = true;
                        this.rows = [];
                        res.data.forEach(el => {
                            this.rows.push({
                                Name: el.Name,
                                LoginId: el.LoginId,
                                UserId: el.UserId,
                                Bet: el.Bet,
                                Win: el.Win,
                                Yield: el.Yield,
                                Idx: el.Idx,
                                Sn: el.Sn,
                                Tel: el.Tel,
                                StatisticDate: el.StatisticDate,
                                Memo: el.Memo,
                                StartTime: el.StartTime,
                                EndTime: el.EndTime,
                                Created: el.Created,
                            });
                        });
                        this.rows = [...this.rows];
                        this.loadingIndicator = false;
                        break;
                    }
                    case this.commonService.GameName._918Kiss: {
                        this.setColumn(this.commonService.GameName._918Kiss);
                        this.loadingIndicator = true;
                        this.rows = [];
                        res.data.forEach(el => {
                            this.rows.push({
                                Account: el.Username,
                                Agentwin: el.AgentWin,
                                Idx: el.Idx,
                                Jtime: el.Jtime,
                                Win: el.Win,
                                Press: el.Press,
                                Pump: el.Pump,
                                SelfWin: el.SelfWin,
                                Type: el.Type,
                                Yield: el.Yield,
                                Memo: el.Memo,
                                MyDate: el.MyDate,
                                Name: el.Name,
                                Tel: el.Tel,
                                UserName918: el._918UserName,
                                Created: el.Created,
                            });
                        });
                        this.rows = [...this.rows];
                        this.loadingIndicator = false;
                        break;
                    }
                    case this.commonService.GameName.DG: {
                        this.setColumn(this.commonService.GameName.DG);
                        this.rows = [];
                        res.data.forEach(el => {
                            this.rows.push({
                                id: el.Rowid,
                                tableId: el.TableId,
                                shoeId: el.ShoeId,
                                playId: el.PlayId,
                                lobbyId: el.LobbyId,
                                gameType: el.GameType,
                                gameId: el.GameId,
                                memberId: el.MemberId,
                                parentId: el.ParentId,
                                betTime: el.BetTime,
                                calTime: el.CalTime,
                                winOrLoss: el.WinOrLoss,
                                balanceBefore: el.BalanceBefore,
                                betPoints: el.BetPoints,
                                betPointsz: el.BetPointsz,
                                availableBet: el.AvailableBet,
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
                        this.loadingIndicator = false;
                        break;
                    }
                    case this.commonService.GameName.SexyBaccarat: {
                        this.setColumn(this.commonService.GameName.SexyBaccarat);
                        this.rows = [];
                        res.data.forEach(el => {
                            this.rows.push({
                                ID: el.RowId,
                                gameType: el.GameType,
                                winAmount: el.WinAmount,
                                txTime: el.TxTime,
                                realWinAmount: el.RealWinAmount,
                                updateTime: el.updateTime,
                                realBetAmount: el.RealBetAmount,
                                userId: el.UserId,
                                betType: el.BetType,
                                platform: el.Platform,
                                txStatus: el.TxStatus,
                                betAmount: el.BetAmount,
                                platformTxId: el.PlatformTxId,
                                gameCode: el.GameCode,
                                currency: el.Currency,
                                jackpotWinAmount: el.JackpotWinAmount,
                                jackpotBetAmount: el.JackpotBetAmount,
                                turnover: el.Turnover,
                                roundId: el.RoundId,
                                DealerDomain: el.DealerDomain,
                                IP: el.IP,
                                Odds: el.Odds,
                                Result: el.Result,
                                RoundStartTime: el.RoundStartTime,
                                Status: el.Status,
                                TableId: el.TableId,
                                WinLoss: el.WinLoss,
                                Winner: el.Winner,
                            });
                        });
                        this.rows = [...this.rows];
                        this.loadingIndicator = false;
                        break;
                    }
                    case this.commonService.GameName.SA: {
                        this.setColumn(this.commonService.GameName.SA);
                        this.rows = [];
                        res.data.forEach(el => {
                            this.rows.push({
                                BetID: el.BetID,
                                Balance: el.Balance,
                                BetSource: el.BetSource,
                                BetAmount: el.BetAmount,
                                BetTime: el.BetTime,
                                BetType: el.BetType,
                                Username: el.Username,
                                PayoutTime: el.PayoutTime,
                                ResultAmount: el.ResultAmount,
                                Rolling: el.Rolling,
                                Round: el.Round,
                                HostID: el.HostID,
                                GameType: el.GameType,
                                GameID: el.GameID,
                                State: el.State,
                                TransactionID: el.TransactionID,
                                Set: el.Set,
                                Detail: el.Detail,
                                GameResult: el.GameResult,
                            });
                        });
                        this.rows = [...this.rows];
                        this.loadingIndicator = false;
                        break;
                    }
                    case this.commonService.GameName.MaxBet: {
                        this.setColumn(this.commonService.GameName.MaxBet);
                        this.rows = [];
                        res.data.forEach(el => {
                            this.rows.push({
                                vendor_member_id: el.vendor_member_id,
                                after_amount: el.after_amount,
                                odds: el.odds,
                                stake: el.stake,
                                ticket_status: el.ticket_status,
                                transaction_time: el.transaction_time,
                                version_key: el.version_key,
                                winlost_datetime: el.winlost_datetime,
                                trans_id: el.trans_id,
                                odds_type: el.odds_type,
                                winlost_amount: el.winlost_amount,
                            });
                        });
                        this.rows = [...this.rows];
                        this.loadingIndicator = false;
                        break;
                    }
                    case this.commonService.GameName.Pussy888: {
                        this.setColumn(this.commonService.GameName.Pussy888);
                        this.loadingIndicator = true;
                        this.rows = [];
                        res.data.forEach(el => {
                            this.rows.push({
                                Account: el.Username,
                                Agentwin: el.AgentWin,
                                Idx: el.Idx,
                                Jtime: el.Jtime,
                                Win: el.win,
                                Press: el.press,
                                Pump: el.pump,
                                SelfWin: el.selfwin,
                                Type: el.type,
                                Yield: el.yield,
                                Memo: el.Memo,
                                MyDate: el.Mydate,
                                Name: el.Name,
                                Tel: el.tel,
                                UserName918: el.Pussy888UserName,
                                Created: el.Created,
                            });
                        });
                        this.rows = [...this.rows];
                        this.loadingIndicator = false;
                        break;
                    }
                    case this.commonService.GameName.AllBet: {
                        this.setColumn(this.commonService.GameName.AllBet);
                        this.loadingIndicator = true;
                        this.rows = [];
                        res.data.forEach(el => {
                            this.rows.push({
                                AppType: el.AppType,
                                BetAmount: el.BetAmount,
                                BetNum: el.BetNum,
                                BetTime: el.BetTime,
                                BetType: el.BetType,
                                Client: el.Client,
                                Commission: el.Commission,
                                Currency: el.Currency,
                                ExchangeRate: el.ExchangeRate,
                                GameResult: el.GameResult,
                                GameRoundEndTime: el.GameRoundEndTime,
                                GameRoundId: el.GameRoundId,
                                GameRoundStartTime: el.GameRoundStartTime,
                                GameType: el.GameType,
                                State: el.State,
                                TableName: el.TableName,
                                ValidAmount: el.ValidAmount,
                                WinOrLoss: el.WinOrLoss,
                                Created: el.Created
                            });
                        });
                        this.rows = [...this.rows];
                        this.loadingIndicator = false;
                        break;
                    }
                    case this.commonService.GameName.WM: {
                        this.setColumn(this.commonService.GameName.WM);
                        this.loadingIndicator = true;
                        this.rows = [];
                        res.data.forEach(el => {
                            this.rows.push({
                                BeforeCash: el.BeforeCash,
                                Bet: el.Bet,
                                BetCode: el.BetCode,
                                BetId: el.BetId,
                                BetResult: el.BetResult,
                                BetTime: el.BetTime,
                                Commission: el.Commission,
                                Event: el.Event,
                                EventChild: el.EventChild,
                                GName: el.GName,
                                GameResult: el.GameResult,
                                Gid: el.Gid,
                                IP: el.IP,
                                Reset: el.Reset,
                                Result: el.Result,
                                Round: el.Round,
                                SetTime: el.SetTime,
                                SubRound: el.SubRound,
                                TableId: el.TableId,
                                Users: el.Users,
                                ValidBet: el.ValidBet,
                                Water: el.Water,
                                WaterBet: el.WaterBet,
                                WinLoss: el.WinLoss,
                            });
                        });
                        this.rows = [...this.rows];
                        this.loadingIndicator = false;
                        break;
                    }
                    case this.commonService.GameName.YeeBet: {
                        this.setColumn(this.commonService.GameName.YeeBet);
                        this.loadingIndicator = true;
                        this.rows = [];
                        res.data.forEach(el => {
                            this.rows.push({
                                GameId: el.GameId,
                                CreateTime: el.Created,
                                UserStatus: el.UserStatus,
                                BetPoint: el.BetPoint,
                                BetOdds: el.BetOdds,
                                UserId: el.UserId,
                                CommAmount: el.CommAmount,
                                GameRoundId: el.GameRoundId,
                                UId: el.Uid,
                                SettleTime: el.SettleTime,
                                GameResult: el.GameResult,
                                WinLost: el.WinLost,
                                GameType: el.GameType,
                                Currency: el.Currency,
                                Id: el.Id,
                                State: el.State,
                                Describe: el.Describe,
                                GameNo: el.GameNo,
                                BetType: el.BetType,
                                CId: el.Cid,
                                Username: el.Username,
                                BetAmount: el.BetAmount
                            });
                        });
                        this.rows = [...this.rows];
                        this.loadingIndicator = false;
                        break;
                    }
                    case this.commonService.GameName.SBO: {
                        this.setColumn(this.commonService.GameName.SBO);
                        this.loadingIndicator = true;
                        this.rows = [];
                        res.data.forEach(el => {
                            this.rows.push({
                                SportsType: el.SportsType,
                                Odds: el.Odds,
                                OddsStyle: el.OddsStyle,
                                ActualStake: el.ActualStake,
                                Turnover: el.Turnover,
                                IsHalfWonLose: el.IsHalfWonLose,
                                IsLive: el.IsLive,
                                MaxWinWithoutActualStake: el.MaxWinWithoutActualStake,
                                IP: el.IP,
                                IsSystemTagRisky: el.IsSystemTagRisky,
                                IsCustomerTagRisky: el.IsCustomerTagRisky,
                                OrderTime: this.ReplaceDateTime(el.OrderTime),
                                ModifyDate: this.ReplaceDateTime(el.ModifyDate),
                                SettleTime: this.ReplaceDateTime(el.SettleTime),
                                WinLostDate: this.ReplaceDateTime(el.WinLostDate),
                                RefNo: el.RefNo,
                                Username: el.Username,
                                Currency: el.Currency,
                                Stake: el.Stake,
                                WinLost: el.WinLost,
                                Status: el.Status,
                                TopDownline: el.TopDownline,
                                SubBet: el.SubBet
                            });
                        });
                        this.rows = [...this.rows];
                        this.loadingIndicator = false;
                        break;
                    }
                    case this.commonService.GameName.GamePlay: {
                        this.setColumn(this.commonService.GameName.GamePlay);
                        this.rows = [];
                        res.data.forEach(el => {
                            this.rows.push({
                                Username: el.Username,
                                BetAmount: el.BetAmount,
                                ValidBetAmount: el.ValidBetAmount,
                                WinAmount: el.WinAmount,
                                NetPnl: el.NetPnl,
                                Currency: el.Currency,
                                TransactionTime: this.ReplaceDateTime(el.TransactionTime),
                                GameCode: el.GameCode,
                                GameName: el.GameName,
                                BetOrderNo: el.BetOrderNo,
                                BetTime: this.ReplaceDateTime(el.BetTime),
                                ProductType: el.ProductType,
                                GameCategory: el.GameCategory,
                                SessionId: el.SessionId,
                                AdditionalDetails: el.AdditionalDetails
                            });
                        });
                        this.rows = [...this.rows];
                        this.loadingIndicator = false;
                        break;
                    }
                    case this.commonService.GameName.CQ9: {
                        this.setColumn(this.commonService.GameName.CQ9);
                        this.rows = [];
                        res.data.forEach(el => {
                            this.rows.push({
                                GameHall: el.GameHall,
                                GameType: el.GameType,
                                GamePlat: el.GamePlat,
                                GameCode: el.GameCode,
                                Account: el.Account,
                                Round: el.Round,
                                Balance: el.Balance,
                                Win: el.Win,
                                Bet: el.Bet,
                                ValidBet: el.ValidBet,
                                Jackpot: el.Jackpot,
                                JackpotContribution: el.JackpotContribution,
                                JackpotType: el.JackpotType,
                                Status: el.Status,
                                EndroundTime: el.EndroundTime,
                                CreateTime: el.CreateTime,
                                BetTime: el.BetTime,
                                Detail: el.Detail == null ? null : JSON.stringify(el.Detail),
                                SingleRowBet: el.SingleRowBet,
                                GameRole: el.GameRole,
                                BankerType: el.BankerType,
                                Rake: el.Rake,
                                RoomFee: el.RoomFee,
                                TableType: el.TableType,
                                TableId: el.TableId,
                                RoundNumber: el.RoundNumber,
                                BetType: el.BetType,
                                GameResult: JSON.stringify(el.GameResult)
                            });
                        });
                        this.rows = [...this.rows];
                        this.loadingIndicator = false;
                        break;
                    }
                }
            }
            else {
                this.setColumn("");
            }
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    //#region Replace Time

    ReplaceDateTime(date) { return date.replace("T", " "); }

    //#endregion

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[3].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[3].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[3].submenu[3].Permissions[2].IsChecked === true) {
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