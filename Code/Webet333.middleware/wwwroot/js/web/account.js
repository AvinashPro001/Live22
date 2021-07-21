//#region OnLoad 
$(window).on('load', function () {
    LoginSectionHideUnhide();
    GetProfileAndSetInSessionStorage();
    ProfileData();
    CallTrackingDataAPI();
});
//#endregion 

//#region Non "ASYNC" Function Section

//#region Update Time and Interval 

$(document).ready(function () {
    setInterval(async function () {
        SetAllValueInElement("current_time", DisplayCurrentTime());

        try {
            if (GetLocalStorage("IsSedularExecute") == null) SetLocalStorage("IsSedularExecute", false);

            if (GetLocalStorage("IsSedularExecute") == "false") {
                SetLocalStorage("IsSedularExecute", true);

                var data = JSON.parse(Decryption(GetSessionStorage("siteData")))
                if (data == null) {
                    SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)));
                    await AllPromotionCallAPI();
                    await HomeBannerCallAPI();
                    await AllAnnouncementsCallAPI();
                    await CallDownloadLinkAPI();
                    await CallAPIForBankPages();
                    await GetWalletList();
                    if (GetLocalStorage("currentUser") != null) await CallAllBankAPI();
                    AdminBankPageData();
                    SetPromotionInPromotionPage();
                    SetAnnouncementsOnAllPages();
                }
                else {
                    if (data.PromotionPageData == null) { await AllPromotionCallAPI(); SetPromotionInPromotionPage(); }
                    if (data.HomeBannerData == null) { await HomeBannerCallAPI(); SetHomeBannerInMainPage(); }
                    if (data.AnnouncementsData == null) { await AllAnnouncementsCallAPI(); SetAnnouncementsOnAllPages(); }
                    if (data.WalletData == null) { await GetWalletList(); }
                    if (data.AdminBankPageData == null) { await CallAPIForBankPages(); SetAdminBankPage() }
                    if (data.DownloadPageData == null) { await CallDownloadLinkAPI(); }
                    if (GetLocalStorage("currentUser") != null) if (data.AllBankPageData == null) await CallAllBankAPI();

                }

                SetLocalStorage("IsSedularExecute", false);
            }
        }
        catch (e) {
            SetLocalStorage("IsSedularExecute", false);
        }

    }, 1000);
});

//#endregion

//#region Logout Function

