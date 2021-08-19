//#region Onload
$(document).ready(function () {
    if (GetLocalStorage('currentUser') !== null) {
        WalletBalance();
    }
});
//#endregion Onload

async function UserGameTurnover() {
    try {
        document.getElementById("spinrefesh").classList.add("fa-spin");
        let model = {};
        var turnover = await GameBalancePostMethod(apiEndPoints.TotalTurnover, model);
        document.getElementById("TotalTurnover").innerHTML = parseFloat(turnover.data.total).toFixed(2);
        document.getElementById("jokerTurnover").innerHTML = parseFloat(turnover.data.response.jokerWinover).toFixed(2);
        document.getElementById("playtechTurnover").innerHTML = parseFloat(turnover.data.response.playtechTurover).toFixed(2);
        document.getElementById("kiss918Turnover").innerHTML = parseFloat(turnover.data.response.kiss918Winover).toFixed(2);
        document.getElementById("agTurnover").innerHTML = parseFloat(turnover.data.response.agTurover).toFixed(2);
        document.getElementById("m8Turnover").innerHTML = parseFloat(turnover.data.response.m8Turover).toFixed(2);
        document.getElementById("maxbetTurnover").innerHTML = parseFloat(turnover.data.response.maxbetTurover).toFixed(2);
        document.getElementById("mega888Turnover").innerHTML = parseFloat(turnover.data.response.mega888Winover).toFixed(2);
        document.getElementById("dgTurnover").innerHTML = parseFloat(turnover.data.response.dgTurover).toFixed(2);
        document.getElementById("sexyTurnover").innerHTML = parseFloat(turnover.data.response.sexyTurover).toFixed(2);
        document.getElementById("saTurnover").innerHTML = parseFloat(turnover.data.response.saTurover).toFixed(2);
        document.getElementById("Pussy888Turnover").innerHTML = parseFloat(turnover.data.response.pussy888Turover).toFixed(2);
        document.getElementById("AllBetTurnover").innerHTML = parseFloat(turnover.data.response.allBetTurover).toFixed(2);
        document.getElementById("WMTurnover").innerHTML = parseFloat(turnover.data.response.wmTurover).toFixed(2);
        document.getElementById("PragmaticTurnover").innerHTML = parseFloat(turnover.data.response.pragmaticTurover).toFixed(2);
        document.getElementById("YeeBetTurnover").innerHTML = parseFloat(turnover.data.response.yeeBetTurover).toFixed(2);
        document.getElementById("SBOTurnover").innerHTML = parseFloat(turnover.data.response.sboTurover).toFixed(2);
        document.getElementById("spinrefesh").classList.remove("fa-spin");
    }
    catch (e) {
        document.getElementById("spinrefesh").classList.remove("fa-spin");
        document.getElementById("TotalTurnover").innerHTML = "0.0";
        document.getElementById("jokerTurnover").innerHTML = "0.0";
        document.getElementById("playtechTurnover").innerHTML = "0.0";
        document.getElementById("kiss918Turnover").innerHTML = "0.0";
        document.getElementById("agTurnover").innerHTML = "0.0";
        document.getElementById("m8Turnover").innerHTML = "0.0";
        document.getElementById("maxbetTurnover").innerHTML = "0.0";
        document.getElementById("mega888Turnover").innerHTML = "0.0";
        document.getElementById("dgTurnover").innerHTML = "0.0";
        document.getElementById("sexyTurnover").innerHTML = "0.0";
        document.getElementById("Pussy888Turnover").innerHTML = "0.0";
        document.getElementById("AllBetTurnover").innerHTML = "0.0";
        document.getElementById("WMTurnover").innerHTML = "0.0";
        document.getElementById("PragmaticTurnover").innerHTML = "0.0";
        document.getElementById("saTurnover").innerHTML = "0.0";
        document.getElementById("YeeBetTurnover").innerHTML = "0.0";
        document.getElementById("SBOTurnover").innerHTML = "0.0";
    }
}

//#region WalletBalance
if (GetLocalStorage('currentUser') !== null)
    setInterval(async function () { await regisrationGame() }, 5000);

