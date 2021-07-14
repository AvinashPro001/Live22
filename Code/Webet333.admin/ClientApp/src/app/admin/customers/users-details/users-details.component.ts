import { DatePipe } from '@angular/common';
import { Component, Injectable, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterService } from 'angular2-toaster';
import { account, customer, gameBalance, GameRegister, VIPSetting } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
    readonly DELIMITER = '-';

    fromModel(value: string | null): NgbDateStruct | null {
        if (value) {
            let date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[2], 10)
            };
        }
        return null;
    }

    toModel(date: NgbDateStruct | null): string | null {
        return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
    }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
    readonly DELIMITER = '/';

    parse(value: string): NgbDateStruct | null {
        if (value) {
            let date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[2], 10)
            };
        }
        return null;
    }

    format(date: NgbDateStruct | null): string {
        return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
    }
}

@Component({
    selector: 'app-users-details',
    templateUrl: './users-details.component.html',
    styleUrls: ['./users-details.component.scss'],
})

export class UsersDetailsComponent implements OnInit {
    //#region Variable and Constructor

    ShowDropDown: boolean = true;

    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('status') status: TemplateRef<any>;

    GameName: any;
    Kiss918Password: any = "XXXXXXXXXXX";
    Pussy888Password: any = "XXXXXXXXXXX";
    Kiss918PasswordRowId: any;
    Pussy888PasswordRowId: any;

    valuedate: any;

    userid: any;
    customerData: any;
    userdata: any;

    userPlaytechUnfinished: any;
    userPragmaticUnfinished: any;
    userJokerUnfinished: any;

    userWalletBalance: any;

    depositColumns: any;
    depositRows: any;
    totalRowCount = 0;
    offset = 0;

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

    unfinishedJokerColumns: any;
    unfinishedJokerRows: any;

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
    Userdata: any;
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

    datePickerfromdate: string;
    datePickertodate: string;

    vipLevelImage: any;
    vipLevel: any;

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
        { gameName: this.commonService.GameName.SBO }
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

    vipLevelList: any;

    model: NgbDateStruct;
    date: { year: number, month: number };

    bankColumns: any;
    bankRows: any;

