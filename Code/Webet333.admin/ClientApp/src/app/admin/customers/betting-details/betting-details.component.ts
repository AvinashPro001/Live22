import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer } from '../../../../environments/environment';

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
        { gameName: "M8" },
        { gameName: "AG" },
        { gameName: "Playtech" },
        { gameName: "Joker" },
        { gameName: "Mega888" },
        { gameName: "918 Kiss" },
        { gameName: "DG" },
        { gameName: "Sexy Baccarat" },
        { gameName: "SA" },
        { gameName: "Pussy888" },
        { gameName: "AllBet" },
        { gameName: "WM" },
        { gameName: "Pragmatic" },
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
        private toasterService: ToasterService
    ) { }

    ngOnInit() {
        this.setColumn(this.selectedList);
    }

    //#region setCoumn
    setColumn(selectedList) {
        if (selectedList == "M8") {
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
        else if (selectedList == "Playtech") {
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
        else if (selectedList == "AG") {
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
        else if (selectedList == "Joker") {
            this.columns = [
                { prop: 'Username', width: 60 },
                { prop: 'OCode' },
                { prop: 'Amount' },
                { prop: 'Result' },
            ];
        }
        else if (selectedList == "Mega888") {
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
        else if (selectedList == "918 Kiss") {
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
        else if (selectedList == "DG") {
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
        else if (selectedList == "Sexy Baccarat") {
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
        else if (selectedList == "SA") {
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
        else if (selectedList == "Pussy888") {
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
        else if (selectedList == "AllBet") {
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
        else if (selectedList == "WM") {
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
        else if (selectedList == "Pragmatic") {
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
        else {
            this.columns = [];
        }
    }
    //#endregion

    onChange($event) {
        if ($event.target.value === "M8" || $event.target.value === "DG" || $event.target.value === "Pragmatic") {
            this.disable = true;
            this.gmtDisable = true;
            (document.getElementById("fromDate") as HTMLInputElement).style.display = "none";
            (document.getElementById("toDate") as HTMLInputElement).style.display = "none";
            (document.getElementById("startDate") as HTMLInputElement).style.display = "none";
            (document.getElementById("gmtDiv") as HTMLInputElement).style.display = "none";
        }
        else {
            this.disable = false;
            this.gmtDisable = true;
            (document.getElementById("fromDate") as HTMLInputElement).style.display = "";
            (document.getElementById("toDate") as HTMLInputElement).style.display = "";
            (document.getElementById("gmtDiv") as HTMLInputElement).style.display = "none";
        }

        if ($event.target.value === "Pragmatic") {
            (document.getElementById("startDate") as HTMLInputElement).style.display = "";
        }

        if ($event.target.value === "Sexy Baccarat") {
            this.gmtDisable = false;
            (document.getElementById("gmtDiv") as HTMLInputElement).style.display = "";
        }

        this.selectedList = $event.target.value;
    }

    SelectGMT($event) {
        this.gmtlist = $event.target.value;
    }

    BettingDetails() {
        this.loadingIndicator = true;
        this.rows = [];

        this.fromDate = this.datePipe.transform((document.getElementById("txt_fromdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss");
        this.toDate = this.datePipe.transform((document.getElementById("txt_todatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss");

        this.startdate = this.datePipe.transform((document.getElementById("txt_startdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss");

        let Model = {
            fromdate: this.fromDate,
            todate: this.toDate
        }

        if (this.selectedList !== "M8" && this.selectedList !== "DG" && this.selectedList  !== "Pragmatic")
            if (Model.fromdate === null || Model.todate === null) {
                return this.toasterService.pop('error', 'Error', "Please Select To Date and From Date");
            }

        this.setColumn(this.selectedList);
        switch (this.selectedList) {
            case 'M8': {
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
                    else {
                        this.setColumn("");
                    }
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case 'AG': {
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
                    else {
                        this.setColumn("");
                    }
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case 'Playtech': {
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
                    else {
                        this.setColumn("");
                    }
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                    this.setColumn("");
                });
                break;
            }
            case 'Joker': {
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
                    else {
                        this.setColumn("");
                    }
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case 'Mega888': {
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
                    else {
                        this.setColumn("");
                    }
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case '918 Kiss': {
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
                    else {
                        this.setColumn("");
                    }
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case 'DG': {
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
                    else {
                        this.setColumn("");
                    }
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case 'Sexy Baccarat': {
                let sexyModel = {
                    fromdate: this.fromDate.replace(" ", "T") + this.gmtlist,
                    todate: this.toDate.replace(" ", "T") + this.gmtlist
                }
                this.adminService.add<any>(customer.SexyBettingDetails, sexyModel).subscribe(res => {
                    this.rows = [];
                    if (res.data.response.transactions.length >0) {
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
                    else {
                        this.setColumn("");
                    }
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case 'SA': {
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
                    else {
                        this.setColumn("");
                    }
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case 'Pussy888': {
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
                    else {
                        this.setColumn("");
                    }
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case 'AllBet': {
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
                    else {
                        this.setColumn("");
                    }
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case 'WM': {
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
                    else {
                        this.setColumn("");
                    }
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            case 'Pragmatic': {
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
                    else {
                        this.setColumn("");
                    }
                    this.loadingIndicator = false;
                }, error => {
                    this.loadingIndicator = false;
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
                break;
            }
            default: {
                this.toasterService.pop('error', 'Error', "Please Select Game !!!!");
            }
        }

    }

    onSelect(event, row) {
        if (event.target.checked)
            this.FetchIdList.push(row);
        else
            this.FetchIdList = this.FetchIdList.filter(item => item != row);
    }

    Save() {
        if (this.TableData === undefined || this.TableData === null)
            return this.toasterService.pop('error', 'Error', "Please Get The Betting Details of games");

        let model = {
            jsondata: JSON.stringify(this.TableData)
        }
        switch (this.selectedList) {
            case 'M8': {
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
            case 'AG': {
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
            case 'Playtech': {
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
            case 'Joker': {
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
            case 'Mega888': {
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
            case '918 Kiss': {
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
            case 'DG': {
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
            case 'Sexy Baccarat': {
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
            case 'SA': {
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
            case 'Pussy888': {
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
            case 'AllBet': {
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
            case 'WM': {
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
            case 'Pragmatic': {
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
            default: {
                this.toasterService.pop('error', 'Error', "Please Select Game !!!!");
            }
        }
    }
}