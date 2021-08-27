//#region Onload
$(document).ready(function () {
    getDetails();
    var path = window.location.href.toLowerCase();
    //if (!path.includes('mobile/game'))

    if (path.includes('?p=home')) {
        Walletdate();
        GameInMaintenance(0);
        WalletSignalR();
    }
});

var walletData;

function WalletSignalR() {
    try {
        "use strict";

        var connection = new signalR.HubConnectionBuilder().withUrl(baseUrlWithoutVersion + "/signalrhub").build();

        connection.on("WalletUpdate", function (data) {
            walletData = data;
            GameInMaintenance(1);
        });

        connection.start().then(function () {
            console.log("Connected with SignalR Hub");
        }).catch(function (err) {
            console.log("Not Connected with SignalR Hub");
            return console.error(err.toString());
        });
    }
    catch (e) { WalletSignalR(); }
}

async function Walletdate() { walletData = await GetMethodWithReturn(apiEndPoints.walletSelect); }

async function GameInMaintenance(i) {
    if (i == 0) walletData = await GetMethodWithReturn(apiEndPoints.walletSelect);
    for (i = 0; i < walletData.data.length; i++) {
        if (walletData.data[i].walletType == "AG Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('aglive').style.filter = "grayscale(1)";
            document.getElementById('agslot').style.filter = "grayscale(1)";
            document.getElementById('aglivelogin').style.filter = "grayscale(1)";
            document.getElementById('agslotlogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "AG Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('aglive').style.filter = "";
            document.getElementById('agslot').style.filter = "";
            document.getElementById('aglivelogin').style.filter = "";
            document.getElementById('agslotlogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "PlayTech Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('playtechlive').style.filter = "grayscale(1)";
            document.getElementById('playtechslot').style.filter = "grayscale(1)";
            document.getElementById('playtechlivelogin').style.filter = "grayscale(1)";
            document.getElementById('playtechslotlogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "PlayTech Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('playtechlive').style.filter = "";
            document.getElementById('playtechslot').style.filter = "";
            document.getElementById('playtechlivelogin').style.filter = "";
            document.getElementById('playtechslotlogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "M8 Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('m8sports').style.filter = "grayscale(1)";
            document.getElementById('m8sportslogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "M8 Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('m8sports').style.filter = "";
            document.getElementById('m8sportslogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "MaxBet Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('maxbetsports').style.filter = "grayscale(1)";
            document.getElementById('maxbetsportslogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "MaxBet Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('maxbetsports').style.filter = "";
            document.getElementById('maxbetsportslogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "Sexy Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('sexylive').style.filter = "grayscale(1)";
            document.getElementById('sexylivelogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "Sexy Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('sexylive').style.filter = "";
            document.getElementById('sexylivelogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "SA Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('salive').style.filter = "grayscale(1)";
            document.getElementById('salivelogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "SA Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('salive').style.filter = "";
            document.getElementById('salivelogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "DG Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('dglive').style.filter = "grayscale(1)";
            document.getElementById('dglivelogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "DG Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('dglive').style.filter = "";
            document.getElementById('dglivelogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "918Kiss Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('kiss918slot').style.filter = "grayscale(1)";
            document.getElementById('kiss918slotlogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "918Kiss Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('kiss918slot').style.filter = "";
            document.getElementById('kiss918slotlogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "Mega888 Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('megaslot').style.filter = "grayscale(1)";
            document.getElementById('megaslotlogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "Mega888 Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('megaslot').style.filter = "";
            document.getElementById('megaslotlogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "Joker Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('jokerslot').style.filter = "grayscale(1)";
            document.getElementById('jokerslotlogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "Joker Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('jokerslot').style.filter = "";
            document.getElementById('jokerslotlogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "Pussy888 Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('pussy88slot').style.filter = "grayscale(1)";
            document.getElementById('pussy88slotlogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "Pussy888 Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('pussy88slot').style.filter = "";
            document.getElementById('pussy88slotlogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "AllBet Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('allbetlive').style.filter = "grayscale(1)";
            document.getElementById('allbetlivelogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "AllBet Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('allbetlive').style.filter = "";
            document.getElementById('allbetlivelogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "WM Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('wmlive').style.filter = "grayscale(1)";
            document.getElementById('wmlivelogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "WM Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('wmlive').style.filter = "";
            document.getElementById('wmlivelogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "Pragmatic Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('pragmaticslot').style.filter = "grayscale(1)";
            document.getElementById('pragmaticslotlogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "Pragmatic Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('pragmaticslot').style.filter = "";
            document.getElementById('pragmaticslotlogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "YeeBet Wallet" &&
            walletData.data[i].isMaintenance == true) {
            document.getElementById('YeeBetLive').style.filter = "grayscale(1)";
            document.getElementById('YeeBetLiveLogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "YeeBet Wallet" &&
            walletData.data[i].isMaintenance == false) {
            document.getElementById('YeeBetLive').style.filter = "";
            document.getElementById('YeeBetLiveLogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "SBO Wallet" &&
            walletData.data[i].isMaintenance == true) {
            document.getElementById('SBOSports').style.filter = "grayscale(1)";
            document.getElementById('SBOSportsLogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "SBO Wallet" &&
            walletData.data[i].isMaintenance == false) {
            document.getElementById('SBOSports').style.filter = "";
            document.getElementById('SBOSportsLogin').style.filter = "";
        }

        if (walletData.data[i].walletType == "GamePlay Wallet" &&
            walletData.data[i].isMaintenance == true) {
            document.getElementById('gameplaylive').style.filter = "grayscale(1)";
            document.getElementById('gameplayslot').style.filter = "grayscale(1)";
            document.getElementById('gameplaylivelogin').style.filter = "grayscale(1)";
            document.getElementById('gameplayslotlogin').style.filter = "grayscale(1)";
        }
        else if (walletData.data[i].walletType == "GamePlay Wallet" &&
            walletData.data[i].isMaintenance == false) {
            document.getElementById('gameplaylive').style.filter = "";
            document.getElementById('gameplayslot').style.filter = "";
            document.getElementById('gameplaylivelogin').style.filter = "";
            document.getElementById('gameplayslotlogin').style.filter = "";
        }
    }
}

async function AllInButtonDisable(i) {
    if (i == 0) walletData = await GetMethodWithReturn(apiEndPoints.walletSelect);
    for (i = 0; i < walletData.data.length; i++) {
        if (walletData.data[i].walletType == "AG Wallet" && walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("agallin").disabled = true;
            }
        }
        else if (walletData.data[i].walletType == "AG Wallet" && walletData.data[i].isMaintenance == false) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("agallin").disabled = false;
            }
        }

        if (walletData.data[i].walletType == "PlayTech Wallet" && walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("playtechallin").disabled = true;
            }
        }
        else if (walletData.data[i].walletType == "PlayTech Wallet" && walletData.data[i].isMaintenance == false) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("playtechallin").disabled = false;
            }
        }

        if (walletData.data[i].walletType == "M8 Wallet" && walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("m8allin").disabled = true;
            }
        }
        else if (walletData.data[i].walletType == "M8 Wallet" && walletData.data[i].isMaintenance == false) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("m8allin").disabled = false;
            }
        }

        if (walletData.data[i].walletType == "MaxBet Wallet" && walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("maxbetallin").disabled = true;
            }
        }
        else if (walletData.data[i].walletType == "MaxBet Wallet" && walletData.data[i].isMaintenance == false) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("maxbetallin").disabled = false;
            }
        }

        if (walletData.data[i].walletType == "Sexy Wallet" && walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("sexyallin").disabled = true;
            }
        }
        else if (walletData.data[i].walletType == "Sexy Wallet" && walletData.data[i].isMaintenance == false) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("sexyallin").disabled = false;
            }
        }

        if (walletData.data[i].walletType == "SA Wallet" && walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("saallin").disabled = true;
            }
        }
        else if (walletData.data[i].walletType == "SA Wallet" && walletData.data[i].isMaintenance == false) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("saallin").disabled = false;
            }
        }

        if (walletData.data[i].walletType == "DG Wallet" && walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("dgallin").disabled = true;
            }
        }
        else if (walletData.data[i].walletType == "DG Wallet" && walletData.data[i].isMaintenance == false) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("dgallin").disabled = false;
            }
        }

        if (walletData.data[i].walletType == "918Kiss Wallet" && walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("kiss918allin").disabled = true;
            }
        }
        else if (walletData.data[i].walletType == "918Kiss Wallet" && walletData.data[i].isMaintenance == false) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("kiss918allin").disabled = false;
            }
        }

        if (walletData.data[i].walletType == "Mega888 Wallet" && walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("mega888allin").disabled = true;
            }
        }
        else if (walletData.data[i].walletType == "Mega888 Wallet" && walletData.data[i].isMaintenance == false) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("mega888allin").disabled = false;
            }
        }

        if (walletData.data[i].walletType == "Joker Wallet" && walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("jokerallin").disabled = true;
            }
        }
        else if (walletData.data[i].walletType == "Joker Wallet" && walletData.data[i].isMaintenance == false) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("jokerallin").disabled = false;
            }
        }

        if (walletData.data[i].walletType == "Pussy888 Wallet" && walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("pussy888allin").disabled = true;
            }
        }
        else if (walletData.data[i].walletType == "Pussy888 Wallet" && walletData.data[i].isMaintenance == false) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("pussy888allin").disabled = false;
            }
        }

        if (walletData.data[i].walletType == "AllBet Wallet" && walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("allbetallin").disabled = true;
            }
        }
        else if (walletData.data[i].walletType == "AllBet Wallet" && walletData.data[i].isMaintenance == false) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("allbetallin").disabled = false;
            }
        }

        if (walletData.data[i].walletType == "WM Wallet" && walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("wmallin").disabled = true;
            }
        }
        else if (walletData.data[i].walletType == "WM Wallet" && walletData.data[i].isMaintenance == false) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("wmallin").disabled = false;
            }
        }

        if (walletData.data[i].walletType == "Pragmatic Wallet" && walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("pragmaticallin").disabled = true;
            }
        }
        else if (walletData.data[i].walletType == "Pragmatic Wallet" && walletData.data[i].isMaintenance == false) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("pragmaticallin").disabled = false;
            }
        }

        if (walletData.data[i].walletType == "YeeBet Wallet" &&
            walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) document.getElementById("YeeBetAllIn").disabled = true;
        }
        else if (walletData.data[i].walletType == "YeeBet Wallet" &&
            walletData.data[i].isMaintenance == false)
            if (window.location.href.toLowerCase().includes('?p=transfer')) document.getElementById("YeeBetAllIn").disabled = false;

        if (walletData.data[i].walletType == "SBO Wallet" &&
            walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) document.getElementById("SBOAllIn").disabled = true;
        }
        else if (walletData.data[i].walletType == "SBO Wallet" &&
            walletData.data[i].isMaintenance == false) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) document.getElementById("SBOAllIn").disabled = false;
        }

        if (walletData.data[i].walletType == "GamePlay Wallet" &&
            walletData.data[i].isMaintenance == true) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("gameplayallin").disabled = true;
            }
        }
        else if (walletData.data[i].walletType == "GamePlay Wallet" &&
            walletData.data[i].isMaintenance == false) {
            if (window.location.href.toLowerCase().includes('?p=transfer')) {
                document.getElementById("gameplayallin").disabled = false;
            }
        }
    }
}

