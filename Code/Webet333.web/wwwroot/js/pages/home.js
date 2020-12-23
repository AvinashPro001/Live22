//#region Onload

$(document).ready(function () {
    if (!window.location.href.includes('Information/Game')) {
        if (GetLocalStorage('currentUser') !== null) {
            var div = document.getElementById("beforelogin");
            div.parentNode.removeChild(div);
            GetUser();
            if (localStorage.getItem('IsExecute') == "true" || localStorage.getItem('IsExecute') == true || localStorage.getItem('IsExecute') == null) {
                localStorage.setItem('IsExecute', false);
            }
        }
        WalletSignalR();
        Walletdate();
        getReference();
        getDetails();
        ValidateUrl();
        navaigateRegister();
        getGameImage();
        load_em();

        $("#txt_confirm_password").keyup(checkPasswordMatch);
        if (GetLocalStorage('language') === null) SetLocalStorage('language', 'en-US');
        getLanguage();
        announcement();
        GameInMaintenance(0);
        sliderPromotion();
    }
});
//#endregion

function pageloadEvery(t) {
    setTimeout('location.reload(true)', t);
}

var walletData;

function WalletSignalR() {
    try {
        "use strict";

        var connection = new signalR.HubConnectionBuilder().withUrl("http://api.webet333.com/signalrhub").build();

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
    catch{
        WalletSignalR();
    }
}

async function Walletdate() {
    walletData = await GetMethodWithReturn(apiEndPoints.walletSelect);
}

async function MobileDesktopReferenceInsert(url) {
    if (url.href === "http://www.webet333.com/") {
        var referenceKeywordModelDesktopElse = {
            keyword: 'DESKTOP'
        };
        await PostMethodWithParameter(apiEndPoints.socialMediaReference, referenceKeywordModelDesktopElse);
    }

    if (url.href === "http://www.webet333.com/Mobile/home") {
        var referenceKeywordModelPhoneElse = {
            keyword: 'PHONE'
        };
        await PostMethodWithParameter(apiEndPoints.socialMediaReference, referenceKeywordModelPhoneElse);
    }
}

async function getReference() {
    var url_string = window.location;
    var url = new URL(url_string);
    url.href = url.href.toLowerCase();
    var name = url.searchParams.get("ref");
    var Langauge = url.searchParams.get("lang");
    if (name !== null) {
        setCookie('ref', name, 30);
        var referenceKeywordModel = {
            keyword: name
        };
        await PostMethodWithParameter(apiEndPoints.socialMediaReference, referenceKeywordModel);
        await MobileDesktopReferenceInsert(url);
    }
    else {
        await MobileDesktopReferenceInsert(url);
    }
    if (Langauge != null) {
        SetLocalStorage('language', Langauge == "cn" ? "zh-Hans" : (Langauge == "my" ? "ms-MY" : "en-US"));
        try {
            history.pushState(null, null, "http://webet333.com/");
        }
        catch{
            history.pushState(null, null, "http://localhost:27100/");
        }
    }
    if (name !== null) {
        if (screen.width < 480) {
            location.href = 'http://www.webet333.com/Mobile/home';
        }
        else {
            location.href = 'http://webet333.com/';
        }
    }
}

//#region DetectMobileBrowser
function DetectMobileBrowser() {
    if (window.innerWidth <= 1000 && window.innerHeight <= 1691 && (window.location.href === 'http://www.webet333.com/' || window.location.href === 'http://webet333.com/' || window.location.href === 'webet333.com/' || window.location.href === 'http://webet333.com')) {
        window.location = "http://www.webet333.com/Mobile/home";
    }
}
//#endregion

//#region slider
function slider() {
    $('.one-time').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        infinite: true,
        speed: 3000,
        fade: true,
        slide: 'div',
        cssEase: 'linear'
    });
}
//#endregion


function ChangeErroMessage(key) {
    var ErrorMessage = "";
    $.ajax({
        url: '../../resources/strings.' + GetLocalStorage('language') + '.json',
        dataType: 'json',
        async: false,
        success: function (lang) {
            ErrorMessage = lang[key];
        }
    });
    return ErrorMessage;
}

//#region GetLanguage
function SetDefaultLanguage(ddlLanguages) {
    SetLocalStorage('language', ddlLanguages.value);
    getLanguage();
    window.location.reload();
}



