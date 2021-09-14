async function OpenGame(WalletName, IsSlotsCheck, CheckLogin = true) {
    if (CheckLogin) if (GetLocalStorage("currentUser") == null) return ShowError(ChangeErroMessage("please_loign_error"));

    var data = JSON.parse(Decryption(GetSessionStorage("siteData")));
    var isMaintenance = data.WalletData.filter(x => x.walletType == WalletName);
    if (isMaintenance[0].isMaintenance) return ShowError(ChangeErroMessage("maintainenance_error"));
    CallGameLoginAPI(WalletName, IsSlotsCheck, CheckLogin);
    var profile = JSON.parse(Decryption(GetSessionStorage("userDetails")));
    if (GetLocalStorage("currentUser") !== null) if (profile.autoTransfer) AllInWallet(WalletName);
}

function CallGameLoginAPI(WalletName, IsSlots, CheckLogin = true) {
    if (CheckLogin) if (GetLocalStorage("currentUser") == null) return location.href = "/";

    switch (WalletName) {
        case "918Kiss Wallet": Open918KissGame(); break;
        case "Joker Wallet": OpenJokerGame(); break;
        case "Mega888 Wallet": OpenMega888Game(); break;
        case "Pussy888 Wallet": OpenPussy888Game(); break;
        case "AG Wallet": OpenAgGame(IsSlots); break;
        case "DG Wallet": OpenDgGame(); break;
        case "SA Wallet": OpenSaGame(); break;
        case "WM Wallet": OpenWMGame(); break;
        case "PlayTech Wallet": OpenPlaytechGame(IsSlots); break;
        case "Sexy Wallet": OpenSexyBaccaratGame(); break;
        case "Pragmatic Wallet": OpenPragmaticGame(); break;
        case "AllBet Wallet": OpenAllBetGame(); break;
        case "M8 Wallet": OpenM8Game(); break;
        case "MaxBet Wallet": OpenMaxbetGame(); break;
        case "YeeBet Wallet": OpenYeeBetGame(); break;
        case "SBO Wallet": OpenSBOGame(); break;
        case "GamePlay Wallet": OpenGamePlayGame(IsSlots); break;
        case 'JDB Wallet': OpenJDBGame(); break;
    }
}

async function OpenYeeBetGame() {
    window.open("../Web/game");
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));
    if (resSelectUser.YeeBet == true) {
        var Model = {
        }
        var login = await PostMethod(gameLoginEndPoints.yeebetLogin, Model);
        if (login.status == 200)
            if (login.response.data.desc == "succeed")
                SetLocalStorage("gameURL", login.response.data.openurl);
    }
}

async function OpenDgGame() {
    window.open("../Web/game");
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));

    if (resSelectUser.DG !== true) {
        var userRegisterModel = {
        }
        var res = await PostMethod(gameRegisterEndPoints.dgRegister, userRegisterModel);
        if (login.status == 200)
            if (res.response.data.codeId == 0) {
                var login = await PostMethod(gameLoginEndPoints.dgLogin, userRegisterModel);
                if (login.status == 200)
                    if (login.response.data.codeId == 0)
                        SetLocalStorage("gameURL", login.response.data.list[1] + login.response.data.token);
            }
    }
    else {
        var Model = {
        }
        var login = await PostMethod(gameLoginEndPoints.dgLogin, Model);
        if (login.status == 200)
            if (login.response.data.codeId == 0)
                SetLocalStorage("gameURL", login.response.data.list[1] + login.response.data.token);
    }
}