async function CheckGameInMaintenance(gameName) {
    if (walletData === undefined) await Walletdate();

    var walletName;
    if (gameName == "M8") walletName = "M8 Wallet";
    if (gameName == "Maxbet") walletName = "MaxBet Wallet";
    if (gameName == "SexyBaccarat") walletName = "Sexy Wallet";
    if (gameName == "SA") walletName = "SA Wallet";
    if (gameName == "DG") walletName = "DG Wallet";
    if (gameName == "918Kiss") walletName = "918Kiss Wallet";
    if (gameName == "Mega888") walletName = "Mega888 Wallet";
    if (gameName == "Joker") walletName = "Joker Wallet";
    if (gameName == "playtech") walletName = "PlayTech Wallet";
    if (gameName == "AG") walletName = "AG Wallet";
    if (gameName == "Pussy888") walletName = "Pussy888 Wallet";
    if (gameName == "AllBet") walletName = "AllBet Wallet";
    if (gameName == "WM") walletName = "WM Wallet";
    if (gameName == "Pragmatic") walletName = "Pragmatic Wallet";
    if (gameName == "YeeBet") walletName = "YeeBet Wallet";
    if (gameName == "SBO") walletName = "SBO Wallet";
    if (gameName == 'GamePlay') walletName = 'GamePlay Wallet';

    for (i = 0; i < walletData.data.length; i++)
        if (walletData.data[i].walletType == walletName && walletData.data[i].isMaintenance == true)
            return true;
}