function getLanguage() {

    //document.getElementById("flag").attributes.src=
    (GetLocalStorage('language') === null) ? SetLocalStorage('language', 'en-US') : false;
    (GetLocalStorage('currentUser') === null) ? $('#afterlogin').css('display', 'none') : $('#beforelogin').css('display', 'none');
    (GetLocalStorage('currentUser') === null) ? $('#afterloginbank').css('display', 'none') : $('#beforeloginbank').css('display', 'none');
    (GetLocalStorage('currentUser') === null) ? $('#afterloginbankfooter').css('display', 'none') : $('#beforeloginbankfooter').css('display', 'none');
    navaigateRegister();

    if ((GetLocalStorage('currentUser') === null)) {
        $('#subMenuSports').css('top', 'calc(100% - 20px)');
        $('#subMenuLive').css('top', 'calc(100% - 20px)');
        $('#subMenuSlots').css('top', 'calc(100% - 20px)');
    }
    else {
        $('#subMenuSports').css('top', 'calc(100% - 10px)');
        $('#subMenuLive').css('top', 'calc(100% - 10px)');
        $('#subMenuSlots').css('top', 'calc(100% - 10px)');
    }

    $.ajax({
        url: '../../resources/strings.' + GetLocalStorage('language') + '.json',
        dataType: 'json',
        async: false,
        success: function (lang) {
            $('.lang').each(function (index, element) {
                $(this).text(lang[$(this).attr('key')]);
                if (localStorage.getItem("language") === "zh-Hans") {
                    $(".lang").addClass("font-increase");
                    if (screen.width > 1000)
                        $("#ContactUsPopUp").css({ "padding-right": "50px" });
                    else
                        $("#ContactUsPopUp").css({ "padding-right": "25px" });
                }
            });
            $("[data-translate]").each(function () {
                if ($(this).is("input")) {
                    $(this).attr('placeholder', lang[$(this).data("translate")]);
                } else {
                    $(this).text(lang[$(this).data("translate")]);
                }
            });
        }
    });
}
//#endregion

//#region navigateRegister
function navaigateRegister() {
    (GetLocalStorage('currentUser') === null) ? $('#afterLoginPanel').css('display', 'none') : $('#beforeLoginPanel').css('display', 'none');
}
//#endregion

//#region Time
function calcTime(offset) {
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    nd = new Date(utc + (3600000 * offset));
    return nd.toLocaleString(nd, 'HH:mm');
}
if (document.getElementById("lbl_TimeafterLogin") !== null) {
    document.getElementById("lbl_TimeafterLogin").innerHTML = (calcTime('+8'));
    document.getElementById("lbl_homeTime").innerHTML = (calcTime('+8'));
}
//#endregion

//#region Email
async function ValidateUrl() {
    var url = new URL(window.location.href);
    var tokenValue = url.searchParams.get("token");
    if (tokenValue !== null) {
        ConfirmEmail();
    }
}
//#endregion

//#region ConfirmEmail
async function ConfirmEmail() {
    var url = new URL(window.location.href);
    var tokenValue = url.searchParams.get("token");
    var model = {
        token: tokenValue
    };
    var res = await PostMethod(apiEndPoints.confirmPassword, model);
    if (res !== null && res !== undefined) {
        ShowSuccess(res.message);
    }
}
//#endregion

//#region GetUser
async function GetUser() {
    var data = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
    var gameprefixdata = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));
    if (data != null && gameprefixdata != null) {
        if (document.getElementById("lbl_usernameHeader") !== null)
            document.getElementById("lbl_usernameHeader").innerText = data.data.username;
        if (document.getElementById("txt_account_holder") !== null)
            document.getElementById("txt_account_holder").value = data.data.name;

        PlaytechBrokenStatus();
        PragmaticBrokenStatus()
    }
    else {
        var res = await GetMethod(apiEndPoints.getProfile);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
        if (document.getElementById("lbl_usernameHeader") !== null)
            document.getElementById("lbl_usernameHeader").innerText = res.data.username;
        if (document.getElementById("txt_account_holder") !== null)
            document.getElementById("txt_account_holder").value = res.data.name;
        var gamePrefix = await GetMethodWithReturn(apiEndPoints.globalParameter);
        sessionStorage.setItem('GamePreFix', enc(JSON.stringify(gamePrefix)));
        getDetails();
        PlaytechBrokenStatus();
        PragmaticBrokenStatus();
    }
}
//#endregion

async function CheckGameInMaintenance(gameName) {

    var walletName;
    if (gameName == "M8")
        walletName = "M8 Wallet";

    if (gameName == "Maxbet")
        walletName = "MaxBet Wallet";

    if (gameName == "SexyBaccarat")
        walletName = "Sexy Wallet";

    if (gameName == "SA")
        walletName = "SA Wallet";

    if (gameName == "DG")
        walletName = "DG Wallet";

    if (gameName == "918Kiss")
        walletName = "918Kiss Wallet";

    if (gameName == "Mega888")
        walletName = "Mega888 Wallet";

    if (gameName == "Joker")
        walletName = "Joker Wallet";

    if (gameName == "playtech")
        walletName = "PlayTech Wallet";

    if (gameName == "AG")
        walletName = "AG Wallet";

    if (gameName == "Pussy888")
        walletName = "Pussy888 Wallet";

    if (gameName == "AllBet")
        walletName = "AllBet Wallet";

    if (gameName == "WM")
        walletName = "WM Wallet";

    if (gameName == "Pragmatic")
        walletName = "Pragmatic Wallet";

    for (i = 0; i < walletData.data.length; i++)
        if (walletData.data[i].walletType == walletName && walletData.data[i].isMaintenance == true)
            return true;
}

