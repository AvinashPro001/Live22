//#region Onload
$(document).ready(function () {
    if (GetLocalStorage('currentUser') !== null) {
        WalletBalance();
        if (window.location.href.includes("Account/Profile"))
            UserGameTurnover();
    }
});
//#endregion Onload

async function UserGameTurnover() {
    try {
        let model = {};
        document.getElementById("spin-refesh").classList.add("fa-spin");
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
        document.getElementById("spin-refesh").classList.remove("fa-spin");
        document.getElementById("YeeBetTurnover").innerHTML = parseFloat(turnover.data.response.yeeBetTurover).toFixed(2);
    }
    catch {
        document.getElementById("spin-refesh").classList.remove("fa-spin");
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
        document.getElementById("saTurnover").innerHTML = "0.0";
        document.getElementById("Pussy888Turnover").innerHTML = "0.0";
        document.getElementById("AllBetTurnover").innerHTML = "0.0";
        document.getElementById("WMTurnover").innerHTML = "0.0";
        document.getElementById("PragmaticTurnover").innerHTML = "0.0";
        document.getElementById("spin-refesh").classList.remove("fa-spin");
        document.getElementById("YeeBetTurnover").innerHTML = "0.0";
    }
}

if (GetLocalStorage('currentUser') !== null)
    setInterval(async function () { await regisrationGame() }, 5000);

//#region WalletBalance
var PlayTechWallet, _918KissWallet, JokerWallet, MainWallet, AGWallet, M8Wallet, MaxBetWallet, Mega888Wallet, DgWallet, sexyWallet, saWallet, Pussy888Wallet, AllBetWallet, WMWallet, PragmaticWallet, YeeBetWallet;
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
    YeeBetWalletBalance(globalParameter.data.YEEBETGamePrefix + userDetails.data.userId);
}
//#endregion WalletBalance

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

//#region Show Balance in Mobile Drop-down
function ddlShowBalance() {
    document.getElementById("menuMainWallet").innerHTML = MainWallet == undefined ? "<img class='loading-gif' src='../images/loading.gif'/>" : MainWallet;
    document.getElementById("ddlmainWallet").innerHTML = MainWallet == undefined ? "feching.." : MainWallet;
    document.getElementById("ddl918KissWallet").innerHTML = _918KissWallet == undefined ? "feching.." : _918KissWallet;
    document.getElementById("ddlAGWallet").innerHTML = AGWallet == undefined ? "feching.." : AGWallet;
    document.getElementById("ddlPlaytechWallet").innerHTML = PlayTechWallet == undefined ? "feching.." : PlayTechWallet;
    document.getElementById("ddlM8Wallet").innerHTML = M8Wallet == undefined ? "feching.." : M8Wallet;
    document.getElementById("ddlMaxBetWallet").innerHTML = MaxBetWallet == undefined ? "feching.." : MaxBetWallet;
    document.getElementById("ddlMega888Wallet").innerHTML = Mega888Wallet == undefined ? "feching.." : Mega888Wallet;
    document.getElementById("ddlJokerWallet").innerHTML = JokerWallet == undefined ? "feching.." : JokerWallet;
    document.getElementById("ddlDGWallet").innerHTML = DgWallet == undefined ? "feching.." : DgWallet;
    document.getElementById("ddlSexyWallet").innerHTML = sexyWallet == undefined ? "feching.." : sexyWallet;
    document.getElementById("ddlSaWallet").innerHTML = saWallet == undefined ? "feching.." : saWallet;
    document.getElementById("ddlPussy888Wallet").innerHTML = Pussy888Wallet == undefined ? "feching.." : Pussy888Wallet;
    document.getElementById("ddlAllBetWallet").innerHTML = AllBetWallet == undefined ? "feching.." : AllBetWallet;
    document.getElementById("ddlWMWallet").innerHTML = WMWallet == undefined ? "feching.." : WMWallet;
    document.getElementById("ddlPragmaticWallet").innerHTML = PragmaticWallet == undefined ? "feching.." : PragmaticWallet;
    document.getElementById("ddlYeeBetWallet").innerHTML = YeeBetWallet == undefined ? "feching.." : YeeBetWallet;
}
//#endregion Show Balance in Mobile Drop-down

