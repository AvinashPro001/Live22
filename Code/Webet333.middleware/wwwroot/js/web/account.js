$(document).ready(function () {
    LoginSectionHideUnhide();
    ProfileData()
});

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
    
    SetSessionStorage("currentUser", res.response.data.access_token);
    SetSessionStorage("userDetails", Encryption(JSON.stringify(res.response.data.user)))
    window.location.reload();
}

function LoginSectionHideUnhide() {
    if (GetSessionStorage("currentUser") == null) {
        document.getElementById("afterlogin").innerHTML = "";
        document.getElementById("bankMainMenu").innerHTML = "";
    } else {
        document.getElementById("beforelogin").innerHTML = ""
    }
}

function CheckLoginOrNot() {
    if (GetSessionStorage("currentUser") == null) window.location.href = "/";
}

function ProfileData() {
    if (GetSessionStorage("currentUser") !== null) {
        var ProfileData = JSON.parse(Decryption(GetSessionStorage("userDetails")))
        if (!window.location.href.toLocaleLowerCase().includes("web/otpverified")) {
            if (!ProfileData.mobilenoConfirmed) window.location.href = "/web/otpverified"
        }
        SetAllImagePath('login_user_vip_level', ProfileData.vipBanner)
        SetAllValueInElement("login_username", ProfileData.username)
        SetBackgroudImagePath("silver_wallet", ProfileData.vipBanner)
        SetAllValueInElement("vip_level_name",ProfileData.vipLevelName)
    }
}

function CheckMobileNumberIsVerified() {
    if (GetSessionStorage("currentUser") !== null) {
        var ProfileData = JSON.parse(Decryption(GetSessionStorage("userDetails")))
        if (window.location.href.toLocaleLowerCase().includes("web/otpverified")) {
            if (ProfileData.mobilenoConfirmed) window.location.href = "/"
        }
    }
}

function DoLogout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("userDetails");
    CheckLoginOrNot()
}

function DisplayCurrentTime() {
    var date = new Date();
    var day = date.getDate();
    var Month = date.getMonth()+1;
    var Year = date.getFullYear();
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    time = day + "/" + Month + "/" + Year + " " + hours + ":" + minutes + ":" + seconds + " " + am_pm + " (GMT=8)";
    return time;
};

setInterval(function () {
    SetAllValueInElement("current_time", DisplayCurrentTime())
}, 1000);
