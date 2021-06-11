async function OpenGame(WalletName, IsSlots) {
    if (GetLocalStorage("currentUser") == null) return ShowError("PLease Login !!");
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")));
    var isMaintenance = data.WalletData.filter(x => x.walletType == WalletName);
    if (isMaintenance[0].isMaintenance) return ShowError("Game In Maintenance");
    CallGameLoginAPI(WalletName, IsSlots);
    var profile = JSON.parse(Decryption(GetSessionStorage("userDetails")));
    if (!profile.autoTransfer)
        AllInWallet(WalletName);
}

function CallGameLoginAPI(WalletName, IsSlots) {
    if (GetLocalStorage("currentUser") == null) return location.href = "/";
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

async function OpenAgGame(IsSlots) {
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
        var userRegisterModel = {
        }
        var res = await PostMethod(gameRegisterEndPoints.WMRegister, userRegisterModel);
        if (res.status == 200)
            if (res.response.data.errorCode == 0) {
                var userLoginModel = {
                    isMobile: false
                }
                var login = await PostMethod(gameLoginEndPoints.wmLogin, userLoginModel);
                if (login.status == 200)
                    if (login.response.data.errorCode == 0)
                        SetLocalStorage("gameURL", login.response.data.result);
            }
    }
    else {
        var Model = {
            isMobile: false
        }
        var login = await PostMethod(gameLoginEndPoints.wmLogin, Model);
        if (login.status == 200)
            if (login.response.data.errorCode == 0)
                SetLocalStorage("gameURL", login.response.data.result);
    }

}

async function Open918KissGame() {
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));

    if (resSelectUser._918Kiss !== true) {
        let model918Kiss = {
        };
        var res918Kiss = await PostMethod(gameRegisterEndPoints.register918Kiss, model918Kiss);
        if (res918Kiss.status == 200)
            if (res918Kiss.response.data.code == 0)
                window.open("../Web/download");
    }
    else {
        window.open("../Web/download");
    }
}

async function OpenMega888Game() {
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));

    if (resSelectUser.Mega888 !== true) {
        var userMegaa88Model = {
        }
        var res = await PostMethod(gameRegisterEndPoints.mega888Register, userMegaa88Model);
        if (res.status == 200)
            window.open("../Web/download");
    }
    else {
        window.open("../Web/download");
    }
}

async function OpenJokerGame() {
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));

    if (resSelectUser.Joker !== true) {
        let modelJoker = {
        };
        var resJoker = await PostMethod(gameRegisterEndPoints.registerJoker, modelJoker);
        if (resJoker.status == 200)
            if (resJoker.response.data.Status != null)
                window.open("../Web/download");
    }
    else {
        window.open("../Web/download");
    }
}

async function OpenPussy888Game() {
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));

    if (resSelectUser.Pussy888 !== true) {
        var model = {
        }
        try {
            var res = await PostMethodWithParameter(gameRegisterEndPoints.pussyRegister, model);
        }
        catch {
        }
        window.open("../Web/download");
    }
    else {
        window.open("../Web/download");
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
                var userMaxBetlogin = {
                    isMobile: false
                };
                var res = await PostMethod(gameLoginEndPoints.maxbetlogin, userMaxBetlogin);
                if (res.status == 200)
                    if (res.response.data.error_code == 0) {
                        SetLocalStorage("gameURL", res.response.data.gameUrl);
                    }

            }
    }
    else {
        var userMaxBetlogin = {
            isMobile: false
        };
        var res = await PostMethod(gameLoginEndPoints.maxbetlogin, userMaxBetlogin);
        if (res.status == 200)
            if (res.response.data.error_code == 0) {
                SetLocalStorage("gameURL", res.response.data.gameUrl);
            }
    }

}

async function OpenM8Game() {
    window.open("../Web/game");
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));

    if (resSelectUser.M8 !== true) {
        let modelM8 = {
        };
        var resM8 = await PostMethod(gameRegisterEndPoints.registerM8, modelM8);
        if (resM8.response.data.response.errcode == "0") {
            let modellogin = { isMobile: false };
            var login = await PostMethod(gameLoginEndPoints.m8Login, modellogin);
            if (login.status == 200)
                if (login.response.data.errorcode == "0")
                    SetLocalStorage("gameURL", login.response.data.result);

        }
    }
    else {
        let modellogin = { isMobile: false };
        var login = await PostMethod(gameLoginEndPoints.m8Login, modellogin);
        if (login.status == 200)
            if (login.response.data.errorcode == "0")
                SetLocalStorage("gameURL", login.response.data.result);
    }

}

async function OpenPragmaticGame() {
    window.open("../Web/slots");
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));

    if (resSelectUser.Pragmatic !== true) {
        var userRegisterModel = {
        }
        var res = await PostMethod(gameRegisterEndPoints.pragmaticRegister, userRegisterModel);
        if (res.status == 200)
            if (res.response.data.error == "0") {
            }
    }
}

async function OpenPlaytechGame(IsSlots) {

    if (IsSlots) {
        window.open("../Web/slots");
    }

    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));

    if (resSelectUser.Playtech === false) {
        await PostMethod(gameRegisterEndPoints.registerPlaytech, modelAG);
    }
    else {
        LoginPlaytechGame("7bal")
    }

}