var checkedValue;

async function getDetails() {
    if (GetLocalStorage('currentUser') !== null) {
        var res = await GetMethod(apiEndPoints.getProfile);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
        var resUserData = res;

        checkedValue = resUserData.data.autoTransfer;

        if (window.location.href.includes("?p=transfer"))
            await onclickSet(1);
    }
}

async function onclickSet(i) {
    if (i == 0) checkedValue = checkedValue ? false : true;
    if (checkedValue) {
        document.getElementById("circle-move").style.marginLeft = "22px";
        document.getElementById("checkSwitch").style.backgroundColor = "green";
        checkedValue = true;
        let model = { autoTransfer: checkedValue };
        await PostMethod(apiEndPoints.updateProfile, model);
        var res = await GetMethod(apiEndPoints.getProfile);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
    }
    else {
        document.getElementById("circle-move").style.marginLeft = "0px";
        document.getElementById("checkSwitch").style.backgroundColor = "gray";
        checkedValue = false;
        let model = { autoTransfer: checkedValue };
        await PostMethod(apiEndPoints.updateProfile, model);
        var res = await GetMethod(apiEndPoints.getProfile);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
    }
}

function whatsapp() { window.open('https://api.whatsapp.com/send?phone=60135558826&text=Claim%20and%20Join', '_blank'); }

function LiveChat() { window.open('https://vue.livelyhelp.chat/610e8f831901ec83fjkfle-keli1a09e081f08020e050608050e0b01010a0a0c0400020e87eb01040a369f19c83', '_blank'); }

var AgGameType = localStorage.getItem('AGslotGame');
async function AG(GameType) {
    var value = await CheckGameInMaintenance("AG");
    if (value) {
        LoaderHide();
        return ShowError(ChangeErroMessage("maintainenance_error"));
    }
    if (GetLocalStorage('currentUser') !== null) {
        if (checkedValue) TransferInAllWallet("AG Wallet");
        localStorage.setItem("AGslotGame", GameType);
        await logingGame("AG");
    }
    else alert("Please Login");
}

function randomPassword() {
    var charsetOne = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ', charsetTwo = 'abcdefghiklmnopqrstuvwxyz', charsetThree = '@', charsetFour = '0123456789', randomstring = '', i = 0;

    for (i = 0; i < 3; i++) {
        var rnumOne = Math.floor(Math.random() * charsetOne.length);
        randomstring += charsetOne.substring(rnumOne, rnumOne + 1);
    }

    for (i = 0; i < 3; i++) {
        var rnumTwo = Math.floor(Math.random() * charsetTwo.length);
        randomstring += charsetTwo.substring(rnumTwo, rnumTwo + 1);
    }

    var rnumThree = Math.floor(Math.random() * charsetThree.length);
    randomstring += charsetThree.substring(rnumThree, rnumThree + 1);

    for (i = 0; i < 3; i++) {
        var rnumFour = Math.floor(Math.random() * charsetFour.length);
        randomstring += charsetFour.substring(rnumFour, rnumFour + 1);
    }

    return randomstring;
}

function randomString() {
    var charsetOne = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ', charsetTwo = 'abcdefghiklmnopqrstuvwxyz', charsetThree = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ', charsetFour = '0123456789', randomstring = '', i = 0;

    for (i = 0; i < 3; i++) {
        var rnumOne = Math.floor(Math.random() * charsetOne.length);
        randomstring += charsetOne.substring(rnumOne, rnumOne + 1);
    }

    for (i = 0; i < 3; i++) {
        var rnumTwo = Math.floor(Math.random() * charsetTwo.length);
        randomstring += charsetTwo.substring(rnumTwo, rnumTwo + 1);
    }

    var rnumThree = Math.floor(Math.random() * charsetThree.length);
    randomstring += charsetThree.substring(rnumThree, rnumThree + 1);

    for (i = 0; i < 3; i++) {
        var rnumFour = Math.floor(Math.random() * charsetFour.length);
        randomstring += charsetFour.substring(rnumFour, rnumFour + 1);
    }
    return randomstring;
}

async function M8Login(usernamePrifix) {
    var languageCode = (GetLocalStorage('language') === "zh-Hans" ? "ZH-CN" : "EN-US");

    var resultM8Login = await callMe(M8ConstAction.loginAction + "&" + M8ConstParameter.secret + "&" + M8ConstParameter.agent + "&" + "username=" + usernamePrifix + "&host=sport.mywinday.com&lang=" + languageCode + "&accType=DEC,IN,CN,US,ML,HK&ref=" + baseUrlWithoutVersion);

    if (resultM8Login.response.errcode !== "0") ShowError(resultM8Login.response.errtext);
    else {
        localStorage.setItem('M8Url', resultM8Login.response.result.login.weburlsecure['#cdata-section']);
        localStorage.setItem('M8UrlMobile', resultM8Login.response.result.login.mobiurlsecure['#cdata-section']);
    }

    if (screen.width > 786) window.location.href = GetLocalStorage('M8Url');
    else window.location.href = GetLocalStorage('M8UrlMobile');
}

//#region For Playtech game login
function loadingPlaytechJS() {
    var imported = document.createElement('script');
    imported.src = playtehcJS
    document.head.appendChild(imported);
}

async function loginPlaytech() {
    var SlotGame = localStorage.getItem('slotGame');
    if (SlotGame === "true") window.open("../mobile?p=slot", "_blank")
    else OpenPlaytechGamePage('7bal')
}
//#endregion For Playtech game login

