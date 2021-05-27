//#region Declare Vairable
var walletIds = [
    "joker_balance", "playtech_balance", "kiss918_balance", "ag_balance", "m8_balance", "mega888_balance", "maxbet_balance",
    "dg_balance", "sexy_baccarat_balance", "sa_balance", "pussy888_balance", "allbet_balance", "wm_balance", "pragmatic_balance"
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
    MaxBetBalance: null
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
    MaxBetUsername: null
}

//#endregion Declare Vairable

//#region Onload
$(document).ready(function () {
    if (GetSessionStorage('currentUser') !== null) {
        SetUsername();
        LoadAllBalance();
        setInterval(function () {
            if (
                UsersBalance.MainBalance == null ||
                UsersBalance.AGBalance == null ||
                UsersBalance.DGBalance == null ||
                UsersBalance.SABalance == null ||
                UsersBalance.WMBalance == null ||
                UsersBalance.PlaytechBalance == null ||
                UsersBalance.SexyBaccaratBalance == null ||
                UsersBalance.AllBetBalance == null ||
                UsersBalance.PragmaticBalance == null ||
                UsersBalance.Kiss918Balance == null ||
                UsersBalance.JokerBalance == null ||
                UsersBalance.Mega888Balance == null ||
                UsersBalance.Pussy888Balance == null ||
                UsersBalance.M8Balance == null ||
                UsersBalance.MaxBetBalance == null
            )
                LoadAllBalance();
        }, 1000);
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
}

async function LoadAllBalanceAsync() {
    await MainWallet();
    if (GameUsername.kiss918Balance != null) await Kiss918Wallet(GameUsernames.Kiss918Username, false);
    if (GameUsername.JokerUsername != null) await JokerWallet(GameUsernames.JokerUsername, false);
    if (GameUsername.Mega888Username != null) await Mega888Wallet(GameUsernames.Mega888Username, false);
    if (GameUsername.Pussy888Username != null) await Pussy888Wallet(GameUsernames.Pussy888Username, false);
    if (GameUsername.AGUsername != null) await AGWallet(GameUsernames.AGUsername, false);
    if (GameUsername.DGUsername != null) await DGWallet(GameUsernames.DGUsername, false);
    if (GameUsername.SAUsername != null) await SAWallet(GameUsernames.SAUsername, false);
    if (GameUsername.WMUsername != null) await WMWallet(GameUsernames.WMUsername, false);
    if (GameUsername.PlaytechUsername != null) await PlaytechWallet(GameUsernames.PlaytechUsername, false);
    if (GameUsername.SexyBaccaratUsername != null) await SexyBaccaratWallet(GameUsernames.SexyBaccaratUsername, false);
    if (GameUsername.PragmaticUsername != null) await PragmaticWallet(GameUsernames.PragmaticUsername, false);
    if (GameUsername.AllBetUsername != null) await AllBetWallet(GameUsernames.AllBetUsername, false);
    if (GameUsername.M8Username != null) await M8Wallet(GameUsernames.M8Username, false);
    if (GameUsername.MaxBetUsername != null) await MaxBetWallet(GameUsernames.MaxBetUsername, false);
}

//#region  Set GameUsername
async function SetUsername() {
    var userDetails = JSON.parse(Decryption(GetSessionStorage("userDetails")));
    var globalParameter = JSON.parse(Decryption(GetSessionStorage("GamePreFix")));

    if (userDetails == null) {
        var res = await GetMethod(accountEndPoints.getProfile);
        SetSessionStorage('userDetails', Encryption(JSON.stringify(res.response.data)));
        userDetails = res.response.data;
    }

    if (globalParameter == null) {
        var gamePrefix = await GetMethod(globalEndPoints.globalParameter);
        SetSessionStorage('GamePreFix', Encryption(JSON.stringify(gamePrefix.response.data)));
        globalParameter = gamePrefix.response.data;
    }

    GameUsernames.AGUsername = globalParameter.agGamePrefix + userDetails.username;
    GameUsernames.AllBetUsername = globalParameter.allBetGamePrefix + userDetails.userId;
    GameUsernames.DGUsername = globalParameter.dgGamePrefix + userDetails.username;
    GameUsernames.SAUsername = globalParameter.saGamePrefix + userDetails.username;
    GameUsernames.WMUsername = globalParameter.wmGamePrefix + userDetails.userId;
    GameUsernames.SexyBaccaratUsername = globalParameter.sexyGamePrefix + userDetails.username;
    GameUsernames.PlaytechUsername = (globalParameter.playtechGamePrefix + userDetails.username.replace("#", "")).toUpperCase();;
    GameUsernames.PragmaticUsername = globalParameter.pragmaticGamePrefix + userDetails.userId;
    GameUsernames.JokerUsername = globalParameter.jokerGamePrefix + userDetails.username.replace(/[^0-9a-zA-Z]+/g, "");
    GameUsernames.Mega888Username = userDetails.loginid;
    GameUsernames.Pussy888Username = userDetails.usernamePussy888;
    GameUsernames.Kiss918Username = userDetails.username918;
    GameUsernames.M8Username = globalParameter.m8GamePrefix + userDetails.username;
    GameUsernames.MaxBetUsername = userDetails.vendorememberid;

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
        SetLoadingImagesInBalance(walletIds[i])
        SetFetchingWordInBalance(walletIds[i])
    }

    SetFetchingWordInBalance('main_balance')
}

function RefreshBalance() {
    SetLoadingImageForAllId();
    LoadAllBalance();
}

function CheckNAorNot(Value) {
    return Value == "N/A" ? "0.0" : Value;
}

async function RestoreBalance() {
    await GetProfileAndSetInSessionStorage();
    await GetGlobalParameterAndSetInSessionStorage
    await SetLoadingImageForAllId();
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
        id: null
    }
    await PostMethod(transactionEndPoints.restore, restoreModel);
    LoadAllBalance();
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
    }
    catch (e) {
        UsersBalance.M8Balance = "N/A";
        if (IsDivValueSet)
            SetBalanceOnAllPlace("m8_balance", UsersBalance.M8Balance);
    }
}

//#endregion All Wallet Balance