function DoLogout() {
    var Data = GetSessionStorage("siteData");
    localStorage.clear();
    sessionStorage.clear();
    SetSessionStorage('siteData', Data)
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

//#region Hide or UnHide After Login and Before Login

function LoginSectionHideUnhide() {
    if (GetLocalStorage("currentUser") == null) {
        document.getElementById("afterlogin").innerHTML = "";
        document.getElementById("bankMainMenu").innerHTML = "";
        document.getElementById("vipMainMenu").innerHTML = "";
        $("#bankMainMenu").css("display", "none");
        $("#vipMainMenu").css("display", "none");
    } else {
        document.getElementById("beforelogin").innerHTML = ""
    }
}

//#endregion

//#region Check users Login or Not

function CheckLoginOrNot() {
    if (GetLocalStorage("currentUser") == null) window.location.href = "/";
}

//#endregion

//#region Check Password Match

function CheckPasswordMatch(IsProfileTextBox = false) {
    var password, confirmPassword;
    if (IsProfileTextBox) {
        password = $("#txt_newPassword").val();
        confirmPassword = $("#txt_confirmPassword").val();
    }
    else {
        password = $("#txt_password").val();
        confirmPassword = $("#txt_confirm_password").val();
    }

    if (password !== confirmPassword)
        $("#divCheckPasswordMatch").html(ChangeErroMessage("pass_not_match_error"));
    else
        $("#divCheckPasswordMatch").html("");
}

//#endregion

//#endregion

//#region "ASYNC" Function Section

//#region "ASYNC" Set Users Profile if User Login

async function ProfileData() {
    if (GetLocalStorage('currentUser') !== null) {
        var res = JSON.parse(Decryption(GetSessionStorage("userDetails")))
        if (res !== null) {
            if (!window.location.href.toLocaleLowerCase().includes("web/otpverified")) {
                if (!res.mobilenoConfirmed) window.location.href = "/web/otpverified"
            }
            SetAllImagePath('login_user_vip_level', res.vipBanner)
            SetAllValueInElement("login_username", res.username)
            SetAllValueInElement("fullname", res.name)
            SetBackgroudImagePath("silver_wallet", res.vipBanner)
            SetAllValueInElement("vip_level_name", res.vipLevelName)
            $('#auto_transfer_checkbox').prop('checked', res.autoTransfer ? "checked" : "");
            SetVIPageProgressBar(res.vipLevelName, res.totalDepositAmount);
        }
        else {
            await GetProfileAndSetInSessionStorage();
            ProfileData();
            GetGlobalParameterAndSetInSessionStorage();
        }
    }
}

//#endregion

//#region "ASYNC" Check Login users is Verified Or not

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

function CheckMobileNumberIsVerifiedOnly() {
    var ProfileData = JSON.parse(Decryption(GetSessionStorage("userDetails")))
    if (ProfileData !== null) {
        if (window.location.href.toLocaleLowerCase().includes("web/otpverified")) {
            if (ProfileData.mobilenoConfirmed) window.location.href = "/"
        }
    }
}

//#endregion

//#region "ASYNC" Get Profile And Set In Session Storage

async function GetProfileAndSetInSessionStorage() {
    if (GetLocalStorage('currentUser') !== null) {
        var res = await GetMethod(accountEndPoints.getProfile);
        if (res.status == 200)
            SetSessionStorage('userDetails', Encryption(JSON.stringify(res.response.data)));
        else
            CheckTokenIsValid(res.status, res.response.message)
    }
}

//#endregion

//#region "ASYNC" Get Global Parameter And Set In Session Storage

async function GetGlobalParameterAndSetInSessionStorage() {
    if (GetLocalStorage('currentUser') !== null) {
        var globalParameter = JSON.parse(Decryption(GetSessionStorage("GamePreFix")));
        if (globalParameter == null) {
            var gamePrefix = await GetMethod(globalEndPoints.globalParameter);
            SetSessionStorage('GamePreFix', Encryption(JSON.stringify(gamePrefix.response.data)));
            globalParameter = gamePrefix.response.data;
        }
    }
}

//#endregion

function OnPressEnter() {
    if (event.keyCode === 13) DoLogin();
}


//#region "ASYNC" Login Function

async function DoLogin() {
    let model = {
        userName: $('#txt_login_username').val(),
        password: $("#txt_login_password").val(),
        grantType: 'User'
    };
    let res = await PostMethod(accountEndPoints.login, model);

    if (res.status !== 200) {
        if (res.status === 400) {
            if (res.response.message == "Your account is not active." || res.response.message == "Akaun anda belum aktif." || res.response.message == "您的帐户无效。") {
                DoLogout();
            }

            if (res.response.message == "Your access token is expired, please login again." || res.response.message == "Token akses anda tamat tempoh, sila log masuk sekali lagi." || res.response.message == "您的访问令牌已过期，请重新登录。") {
                DoLogout();
            }
        }
        ShowError(res.response.message);
        return 0;
    }
    SetTrackingData(model.userName, "loginCookies");
    SetCookie('trackLogin', true, 1000);
    SetLocalStorage('currentUserData', Encryption($("#txt_login_password").val()));
    SetLocalStorage("currentUser", res.response.data.access_token);
    SetSessionStorage("userDetails", Encryption(JSON.stringify(res.response.data.user)))
    window.location.reload();
}

//#endregion 

//#region "ASYNC" Change Password

async function ChangePassword() {
    var currentPassword = $('#txt_currentPassword').val();
    var newPassword = $("#txt_newPassword").val();
    var confirmPassword = $("#txt_confirmPassword").val();


    if (newPassword.length < 6) return ShowError(ChangeErroMessage("pass_length_error"));

    if (newPassword === "") return ShowError(ChangeErroMessage("password_required_error"));

    if (confirmPassword === "") return ShowError(ChangeErroMessage("confirm_password_required_error"));

    if (newPassword !== confirmPassword) return ShowError(ChangeErroMessage("pass_not_match_error"));

    var res = JSON.parse(Decryption(GetSessionStorage("userDetails")))
    var username = res.username

    if (username === password) return ShowError("Password and username must be different.");

    if (Decryption(GetLocalStorage("currentUserData")) !== currentPassword) return ShowError(ChangeErroMessage("current_pass_not_match"));

    var reqExp = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))$/i;
    if (!reqExp.test(newPassword)) return ShowError(ChangeErroMessage("pass_alpha_error"));

    var model = {
        currentPassword: currentPassword,
        password: newPassword,
        confirmPassword: confirmPassword
    };

    try {
        LoaderShow();
        let res = await PostMethod(accountEndPoints.changePassword, model)
        if (res.status == 200) {
            ShowSuccess(res.response.message);
            DoLogout();
        }
        else {
        }
        LoaderHide();
    }
    catch (e) {
        LoaderHide();
    }
}