var PlayTechWallet, _918KissWallet, JokerWallet, mainWallet, AGWallet, M8Wallet, MaxBetWallet, Mega888Wallet, DgWallet, sexyWallet, saWallet, Pussy888Wallet, AllBetWallet, WMWallet, PragmaticWallet, YeeBetWallet, SBOWallet;

async function WalletBalance() {
    var GameUsername = JSON.parse(dec(sessionStorage.getItem('GameUsername')));

    if (GameUsername == null) {
        var username = await PostMethod(apiEndPoints.getUsername, {});
        sessionStorage.setItem('GameUsername', enc(JSON.stringify(username.data)));
        GameUsername = username.data;
    }
    //#region Get user walletId
    MainWalletBalance();
    Kiss918WalletBalance(GameUsername.userName918);
    AgWalletBalance(GameUsername.agUsername);
    PlaytechWalletBalance((GameUsername.playtechUsername.replace("#", "")).toUpperCase());
    Mega888WalletBalance(GameUsername.mega888Username);
    M8WalletBalance(GameUsername.m8Username);
    MaxbetWalletBalance(GameUsername.maxbetUsername);
    JokerWalletBalance(GameUsername.jokerUsername.replace(/[^0-9a-zA-Z]+/g, ""));
    DGWalletBalance(GameUsername.dgUsername);
    SexyWalletBalance(GameUsername.sexyUsername);
    SAWalletBalance(GameUsername.saUsername);
    Pussy888WalletBalance(GameUsername.pussy888Username);
    AllBetWalletBalance(GameUsername.allBetUsername);
    WMWalletBalance(GameUsername.wmUsername);
    PragmaticWalletBalance(GameUsername.pragmaticUsername);
    YeeBetWalletBalance(GameUsername.yeebetUsername);
    SBOWalletBalance(GameUsername.sboUsername);
}
//#endregion WalletBalance

function RefershBalance() {
    $(".refresh").addClass('fa-spin');
    document.getElementById("ddlmainWallet").innerHTML = "feching..";
    document.getElementById("ddl918KissWallet").innerHTML = "feching..";
    document.getElementById("ddlAGWallet").innerHTML = "feching..";
    document.getElementById("ddlM8Wallet").innerHTML = "feching..";
    document.getElementById("ddlJokerWallet").innerHTML = "feching..";
    document.getElementById("ddlPlaytechWallet").innerHTML = "feching..";
    document.getElementById("ddlMaxBetWallet").innerHTML = "feching..";
    document.getElementById("ddlMega888Wallet").innerHTML = "feching..";
    document.getElementById("ddlDgWallet").innerHTML = "feching..";
    document.getElementById("ddlSexyWallet").innerHTML = "feching..";
    document.getElementById("ddlSAWallet").innerHTML = "feching..";
    document.getElementById("ddlPussy888Wallet").innerHTML = "feching..";
    document.getElementById("ddlAllbetWallet").innerHTML = "feching..";
    document.getElementById("ddlWMWallet").innerHTML = "feching..";
    document.getElementById("ddlPragmaticWallet").innerHTML = "feching..";
    document.getElementById("ddlYeeBetWallet").innerHTML = "feching..";
    document.getElementById("ddlSBOWallet").innerHTML = "feching..";
    WalletBalance();
    $(".refresh").removeClass('fa-spin');
}

function TransferPageWallets() {
    document.getElementById("918KissWallet").innerHTML = _918KissWallet;
    document.getElementById("AGWallet").innerHTML = AGWallet;
    document.getElementById("M8Wallet").innerHTML = M8Wallet;
    document.getElementById("JokerWallet").innerHTML = JokerWallet;
    document.getElementById("PlaytechWallet").innerHTML = PlayTechWallet;
    document.getElementById("MaxBetWallet").innerHTML = MaxBetWallet;
    document.getElementById("Mega888Wallet").innerHTML = Mega888Wallet;
    document.getElementById("DGWallet").innerHTML = DgWallet;
    document.getElementById("SexyWallet").innerHTML = DgWallet;
    document.getElementById("SAWallet").innerHTML = saWallet;
    document.getElementById("Pussy888Wallet").innerHTML = Pussy888Wallet;
    document.getElementById("AllBetWallet").innerHTML = AllBetWallet;
    document.getElementById("WMWallet").innerHTML = WMWallet;
    document.getElementById("PragmaticWallet").innerHTML = PragmaticWallet;
    document.getElementById("YeeBetWallet").innerHTML = YeeBetWallet;
    document.getElementById("SBOWallet").innerHTML = SBOWallet;
}