async function logingGame(gameName) {
    var value = await CheckGameInMaintenance(gameName);
    if (value) {
        LoaderHide();
        return ShowError(ChangeErroMessage("maintainenance_error"));
    }
    if (GetLocalStorage('currentUser') !== null) {
        if (checkedValue) {
            if (gameName == "M8") TransferInAllWallet("M8 Wallet");
            if (gameName == "MaxBet") TransferInAllWallet("MaxBet Wallet");
            if (gameName == "SexyBaccarat") TransferInAllWallet("Sexy Wallet");
            if (gameName == "SA") TransferInAllWallet("SA Wallet");
            if (gameName == "DG") TransferInAllWallet("DG Wallet");
            if (gameName == "918Kiss") TransferInAllWallet("918Kiss Wallet");
            if (gameName == "Mega888") TransferInAllWallet("Mega888 Wallet");
            if (gameName == "Joker") TransferInAllWallet("Joker Wallet");
            if (gameName == "Pussy888") TransferInAllWallet("Pussy888 Wallet");
            if (gameName == "AllBet") TransferInAllWallet("AllBet Wallet");
            if (gameName == "WM") TransferInAllWallet("WM Wallet");
            if (gameName == "Pragmatic") {
                PragmaticBrokenStatusInterval();
                TransferInAllWallet("Pragmatic Wallet");
            }
            if (gameName == "YeeBet") TransferInAllWallet("YeeBet Wallet");
            if (gameName == "SBO") TransferInAllWallet("SBO Wallet");
            if (gameName == 'GamePlay') TransferInAllWallet("GamePlay Wallet");
            if (gameName == 'CQ9') TransferInAllWallet("CQ9 Wallet");
        }
        if (gameName != "Pragmatic") window.open("/mobile/Game?gamename=" + gameName);
        else GameLoginMobile("Pragmatic");
    }
    else alert("Please Login");
}

async function PlaytechBrokenStatus() {
    var GameUsername = JSON.parse(dec(sessionStorage.getItem("GameUsername")));
    var PlaytechUsername = (GameUsername.playtechUsername.replace("#", "")).toUpperCase();
    let userModel = {
        username: PlaytechUsername
    };
    PlaytechWalletBalance(PlaytechUsername);
    await PostMethod(apiEndPoints.PlaytechBrokenStatus, userModel);
}

async function PragmaticBrokenStatus() {
    var GameUsername = JSON.parse(dec(sessionStorage.getItem("GameUsername")));
    var PragmaticUsername = GameUsername.pragmaticUsername;
    let userModel = {
        username: PragmaticUsername
    };
    PragmaticWalletBalance(PragmaticUsername);
    await PostMethod(apiEndPoints.PragmaticBrokenStatus, userModel);
}

async function PlaytechBrokenStatusInterval() {
    setInterval(async function () {
        PlaytechBrokenStatus();
    }, 10000);
}

async function PragmaticBrokenStatusInterval() {
    setInterval(async function () {
        PragmaticBrokenStatus();
    }, 10000);
}

async function PlaytechIdentifiy(Slotvalue) {
    PlaytechBrokenStatusInterval();
    var value = await CheckGameInMaintenance("playtech");
    if (value) {
        LoaderHide();
        return ShowError(ChangeErroMessage("maintainenance_error"));
    }

    if (!Slotvalue) if (GetLocalStorage('currentUser') === null) return alert("Please Login");

    if (GetLocalStorage('currentUser') !== null) {
        LoaderShow();
        if (checkedValue)
            TransferInAllWallet("PlayTech Wallet");
        localStorage.setItem("slotGame", Slotvalue);
        loadingPlaytechJS();
        LoaderHide();
        GameLoginMobile('Playtech');
    }

    if (Slotvalue) window.open("../mobile?p=slot#playtech", "_blank")
}

async function PragmaticIdentifiy() {
    let value = await CheckGameInMaintenance("Pragmatic");
    if (value) {
        LoaderHide();
        return ShowError(ChangeErroMessage("maintainenance_error"));
    }

    window.open("../mobile?p=slot#pragmatic-game", "_blank")
}

async function GamePlayIdentifiy(Slotvalue) {
    let value = await CheckGameInMaintenance("GamePlay");
    if (value) {
        LoaderHide();
        return ShowError(ChangeErroMessage("maintainenance_error"));
    }

    if (Slotvalue) return window.open("../mobile?p=slot#gameplay-game", "_blank")

    if (GetLocalStorage('currentUser') == null) return alert("Please Login");

    LoaderShow();
    if (checkedValue) TransferInAllWallet("GamePlay Wallet");
    localStorage.setItem("slotGame", Slotvalue);
    LoaderHide();
    GameLoginMobile('GamePlay');
}

async function CQ9Identifiy(Slotvalue) {
    if (GetLocalStorage('currentUser') == null) return alert('Please Login');

    LoaderShow();

    let value = await CheckGameInMaintenance('CQ9');
    if (value) {
        LoaderHide();
        return ShowError(ChangeErroMessage('maintainenance_error'));
    }

    localStorage.setItem('slotGame', Slotvalue);

    LoaderHide();

    logingGame('CQ9');
}