async function OpenSexyBaccaratGame() {
    window.open("../Web/game");
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));
    if (resSelectUser.SexyBaccarat !== true) {
        var userRegisterModel = {
        }
        var res = await PostMethod(gameRegisterEndPoints.sexyRegister, userRegisterModel);
        if (res.status == 200)
            if (res.response.data.status == "0000") {
                var userLoginModel = {
                    isMobile: false
                }
                var login = await PostMethod(gameLoginEndPoints.sexylogin, userLoginModel);
                if (login.status == 200)
                    if (login.response.data.status == "0000")
                        SetLocalStorage("gameURL", login.response.data.url + (GetLocalStorage('language') === "zh-Hans" ? "cn" : "en"));
            }
    }
    else {
        var Model = {
            isMobile: false
        }
        var login = await PostMethod(gameLoginEndPoints.sexylogin, Model);
        if (login.status == 200)
            if (login.response.data.status == "0000")
                SetLocalStorage("gameURL", login.response.data.url + (GetLocalStorage('language') === "zh-Hans" ? "cn" : "en"));
    }
}

async function OpenSaGame() {
    window.open("../Web/game");
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));
    if (resSelectUser.SA !== true) {
        var userRegisterModel = {
        }
        var res = await PostMethod(gameRegisterEndPoints.saRegister, userRegisterModel);
        if (res.status == 200)
            if (res.response.data.status == "0") {
                var userLoginModel = {
                    isMobile: false
                }
                var login = await PostMethod(gameLoginEndPoints.saLogin, userLoginModel);
                if (login.status == 200)
                    if (login.response.data.status == "0")
                        SetLocalStorage("gameURL", login.response.data.url);
            }
    }
    else {
        var Model = {
            isMobile: false
        }
        var login = await PostMethod(gameLoginEndPoints.saLogin, Model);
        if (login.status == 200)
            if (login.response.data.status == "0")
                SetLocalStorage("gameURL", login.response.data.url);
    }
}

async function OpenAgGame(IsSlots, IsPlayNowClick = false) {
    if (!IsPlayNowClick)
        if (IsSlots) return window.open("../Web/slots#Ag-game");
        else {
            if (GetLocalStorage("currentUser") == null)
                return ShowError(ChangeErroMessage("please_loign_error"));
        }
    else
        if (GetLocalStorage("currentUser") == null)
            return ShowError(ChangeErroMessage("please_loign_error"));

    window.open("../Web/game");
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));

    var languageCode = (GetLocalStorage('language') === "zh-Hans" ? 1 : (GetLocalStorage('language') === "ms-MY" ? 12 : 3))
    var AgGameType = 1;

    if (IsSlots) AgGameType = 8

    if (resSelectUser.AG === false) {
        var resAG = await PostMethod(gameRegisterEndPoints.registerAG, modelAG);
        if (resAG.status == 200)
            if (resAG.response.data.error_code == 0) {
                let modelAG = {
                    gameType: AgGameType,
                    lang: languageCode
                }
                var AGLogin = await PostMethod(gameLoginEndPoints.aglogin, modelAG);
                if (AGLogin.status == 200)
                    if (AGLogin.response.data.error_code == 0)
                        SetLocalStorage("gameURL", AGLogin.response.data.url);
            }
    }
    else {
        let modelAG = {
            gameType: AgGameType,
            lang: languageCode
        }
        var AGLogin = await PostMethod(gameLoginEndPoints.aglogin, modelAG);
        if (AGLogin.status == 200)
            if (AGLogin.response.data.error_code == 0)
                SetLocalStorage("gameURL", AGLogin.response.data.url);
    }
}

async function OpenAllBetGame() {
    window.open("../Web/game");
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));
    if (resSelectUser.AllBet !== true) {
        var userRegisterModel = {
        }
        var res = await PostMethod(gameRegisterEndPoints.allBetRegister, userRegisterModel);
        if (res.status == 200)
            if (res.response.data.error_code == "OK") {
                var userLoginModel = {
                    isMobile: true
                }
                var login = await PostMethod(gameLoginEndPoints.allBetLogin, userLoginModel);
                if (login.status == 200)
                    if (login.response.data.error_code == "OK")
                        SetLocalStorage("gameURL", login.response.data.gameLoginUrl);
            }
    }
    else {
        var Model = {
            isMobile: true
        }
        var login = await PostMethod(gameLoginEndPoints.allBetLogin, Model);
        if (login.status == 200)
            if (login.response.data.error_code == "OK")
                SetLocalStorage("gameURL", login.response.data.gameLoginUrl);
    }
}