async function RestoreBalance() {
    //LoaderShow();
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
        await Kiss918WalletBalance(userDetails.data.username918, false);
        await AgWalletBalance(globalParameter.data.agGamePrefix + userDetails.data.username, false);
        await PlaytechWalletBalance(globalParameter.data.playtechGamePrefix + userDetails.data.username, false);
        await Mega888WalletBalance(userDetails.data.loginid, false);
        await M8WalletBalance(globalParameter.data.m8GamePrefix + userDetails.data.username, false);
        await MaxbetWalletBalance(globalParameter.data.maxbetGamePrefix + userDetails.data.username, false);
        await JokerWalletBalance(globalParameter.data.jokerGamePrefix + userDetails.data.username, false);
        await DGWalletBalance(globalParameter.data.dgGamePrefix + userDetails.data.username, false);
        await SexyWalletBalance(globalParameter.data.sexyGamePrefix + userDetails.data.username, false);
        await SAWalletBalance(globalParameter.data.saGamePrefix + userDetails.data.username, false);
        await Pussy888WalletBalance(userDetails.data.usernamePussy888, false);
        await AllBetWalletBalance(globalParameter.data.allBetGamePrefix + userDetails.data.userId, false);
        await WMWalletBalance(globalParameter.data.wmGamePrefix + userDetails.data.userId, false);
        await PragmaticWalletBalance(globalParameter.data.pragmaticGamePrefix + userDetails.data.userId, false);
        await YeeBetWalletBalance(globalParameter.data.YEEBETGamePrefix + userDetails.data.userId, false);

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
            YeeBetWallet: YeeBetWallet == "N/A" ? "0.0" : YeeBetWallet,
            id: null
        }
        await PostMethod(apiEndPoints.restoreBalance, restoreModel);
        WalletBalance();
    }
    catch (ex) {
        WalletBalance();
    }
}

function numberWithCommas(x) {
    if (x != "NaN") {
        try {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        catch {
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
    YeeBetTrigger = false;

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
        case 'YeeBet':
            let YeeBetTimerId = setInterval(() => { YeeBetWalletBalance(globalParameter.data.YEEBETGamePrefix + userDetails.data.userId); YeeBetTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(YeeBetTimerId); YeeBetTrigger = false; }, 301000);
            break;
    }
}

//#region all WalletBalance
async function MainWalletBalance() {
    try {
        let model = {};
        var mainwallet = await GameBalancePostMethod(apiEndPoints.walletBalance, model);
        balance = mainwallet.data.filter(x => x.walletName == "Main Wallet");
        MainWallet = numberWithCommas(parseFloat(balance[0].amount).toFixed(2));
        document.getElementById("MainBalance").innerHTML = MainWallet;
        if ($('#lbl_mainWalletbalanceDeposite').length) {
            document.getElementById("lbl_mainWalletbalanceDeposite").innerHTML = MainWallet;
            document.getElementById("ddlmainWallet").innerHTML = MainWallet;
            document.getElementById("menuMainWallet").innerHTML = MainWallet;
        }
    }
    catch (ex) {
        MainWallet = "0.0";
        document.getElementById("MainBalance").innerHTML = "0.00";
        if ($('#lbl_mainWalletbalanceDeposite').length) {
            document.getElementById("lbl_mainWalletbalanceDeposite").innerHTML = "0.00";
            document.getElementById("ddlmainWallet").innerHTML = MainWallet;
            document.getElementById("menuMainWallet").innerHTML = MainWallet;
        }
    }
}

async function Kiss918WalletBalance(Username, HideLoading = true) {
    try {
        let model = {
            username: Username
        };
        var kissbalance = await GameBalancePostMethod(apiEndPoints.kiss918Balance, model);

        _918KissWallet = numberWithCommas(parseFloat(kissbalance.data.balance).toFixed(2));
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("KissRefershImg").style.display = "none";
            document.getElementById("918KissBalance").innerHTML = _918KissWallet;
            if ($('#lbl_918kissWalletbalanceDeposite').length) {
                document.getElementById("lbl_918kissWalletbalanceDeposite").innerHTML = _918KissWallet;
                document.getElementById("918KissInWallet").innerHTML = _918KissWallet;
                document.getElementById("ddl918KissWallet").innerHTML = _918KissWallet;
            }
        }
    }
    catch (ex) {
        _918KissWallet = "N/A";
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("KissRefershImg").style.display = "none";
            document.getElementById("918KissBalance").innerHTML = "N/A";
            if ($('#lbl_918kissWalletbalanceDeposite').length) {
                document.getElementById("lbl_918kissWalletbalanceDeposite").innerHTML = "N/A";
                document.getElementById("918KissInWallet").innerHTML = "N/A";
                document.getElementById("ddl918KissWallet").innerHTML = "N/A";
            }
        }
    }
}