//#endregion

//#region "ASYNC" Register Function

var CapchaChecked = false;

async function DoRegister() {

    var name = $('#txt_name').val();
    var mobile = $('#txt_mobile_no').val();
    var username = $('#txt_username').val();
    var password = $("#txt_password").val();
    var confirmPassword = $("#txt_confirm_password").val();

    if (mobile === "") return ShowError(ChangeErroMessage("mobile_no_required_error"));

    if (mobile.length < 10) return ShowError(ChangeErroMessage("mobile_length_error"));

    if (mobile.length > 11) return ShowError(ChangeErroMessage("mobile_length_error"));

    if (username === "") return ShowError(ChangeErroMessage("username_required_error"));

    if (username.length < 7) return ShowError(ChangeErroMessage("username_length_error"));

    if (password.length < 6) return ShowError(ChangeErroMessage("pass_length_error"));

    if (password === "") return ShowError(ChangeErroMessage("password_required_error"));

    if (confirmPassword === "") return ShowError(ChangeErroMessage("confirm_password_required_error"));

    if (name === "") return ShowError(ChangeErroMessage("name_required_error"));

    if (username === password) return ShowError(ChangeErroMessage("username_pass_diff_error"));

    if (password !== confirmPassword) return ShowError(ChangeErroMessage("pass_not_match_error"));

    if (!$('#term_condition_checkbox').is(":checked")) return ShowError(ChangeErroMessage("accept_TC"));

    if (!CapchaChecked) return ShowError(ChangeErroMessage("check_capcha"));

    var regex = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))$/i;
    if (!regex.test(password)) return ShowError(ChangeErroMessage("pass_alpha_error"));

    if (/^[a-zA-Z0-9- ]*$/.test(username) == false)
        return ShowError(ChangeErroMessage('special_char_not_allowed'));

    if (/^[a-z0-9_]+$/i.test(username) == false)
        return ShowError(ChangeErroMessage('space_not_allowed'));

    var model = {
        name: name,
        mobile: mobile,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        referenceKeyword: GetCookie("ref")
    };

    LoaderShow();
    var res = await PostMethod(accountEndPoints.register, model);
    if (res.status == 200) {
        try {
            if ((res.data.messageResponse.statusCode.split(",").length - 1) == 0)
                ShowError(res.data.messageResponse.smsMessage);
        }
        catch (e) { }
        SetTrackingData(model.username, "registerCookies");
        SetCookie('trackRegister', true, 1000);
        SetLocalStorage('currentUserData', Encryption(password));
        SetLocalStorage("currentUser", res.response.data.access_token);
        SetSessionStorage("userDetails", Encryption(JSON.stringify(res.response.data.user)));
        LoaderHide();
        window.location.href = "../Web/otpverified";
    }
    else {
        LoaderHide();
        ShowError(res.response.message);
    }

}

//#endregion

//#region "ASYNC" Update Mobile Number

async function UpdateMobileNumber() {
    if ($("#password-update-mobile").val() != Decryption(GetLocalStorage("currentUserData"))) {
        $('#mobilenumber_update').modal('hide');
        return ShowError(ChangeErroMessage("current_pass_not_match"));
    }

    if ($("#mobile_number").val() == "") {
        $('#mobilenumber_update').modal('hide');
        return ShowError(ChangeErroMessage("mobile_no_required_error"));
    }

    model = {
        mobile: $('#mobile_number').val()
    };

    if (model.mobile.length < 10) {
        $('#mobilenumber_update').modal('hide');
        return ShowError(ChangeErroMessage("mobile_length_error"));
    }

    if (model.mobile.length > 11) {
        $('#mobilenumber_update').modal('hide');
        return ShowError(ChangeErroMessage("mobile_length_error"));
    }

    LoaderShow();
    var res = await PostMethod(accountEndPoints.updateProfile, model);
    if (res.status == 200) {
        LoaderHide();
        $('#mobilenumber_update').modal('hide');
        ShowSuccess(res.response.message);
        GetProfileAndSetInSessionStorage();
    }
    else {
        LoaderHide();
        $('#mobilenumber_update').modal('hide');
        ShowError(res.response.message);
    }
}