async function OpenWMGame() {
    window.open("../Web/game");
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));
    if (resSelectUser.WM !== true) {
        var userRegisterModel = {}
        var res = await PostMethod(gameRegisterEndPoints.WMRegister, userRegisterModel);
        if (res.status == 200)
            if (res.response.data.errorCode == 0) {
                var userLoginModel = { isMobile: false }
                var login = await PostMethod(gameLoginEndPoints.wmLogin, userLoginModel);
                if (login.status == 200 &&
                    login.response.data.errorCode == 0)
                    SetLocalStorage("gameURL", login.response.data.result);
            }
    }
    else {
        var Model = { isMobile: false }
        var login = await PostMethod(gameLoginEndPoints.wmLogin, Model);
        if (login.status == 200 &&
            login.response.data.errorCode == 0)
            SetLocalStorage("gameURL", login.response.data.result);
    }
}

async function Open918KissGame() {
    window.open("../Web/slots#_918Kiss-game");
    if (GetLocalStorage("currentUser") != null) {
        let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));
        if (resSelectUser._918Kiss !== true) {
            let model918Kiss = {
            };
            await PostMethod(gameRegisterEndPoints.register918Kiss, model918Kiss);
        }
    }
}

async function OpenMega888Game() {
    window.open("../Web/slots#Mega888-game");
    if (GetLocalStorage("currentUser") != null) {
        let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));
        if (resSelectUser.Mega888 !== true) {
            let userMegaa88Model = {
            };
            await PostMethod(gameRegisterEndPoints.mega888Register, userMegaa88Model);
        }
    }
}

async function OpenJokerGame() {
    window.open("../Web/slots#Joker-game");
    if (GetLocalStorage("currentUser") != null) {
        let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));
        if (resSelectUser.Joker !== true) {
            let modelJoker = {
            };
            await PostMethod(gameRegisterEndPoints.registerJoker, modelJoker);
        }
    }
}

async function OpenPussy888Game() {
    window.open("../Web/slots#Pussy888-game");
    if (GetLocalStorage("currentUser") != null) {
        let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));
        if (resSelectUser.Pussy888 !== true) {
            let model = {
            };
            await PostMethod(gameRegisterEndPoints.pussyRegister, model);
        }
    }
}

async function OpenMaxbetGame() {
    window.open("../Web/game");
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));
    var profile = JSON.parse(Decryption(GetSessionStorage("userDetails")));

    if (resSelectUser.MaxBet !== true) {
        var userMaxBet = {
            firstname: profile.name,
            lastname: "Webet333"
        };
        var res = await PostMethod(gameRegisterEndPoints.registerMaxBet, userMaxBet);
        if (res.status == 200)
            if (res.response.data.error_code == 0) {
                var userMaxBetlogin = { isMobile: false };
                var res = await PostMethod(gameLoginEndPoints.maxbetlogin, userMaxBetlogin);
                if (res.status == 200 &&
                    res.response.data.error_code == 0)
                    SetLocalStorage("gameURL", res.response.data.gameUrl);
            }
    }
    else {
        var userMaxBetlogin = { isMobile: false };
        var res = await PostMethod(gameLoginEndPoints.maxbetlogin, userMaxBetlogin);
        if (res.status == 200 &&
            res.response.data.error_code == 0)
            SetLocalStorage("gameURL", res.response.data.gameUrl);
    }
}

async function OpenM8Game() {
    window.open("../Web/game");
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));

    if (resSelectUser.M8 !== true) {
        let modelM8 = {};
        var resM8 = await PostMethod(gameRegisterEndPoints.registerM8, modelM8);
        if (resM8.response.data.response.errcode == "0") {
            let modellogin = { isMobile: false };
            var login = await PostMethod(gameLoginEndPoints.m8Login, modellogin);
            if (login.status == 200 &&
                login.response.data.errorcode == "0")
                SetLocalStorage("gameURL", login.response.data.result);
        }
    }
    else {
        let modellogin = { isMobile: false };
        var login = await PostMethod(gameLoginEndPoints.m8Login, modellogin);
        if (login.status == 200 &&
            login.response.data.errorcode == "0")
            SetLocalStorage("gameURL", login.response.data.result);
    }
}