async function AgWalletBalance(Username, HideLoading = true) {
    try {
        let model = {
            username: Username
        };
        var agbalance = await GameBalancePostMethod(apiEndPoints.agBalance, model);

        AGWallet = numberWithCommas(parseFloat(agbalance.data.balance).toFixed(2));
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("AgRefershImg").style.display = "none";
            document.getElementById("AGBalance").innerHTML = AGWallet;
            if ($('#lbl_AGWalletbalanceDeposite').length) {
                document.getElementById("lbl_AGWalletbalanceDeposite").innerHTML = AGWallet;
                document.getElementById("AGInWallet").innerHTML = AGWallet;
                document.getElementById("ddlAGWallet").innerHTML = AGWallet;
            }
        }
        if (AGWallet == 0 && agbalance.data.previousBalance > 0 && AGTrigger == false)
            StartTimerGameBalanceAPI("AG");
    }
    catch (ex) {
        AGWallet = "N/A";
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("AgRefershImg").style.display = "none";
            document.getElementById("AGBalance").innerHTML = "N/A";
            if ($('#lbl_AGWalletbalanceDeposite').length) {
                document.getElementById("lbl_AGWalletbalanceDeposite").innerHTML = "N/A";
                document.getElementById("AGInWallet").innerHTML = "N/A";
                document.getElementById("ddlAGWallet").innerHTML = "N/A";
            }
        }
    }
}

async function PlaytechWalletBalance(Username, HideLoading = true) {
    try {
        let model = {
            username: Username
        };
        var playtechbalance = await GameBalancePostMethod(apiEndPoints.playtechBalance, model);

        PlayTechWallet = numberWithCommas(parseFloat(playtechbalance.data.balance).toFixed(2));
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("PlaytechRefershImg").style.display = "none";
            document.getElementById("PlayTechBalance").innerHTML = PlayTechWallet;
            if ($('#lbl_PlaytechWalletbalanceDeposite').length) {
                document.getElementById("lbl_PlaytechWalletbalanceDeposite").innerHTML = PlayTechWallet;
                document.getElementById("PlaytechInWallet").innerHTML = PlayTechWallet;
                document.getElementById("ddlPlaytechWallet").innerHTML = PlayTechWallet;
            }
        }
        if (PlayTechWallet == 0 && playtechbalance.data.previousBalance > 0 && PlaytechTrigger == false)
            StartTimerGameBalanceAPI("Playtech");
    }
    catch (ex) {
        PlayTechWallet = "N/A";
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("PlaytechRefershImg").style.display = "none";
            document.getElementById("PlayTechBalance").innerHTML = "N/A";
            if ($('#lbl_PlaytechWalletbalanceDeposite').length) {
                document.getElementById("lbl_PlaytechWalletbalanceDeposite").innerHTML = "N/A";
                document.getElementById("PlaytechInWallet").innerHTML = "N/A";
                document.getElementById("ddlPlaytechWallet").innerHTML = "N/A";
            }
        }
    }
}

