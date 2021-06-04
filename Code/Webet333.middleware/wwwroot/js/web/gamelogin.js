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
        case "918Kiss Wallet": break;
        case "Joker Wallet": break;
        case "Mega888 Wallet": break;
        case "Pussy888 Wallet": break;
        case "AG Wallet": OpenAgGame(IsSlots); break;
        case "DG Wallet": OpenDgGame(); break;
        case "SA Wallet": OpenSaGame(); break;
        case "WM Wallet": break;
        case "PlayTech Wallet": break;
        case "Sexy Wallet": OpenSexyBaccaratGame(); break;
        case "Pragmatic Wallet": break;
        case "AllBet Wallet": break;
        case "M8 Wallet": break;
        case "MaxBet Wallet": break;
    }
}


async function OpenDgGame() {
    window.open("../Web/game");
    let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));

    if (resSelectUser.DG !== true) {
        var userRegisterModel = {
        }
        var res = await PostMethod(GameRegisterEndPoints.dgRegister, userRegisterModel);
        if (login.status == 200)
            if (res.response.data.codeId == 0) {
                var login = await PostMethod(GameLoginEndPoints.dgLogin, userRegisterModel);
                if (login.status == 200)
                    if (login.response.data.codeId == 0)
                        SetLocalStorage("gameURL", login.response.data.list[1] + login.response.data.token);
            }
    }
    else {
        var Model = {
        }
        var login = await PostMethod(GameLoginEndPoints.dgLogin, Model);
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
        var res = await PostMethod(GameRegisterEndPoints.sexyRegister, userRegisterModel);
        if (res.status == 200)
            if (res.response.data.status == "0000") {
                var userLoginModel = {
                    isMobile: false
                }
                var login = await PostMethod(GameLoginEndPoints.sexylogin, userLoginModel);
                if (login.status == 200)
                    if (login.response.data.status == "0000")
                        SetLocalStorage("gameURL", login.response.data.url + (GetLocalStorage('language') === "zh-Hans" ? "cn" : "en"));
            }
    }
    else {
        var Model = {
            isMobile: false
        }
        var login = await PostMethod(GameLoginEndPoints.sexylogin, Model);
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
        var res = await PostMethod(GameRegisterEndPoints.saRegister, userRegisterModel);
        if (res.status == 200)
            if (res.response.data.status == "0") {
                var userLoginModel = {
                    isMobile: false
                }
                var login = await PostMethod(GameLoginEndPoints.saLogin, userLoginModel);
                if (login.status == 200)
                    if (login.response.data.status == "0")
                        SetLocalStorage("gameURL", login.response.data.url);
            }
    }
    else {
        var Model = {
            isMobile: false
        }
        var login = await PostMethod(GameLoginEndPoints.saLogin, Model);
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
        var resAG = await PostMethod(GameRegisterEndPoints.registerAG, modelAG);
        if (resAG.status == 200)
            if (resAG.response.data.error_code == 0) {
                let modelAG = {
                    gameType: AgGameType,
                    lang: languageCode
                }
                var AGLogin = await PostMethod(GameRegisterEndPoints.loginAG, modelAG);
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
        var AGLogin = await PostMethod(apiEndPoints.loginAG, modelAG);
        if (AGLogin.data.error_code == 0)
            window.location.href = AGLogin.data.url;
    }

}