async function GameLoginMobile(gamename) {
    LoaderShow();

    var GameUsername = JSON.parse(dec(sessionStorage.getItem('GameUsername')));

    if (GameUsername == null) {
        var username = await PostMethod(apiEndPoints.getUsername, {});
        sessionStorage.setItem('GameUsername', enc(JSON.stringify(username.data)));
        GameUsername = username.data;
    }

    var resUserData = JSON.parse(dec(sessionStorage.getItem('UserDetails')));

    if (resUserData == null) {
        var res = await GetMethod(apiEndPoints.getProfile);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
        var resUserData = res;
    }

    if (resUserData.data.mobilenoConfirmed == false) {
        var url = window.location.href.toLowerCase();
        if (!url.includes("?p=verifiedotp")) loadPageVerifiedOtp();
    }

    if (GetLocalStorage('currentUser') !== null) {
        let resSelectUser = JSON.parse(dec(sessionStorage.getItem('UserRegisterDetails')));
        debugger
        if (resSelectUser == null) {
            let userModel = { id: resUserData.data.id };
            resSelectUser = await PostMethod(apiEndPoints.selectUser, userModel);
            sessionStorage.setItem('UserRegisterDetails', enc(JSON.stringify(resSelectUser)));
        }

        var JokerUsername = GameUsername.jokerUsername.replace(/[^0-9a-zA-Z]+/g, "")
        var M8Username = GameUsername.m8Username;
        var PlaytechUsername = (GameUsername.playtechUsername.replace("#", "")).toUpperCase();

        switch (gamename) {
            case 'MaxBet':
                if (resSelectUser.data.MaxBet !== true) {
                    var userMaxBet = {
                        firstname: resUserData.data.name,
                        lastname: "wb3my"
                    };
                    var res = await PostMethod(apiEndPoints.registerMaxBet, userMaxBet);
                    if (res.data.error_code == 0) {
                        var userMaxBetlogin = { isMobile: true };
                        var res = await PostMethod(apiEndPoints.loginMaxBet, userMaxBetlogin);
                        if (res.data.error_code == 0) location.href = res.data.gameUrl;
                    }
                }
                else {
                    var userMaxBet = { isMobile: true };
                    var res = await PostMethod(apiEndPoints.loginMaxBet, userMaxBet);
                    if (res.data.error_code == 0) location.href = res.data.gameUrl;
                }
                break;
            case 'M8':
                if (resSelectUser.data.M8 !== true) {
                    var languageCode = (GetLocalStorage('language') === "zh-Hans" ? "ZH-CN" : "EN-US")
                    var resultM8 = await callMe(M8ConstAction.createAction + "&" + M8ConstParameter.secret + "&" + M8ConstParameter.agent + "&" + "username=" + M8Username);
                    if (resultM8.response.errcode == "0") {
                        let modelM8 = {
                            userId: resUserData.data.id,
                            M8UserName: M8Username,
                            apiResponse: resultM8.response
                        };
                        var resM8 = await PostMethod(apiEndPoints.registerM8, modelM8);
                        var resultM8LoginRegister = await callMe(M8ConstAction.loginAction + "&" + M8ConstParameter.secret + "&" + M8ConstParameter.agent + "&" + "username=" + M8Username + "&host=sport.mywinday.com&lang=" + languageCode + "&accType=HK&ref=" + baseUrlWithoutVersion);

                        if (resultM8LoginRegister.response.errcode === '-1') {
                            return ShowError(resultM8LoginRegister.response.errtext);
                        } else {
                            localStorage.setItem('M8Url', resultM8LoginRegister.response.result.login.weburlsecure['#cdata-section']);
                            localStorage.setItem('M8UrlMobile', resultM8LoginRegister.response.result.login.mobiurlsecure['#cdata-section']);
                        }
                    }
                    else return ShowError(resultM8LoginRegister.response.errtext);
                    M8Login(M8Username);
                }
                else M8Login(M8Username);
                break;
            case 'AG':
                var languageCode = (GetLocalStorage('language') === "zh-Hans" ? 1 : (GetLocalStorage('language') === "ms-MY" ? 12 : 3))
                if (resSelectUser.data.AG === false) {
                    var resAG = await PostMethod(apiEndPoints.registerAG, modelAG);
                    if (resAG.data.error_code == 0) {
                        let modelAG = {
                            gameType: AgGameType,
                            lang: languageCode
                        }
                        var AGLogin = await PostMethod(apiEndPoints.loginAG, modelAG);
                        if (AGLogin.data.error_code == 0) window.location.href = AGLogin.data.url;
                    }
                }
                else {
                    let modelAG = {
                        gameType: AgGameType,
                        lang: languageCode
                    }
                    var AGLogin = await PostMethod(apiEndPoints.loginAG, modelAG);
                    if (AGLogin.data.error_code == 0) window.location.href = AGLogin.data.url;
                }
                break;
            case 'Playtech':
                if (resSelectUser.data.Playtech !== true) {
                    var resultPlaytech = await PlaytechPostMethod(PlaytechConstAction.CreateAccount + "playername=" + PlaytechUsername + "&" + PlaytechConstParameter.adminname + "&" + PlaytechConstParameter.kioskname + "&firstname=" + resUserData.data.name + "&firstname=Webet333" + "&countrycode=MY" + "&viplevel=1" + "&languagecode=EN" + "&" + "password=" + dec(GetLocalStorage("currentUserData")));

                    if (typeof resultPlaytech === "string") {
                        try { JSON.parse(resultPlaytech); }
                        catch (e) {
                            var jObject = { data: resultPlaytech };
                        }
                    }
                    else {
                        let modelPlaytech = {
                            userId: resUserData.data.id,
                            PlaytechUserName: PlaytechUsername,
                            apiResponse: resultPlaytech
                        };
                        var resPlaytech1 = await PostMethod(apiEndPoints.registerPlaytech, modelPlaytech);
                    }
                    loginPlaytech();
                }
                else loginPlaytech();

                break;
            case '918kiss':
                var value = await CheckGameInMaintenance("918kiss");
                if (value) {
                    LoaderHide();
                    return ShowError(ChangeErroMessage("maintainenance_error"));
                }
                if (resSelectUser.data._918Kiss !== true) {
                    var randamUserName = await generateRandomUserName();
                    var randomPasswordString = randomPassword();
                    var modelUpdateProfile = {
                        username918: randamUserName,
                        password918: randomPasswordString
                    };
                    var updateProfile = await PostMethod(apiEndPoints.updateProfile, modelUpdateProfile);
                    var result981Kiss = await _918KissPostMethod("account.ashx?" + _918KissActionConst.AddUser + "&" + _918KissConstParameter.agent + "&" + "userName=" + randamUserName + "&" + "PassWd=" + randomPasswordString + "&" + "Name=" + resUserData.data.name + "&" + "Tel=" + resUserData.data.mobileNo + "&" + "Memo=" + null + "&" + "UserType=" + _918KissUserType.realplayer + "&" + "UserAreaId=" + _918KissUserAreaId.Malaysia + "&" + "time=" + UTCTime + "&" + _918KissConstParameter.authcode + "&" + "sign=" + generateHasValue(randamUserName) + "&" + _918KissConstParameter.pwdtype);
                    let model918Kiss = {
                        userId: resUserData.data.id,
                        _918KissUserName: randamUserName,
                        apiResponse: result981Kiss
                    };
                    var res918Kiss = await PostMethod(apiEndPoints.register918Kiss, model918Kiss);
                    location.href = '/mobile?p=download&id=918DownloadTab';
                }
                else location.href = '/mobile?p=download&id=918DownloadTab';
                break;
            case 'Pussy888':
                LoaderShow();
                if (resSelectUser.data.Pussy888 !== true) {
                    var model = {}
                    try { var res = await PostMethodWithParameter(apiEndPoints.pussyRegister, model); }
                    catch (e) { }
                    //window.location.href = "/Mobile/download?id=Pussy888DownloadTab";
                    location.href = '/mobile?p=download&id=Pussy888DownloadTab';
                }
                else {
                    //window.location.href = "/Mobile/download?id=Pussy888DownloadTab";
                    location.href = '/mobile?p=download&id=Pussy888DownloadTab';
                }
                break;
            case 'Joker':
                var value = await CheckGameInMaintenance("Joker");
                if (value) {
                    LoaderHide();
                    return ShowError(ChangeErroMessage("maintainenance_error"));
                }
                if (resSelectUser.data.Joker !== true) {
                    var perameter = 'Method=' + jokerMethodConst.EnsureUserAccount + '&Timestamp=' + timestamp + '&Username=' + JokerUsername;
                    var resultJoker = await JokerPostMethod('?' + jokerConstParameter.AppID + '&Signature=' + generateSignature(jokerMethodConst.EnsureUserAccount, JokerUsername, null, null), perameter);
                    var jokerSetPasswordperameter = 'Method=' + jokerMethodConst.SetPassword + '&' + 'Password=' + dec(GetLocalStorage('currentUserData')) + '&' + 'Timestamp=' + timestamp + '&' + 'Username=' + JokerUsername;
                    var resultJokerSetPassword = await JokerPostMethod('?' + jokerConstParameter.AppID + '&' + 'Signature=' + generateSignature(jokerMethodConst.SetPassword, JokerUsername, dec(GetLocalStorage('currentUserData'))), jokerSetPasswordperameter);
                    let modelJoker = {
                        userId: resUserData.data.id,
                        JokerUserName: JokerUsername,
                        apiResponse: resultJoker
                    };
                    var resJoker = await PostMethod(apiEndPoints.registerJoker, modelJoker);
                    location.href = '/mobile?p=download&id=JokerDownloadTab';
                }
                else location.href = '/mobile?p=download&id=JokerDownloadTab';
                break;
            case 'Mega888':
                var value = await CheckGameInMaintenance("Mega888");
                if (value) {
                    LoaderHide();
                    return ShowError(ChangeErroMessage("maintainenance_error"));
                }
                if (resSelectUser.data.Mega888 !== true) {
                    var userMegaa88Model = {}
                    var res = await PostMethod(apiEndPoints.mega888Register, userMegaa88Model);
                    if (res !== undefined || res !== null) location.href = '/mobile?p=download&id=MegaDownloadTab';
                }
                else location.href = '/mobile?p=download&id=MegaDownloadTab';
                break;
            case 'DG':
                if (resSelectUser.data.DG !== true) {
                    var userDGModel = {}
                    var res = await PostMethod(apiEndPoints.dgRegister, userDGModel);
                    if (res.data.codeId == 0) {
                        var login = await PostMethod(apiEndPoints.dgLogin, userDGModel);
                        if (login.data.codeI == 0) window.location.href = login.data.list[1] + login.data.token;
                    }
                }
                else {
                    var Model = {}
                    var login = await PostMethod(apiEndPoints.dgLogin, Model);
                    if (login.data.codeId == 0) window.location.href = login.data.list[1] + login.data.token;
                }
                break;
            case 'SexyBaccarat':
                if (resSelectUser.data.SexyBaccarat !== true) {
                    var userRegisterModel = {}
                    var res = await PostMethod(apiEndPoints.sexyRegister, userRegisterModel);
                    if (res.data.status == "0000") {
                        var userLoginModel = { isMobile: true }
                        var login = await PostMethod(apiEndPoints.sexyLogin, userLoginModel);
                        if (login.data.status == "0000") window.location.href = login.data.url + (GetLocalStorage('language') === "zh-Hans" ? "cn" : "en");
                    }
                }
                else {
                    var Model = { isMobile: true }
                    var login = await PostMethod(apiEndPoints.sexyLogin, Model);
                    if (login.data.status == "0000") window.location.href = login.data.url + (GetLocalStorage('language') === "zh-Hans" ? "cn" : "en");
                }
                break;
            case 'SA':
                LoaderShow();
                if (resSelectUser.data.SA !== true) {
                    var userRegisterModel = {}
                    var res = await PostMethod(apiEndPoints.saRegister, userRegisterModel);
                    if (res.data.status == "0") {
                        var userLoginModel = { isMobile: true }
                        var login = await PostMethod(apiEndPoints.saLogin, userLoginModel);
                        if (login.data.status == "0") window.location.href = login.data.url
                    }
                }
                else {
                    var Model = { isMobile: true }
                    var login = await PostMethod(apiEndPoints.saLogin, Model);
                    if (login.data.status == "0") window.location.href = login.data.url
                }
                break;
            case 'AllBet':
                LoaderShow();
                if (resSelectUser.data.AllBet !== true) {
                    var userRegisterModel = { isMobile: true }
                    var res = await PostMethod(apiEndPoints.allBetRegister, userRegisterModel);
                    if (res.data.error_code == "OK") {
                        var userLoginModel = { isMobile: true }
                        var login = await PostMethod(apiEndPoints.allBetLogin, userLoginModel);
                        if (login.data.error_code == "OK") window.location.href = login.data.gameLoginUrl
                    }
                }
                else {
                    var Model = { isMobile: true }
                    var login = await PostMethod(apiEndPoints.allBetLogin, Model);
                    if (login.data.error_code == "OK") window.location.href = login.data.gameLoginUrl
                }
                break;
            case 'WM':
                LoaderShow();
                if (resSelectUser.data.WM !== true) {
                    var userRegisterModel = {}
                    var res = await PostMethod(apiEndPoints.WMRegister, userRegisterModel);
                    if (res.data.errorCode == 0) {
                        var userLoginModel = { isMobile: true }
                        var login = await PostMethod(apiEndPoints.WMLogin, userLoginModel);
                        if (login.data.errorCode == 0) window.location.href = login.data.result
                    }
                }
                else {
                    var Model = { isMobile: true }
                    var login = await PostMethod(apiEndPoints.WMLogin, Model);
                    if (login.data.errorCode == 0) window.location.href = login.data.result
                }
                break;
            case 'Pragmatic':
                LoaderShow();
                if (resSelectUser.data.Pragmatic !== true) {
                    var userRegisterModel = {}
                    var res = await PostMethod(apiEndPoints.pragmaticRegister, userRegisterModel);
                    if (res.data.error == "0") {
                        window.open("../mobile?p=slot#pragmatic-game", "_blank")
                    }
                }
                else {
                    window.open("../mobile?p=slot#pragmatic-game", "_blank")
                }
                break;
            case 'YeeBet':
                LoaderShow();
                if (resSelectUser.data.YeeBet !== true) {
                    var userRegisterModel = {}
                    var res = await PostMethod(apiEndPoints.YeeBetRegister, userRegisterModel);
                    if (res.data.errorCode == 0) {
                        var userLoginModel = { isMobile: true }
                        var login = await PostMethod(apiEndPoints.YeeBetLogin, userLoginModel);
                        if (login.data.result == 0) window.location.href = login.data.openurl;
                    }
                }
                else {
                    var Model = { isMobile: true }
                    var login = await PostMethod(apiEndPoints.YeeBetLogin, Model);
                    if (login.data.result == 0) window.location.href = login.data.openurl;
                }
                break;
            case 'SBO':
                if (resSelectUser.data.SBO !== true) {
                    var model = {};
                    var res = await PostMethod(apiEndPoints.SBORegister, model);
                    if (res.data.error.id == 0) {
                        var model = { isMobile: true };
                        var res = await PostMethod(apiEndPoints.SBOLogin, model);
                        if (res.data.error.id == 0) location.href = res.data.url;
                    }
                }
                else {
                    var model = { isMobile: true };
                    var res = await PostMethod(apiEndPoints.SBOLogin, model);
                    if (res.data.error.id == 0) location.href = res.data.url;
                }
                break;
            case 'GamePlay':
                LoaderShow();
                if (resSelectUser.data.GamePlay !== true) {
                    let model = {};
                    var res = await PostMethod(apiEndPoints.GamePlayRegister, model);
                    if (res.data.status == 0) {
                        let model = { isMobile: true };
                        let res = await PostMethod(apiEndPoints.GamePlayLogin, model);
                        if (res.data.status == 0) location.href = res.data.game_url;
                    }
                }
                else {
                    let model = { isMobile: true };
                    let res = await PostMethod(apiEndPoints.GamePlayLogin, model);
                    if (res.data.status == 0) location.href = res.data.game_url;
                }
                break;
            case 'CQ9':
                LoaderShow();

                let temp = localStorage.getItem('slotGame');

                if (temp == null || temp == NaN || temp == undefined || temp == 'null') temp = false;

                if (resSelectUser.data.CQ9 !== true) {
                    let model = {};
                    let res = await PostMethod(apiEndPoints.CQ9Register, model);
                    if (res.data.status.code == '0') {
                        let model = { isMobile: true, isSlot: temp };
                        let res = await PostMethod(apiEndPoints.CQ9Login, model);
                        if (res.data.status.code == '0') location.href = res.data.data.url;
                    }
                }
                else {
                    let model = { isMobile: true, isSlot: temp };
                    let res = await PostMethod(apiEndPoints.CQ9Login, model);
                    if (res.data.status.code == '0') location.href = res.data.data.url;
                }
                break;
        }
    }
    else alert(ChangeErroMessage("please_loign_error"));

    LoaderHide();
}