async function M8WalletBalance(Username, HideLoading = true) {
    try {
        let model = {
            username: Username
        };
        var M8balance = await GameBalancePostMethod(apiEndPoints.m8Balance, model);

        M8Wallet = numberWithCommas(parseFloat(M8balance.data.balance).toFixed(2));
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("M8RefershImg").style.display = "none";

            document.getElementById("M8Balance").innerHTML = M8Wallet;
            if ($('#lbl_M8WalletbalanceDeposite').length) {
                document.getElementById("lbl_M8WalletbalanceDeposite").innerHTML = M8Wallet;
                document.getElementById("M8InWallet").innerHTML = M8Wallet;
                document.getElementById("ddlM8Wallet").innerHTML = M8Wallet;
            }
        }
        if (M8Wallet == 0 && M8balance.data.previousBalance > 0 && M8Trigger == false)
            StartTimerGameBalanceAPI("M8");
    }
    catch (ex) {
        M8Wallet = "N/A";
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("M8RefershImg").style.display = "none";
            document.getElementById("M8Balance").innerHTML = "N/A";
            if ($('#lbl_M8WalletbalanceDeposite').length) {
                document.getElementById("lbl_M8WalletbalanceDeposite").innerHTML = "N/A";
                document.getElementById("M8InWallet").innerHTML = "N/A";
                document.getElementById("ddlM8Wallet").innerHTML = "N/A";
            }
        }
    }
}

async function MaxbetWalletBalance(Username, HideLoading = true) {
    try {
        let model = {
            username: Username
        };
        var Maxbetbalance = await GameBalancePostMethod(apiEndPoints.maxbetBalance, model);

        MaxBetWallet = numberWithCommas(parseFloat(Maxbetbalance.data.balance).toFixed(2));
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("MaxbetRefershImg").style.display = "none";
            document.getElementById("MaxBetBalance").innerHTML = MaxBetWallet;
            if ($('#lbl_MaxbetWalletbalanceDeposite').length) {
                document.getElementById("lbl_MaxbetWalletbalanceDeposite").innerHTML = MaxBetWallet;
                document.getElementById("MaxbetInWallet").innerHTML = MaxBetWallet;
                document.getElementById("ddlMaxBetWallet").innerHTML = MaxBetWallet;
            }
        }
        if (MaxBetWallet == 0 && Maxbetbalance.data.previousBalance > 0 && MaxbetTrigger == false)
            StartTimerGameBalanceAPI("MaxBet");
    }
    catch (ex) {
        MaxBetWallet = "N/A";
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("MaxbetRefershImg").style.display = "none";
            document.getElementById("MaxBetBalance").innerHTML = "N/A";
            if ($('#lbl_MaxbetWalletbalanceDeposite').length) {
                document.getElementById("lbl_MaxbetWalletbalanceDeposite").innerHTML = "N/A";
                document.getElementById("MaxbetInWallet").innerHTML = "N/A";
                document.getElementById("ddlMaxBetWallet").innerHTML = "N/A";
            }
        }
    }
}