//#endregion

//#endregion

function MobileValidation(TextFieldId, ErrorShowId) {
    var mobile = $('#' + TextFieldId).val();
    if (mobile.length < 10 || mobile.length > 11) {
        $("#" + ErrorShowId).text(ChangeErroMessage("mobile_length_error"));
    }
    else {
        $("#" + ErrorShowId).text("");
    }
}

async function ForgotPassword() {
    var mobile = $('#forgot-password-number').val();
    if (mobile === null || mobile === undefined || mobile === "")
        return ShowError(ChangeErroMessage("mobile_no_required_error"));

    if (mobile.length < 10 || mobile.length > 11)
        return ShowError(ChangeErroMessage("mobile_length_error"));

    let model = {
        mobileNumber: mobile
    };

    LoaderShow();
    $('#forgotPassword').modal('hide');

    var res = await PostMethod(accountEndPoints.getUserByMobile, model);
    if (res.status == 200) {
        LoaderHide();
        if ((res.response.data.messageResponse.statusCode.split(",").length - 1) == 0)
            return ShowError(res.response.data.messageResponse.smsMessage);
        ShowSuccess(res.response.message);
    }
    else {
        LoaderHide();
        ShowError(res.response.message);
    }
}

setInterval(function () {
    if (GetLocalStorage("currentUser") != null)
        regisrationGame();
}, 2000)

function Counter() {
    document.getElementById("button_resend").disabled = true;

    var count = 60;
    var timer = setInterval(function () {
        $("#counter_txt").html((count--) - 1);
        if (count == 0) {
            clearInterval(timer);
            document.getElementById("counter_txt").innerText = "";
            document.getElementById("button_resend").disabled = false;
        }
    }, 1000);
}

async function SendOTP(number) {
    if (number == 1)
        Counter();
    var resUserData = JSON.parse(Decryption(GetSessionStorage('userDetails')));
    if (resUserData.mobilenoConfirmed == false) {
        LoaderShow();
        var res = await PostMethod(accountEndPoints.SendOTP, {});
        if (res.status == 200) {
            document.getElementById("txt_otp").value = "";
            ShowSuccess(ChangeErroMessage("otp_send_success"));

        }
        LoaderHide();
    }
}

async function VerifiedOTP() {

    let model = {
        otp: document.getElementById("txt_otp").value
    }

    if (model.otp == null || model.otp == undefined || model.otp == "")
        return ShowError(ChangeErroMessage("error_otp_required"));

    if (model.otp.length > 6)
        return ShowError(ChangeErroMessage("error_otp"));

    LoaderShow();
    try {
        var res = await PostMethod(accountEndPoints.VerifiedOTP, model);
        if (res.status == 200) {
            if (res.response.data.errorCode == 0) {
                await GetProfileAndSetInSessionStorage()
                //window.location.href = "/";
                await gtag_report_conversion("../");
            }
        }
        else {
            ShowError(res.response.message);
        }
    }
    catch {
        document.getElementById("txt_otp").value = "";
    }
    LoaderHide();
}

function SetVIPageProgressBar(vipLevel, TotalDepositAmount) {
    var percent = 0;
    switch (vipLevel) {
        case "Normal": percent = 0; break;
        case "Bronze": percent = 19; break;
        case "Silver": percent = 37; break;
        case "Gold": percent = 55; break;
        case "Platinum": percent = 73; break;
        case "Diamond": percent = 100; break;
    }
    $(".progress-bar").css("width", percent + "%").attr("aria-valuenow", percent);
    $(".progress-completed").text(percent + "%");
    $("span").each(function () {
        if ($(this).hasClass("activestep")) {
            $(this).removeClass("activestep");
        }
    });
    $("#" + vipLevel.toLocaleLowerCase() + '-span').addClass("activestep");
    $("#currentStatus").val(vipLevel);
    $("#currentDeposit").val(TotalDepositAmount);

    $("#currentStatus").attr("disabled", "disabled");
    $("#currentDeposit").attr("disabled", "disabled");
    $("#nextLevelUpgradAmount").attr("disabled", "disabled");
}

