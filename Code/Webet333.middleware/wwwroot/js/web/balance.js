//#region Declare Vairable
var walletIds = [
    "joker_balance", "playtech_balance", "kiss918_balance", "ag_balance", "m8_balance", "mega888_balance", "maxbet_balance",
    "dg_balance", "sexy_baccarat_balance", "sa_balance", "pussy888_balance", "allbet_balance", "wm_balance", "pragmatic_balance",
    "yeebet_balance", "sbo_balance"
];

let UsersBalance = {
    MainBalance: null,
    Kiss918Balance: null,
    JokerBalance: null,
    Mega888Balance: null,
    Pussy888Balance: null,
    PragmaticBalance: null,
    PlaytechBalance: null,
    AGBalance: null,
    DGBalance: null,
    SABalance: null,
    WMBalance: null,
    SexyBaccaratBalance: null,
    AllBetBalance: null,
    M8Balance: null,
    MaxBetBalance: null,
    YeeBetBalance: null,
    SboBalance: null
}

let GameUsernames = {
    Username: null,
    Kiss918Username: null,
    JokerUsername: null,
    Mega888Username: null,
    Pussy888Username: null,
    PragmaticUsername: null,
    PlaytechUsername: null,
    AGUsername: null,
    DGUsername: null,
    SAUsername: null,
    WMUsername: null,
    SexyBaccaratUsername: null,
    AllBetUsername: null,
    M8Username: null,
    MaxBetUsername: null,
    YeeBetUsername: null,
    SboUsername: null
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

//#endregion Declare Vairable

//#region Onload
$(window).on('load', function () {
    if (GetLocalStorage('currentUser') !== null) {
        SetUsername();
        LoadAllBalance();
        PlaytechBrokenStatus(false);
        PragmaticBrokenStatus(false)
        setTimeout(function () {
            setInterval(function () {

                if (UsersBalance.MainBalance == null) MainWallet();
                if (UsersBalance.Kiss918Balance == null) Kiss918Wallet(GameUsernames.Kiss918Username);
                if (UsersBalance.JokerBalance == null) JokerWallet(GameUsernames.JokerUsername);
                if (UsersBalance.Mega888Balance == null) Mega888Wallet(GameUsernames.Mega888Username);
                if (UsersBalance.Pussy888Balance == null) Pussy888Wallet(GameUsernames.Pussy888Username);
                if (UsersBalance.AGBalance == null) AGWallet(GameUsernames.AGUsername);
                if (UsersBalance.DGBalance == null) DGWallet(GameUsernames.DGUsername);
                if (UsersBalance.SABalance == null) SAWallet(GameUsernames.SAUsername);
                if (UsersBalance.WMBalance == null) WMWallet(GameUsernames.WMUsername);
                if (UsersBalance.PlaytechBalance == null) PlaytechWallet(GameUsernames.PlaytechUsername);
                if (UsersBalance.SexyBaccaratBalance == null) SexyBaccaratWallet(GameUsernames.SexyBaccaratUsername);
                if (UsersBalance.PragmaticBalance == null) PragmaticWallet(GameUsernames.PragmaticUsername);
                if (UsersBalance.AllBetBalance == null) AllBetWallet(GameUsernames.AllBetUsername);
                if (UsersBalance.M8Balance == null) M8Wallet(GameUsernames.M8Username);
                if (UsersBalance.M8Balance == null) MaxBetWallet(GameUsernames.MaxBetUsername);
                if (UsersBalance.YeeBetBalance == null) YeeBetWallet(GameUsernames.YeeBetUsername);
                if (UsersBalance.SboBalance == null) SboWallet(GameUsernames.SboUsername);


            }, 1000);
        }, 15000);
    }
});
//#endregion Onload

function LoadAllBalance() {
    MainWallet();
    if (GameUsernames.Kiss918Username != null) Kiss918Wallet(GameUsernames.Kiss918Username);
    if (GameUsernames.JokerUsername != null) JokerWallet(GameUsernames.JokerUsername);
    if (GameUsernames.Mega888Username != null) Mega888Wallet(GameUsernames.Mega888Username);
    if (GameUsernames.Pussy888Username != null) Pussy888Wallet(GameUsernames.Pussy888Username);
    if (GameUsernames.AGUsername != null) AGWallet(GameUsernames.AGUsername);
    if (GameUsernames.DGUsername != null) DGWallet(GameUsernames.DGUsername);
    if (GameUsernames.SAUsername != null) SAWallet(GameUsernames.SAUsername);
    if (GameUsernames.WMUsername != null) WMWallet(GameUsernames.WMUsername);
    if (GameUsernames.PlaytechUsername != null) PlaytechWallet(GameUsernames.PlaytechUsername);
    if (GameUsernames.SexyBaccaratUsername != null) SexyBaccaratWallet(GameUsernames.SexyBaccaratUsername);
    if (GameUsernames.PragmaticUsername != null) PragmaticWallet(GameUsernames.PragmaticUsername);
    if (GameUsernames.AllBetUsername != null) AllBetWallet(GameUsernames.AllBetUsername);
    if (GameUsernames.M8Username != null) M8Wallet(GameUsernames.M8Username);
    if (GameUsernames.MaxBetUsername != null) MaxBetWallet(GameUsernames.MaxBetUsername);
    if (GameUsernames.YeeBetUsername != null) YeeBetWallet(GameUsernames.YeeBetUsername);
    if (GameUsernames.SboUsername != null) SboWallet(GameUsernames.SboUsername);
}

async function LoadAllBalanceAsync() {
    await MainWallet();
    if (GameUsernames.kiss918Balance != null) await Kiss918Wallet(GameUsernames.Kiss918Username, false);
    if (GameUsernames.JokerUsername != null) await JokerWallet(GameUsernames.JokerUsername, false);
    if (GameUsernames.Mega888Username != null) await Mega888Wallet(GameUsernames.Mega888Username, false);
    if (GameUsernames.Pussy888Username != null) await Pussy888Wallet(GameUsernames.Pussy888Username, false);
    if (GameUsernames.AGUsername != null) await AGWallet(GameUsernames.AGUsername, false);
    if (GameUsernames.DGUsername != null) await DGWallet(GameUsernames.DGUsername, false);
    if (GameUsernames.SAUsername != null) await SAWallet(GameUsernames.SAUsername, false);
    if (GameUsernames.WMUsername != null) await WMWallet(GameUsernames.WMUsername, false);
    if (GameUsernames.PlaytechUsername != null) await PlaytechWallet(GameUsernames.PlaytechUsername, false);
    if (GameUsernames.SexyBaccaratUsername != null) await SexyBaccaratWallet(GameUsernames.SexyBaccaratUsername, false);
    if (GameUsernames.PragmaticUsername != null) await PragmaticWallet(GameUsernames.PragmaticUsername, false);
    if (GameUsernames.AllBetUsername != null) await AllBetWallet(GameUsernames.AllBetUsername, false);
    if (GameUsernames.M8Username != null) await M8Wallet(GameUsernames.M8Username, false);
    if (GameUsernames.MaxBetUsername != null) await MaxBetWallet(GameUsernames.MaxBetUsername, false);
    if (GameUsernames.YeeBetUsername != null) await YeeBetWallet(GameUsernames.YeeBetUsername, false);
    if (GameUsernames.SboUsername != null) await SboWallet(GameUsernames.SboUsername);
}

async function LoadBalanceBasedOnWalletNameAsync(WalletName) {

    switch (WalletName) {
        case "Main Wallet": MainWallet(); break;
        case "918Kiss Wallet": if (GameUsernames.Kiss918Username != null) await Kiss918Wallet(GameUsernames.Kiss918Username); break;
        case "Joker Wallet": if (GameUsernames.JokerUsername != null) await JokerWallet(GameUsernames.JokerUsername); break;
        case "Mega888 Wallet": if (GameUsernames.Mega888Username != null) await Mega888Wallet(GameUsernames.Mega888Username); break;
        case "Pussy888 Wallet": if (GameUsernames.Pussy888Username != null) await Pussy888Wallet(GameUsernames.Pussy888Username); break;
        case "AG Wallet": if (GameUsernames.AGUsername != null) await AGWallet(GameUsernames.AGUsername); break;
        case "DG Wallet": if (GameUsernames.DGUsername != null) await DGWallet(GameUsernames.DGUsername); break;
        case "SA Wallet": if (GameUsernames.SAUsername != null) await SAWallet(GameUsernames.SAUsername); break;
        case "WM Wallet": if (GameUsernames.WMUsername != null) await WMWallet(GameUsernames.WMUsername); break;
        case "PlayTech Wallet": if (GameUsernames.PlaytechUsername != null) await PlaytechWallet(GameUsernames.PlaytechUsername); break;
        case "Sexy Wallet": if (GameUsernames.SexyBaccaratUsername != null) await SexyBaccaratWallet(GameUsernames.SexyBaccaratUsername); break;
        case "Pragmatic Wallet": if (GameUsernames.PragmaticUsername != null) await PragmaticWallet(GameUsernames.PragmaticUsername); break;
        case "AllBet Wallet": if (GameUsernames.AllBetUsername != null) await AllBetWallet(GameUsernames.AllBetUsername); break;
        case "M8 Wallet": if (GameUsernames.M8Username != null) await M8Wallet(GameUsernames.M8Username); break;
        case "MaxBet Wallet": if (GameUsernames.MaxBetUsername != null) await MaxBetWallet(GameUsernames.MaxBetUsername); break;
        case "YeeBet Wallet": if (GameUsernames.YeeBetUsername != null) await YeeBetWallet(GameUsernames.YeeBetUsername); break;
        case "SBO Wallet": if (GameUsernames.SboUsername != null) await SboWallet(GameUsernames.SboUsername); break;
    }
}

async function ReturnBalanceBasedOnWalletName(WalletName) {
    var balance;
    switch (WalletName) {
        case "Main Wallet": balance = UsersBalance.MainBalance; break;
        case "918Kiss Wallet": balance = UsersBalance.Kiss918Balance; break;
        case "Joker Wallet": balance = UsersBalance.JokerBalance; break;
        case "Mega888 Wallet": balance = UsersBalance.Mega888Balance; break;
        case "Pussy888 Wallet": balance = UsersBalance.Pussy888Balance; break;
        case "AG Wallet": balance = UsersBalance.AGBalance; break;
        case "DG Wallet": balance = UsersBalance.DGBalance; break;
        case "SA Wallet": balance = UsersBalance.SABalance; break;
        case "WM Wallet": balance = UsersBalance.WMBalance; break;
        case "PlayTech Wallet": balance = UsersBalance.PlaytechBalance; break;
        case "Sexy Wallet": balance = UsersBalance.SexyBaccaratBalance; break;
        case "Pragmatic Wallet": balance = UsersBalance.PragmaticBalance; break;
        case "AllBet Wallet": balance = UsersBalance.AllBetBalance; break;
        case "M8 Wallet": balance = UsersBalance.M8Balance; break;
        case "MaxBet Wallet": balance = UsersBalance.MaxBetBalance; break;
        case "YeeBet Wallet": balance = UsersBalance.YeeBetBalance; break;
        case "SBO Wallet": balance = UsersBalance.SboBalance; break;
    }

    if (balance == "N/A")
        balance = "0.00";
    return balance.replace(",", "");
}

//#region  Set GameUsername
async function SetUsername() {
    var userDetails = JSON.parse(Decryption(GetSessionStorage("userDetails")));
    var GameUsername = JSON.parse(Decryption(GetSessionStorage("GameUsername")));

    if (userDetails == null) {
        var res = await GetMethod(accountEndPoints.getProfile);
        SetSessionStorage('userDetails', Encryption(JSON.stringify(res.response.data)));
        userDetails = res.response.data;
    }
    if (GameUsername == null) {
        var username = await PostMethod(accountEndPoints.getUsername, {});
        console.log(username.response.data);
        SetSessionStorage('GamePreFix', Encryption(JSON.stringify(username.response.data)));
        GameUsername = username.response.data;
    }

    GameUsernames.AGUsername = GameUsername.agUsername;
    GameUsernames.AllBetUsername = GameUsername.allBetUsername;
    GameUsernames.DGUsername = GameUsername.dgUsername;
    GameUsernames.SAUsername = GameUsername.saUsername;
    GameUsernames.WMUsername = GameUsername.wmUsername;
    GameUsernames.SexyBaccaratUsername = GameUsername.sexyUsername;
    GameUsernames.PlaytechUsername = (GameUsername.playtechUsername.replace("#", "")).toUpperCase();;
    GameUsernames.PragmaticUsername = GameUsername.pragmaticUsername;
    GameUsernames.JokerUsername = GameUsername.jokerUsername.replace(/[^0-9a-zA-Z]+/g, "");
    GameUsernames.Mega888Username = GameUsername.mega888Username;
    GameUsernames.Pussy888Username = GameUsername.pussy888Username;
    GameUsernames.Kiss918Username = GameUsername.userName918;
    GameUsernames.M8Username = GameUsername.m8Username;
    GameUsernames.MaxBetUsername = GameUsername.maxbetUsername;
    GameUsernames.YeeBetUsername = GameUsername.yeebetUsername;
    GameUsernames.SboUsername = GameUsername.sboUsername;

}
//#endregion 

function SetLoadingImagesInBalance(Id) {
    SetAllValueInElement(Id, '<img src="/images/loading.gif" />')
}

function SetFetchingWordInBalance(Id) {
    SetAllValueInElement(Id + "_dropdown", 'Fetching...')
}

function SetBalanceOnAllPlace(Id, Value) {
    SetAllValueInElement(Id, Value);
    SetAllValueInElement(Id + "_dropdown", Value);
}

function FormatBalance(amount) {
    return parseFloat(amount).toFixed(2)
}

function SetLoadingImageForAllId() {
    for (i = 0; i < walletIds.length; i++) {
        SetLoadingImagesInBalance(walletIds[i]);
        SetFetchingWordInBalance(walletIds[i]);
    }

    SetFetchingWordInBalance('main_balance')
}

function SetLoadingImageBaseOnWalletName(WalletName) {

    switch (WalletName) {
        case "918Kiss Wallet": SetLoadingImagesInBalance("kiss918_balance"); SetFetchingWordInBalance("kiss918_balance"); break;
        case "Joker Wallet": SetLoadingImagesInBalance("joker_balance"); SetFetchingWordInBalance("joker_balance"); break;
        case "Mega888 Wallet": SetLoadingImagesInBalance("mega888_balance"); SetFetchingWordInBalance("mega888_balance"); break;
        case "Pussy888 Wallet": SetLoadingImagesInBalance("pussy888_balance"); SetFetchingWordInBalance("pussy888_balance"); break;
        case "AG Wallet": SetLoadingImagesInBalance("ag_balance"); SetFetchingWordInBalance("ag_balance"); break;
        case "DG Wallet": SetLoadingImagesInBalance("dg_balance"); SetFetchingWordInBalance("dg_balance"); break;
        case "SA Wallet": SetLoadingImagesInBalance("sa_balance"); SetFetchingWordInBalance("sa_balance"); break;
        case "WM Wallet": SetLoadingImagesInBalance("wm_balance"); SetFetchingWordInBalance("wm_balance"); break;
        case "PlayTech Wallet": SetLoadingImagesInBalance("playtech_balance"); SetFetchingWordInBalance("playtech_balance"); break;
        case "Sexy Wallet": SetLoadingImagesInBalance("sexy_baccarat_balance"); SetFetchingWordInBalance("sexy_baccarat_balance"); break;
        case "Pragmatic Wallet": SetLoadingImagesInBalance("pragmatic_balance"); SetFetchingWordInBalance("pragmatic_balance"); break;
        case "AllBet Wallet": SetLoadingImagesInBalance("allbet_balance"); SetFetchingWordInBalance("allbet_balance"); break;
        case "M8 Wallet": SetLoadingImagesInBalance("m8_balance"); SetFetchingWordInBalance("m8_balance"); break;
        case "MaxBet Wallet": SetLoadingImagesInBalance("maxbet_balance"); SetFetchingWordInBalance("maxbet_balance"); break;
        case "YeeBet Wallet": SetLoadingImagesInBalance("yeebet_balance"); SetFetchingWordInBalance("yeebet_balance"); break;
        case "SBO Wallet": SetLoadingImagesInBalance("sbo_balance"); SetFetchingWordInBalance("sbo_balance"); break;
    }
}

function RefreshBalance() {
    SetLoadingImageForAllId();
    LoadAllBalance();
}

function CheckNAorNot(Value) {
    return Value == "N/A" ? "0.0" : Value;
}

async function RestoreBalance() {
    $("#layout_restore_image").attr("src", "/images/loading.gif");
    SetLoadingImageForAllId();
    await GetProfileAndSetInSessionStorage();
    await GetGlobalParameterAndSetInSessionStorage
    await LoadAllBalanceAsync();
    let restoreModel = {
        kiss918wallet: CheckNAorNot(UsersBalance.Kiss918Balance),
        maxbetwallet: CheckNAorNot(UsersBalance.MaxBetBalance),
        jokerwallet: CheckNAorNot(UsersBalance.JokerBalance),
        agwallet: CheckNAorNot(UsersBalance.AGBalance),
        m8wallet: CheckNAorNot(UsersBalance.M8Balance),
        playtechwallet: CheckNAorNot(UsersBalance.PlaytechBalance),
        mega888wallet: CheckNAorNot(UsersBalance.Mega888Balance),
        dgwallet: CheckNAorNot(UsersBalance.DGBalance),
        sexywallet: CheckNAorNot(UsersBalance.SexyBaccaratBalance),
        sawallet: CheckNAorNot(UsersBalance.SABalance),
        pussy888wallet: CheckNAorNot(UsersBalance.Pussy888Balance),
        allbetwallet: CheckNAorNot(UsersBalance.AllBetBalance),
        WMwallet: CheckNAorNot(UsersBalance.WMBalance),
        pragmaticwallet: CheckNAorNot(UsersBalance.PragmaticBalance),
        YeeBetWallet: CheckNAorNot(UsersBalance.YeeBetBalance),
        sbowallet: CheckNAorNot(UsersBalance.SboBalance),
        id: null
    }
    await PostMethod(transactionEndPoints.restore, restoreModel);
    LoadAllBalance();
    $("#layout_restore_image").attr("src", "/images/restore.png");
}

function ConvertBalanceIntoCommasValue(amount) {
    amount = FormatBalance(amount);
    if (amount != "NaN") {
        try {
            return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        catch {
            return "N/A"
        }
    }
    else {
        return "N/A"
    }
}

async function GetDailyTurnover() {
    $("#refresh-turnover").addClass("rotate");
    let model = {}
    var res = await PostMethod(accountEndPoints.userTotalTurnover, model)
    if (res.status == 200) {
        SetAllValueInElement("total_turnover", FormatBalance(res.response.data.total))
        SetAllValueInElement("joker_turnover", FormatBalance(res.response.data.response.jokerWinover))
        SetAllValueInElement("playtech_turnover", FormatBalance(res.response.data.response.playtechTurover))
        SetAllValueInElement("kiss_turnover", FormatBalance(res.response.data.response.kiss918Winover))
        SetAllValueInElement("ag_turnover", FormatBalance(res.response.data.response.agTurover))
        SetAllValueInElement("m8_turnover", FormatBalance(res.response.data.response.m8Turover))
        SetAllValueInElement("maxbet_turnover", FormatBalance(res.response.data.response.maxbetTurover))
        SetAllValueInElement("mega888_turnover", FormatBalance(res.response.data.response.mega888Winover))
        SetAllValueInElement("dg_turnover", FormatBalance(res.response.data.response.dgTurover))
        SetAllValueInElement("sexy_turnover", FormatBalance(res.response.data.response.sexyTurover))
        SetAllValueInElement("sa_turnover", FormatBalance(res.response.data.response.saTurover))
        SetAllValueInElement("pussy_turnover", FormatBalance(res.response.data.response.pussy888Turover))
        SetAllValueInElement("allbet_turnover", FormatBalance(res.response.data.response.allBetTurover))
        SetAllValueInElement("wm_turnover", FormatBalance(res.response.data.response.wmTurover))
        SetAllValueInElement("pragmatic_turnover", FormatBalance(res.response.data.response.pragmaticTurover))
        SetAllValueInElement("yeebet_turnover", FormatBalance(res.response.data.response.yeeBetTurover))
        SetAllValueInElement("sbo_turnover", FormatBalance(res.response.data.response.sboTurover))

    }
    $("#refresh-turnover").removeClass("rotate");
}

//#region All Wallet Balance

async function MainWallet() {
    let model = {}
    try {
        var res = await PostMethod(gameBalanceEndPoints.mainBalance, model);
        if (res.status == 200) {
            UsersBalance.MainBalance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.MainBalance = "0.00";
        }
        SetBalanceOnAllPlace("main_balance", UsersBalance.MainBalance);
    }
    catch (e) {
        UsersBalance.MainBalance = "0.00";
        SetBalanceOnAllPlace("main_balance", UsersBalance.MainBalance);
    }
}

async function Kiss918Wallet(Username, IsDivValueSet = true) {
    let model = {
        username: Username
    };
    try {
        var res = await PostMethod(gameBalanceEndPoints.kiss918Balance, model);

        if (res.status == 200) {
            UsersBalance.Kiss918Balance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.Kiss918Balance = "N/A";
        }
        if (IsDivValueSet)
            SetBalanceOnAllPlace("kiss918_balance", UsersBalance.Kiss918Balance);
    }
    catch (e) {
        UsersBalance.Kiss918Balance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("kiss918_balance", UsersBalance.Kiss918Balance);
    }
}

async function JokerWallet(Username, IsDivValueSet = true) {
    let model = {
        username: Username
    };
    try {
        var res = await PostMethod(gameBalanceEndPoints.jokerBalance, model);

        if (res.status == 200) {
            UsersBalance.JokerBalance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.JokerBalance = "N/A";
        }
        if (IsDivValueSet)
            SetBalanceOnAllPlace("joker_balance", UsersBalance.JokerBalance);
    }
    catch (e) {
        UsersBalance.JokerBalance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("joker_balance", UsersBalance.JokerBalance);
    }
}

async function Mega888Wallet(Username, IsDivValueSet = true) {
    let model = {
        username: Username
    };
    try {
        var res = await PostMethod(gameBalanceEndPoints.mega888Balance, model);

        if (res.status == 200) {
            UsersBalance.Mega888Balance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.Mega888Balance = "N/A";
        }
        if (IsDivValueSet)
            SetBalanceOnAllPlace("mega888_balance", UsersBalance.Mega888Balance);
    }
    catch (e) {
        UsersBalance.Mega888Balance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("mega888_balance", UsersBalance.Mega888Balance);
    }
}

async function Pussy888Wallet(Username, IsDivValueSet = true) {
    let model = {
        username: Username
    };
    try {
        var res = await PostMethod(gameBalanceEndPoints.pussy888Balance, model);

        if (res.status == 200) {
            UsersBalance.Pussy888Balance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.Pussy888Balance = "N/A";
        }
        if (IsDivValueSet)
            SetBalanceOnAllPlace("pussy888_balance", UsersBalance.Pussy888Balance);
    }
    catch (e) {
        UsersBalance.Pussy888Balance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("pussy888_balance", UsersBalance.Pussy888Balance);
    }
}

async function AGWallet(Username, IsDivValueSet = true) {
    let model = {
        username: Username
    };
    try {
        var res = await PostMethod(gameBalanceEndPoints.agBalance, model);

        if (res.status == 200) {
            UsersBalance.AGBalance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.AGBalance = "N/A";
        }
        if (IsDivValueSet)
            SetBalanceOnAllPlace("ag_balance", UsersBalance.AGBalance);

        if (UsersBalance.AGBalance == 0 && res.response.data.previousBalance > 0 && AGTrigger == false)
            StartTimerGameBalanceAPI("AG");

    }
    catch (e) {
        UsersBalance.AGBalance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("ag_balance", UsersBalance.AGBalance);
    }
}

async function DGWallet(Username, IsDivValueSet = true) {
    let model = {
        username: Username
    };
    try {
        var res = await PostMethod(gameBalanceEndPoints.dgBalance, model);

        if (res.status == 200) {
            UsersBalance.DGBalance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.DGBalance = "N/A";
        }
        if (IsDivValueSet)
            SetBalanceOnAllPlace("dg_balance", UsersBalance.DGBalance);

        if (UsersBalance.DGBalance == 0 && res.response.data.previousBalance > 0 && DGTrigger == false)
            StartTimerGameBalanceAPI("DG");
    }
    catch (e) {
        UsersBalance.DGBalance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("dg_balance", UsersBalance.DGBalance);
    }
}

async function SAWallet(Username, IsDivValueSet = true) {
    let model = {
        username: Username
    };
    try {
        var res = await PostMethod(gameBalanceEndPoints.saBalance, model);

        if (res.status == 200) {
            UsersBalance.SABalance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.SABalance = "N/A";
        }
        if (IsDivValueSet)
            SetBalanceOnAllPlace("sa_balance", UsersBalance.SABalance);

        if (UsersBalance.SABalance == 0 && res.response.data.previousBalance > 0 && SATrigger == false)
            StartTimerGameBalanceAPI("SA");
    }
    catch (e) {
        UsersBalance.SABalance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("sa_balance", UsersBalance.SABalance);
    }
}

async function WMWallet(Username, IsDivValueSet = true) {
    let model = {
        username: Username
    };
    try {
        var res = await PostMethod(gameBalanceEndPoints.wmBalance, model);

        if (res.status == 200) {
            UsersBalance.WMBalance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.WMBalance = "N/A";
        }
        if (IsDivValueSet)
            SetBalanceOnAllPlace("wm_balance", UsersBalance.WMBalance);

        if (UsersBalance.WMBalance == 0 && res.response.data.previousBalance > 0 && WMTrigger == false)
            StartTimerGameBalanceAPI("WM");
    }
    catch (e) {
        UsersBalance.WMBalance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("wm_balance", UsersBalance.WMBalance);
    }
}

async function PlaytechWallet(Username, IsDivValueSet = true) {
    let model = {
        username: Username
    };
    try {
        var res = await PostMethod(gameBalanceEndPoints.playtechBalance, model);

        if (res.status == 200) {
            UsersBalance.PlaytechBalance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.PlaytechBalance = "N/A";
        }
        if (IsDivValueSet)
            SetBalanceOnAllPlace("playtech_balance", UsersBalance.PlaytechBalance);

        if (UsersBalance.PlaytechBalance == 0 && res.response.data.previousBalance > 0 && PlaytechTrigger == false)
            StartTimerGameBalanceAPI("Playtech");

    }
    catch (e) {
        UsersBalance.PlaytechBalance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("playtech_balance", UsersBalance.PlaytechBalance);
    }
}

async function SexyBaccaratWallet(Username, IsDivValueSet = true) {
    let model = {
        username: Username
    };
    try {
        var res = await PostMethod(gameBalanceEndPoints.sexyBalance, model);

        if (res.status == 200) {
            UsersBalance.SexyBaccaratBalance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.SexyBaccaratBalance = "N/A";
        }
        if (IsDivValueSet)
            SetBalanceOnAllPlace("sexy_baccarat_balance", UsersBalance.SexyBaccaratBalance);

        if (UsersBalance.SexyBaccaratBalance == 0 && res.response.data.previousBalance > 0 && SexyTrigger == false)
            StartTimerGameBalanceAPI("Sexy");
    }
    catch (e) {
        UsersBalance.SexyBaccaratBalance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("sexy_baccarat_balance", UsersBalance.SexyBaccaratBalance);
    }
}

async function PragmaticWallet(Username, IsDivValueSet = true) {
    let model = {
        username: Username
    };
    try {
        var res = await PostMethod(gameBalanceEndPoints.pragmaticBalance, model);

        if (res.status == 200) {
            UsersBalance.PragmaticBalance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.PragmaticBalance = "N/A";
        }
        if (IsDivValueSet)
            SetBalanceOnAllPlace("pragmatic_balance", UsersBalance.PragmaticBalance);
    }
    catch (e) {
        UsersBalance.PragmaticBalance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("pragmatic_balance", UsersBalance.PragmaticBalance);
    }
}

async function AllBetWallet(Username, IsDivValueSet = true) {
    let model = {
        username: Username,
        password: Decryption(GetLocalStorage("currentUserData"))
    };
    try {
        var res = await PostMethod(gameBalanceEndPoints.allBetBalance, model);

        if (res.status == 200) {
            UsersBalance.AllBetBalance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.AllBetBalance = "N/A";
        }
        if (IsDivValueSet)
            SetBalanceOnAllPlace("allbet_balance", UsersBalance.AllBetBalance);

        if (UsersBalance.AllBetBalance == 0 && res.response.data.previousBalance > 0 && AllbetTrigger == false)
            StartTimerGameBalanceAPI("AllBet");
    }
    catch (e) {
        UsersBalance.AllBetBalance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("allbet_balance", UsersBalance.AllBetBalance);
    }
}

async function MaxBetWallet(Username, IsDivValueSet = true) {
    let model = {
        username: Username
    };
    try {
        var res = await PostMethod(gameBalanceEndPoints.maxbetBalance, model);

        if (res.status == 200) {
            UsersBalance.MaxBetBalance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.MaxBetBalance = "N/A";
        }
        if (IsDivValueSet)
            SetBalanceOnAllPlace("maxbet_balance", UsersBalance.MaxBetBalance);

        if (UsersBalance.MaxBetBalance == 0 && res.response.data.previousBalance > 0 && MaxbetTrigger == false)
            StartTimerGameBalanceAPI("MaxBet");
    }
    catch (e) {
        UsersBalance.MaxBetBalance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("maxbet_balance", UsersBalance.MaxBetBalance);
    }
}

async function M8Wallet(Username, IsDivValueSet = true) {
    let model = {
        username: Username
    };
    try {
        var res = await PostMethod(gameBalanceEndPoints.m8Balance, model);

        if (res.status == 200) {
            UsersBalance.M8Balance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.M8Balance = "N/A";
        }
        if (IsDivValueSet)
            SetBalanceOnAllPlace("m8_balance", UsersBalance.M8Balance);
        if (UsersBalance.M8Balance == 0 && res.response.data.previousBalance > 0 && M8Trigger == false)
            StartTimerGameBalanceAPI("M8");
    }
    catch (e) {
        UsersBalance.M8Balance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("m8_balance", UsersBalance.M8Balance);
    }
}

async function YeeBetWallet(Username, IsDivValueSet = true) {
    let model = {
        username: Username
    };
    try {
        var res = await PostMethod(gameBalanceEndPoints.yeebetBalance, model);

        if (res.status == 200) {
            UsersBalance.YeeBetBalance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.YeeBetBalance = "N/A";
        }
        if (IsDivValueSet)
            SetBalanceOnAllPlace("yeebet_balance", UsersBalance.YeeBetBalance);

        if (UsersBalance.YeeBetBalance == 0 && res.response.data.previousBalance > 0 && YeeBetTrigger == false)
            StartTimerGameBalanceAPI("YeeBet");
    }
    catch (e) {
        UsersBalance.YeeBetBalance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("yeebet_balance", UsersBalance.YeeBetBalance);
    }
}

async function SboWallet(Username, IsDivValueSet = true) {
    let model = {
        username: Username
    };
    try {
        var res = await PostMethod(gameBalanceEndPoints.sboBalance, model);

        if (res.status == 200) {
            UsersBalance.SboBalance = ConvertBalanceIntoCommasValue(res.response.data.balance);
        }
        else {
            UsersBalance.SboBalance = "N/A";
        }
        if (IsDivValueSet)
            SetBalanceOnAllPlace("sbo_balance", UsersBalance.SboBalance);

    }
    catch (e) {
        UsersBalance.SboBalance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("sbo_balance", UsersBalance.SboBalance);
    }
}

//#endregion All Wallet Balance

function StartTimerGameBalanceAPI(GameName) {
    switch (GameName) {
        case 'AG':
            let AGtimerId = setInterval(() => { AGWallet(GameUsernames.AGUsername); AGTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(AGtimerId); AGTrigger = false; }, 301000);
            break;
        case 'Playtech':
            let PlaytechtimerId = setInterval(() => { PlaytechWallet(GameUsernames.PlaytechUsername); PlaytechTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(PlaytechtimerId); PlaytechTrigger = false; }, 301000);
            break;
        case 'M8':
            let M8timerId = setInterval(() => { M8Wallet(GameUsernames.M8Username); M8Trigger = true; }, 30000);
            setTimeout(() => { clearInterval(M8timerId); M8Trigger = false; }, 301000);
            break;
        case 'MaxBet':
            let MaxbettimerId = setInterval(() => { MaxBetWallet(GameUsernames.MaxBetUsername); MaxbetTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(MaxbettimerId); MaxbetTrigger = false; }, 301000);
            break;
        case 'DG':
            let dgtimerId = setInterval(() => { DGWallet(GameUsernames.DGUsername); DGTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(dgtimerId); DGTrigger = false; }, 301000);
            break;
        case 'Sexy':
            let SexytimerId = setInterval(() => { SexyBaccaratWallet(GameUsernames.SexyBaccaratUsername); SexyTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(SexytimerId); SexyTrigger = false; }, 301000);
            break;
        case 'SA':
            let SAtimerId = setInterval(() => { SAWallet(GameUsernames.SAUsername); SATrigger = true; }, 30000);
            setTimeout(() => { clearInterval(SAtimerId); SATrigger = false; }, 301000);
            break;
        case 'AllBet':
            let AllbettimerId = setInterval(() => { AllBetWallet(GameUsernames.AllBetUsername); AllbetTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(AllbettimerId); AllbetTrigger = false; }, 301000);
            break;
        case 'WM':
            let WmtimerId = setInterval(() => { WMWallet(GameUsernames.WMUsername); WMTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(WmtimerId); WMTrigger = false; }, 301000);
            break;
        case 'YeeBet':
            let YeeBetTimerId = setInterval(() => { YeeBetWallet(GameUsernames.YeeBetUsername); YeeBetTrigger = true; }, 30000);
            setTimeout(() => { clearInterval(YeeBetTimerId); YeeBetTrigger = false; }, 301000);
            break;
    }
}

async function PlaytechBrokenStatus(IsBalanceLoad) {
    let userModel = {
        username: GameUsernames.PlaytechUsername
    };
    if (IsBalanceLoad)
        PlaytechWallet(GameUsernames.PlaytechUsername);
    await PostMethod(accountEndPoints.PlaytechBrokenStatus, userModel);
}

async function PragmaticBrokenStatus(IsBalanceLoad) {
    let userModel = {
        username: GameUsernames.PragmaticUsername
    };
    if (IsBalanceLoad)
        PragmaticWallet(GameUsernames.PragmaticUsername);
    await PostMethod(accountEndPoints.PragmaticBrokenStatus, userModel);
}