async function Mega888WalletBalance(Username, HideLoading = true) {
    try {
        let model = {
            username: Username
        };
        var Mega888balance = await GameBalancePostMethod(apiEndPoints.mega888Balance, model);

        Mega888Wallet = numberWithCommas(parseFloat(Mega888balance.data.balance).toFixed(2));
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("MegaRefershImg").style.display = "none";

            document.getElementById("Mega888Balance").innerHTML = Mega888Wallet;
            if ($('#lbl_Mega888WalletbalanceDeposite').length) {
                document.getElementById("lbl_Mega888WalletbalanceDeposite").innerHTML = Mega888Wallet;
                document.getElementById("Mega888InWallet").innerHTML = Mega888Wallet;
                document.getElementById("ddlMega888Wallet").innerHTML = Mega888Wallet;
            }
        }
    }
    catch (ex) {
        Mega888Wallet = "N/A";
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("MegaRefershImg").style.display = "none";
            document.getElementById("Mega888Balance").innerHTML = "N/A";
            if ($('#lbl_Mega888WalletbalanceDeposite').length) {
                document.getElementById("lbl_Mega888WalletbalanceDeposite").innerHTML = "N/A";
                document.getElementById("Mega888InWallet").innerHTML = "N/A";
                document.getElementById("ddlMega888Wallet").innerHTML = "N/A";
            }
        }
    }
}

async function JokerWalletBalance(Username, HideLoading = true) {
    try {
        let model = {
            username: Username
        };
        var jokerbalance = await GameBalancePostMethod(apiEndPoints.jokerBalance, model);

        JokerWallet = numberWithCommas(parseFloat(jokerbalance.data.balance).toFixed(2));
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("JokerRefershImg").style.display = "none";

            document.getElementById("JokerBalance").innerHTML = JokerWallet;
            if ($('#lbl_JokerWalletbalanceDeposite').length) {
                document.getElementById("lbl_JokerWalletbalanceDeposite").innerHTML = JokerWallet;
                document.getElementById("JokerInWallet").innerHTML = JokerWallet;
                document.getElementById("ddlJokerWallet").innerHTML = JokerWallet;
            }
        }
    }
    catch (ex) {
        JokerWallet = "N/A";
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("JokerRefershImg").style.display = "none";
            document.getElementById("JokerBalance").innerHTML = "N/A";
            if ($('#lbl_JokerWalletbalanceDeposite').length) {
                document.getElementById("lbl_JokerWalletbalanceDeposite").innerHTML = "N/A";
                document.getElementById("JokerInWallet").innerHTML = "N/A";
                document.getElementById("ddlJokerWallet").innerHTML = "N/A";
            }
        }
    }
}

async function DGWalletBalance(Username, HideLoading = true) {
    try {
        let model = {
            username: Username
        };
        var dgbalance = await GameBalancePostMethod(apiEndPoints.dgBalance, model);

        DgWallet = numberWithCommas(parseFloat(dgbalance.data.balance).toFixed(2));
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("DgRefershImg").style.display = "none";

            document.getElementById("DGBalance").innerHTML = DgWallet;
            if ($('#lbl_DGWalletbalanceDeposite').length) {
                document.getElementById("lbl_DGWalletbalanceDeposite").innerHTML = DgWallet;
                document.getElementById("DGInWallet").innerHTML = DgWallet;
                document.getElementById("ddlDGWallet").innerHTML = DgWallet;
            }
        }
        if (DgWallet == 0 && dgbalance.data.previousBalance > 0 && DGTrigger == false)
            StartTimerGameBalanceAPI("DG");
    }
    catch (ex) {
        DgWallet = "N/A";
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("DgRefershImg").style.display = "none";
            document.getElementById("DGBalance").innerHTML = "N/A";
            if ($('#lbl_DGWalletbalanceDeposite').length) {
                document.getElementById("lbl_DGWalletbalanceDeposite").innerHTML = "N/A";
                document.getElementById("DGInWallet").innerHTML = "N/A";
                document.getElementById("ddlDGWallet").innerHTML = "N/A";
            }
        }
    }
}

