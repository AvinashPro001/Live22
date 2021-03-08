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
        document.getElementById("spinrefesh").classList.remove("fa-spin");
    }
    catch(e) {
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
    }
}

//#region WalletBalance
if (GetLocalStorage('currentUser') !== null)
    setInterval(async function () { await regisrationGame() }, 5000);

var PlayTechWallet, _918KissWallet, JokerWallet, mainWallet, AGWallet, M8Wallet, MaxBetWallet, Mega888Wallet, DgWallet, sexyWallet, saWallet, Pussy888Wallet, AllBetWallet, WMWallet, PragmaticWallet;
async function WalletBalance() {
    var userDetails = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
    var globalParameter = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));

    if (userDetails == null) {
        var res = await GetMethod(apiEndPoints.getProfile);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
        userDetails = res;
    }

    if (globalParameter == null) {
        var gamePrefix = await GetMethodWithReturn(apiEndPoints.globalParameter);
        sessionStorage.setItem('GamePreFix', enc(JSON.stringify(gamePrefix)));
        globalParameter = gamePrefix;
    }
    //#region Get user walletId
    MainWalletBalance();
    Kiss918WalletBalance(userDetails.data.username918);
    AgWalletBalance(globalParameter.data.agGamePrefix + userDetails.data.username);
    PlaytechWalletBalance(globalParameter.data.playtechGamePrefix + userDetails.data.username);
    Mega888WalletBalance(userDetails.data.loginid);
    M8WalletBalance(globalParameter.data.m8GamePrefix + userDetails.data.username);
    MaxbetWalletBalance(globalParameter.data.maxbetGamePrefix + userDetails.data.username);
    JokerWalletBalance(globalParameter.data.jokerGamePrefix + userDetails.data.username);
    DGWalletBalance(globalParameter.data.dgGamePrefix + userDetails.data.username);
    SexyWalletBalance(globalParameter.data.sexyGamePrefix + userDetails.data.username);
    SAWalletBalance(globalParameter.data.saGamePrefix + userDetails.data.username);
    Pussy888WalletBalance(userDetails.data.usernamePussy888);
    AllBetWalletBalance(globalParameter.data.allBetGamePrefix + userDetails.data.userId);
    WMWalletBalance(globalParameter.data.wmGamePrefix + userDetails.data.userId);
    PragmaticWalletBalance(globalParameter.data.pragmaticGamePrefix + userDetails.data.userId);
}
//#endregion WalletBalance

function RefershBalance() {
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
    document.getElementById("menuMainWallet").innerHTML = "<img class='loading-gif' src='../images/loading.gif'/>";
    WalletBalance();
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
}

async function RestoreBalance() {
    LoaderShow();
    try {
        $('.values').html('');
        $('.img_load').css('display', 'block');

        var userDetails = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
        var globalParameter = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));

        if (userDetails == null) {
            var res = await GetMethod(apiEndPoints.getProfile);
            sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
            userDetails = res;
        }

        if (globalParameter == null) {
            var gamePrefix = await GetMethodWithReturn(apiEndPoints.globalParameter);
            sessionStorage.setItem('GamePreFix', enc(JSON.stringify(gamePrefix)));
            globalParameter = gamePrefix;
        }
        //#region Get user walletId
        await MainWalletBalance();
        await Kiss918WalletBalance(userDetails.data.username918);
        await AgWalletBalance(globalParameter.data.agGamePrefix + userDetails.data.username);
        await PlaytechWalletBalance(globalParameter.data.playtechGamePrefix + userDetails.data.username);
        await Mega888WalletBalance(userDetails.data.loginid);
        await M8WalletBalance(globalParameter.data.m8GamePrefix + userDetails.data.username);
        await MaxbetWalletBalance(globalParameter.data.maxbetGamePrefix + userDetails.data.username);
        await JokerWalletBalance(globalParameter.data.jokerGamePrefix + userDetails.data.username);
        await DGWalletBalance(globalParameter.data.dgGamePrefix + userDetails.data.username);
        await SexyWalletBalance(globalParameter.data.sexyGamePrefix + userDetails.data.username);
        await SAWalletBalance(globalParameter.data.saGamePrefix + userDetails.data.username);
        await Pussy888WalletBalance(userDetails.data.usernamePussy888);
        await AllBetWalletBalance(globalParameter.data.allBetGamePrefix + userDetails.data.userId);
        await WMWalletBalance(globalParameter.data.wmGamePrefix + userDetails.data.userId);
        await PragmaticWalletBalance(globalParameter.data.pragmaticGamePrefix + userDetails.data.userId);
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
            id: null
        }
        await PostMethod(apiEndPoints.restoreBalance, restoreModel)
    }
    catch (ex) {
    }
    RefershBalance();
    LoaderHide();
}

