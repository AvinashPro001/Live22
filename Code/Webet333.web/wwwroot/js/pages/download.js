//#region Onload

$(document).ready(function () {
    authorize();
    Mega888UserName();
    if (window.location.href.includes("Information/Download") || window.location.href.includes("Information/Download"))
        GameAppBarcode();
});

//#endregion Onload

async function authorize() {
    if (GetLocalStorage('currentUser') === null) {
        document.getElementById('_918userName').innerText = document.getElementById('JokeruserName').innerText = 'Plase Login !';
        document.getElementById('_918resetpasswordDownload').innerText = 'Plase Login !';
        document.getElementById('JokeruserName').innerText = 'Plase Login !';
        document.getElementById('Jokerresetpassword').innerText = 'Plase Login !';
        document.getElementById('Pussy888userName').innerText = 'Plase Login !';
        document.getElementById('PussyresetpasswordDownload').innerText = 'Plase Login !';
        if (window.location.href.includes("/Information/Download") || window.location.href.includes("/Information/Download")) {
            document.getElementById('reset918password').style.display = 'none';
            document.getElementById('pussyresetpassword').style.display = 'none';

        }
    }
    else {

        var res = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
        var globalParameters = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));

        if (res == null || res.data.username == null || res.data.usernamePussy888 == null) {
            var response = await GetMethod(apiEndPoints.getProfile);
            sessionStorage.setItem('UserDetails', enc(JSON.stringify(response)));
            userDetails = response;
        }

        if (globalParameters == null) {
            var gamePrefix = await GetMethodWithReturn(apiEndPoints.globalParameter);
            sessionStorage.setItem('GamePreFix', enc(JSON.stringify(gamePrefix)));
            globalParameters = gamePrefix;
        }

        var usernamePrifix = globalParameters.data.jokerGamePrefix + res.data.username;

        if ($('#M8Download').prop('id') !== '') {
            document.getElementById('JokeruserName').innerText = jokerConstParameterValue.AppID + '.' + usernamePrifix;
            document.getElementById('Jokerresetpassword').innerText = 'Your WEBET333.COM Password';
            document.getElementById('_918userName').innerText = res.data.username918;
            document.getElementById('_918resetpasswordDownload').innerText = res.data.password918;
            document.getElementById('Pussy888userName').innerText = res.data.usernamePussy888;
            document.getElementById('PussyresetpasswordDownload').innerText = res.data.passwordPussy888;
            if (window.location.href.includes("/Information/Download") || window.location.href.includes("/Information/Download")) {
                document.getElementById('reset918password').style.display = '';
                document.getElementById('pussyresetpassword').style.display = '';
                document.getElementById('Pussy888userName').innerText = res.data.usernamePussy888;
                document.getElementById('PussyresetpasswordDownload').innerText = res.data.passwordPussy888;
            }
        }
    }
}

function downloadgame(i) {
    if (GetLocalStorage('currentUser') !== null) {
        if (i === 1) {
            window.open('http://dl123.918kiss.com', '_blank');
        }
        else if (i === 2) {
            window.open('https://www.joker8868.com/mobile', '_blank');
        }
    }
}

var mega888_apkURL, mega888_iosURL, mega888_ios32URL, kiss918_apkURL, kiss918_iosURL, kiss_ios32URL, joker_apkURL, joker_iosURL, pussy888_apkURL, pussy888_iosURL;

$(function () {
    $("#bt_down_apk_mega").click(function () {
        self.location = mega888_apkURL;
    });

    $("#bt_down_ios_mega").click(function () {
        self.location = mega888_iosURL;
    });

    $("#bt_down_ios32_mega").click(function () {
        self.location = mega888_ios32URL;
    });



    $("#bt_down_apk_918").click(function () {
        self.location = kiss918_apkURL;
    });

    $("#bt_down_ios_918").click(function () {
        self.location = kiss918_iosURL;
    });

    $("#bt_down_ios32__918").click(function () {
        self.location = kiss_ios32URL;
    });

    $("#bt_down_apk_joker").click(function () {
        self.location = joker_apkURL;
    });

    $("#bt_down_ios_joker").click(function () {
        self.location = joker_iosURL;
    });

    $("#bt_down_apk_pussy888").click(function () {
        self.location = pussy888_apkURL;
    });

    $("#bt_down_ios_pussy888").click(function () {
        self.location = pussy888_iosURL;
    });

});

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/QQ/i) == "qq") {
        return true;
    } else {
        return false;
    }
}


async function Mega888UserName() {
    if (GetLocalStorage('currentUser') !== null) {
        var resUserData = await GetMethod(apiEndPoints.getProfile);
        document.getElementById("mega888username").innerText = resUserData.data.loginid;
        document.getElementById("mega888password").innerText = "Your WEBET333.COM Password";
    }
    else {
        document.getElementById("mega888username").innerText = "Please Login !";
        document.getElementById("mega888password").innerText = "Please Login !";
    }
}

async function GameAppBarcode() {
    var res = await GetMethod(apiEndPoints.downloadLinkList);
    for (i = 0; i < res.data.length; i++) {
        if (res.data[i].name === "918KissAndroid") {
            document.getElementById("918KissAndroidBarcode").src = res.data[i].barcodeImage;
            kiss918_apkURL = res.data[i].value;
        }

        if (res.data[i].name === "918KissIOS") {
            document.getElementById("918KissIOSBarcode").src = res.data[i].barcodeImage;
            kiss_ios32URL = res.data[i].value;
        }

        if (res.data[i].name === "918KissIOS64") {
            document.getElementById("918KissIOS64Barcode").src = res.data[i].barcodeImage;
            kiss918_iosURL = res.data[i].value;
        }

        if (res.data[i].name === "JokerAndroid") {
            document.getElementById("JokerAndroidBarcode").src = res.data[i].barcodeImage;
            joker_apkURL = res.data[i].value;
        }

        if (res.data[i].name === "JokerIOS") {
            document.getElementById("JokerIOSBarcode").src = res.data[i].barcodeImage;
            joker_iosURL = res.data[i].value;
        }

        if (res.data[i].name === "Mega888Android") {
            document.getElementById("Mega888AndroidBarcode").src = res.data[i].barcodeImage;
            mega888_apkURL = res.data[i].value;
        }

        if (res.data[i].name === "Mega888IOS") {
            document.getElementById("MegaIOSBarcode").src = res.data[i].barcodeImage;
            mega888_ios32URL = res.data[i].value;
        }

        if (res.data[i].name === "Mega888IOS64") {
            document.getElementById("MegaIOS64Barcode").src = res.data[i].barcodeImage;
            mega888_iosURL = res.data[i].value;
        }

        if (res.data[i].name === "Pussy888IOS") {
            document.getElementById("Pussy888IOSBarcode").src = res.data[i].barcodeImage;
            pussy888_iosURL = res.data[i].value;
        }

        if (res.data[i].name === "Pussy888Android") {
            document.getElementById("Pussy888AndroidBarcode").src = res.data[i].barcodeImage;
            pussy888_apkURL = res.data[i].value;
        }
    }
}

async function ResetPasswordPussy888() {
    let resdata = await GetMethod(apiEndPoints.ChangePussy888PassWordReset);
    var res = await GetMethod(apiEndPoints.getProfile);
    sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
    document.getElementById('PussyresetpasswordDownload').innerText = resdata.data.newPassword;
}