async function SexyWalletBalance(Username, HideLoading = true) {
    try {
        let model = {
            username: Username
        };
        var sexybalance = await GameBalancePostMethod(apiEndPoints.sexyBalance, model);

        sexyWallet = numberWithCommas(parseFloat(sexybalance.data.balance).toFixed(2));
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("SexyRefershImg").style.display = "none";

            document.getElementById("SexyBalance").innerHTML = sexyWallet;
            if ($('#lbl_SexyWalletbalanceDeposite').length) {
                document.getElementById("lbl_SexyWalletbalanceDeposite").innerHTML = sexyWallet;
                document.getElementById("SexyInWallet").innerHTML = sexyWallet;
                document.getElementById("ddlSexyWallet").innerHTML = sexyWallet;
            }
        }
        if (sexyWallet == 0 && sexybalance.data.previousBalance > 0 && SexyTrigger == false)
            StartTimerGameBalanceAPI("Sexy");
    }
    catch (ex) {
        sexyWallet = "N/A";
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("SexyRefershImg").style.display = "none";
            document.getElementById("SexyBalance").innerHTML = "N/A";
            if ($('#lbl_SexyWalletbalanceDeposite').length) {
                document.getElementById("lbl_SexyWalletbalanceDeposite").innerHTML = "N/A";
                document.getElementById("SexyInWallet").innerHTML = "N/A";
                document.getElementById("ddlSexyWallet").innerHTML = "N/A";
            }
        }
    }
}

async function SAWalletBalance(Username, HideLoading = true) {
    try {
        let model = {
            username: Username
        };
        var sabalance = await GameBalancePostMethod(apiEndPoints.saBalance, model);
        saWallet = numberWithCommas(parseFloat(sabalance.data.balance).toFixed(2));

        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("SaRefershImg").style.display = "none";

            document.getElementById("SABalance").innerHTML = saWallet;

            if ($('#lbl_SAWalletbalanceDeposite').length) {
                document.getElementById("lbl_SAWalletbalanceDeposite").innerHTML = saWallet;
                document.getElementById("SAInWallet").innerHTML = saWallet;
                document.getElementById("ddlSaWallet").innerHTML = saWallet;
            }
        }
        if (saWallet == 0 && sabalance.data.previousBalance > 0 && SATrigger == false)
            StartTimerGameBalanceAPI("SA");
    }
    catch (ex) {
        saWallet = "N/A";
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("SaRefershImg").style.display = "none";
            document.getElementById("SABalance").innerHTML = "N/A";
            if ($('#lbl_SAWalletbalanceDeposite').length) {
                document.getElementById("lbl_SAWalletbalanceDeposite").innerHTML = "N/A";
                document.getElementById("SAInWallet").innerHTML = "N/A";
                document.getElementById("ddlSaWallet").innerHTML = "N/A";
            }
        }
    }
}

async function Pussy888WalletBalance(Username, HideLoading = true) {
    try {
        let model = {
            username: Username
        };
        var Pussy888balance = await GameBalancePostMethod(apiEndPoints.Pussy888Balance, model);
        Pussy888Wallet = numberWithCommas(parseFloat(Pussy888balance.data.balance).toFixed(2));
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("Pussy888RefershImg").style.display = "none";
            document.getElementById("Pussy888Balance").innerHTML = Pussy888Wallet;
            if ($('#lbl_Pussy888WalletbalanceDeposite').length) {
                document.getElementById("lbl_Pussy888WalletbalanceDeposite").innerHTML = Pussy888Wallet;
                document.getElementById("Pussy888InWallet").innerHTML = Pussy888Wallet;
                document.getElementById("ddlPussy888Wallet").innerHTML = Pussy888Wallet;
            }
        }
    }
    catch (ex) {
        Pussy888Wallet = "N/A";
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("Pussy888RefershImg").style.display = "none";
            document.getElementById("Pussy888Balance").innerHTML = "N/A";
            if ($('#lbl_Pussy888WalletbalanceDeposite').length) {
                document.getElementById("lbl_Pussy888WalletbalanceDeposite").innerHTML = "N/A";
                document.getElementById("Pussy888InWallet").innerHTML = "N/A";
                document.getElementById("ddlPussy888Wallet").innerHTML = "N/A";
            }
        }
    }
}