async function RestoreBalance() {
    //LoaderShow();
    $(".refresh").addClass('fa-spin');
    try {
        $("#refreshBtn").attr("src", "../../images/loading.gif");
        $('.values').html('');
        $('.img_load').css('display', 'block');

        $("#retore_li").css("pointer-events", "none");

        var GameUsername = JSON.parse(dec(sessionStorage.getItem('GameUsername')));

        if (GameUsername == null) {
            var username = await PostMethod(apiEndPoints.getUsername, {});
            sessionStorage.setItem('GameUsername', enc(JSON.stringify(username.data)));
            GameUsername = username.data;
        }

        //#region Get user walletId
        await MainWalletBalance();
        await Kiss918WalletBalance(GameUsername.userName918);
        await AgWalletBalance(GameUsername.agUsername);
        await PlaytechWalletBalance((GameUsername.playtechUsername.replace("#", "")).toUpperCase());
        await Mega888WalletBalance(GameUsername.mega888Username);
        await M8WalletBalance(GameUsername.m8Username);
        await MaxbetWalletBalance(GameUsername.maxbetUsername);
        await JokerWalletBalance(GameUsername.jokerUsername.replace(/[^0-9a-zA-Z]+/g, ""));
        await DGWalletBalance(GameUsername.dgUsername);
        await SexyWalletBalance(GameUsername.sexyUsername);
        await SAWalletBalance(GameUsername.saUsername);
        await Pussy888WalletBalance(GameUsername.pussy888Username);
        await AllBetWalletBalance(GameUsername.allBetUsername);
        await WMWalletBalance(GameUsername.wmUsername);
        await PragmaticWalletBalance(GameUsername.pragmaticUsername);
        await YeeBetWalletBalance(GameUsername.yeebetUsername);
        await SBOWalletBalance(GameUsername.sboUsername);

        let restoreModel = {
            kiss918wallet: _918KissWallet == "N/A" ? "0.0" : _918KissWallet,
            maxbetwallet: MaxBetWallet == "N/A" ? "0.0" : MaxBetWallet,
            jokerwallet: JokerWallet == "N/A" ? "0.0" : JokerWallet,
            agwallet: AGWallet == "N/A" ? "0.0" : AGWallet,
            m8wallet: M8Wallet == "N/A" ? "0.0" : M8Wallet,
            playtechwallet: PlayTechWallet == "N/A" ? "0.0" : PlayTechWallet,
            mega888wallet: Mega888Wallet == "N/A" ? "0.0" : Mega888Wallet,
            dgwallet: DgWallet == "N/A" ? "0.0" : DgWallet,
            sexywallet: sexyWallet == "N/A" ? "0.0" : sexyWallet,
            sawallet: saWallet == "N/A" ? "0.0" : saWallet,
            pussy888wallet: Pussy888Wallet == "N/A" ? "0.0" : Pussy888Wallet,
            allbetwallet: AllBetWallet == "N/A" ? "0.0" : AllBetWallet,
            WMwallet: WMWallet == "N/A" ? "0.0" : WMWallet,
            pragmaticwallet: PragmaticWallet == "N/A" ? "0.0" : PragmaticWallet,
            yeebetwallet: YeeBetWallet == "N/A" ? "0.0" : YeeBetWallet,
            sbowallet: SBOWallet == "N/A" ? "0.0" : SBOWallet,
            id: null
        }
        await PostMethod(apiEndPoints.restoreBalance, restoreModel)
        $("#retore_li").css("pointer-events", "");
    }
    catch (ex) {
    }
    $("#retore_li").css("pointer-events", "");
    WalletBalance();
    $("#refreshBtn").attr("src", "../../images/mobile/menu-images/restore.png");
    $(".refresh,#refreshBtn").removeClass('fa-spin');
}