async function RestoreBalance() {
    LoaderShow();
    try {
        $('.values').html('');
        $('.img_load').css('display', 'block');
        var balanceModel = {
        };
        var userDetails = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
        var globalParameter = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));

        if (userDetails == null) {
            var res = await GetMethod(apiEndPoints.getProfile);
            sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
            userDetails = res;
        }

        if (globalParameter == null) {
            var gamePrefix = await GetMethodWithReturn(apiEndPoints.globalParameter);
            sessionStorage.setItem('GamePreFix', enc(JSON.stringify(gamePrefix)));
            globalParameter = gamePrefix;
        }
        //#region Get user walletId
        await MainWalletBalance();
        await Kiss918WalletBalance(userDetails.data.username918);
        await AgWalletBalance(globalParameter.data.agGamePrefix + userDetails.data.username);
        await PlaytechWalletBalance(globalParameter.data.playtechGamePrefix + userDetails.data.username);
        await Mega888WalletBalance(userDetails.data.loginid);
        await M8WalletBalance(globalParameter.data.m8GamePrefix + userDetails.data.username);
        await MaxbetWalletBalance(globalParameter.data.maxbetGamePrefix + userDetails.data.username);
        await JokerWalletBalance(globalParameter.data.jokerGamePrefix + userDetails.data.username);
        await DGWalletBalance(globalParameter.data.dgGamePrefix + userDetails.data.username);
        await SexyWalletBalance(globalParameter.data.sexyGamePrefix + userDetails.data.username);
        await SAWalletBalance(globalParameter.data.saGamePrefix + userDetails.data.username);
        await Pussy888WalletBalance(userDetails.data.usernamePussy888);
        await AllBetWalletBalance(globalParameter.data.allBetGamePrefix + userDetails.data.userId);
        await WMWalletBalance(globalParameter.data.wmGamePrefix + userDetails.data.userId);
        await PragmaticWalletBalance(globalParameter.data.pragmaticGamePrefix + userDetails.data.userId);

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
            id: null
        }
        await PostMethod(apiEndPoints.restoreBalance, restoreModel)
    }
    catch (ex) {

    }
    WalletBalance();
    LoaderHide();
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
    M8Trigger = false;