function OpenPragmaticGamePage(code) {
    if (GetLocalStorage('currentUser') !== null) window.open("../mobile/Game?gamename=Pragmatic&gamecode=" + code, "_blank");
    else alert(ChangeErroMessage("please_loign_error"));
}

function OpenPlaytechGamePage(code) {
    if (GetLocalStorage('currentUser') !== null) window.open("../mobile/Game?gamename=Playtech&gamecode=" + code, "_blank")
    else alert(ChangeErroMessage("please_loign_error"));
}
function OpenGamePlayGamePage(code) {
    if (GetLocalStorage('currentUser') !== null) window.open("../mobile/Game?gamename=GamePlay&gamecode=" + code, "_blank");
    else alert(ChangeErroMessage("please_loign_error"));
}

function GenratePlaytechSlotsGameHTML(GameList, SectionId, IsAppend) {
    var html = "";
    if (GameList.length > 0) {
        for (i = 0; i < GameList.length; i++) {
            html += '<li  onclick="OpenPlaytechGamePage(\'' + GameList[i].GameCode + '\')"><figure><a ><img src="' + GameList[i].ImagePath2 + '" alt=""></a></figure><p><a>' + GameList[i].GameName + '</a></p></li >';
        }
        if (IsAppend) $("#" + SectionId).append(html);
        else $("#" + SectionId).html(html);
    }
    else {
        if ($("#" + SectionId).children().length < 1) {
            html = '<div class="col-sm-12 pl0 no-game" ><div class="all_promotion_left no_promotion">NO GAME</div></div>';
            $("#" + SectionId).html(html);
        }
    }
}