    imagePath: any;
    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };

    YeeBetBalance: any;
    YeeBetUsername: any;

    SBOBalance: any;
    SBOUsername: any;

    constructor(
        private datePipe: DatePipe,
        private adminService: AdminService,
        private toasterService: ToasterService,
        private modalService: NgbModal,
        private ngbCalendar: NgbCalendar,
        private dateAdapter: NgbDateAdapter<string>,
        private router: Router,
        private commonService: CommonService) { }

    //#endregion

    //#region OnInit Method

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.coloumSet();

            let dataCustomer = JSON.parse(localStorage.getItem('id'));
            this.Userdata = dataCustomer as object[];
            if (this.Userdata != null) {
                if (this.Userdata.userId) this.getCustomerById(this.Userdata.userId);
                else this.getCustomerById(this.Userdata.id);

                this.ShowDropDown = false;
                // this.onChange(this.Userdata);
            }
            else {
                this.ShowDropDown = true;
                this.customerUser();
            }
            this.LoadVIPCategory();
            document.getElementById("profiletab").click();

            var someElement = document.getElementById("lockIcon");
            // localStorage.removeItem('id');   // Not remove data from local storage. Beacuse on page re-load data will not show.
        }
    }

    getCustomerById(userId) {
        var model = { id: userId };

        this.adminService.add<any>(customer.customerListById, model).subscribe(res => {
            this.Userdata = res.data[0];
            this.Userdata.registeredOn = this.replaceDateTime(this.Userdata.registeredOn);
            this.RegisteInGame(this.Userdata.id)
            this.onChange(this.Userdata);
            let i = 0;
            this.bankRows = [];
            this.Userdata.UserBankDetails.forEach(el => {
                this.bankRows.push({
                    No: ++i,
                    BankName: el.bankName,
                    BankAccountNo: el.accountNo
                });
            });
            this.bankRows = [...this.bankRows];

            this.imagePath = this.Userdata.UserICImage;

            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    get today() { return this.dateAdapter.toModel(this.ngbCalendar.getToday()); }

    LoadVIPCategory() {
        this.adminService.getAll<any>(VIPSetting.VIPLevelList).subscribe(res => {
            this.vipLevelList = res.data;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    ShowVIPLevelDailogBox(content) { this.openWindowCustomClass(content); }

    //#endregion

    //#region Betting Details Game Change Method

    onGameChange($event) {
        this.commonService.setDateOtherPicker(new Date(), new Date());

        this.selectedList = $event.target.value;

        if (this.selectedList === this.commonService.GameName.M8 ||
            this.selectedList === this.commonService.GameName.DG ||
            this.selectedList === this.commonService.GameName.PragmaticPlay ||
            this.selectedList === this.commonService.GameName.YeeBet) {
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

        if (this.selectedList === this.commonService.GameName.PragmaticPlay) {
            (document.getElementById("startDate") as HTMLInputElement).style.display = "";
            (document.getElementById("todayFilter") as HTMLInputElement).style.display = "";
            (document.getElementById("yesterdayFilter") as HTMLInputElement).style.display = "";
            (document.getElementById("thisWeekFilter") as HTMLInputElement).style.display = "";
            (document.getElementById("thisYearFilter") as HTMLInputElement).style.display = "";
        }

        if (this.selectedList === this.commonService.GameName.SexyBaccarat) {
            this.gmtDisable = false;
            (document.getElementById("gmtDiv") as HTMLInputElement).style.display = "";
        }
    }

    //#endregion

    //#region onChange

    onChange(event) {
        try {
            if (event.userId) this.newVal = event.userId;
            else this.newVal = event.id;
            this.vipLevelImage = event.VIPLevelName == "Normal" ? "" : event.VIPBanner;
            this.vipLevel = event.VIPLevelName;

            this.userPassword = event.password;
            this.Pussy888PasswordRowId = null;
            this.Kiss918PasswordRowId = null;
            this.OnType(event);
            this.datePickerfromdate = this.today;
            this.datePickertodate = this.today;
        }
        catch {
            this.vipLevelImage = "";
            this.vipLevel = "";
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
            this.Pussy888PasswordRowId = null;
            this.Kiss918PasswordRowId = null;
        }
    }

    onChangeDropDown(event) {
        try {
            this.newVal = event.value.id;

            this.vipLevelImage = event.value.VIPLevelName == "Normal" ? "" : event.value.VIPBanner;
            this.vipLevel = event.value.VIPLevelName;

            this.userPassword = event.value.password;
            this.Pussy888PasswordRowId = null;
            this.Kiss918PasswordRowId = null;
            this.OnTypeDropDown(this.newVal);
            this.datePickerfromdate = this.today;
            this.datePickertodate = this.today;
        }
        catch {
            this.vipLevelImage = "";
            this.vipLevel = "";
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
            this.Pussy888PasswordRowId = null;
            this.Kiss918PasswordRowId = null;
        }
    }

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

    OnType(list) {
        //let list = this.customerData.filter(x => x.id === event)[0];

        if (list != undefined) {
            if (list.userId) this.userid = list.userId;
            else this.userid = list.id;
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

    OnTypeDropDown(event) {
        this.customerUser();
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
            this.YeeBetUsername = res.data.yeeBetUsername;
            this.SBOUsername = res.data.sboUsername;
            this.WalletBalance(id);
            this.UserBrokenStaus();
        });
    }

    //#endregion

    //#region onChange

    convertDecimal(Balance) {
        if (Balance != null) return Number(Balance).toFixed(2);
        else return "N/A"
    }

    //#endregion

    //#region onclick page set in tab menu

    openPage(pageName, elmnt) {
        this.datePickerfromdate = this.today
        this.datePickertodate = this.today

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

        this.OpenPageLoadData(pageName);
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
            //{ prop: 'WinTurn' },
            { prop: 'TurnoverTarget' },
            //{ prop: 'WinTarget' },
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

        this.unfinishedJokerColumns = [
            { prop: 'Username' },
            { prop: 'Credit' },
            { prop: 'OutstandingCredit' },
            { prop: 'FreeCredit' },
            { prop: 'OutstandingFreeCredit' }
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

        this.bankColumns = [
            { prop: 'No' },
            { prop: 'BankName' },
            { prop: 'BankAccountNo' }
        ]
    }

    setBettingDetailsColumn(selectedList) {
        if (selectedList == this.commonService.GameName.M8) {
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
        else {
            this.columns = [];
        }
    }

    //#endregion

    //#region Filter data

    OpenPageLoadData(Tab) {
        if (this.userid !== undefined && this.userid !== "") {
            if (Tab === "Deposit") { this.isFilter = false; this.depositlist(null, null); }
            if (Tab === "Withdraw") this.withdrawlist(null, null);
            if (Tab === "Transfer") this.transferlist(null, null);
            if (Tab === "Promotion") this.promotionlist(null, null);
            if (Tab === "Rebate") this.rebatelist(null, null);
            if (Tab === "Statement") this.statementlist(null, null);
            if (Tab === "Restore") { this.restorelist(); }
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

    setDatePicker(fromdate = null, todate = null) {
        this.datePickerfromdate = this.commonService.setDatePickerFormate(fromdate);
        this.datePickertodate = this.commonService.setDatePickerFormate(todate);
    }

    isFilter = false;

    setToday(Tab) {
        if (this.userid !== undefined && this.userid !== "" && this.userid !== null) {
            var dates = this.commonService.getTodatDate();
            var fromdate = dates.fromdate;
            var todate = dates.todate;

            this.setDatePicker(new Date(fromdate), new Date(todate));
            this.commonService.setDateOtherPicker(new Date(fromdate), new Date(todate));

            if (Tab === "Deposit") { this.isFilter = true; this.depositlist(fromdate, todate); }
            if (Tab === "Withdraw") this.withdrawlist(fromdate, todate);
            if (Tab === "Transfer") this.transferlist(fromdate, todate);
            if (Tab === "Promotion") this.promotionlist(fromdate, todate);
            if (Tab === "Rebate") this.rebatelist(fromdate, todate);
            if (Tab === "Statement") this.statementlist(fromdate, todate);
            if (Tab === "BettingDetails") this.BettingDetails(fromdate, todate);
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

            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SelectUserName);
        }
    }

    setYesterday(Tab) {
        if (this.userid !== undefined && this.userid !== "" && this.userid !== null) {
            var dates = this.commonService.getYesterDate();
            var fromdate = dates.fromdate;
            var todate = dates.todate;

            this.setDatePicker(new Date(fromdate), new Date(todate));
            this.commonService.setDateOtherPicker(new Date(fromdate), new Date(todate));

            if (Tab === "Deposit") { this.isFilter = true; this.depositlist(fromdate, todate); }
            if (Tab === "Withdraw") this.withdrawlist(fromdate, todate);
            if (Tab === "Transfer") this.transferlist(fromdate, todate);
            if (Tab === "Promotion") this.promotionlist(fromdate, todate);
            if (Tab === "Rebate") this.rebatelist(fromdate, todate);
            if (Tab === "Statement") this.statementlist(fromdate, todate);
            if (Tab === "BettingDetails") this.BettingDetails(fromdate, todate);
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

            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SelectUserName);
        }
    }

    setThisWeek(Tab) {
        if (this.userid !== undefined && this.userid !== "" && this.userid !== null) {
            var dates = this.commonService.getThisWeekDate();
            var fromdate = dates.fromdate;
            var todate = dates.todate;

            this.setDatePicker(new Date(fromdate), new Date(todate));
            this.commonService.setDateOtherPicker(new Date(fromdate), new Date(todate));

            if (Tab === "Deposit") { this.isFilter = true; this.depositlist(fromdate, todate); }
            if (Tab === "Withdraw") this.withdrawlist(fromdate, todate);
            if (Tab === "Transfer") this.transferlist(fromdate, todate);
            if (Tab === "Promotion") this.promotionlist(fromdate, todate);
            if (Tab === "Rebate") this.rebatelist(fromdate, todate);
            if (Tab === "Statement") this.statementlist(fromdate, todate);
            if (Tab === "BettingDetails") this.BettingDetails(fromdate, todate);
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

            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SelectUserName);
        }
    }

    setThisYear(Tab) {
        if (this.userid !== undefined && this.userid !== "" && this.userid !== null) {
            var dates = this.commonService.getThisYearDate();
            var fromdate = dates.fromdate;
            var todate = dates.todate;

            this.setDatePicker(new Date(fromdate), new Date(todate));
            this.commonService.setDateOtherPicker(new Date(fromdate), new Date(todate));

            if (Tab === "Deposit") { this.isFilter = true; this.depositlist(fromdate, todate); }
            if (Tab === "Withdraw") this.withdrawlist(fromdate, todate);
            if (Tab === "Transfer") this.transferlist(fromdate, todate);
            if (Tab === "Promotion") this.promotionlist(fromdate, todate);
            if (Tab === "Rebate") this.rebatelist(fromdate, todate);
            if (Tab === "Statement") this.statementlist(fromdate, todate);
            if (Tab === "BettingDetails") this.BettingDetails(fromdate, todate);
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

            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SelectUserName);
        }
    }

    searchHandlerByDate(Tab) {
        if (this.userid !== undefined && this.userid !== "") {
            var fromdate, todate;
            if (Tab === "Deposit") {
                this.isFilter = true
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

            if (Tab === "Restore") this.restorelist();
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
        this.WM(id);
        this.Pragmatic(id);
        this.YeeBet(id);
        this.SBO(id);
    }

    //#endregion

    //#region Registe User

    RegisteInGame(Id) {
        try {
            let data = {
                id: Id
            }

            this.adminService.add<any>(GameRegister.selectUser, data).subscribe(res => {
                //#region AG Game Register

                if (!res.data.AG) {
                    try {
                        this.adminService.add<any>(GameRegister.registerAG, data).subscribe(res => {
                            this.getUsername(Id);
                            this.AG(Id);
                        });
                    }
                    catch (e) { }
                }

                //#endregion

                //#region DG Game Register

                if (!res.data.DG) {
                    try {
                        this.adminService.add<any>(GameRegister.registerDG, data).subscribe(res => {
                            this.getUsername(Id);
                            this.DG(Id);
                        });
                    }
                    catch (e) { }
                }

                //#endregion

                //#region AllBet Game Register

                if (!res.data.AllBet) {
                    try {
                        this.adminService.add<any>(GameRegister.registerAllBet, data).subscribe(res => {
                            this.getUsername(Id);
                            this.AllBet(Id);
                        });
                    }
                    catch (e) { }
                }

                //#endregion

                //#region Joker Game Register

                if (!res.data.Joker) {
                    try {
                        this.adminService.add<any>(GameRegister.registerJoker, data).subscribe(res => {
                            this.getUsername(Id);
                            this.Joker(Id);
                        });
                    }
                    catch (e) { }
                }

                //#endregion

                //#region M8 Game Register

                if (!res.data.M8) {
                    try {
                        this.adminService.add<any>(GameRegister.registerM8, data).subscribe(res => {
                            this.getUsername(Id);
                            this.M8(Id);
                        });
                    }
                    catch (e) { }
                }

                //#endregion

                //#region Mega888 Game Register

                if (!res.data.Mega888) {
                    try {
                        this.adminService.add<any>(GameRegister.registerMega888, data).subscribe(res => {
                            this.getUsername(Id);
                            this.Mega888(Id);
                        });
                    }
                    catch (e) { }
                }

                //#endregion

                //#region Playtech Game Register

                if (!res.data.Playtech) {
                    try {
                        this.adminService.add<any>(GameRegister.registerPlaytech, data).subscribe(res => {
                            this.getUsername(Id);
                            this.Playtech(Id);
                        });
                    }
                    catch (e) { }
                }

                //#endregion

                //#region Pragmatic Game Register

                if (!res.data.Pragmatic) {
                    try {
                        this.adminService.add<any>(GameRegister.registerPragmatic, data).subscribe(res => {
                            this.getUsername(Id);
                            this.Pragmatic(Id);
                        });
                    }
                    catch (e) { }
                }

                //#endregion

                //#region Pussy888 Game Register

                if (!res.data.Pussy888) {
                    try {
                        this.adminService.add<any>(GameRegister.registerPussy888, data).subscribe(res => {
                            this.getUsername(Id);
                            this.Pussy888(Id);
                        });
                    }
                    catch (e) { }
                }

                //#endregion

                //#region SA Game Register

                if (!res.data.SA) {
                    try {
                        this.adminService.add<any>(GameRegister.registerSA, data).subscribe(res => {
                            this.getUsername(Id);
                            this.SA(Id);
                        });
                    }
                    catch (e) { }
                }

                //#endregion

                //#region SexyBaccarat Game Register

                if (!res.data.SexyBaccarat) {
                    try {
                        this.adminService.add<any>(GameRegister.registerSexy, data).subscribe(res => {
                            this.getUsername(Id);
                            this.Sexybaccarat(Id);
                        });
                    }
                    catch (e) { }
                }

                //#endregion

                //#region WM Game Register

                if (!res.data.WM) {
                    try {
                        this.adminService.add<any>(GameRegister.registerWM, data).subscribe(res => {
                            this.getUsername(Id);
                            this.WM(Id);
                        });
                    }
                    catch (e) { }
                }

                //#endregion

                //#region Kiss 918 Game Register

                if (!res.data._918Kiss) {
                    try {
                        this.adminService.add<any>(GameRegister.register918Kiss, data).subscribe(res => {
                            this.getUsername(Id);
                            this.Kiss918Balance(Id);
                        });
                    }
                    catch (e) { }
                }

                //#endregion

                //#region Maxbet Game Register

                if (!res.data.MaxBet) {
                    try {
                        let maxbetModel = {
                            userid: Id,
                            firstname: this.userdata.name,
                            lastname: "Webet333"
                        }
                        this.adminService.add<any>(GameRegister.registerMaxBet, maxbetModel).subscribe(res => {
                            this.getUsername(Id);
                            this.Maxbet(Id);
                        });
                    }
                    catch (e) { }
                }

                //#endregion

                //#region YeeBet Game Register

                if (!res.data.YeeBet) {
                    try {
                        this.adminService.add<any>(GameRegister.registerYeeBet, data).subscribe(res => {
                            this.getUsername(Id);
                            this.YeeBet(Id);
                        });
                    }
                    catch (e) { }
                }

                //#endregion

                //#region SBO Game Register

                if (!res.data.SBO) {
                    try {
                        this.adminService.add<any>(GameRegister.registerSBO, data).subscribe(res => {
                            this.getUsername(Id);
                            this.SBO(Id);
                        });
                    }
                    catch (e) { }
                }

                //#endregion
            })
        }
        catch (e) { }
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

    pageNumber = 0;
    depositlist(fromdate, todate) {
        this.loadingIndicator = true;
        let data = {
            userId: this.userid,
            fromDate: fromdate,
            toDate: todate,
            pageNo: this.pageNumber,
            pageSize: 20
        }
        this.adminService.add<any>(customer.depositList, data).subscribe(res => {
            this.depositRows = [];
            //let i = 0;
            let i = ((this.pageNumber + 1) * 20) - 20;
            this.offset = res.data.offset;
            this.totalRowCount = res.data.total;

            res.data.result.forEach(el => {
                this.depositRows.push({
                    No: ++i,
                    WalletName: el.walletName,
                    BankName: el.bankName,
                    DepositMethod: el.depositMethod,
                    Amount: el.amount,
                    Created: this.replaceDateTime(el.created),
                    PromotionTitle: el.promotionTitle == null ? "<b class='notAvailable'>Not Available</b>" : el.promotionTitle,
                    Verified: "<b class='" + el.verified.toLowerCase() + "'>" + el.verified + "</b>",
                });
            });
            this.depositRows = [...this.depositRows];
            this.loadingIndicator = false;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;
        });
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
                    Status: "<b class='" + el.verified.toLowerCase() + "'>" + el.verified + "</b>",
                    AccountNo: el.accountNo,
                    Created: this.replaceDateTime(el.created),
                    AdminRemark: el.adminRemarks == null ? "<b class='notAvailable'>Not Available</b>" : el.adminRemarks,
                });
            });
            this.withdrawRows = [...this.withdrawRows];
            this.loadingIndicator = false;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;
        });
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
            this.loadingIndicator = false;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;
        });
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
                    //WinTurn: el.WinTurn,
                    TurnoverTarget: el.TurnoverTarget,
                    //WinTarget: el.TurnTarget,
                    RemaininggDay: el.RemainingDay,
                    ExpieryDate: this.replaceDateTime(el.ExpiryDate),
                    Created: this.replaceDateTime(el.Created),
                    Status: "<b class='" + el.Staus.toLowerCase() + "'>" + el.Staus + "</b>",
                });
            });
            this.promotionRows = [...this.promotionRows];
            this.loadingIndicator = false;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;
        });
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
                    GameName: el.gameName,
                    Turnover: el.turnover,
                    Rolling: el.rolling,
                    Bet: el.bet,
                    WinLose: el.winLose,
                    CommAmount: el.commAmount,
                    Created: this.replaceDateTime(el.created),
                });
            });
            this.rebateRows = [...this.rebateRows];
            this.loadingIndicator = false;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;
        });
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
            this.loadingIndicator = false;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;
        });
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
            this.loadingIndicator = false;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message)
            this.loadingIndicator = false;
        });
    }

    //#endregion User Rebate List

    //#region Replace Time

    replaceDateTime(date) { return date.replace("T", " "); }

    //#endregion

    //#region Promotion Expier

    async ExpierPromoton(promotionId) {
        if (await this.checkUpdatePermission()) {
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
            await this.WM(id);
            await this.Pragmatic(id);
            await this.YeeBet(id);
            await this.SBO(id);

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
                YeeBetWallet: this.YeeBetBalance == null ? 0.0 : this.YeeBetBalance,
                SBOWallet: this.SBOBalance == null ? 0.0 : this.SBOBalance,
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
    }

    //#endregion

    //#region Wallet Balance

    async ManiWalletBalance(id) {
        try {
            let data = {
                id: id
            }
            this.adminService.add<any>(gameBalance.walletBalance, data).subscribe(res => {
                var balance = res.data.filter(x => x.walletName == "Main Wallet");
                this.userWalletBalance = balance[0].amount;
            })
        }
        catch (e) { }
    }

    async Kiss918Balance(id) {
        try {
            let data = {
                id: id,
                username: this.kiss918Username
            }
            this.adminService.add<any>(gameBalance.Kiss918, data).subscribe(res => {
                this.kiss918balance = res.data.balance;
            })
        }
        catch (e) { }
    }

    async Mega888(id) {
        try {
            let data = {
                id: id,
                username: this.mega888Username
            }
            this.adminService.add<any>(gameBalance.Mega888, data).subscribe(res => {
                this.Mega888balance = res.data.balance;
            })
        }
        catch (e) { }
    }

    async Maxbet(id) {
        try {
            let data = {
                id: id,
                username: this.maxbetUsername
            }
            this.adminService.add<any>(gameBalance.Maxbet, data).subscribe(res => {
                this.Maxbetbalance = res.data.balance;
            })
        }
        catch (e) { }
    }

    async M8(id) {
        try {
            let data = {
                id: id,
                username: this.m8Username
            }
            this.adminService.add<any>(gameBalance.m8, data).subscribe(res => {
                this.M8balance = res.data.balance;
            })
        }
        catch (e) { }
    }

    async AG(id) {
        try {
            let data = {
                id: id,
                username: this.agUsername
            }
            this.adminService.add<any>(gameBalance.AG, data).subscribe(res => {
                this.AGbalance = res.data.balance;
            })
        }
        catch (e) { }
    }

    async DG(id) {
        try {
            let data = {
                id: id,
                username: this.dgUsername
            }
            this.adminService.add<any>(gameBalance.DG, data).subscribe(res => {
                this.DGbalance = res.data.balance;
            })
        }
        catch (e) { }
    }

    async Playtech(id) {
        try {
            let data = {
                id: id,
                username: this.playtechUsername
            }
            this.adminService.add<any>(gameBalance.Playtech, data).subscribe(res => {
                this.Playtechbalance = res.data.balance;
            })
        }
        catch (e) { }
    }

    async Joker(id) {
        try {
            let data = {
                id: id,
                username: this.jokerUsername
            }
            this.adminService.add<any>(gameBalance.Joker, data).subscribe(res => {
                this.Jokerbalance = res.data.balance;
            })
        }
        catch (e) { }
    }

    async Sexybaccarat(id) {
        try {
            let data = {
                id: id,
                username: this.sexyUsername
            }
            this.adminService.add<any>(gameBalance.SexyBaccarat, data).subscribe(res => {
                this.Sexybaccaratbalance = res.data.balance;
            })
        }
        catch (e) { }
    }

    async SA(id) {
        try {
            let data = {
                id: id,
                username: this.saUsername
            }
            this.adminService.add<any>(gameBalance.SA, data).subscribe(res => {
                this.SAbalance = res.data.balance;
            })
        }
        catch (e) { }
    }

    async Pussy888(id) {
        try {
            let data = {
                id: id,
                username: this.pussyUsername
            }
            this.adminService.add<any>(gameBalance.Pussy888, data).subscribe(res => {
                this.Pussy888balance = res.data.balance;
            })
        }
        catch (e) { }
    }

    async AllBet(id) {
        try {
            let data = {
                id: id,
                username: this.allbetUsername,
                password: this.userPassword
            }
            this.adminService.add<any>(gameBalance.AllBet, data).subscribe(res => {
                this.allbetbalance = res.data.balance;
            })
        }
        catch (e) { }
    }

    async WM(id) {
        try {
            let data = {
                id: id,
                username: this.wmUsername,
            }
            this.adminService.add<any>(gameBalance.WM, data).subscribe(res => {
                this.wmbalance = res.data.balance;
            })
        }
        catch (e) { }
    }

    async Pragmatic(id) {
        try {
            let data = {
                id: id,
                username: this.pragmaticUsername,
            }
            this.adminService.add<any>(gameBalance.Pragmatic, data).subscribe(res => {
                this.pragmaticbalance = res.data.balance;
            })
        }
        catch (e) { }
    }

    async YeeBet(id) {
        try {
            let data = {
                id: id,
                username: this.YeeBetUsername,
            }
            this.adminService.add<any>(gameBalance.YeeBet, data).subscribe(res => {
                this.YeeBetBalance = res.data.balance;
            })
        }
        catch (e) { }
    }

    async SBO(id) {
        try {
            let data = {
                id: id,
                username: this.SBOUsername,
            }
            this.adminService.add<any>(gameBalance.SBO, data).subscribe(res => {
                this.SBOBalance = res.data.balance;
            })
        }
        catch (e) { }
    }

    //#endregion Wallet Balance

    //#region Restore Balance of user

    async RetoreBalance() {
        if (await this.checkUpdatePermission()) {
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
                await this.WM(id);
                await this.Pragmatic(id);
                await this.YeeBet(id);
                await this.SBO(id);

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
                    YeeBetwallet: this.YeeBetBalance == null ? 0.0 : this.YeeBetBalance,
                    SBOwallet: this.SBOBalance == null ? 0.0 : this.SBOBalance,
                    id: id
                }
                this.adminService.add<any>(gameBalance.restoreBalance, data).subscribe(res => {
                    this.WalletBalance(id);
                });
            }
            else {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SelectUserName);
            }
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
        else this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SelectUserName);
    }

    //#endregion

    //#region Open Unfinished Show Dailog Box

    async unfinishedShow(content) {
        if (await this.checkUpdatePermission()) {
            if (this.userid != null && this.userid != undefined) {
                this.openWindowCustomClass(content);
            }
            else this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SelectUserName);
        }
    }

    //#endregion

    //#region Manager password Show Dailog Box

    async ManagerPasswordVerifiedShow(content, GameName) {
        if (await this.checkUpdatePermission()) {
            if (this.userid != null && this.userid != undefined) {
                this.openWindowCustomClass(content);
                this.GameName = GameName;
            }
            else this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SelectUserName);
        }
    }

    //#endregion

    //#region Open Model

    openWindowCustomClass(content) {
        if (this.userid != null && this.userid != undefined) {
            this.modalService.open(content, { windowClass: 'dark-modal', });
        }
        else this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SelectUserName);
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
            if (res.data.response.result != null) {
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
            }
        });

        let dataPragmatic = {
            username: this.pragmaticUsername,
        }
        this.adminService.add<any>(customer.pragmaticBrokenStatus, dataPragmatic).subscribe(res => {
            this.userPragmaticUnfinished = res.data.status;
            var i = 0;
            this.unfinishedPragmaticRows = [];
            if (res.data.response.data != null) {
                res.data.response.data.forEach(el => {
                    this.unfinishedPragmaticRows.push({
                        No: ++i,
                        BetAmount: el.betAmount,
                        GameId: el.gameId,
                        PlaySessionID: el.playSessionID
                    });
                });
            }
        });

        let dataJoker = {
            id: this.userid
        }
        this.adminService.add<any>(customer.jokerBrokenStatus, dataJoker).subscribe(res => {
            this.userJokerUnfinished = res.data.BrokenStatus;
        });

        let dataJokerDetails = {
            username: this.jokerUsername
        }
        this.adminService.add<any>(customer.jokerBrokenStatusDetails, dataJokerDetails).subscribe(res => {
            this.unfinishedJokerRows = [];
            this.unfinishedJokerRows.push({
                Username: res.data.Username,
                Credit: res.data.Credit,
                OutstandingCredit: res.data.OutstandingCredit,
                FreeCredit: res.data.FreeCredit,
                OutstandingFreeCredit: res.data.OutstandingFreeCredit,
            });
        });
    }

    //#endregion

    //#region Select GMT

    SelectGMT($event) { this.gmtlist = $event.target.value; }

    //#endregion

    //#region bettingDetails

    BettingDetails(startingDate = null, endingDate = null) {
        if (this.userid != null && this.userid != undefined) {
            this.loadingIndicator = true;
            this.rows = [];
            this.fromDate = startingDate === null ? this.datePipe.transform((document.getElementById("txt_fromdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss") : startingDate;
            this.toDate = endingDate === null ? this.datePipe.transform((document.getElementById("txt_todatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss") : endingDate;
            this.startdate = startingDate === null ? this.datePipe.transform((document.getElementById("txt_startdatetime") as HTMLInputElement).value, "yyyy-MM-dd HH:mm:ss") : startingDate;

            let Model = {
                fromdate: this.fromDate,
                todate: this.toDate
            }

            if (this.selectedList !== this.commonService.GameName.M8 &&
                this.selectedList !== this.commonService.GameName.DG &&
                this.selectedList !== this.commonService.GameName.PragmaticPlay &&
                this.selectedList !== this.commonService.GameName.YeeBet)
                if (Model.fromdate === null || Model.todate === null) {
                    return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectToDateAndFromDate);
                }

            this.setBettingDetailsColumn(this.selectedList);
            switch (this.selectedList) {
                case this.commonService.GameName.M8: {
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
                case this.commonService.GameName.AG: {
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
                case this.commonService.GameName.Playtech: {
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
                case this.commonService.GameName.Joker: {
                    let JokerModel = {
                        fromdate: this.fromDate,
                        todate: this.toDate,
                        username: this.jokerUsername
                    }
                    this.adminService.add<any>(customer.JokerBettingDetails, JokerModel).subscribe(res => {
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
                case this.commonService.GameName.Mega888: {
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
                case this.commonService.GameName._918Kiss: {
                    let Kiss918Model = {
                        startDate: this.fromDate,
                        endDate: this.toDate,
                        username: this.kiss918Username,
                        saveInDB: true
                    }
                    this.adminService.add<any>(customer.Kiss918PlayerLog, Kiss918Model).subscribe(res => {
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
                case this.commonService.GameName.DG: {
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
                case this.commonService.GameName.SexyBaccarat: {
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
                case this.commonService.GameName.SA: {
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
                case this.commonService.GameName.Pussy888: {
                    let pussy888Model = {
                        startDate: this.fromDate,
                        endDate: this.toDate,
                        username: this.pussyUsername,
                        saveInDB: true
                    }
                    this.adminService.add<any>(customer.Pussy888PlayerLog, pussy888Model).subscribe(res => {
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
                case this.commonService.GameName.AllBet: {
                    let allbetModel = {
                        fromdate: this.fromDate,
                        todate: this.toDate
                    }
                    this.adminService.add<any>(customer.AllBetBettingDetails, allbetModel).subscribe(res => {
                        var list = res.data.histories.filter(s => s.client == this.allbetUsername.toLowerCase())
                        this.rows = [];
                        if (res.data.histories.length > 0) {
                            list.forEach(el => {
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
                case this.commonService.GameName.WM: {
                    let wmModel = {
                        fromdate: this.fromDate,
                        todate: this.toDate,
                        username: this.wmUsername
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
                case this.commonService.GameName.PragmaticPlay: {
                    let pragmaticModel = {
                        startTime: this.startdate,
                    }
                    this.adminService.add<any>(customer.PragmaticBettingDetails, pragmaticModel).subscribe(res => {
                        this.rows = [];
                        var list = res.data.filter(s => s.extPlayerID == this.m8Username)
                        if (res.data.length > 0) {
                            list.forEach(el => {
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
                case this.commonService.GameName.YeeBet: {
                    this.adminService.get<any>(customer.YeeBetBettingDetails).subscribe(res => {
                        if (res.data.arraysize > 0) {
                            var list = res.data.array.filter(s => s.username == this.YeeBetUsername)
                            this.rows = [];

                            list.forEach(el => {
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
                case this.commonService.GameName.SBO: {
                    let model = {
                        fromdate: this.fromDate,
                        todate: this.toDate,
                        username: this.SBOUsername
                    };
                    this.adminService.add<any>(customer.SBOBettingDetails, model).subscribe(res => {
                        if (res.data.error.id == 0 &&
                            res.data.result.length > 0) {
                            //let list = res.data.result.filter(s => s.username == this.SBOUsername)
                            this.rows = [];

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
                        else this.setBettingDetailsColumn(this.selectedList);

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
        else this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SelectUserName);
    }

    //ManageDateTime(dateTime, hr) {
    //    try {
    //        var temp = new Date(dateTime);
    //        let temp1 = temp.setHours(temp.getHours() + hr);

    //        let temp2 = Date.parse(dateTime);
    //        //let temp3 = temp2.setHours(temp2.getHours() + hr);

    //        console.log({
    //            datetime: dateTime,
    //            temp: temp,
    //            hr: hr,
    //            temp1: temp1,
    //            temp2: temp2
    //        });

    //        return temp1
    //    }
    //    catch (e) {
    //        console.log(e.message);
    //        return dateTime;
    //    }
    //}

    //#endregion bettingDetails

    //#region Slots game Password Show

    GamePasswordShow() {
        if (this.userid != null && this.userid != undefined) {
            var Username = ((document.getElementById("txt_managerUsername") as HTMLInputElement).value)
            var Password = ((document.getElementById("txt_managerPassword") as HTMLInputElement).value)

            if (Username == "") return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.UsernameRequired);
            if (Password == "") return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PasswordRequired);

            let data = {
                id: this.userid,
                managerUsername: Username,
                managerPassword: Password,
                gameName: this.GameName
            }
            this.adminService.add<any>(customer.managerApprovalShowPassword, data).subscribe(res => {
                if (this.GameName == "Pussy888") {
                    this.Pussy888Password = res.data[0].PasswordPussy888;
                    this.Pussy888PasswordRowId = res.data[0].RowId;
                }

                if (this.GameName == "Kiss918") {
                    this.Kiss918Password = res.data[0].PasswordKiss918;
                    this.Kiss918PasswordRowId = res.data[0].RowId;
                }
            }, error => {
                this.modalService.dismissAll();
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
        else this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SelectUserName);
    }

    //#endregion

    //#region Reset Password

    async ResetPassword(GameName) {
        if (await this.checkUpdatePermission()) {
            if (this.userid != null && this.userid != undefined) {
                if (GameName == "Pussy888") {
                    let data = {
                        userId: this.userid,
                        gameUsername: this.pussyUsername,
                        gamePassword: this.Pussy888Password,
                        username: this.userdata.username,
                        rowId: this.Pussy888PasswordRowId,
                        password: this.userPassword
                    }
                    this.adminService.add<any>(customer.pussy888PasswordReset, data).subscribe(res => {
                        this.toasterService.pop('success', 'Success', res.message);
                    }, error => {
                        this.modalService.dismissAll();
                        this.toasterService.pop('error', 'Error', error.error.message);
                    });
                }

                if (GameName == "Kiss918") {
                    let data = {
                        userId: this.userid,
                        gameUsername: this.kiss918Username,
                        gamePassword: this.Kiss918Password,
                        username: this.userdata.username,
                        rowId: this.Kiss918PasswordRowId,
                        password: this.userPassword
                    }
                    this.adminService.add<any>(customer.kiss918PasswordReset, data).subscribe(res => {
                        this.toasterService.pop('success', 'Success', res.message);
                    }, error => {
                        this.modalService.dismissAll();
                        this.toasterService.pop('error', 'Error', error.error.message);
                    });
                }
            }
            else this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SelectUserName);
        }
    }

    //#endregion

    //#region VIP Level Update

    VIPLevelUpdate() {
        if (this.userid != null && this.userid != undefined) {
            var Username = ((document.getElementById("txt_managerUsername") as HTMLInputElement).value)
            var Password = ((document.getElementById("txt_managerPassword") as HTMLInputElement).value)
            var vipLevel = ((document.getElementById("vipLevel") as HTMLInputElement).value)

            if (Username == "") return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.UsernameRequired);
            if (Password == "") return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PasswordRequired);
            if (vipLevel == "") return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.VIPLevelRequired);

            var vipLevelId = this.vipLevelList.filter(x => x.Name == vipLevel);

            let data = {
                userId: this.userid,
                managerUsername: Username,
                managerPassword: Password,
                levelId: vipLevelId[0].Id
            }
            this.adminService.add<any>(VIPSetting.UserVIPLevelUpdate, data).subscribe(res => {
                this.toasterService.pop('success', 'Successfully', res.message);
                this.modalService.dismissAll();
                this.ngOnInit();
            }, error => {
                this.modalService.dismissAll();
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
        else this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SelectUserName);
    }

    //#endregion

    //#region Check Permission

    // This page removed from menubar so we directly return tru for this page permission.

    async checkViewPermission() {
        return true;

        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[0].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[0].submenu[2].Permissions[0].IsChecked === true) {
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
        return true;

        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[0].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[0].submenu[2].Permissions[1].IsChecked === true) {
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
        return true;

        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[0].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[0].submenu[2].Permissions[2].IsChecked === true) {
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

    //#region Open IC imahe in new tab

    ImageOpenNewTab(ImageUrl) {
        window.open(ImageUrl, 'Image', 'width=largeImage.stylewidth,height=largeImage.style.height,resizable=1');
    }

    //#endregion Open IC imahe in new tab

    setPage(pageInfo) {
        this.pageNumber = pageInfo.offset;
        if (this.isFilter) {
            var fromdate, todate;
            fromdate = (document.getElementById("d_fromdatetime") as HTMLInputElement).value;
            todate = (document.getElementById("d_todatetime") as HTMLInputElement).value;
            this.depositlist(fromdate == "" ? null : fromdate, todate == "" ? null : todate);
        }
        else this.depositlist(null, null);
    }
}