function StartTimerGameBalanceAPI(GameName) {
    var userDetails = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
    var globalParameter = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));

    switch (GameName) {

        case 'AG':
            let AGtimerId = setInterval(() => { AgWalletBalance(globalParameter.data.agGamePrefix + userDetails.data.username); AGTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(AGtimerId); AGTrigger = false; }, 301000);
            break;
        case 'Playtech':
            let PlaytechtimerId = setInterval(() => { PlaytechWalletBalance(globalParameter.data.playtechGamePrefix + userDetails.data.username); PlaytechTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(PlaytechtimerId); PlaytechTrigger = false; }, 301000);
            break;
        case 'M8':
            let M8timerId = setInterval(() => { M8WalletBalance(globalParameter.data.m8GamePrefix + userDetails.data.username); M8Trigger = true; }, 30000);
            setTimeout(() => { clearInterval(M8timerId); M8Trigger = false; }, 301000);
            break;
        case 'MaxBet':
            let MaxbettimerId = setInterval(() => { MaxbetWalletBalance(globalParameter.data.maxbetGamePrefix + userDetails.data.username); MaxbetTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(MaxbettimerId); MaxbetTrigger = false; }, 301000);
            break;
        case 'DG':
            let dgtimerId = setInterval(() => { DGWalletBalance(globalParameter.data.dgGamePrefix + userDetails.data.username); DGTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(dgtimerId); DGTrigger = false; }, 301000);
            break;
        case 'Sexy':
            let SexytimerId = setInterval(() => { SexyWalletBalance(globalParameter.data.sexyGamePrefix + userDetails.data.username); SexyTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(SexytimerId); SexyTrigger = false; }, 301000);
            break;
        case 'SA':
            let SAtimerId = setInterval(() => { SAWalletBalance(globalParameter.data.saGamePrefix + userDetails.data.username); SATrigger = true; }, 30000);
            setTimeout(() => { clearInterval(SAtimerId); SATrigger = false; }, 301000);
            break;
        case 'AllBet':
            let AllbettimerId = setInterval(() => { AllBetWalletBalance(globalParameter.data.allBetGamePrefix + userDetails.data.userId); AllbetTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(AllbettimerId); AllbetTrigger = false; }, 301000);
            break;
        case 'WM':
            let WmtimerId = setInterval(() => { WMWalletBalance(globalParameter.data.wmGamePrefix + userDetails.data.userId); WMTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(WmtimerId); WMTrigger = false; }, 301000);
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
        if (location.href.toLowerCase().includes("spa2/index") || location.href.toLowerCase().includes("spa2/transfer") || location.href.toLowerCase().includes("mobile/withdraw"))
            document.getElementById("menuMainWallet").innerHTML = MainWallet;
    }
    catch (ex) {
        MainWallet = "0.0";
        document.getElementById("ddlmainWallet").innerHTML = "0.0";
        if (location.href.toLowerCase().includes("mobile/home") || location.href.toLowerCase().includes("mobile/transfer") || location.href.toLowerCase().includes("mobile/withdraw"))
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
        if (location.href.toLowerCase().includes("mobile/transfer"))
            document.getElementById("918KissWallet").innerHTML = _918KissWallet;
    }
    catch (ex) {
        _918KissWallet = "N/A";
        document.getElementById("ddl918KissWallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("mobile/transfer"))
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
        if (location.href.toLowerCase().includes("mobile/transfer"))
            document.getElementById("AGWallet").innerHTML = AGWallet;
        if (AGWallet == 0 && agbalance.data.previousBalance > 0 && AGTrigger == false)
            StartTimerGameBalanceAPI("AG");
    }
    catch (ex) {
        AGWallet = "N/A";
        document.getElementById("ddlAGWallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("mobile/transfer"))
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
        if (location.href.toLowerCase().includes("mobile/transfer"))
            document.getElementById("PlaytechWallet").innerHTML = PlayTechWallet;
        if (PlayTechWallet == 0 && playtechbalance.data.previousBalance > 0 && PlaytechTrigger == false)
            StartTimerGameBalanceAPI("Playtech");
    }
    catch (ex) {
        PlayTechWallet = "N/A";
        document.getElementById("ddlPlaytechWallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("mobile/transfer"))
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
        if (location.href.toLowerCase().includes("mobile/transfer"))
            document.getElementById("M8Wallet").innerHTML = M8Wallet;
        if (M8Wallet == 0 && M8balance.data.previousBalance > 0 && M8Trigger == false)
            StartTimerGameBalanceAPI("M8");
    }
    catch (ex) {
        M8Wallet = "N/A";
        document.getElementById("ddlM8Wallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("mobile/transfer"))
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
        if (location.href.toLowerCase().includes("mobile/transfer"))
            document.getElementById("MaxBetWallet").innerHTML = MaxBetWallet;
        if (MaxBetWallet == 0 && Maxbetbalance.data.previousBalance > 0 && MaxbetTrigger == false)
            StartTimerGameBalanceAPI("MaxBet");
    }
    catch (ex) {
        MaxBetWallet = "N/A";
        document.getElementById("ddlMaxBetWallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("mobile/transfer"))
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
        if (location.href.toLowerCase().includes("mobile/transfer"))
            document.getElementById("Mega888Wallet").innerHTML = Mega888Wallet;
    }
    catch (ex) {
        Mega888Wallet = "N/A";
        document.getElementById("ddlMega888Wallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("mobile/transfer"))
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
        if (location.href.toLowerCase().includes("mobile/transfer"))
            document.getElementById("JokerWallet").innerHTML = JokerWallet;
    }
    catch (ex) {
        JokerWallet = "N/A";
        document.getElementById("ddlJokerWallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("mobile/transfer"))
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
        if (location.href.toLowerCase().includes("mobile/transfer"))
            document.getElementById("DGWallet").innerHTML = DgWallet;
        if (DgWallet == 0 && dgbalance.data.previousBalance > 0 && DGTrigger == false)
            StartTimerGameBalanceAPI("DG");
    }
    catch (ex) {
        DgWallet = "N/A";
        document.getElementById("ddlDgWallet").innerHTML = "N/A"
        if (location.href.toLowerCase().includes("mobile/transfer"))
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
        if (location.href.toLowerCase().includes("mobile/transfer"))
            document.getElementById("SexyWallet").innerHTML = sexyWallet;
        if (sexyWallet == 0 && sexybalance.data.previousBalance > 0 && SexyTrigger == false)
            StartTimerGameBalanceAPI("Sexy");
    }
    catch (ex) {
        sexyWallet = "N/A";
        document.getElementById("ddlSexyWallet").innerHTML = "N/A"
        if (location.href.toLowerCase().includes("mobile/transfer"))
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
        if (location.href.toLowerCase().includes("mobile/transfer"))
            document.getElementById("SAWallet").innerHTML = saWallet;
        if (saWallet == 0 && sabalance.data.previousBalance > 0 && SATrigger == false)
            StartTimerGameBalanceAPI("SA");
    }
    catch (ex) {
        saWallet = "N/A";
        document.getElementById("ddlSAWallet").innerHTML = "N/A"
        if (location.href.toLowerCase().includes("mobile/transfer"))
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
        if (location.href.toLowerCase().includes("mobile/transfer"))
            document.getElementById("Pussy888Wallet").innerHTML = Pussy888Wallet;

    }
    catch (ex) {
        Pussy888Wallet = "N/A";
        document.getElementById("ddlPussy888Wallet").innerHTML = "N/A"
        if (location.href.toLowerCase().includes("mobile/transfer"))
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
        if (location.href.toLowerCase().includes("mobile/transfer"))
            document.getElementById("AllBetWallet").innerHTML = AllBetWallet;
        if (AllBetWallet == 0 && allBetBalance.data.previousBalance > 0 && AllbetTrigger == false)
            StartTimerGameBalanceAPI("AllBet");
    }
    catch (ex) {
        AllBetWallet = "N/A";
        document.getElementById("ddlAllbetWallet").innerHTML = "N/A"
        if (location.href.toLowerCase().includes("mobile/transfer"))
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
        if (location.href.toLowerCase().includes("mobile/transfer"))
            document.getElementById("WMWallet").innerHTML = WMWallet;
        if (WMWallet == 0 && WMBalance.data.previousBalance > 0 && AllbetTrigger == false)
            StartTimerGameBalanceAPI("WM");
    }
    catch (ex) {
        WMWallet = "N/A";
        document.getElementById("ddlWMWallet").innerHTML = "N/A"
        if (location.href.toLowerCase().includes("mobile/transfer"))
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
        if (location.href.toLowerCase().includes("mobile/transfer"))
            document.getElementById("PragmaticWallet").innerHTML = PragmaticWallet;

    }
    catch (ex) {
        PragmaticWallet = "N/A";
        document.getElementById("ddlPragmaticWallet").innerHTML = "N/A";
        if (location.href.toLowerCase().includes("mobile/transfer"))
            document.getElementById("PragmaticWallet").innerHTML = "N/A";
    }
}

async function WalletBalanceMaxTransfer(walletData) {

    var userDetails = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
    var globalParameter = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));

    if (userDetails == null) {
        var res = await GetMethod(apiEndPoints.getProfile);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
        userDetails = res;
    }

    if (globalParameter == null) {
        var gamePrefix = await GetMethodWithReturn(apiEndPoints.globalParameter);
        sessionStorage.setItem('GamePreFix', enc(JSON.stringify(gamePrefix)));
        globalParameter = gamePrefix;
    }
    //#region Get user walletId
    if (walletData != undefined) {
        if (walletData == "Main Wallet")
            MainWalletBalance();

        if (walletData == "918Kiss Wallet")
            Kiss918WalletBalance(userDetails.data.username918);

        if (walletData == "AG Wallet")
            AgWalletBalance(globalParameter.data.agGamePrefix + userDetails.data.username);

        if (walletData == "PlayTech Wallet")
            PlaytechWalletBalance(globalParameter.data.playtechGamePrefix + userDetails.data.username);

        if (walletData == "Mega888 Wallet")
            Mega888WalletBalance(userDetails.data.loginid);

        if (walletData == "M8 Wallet")
            M8WalletBalance(globalParameter.data.m8GamePrefix + userDetails.data.username);

        if (walletData == "MaxBet Wallet")
            MaxbetWalletBalance(globalParameter.data.maxbetGamePrefix + userDetails.data.username);

        if (walletData == "Joker Wallet")
            JokerWalletBalance(globalParameter.data.jokerGamePrefix + userDetails.data.username);

        if (walletData == "DG Wallet")
            DGWalletBalance(globalParameter.data.dgGamePrefix + userDetails.data.username);

        if (walletData == "Sexy Wallet")
            SexyWalletBalance(globalParameter.data.sexyGamePrefix + userDetails.data.username);

        if (walletData == "SA Wallet")
            SAWalletBalance(globalParameter.data.saGamePrefix + userDetails.data.username);

        if (walletData == "AllBet Wallet")
            AllBetWalletBalance(globalParameter.data.allBetGamePrefix + userDetails.data.userId);

        if (walletData == "WM Wallet")
            WMWalletBalance(globalParameter.data.wmGamePrefix + userDetails.data.userId);
    }
    else {
        MainWalletBalance();
        Kiss918WalletBalance(userDetails.data.username918);
        AgWalletBalance(globalParameter.data.agGamePrefix + userDetails.data.username);
        PlaytechWalletBalance(globalParameter.data.playtechGamePrefix + userDetails.data.username);
        Mega888WalletBalance(userDetails.data.loginid);
        M8WalletBalance(globalParameter.data.m8GamePrefix + userDetails.data.username);
        MaxbetWalletBalance(globalParameter.data.maxbetGamePrefix + userDetails.data.username);
        JokerWalletBalance(globalParameter.data.jokerGamePrefix + userDetails.data.username);
        DGWalletBalance(globalParameter.data.dgGamePrefix + userDetails.data.username);
        SexyWalletBalance(globalParameter.data.sexyGamePrefix + userDetails.data.username);
        SAWalletBalance(globalParameter.data.saGamePrefix + userDetails.data.username);
        AllBetWalletBalance(globalParameter.data.allBetGamePrefix + userDetails.data.userId);
        WMWalletBalance(globalParameter.data.wmGamePrefix + userDetails.data.userId);
    }
}