async function GameInMaintenance(i) {
    if (i == 0)
        walletData = await GetMethodWithReturn(apiEndPoints.walletSelect);
    for (i = 0; i < walletData.data.length; i++) {

        if (walletData.data[i].walletType == "AG Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('aglive').style.filter = "grayscale(1)";
            document.getElementById('agslot').style.filter = "grayscale(1)";
            document.getElementById('aglive').title = "Game In Maintenance.";
            document.getElementById('agslot').title = "Game In Maintenance.";
        }
        else if (walletData.data[i].walletType == "AG Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('aglive').style.filter = "";
            document.getElementById('agslot').style.filter = "";
            document.getElementById('aglive').title = "";
            document.getElementById('agslot').title = "";
        }

        if (walletData.data[i].walletType == "PlayTech Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('playtechlive').src = "/images/Playtech gray.png";
            document.getElementById('playtechslot').src = "/images/Playtech gray.png";
            document.getElementById('playtechlive').title = "Game In Maintenance.";
            document.getElementById('playtechslot').title = "Game In Maintenance.";
        }
        else if (walletData.data[i].walletType == "PlayTech Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('playtechlive').src = "/images/Playtech.png";
            document.getElementById('playtechslot').src = "/images/Playtech.png";
            document.getElementById('playtechlive').title = "";
            document.getElementById('playtechslot').title = "";
        }

        if (walletData.data[i].walletType == "M8 Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('m8sports').style.filter = "grayscale(1)";
            document.getElementById('m8sports').title = "Game In Maintenance.";
        }
        else if (walletData.data[i].walletType == "M8 Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('m8sports').style.filter = "";
            document.getElementById('m8sports').title = "";
        }

        if (walletData.data[i].walletType == "MaxBet Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('maxbetsports').style.filter = "grayscale(1)";
            document.getElementById('maxbetsports').title = "Game In Maintenance.";
        }
        else if (walletData.data[i].walletType == "MaxBet Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('maxbetsports').style.filter = "";
            document.getElementById('maxbetsports').title = "";
        }

        if (walletData.data[i].walletType == "Sexy Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('sexylive').style.filter = "grayscale(1)";
            document.getElementById('sexylive').title = "Game In Maintenance.";
        }
        else if (walletData.data[i].walletType == "Sexy Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('sexylive').style.filter = "";
            document.getElementById('sexylive').title = "";
        }

        if (walletData.data[i].walletType == "SA Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('salive').style.filter = "grayscale(1)";
            document.getElementById('salive').title = "Game In Maintenance.";
        }
        else if (walletData.data[i].walletType == "SA Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('salive').style.filter = "";
            document.getElementById('salive').title = "";
        }

        if (walletData.data[i].walletType == "DG Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('dglive').style.filter = "grayscale(1)";
            document.getElementById('dglive').title = "Game In Maintenance.";
        }
        else if (walletData.data[i].walletType == "DG Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('dglive').style.filter = "";
            document.getElementById('dglive').title = "";
        }

        if (walletData.data[i].walletType == "918Kiss Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('kiss918slot').style.filter = "grayscale(1)";
            document.getElementById('kiss918slot').title = "Game In Maintenance.";
        }
        else if (walletData.data[i].walletType == "918Kiss Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('kiss918slot').style.filter = "";
            document.getElementById('kiss918slot').title = "";
        }

        if (walletData.data[i].walletType == "Mega888 Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('megaslot').style.filter = "grayscale(1)";
            document.getElementById('megaslot').title = "Game In Maintenance.";
        }
        else if (walletData.data[i].walletType == "Mega888 Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('megaslot').style.filter = "";
            document.getElementById('megaslot').title = "";
        }

        if (walletData.data[i].walletType == "Joker Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('jokerslot').style.filter = "grayscale(1)";
            document.getElementById('jokerslot').title = "Game In Maintenance.";
        }
        else if (walletData.data[i].walletType == "Joker Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('jokerslot').style.filter = "";
            document.getElementById('jokerslot').title = "";
        }

        if (walletData.data[i].walletType == "Pussy888 Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('pussy888slot').style.filter = "grayscale(1)";
            document.getElementById('pussy888slot').title = "Game In Maintenance.";
        }
        else if (walletData.data[i].walletType == "Pussy888 Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('pussy888slot').style.filter = "";
            document.getElementById('pussy888slot').title = "";
        }

        if (walletData.data[i].walletType == "AllBet Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('AllbetGame').style.filter = "grayscale(1)";
            document.getElementById('AllbetGame').title = "Game In Maintenance.";
        }
        else if (walletData.data[i].walletType == "AllBet Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('AllbetGame').style.filter = "";
            document.getElementById('AllbetGame').title = "";
        }

        if (walletData.data[i].walletType == "WM Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('WMGame').style.filter = "grayscale(1)";
            document.getElementById('WMGame').title = "Game In Maintenance.";
        }
        else if (walletData.data[i].walletType == "WM Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('WMGame').style.filter = "";
            document.getElementById('WMGame').title = "";
        }

        if (walletData.data[i].walletType == "Pragmatic Wallet" && walletData.data[i].isMaintenance == true) {
            document.getElementById('pragmaticslot').style.filter = "grayscale(1)";
            document.getElementById('pragmaticslot').title = "Game In Maintenance.";
        }
        else if (walletData.data[i].walletType == "Pragmatic Wallet" && walletData.data[i].isMaintenance == false) {
            document.getElementById('pragmaticslot').style.filter = "";
            document.getElementById('pragmaticslot').title = "";
        }
    }
}

