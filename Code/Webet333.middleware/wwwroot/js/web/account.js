//#region OnLoad 
$(document).ready(function () {
    LoginSectionHideUnhide();
    ProfileData()
});
//#endregion 

//#region Login Function

async function DoLogin() {
    let model = {
        userName: $('#txt_login_username').val(),
        password: $("#txt_login_password").val(),
        grantType: 'User'
    };
    let res = await PostMethod(accountEndPoints.login, model);

    if (res.status !== 200) {
        if (err.status === 400) {
            if (err.responseJSON.message == "Your account is not active." || err.responseJSON.message == "Akaun anda belum aktif." || err.responseJSON.message == "您的帐户无效。") {
                DoLogout();
            }

            if (err.responseJSON.message == "Your access token is expired, please login again." || err.responseJSON.message == "Token akses anda tamat tempoh, sila log masuk sekali lagi." || err.responseJSON.message == "您的访问令牌已过期，请重新登录。") {
                DoLogout();
            }
        }
        if (err.responseJSON !== null && err.responseJSON !== undefined) {
            ShowError(err.responseJSON.message);
            LoaderHide();
        }
        return 0;
    }

    SetLocalStorage('currentUserData', Encryption($("#txt_login_password").val()));
    SetSessionStorage("currentUser", res.response.data.access_token);
    SetSessionStorage("userDetails", Encryption(JSON.stringify(res.response.data.user)))
    window.location.reload();
}

//#endregion 

//#region Hide or UnHide After Login and Before Login
function LoginSectionHideUnhide() {
    if (GetSessionStorage("currentUser") == null) {
        document.getElementById("afterlogin").innerHTML = "";
        document.getElementById("bankMainMenu").innerHTML = "";
    } else {
        document.getElementById("beforelogin").innerHTML = ""
    }
}
//#endregion 

//#region Check users Login or Not
function CheckLoginOrNot() {
    if (GetSessionStorage("currentUser") == null) window.location.href = "/";
}
//#endregion 

//#region Set Users Profile if User Login
async function ProfileData() {
    if (GetSessionStorage('currentUser') !== null) {
        var ProfileData = JSON.parse(Decryption(GetSessionStorage("userDetails")))
        if (ProfileData !== null) {
            if (!window.location.href.toLocaleLowerCase().includes("web/otpverified")) {
                if (!ProfileData.mobilenoConfirmed) window.location.href = "/web/otpverified"
            }
            SetAllImagePath('login_user_vip_level', ProfileData.vipBanner)
            SetAllValueInElement("login_username", ProfileData.username)
            SetBackgroudImagePath("silver_wallet", ProfileData.vipBanner)
            SetAllValueInElement("vip_level_name", ProfileData.vipLevelName)
        }
        else {
            await GetProfileAndSetInSessionStorage();
            ProfileData();
            GetGlobalParameterAndSetInSessionStorage();

        }
    }
}
//#endregion 

//#region Check Login users is Verified Or not
async function CheckMobileNumberIsVerified() {
    var ProfileData = JSON.parse(Decryption(GetSessionStorage("userDetails")))
    if (ProfileData !== null) {
        if (window.location.href.toLocaleLowerCase().includes("web/otpverified")) {
            if (ProfileData.mobilenoConfirmed) window.location.href = "/"
        }
    }
    else {
        await GetProfileAndSetInSessionStorage();
        CheckMobileNumberIsVerified();
        GetGlobalParameterAndSetInSessionStorage();
    }
}
//#endregion 

//#region Logout Function
function DoLogout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("userDetails");
    CheckLoginOrNot()
}
//#endregion 

//#region Get Current Time 
function DisplayCurrentTime() {
    var date = new Date();
    var day = date.getDate();
    var Month = date.getMonth() + 1;
    var Year = date.getFullYear();
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    time = day + "/" + Month + "/" + Year + " " + hours + ":" + minutes + ":" + seconds + " " + am_pm + " (GMT=8)";
    return time;
};
//#endregion 

//#region Update Time and Interval 
setInterval(function () {
    SetAllValueInElement("current_time", DisplayCurrentTime())
}, 1000);
//#endregion 

//#region Get Profile And Set In Session Storage

async function GetProfileAndSetInSessionStorage() {
    if (GetSessionStorage('currentUser') !== null) {
        var userDetails = JSON.parse(Decryption(GetSessionStorage("userDetails")));
        if (userDetails == null) {
            var res = await GetMethod(accountEndPoints.getProfile);
            SetSessionStorage('userDetails', Encryption(JSON.stringify(res.response.data)));
        }
    }
}

//#endregion

//#region Get Global Parameter And Set In Session Storage

async function GetGlobalParameterAndSetInSessionStorage() {
    if (GetSessionStorage('currentUser') !== null) {
        var globalParameter = JSON.parse(Decryption(GetSessionStorage("GamePreFix")));
        if (globalParameter == null) {
            var gamePrefix = await GetMethod(globalEndPoints.globalParameter);
            SetSessionStorage('GamePreFix', Encryption(JSON.stringify(gamePrefix.response.data)));
            globalParameter = gamePrefix.response.data;
        }
    }
}

//#endregion