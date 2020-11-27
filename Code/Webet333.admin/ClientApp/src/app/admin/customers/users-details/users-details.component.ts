import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterService } from 'angular2-toaster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { account, customer, gameBalance } from '../../../../environments/environment';
import { AdminService } from '../../admin.service';
import { debug } from 'util';

@Component({
    selector: 'app-users-details',
    templateUrl: './users-details.component.html',
    styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {

    //#region Variable and Constructor

    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('status') status: TemplateRef<any>;



    userid: any;
    customerData: any;
    userdata: any;

    userPlaytechUnfinished: any;
    userPragmaticUnfinished: any;
    userJokerUnfinished: any;

    userWalletBalance: any;

    depositColumns: any;
    depositRows: any;

    withdrawColumns: any;
    withdrawRows: any;

    transferColumns: any;
    transferRows: any;

    statementColumns: any;
    statementRows: any;

    promotionColumns: any;
    promotionRows: any;

    rebateColumns: any;
    rebateRows: any;

    restoreColumns: any;
    restoreRows: any;

    PromotionApplyColumns: any;
    PromotionApplyRows: any;

    unfinishedPlaytechColumns: any;
    unfinishedPlaytechRows: any;

    unfinishedPragmaticColumns: any;
    unfinishedPragmaticRows: any;

    loadingIndicator: boolean = false;

    promotiondata: any;

    kiss918balance: any;
    Mega888balance: any;
    Jokerbalance: any;
    Maxbetbalance: any;
    allbetbalance: any;
    wmbalance: any;
    pragmaticbalance: any;
    M8balance: any;
    AGbalance: any;
    DGbalance: any;
    Playtechbalance: any;
    Sexybaccaratbalance: any;
    SAbalance: any;
    Pussy888balance: any;
    newVal: any;
    agUsername: any;
    playtechUsername: any;
    dgUsername: any;
    saUsername: any;
    sexyUsername: any;
    jokerUsername: any;
    maxbetUsername: any;
    m8Username: any;
    kiss918Username: any;
    mega888Username: any;
    pussyUsername: any;
    allbetUsername: any;
    wmUsername: any;
    pragmaticUsername: any;
    userPassword: any;

    totalWithdrawAmount: any;
    totalWithdrawAmountWithMYR: any;

    defaultStartDate: any;
    defaultEndDate: any;

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
        private toasterService: ToasterService,
        private modalService: NgbModal,
    ) { }

    //#endregion

    //#region OnInit Method

    ngOnInit() {
        const now = new Date();
        var value = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        this.defaultStartDate = value;
        this.defaultEndDate = value;

        document.getElementById("profiletab").click();
        this.customerUser();
        this.coloumSet();
        var someElement = document.getElementById("lockIcon");
    }

    //#endregion

    //#region Betting Details Game Change Method

    onGameChange($event) {
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

    //#endregion

    //#region onChange
    onChange(event) {
        try {
            this.newVal = event.value.id;
            this.userPassword = event.value.password;

            this.OnType(this.newVal);
        }
        catch{
            this.depositRows = [];
            this.withdrawRows = [];
            this.transferRows = [];
            this.promotionRows = [];
            this.statementRows = [];
            this.rebateRows = [];
            this.restoreRows = [];
            this.PromotionApplyRows = [];
            this.totalWithdrawAmountWithMYR = "";
            var someElement = document.getElementById("lockIcon");
            someElement.className = "";
            this.Resetvalue();
        }
    }
    //retriveUserbank(newVal: any) {
    //    throw new Error("Method not implemented.");
    //}


    config = {
        displayKey: "username", //if objects array passed which key to be displayed defaults to description
        search: true, //true/false for the search functionlity defaults to false,
        height: '500px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        placeholder: 'Select Username.', // text to be displayed when no item is selected defaults to Select,
        customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
        limitTo: Option.length,// a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
        moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
        searchPlaceholder: 'Search', // label thats displayed in search input,
        searchOnKey: 'username' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }
    //#endregion

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

    //#region Set data on select username

    OnType(event) {
        let list = this.customerData.filter(x => x.id === event)[0];
        if (list != undefined) {
            this.userid = list.id;
            this.userdata = list;
            this.getUsername(this.userid);
            this.depositlist(null, null);
            this.withdrawlist(null, null);
            this.transferlist(null, null);
            this.promotionlist(null, null);
            this.statementlist(null, null);
            this.rebatelist(null, null);
            this.WithdrawAmountList(this.userid);
        }
        else {
            this.userid = "";
            this.searchHandlerByDate("");
        }
    }

    //#endregion

    //#region Get all game Username

    getUsername(id) {
        let data = {
            id: id
        }
        this.adminService.add<any>(customer.GetUsername, data).subscribe(res => {
            this.agUsername = res.data.agUsername;
            this.playtechUsername = res.data.playtechUsername;
            this.dgUsername = res.data.dgUsername;
            this.saUsername = res.data.saUsername;
            this.sexyUsername = res.data.sexyUsername;
            this.jokerUsername = res.data.jokerUsername;
            this.maxbetUsername = res.data.maxbetUsername;
            this.m8Username = res.data.m8Username;
            this.kiss918Username = res.data.kiss918Username;
            this.mega888Username = res.data.mega888Username;
            this.pussyUsername = res.data.pussy888Username;
            this.allbetUsername = res.data.allbetUsername;
            this.wmUsername = res.data.wmUsername;
            this.pragmaticUsername = res.data.pragmaticUsername;
            this.WalletBalance(id);
            this.UserBrokenStaus();
        })
    }

    //#endregion

    //#region onChange
    convertDecimal(Balance) {
        if (Balance != null) {
            return Number(Balance).toFixed(2);
        }
        else {
            return "N/A"
        }
    }
    //#endregion

    //#region onclick page set in tab menu

    openPage(pageName, elmnt) {
        var tabcontent, tablinks, pageNameDiv;
        tabcontent = document.getElementsByClassName('tabcontent') as HTMLCollectionOf<HTMLElement>;
        for (var i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName('tablink') as HTMLCollectionOf<HTMLElement>;
        for (var i = 0; i < tablinks.length; i++) {
            tablinks[i].style.backgroundColor = "#0B1729";
            tablinks[i].style.color = "";
        }
        pageNameDiv = document.getElementById(pageName) as HTMLElement;
        pageNameDiv.style.display = "block";
        (document.getElementById(elmnt) as HTMLElement).style.backgroundColor = "#F47D3A";
        (document.getElementById(elmnt) as HTMLElement).style.color = "black"

        this.searchHandlerByDate(pageName);
    }

    //#endregion onclick page set in tab menu

    //#region Column set on all tables

    coloumSet() {

        this.depositColumns = [
            { prop: 'No' },
            { prop: 'WalletName' },
            { prop: 'BankName' },
            { prop: 'DepositMethod' },
            { prop: 'Amount' },
            { prop: 'PromotionTitle' },
            { prop: 'Created' },
            { prop: 'Verified' }
        ];

        this.withdrawColumns = [
            { prop: 'No' },
            { prop: 'WithdrawNo' },
            { prop: 'BankName' },
            { prop: 'WalletName' },
            { prop: 'Amount' },
            { prop: 'AccountNo' },
            { prop: 'BankName' },
            { prop: 'AdminRemark' },
            { prop: 'Created' },
            { prop: 'Status' }
        ];

        this.transferColumns = [
            { prop: 'No' },
            { prop: 'TransactionNo' },
            { prop: 'From' },
            { prop: 'Where' },
            { prop: 'Amount' },
            { prop: 'Created' },
            { prop: 'Status' }
        ];

        this.statementColumns = [
            { prop: 'No' },
            { prop: 'DateTime' },
            { prop: 'TransactionNumber' },
            { prop: 'Type' },
            { prop: 'From' },
            { prop: 'To' },
            { prop: 'Amount' },
            { prop: 'Balance' }
        ];

        this.promotionColumns = [
            { prop: 'No' },
            { prop: 'Turnover' },
            { prop: 'Title' },
            { prop: 'TurnoverTime' },
            { prop: 'WinTurn' },
            { prop: 'TurnoverTarget' },
            { prop: 'WinTarget' },
            { prop: 'Status' },
            { prop: 'ExpieryDate' },
            { prop: 'RemaininggDay' },
            { prop: 'Created' },
            { prop: 'Expiery', cellTemplate: this.status, sortable: false }
        ];

        this.rebateColumns = [
            { prop: 'No' },
            { prop: 'GameName' },
            { prop: 'Turnover' },
            { prop: 'Rolling' },
            { prop: 'Bet' },
            { prop: 'WinLose' },
            { prop: 'CommAmount' },
            { prop: 'Created' }
        ];

        this.restoreColumns = [
            { prop: 'No' },
            { prop: 'FromAG' },
            { prop: 'FromDG' },
            { prop: 'FromPlaytech' },
            { prop: 'FromKiss918' },
            { prop: 'FromMaxbet' },
            { prop: 'FromM8' },
            { prop: 'FromJoker' },
            { prop: 'FromMega888' },
            { prop: 'FromSexyBaccaratBalance' },
            { prop: 'Created' }
        ];

        this.PromotionApplyColumns = [
            { prop: 'No' },
            { prop: 'Title' },
            { prop: 'BeforePromotionbalance' },
            { prop: 'ApplyDate' },
            { prop: 'Status' },
        ];

        this.unfinishedPragmaticColumns = [
            { prop: 'No' },
            { prop: 'BetAmount' },
            { prop: 'GameId' },
            { prop: 'PlaySessionID' },
        ];

        this.unfinishedPlaytechColumns = [
            { prop: 'No' },
            { prop: 'Playername' },
            { prop: 'Bet' },
            { prop: 'Brokengametype' },
            { prop: 'Clienttype' },
            { prop: 'Finishedgamecode' },
            { prop: 'Finishedgamedate' },
            { prop: 'Game' },
            { prop: 'Gamedate' },
            { prop: 'Infobet' },
            { prop: 'Jackpotbet' },
            { prop: 'Remoteip' },
            { prop: 'Rnum' },
            { prop: 'Status' },
        ];

    }

    setBettingDetailsColumn(selectedList) {
        if (selectedList == "M8") {
            this.columns = [
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
                { prop: 'BeginBlance' },
                { prop: 'Bet' },
                { prop: 'ClassID' },
                { prop: 'Cday' },
                { prop: 'Cno' },
                { prop: 'CreateTime' },
                { prop: 'EndBlance' },
                { prop: 'GameID' },
                { prop: 'GameName' },
                { prop: 'Id' },
                { prop: 'LineNum' },
                { prop: 'LogDataStr' },
                { prop: 'LogDataType' },
                { prop: 'RoundNO' },
                { prop: 'Rownum' },
                { prop: 'TableID' },
                { prop: 'Uuid' },
                { prop: 'Win' }
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

    //#region Filter data

    searchHandlerByDate(Tab) {
        if (this.userid !== undefined && this.userid !== "") {
            var fromdate, todate;
            if (Tab === "Deposit") {
                fromdate = (document.getElementById("d_fromdatetime") as HTMLInputElement).value;
                todate = (document.getElementById("d_todatetime") as HTMLInputElement).value;
                this.depositlist(fromdate == "" ? null : fromdate, todate == "" ? null : todate);
            }

            if (Tab === "Withdraw") {
                fromdate = (document.getElementById("w_fromdatetime") as HTMLInputElement).value;
                todate = (document.getElementById("w_todatetime") as HTMLInputElement).value;
                this.withdrawlist(fromdate == "" ? null : fromdate, todate == "" ? null : todate);
            }

            if (Tab === "Transfer") {
                fromdate = (document.getElementById("t_fromdatetime") as HTMLInputElement).value;
                todate = (document.getElementById("t_todatetime") as HTMLInputElement).value;
                this.transferlist(fromdate == "" ? null : fromdate, todate == "" ? null : todate);
            }

            if (Tab === "Promotion") {
                fromdate = (document.getElementById("p_fromdatetime") as HTMLInputElement).value;
                todate = (document.getElementById("p_todatetime") as HTMLInputElement).value;
                this.promotionlist(fromdate == "" ? null : fromdate, todate == "" ? null : todate);
            }

            if (Tab === "Rebate") {
                fromdate = (document.getElementById("r_fromdatetime") as HTMLInputElement).value;
                todate = (document.getElementById("r_todatetime") as HTMLInputElement).value;
                this.rebatelist(fromdate == "" ? null : fromdate, todate == "" ? null : todate);
            }

            if (Tab === "Statement") {
                fromdate = (document.getElementById("s_fromdatetime") as HTMLInputElement).value;
                todate = (document.getElementById("s_todatetime") as HTMLInputElement).value;
                this.statementlist(fromdate == "" ? null : fromdate, todate == "" ? null : todate);
            }

            if (Tab === "Restore") {
                this.restorelist();
            }
        }
        else {
            this.depositRows = [];
            this.withdrawRows = [];
            this.transferRows = [];
            this.promotionRows = [];
            this.statementRows = [];
            this.rebateRows = [];
            this.restoreRows = [];
            this.PromotionApplyRows = [];
            this.totalWithdrawAmountWithMYR = "";
            var someElement = document.getElementById("lockIcon");
            someElement.className += "";
            this.Resetvalue();
        }
    }

    //#endregion

    //#region Call Game Balance Functions

    WalletBalance(id) {
        this.ManiWalletBalance(id);
        this.Kiss918Balance(id);
        this.Mega888(id);
        this.Maxbet(id);
        this.M8(id);
        this.AG(id);
        this.DG(id);
        this.Playtech(id);
        this.Joker(id);
        this.Sexybaccarat(id);
        this.SA(id);
        this.Pussy888(id);
        this.AllBet(id);
        this.WM(id)
        this.Pragmatic(id)
    }

    //#endregion

    //#region Reset All values

    Resetvalue() {
        (document.getElementById("d_fromdatetime") as HTMLInputElement).value = "";
        (document.getElementById("d_todatetime") as HTMLInputElement).value = "";

        (document.getElementById("w_fromdatetime") as HTMLInputElement).value = "";
        (document.getElementById("w_todatetime") as HTMLInputElement).value = "";

        (document.getElementById("s_fromdatetime") as HTMLInputElement).value = "";
        (document.getElementById("s_todatetime") as HTMLInputElement).value = "";

        (document.getElementById("r_fromdatetime") as HTMLInputElement).value = "";
        (document.getElementById("r_todatetime") as HTMLInputElement).value = "";

        (document.getElementById("p_fromdatetime") as HTMLInputElement).value = "";
        (document.getElementById("p_todatetime") as HTMLInputElement).value = "";

        (document.getElementById("t_fromdatetime") as HTMLInputElement).value = "";
        (document.getElementById("t_todatetime") as HTMLInputElement).value = "";
    }

    //#endregion

    //#region  User Deposit List

    depositlist(fromdate, todate) {
        this.loadingIndicator = true;
        let data = {
            userId: this.userid,
            fromDate: fromdate,
            toDate: todate,
        }
        this.adminService.add<any>(customer.depositList, data).subscribe(res => {
            this.depositRows = [];
            let i = 0;
            res.data.forEach(el => {
                this.depositRows.push({
                    No: ++i,
                    WalletName: el.walletName,
                    BankName: el.bankName,
                    DepositMethod: el.depositMethod,
                    Amount: el.amount,
                    Created: this.replaceDateTime(el.created),
                    PromotionTitle: el.promotionTitle,
                    Verified: el.verified,
                });
            });
            this.depositRows = [...this.depositRows];

        });
        this.loadingIndicator = false;
    }

    //#endregion User Deposit List

    //#region  User Withdraw List

    withdrawlist(fromdate, todate) {
        this.loadingIndicator = true;
        let data = {
            userId: this.userid,
            fromDate: fromdate,
            toDate: todate,
        }
        this.adminService.add<any>(customer.withdrawList, data).subscribe(res => {
            this.withdrawRows = [];
            let i = 0;
            res.data.forEach(el => {
                this.withdrawRows.push({
                    No: ++i,
                    WithdrawNo: el.orderId,
                    BankName: el.bankName,
                    WalletName: el.walletName,
                    Amount: el.withdrawalAmount,
                    Status: el.verified,
                    AccountNo: el.accountNo,
                    Created: this.replaceDateTime(el.created),
                    AdminRemark: el.adminRemarks
                });
            });
            this.withdrawRows = [...this.withdrawRows];
        });
        this.loadingIndicator = false;
    }

    //#endregion User Withdraw List

    //#region  User Transfer List

    transferlist(fromdate, todate) {
        this.loadingIndicator = true;
        let data = {
            userId: this.userid,
            fromDate: fromdate,
            toDate: todate,
        }
        this.adminService.add<any>(customer.transferList, data).subscribe(res => {
            this.transferRows = [];
            let i = 0;
            res.data.forEach(el => {
                this.transferRows.push({
                    No: ++i,
                    TransactionNo: el.orderId,
                    From: el.fromWallet,
                    Where: el.toWallet,
                    Amount: el.amount,
                    Status: el.verified,
                    Created: this.replaceDateTime(el.created)
                });
            });
            this.transferRows = [...this.transferRows];

        });
        this.loadingIndicator = false;
    }

    //#endregion User Transfer List

    //#region  User Promotion List

    promotionlist(fromdate, todate) {
        this.loadingIndicator = true;
        let data = {
            userid: this.userid,
            fromDate: fromdate,
            toDate: todate,
        }
        this.adminService.add<any>(customer.promotionApplySelect, data).subscribe(res => {
            this.promotionRows = [];
            let i = 0;
            this.promotiondata = res.data;
            res.data.forEach(el => {
                this.promotionRows.push({
                    No: ++i,
                    Turnover: el.UserTurnover,
                    Title: el.Title,
                    TurnoverTime: el.TurnoverTime,
                    WinTurn: el.WinTurn,
                    TurnoverTarget: el.TurnoverTarget,
                    WinTarget: el.TurnTarget,
                    RemaininggDay: el.RemainingDay,
                    ExpieryDate: this.replaceDateTime(el.ExpiryDate),
                    Created: this.replaceDateTime(el.Created),
                    Status: el.Staus,
                });
            });
            this.promotionRows = [...this.promotionRows];

        });
        this.loadingIndicator = false;
    }

    //#endregion User Promotion List

    //#region  User Rebate List

    rebatelist(fromdate, todate) {
        this.loadingIndicator = true;
        let data = {
            userid: this.userid,
            fromDate: fromdate,
            toDate: todate,
        }
        this.adminService.add<any>(customer.rebateHistory, data).subscribe(res => {
            this.rebateRows = [];
            let i = 0;
            res.data.forEach(el => {
                this.rebateRows.push({
                    No: ++i,
                    GameName: el.GameName,
                    Turnover: el.Turnover,
                    Rolling: el.Rolling,
                    Bet: el.Bet,
                    WinLose: el.WinLose,
                    CommAmount: el.CommAmount,
                    Created: this.replaceDateTime(el.Created),
                });
            });
            this.rebateRows = [...this.rebateRows];

        });
        this.loadingIndicator = false;
    }

    //#endregion User Rebate List

    //#region  User Statement List

    statementlist(fromdate, todate) {
        this.loadingIndicator = true;
        let data = {
            userId: this.userid,
            fromDate: fromdate,
            toDate: todate,
        }
        this.adminService.add<any>(customer.statementHistory, data).subscribe(res => {
            this.statementRows = [];
            let i = 0;
            res.data.forEach(el => {
                this.statementRows.push({
                    No: ++i,
                    DateTime: this.replaceDateTime(el.created),
                    TransactionNumber: el.transactionNo,
                    Type: el.transactionType,
                    From: el.debitFrom,
                    To: el.creditTo,
                    Amount: el.amount,
                    Balance: el.currentBalance,
                });
            });
            this.statementRows = [...this.statementRows];

        });
        this.loadingIndicator = false;
    }

    //#endregion User Statement List

    //#region  User Rebate List

    restorelist() {
        this.loadingIndicator = true;
        let data = {
            id: this.userid,
        }
        this.adminService.add<any>(customer.restoreHistory, data).subscribe(res => {
            this.restoreRows = [];
            let i = 0;
            res.data.forEach(el => {
                this.restoreRows.push({
                    No: ++i,
                    FromAG: this.convertDecimal(el.AGBalance),
                    FromDG: this.convertDecimal(el.DGBalance),
                    FromPlaytech: this.convertDecimal(el.PlaytechBalance),
                    FromKiss918: this.convertDecimal(el.Kiss918Balance),
                    FromMaxbet: this.convertDecimal(el.MaxbetBalance),
                    FromM8: this.convertDecimal(el.M8Balance),
                    FromJoker: this.convertDecimal(el.JokerBalance),
                    FromMega888: this.convertDecimal(el.Mega888Balance),
                    FromSexyBaccaratBalance: this.convertDecimal(el.SexyBaccaratBalance),
                    Created: this.replaceDateTime(el.Created),
                });
            });
            this.restoreRows = [...this.restoreRows];

        });
        this.loadingIndicator = false;
    }

    //#endregion User Rebate List

    //#region Replace Time

    replaceDateTime(date) {
        return date.replace("T", " ");
    }

    //#endregion

    //#region Promotion Expier

    async ExpierPromoton(promotionId) {
        this.loadingIndicator = true;
        let data = {
            id: this.userid
        }
        var id = this.userid;
        await this.Kiss918Balance(id);
        await this.Mega888(id);
        await this.Maxbet(id);
        await this.M8(id);
        await this.AG(id);
        await this.DG(id);
        await this.Playtech(id);
        await this.Joker(id);
        await this.Sexybaccarat(id);
        await this.SA(id);
        await this.Pussy888(id);
        await this.AllBet(id);
        await this.WM(id)
        await this.Pragmatic(id)

        let balanceRestore = {
            kiss918wallet: this.kiss918balance == null ? 0.0 : this.kiss918balance,
            maxbetwallet: this.Maxbetbalance == null ? 0.0 : this.Maxbetbalance,
            jokerwallet: this.Jokerbalance == null ? 0.0 : this.Jokerbalance,
            agwallet: this.AGbalance == null ? 0.0 : this.AGbalance,
            m8wallet: this.M8balance == null ? 0.0 : this.M8balance,
            playtechwallet: this.Playtechbalance == null ? 0.0 : this.Playtechbalance,
            mega888wallet: this.Mega888balance == null ? 0.0 : this.Mega888balance,
            dgwallet: this.DGbalance == null ? 0.0 : this.DGbalance,
            sexywallet: this.Sexybaccaratbalance == null ? 0.0 : this.Sexybaccaratbalance,
            sawallet: this.SAbalance == null ? 0.0 : this.SAbalance,
            pussy888wallet: this.Pussy888balance == null ? 0.0 : this.Pussy888balance,
            allbetwallet: this.allbetbalance == null ? 0.0 : this.allbetbalance,
            WMwallet: this.wmbalance == null ? 0.0 : this.wmbalance,
            pragmaticwallet: this.pragmaticbalance == null ? 0.0 : this.pragmaticbalance,
            id: id
        }

        this.adminService.add<any>(account.RestoreBalance, balanceRestore).subscribe(res => {
            let promotionExpiery = {
                userId: this.userid,
                promotionId: promotionId
            }
            this.adminService.add<any>(customer.ManuallyPromotionExpiery, promotionExpiery).subscribe(res => {
                this.loadingIndicator = false;
                this.toasterService.pop('success', 'Success', res.message);
            }, error => {
                this.loadingIndicator = false;
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        });
    }

    //#endregion

    //#region Wallet Balance
    async ManiWalletBalance(id) {

        let data = {
            id: id
        }
        this.adminService.add<any>(gameBalance.walletBalance, data).subscribe(res => {
            var balance = res.data.filter(x => x.walletName == "Main Wallet");
            this.userWalletBalance = balance[0].amount;
        })
    }

    async Kiss918Balance(id) {
        let data = {
            id: id,
            username: this.kiss918Username
        }
        this.adminService.add<any>(gameBalance.Kiss918, data).subscribe(res => {
            this.kiss918balance = res.data.balance;
        })
    }

    async Mega888(id) {
        let data = {
            id: id,
            username: this.mega888Username
        }
        this.adminService.add<any>(gameBalance.Mega888, data).subscribe(res => {
            this.Mega888balance = res.data.balance;
        })
    }

    async Maxbet(id) {
        let data = {
            id: id,
            username: this.maxbetUsername
        }
        this.adminService.add<any>(gameBalance.Maxbet, data).subscribe(res => {
            this.Maxbetbalance = res.data.balance;
        })
    }

    async M8(id) {
        let data = {
            id: id,
            username: this.m8Username
        }
        this.adminService.add<any>(gameBalance.m8, data).subscribe(res => {
            this.M8balance = res.data.balance;
        })
    }

    async AG(id) {
        let data = {
            id: id,
            username: this.agUsername
        }
        this.adminService.add<any>(gameBalance.AG, data).subscribe(res => {
            this.AGbalance = res.data.balance;
        })
    }

    async DG(id) {
        let data = {
            id: id,
            username: this.dgUsername
        }
        this.adminService.add<any>(gameBalance.DG, data).subscribe(res => {
            this.DGbalance = res.data.balance;
        })
    }

    async Playtech(id) {
        let data = {
            id: id,
            username: this.playtechUsername
        }
        this.adminService.add<any>(gameBalance.Playtech, data).subscribe(res => {
            this.Playtechbalance = res.data.balance;
        })
    }

    async Joker(id) {
        let data = {
            id: id,
            username: this.jokerUsername
        }
        this.adminService.add<any>(gameBalance.Joker, data).subscribe(res => {
            this.Jokerbalance = res.data.balance;
        })
    }

    async Sexybaccarat(id) {
        let data = {
            id: id,
            username: this.sexyUsername
        }
        this.adminService.add<any>(gameBalance.SexyBaccarat, data).subscribe(res => {
            this.Sexybaccaratbalance = res.data.balance;
        })
    }

    async SA(id) {
        let data = {
            id: id,
            username: this.saUsername
        }
        this.adminService.add<any>(gameBalance.SA, data).subscribe(res => {
            this.SAbalance = res.data.balance;
        })
    }

    async Pussy888(id) {
        let data = {
            id: id,
            username: this.pussyUsername
        }
        this.adminService.add<any>(gameBalance.Pussy888, data).subscribe(res => {
            this.Pussy888balance = res.data.balance;
        })
    }

    async AllBet(id) {
        let data = {
            id: id,
            username: this.allbetUsername,
            password: this.userPassword
        }
        this.adminService.add<any>(gameBalance.AllBet, data).subscribe(res => {
            this.allbetbalance = res.data.balance;
        })
    }

    async WM(id) {
        let data = {
            id: id,
            username: this.wmUsername,
        }
        this.adminService.add<any>(gameBalance.WM, data).subscribe(res => {
            this.wmbalance = res.data.balance;
        })
    }

    async Pragmatic(id) {
        let data = {
            id: id,
            username: this.pragmaticUsername,
        }
        this.adminService.add<any>(gameBalance.Pragmatic, data).subscribe(res => {
            this.pragmaticbalance = res.data.balance;
        })
    }

    //#endregion Wallet Balance

    //#region Restore Balance of user

    async RetoreBalance() {
        if (this.userid !== null && this.userid !== undefined) {
            var id = this.userid;
            await this.Kiss918Balance(id);
            await this.Mega888(id);
            await this.Maxbet(id);
            await this.M8(id);
            await this.AG(id);
            await this.DG(id);
            await this.Playtech(id);
            await this.Joker(id);
            await this.Sexybaccarat(id);
            await this.SA(id);
            await this.Pussy888(id);
            await this.AllBet(id);
            await this.WM(id)
            await this.Pragmatic(id)
            let data = {
                kiss918wallet: this.kiss918balance == null ? 0.0 : this.kiss918balance,
                maxbetwallet: this.Maxbetbalance == null ? 0.0 : this.Maxbetbalance,
                jokerwallet: this.Jokerbalance == null ? 0.0 : this.Jokerbalance,
                agwallet: this.AGbalance == null ? 0.0 : this.AGbalance,
                m8wallet: this.M8balance == null ? 0.0 : this.M8balance,
                playtechwallet: this.Playtechbalance == null ? 0.0 : this.Playtechbalance,
                mega888wallet: this.Mega888balance == null ? 0.0 : this.Mega888balance,
                dgwallet: this.DGbalance == null ? 0.0 : this.DGbalance,
                sexywallet: this.Sexybaccaratbalance == null ? 0.0 : this.Sexybaccaratbalance,
                sawallet: this.SAbalance == null ? 0.0 : this.SAbalance,
                pussy888wallet: this.Pussy888balance == null ? 0.0 : this.Pussy888balance,
                allbetwallet: this.allbetbalance == null ? 0.0 : this.allbetbalance,
                WMwallet: this.wmbalance == null ? 0.0 : this.wmbalance,
                pragmaticwallet: this.pragmaticbalance == null ? 0.0 : this.pragmaticbalance,
                id: id
            }
            this.adminService.add<any>(gameBalance.restoreBalance, data).subscribe(res => {
                this.WalletBalance(id);
            });
        }
        else {
            this.toasterService.pop('error', 'Error', "Select Username");
        }
    }

    //#endregion

    //#region Withdraw Amount List

    WithdrawAmountList(UserId) {
        let data = {
            id: UserId
        }
        this.adminService.add<any>(gameBalance.withdrawAmountList, data).subscribe(res => {
            this.totalWithdrawAmount = res.data.totalAmount;
            this.totalWithdrawAmountWithMYR = res.data.totalAmount + " MYR"

            var someElement = document.getElementById("lockIcon");
            if (res.data.totalAmount > 0)
                someElement.className += "fa fa-unlock";
            else
                someElement.className += "fa fa-lock";
            this.PromotionApplyRows = [];
            let i = 0;
            res.data.list.forEach(el => {
                this.PromotionApplyRows.push({
                    No: ++i,
                    Title: this.convertDecimal(el.title),
                    BeforePromotionbalance: this.convertDecimal(el.withdrawAmount),
                    ApplyDate: el.created,
                    Status: el.status
                });
            });
            this.PromotionApplyRows = [...this.PromotionApplyRows];
        });
    }

    //#endregion

    //#region  Open Withdraw List Dailog Box

    show(content) {
        if (this.userid != null && this.userid != undefined) {
            if (Number(this.totalWithdrawAmount) > 0)
                this.openWindowCustomClass(content);
        }
        else
            this.toasterService.pop('error', 'Error', "Select Username");
    }

    //#endregion

    //#region Open Unfinished Show Dailog Box

    unfinishedShow(content) {
        if (this.userid != null && this.userid != undefined) {
            this.openWindowCustomClass(content);
        }
        else
            this.toasterService.pop('error', 'Error', "Select Username");
    }

    //#endregion

    //#region Open Model

    openWindowCustomClass(content) {
        this.modalService.open(content, { windowClass: 'dark-modal', });
    }

    //#endregion

    //#region Broken Status Update

    UserBrokenStaus() {
        let dataPlaytech = {
            username: this.playtechUsername,
        }
        this.adminService.add<any>(customer.playtechBrokenStatus, dataPlaytech).subscribe(res => {
            this.userPlaytechUnfinished = res.data.status;
            var i = 0;
            this.unfinishedPlaytechRows = [];
            res.data.response.result.forEach(el => {
                this.unfinishedPlaytechRows.push({
                    No: ++i,
                    Playername: el.playername,
                    Bet: el.bet,
                    Brokengametype: el.brokengametype,
                    Clienttype: el.clienttype,
                    Finishedgamecode: el.finishedgamecode,
                    Finishedgamedate: el.finishedgamedate,
                    Game: el.game,
                    Gamedate: el.gamedate,
                    Infobet: el.infobet,
                    Jackpotbet: el.jackpotbet,
                    Remoteip: el.remoteip,
                    Rnum: el.rnum,
                    Status: el.status,
                });
            });
        });

        let dataPragmatic = {
            username: this.pragmaticUsername,
        }
        this.adminService.add<any>(customer.pragmaticBrokenStatus, dataPragmatic).subscribe(res => {
            this.userPragmaticUnfinished = res.data.status;
            var i = 0;
            this.unfinishedPragmaticRows = [];
            res.data.response.data.forEach(el => {
                this.unfinishedPragmaticRows.push({
                    No: ++i,
                    BetAmount: el.betAmount,
                    GameId: el.gameId,
                    PlaySessionID: el.playSessionID
                });
            });
        });


        let dataJoker = {
            id: this.userid
        }
        this.adminService.add<any>(customer.jokerBrokenStatus, dataJoker).subscribe(res => {
            this.userJokerUnfinished = res.data.BrokenStatus;
        });


    }

    //#endregion

    SelectGMT($event) {
        this.gmtlist = $event.target.value;
    }

    BettingDetails() {
        if (this.userid != null && this.userid != undefined) {

            this.loadingIndicator = true;
            this.rows = [];

            this.fromDate = this.datePipe.transform((document.getElementById("txt_fromdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss");
            this.toDate = this.datePipe.transform((document.getElementById("txt_todatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss");

            this.startdate = this.datePipe.transform((document.getElementById("txt_startdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss");

            let Model = {
                fromdate: this.fromDate,
                todate: this.toDate
            }

            if (this.selectedList !== "M8" && this.selectedList !== "DG" && this.selectedList !== "Pragmatic")
                if (Model.fromdate === null || Model.todate === null) {
                    return this.toasterService.pop('error', 'Error', "Please Select To Date and From Date");
                }

            this.setBettingDetailsColumn(this.selectedList);
            switch (this.selectedList) {
                case 'M8': {
                    this.adminService.get<any>(customer.M8BettingDetails).subscribe(res => {

                        var list = res.data.response.result.ticket.filter(s => s.u == this.m8Username)

                        this.rows = [];
                        if (res.data.response.result !== "") {
                            list.forEach(el => {
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
                            this.setBettingDetailsColumn(this.selectedList);
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
                        var list = res.data.trans.filter(s => s.user_id == this.agUsername)
                        this.rows = [];
                        if (res.data.trans !== null) {
                            list.forEach(el => {
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
                            this.setBettingDetailsColumn("");
                        }
                        this.loadingIndicator = false;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                    });
                    break;
                }
                case 'Playtech': {
                    let PlaytechModel = {
                        fromdate: this.fromDate,
                        todate: this.toDate,
                        username: this.playtechUsername
                    }
                    this.adminService.add<any>(customer.PlaytechBettingDetails, PlaytechModel).subscribe(res => {
                        this.rows = [];
                        if (res.data.length > 0) {
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
                            this.setBettingDetailsColumn("");
                        }
                        this.loadingIndicator = false;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                        this.setBettingDetailsColumn("");
                    });
                    break;
                }
                case 'Joker': {
                    let JokerModel = {
                        fromdate: this.fromDate,
                        todate: this.toDate,
                        username: this.jokerUsername
                    }
                    this.adminService.add<any>(customer.JokerBettingDetails, JokerModel ).subscribe(res => {
                        this.rows = [];
                        if (res.data.winloss.length > 0) {

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
                            this.setBettingDetailsColumn("");
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
                        var list = res.data.result.filter(s => s.loginId == this.mega888Username)
                        this.rows = [];
                        if (res.data.result.length > 0) {
                            list.forEach(el => {
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
                            this.setBettingDetailsColumn("");
                        }
                        this.loadingIndicator = false;
                    }, error => {
                        this.loadingIndicator = false;
                        this.toasterService.pop('error', 'Error', error.error.message);
                    });
                    break;
                }
                case '918 Kiss': {
                    let Kiss918Model = {
                        startDate: this.fromDate,
                        endDate: this.toDate,
                        username: this.kiss918Username,
                        saveInDB:true
                    }
                    this.adminService.add<any>(customer.Kiss918PlayerLog, Kiss918Model).subscribe(res => {
                        debugger
                        this.loadingIndicator = true;
                        this.rows = [];
                        if (res.data.results.length > 0) {
                            res.data.results.forEach(el => {
                                this.rows.push({
                                    BeginBlance: el.beginBlance,
                                    Bet: el.bet,
                                    ClassID: el.classID,
                                    Cday: el.cday,
                                    Cno: el.cno,
                                    CreateTime: el.createTime,
                                    EndBlance: el.endBlance,
                                    GameID: el.gameID,
                                    GameName: el.gameName,
                                    Id: el.id,
                                    LineNum: el.lineNum,
                                    LogDataStr: el.logDataStr,
                                    LogDataType: el.logDataType,
                                    RoundNO: el.roundNO,
                                    Rownum: el.rownum,
                                    TableID: el.tableID,
                                    Uuid: el.uuid,
                                    Win: el.win
                                });
                            });
                            this.rows = [...this.rows];
                        }
                        else {
                            this.setBettingDetailsColumn("");
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
                            
                            var list = res.data.list.filter(s => s.userName == this.dgUsername.toUpperCase())
                            list.forEach(el => {
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
                            this.setBettingDetailsColumn("");
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
                        todate: this.toDate.replace(" ", "T") + this.gmtlist,
                        username: this.sexyUsername
                    }
                    this.adminService.add<any>(customer.SexyBettingDetails, sexyModel).subscribe(res => {
                        this.rows = [];
                        if (res.data.response.transactions.length > 0) {
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
                            this.setBettingDetailsColumn("");
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
                        todate: this.toDate,
                        username: this.saUsername
                    }
                    this.adminService.add<any>(customer.SABettingDetails, saModel).subscribe(res => {
                        this.rows = [];
                        if (res.data.length > 0) {
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
                            this.setBettingDetailsColumn("");
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
                            this.setBettingDetailsColumn("");
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
                            this.setBettingDetailsColumn("");
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
                            this.setBettingDetailsColumn(this.selectedList);
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
                            this.setBettingDetailsColumn(this.selectedList);
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
        else
            this.toasterService.pop('error', 'Error', "Select Username");
    }
}