var AgGameType = localStorage.getItem('AGslotGame');
async function AG(GameType) {
    Walletdate();
    var value = await CheckGameInMaintenance("AG");
    if (value) {
        LoaderHide();
        return ShowError(ChangeErroMessage("maintainenance_error"));
    }
    if (GetLocalStorage('currentUser') !== null) {
        if (checkedValue) {
            TransferInAllWallet("AG Wallet");
        }
        localStorage.setItem("AGslotGame", GameType);
        logingGame("AG");
    }
    else {
        alert("Please Login");
    }
}

async function logingGame(gameName) {
    Walletdate();

    var value = await CheckGameInMaintenance(gameName);
    if (value) {
        LoaderHide();
        return ShowError(ChangeErroMessage("maintainenance_error"));
    }
    if (GetLocalStorage('currentUser') !== null) {
        if (checkedValue) {
            if (gameName == "M8")
                TransferInAllWallet("M8 Wallet");
            if (gameName == "MaxBet")
                TransferInAllWallet("MaxBet Wallet");
            if (gameName == "SexyBaccarat")
                TransferInAllWallet("Sexy Wallet");
            if (gameName == "SA")
                TransferInAllWallet("SA Wallet");
            if (gameName == "DG")
                TransferInAllWallet("DG Wallet");
            if (gameName == "918Kiss")
                TransferInAllWallet("918Kiss Wallet");
            if (gameName == "Mega888")
                TransferInAllWallet("Mega888 Wallet");
            if (gameName == "Joker")
                TransferInAllWallet("Joker Wallet");
            if (gameName == "Pussy888")
                TransferInAllWallet("Pussy888 Wallet");
            if (gameName == "AllBet")
                TransferInAllWallet("AllBet Wallet");
            if (gameName == "WM")
                TransferInAllWallet("WM Wallet");
            if (gameName == "Pragmatic")
            {
                PragmaticBrokenStatusInterval();
                TransferInAllWallet("Pragmatic Wallet");
            }
        }

        if (gameName == "MaxBet" || gameName == "M8") {

            GameLogin(gameName);
        }
        else {
            if (gameName != "Pragmatic")
                window.open("/Information/Game?gamename=" + gameName);
            else
                GameLogin("Pragmatic");
        }
    }
    else {
        alert("Please Login");
    }

}

//#region For Playtech game login
function loadingPlaytechJS() {
    var imported = document.createElement('script');
    imported.src = 'https://login.winforfun88.com/jswrapper/integration.js.php?casino=winforfun88'
    document.head.appendChild(imported);
}


async function loginPlaytech() {
    var res = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
    let globalParameters = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));
    var usernamePrifix = globalParameters.data.playtechGamePrefix
    var username = (usernamePrifix + res.data.username).toUpperCase();
    var password = dec(GetLocalStorage('currentUserData'));

    function launchMobileClient() {
        window.location.href = '../../lobby?username=' + username;
    }

    launchMobileClient();
}
//#endregion For Playtech game login

async function PlaytechBrokenStatus() {
    var resUserData = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
    let globalParameters = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));
    var PlaytechUsername = globalParameters.data.playtechGamePrefix + resUserData.data.username;
    let userModel = {
        username: PlaytechUsername
    };
    PlaytechWalletBalance(PlaytechUsername);
    await PostMethod(apiEndPoints.PlaytechBrokenStatus, userModel);
}

async function PragmaticBrokenStatus() {
    var resUserData = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
    let globalParameters = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));
    var PragmaticUsername = globalParameters.data.pragmaticGamePrefix + resUserData.data.userId;
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
    if (GetLocalStorage('currentUser') !== null) {
        LoaderShow();
        if (checkedValue)
            TransferInAllWallet("PlayTech Wallet");
        localStorage.setItem("slotGame", Slotvalue);
        LoaderHide()
        logingGame('Playtech');
    }
    else {
        alert("Please Login");
    }
}

//#region GameLogin
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

var checkedValue;