async function AllBetWalletBalance(Username, HideLoading = true) {
    try {
        let model = {
            username: Username,
            password: dec(GetLocalStorage('currentUserData')),
        };
        var allBetBalance = await GameBalancePostMethod(apiEndPoints.AllBetBalance, model);
        AllBetWallet = numberWithCommas(parseFloat(allBetBalance.data.balance).toFixed(2));

        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("AllBetRefershImg").style.display = "none";
            document.getElementById("AllBetBalance").innerHTML = AllBetWallet;
            if ($('#lbl_AllBetWalletbalanceDeposite').length) {
                document.getElementById("lbl_AllBetWalletbalanceDeposite").innerHTML = AllBetWallet;
                document.getElementById("AllBetInWallet").innerHTML = AllBetWallet;
                document.getElementById("ddlAllBetWallet").innerHTML = AllBetWallet;
            }
        }
        if (AllBetWallet == 0 && allBetBalance.data.previousBalance > 0 && AllbetTrigger == false)
            StartTimerGameBalanceAPI("AllBet");
    }
    catch (ex) {
        AllBetWallet = "N/A";
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("AllBetRefershImg").style.display = "none";
            document.getElementById("AllBetBalance").innerHTML = "N/A";
            if ($('#lbl_AllBetWalletbalanceDeposite').length) {
                document.getElementById("lbl_AllBetWalletbalanceDeposite").innerHTML = "N/A";
                document.getElementById("AllBetInWallet").innerHTML = "N/A";
                document.getElementById("ddlAllBetWallet").innerHTML = "N/A";
            }
        }
    }
}

async function WMWalletBalance(Username, HideLoading = true) {
    try {
        let model = {
            username: Username
        };
        var WMBalance = await GameBalancePostMethod(apiEndPoints.WMBalance, model);

        WMWallet = numberWithCommas(parseFloat(WMBalance.data.balance).toFixed(2));

        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("WMRefershImg").style.display = "none";
            document.getElementById("WMBalance").innerHTML = WMWallet;

            if ($('#lbl_WMWalletbalanceDeposite').length) {
                document.getElementById("lbl_WMWalletbalanceDeposite").innerHTML = WMWallet;
                document.getElementById("WMInWallet").innerHTML = WMWallet;
                document.getElementById("ddlWMWallet").innerHTML = WMWallet;
            }
        }
        if (WMWallet == 0 && WMBalance.data.previousBalance > 0 && WMTrigger == false)
            StartTimerGameBalanceAPI("WM");
    }
    catch (ex) {
        WMWallet = "N/A";
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("WMRefershImg").style.display = "none";
            document.getElementById("WMBalance").innerHTML = "N/A";
            if ($('#lbl_WMWalletbalanceDeposite').length) {
                document.getElementById("lbl_WMWalletbalanceDeposite").innerHTML = "N/A";
                document.getElementById("WMInWallet").innerHTML = "N/A";
                document.getElementById("ddlWMWallet").innerHTML = "N/A";
            }
        }
    }
}

async function PragmaticWalletBalance(Username, HideLoading = true) {
    try {
        let model = {
            username: Username
        };
        var PragmaticBalance = await GameBalancePostMethod(apiEndPoints.PragmaticBalance, model);

        PragmaticWallet = numberWithCommas(parseFloat(PragmaticBalance.data.balance).toFixed(2));
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("PragmaticRefershImg").style.display = "none";

            document.getElementById("PragmaticBalance").innerHTML = PragmaticWallet;

            if ($('#lbl_PragmaticWalletbalanceDeposite').length) {
                document.getElementById("lbl_PragmaticWalletbalanceDeposite").innerHTML = PragmaticWallet;
                document.getElementById("PragmaticInWallet").innerHTML = PragmaticWallet;
                document.getElementById("ddlPragmaticWallet").innerHTML = PragmaticWallet;
            }
        }
    }
    catch (ex) {
        PragmaticWallet = "N/A";
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("PragmaticRefershImg").style.display = "none";
            document.getElementById("PragmaticBalance").innerHTML = "N/A";
            if ($('#lbl_PragmaticWalletbalanceDeposite').length) {
                document.getElementById("lbl_PragmaticWalletbalanceDeposite").innerHTML = "N/A";
                document.getElementById("PragmaticInWallet").innerHTML = "N/A";
                document.getElementById("ddlPragmaticWallet").innerHTML = "N/A";
            }
        }
    }
}