async function OpenSBOGame() {
    window.open("../Web/game");
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));

    if (resSelectUser.SBO !== true) {
        let model = {};
        var resM8 = await PostMethod(gameRegisterEndPoints.sboRegister, model);
        if (resM8.status == 200 &&
            resM8.response.data.error.id == 0) {
            let modellogin = { isMobile: false };
            var login = await PostMethod(gameLoginEndPoints.sboLogin, modellogin);
            if (login.status == 200 &&
                login.response.data.error.id == 0)
                SetLocalStorage("gameURL", login.response.data.url);
        }
    }
    else {
        let model = {};
        var login = await PostMethod(gameLoginEndPoints.sboLogin, model);
        if (login.status == 200 &&
            login.response.data.error.id == 0)
            SetLocalStorage("gameURL", login.response.data.url);
    }
}

async function OpenGamePlayGame(IsSlots) {
    let model, res;

    if (GetLocalStorage("currentUser") != null) {
        let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));
        if (resSelectUser.GamePlay !== true) {
            model = {}
            await PostMethod(gameRegisterEndPoints.gameplayRegister, model);
        }
    }

    if (IsSlots) return window.open("../Web/slots#gameplay-game");

    window.open("../Web/game");
    model = { isMobile: false };
    res = await PostMethod(gameLoginEndPoints.gameplayLogin, model);
    if (res.status == 200 &&
        res.response.data.status == 0)
        SetLocalStorage("gameURL", res.response.data.game_url);
}

async function LoginGameplayGame(GameCode) {
    if (GetLocalStorage('currentUser') == null) return ShowError(ChangeErroMessage('please_loign_error'));
    window.open('../Web/game');
    let model = {
        gameCode: GameCode,
        isMobile: false
    }
    var res = await PostMethod(gameLoginEndPoints.gameplayLogin, model)
    SetLocalStorage('gameURL', res.response.data.game_url);
}

async function OpenJDBGame() {
    let model = {}, resSelectUser;

    if (GetLocalStorage("currentUser") != null) {
        resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));
        if (resSelectUser.JDB !== true) await PostMethod(gameRegisterEndPoints.jdbRegister, model);
    }

    return window.open("../Web/slots#jdb-game");
}

async function LoginJDBGame(GameCode) {
    let model, res;

    if (GetLocalStorage('currentUser') == null) return ShowError(ChangeErroMessage('please_loign_error'));

    window.open('../Web/game');

    model = { isMobile: false }
    res = await PostMethod(gameLoginEndPoints.jdbLogin, model);
    SetLocalStorage('gameURL', res.response.data.game_url);
}

async function OpenPragmaticGame() {
    window.open("../Web/slots#pragmatic-game");
    if (GetLocalStorage("currentUser") != null) {
        PragmaticBrokenStatusInterval();
        let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));
        if (resSelectUser.Pragmatic !== true) {
            let userRegisterModel = {
            };
            await PostMethod(gameRegisterEndPoints.pragmaticRegister, userRegisterModel);
        }
    }
}

async function OpenPlaytechGame(IsSlots) {
    if (IsSlots) {
        return window.open("../Web/slots");
    }
    else {
        if (GetLocalStorage("currentUser") == null) return ShowError(ChangeErroMessage("please_loign_error"));
    }

    LoginPlaytechGame("7bal")
    PlaytechBrokenStatusInterval();
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));
    if (resSelectUser.Playtech === false) {
        await PostMethod(gameRegisterEndPoints.registerPlaytech, modelAG);
    }
}