function GenratePragmaticSlotsGameHTML(GameList, SectionId, IsAppend) {
    var html = "";
    if (GameList.length > 0) {
        for (i = 0; i < GameList.length; i++) {
            html += '<li onclick="OpenPragmaticGamePage(\'' + GameList[i].GameCode + '\')"><figure><a><img src="' + GameList[i].ImagePath1 + '" alt=""></a></figure><p><a >' + GameList[i].GameName + '</a></p></li >';
        }
        if (IsAppend) $("#" + SectionId).append(html);
        else $("#" + SectionId).html(html);
    }
    else {
        if ($("#" + SectionId).children().length < 1) {
            html = '<div class="col-sm-12 pl0 no-game" ><div class="all_promotion_left no_promotion">NO GAME</div></div>';
            $("#" + SectionId).html(html);
        }
    }
}

function GenrateGamePlaySlotsGameHTML(GameList, SectionId, IsAppend) {
    var html = "";
    if (GameList.length > 0) {
        for (i = 0; i < GameList.length; i++) {
            html += '<li onclick="OpenGamePlayGamePage(\'' + GameList[i].GameCode + '\')"><figure><a><img src="' + GameList[i].ImagePath1 + '" alt=""></a></figure><p><a >' + GameList[i].GameName + '</a></p></li >';
        }
        if (IsAppend) $("#" + SectionId).append(html);
        else $("#" + SectionId).html(html);
    }
    else {
        if ($("#" + SectionId).children().length < 1) {
            html = '<div class="col-sm-12 pl0 no-game" ><div class="all_promotion_left no_promotion">NO GAME</div></div>';
            $("#" + SectionId).html(html);
        }
    }
}