function SetTrackingData(username, cookiesName) {
    if (GetCookie(cookiesName) == "" || GetCookie(cookiesName) == null) {
        var FirstArray = [];
        FirstArray.push(username.toUpperCase())
        SetCookie(cookiesName, FirstArray, 1000);
    }
    var usernameList = [];
    usernameList.push(GetCookie(cookiesName));
    var result = GetCookie(cookiesName);
    if (result.indexOf(username.toUpperCase()) == -1) {
        usernameList.push(username.toUpperCase());
        SetCookie(cookiesName, usernameList, 1000);
    }
}

async function CallTrackingDataAPI() {

    if (GetCookie("trackRegister") == true || GetCookie("trackRegister") == "true") {
        result = GetCookie('registerCookies');
        var data = result.split(",");
        if (data.length > 1) {
            let model = {
                usernames: result,
                process: "Register"
            }
            let res = await PostMethod(accountEndPoints.LoginRegisterTracking, model);
            if (res.status == 200) {
                SetCookie('trackRegister', false, 1000);
            }
        }
    }

    if (GetCookie("trackLogin") == true || GetCookie("trackLogin") == "true") {
        result = GetCookie('loginCookies');
        var data = result.split(",");
        if (data.length > 1) {
            let model = {
                usernames: result,
                process: "Login"
            }
            let res = await PostMethod(accountEndPoints.LoginRegisterTracking, model);
            if (res.status == 200) {
                SetCookie('trackLogin', false, 1000);
            }
        }
    }

}