async function LoginPragmaticGame(GameCode, IsAllInWalletChecked = false) {
    if (GetLocalStorage("currentUser") == null) return ShowError(ChangeErroMessage("please_loign_error"));
    window.open("../Web/game");

    if (IsAllInWalletChecked) {
        var profile = JSON.parse(Decryption(GetSessionStorage("userDetails")));
        if (profile.autoTransfer)
            AllInWallet('Pragmatic Wallet');
    }
    let model = {
        gameId: GameCode,
        isMobile: false,
    }
    var res = await PostMethod(gameLoginEndPoints.pragmaticLogin, model)
    if (res.status == 200)
        if (res.response.data.error == "0")
            SetLocalStorage("gameURL", res.response.data.gameURL);
}

async function LoginPlaytechGame(GameCode, IsAllInWalletChecked = false) {
    if (GetLocalStorage("currentUser") == null) return ShowError(ChangeErroMessage("please_loign_error"));

    window.open("../Web/game");
    if (IsAllInWalletChecked) {
        var profile = JSON.parse(Decryption(GetSessionStorage("userDetails")));
        if (profile.autoTransfer)
            AllInWallet('PlayTech Wallet');
    }

    PlaytechBrokenStatusInterval();

    var languageCode = (GetLocalStorage('language') === "zh-Hans" ? "ZH-CN" : "EN")
    let GameUsername = JSON.parse(Decryption(GetSessionStorage('GameUsername')));
    var username = (GameUsername.playtechUsername.replace("#", "")).toUpperCase();
    var password = Decryption(GetLocalStorage('currentUserData'));
    var mobiledomain = "tothinkit.com";
    var systemidvar = "424";

    async function login() {
        iapiSetCallout('Login', calloutLogin);
        iapiSetClientPlatform("mobile&deliveryPlatform=HTML5");
        var realMode = 1;
        iapiLogin(username, password, realMode, languageCode);
    }

    function launchMobileClient(temptoken) {
        var clientUrl = 'http://hub.' + mobiledomain + '/igaming/' + '?gameId=' + GameCode + '&real=1' + '&username=' + username + '&lang=' + languageCode + '&tempToken=' + temptoken + '&lobby=' + location.href.substring(0, location.href.lastIndexOf('/') + 1) + 'lobby.html' + '&support=' + location.href.substring(0, location.href.lastIndexOf('/') + 1) + 'support.html' + '&logout=' + location.href.substring(0, location.href.lastIndexOf('/') + 1) + 'logout.html' + '&deposit=' + location.href.substring(0, location.href.lastIndexOf('/') + 1) + 'deposit.html';
        SetLocalStorage("gameURL", clientUrl);
    }

    await login(1);

    function calloutLogin(response) {
        if (response.errorCode) alert("Error message: " + response.playerMessage + " Error code: " + response.errorCode);
        else launchMobileClient(response.rootSessionToken.sessionToken);
    }
}

function GenratePlaytechSlotsGameHTML(GameList, SectionId, IsAppend) {
    var html = "";
    if (GameList.length > 0) {
        for (i = 0; i < GameList.length; i++) {
            html += '<li><div class="img-text-block"><div class="cmn-block"><figure><img src="' + GameList[i].ImagePath2 + '" alt="img"></figure><div class="text-content text-center"><h4>' + GameList[i].GameName + '</h4></div></div><div class="hover-block"><div class="text-content text-center"><h4>' + GameList[i].GameName + '</h4></div><figure><img src="' + GameList[i].ImagePath2 + '" alt="img"><div class="overlay"><button  onclick="LoginPlaytechGame(\'' + GameList[i].GameCode + '\')" >play</button></div></figure></div></div></li>';
        }
        if (IsAppend) $("#" + SectionId).append(html);
        else SetAllValueInElement(SectionId, html)
    }
    else {
        if ($("#" + SectionId).children().length < 1) {
            html = '<div class="col-sm-12 pl0" ><div class="all_promotion_left no_promotion">NO GAME</div></div>';
            SetAllValueInElement(SectionId, html)
        }
    }
}

