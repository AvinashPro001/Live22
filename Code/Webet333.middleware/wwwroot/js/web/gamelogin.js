async function OpenGame(WalletName, IsSlots) {
    if (GetLocalStorage("currentUser") == null) return ShowError("PLease Login !!");
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")));
    var isMaintenance = data.WalletData.filter(x => x.walletType == WalletName);
    if (isMaintenance[0].isMaintenance) return ShowError("Game In Maintenance");
    CallGameLoginAPI(WalletName);
    var profile = JSON.parse(Decryption(GetSessionStorage("userDetails")));
    if (profile.autoTransfer)
        AllInWallet(WalletName);
    //window.open("../Web/game?gamename=" + WalletName);
}

function CallGameLoginAPI(WalletName) {
    if (GetLocalStorage("currentUser") == null) return location.href = "/";
    switch (WalletName) {
        case "918Kiss Wallet": break;
        case "Joker Wallet": break;
        case "Mega888 Wallet": break;
        case "Pussy888 Wallet": break;
        case "AG Wallet": break;
        case "DG Wallet": OpenDgGame(); break;
        case "SA Wallet": break;
        case "WM Wallet": break;
        case "PlayTech Wallet": break;
        case "Sexy Wallet": break;
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
                        //window.location.href = login.response.data.list[1] + login.response.data.token;
                        SetLocalStorage("gameURL", login.response.data.list[1] + login.response.data.token);
            }
    }
    else {
        var Model = {
        }
        var login = await PostMethod(GameLoginEndPoints.dgLogin, Model);
        if (login.status == 200)
            if (login.response.data.codeId == 0)
                //window.location.href = login.response.data.list[1] + login.response.data.token;
                SetLocalStorage("gameURL", login.response.data.list[1] + login.response.data.token);
    }
}