async function getDetails() {
    var resUserData = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
    if (resUserData == null) {
        var res = await GetMethod(apiEndPoints.getProfile);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
        resUserData = res;
    }
    checkedValue = resUserData.data.autoTransfer;
    if (window.location.href.includes("Account/Profile"))
        await onclickSet(1);
}

async function onclickSet(i) {
    if (i == 0)
        checkedValue = checkedValue ? false : true;
    if (checkedValue) {
        document.getElementById("circle-move").style.marginLeft = "22px";
        document.getElementById("checkSwitch").style.backgroundColor = "green";
        checkedValue = true;
        let model = {
            autoTransfer: checkedValue
        };
        await PostMethod(apiEndPoints.updateProfile, model);
        var res = await GetMethod(apiEndPoints.getProfile);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
    }
    else {
        document.getElementById("circle-move").style.marginLeft = "0px";
        document.getElementById("checkSwitch").style.backgroundColor = "gray";
        checkedValue = false;
        let model = {
            autoTransfer: checkedValue
        };
        await PostMethod(apiEndPoints.updateProfile, model);
        var res = await GetMethod(apiEndPoints.getProfile);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
    }
}


async function GameLogin(gamename) {
    LoaderShow();
    if (GetLocalStorage('currentUser') !== null) {

        var userDetails = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
        var globalParameter = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));
        let resSelectUser = JSON.parse(dec(sessionStorage.getItem('UserRegisterDetails')));



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

        var resUserData = JSON.parse(dec(sessionStorage.getItem('UserDetails')));

        if (resUserData.data.mobilenoConfirmed == false) {
            var url = window.location.href.toLowerCase();
            if (!url.includes("account/verfiedotp"))
                window.location = "../Account/VerfiedOtp";
            else {
                LoaderHide();
                return 0;
            }
        }

        if (resSelectUser == null) {
            let userModel = {
                id: resUserData.data.id
            };
            let resSelectUser = await PostMethod(apiEndPoints.selectUser, userModel);
            sessionStorage.setItem('UserRegisterDetails', enc(JSON.stringify(resSelectUser)));
        }
        resSelectUser = JSON.parse(dec(sessionStorage.getItem('UserRegisterDetails')));
        let globalParameters = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));

        var username;
        username = resUserData.data.username;

        var AgUsername = globalParameters.data.agGamePrefix + username;
        var JokerUsername = globalParameters.data.jokerGamePrefix + username;
        var M8Username = globalParameters.data.m8GamePrefix + username;
        var PlaytechUsername = globalParameters.data.playtechGamePrefix + username;

        switch (gamename) {
            case 'MaxBet':
                LoaderShow();
                if (resSelectUser.data.MaxBet !== true) {
                    var userMaxBet = {
                        firstname: resUserData.data.name,
                        lastname: "Webet333"
                    };
                    var res = await PostMethod(apiEndPoints.registerMaxBet, userMaxBet);
                    if (res.data.error_code == 0) {
                        var userMaxBetlogin = {
                            isMobile: false
                        };
                        var res = await PostMethod(apiEndPoints.loginMaxBet, userMaxBetlogin);
                        if (res.data.error_code == 0) {
                            document.getElementById("mainpagebody").style.display = "none";
                            document.getElementById("iframeModel").style.display = "block";
                            document.getElementById("gameFrame").src = res.data.gameUrl;
                        }
                        else {
                            document.getElementById("mainpagebody").style.display = "";
                            document.getElementById("iframeModel").style.display = "none";
                        }
                    }
                    else {
                        document.getElementById("mainpagebody").style.display = "";
                        document.getElementById("iframeModel").style.display = "none";
                    }
                }
                else {
                    var userMaxBetlogin = {
                        isMobile: false
                    };
                    var res = await PostMethod(apiEndPoints.loginMaxBet, userMaxBetlogin);
                    if (res.data.error_code == 0) {
                        document.getElementById("mainpagebody").style.display = "none";
                        document.getElementById("iframeModel").style.display = "block";
                        document.getElementById("gameFrame").src = res.data.gameUrl;
                    }
                    else {
                        document.getElementById("mainpagebody").style.display = "";
                        document.getElementById("iframeModel").style.display = "none";
                    }
                }
                break;
            case 'M8':
                LoaderShow();
                if (resSelectUser.data.M8 !== true) {
                    var languageCode = (GetLocalStorage('language') === "zh-Hans" ? "ZH-CN" : "EN-US")
                    var resultM8 = await callMe(M8ConstAction.createAction + "&" + M8ConstParameter.secret + "&" + M8ConstParameter.agent + "&" + "username=" + M8Username + resUserData.data.username);
                    if (resultM8.response.errcode == "0") {
                        let modelM8 = {
                            userId: resUserData.data.id,
                            M8UserName: M8Username,
                            apiResponse: resultM8.response
                        };
                        var resM8 = await PostMethod(apiEndPoints.registerM8, modelM8);
                        var resultM8LoginRegister = await callMe(M8ConstAction.loginAction + "&" + M8ConstParameter.secret + "&" + M8ConstParameter.agent + "&" + "username=" + M8Username + "&host=sport.mywinday.com&lang=" + languageCode + "&accType=DEC,IN,CN,US,ML,HK&ref=https://webet333.com");
                        if (resultM8LoginRegister.response.errcode !== '0') {
                            return ShowError(resultM8LoginRegister.response.errtext);
                        } else {
                            localStorage.setItem('M8Url', resultM8LoginRegister.response.result.login.weburlsecure['#cdata-section']);
                            localStorage.setItem('M8UrlMobile', resultM8LoginRegister.response.result.login.mobiurlsecure['#cdata-section']);
                        }
                    }
                    else {
                        LoaderHide();
                        return ShowError(resultM8.response.errtext);

                    }
                    M8Login(M8Username);
                }
                else {
                    M8Login(M8Username);
                }
                break;
            case 'AG':
                LoaderShow();
                var languageCode = (GetLocalStorage('language') === "zh-Hans" ? 1 : (GetLocalStorage('language') === "ms-MY" ? 12 : 3))
                if (resSelectUser !== null && resSelectUser !== undefined) {
                    if (resSelectUser.data.AG !== null && resSelectUser.data.AG !== undefined) {
                        if (resSelectUser.data.AG === false) {
                            var resAG = await PostMethod(apiEndPoints.registerAG, modelAG);
                            if (resAG.data.error_code == 0) {
                                let modelAG = {
                                    gameType: AgGameType,
                                    lang: languageCode
                                }
                                var AGLogin = await PostMethod(apiEndPoints.loginAG, modelAG);
                                if (AGLogin.data.error_code == 0)
                                    window.location.href = AGLogin.data.url;
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
                }
                break;
            case 'Playtech':
                if (resSelectUser.data.Playtech !== true) {
                    var resultPlaytech = await PlaytechPostMethod(PlaytechConstAction.CreateAccount + "playername=" + PlaytechUsername + "&" + PlaytechConstParameter.adminname + "&" + PlaytechConstParameter.kioskname + "&firstname=" + resUserData.data.name + "&firstname=Webet333" + "&countrycode=MY" + "&viplevel=1" + "&languagecode=EN" + "&" + "password=" + dec(GetLocalStorage("currentUserData")));

                    if (typeof resultPlaytech === "string") {
                        try {
                            JSON.parse(resultPlaytech);
                        } catch (e) {
                            var jObject = {
                                data: resultPlaytech
                            };
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
                else {
                    loginPlaytech();
                }
                break;
            case '918Kiss':
                LoaderShow();
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
                    window.location.href = "/Information/Download";

                }
                else {
                    window.location.href = "/Information/Download";

                }
                break;
            case 'Pussy888':
                LoaderShow();
                if (resSelectUser.data.Pussy888 !== true) {
                    var model = {

                    }
                    try {
                        var res = await PostMethodWithParameter(apiEndPoints.pussyRegister, model);
                    }
                    catch{

                    }
                    window.location.href = "/Information/Download#Pussy888Download";

                }
                else {
                    window.location.href = "/Information/Download#Pussy888Download";

                }
                break;
            case 'Joker':
                LoaderShow();
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
                    //window.open('/Information/joker', '_blank');
                    window.location.href = "/Information/Download#JokerDownload";
                }
                else {
                    //window.open('/Information/joker', '_blank');
                    window.location.href = "/Information/Download#JokerDownload";
                }
                break;
            case 'Mega888':
                LoaderShow();
                if (resSelectUser.data.Mega888 !== true) {
                    var userMegaa88Model = {

                    }

                    var res = await PostMethod(apiEndPoints.mega888Register, userMegaa88Model);
                    if (res !== undefined || res !== null) {
                        //    window.open('/Information/Download#MegaDownload', '_blank');
                        window.location.href = "/Information/Download#MegaDownload";
                    }
                }
                else {
                    //window.open('/Information/Download#MegaDownload', '_blank');
                    window.location.href = "/Information/Download#MegaDownload";
                }
                break;
            case 'DG':
                LoaderShow();
                if (resSelectUser.data.DG !== true) {
                    var userRegisterModel = {

                    }
                    var res = await PostMethod(apiEndPoints.dgRegister, userRegisterModel);
                    if (res.data.codeId == 0) {
                        var login = await PostMethod(apiEndPoints.dgLogin, userRegisterModel);
                        if (login.data.codeI == 0)
                            //window.open(login.data.list[1] + login.data.token, '_blank')
                            window.location.href = login.data.list[1] + login.data.token;
                    }
                }
                else {
                    var Model = {

                    }
                    var login = await PostMethod(apiEndPoints.dgLogin, Model);
                    if (login.data.codeId == 0)
                        //window.open(login.data.list[1] + login.data.token, '_blank');
                        window.location.href = login.data.list[1] + login.data.token;
                }
                break;
            case 'SexyBaccarat':
                LoaderShow();
                if (resSelectUser.data.SexyBaccarat !== true) {
                    var userRegisterModel = {

                    }
                    var res = await PostMethod(apiEndPoints.sexyRegister, userRegisterModel);
                    if (res.data.status == "0000") {
                        var userLoginModel = {
                            isMobile: false
                        }
                        var login = await PostMethod(apiEndPoints.sexyLogin, userLoginModel);
                        if (login.data.status == "0000")
                            window.location.href = login.data.url + (GetLocalStorage('language') === "zh-Hans" ? "cn" : "en");
                    }
                }
                else {
                    var Model = {
                        isMobile: false
                    }
                    var login = await PostMethod(apiEndPoints.sexyLogin, Model);
                    if (login.data.status == "0000")
                        window.location.href = login.data.url + (GetLocalStorage('language') === "zh-Hans" ? "cn" : "en");
                }
                break;
            case 'SA':
                LoaderShow();
                if (resSelectUser.data.SA !== true) {
                    var userRegisterModel = {

                    }
                    var res = await PostMethod(apiEndPoints.saRegister, userRegisterModel);
                    if (res.data.status == "0") {
                        var userLoginModel = {
                            isMobile: false
                        }
                        var login = await PostMethod(apiEndPoints.saLogin, userLoginModel);
                        if (login.data.status == "0")
                            //window.open(login.data.url, '_blank');
                            window.location.href = login.data.url;
                    }
                }
                else {
                    var Model = {
                        isMobile: false
                    }
                    var login = await PostMethod(apiEndPoints.saLogin, Model);
                    if (login.data.status == "0")
                        //window.open(login.data.url, '_blank');
                        window.location.href = login.data.url;
                }
                break;
            case 'AllBet':
                LoaderShow();
                if (resSelectUser.data.AllBet !== true) {
                    var userRegisterModel = {

                    }
                    var res = await PostMethod(apiEndPoints.allBetRegister, userRegisterModel);
                    if (res.data.error_code == "OK") {
                        var userLoginModel = {
                            isMobile: true
                        }
                        var login = await PostMethod(apiEndPoints.allBetLogin, userLoginModel);
                        if (login.data.error_code == "OK")
                            window.location.href = login.data.gameLoginUrl
                    }
                }
                else {
                    var Model = {
                        isMobile: true
                    }
                    var login = await PostMethod(apiEndPoints.allBetLogin, Model);
                    if (login.data.error_code == "OK")
                        window.location.href = login.data.gameLoginUrl
                }
                break;
            case 'WM':
                LoaderShow();
                if (resSelectUser.data.WM !== true) {
                    var userRegisterModel = {

                    }
                    var res = await PostMethod(apiEndPoints.WMRegister, userRegisterModel);
                    if (res.data.errorCode == 0) {
                        var userLoginModel = {
                            isMobile: false
                        }
                        var login = await PostMethod(apiEndPoints.WMLogin, userLoginModel);
                        if (login.data.errorCode == 0)
                            window.location.href = login.data.result
                    }
                }
                else {
                    var Model = {
                        isMobile: false
                    }
                    var login = await PostMethod(apiEndPoints.WMLogin, Model);
                    if (login.data.errorCode == 0)
                        window.location.href = login.data.result
                }
                break;
            case 'Pragmatic':
                LoaderShow();
                if (resSelectUser.data.Pragmatic !== true) {
                    var userRegisterModel = {

                    }
                    var res = await PostMethod(apiEndPoints.pragmaticRegister, userRegisterModel);
                    if (res.data.error == "0") {
                        window.open("../Information/PragmaticGame", "_blank")
                    }
                }
                else {
                    window.open("../Information/PragmaticGame", "_blank")
                }
                break;
        }
        LoaderHide();
    }
    else {
        alert(ChangeErroMessage("please_loign_error"));
        LoaderHide();
    }
}
//#endregion GameLogin

//#region sliderPromotion
async function sliderPromotion() {
    var model = {
        ismobile: false,
        ismain: true
    };
    var resPanel = await PostMethod(apiEndPoints.promotionsList, model);
    if (resPanel !== null && resPanel !== undefined) {
        var panelData = resPanel.data;
        var panel = document.getElementById('slider_promotion');
        if (panel !== null) {
            for (i = 0; i < panelData.length; i++) {
                panel.innerHTML +=
                    "<a href = '/Information/Promotion'>" +
                    "<img class='full_img' style='height:250px' src='" + panelData[i].banner + "'>" +
                    "</a>";
            }
            //setTimeout(function () {
            document.getElementById("slider_promotion").className = "one-time";

            slider();
            //}, 2000);
        }
    }
}
//#endregion

//#region getCookie
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

//#endregion

//#region load_em
function load_em() {
    var u = getCookie('un');
    var p = getCookie('ps');

    $("#txt_login_username").val(u);
    $("#txt_login_password").val(p);
    if (u !== null) {
        $("#remember_me" + name).prop('checked', true);
    }
    else {
        $("#remember_me" + name).prop("checked", false);
    }
}

//#endregion

//#region getGameImage
function getGameImage() {
    var imageDiv = document.getElementById('image');

    var imageJoker = document.getElementById('imageJoker');

    var imagenewtown = document.getElementById('imagenewtown');

    $.ajax({
        url: '../../resources/games.json',
        dataType: 'json',
        async: false,
        success: function (data) {
            json = data.game;
            for (i = 0; i < json.length; i++) {
                if (json[i].active === true && json[i].sequence < 9) {
                    if (imageDiv !== null)
                        imageDiv.innerHTML +=
                            '<div class="col-xs-6 col-md-3 custom-padding">' +
                            '<div class="info-card">' +
                            '<div class="front">' +
                            '<div style="background-image: url(http://images.webet333.com/all_918_games/' + json[i].front_image + ');" class="rolex-game hover box-border"><a class="fancybox" href="http://images.webet333.com/all_918_games/' + json[i].front_image + '"><p class="white-text text-center big-text">' + json[i].name + '</p></a></div>' +
                            '</div>' +
                            '<a href="/Information/SlotGame" target="_blank">' +
                            '<div class="back">' +
                            '<img class="img-responsive box-border" src="http://images.webet333.com/all_918_games/' + json[i].back_image + '">' +
                            '</div>' +
                            '</a>' +
                            '</div>' +
                            '</div>';
                }
            }
        }
    });

    $.ajax({
        url: '../../resources/joker-images.json',
        dataType: 'json',
        async: false,
        success: function (data) {
            json = data.game;
            for (i = 0; i < json.length; i++) {
                if (json[i].active === true && json[i].sequence < 9) {
                    if (imageDiv !== null)
                        imageJoker.innerHTML +=
                            '<div class="col-xs-6 col-md-3 custom-padding">' +
                            '<div class="info-card">' +
                            '<div class="front">' +
                            '<div style="background-image: url(http://images.webet333.com/all_joker_games/' + json[i].front_image + ');" class="rolex-game hover box-border"><a class="fancybox" href="http://images.webet333.com/all_joker_games/' + json[i].front_image + '"><p class="white-text text-center big-text">' + json[i].name + '</p></a></div>' +
                            '</div>' +
                            '<a href="/Information/joker" target="_blank">' +
                            '<div class="back">' +
                            '<img class="img-responsive box-border" src="http://images.webet333.com/all_joker_games/' + json[i].back_image + '">' +
                            '</div>' +
                            '</a>' +
                            '</div>' +
                            '</div>';
                }
            }
        }

    });

    $.ajax({
        url: '../../resources/newtown.json',
        dataType: 'json',
        async: false,
        success: function (data) {
            json = data.game;
            for (i = 0; i < json.length; i++) {
                if (json[i].active === true && json[i].sequence < 9) {
                    if (imageDiv !== null)
                        imagenewtown.innerHTML +=
                            '<div class="col-xs-6 col-md-3 custom-padding">' +
                            '<div class="info-card">' +
                            '<div class="front">' +
                            '<div style="background-image: url(http://images.webet333.com/all_newtown_games/' + json[i].front_image + ');" class="rolex-game hover box-border"><a class="fancybox" href="http://images.webet333.com/all_newtown_games/' + json[i].front_image + '"><p class="white-text text-center big-text">' + json[i].name + '</p></a></div>' +
                            '</div>' +
                            '<a href="#">' +
                            '<div class="back">' +
                            '<img class="img-responsive box-border" src="http://images.webet333.com/all_newtown_games/' + json[i].back_image + '">' +
                            '</div>' +
                            '</a>' +
                            '</div>' +
                            '</div>';
                }
            }
        }
    });
}
//#endregion

//#region announcement
async function announcement() {
    var marquee = document.getElementById('p_announcement');
    if (marquee !== null) {
        var res = await GetMethod(apiEndPoints.announcementList);
        for (i = 0; i < res.data.length; i++) {
            marquee.innerHTML += '<span>' + res.data[i].announcement + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
        }
    }
}
//#endregion

//#region LoaderShow
function LoaderShow() {
    $(".loadingImage").show();
}
function LoaderHide() {
    $(".loadingImage").hide();
}
//#endregion

async function whatsapp() {
    window.open('https://api.whatsapp.com/send?phone=60109203291&text=Claim%20and%20Join', '_blank');
}


//#region setCookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//#endregion

//#region deleteCookie
function deleteCookie(name) { setCookie(name, '', -1); }
//#endregion

//#region getCookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//#endregion