var slotPageNumber = 0
async function PlaytechSlotsGameList(PageNumber = null, IsAppend = true) {
    var model = {
        WalletName: "PlayTech Wallet",
        pageNo: PageNumber == null ? slotPageNumber : PageNumber,
        pageSize: 20,
        Name: $("#playtechSearch").val() == "" ? null : $("#playtechSearch").val()
    };

    var list = await PostMethod(apiEndPoints.slotsGameList, model)
    gameList = list.data.result;
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

async function PragmaticSlotsGameList(PageNumber = null, IsAppend = true) {
    var model = {
        WalletName: "Pragmatic Wallet",
        pageNo: PageNumber == null ? slotPageNumber : PageNumber,
        pageSize: 20,
        Name: $("#pragmaticSearch").val() == "" ? null : $("#pragmaticSearch").val()
    };
    var list = await PostMethod(apiEndPoints.slotsGameList, model)
    gameList = list.data.result;
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

async function GamePlaySlotsGameList(PageNumber = null, IsAppend = true) {
    let model = {
        WalletName: "GamePlay Wallet",
        pageNo: PageNumber == null ? slotPageNumber : PageNumber,
        pageSize: 20,
        Name: $("#gameplaySearch").val() == "" ? null : $("#gameplaySearch").val()
    };

    let list = await PostMethod(apiEndPoints.slotsGameList, model)
    gameList = list.data.result;
    let HotList = gameList.filter(x => x.IsHot == true)
    let NewList = gameList.filter(x => x.IsNew == true)
    let ArcadeList = gameList.filter(x => x.IsArcade == true)
    let SlotsList = gameList.filter(x => x.IsSlot == true)

    GenrateGamePlaySlotsGameHTML(gameList, 'gameplay-all-section', IsAppend)
    GenrateGamePlaySlotsGameHTML(HotList, 'gameplay-hot-section', IsAppend)
    GenrateGamePlaySlotsGameHTML(NewList, 'gameplay-new-section', IsAppend)
    GenrateGamePlaySlotsGameHTML(SlotsList, 'gameplay-slot-section', IsAppend)
    GenrateGamePlaySlotsGameHTML(ArcadeList, 'gameplay-arcade-section', IsAppend)
}

function openPragmaticGame(GameID) {
    $(".loadingImage").fadeIn("slow");
    let model = {
        gameId: GameID,
        isMobile: true,
    }
    $.ajax({
        url: baseUrl + apiEndPoints.pragmaticLogin,
        type: "POST",
        data: JSON.stringify(model),
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('currentUser'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Max-Age': 300,
            'Accept-Language': localStorage.getItem('language')
        },
        async: false,
        success: function (data) {
            $(".loadingImage").fadeOut("slow");
            window.location.href = data.data.gameURL;
        }
    });
}

function openGamePlayGame(GameID) {
    $(".loadingImage").fadeIn("slow");

    let model = {
        gameCode: GameID,
        isMobile: true
    };

    $.ajax({
        url: baseUrl + apiEndPoints.GamePlayLogin,
        type: "POST",
        data: JSON.stringify(model),
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('currentUser'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Max-Age': 300,
            'Accept-Language': localStorage.getItem('language')
        },
        async: false,
        success: function (data) {
            $(".loadingImage").fadeOut("slow");
            window.location.href = data.data.game_url;
        }
    });
}

async function openPlaytechGame(game) {
    var languageCode = (localStorage.getItem('language') === "zh-Hans" ? "ZH-CN" : "EN")
    var GameUsername = JSON.parse(dec(sessionStorage.getItem('GameUsername')));
    var username = (GameUsername.playtechUsername.replace("#", "")).toUpperCase();
    var password = dec(localStorage.getItem('currentUserData'));
    var mobiledomain = "tothinkit.com";
    var systemidvar = "424";

    async function login() {
        iapiSetCallout('Login', calloutLogin);
        iapiSetClientPlatform("mobile&deliveryPlatform=HTML5");
        var realMode = 1;
        iapiLogin(username, password, realMode, languageCode);
    }

    function launchMobileClient(temptoken) {
        var clientUrl = 'http://hub.' + mobiledomain + '/igaming/' + '?gameId=' + game + '&real=1' + '&username=' + username + '&lang=' + languageCode + '&tempToken=' + temptoken + '&lobby=' + location.href.substring(0, location.href.lastIndexOf('/') + 1) + 'lobby.html' + '&support=' + location.href.substring(0, location.href.lastIndexOf('/') + 1) + 'support.html' + '&logout=' + location.href.substring(0, location.href.lastIndexOf('/') + 1) + 'logout.html' + '&deposit=' + location.href.substring(0, location.href.lastIndexOf('/') + 1) + 'deposit.html';
        document.location = clientUrl;
    }

    await login(1);

    function calloutLogin(response) {
        if (response.errorCode) alert("Error message: " + response.playerMessage + " Error code: " + response.errorCode);
        else launchMobileClient(response.rootSessionToken.sessionToken);
    }
}