function numberWithCommas(x) {
    if (x != "NaN") {
        try {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        catch (e) {
            return "N/A"
        }
    }
    else {
        return "N/A"
    }
}

var AGTrigger = false,
    DGTrigger = false,
    SATrigger = false,
    SexyTrigger = false,
    PlaytechTrigger = false,
    MaxbetTrigger = false,
    AllbetTrigger = false,
    WMTrigger = false,
    M8Trigger = false,
    YeeBetTrigger = false,
    SBOTrigger = false;

function StartTimerGameBalanceAPI(GameName) {
    var GameUsername = JSON.parse(dec(sessionStorage.getItem('GameUsername')));

    switch (GameName) {
        case 'AG':
            let AGtimerId = setInterval(() => { AgWalletBalance(GameUsername.agUsername); AGTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(AGtimerId); AGTrigger = false; }, 301000);
            break;
        case 'Playtech':
            let PlaytechtimerId = setInterval(() => { PlaytechWalletBalance((GameUsername.playtechUsername.replace("#", "")).toUpperCase()); PlaytechTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(PlaytechtimerId); PlaytechTrigger = false; }, 301000);
            break;
        case 'M8':
            let M8timerId = setInterval(() => { M8WalletBalance(GameUsername.m8Username); M8Trigger = true; }, 30000);
            setTimeout(() => { clearInterval(M8timerId); M8Trigger = false; }, 301000);
            break;
        case 'MaxBet':
            let MaxbettimerId = setInterval(() => { MaxbetWalletBalance(GameUsername.maxbetUsername); MaxbetTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(MaxbettimerId); MaxbetTrigger = false; }, 301000);
            break;
        case 'DG':
            let dgtimerId = setInterval(() => { DGWalletBalance(GameUsername.dgUsername); DGTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(dgtimerId); DGTrigger = false; }, 301000);
            break;
        case 'Sexy':
            let SexytimerId = setInterval(() => { SexyWalletBalance(GameUsername.sexyUsername); SexyTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(SexytimerId); SexyTrigger = false; }, 301000);
            break;
        case 'SA':
            let SAtimerId = setInterval(() => { SAWalletBalance(GameUsername.saUsername); SATrigger = true; }, 30000);
            setTimeout(() => { clearInterval(SAtimerId); SATrigger = false; }, 301000);
            break;
        case 'AllBet':
            let AllbettimerId = setInterval(() => { AllBetWalletBalance(GameUsername.allBetUsername); AllbetTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(AllbettimerId); AllbetTrigger = false; }, 301000);
            break;
        case 'WM':
            let WmtimerId = setInterval(() => { WMWalletBalance(GameUsername.wmUsername); WMTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(WmtimerId); WMTrigger = false; }, 301000);
            break;
        case 'YeeBet':
            let YeeBetTimerId = setInterval(() => { YeeBetWalletBalance(GameUsername.yeebetUsername); YeeBetTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(YeeBetTimerId); YeeBetTrigger = false; }, 301000);
            break;
        case 'SBO':
            let SBOTimerId = setInterval(() => { SBOWalletBalance(GameUsername.sboUsername); SBOTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(SBOTimerId); SBOTrigger = false; }, 301000);
            break;
    }
}

async function MainWalletBalance() {
    try {
        let model = {};
        var mainwallet = await GameBalancePostMethod(apiEndPoints.walletBalance, model);
        balance = mainwallet.data.filter(x => x.walletName == "Main Wallet");
        MainWallet = numberWithCommas(parseFloat(balance[0].amount).toFixed(2));
        document.getElementById("ddlmainWallet").innerHTML = MainWallet;
        if (location.href.toLowerCase().includes("?p=home") || location.href.toLowerCase().includes("?p=transfer") || location.href.toLowerCase().includes("?p=withdraw"))
            document.getElementById("menuMainWallet").innerHTML = MainWallet;
    }
    catch (ex) {
        MainWallet = "0.0";
        document.getElementById("ddlmainWallet").innerHTML = "0.0";
        if (location.href.toLowerCase().includes("?p=home") || location.href.toLowerCase().includes("?p=transfer") || location.href.toLowerCase().includes("?p=withdraw"))
            document.getElementById("menuMainWallet").innerHTML = "0.0";
    }
}

async function Kiss918WalletBalance(Username) {
    try {
        let model = {
            username: Username
        };
        var kissbalance = await GameBalancePostMethod(apiEndPoints.kiss918Balance, model);
        _918KissWallet = numberWithCommas(parseFloat(kissbalance.data.balance).toFixed(2));
        document.getElementById("ddl918KissWallet").innerHTML = _918KissWallet;
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("918KissWallet").innerHTML = _918KissWallet;
    }
    catch (ex) {
        _918KissWallet = "N/A";
        document.getElementById("ddl918KissWallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("918KissWallet").innerHTML = "N/A";
    }
}

async function AgWalletBalance(Username) {
    try {
        let model = {
            username: Username
        };
        var agbalance = await GameBalancePostMethod(apiEndPoints.agBalance, model);
        AGWallet = numberWithCommas(parseFloat(agbalance.data.balance).toFixed(2));
        document.getElementById("ddlAGWallet").innerHTML = AGWallet;
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("AGWallet").innerHTML = AGWallet;
        if (AGWallet == 0 && agbalance.data.previousBalance > 0 && AGTrigger == false)
            StartTimerGameBalanceAPI("AG");
    }
    catch (ex) {
        AGWallet = "N/A";
        document.getElementById("ddlAGWallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("AGWallet").innerHTML = "N/A";
    }
}

async function PlaytechWalletBalance(Username) {
    try {
        let model = {
            username: Username
        };
        var playtechbalance = await GameBalancePostMethod(apiEndPoints.playtechBalance, model);
        PlayTechWallet = numberWithCommas(parseFloat(playtechbalance.data.balance).toFixed(2));
        document.getElementById("ddlPlaytechWallet").innerHTML = PlayTechWallet;
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("PlaytechWallet").innerHTML = PlayTechWallet;
        if (PlayTechWallet == 0 && playtechbalance.data.previousBalance > 0 && PlaytechTrigger == false)
            StartTimerGameBalanceAPI("Playtech");
    }
    catch (ex) {
        PlayTechWallet = "N/A";
        document.getElementById("ddlPlaytechWallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("PlaytechWallet").innerHTML = "N/A";
    }
}

async function M8WalletBalance(Username) {
    try {
        let model = {
            username: Username
        };
        var M8balance = await GameBalancePostMethod(apiEndPoints.m8Balance, model);
        M8Wallet = numberWithCommas(parseFloat(M8balance.data.balance).toFixed(2));
        document.getElementById("ddlM8Wallet").innerHTML = M8Wallet;
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("M8Wallet").innerHTML = M8Wallet;
        if (M8Wallet == 0 && M8balance.data.previousBalance > 0 && M8Trigger == false)
            StartTimerGameBalanceAPI("M8");
    }
    catch (ex) {
        M8Wallet = "N/A";
        document.getElementById("ddlM8Wallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("M8Wallet").innerHTML = "N/A";
    }
}

async function MaxbetWalletBalance(Username) {
    try {
        let model = {
            username: Username
        };
        var Maxbetbalance = await GameBalancePostMethod(apiEndPoints.maxbetBalance, model);

        MaxBetWallet = numberWithCommas(parseFloat(Maxbetbalance.data.balance).toFixed(2));
        document.getElementById("ddlMaxBetWallet").innerHTML = MaxBetWallet;
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("MaxBetWallet").innerHTML = MaxBetWallet;
        if (MaxBetWallet == 0 && Maxbetbalance.data.previousBalance > 0 && MaxbetTrigger == false)
            StartTimerGameBalanceAPI("MaxBet");
    }
    catch (ex) {
        MaxBetWallet = "N/A";
        document.getElementById("ddlMaxBetWallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("MaxBetWallet").innerHTML = "N/A";
    }
}

async function Mega888WalletBalance(Username) {
    try {
        let model = {
            username: Username
        };
        var Mega888balance = await GameBalancePostMethod(apiEndPoints.mega888Balance, model);

        Mega888Wallet = numberWithCommas(parseFloat(Mega888balance.data.balance).toFixed(2));
        document.getElementById("ddlMega888Wallet").innerHTML = Mega888Wallet;
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("Mega888Wallet").innerHTML = Mega888Wallet;
    }
    catch (ex) {
        Mega888Wallet = "N/A";
        document.getElementById("ddlMega888Wallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("Mega888Wallet").innerHTML = "N/A";
    }
}

async function JokerWalletBalance(Username) {
    try {
        let model = {
            username: Username
        };
        var jokerbalance = await GameBalancePostMethod(apiEndPoints.jokerBalance, model);

        JokerWallet = numberWithCommas(parseFloat(jokerbalance.data.balance).toFixed(2));
        document.getElementById("ddlJokerWallet").innerHTML = JokerWallet;
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("JokerWallet").innerHTML = JokerWallet;
    }
    catch (ex) {
        JokerWallet = "N/A";
        document.getElementById("ddlJokerWallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("JokerWallet").innerHTML = "N/A";
    }
}

async function DGWalletBalance(Username) {
    try {
        let model = {
            username: Username
        };
        var dgbalance = await GameBalancePostMethod(apiEndPoints.dgBalance, model);
        DgWallet = numberWithCommas(parseFloat(dgbalance.data.balance).toFixed(2));
        document.getElementById("ddlDgWallet").innerHTML = DgWallet;
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("DGWallet").innerHTML = DgWallet;
        if (DgWallet == 0 && dgbalance.data.previousBalance > 0 && DGTrigger == false)
            StartTimerGameBalanceAPI("DG");
    }
    catch (ex) {
        DgWallet = "N/A";
        document.getElementById("ddlDgWallet").innerHTML = "N/A"
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("DGWallet").innerHTML = "N/A"
    }
}

async function SexyWalletBalance(Username) {
    try {
        let model = {
            username: Username
        };
        var sexybalance = await GameBalancePostMethod(apiEndPoints.sexyBalance, model);
        sexyWallet = numberWithCommas(parseFloat(sexybalance.data.balance).toFixed(2));
        document.getElementById("ddlSexyWallet").innerHTML = sexyWallet;
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("SexyWallet").innerHTML = sexyWallet;
        if (sexyWallet == 0 && sexybalance.data.previousBalance > 0 && SexyTrigger == false)
            StartTimerGameBalanceAPI("Sexy");
    }
    catch (ex) {
        sexyWallet = "N/A";
        document.getElementById("ddlSexyWallet").innerHTML = "N/A"
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("SexyWallet").innerHTML = "N/A"
    }
}

async function SAWalletBalance(Username) {
    try {
        let model = {
            username: Username
        };
        var sabalance = await GameBalancePostMethod(apiEndPoints.saBalance, model);
        saWallet = numberWithCommas(parseFloat(sabalance.data.balance).toFixed(2));
        document.getElementById("ddlSAWallet").innerHTML = saWallet;
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("SAWallet").innerHTML = saWallet;
        if (saWallet == 0 && sabalance.data.previousBalance > 0 && SATrigger == false)
            StartTimerGameBalanceAPI("SA");
    }
    catch (ex) {
        saWallet = "N/A";
        document.getElementById("ddlSAWallet").innerHTML = "N/A"
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("SAWallet").innerHTML = "N/A"
    }
}

async function Pussy888WalletBalance(Username) {
    try {
        let model = {
            username: Username
        };
        var Pussy888balance = await GameBalancePostMethod(apiEndPoints.Pussy888Balance, model);
        Pussy888Wallet = numberWithCommas(parseFloat(Pussy888balance.data.balance).toFixed(2));
        document.getElementById("ddlPussy888Wallet").innerHTML = Pussy888Wallet;
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("Pussy888Wallet").innerHTML = Pussy888Wallet;
    }
    catch (ex) {
        Pussy888Wallet = "N/A";
        document.getElementById("ddlPussy888Wallet").innerHTML = "N/A"
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("Pussy888Wallet").innerHTML = "N/A"
    }
}

async function AllBetWalletBalance(Username) {
    try {
        let model = {
            username: Username,
            password: dec(GetLocalStorage('currentUserData')),
        };
        var allBetBalance = await GameBalancePostMethod(apiEndPoints.AllBetBalance, model);
        AllBetWallet = numberWithCommas(parseFloat(allBetBalance.data.balance).toFixed(2));
        document.getElementById("ddlAllbetWallet").innerHTML = AllBetWallet;
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("AllBetWallet").innerHTML = AllBetWallet;
        if (AllBetWallet == 0 && allBetBalance.data.previousBalance > 0 && AllbetTrigger == false)
            StartTimerGameBalanceAPI("AllBet");
    }
    catch (ex) {
        AllBetWallet = "N/A";
        document.getElementById("ddlAllbetWallet").innerHTML = "N/A"
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("AllBetWallet").innerHTML = "N/A"
    }
}

async function WMWalletBalance(Username) {
    try {
        let model = {
            username: Username
        };
        var WMBalance = await GameBalancePostMethod(apiEndPoints.WMBalance, model);
        WMWallet = numberWithCommas(parseFloat(WMBalance.data.balance).toFixed(2));
        document.getElementById("ddlWMWallet").innerHTML = WMWallet;
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("WMWallet").innerHTML = WMWallet;
        if (WMWallet == 0 && WMBalance.data.previousBalance > 0 && AllbetTrigger == false)
            StartTimerGameBalanceAPI("WM");
    }
    catch (ex) {
        WMWallet = "N/A";
        document.getElementById("ddlWMWallet").innerHTML = "N/A"
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("WMWallet").innerHTML = "N/A"
    }
}

async function PragmaticWalletBalance(Username) {
    try {
        let model = {
            username: Username
        };
        var Pragmaticbalance = await GameBalancePostMethod(apiEndPoints.PragmaticBalance, model);

        PragmaticWallet = numberWithCommas(parseFloat(Pragmaticbalance.data.balance).toFixed(2));
        document.getElementById("ddlPragmaticWallet").innerHTML = PragmaticWallet;
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("PragmaticWallet").innerHTML = PragmaticWallet;
    }
    catch (ex) {
        PragmaticWallet = "N/A";
        document.getElementById("ddlPragmaticWallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("?p=transfer"))
            document.getElementById("PragmaticWallet").innerHTML = "N/A";
    }
}

async function YeeBetWalletBalance(Username) {
    try {
        let model = {
            username: Username
        };

        let YeeBetBalance = await GameBalancePostMethod(apiEndPoints.YeeBetBalance, model);

        YeeBetWallet = numberWithCommas(parseFloat(YeeBetBalance.data.balance).toFixed(2));
        document.getElementById("ddlYeeBetWallet").innerHTML = YeeBetWallet;
        if (location.href.toLowerCase().includes("?p=transfer")) document.getElementById("YeeBetWallet").innerHTML = YeeBetWallet;
        if (YeeBetWallet == 0 &&
            YeeBetBalance.data.previousBalance > 0 &&
            AllbetTrigger == false)
            StartTimerGameBalanceAPI("YeeBet");
    }
    catch (ex) {
        YeeBetWallet = "N/A";
        document.getElementById("ddlYeeBetWallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("?p=transfer")) document.getElementById("YeeBetWallet").innerHTML = "N/A";
    }
}

async function SBOWalletBalance(Username) {
    try {
        let model = {
            username: Username
        };
        var balance = await GameBalancePostMethod(apiEndPoints.SBOBalance, model);
        SBOWallet = numberWithCommas(parseFloat(balance.data.balance).toFixed(2));
        document.getElementById("ddlSBOWallet").innerHTML = SBOWallet;
        if (location.href.toLowerCase().includes("?p=transfer")) document.getElementById("SBOWallet").innerHTML = SBOWallet;
        if (SBOWallet == 0 &&
            balance.data.previousBalance > 0 &&
            SBOTrigger == false)
            StartTimerGameBalanceAPI("SBO");
    }
    catch (ex) {
        SBOWallet = "N/A";
        document.getElementById("ddlSBOWallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("?p=transfer")) document.getElementById("SBOWallet").innerHTML = "N/A";
    }
}

async function WalletBalanceMaxTransfer(walletData) {
    var GameUsername = JSON.parse(dec(sessionStorage.getItem('GameUsername')));

    if (GameUsername == null) {
        var username = await PostMethod(apiEndPoints.getUsername, {});
        sessionStorage.setItem('GameUsername', enc(JSON.stringify(username.data)));
        GameUsername = username.data;
    }

    //#region Get user walletId
    if (walletData != undefined) {
        if (walletData == "Main Wallet") MainWalletBalance();
        if (walletData == "918Kiss Wallet") Kiss918WalletBalance(GameUsername.userName918);
        if (walletData == "AG Wallet") AgWalletBalance(GameUsername.agUsername);
        if (walletData == "PlayTech Wallet") PlaytechWalletBalance((GameUsername.playtechUsername.replace("#", "")).toUpperCase());
        if (walletData == "Mega888 Wallet") Mega888WalletBalance(GameUsername.mega888Username);
        if (walletData == "M8 Wallet") M8WalletBalance(GameUsername.m8Username);
        if (walletData == "MaxBet Wallet") MaxbetWalletBalance(GameUsername.maxbetUsername);
        if (walletData == "Joker Wallet") JokerWalletBalance(GameUsername.jokerUsername.replace(/[^0-9a-zA-Z]+/g, ""));
        if (walletData == "DG Wallet") DGWalletBalance(GameUsername.dgUsername);
        if (walletData == "Sexy Wallet") SexyWalletBalance(GameUsername.sexyUsername);
        if (walletData == "SA Wallet") SAWalletBalance(GameUsername.saUsername);
        if (walletData == "AllBet Wallet") AllBetWalletBalance(GameUsername.allBetUsername);
        if (walletData == "WM Wallet") WMWalletBalance(GameUsername.wmUsername);
        if (walletData == "YeeBet Wallet") YeeBetWalletBalance(GameUsername.yeebetUsername);
        if (walletData == "SBO Wallet") SBOWalletBalance(GameUsername.sboUsername);
        if (walletData == "Pussy888 Wallet") Pussy888WalletBalance(GameUsername.pussy888Username);
        if (walletData == "Pragmatic Wallet") PragmaticWalletBalance(GameUsername.pragmaticUsername);
    }
    else {
        MainWalletBalance();
        Kiss918WalletBalance(GameUsername.userName918);
        AgWalletBalance(GameUsername.agUsername);
        PlaytechWalletBalance((GameUsername.playtechUsername.replace("#", "")).toUpperCase());
        Mega888WalletBalance(GameUsername.mega888Username);
        M8WalletBalance(GameUsername.m8Username);
        MaxbetWalletBalance(GameUsername.maxbetUsername);
        JokerWalletBalance(GameUsername.jokerUsername.replace(/[^0-9a-zA-Z]+/g, ""));
        DGWalletBalance(GameUsername.dgUsername);
        SexyWalletBalance(GameUsername.sexyUsername);
        SAWalletBalance(GameUsername.saUsername);
        Pussy888WalletBalance(GameUsername.pussy888Username);
        AllBetWalletBalance(GameUsername.allBetUsername);
        WMWalletBalance(GameUsername.wmUsername);
        PragmaticWalletBalance(GameUsername.pragmaticUsername);
        YeeBetWalletBalance(GameUsername.yeebetUsername);
        SBOWalletBalance(GameUsername.sboUsername);
    }
}