async function YeeBetWalletBalance(Username, HideLoading = true) {
    try {
        let model = {
            username: Username
        };

        let YeeBetBalance = await GameBalancePostMethod(apiEndPoints.YeeBetBalance, model);

        YeeBetWallet = numberWithCommas(parseFloat(YeeBetBalance.data.balance).toFixed(2));
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("YeeBetRefershImg").style.display = "none";

            document.getElementById("YeeBetBalance").innerHTML = YeeBetWallet;

            if ($('#lbl_YeeBetWalletbalanceDeposite').length) {
                document.getElementById("lbl_YeeBetWalletbalanceDeposite").innerHTML = YeeBetWallet;
                document.getElementById("YeeBetInWallet").innerHTML = YeeBetWallet;
                document.getElementById("ddlYeeBetWallet").innerHTML = YeeBetWallet;
            }
        }
    }
    catch (ex) {
        YeeBetWallet = "N/A";
        if (HideLoading) {
            if (window.location.href.includes("Account/Profile"))
                document.getElementById("YeeBetRefershImg").style.display = "none";
            document.getElementById("YeeBetBalance").innerHTML = "N/A";
            if ($('#lbl_YeeBetWalletbalanceDeposite').length) {
                document.getElementById("lbl_YeeBetWalletbalanceDeposite").innerHTML = "N/A";
                document.getElementById("YeeBetInWallet").innerHTML = "N/A";
                document.getElementById("ddlYeeBetWallet").innerHTML = "N/A";
            }
        }
    }
}

//#endregion all WalletBalance

function RefershBalance() {
    document.getElementById("ddlmainWallet").innerHTML = "feching..";
    document.getElementById("ddl918KissWallet").innerHTML = "feching..";
    document.getElementById("ddlAGWallet").innerHTML = "feching..";
    document.getElementById("ddlM8Wallet").innerHTML = "feching..";
    document.getElementById("ddlJokerWallet").innerHTML = "feching..";
    document.getElementById("ddlPlaytechWallet").innerHTML = "feching..";
    document.getElementById("ddlMaxBetWallet").innerHTML = "feching..";
    document.getElementById("ddlMega888Wallet").innerHTML = "feching..";
    document.getElementById("ddlDGWallet").innerHTML = "feching..";
    document.getElementById("ddlSexyWallet").innerHTML = "feching..";
    document.getElementById("ddlSaWallet").innerHTML = "feching..";
    document.getElementById("ddlPussy888Wallet").innerHTML = "feching..";
    document.getElementById("ddlAllBetWallet").innerHTML = "feching..";
    document.getElementById("ddlWMWallet").innerHTML = "feching..";
    document.getElementById("ddlPragmaticWallet").innerHTML = "feching..";
    document.getElementById("ddlYeeBetWallet").innerHTML = "feching..";
    document.getElementById("menuMainWallet").innerHTML = "<img class='loading-gif' src='../images/loading.gif'/>";
    WalletBalance();
}

async function WalletBalanceMaxTransfer() {
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
    await AllBetWalletBalance(globalParameter.data.allBetGamePrefix + userDetails.data.userId);
    await WMWalletBalance(globalParameter.data.wmGamePrefix + userDetails.data.userId);
    await PragmaticWalletBalance(globalParameter.data.pragmaticGamePrefix + userDetails.data.userId);
    await YeeBetWalletBalance(globalParameter.data.YEEBETGamePrefix + userDetails.data.userId);
}