function GenratePragmaticSlotsGameHTML(GameList, SectionId, IsAppend) {
    var html = "";
    if (GameList.length > 0) {
        for (i = 0; i < GameList.length; i++) {
            html += '<li><div class="img-text-block"><div class="cmn-block"><figure><img src="' + GameList[i].ImagePath1 + '" alt="img"></figure><div class="text-content text-center"><h4>' + GameList[i].GameName + '</h4></div></div><div class="hover-block"><div class="text-content text-center"><h4>' + GameList[i].GameName + '</h4></div><figure><img src="' + GameList[i].ImagePath1 + '" alt="img"><div class="overlay"><button  onclick="LoginPragmaticGame(\'' + GameList[i].GameCode + '\')" >play</button></div></figure></div></div></li>';
        }
        if (IsAppend) $("#" + SectionId).append(html);
        else SetAllValueInElement(SectionId, html)
    }
    else {
        if ($("#" + SectionId).children().length < 1) {
            html = '<div class="col-sm-12 pl0" ><div class="all_promotion_left no_promotion">NO GAME</div></div>';
            SetAllValueInElement(SectionId, html)
        }
    }
}

function GenrateGameplaySlotsGameHTML(GameList, SectionId, IsAppend) {
    var html = "";
    if (GameList.length > 0) {
        for (i = 0; i < GameList.length; i++) {
            html += '<li><div class="img-text-block"><div class="cmn-block"><figure><img src="' + GameList[i].ImagePath1 + '" alt="img"></figure><div class="text-content text-center"><h4>' + GameList[i].GameName + '</h4></div></div><div class="hover-block"><div class="text-content text-center"><h4>' + GameList[i].GameName + '</h4></div><figure><img src="' + GameList[i].ImagePath1 + '" alt="img"><div class="overlay"><button onclick="LoginGameplayGame(\'' + GameList[i].GameCode + '\')" >play</button></div></figure></div></div></li>';
        }
        if (IsAppend) $("#" + SectionId).append(html);
        else SetAllValueInElement(SectionId, html)
    }
    else {
        if ($("#" + SectionId).children().length < 1) {
            html = '<div class="col-sm-12 pl0" ><div class="all_promotion_left no_promotion">NO GAME</div></div>';
            SetAllValueInElement(SectionId, html)
        }
    }
}

var slotPageNumber = 0
async function PlaytechSlotsGameList(PageNumber = null, IsAppend = true) {
    var model = {
        WalletName: "PlayTech Wallet",
        pageNo: PageNumber == null ? slotPageNumber : PageNumber,
        pageSize: 15,
        Name: $("#playtechSearch").val() == "" ? null : $("#playtechSearch").val()
    };

    var list = await PostMethod(gameSettingEndPoints.slotsGameList, model)
    if (list.status == 200) {
        gameList = list.response.data.result;
        var HotList = gameList.filter(x => x.IsHot == true)
        var NewList = gameList.filter(x => x.IsNew == true)
        var ArcadeList = gameList.filter(x => x.IsArcade == true)
        var SlotsList = gameList.filter(x => x.IsSlot == true)

        GenratePlaytechSlotsGameHTML(gameList, 'playtech-all-section', IsAppend)
        GenratePlaytechSlotsGameHTML(HotList, 'playtech-hot-section', IsAppend)
        GenratePlaytechSlotsGameHTML(NewList, 'playtech-new-section', IsAppend)
        GenratePlaytechSlotsGameHTML(SlotsList, 'playtech-slot-section', IsAppend)
        GenratePlaytechSlotsGameHTML(ArcadeList, 'playtech-arcade-section', IsAppend)
    }
}