async function LoginPragmaticGame(GameCode) {
    window.open("../Web/game");
    let model = {
        gameId: GameCode,
        isMobile: false,
    }
    var res = await PostMethod(gameLoginEndPoints.pragmaticLogin, model)
    SetLocalStorage("gameURL", res.response.data.gameURL);

}

async function LoginPlaytechGame(GameCode) {
    window.open("../Web/game");

    var languageCode = (GetLocalStorage('language') === "zh-Hans" ? "ZH-CN" : "EN")
    var res = JSON.parse(Decryption(GetSessionStorage('userDetails')));
    let globalParameters = JSON.parse(Decryption(GetSessionStorage('GamePreFix')));
    var usernamePrifix = globalParameters.playtechGamePrefix
    var username = (usernamePrifix + res.username.replace("#", "")).toUpperCase();
    var password = Decryption(GetLocalStorage('currentUserData'));
    var mobiledomain = "ld176988.com";
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
        if (response.errorCode) {
            alert("Error message: " + response.errorText + " Error code: " + response.errorCode);
        } else {
            launchMobileClient(response.rootSessionToken.sessionToken);
        }
    }
}

async function PlaytechSlotsGameList() {
    var model = {
        WalletName: "PlayTech Wallet"
    };
    var list = await PostMethod(gameSettingEndPoints.slotsGameList, model)
    if (list.status == 200) {
        gameList = list.response.data.result;
        var html = "";
        for (i = 0; i < gameList.length; i++) {
            //html += '<div class="col-sm-3 pl0 pb15"><div class="all_slot_game_boxes"><img onclick="LoginPlaytechGame(\'' + gameList[i].GameCode + '\')" src="' + gameList[i].ImagePath2 + '" alt="slot_game5"><p>' + gameList[i].GameName + '</p></div></div>';
            html += '<div class="col-sm-3 pl0 pb15"><div class="all_slot_game_boxes" ><p class="hidden-slot-game-title">' + gameList[i].GameName + '</p><div class="slot-game-img-box"><img src="' + gameList[i].ImagePath2 + '" alt="slot_game5"><div class="overlay"><a  onclick="LoginPlaytechGame(\'' + gameList[i].GameCode + '\')" href="#" class="slot-game-play-box">Play</a></div></div><p>' + gameList[i].GameName + '</p></div></div>';
        }
        SetAllValueInElement("playtechSlotsGameList", html);
    }

}

async function AgSlotsGameList() {
    var model = {
        WalletName: "AG Wallet"
    };
    var list = await PostMethod(gameSettingEndPoints.slotsGameList, model)
    if (list.status == 200) {
        gameList = list.response.data.result;
        var html = "";
        for (i = 0; i < gameList.length; i++) {
            html += '<div class="col-sm-3 pl0 pb15"><div class="all_slot_game_boxes"><img onclick="LoginPlaytechGame(\'' + gameList[i].GameCode + '\')" src="' + gameList[i].ImagePath2 + '" alt="slot_game5"><p>' + gameList[i].GameName + '</p></div></div>';
        }
        SetAllValueInElement("agSlotsGameList", html);
    }

}

async function PragmaticSlotsGameList() {
    var model = {
        WalletName: "Pragmatic Wallet"
    };
    var list = await PostMethod(gameSettingEndPoints.slotsGameList, model)
    if (list.status == 200) {
        gameList = list.response.data.result;
        var html = "";
        for (i = 0; i < gameList.length; i++) {
            //html += '<div class="col-sm-3 pl0 pb15"><div class="all_slot_game_boxes"><img onclick="LoginPragmaticGame(\'' + gameList[i].GameCode + '\')" src="' + gameList[i].ImagePath2 + '" alt="slot_game5"><p>' + gameList[i].GameName + '</p></div></div>';
            html += '<div class="col-sm-3 pl0 pb15"><div class="all_slot_game_boxes" ><p class="hidden-slot-game-title">' + gameList[i].GameName + '</p><div class="slot-game-img-box"><img src="' + gameList[i].ImagePath2 + '" alt="slot_game5"><div class="overlay"><a  onclick="LoginPragmaticGame(\'' + gameList[i].GameCode + '\')" href="#" class="slot-game-play-box">Play</a></div></div><p>' + gameList[i].GameName + '</p></div></div>';
        }
        debugger
        SetAllValueInElement("pragmaticSlotsGameList", html);
    }
}

async function JokerSlotsGameList() {
    var model = {
        WalletName: "Joker Wallet"
    };
    var list = await PostMethod(gameSettingEndPoints.slotsGameList, model)
    if (list.status == 200) {
        gameList = list.response.data.result;
        var html = "";
        for (i = 0; i < gameList.length; i++) {
            html += '<div class="col-sm-3 pl0 pb15"><div class="all_slot_game_boxes"><img src="' + gameList[i].ImagePath2 + '" alt="slot_game5"><p>' + gameList[i].GameName + '</p></div></div>';
            //html += '<div class="col-sm-3 pl0 pb15"><div class="all_slot_game_boxes" ><p class="hidden-slot-game-title">' + gameList[i].GameName + '</p><div class="slot-game-img-box"><img src="' + gameList[i].ImagePath2 + '" alt="slot_game5"><div class="overlay"><a href="#" class="slot-game-play-box">Play</a></div></div><p>' + gameList[i].GameName + '</p></div></div>';
        }
        SetAllValueInElement("jokerSlotsGameList", html);
    }
}