async function regisrationGame() {
    try {
        if (localStorage.getItem('IsExecute') == "false" || localStorage.getItem('IsExecute') == false || localStorage.getItem('IsExecute') == null) {
            localStorage.setItem('IsExecute', true);

            var resUserData = JSON.parse(Decryption(GetSessionStorage('userDetails')));

            if (resUserData == null) {
                var res = await GetMethod(accountEndPoints.getProfile);
                resUserData = res.response.data;
                SetSessionStorage('userDetails', Encryption(JSON.stringify(res.response.data)));
            }

            let userModel = {
                id: resUserData.id
            };
            let resSelectUser = JSON.parse(Decryption(GetSessionStorage('userRegisterDetails')));
            if (
                resSelectUser === null ||
                resSelectUser.MaxBet === false ||
                resSelectUser.M8 === false ||
                resSelectUser.Playtech === false ||
                resSelectUser.AG === false ||
                resSelectUser._918Kiss === false ||
                resSelectUser.Joker === false ||
                resSelectUser.Mega888 === false ||
                resSelectUser.DG === false ||
                resSelectUser.SexyBaccarat === false ||
                resSelectUser.SA === false ||
                resSelectUser.Pussy888 === false ||
                resSelectUser.AllBet === false ||
                resSelectUser.WM === false ||
                resSelectUser.Pragmatic === false ||
                resSelectUser.SBO === false
            ) {
                var res = await PostMethod(accountEndPoints.gameRegisterCheck, userModel);
                resSelectUser = res.response.data;
                SetSessionStorage('userRegisterDetails', Encryption(JSON.stringify(res.response.data)));
            }

            var globalParameters = JSON.parse(Decryption(GetSessionStorage("GamePreFix")));
            if (globalParameters == null) {
                var gamePrefix = await GetMethod(globalEndPoints.globalParameter);
                SetSessionStorage('GamePreFix', Encryption(JSON.stringify(gamePrefix.response.data)));
                globalParameters = gamePrefix.response.data;
            }

            var username = resUserData.username
            var M8Username = globalParameters.m8GamePrefix + username;

            if (resSelectUser.MaxBet !== true) {
                var userMaxBet = {
                    firstname: resUserData.name,
                    lastname: "Webet333"
                };
                try {
                    await PostMethod(gameRegisterEndPoints.registerMaxBet, userMaxBet);
                }
                catch (e) {
                }
            }

            if (resSelectUser.M8 !== true) {
                try {
                    let modelM8 = {
                    };
                    await PostMethod(gameRegisterEndPoints.registerM8, modelM8);
                }
                catch (ex) {
                }
            }

            if (resSelectUser.AG !== true) {
                try {
                    let modelAG = {
                    };
                    await PostMethod(gameRegisterEndPoints.registerAG, modelAG);
                }
                catch (ex) {
                }
            }

            if (resSelectUser.Playtech !== true) {
                try {
                    let modelPlaytech = {
                    };
                    await PostMethod(gameRegisterEndPoints.registerPlaytech, modelPlaytech);
                }
                catch (ex) {
                }
            }

            if (resSelectUser._918Kiss !== true) {
                try {
                    let model918Kiss = {
                    };
                    await PostMethod(gameRegisterEndPoints.register918Kiss, model918Kiss);
                }
                catch (ex) {
                }
            }

            if (resSelectUser.Joker !== true) {
                try {
                    let modelJoker = {
                    };
                    await PostMethod(gameRegisterEndPoints.registerJoker, modelJoker);

                }
                catch (ex) {
                }
            }

            if (resSelectUser.Mega888 !== true) {
                var userMegaa88Model = {
                }
                try {
                    await PostMethod(gameRegisterEndPoints.mega888Register, userMegaa88Model);
                }
                catch {
                }
            }

            if (resSelectUser.DG !== true) {
                var model = {
                }
                try {
                    await PostMethod(gameRegisterEndPoints.dgRegister, model);
                }
                catch {
                }
            }

            if (resSelectUser.SexyBaccarat !== true) {
                var model = {
                }
                try {
                    await PostMethod(gameRegisterEndPoints.sexyRegister, model);
                }
                catch {
                }
            }

            if (resSelectUser.SA !== true) {
                var model = {
                }
                try {
                    await PostMethod(gameRegisterEndPoints.saRegister, model);
                }
                catch {
                }
            }

            if (resSelectUser.Pussy888 !== true) {
                var model = {
                }
                try {
                    await PostMethod(gameRegisterEndPoints.pussyRegister, model);
                }
                catch {
                }
            }

            if (resSelectUser.AllBet !== true) {
                var model = {
                }
                try {
                    await PostMethod(gameRegisterEndPoints.allBetRegister, model);
                }
                catch {
                }
            }

            if (resSelectUser.WM !== true) {
                var model = {
                }
                try {
                    await PostMethod(gameRegisterEndPoints.WMRegister, model);
                }
                catch {
                }
            }

            if (resSelectUser.Pragmatic !== true) {
                var model = {
                }
                try {
                    await PostMethod(gameRegisterEndPoints.pragmaticRegister, model);
                }
                catch {
                }
            }

            if (resSelectUser.SBO !== true) {
                var model = {
                }
                try {
                    await PostMethod(gameRegisterEndPoints.sboRegister, model);
                }
                catch {
                }
            }

            localStorage.setItem('IsExecute', false);
        }
    }
    catch {
        localStorage.setItem('IsExecute', false);
    }
}

function CheckTokenIsValid(StausCode, StatusMessage) {
    if (StausCode == 400)
        if (StatusMessage == "Your access token is expired, please login again." || StatusMessage == "Token akses anda tamat tempoh, sila log masuk sekali lagi." || StatusMessage == "您的访问令牌已过期，请重新登录。") {
            DoLogout();
        }
}

function OnPasswordType(PasswordTextboxId, UsernameTextboxId) {
    var password = $("#" + PasswordTextboxId).val();
    var username = $('#' + UsernameTextboxId).val();

    if (GetLocalStorage("currentUser") !== null) {
        var res = JSON.parse(Decryption(GetSessionStorage("userDetails")))
        username = res.username
    }

    password.length >= 6 ? ($("#pass-len").addClass("green-color")) : ($("#pass-len").removeClass("green-color"));

    if (password != "")
        username !== password ? ($("#pass-username-same").addClass("green-color")) : ($("#pass-username-same").removeClass("green-color"))

    var regex = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))$/i;
    regex.test(password) ? ($("#pass-alpha").addClass("green-color")) : ($("#pass-alpha").removeClass("green-color"))
}