async function PragmaticSlotsGameList(PageNumber = null, IsAppend = true) {
    var model = {
        WalletName: "Pragmatic Wallet",
        pageNo: PageNumber == null ? slotPageNumber : PageNumber,
        pageSize: 15,
        Name: $("#pragmaticSearch").val() == "" ? null : $("#pragmaticSearch").val()
    };
    var list = await PostMethod(gameSettingEndPoints.slotsGameList, model)
    if (list.status == 200) {
        gameList = list.response.data.result;
        var HotList = gameList.filter(x => x.IsHot == true)
        var NewList = gameList.filter(x => x.IsNew == true)
        var ArcadeList = gameList.filter(x => x.IsArcade == true)
        var SlotsList = gameList.filter(x => x.IsSlot == true)

        GenratePragmaticSlotsGameHTML(gameList, 'pragmatic-all-section', IsAppend)
        GenratePragmaticSlotsGameHTML(HotList, 'pragmatic-hot-section', IsAppend)
        GenratePragmaticSlotsGameHTML(NewList, 'pragmatic-new-section', IsAppend)
        GenratePragmaticSlotsGameHTML(SlotsList, 'pragmatic-slot-section', IsAppend)
        GenratePragmaticSlotsGameHTML(ArcadeList, 'pragmatic-arcade-section', IsAppend)
    }
}

async function GameplaySlotsGameList(PageNumber = null, IsAppend = true) {
    var model = {
        WalletName: "Gameplay Wallet",
        pageNo: PageNumber == null ? slotPageNumber : PageNumber,
        pageSize: 15,
        Name: $("#gameplaySearch").val() == "" ? null : $("#gameplaySearch").val()
    };
    var list = await PostMethod(gameSettingEndPoints.slotsGameList, model)
    if (list.status == 200) {
        gameList = list.response.data.result;
        let HotList = gameList.filter(x => x.IsHot == true);
        let NewList = gameList.filter(x => x.IsNew == true);
        let ArcadeList = gameList.filter(x => x.IsArcade == true);
        let SlotsList = gameList.filter(x => x.IsSlot == true);

        GenrateGameplaySlotsGameHTML(gameList, 'gameplay-all-section', IsAppend)
        GenrateGameplaySlotsGameHTML(HotList, 'gameplay-hot-section', IsAppend)
        GenrateGameplaySlotsGameHTML(NewList, 'gameplay-new-section', IsAppend)
        GenrateGameplaySlotsGameHTML(SlotsList, 'gameplay-slot-section', IsAppend)
        GenrateGameplaySlotsGameHTML(ArcadeList, 'gameplay-arcade-section', IsAppend)
    }
}

async function HotSlotsgame() {
    var model = {};
    var list = await PostMethod(gameSettingEndPoints.HotGameList, model)
    if (list.status == 200) {
        gameList = list.response.data.result;
        var html = "";
        for (i = 0; i < gameList.length; i++) {
            if (gameList[i].WalletName == "Playtech Slot") {
                html += '<div class="item"><div class="game_boxes hand-curson" onclick="LoginPlaytechGame(\'' + gameList[i].GameCode + '\',' + true + ')"><img src="' + gameList[i].ImagePath2 + '" alt="games_boxes1" /><h1>' + gameList[i].GameName + '</h1><p>' + gameList[i].WalletName + '</p></div></div >'
            }
            else {
                html += '<div class="item"><div class="game_boxes hand-curson" onclick="LoginPragmaticGame(\'' + gameList[i].GameCode + '\',' + true + ')"><img src="' + gameList[i].ImagePath1 + '" alt="games_boxes1" /><h1>' + gameList[i].GameName + '</h1><p>' + gameList[i].WalletName + '</p></div></div >'
            }
        }
        SetAllValueInElement("hot-game-section", html)
        HotGameSLiderJs()
    }
}

function HotGameOpen(GameName, GameCode) { }

function HotGameSLiderJs() {
    $('.game-slider').slick({
        speed: 2500,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        infinite: true,
        swipeToSlide: true,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
}

function SearchInPlaytechGameList() {
    slotPageNumber = 0;
    PlaytechSlotsGameList(null, false);
}

function SearchInPragmaticGameList() {
    slotPageNumber = 0;
    PragmaticSlotsGameList(null, false);
}

function SearchInGameplayGameList() {
    slotPageNumber = 0;
    GameplaySlotsGameList(null, false);
}

function PlaytechBrokenStatusInterval() {
    setInterval(function () {
        PlaytechBrokenStatus(true);
    }, 10000);
}

function PragmaticBrokenStatusInterval() {
    setInterval(function () {
        PragmaticBrokenStatus(true);
    }, 10000);
}