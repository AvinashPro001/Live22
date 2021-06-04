//#region OnLoad 
$(document).ready(function () {
    LoginSectionHideUnhide();
    GetProfileAndSetInSessionStorage();
    ProfileData();
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
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserData");
    sessionStorage.removeItem("userDetails");
    sessionStorage.removeItem("GamePreFix");
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

function CheckPasswordMatch() {
    var password = $("#txt_password").val();
    var confirmPassword = $("#txt_confirm_password").val();
    if (password !== confirmPassword)
        $("#divCheckPasswordMatch").html("pass_not_match_error");
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

//#endregion

//#region "ASYNC" Get Profile And Set In Session Storage

async function GetProfileAndSetInSessionStorage() {
    if (GetLocalStorage('currentUser') !== null) {
        var res = await GetMethod(accountEndPoints.getProfile);
        SetSessionStorage('userDetails', Encryption(JSON.stringify(res.response.data)));
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

//#region "ASYNC" Login Function

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

    if (newPassword.length < 6)
        return ShowError("pass_length_error");

    if (newPassword === "")
        return ShowError("password_required_error");

    if (confirmPassword === "")
        return ShowError("confirm_password_required_error");

    if (Decryption(GetLocalStorage("currentUserData")) !== currentPassword)
        return ShowError("username_pass_diff_error");

    var reqExp = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
    if (!reqExp.test(currentPassword))
        return ShowError("pass_alpha_error");

    var model = {
        currentPassword: currentPassword,
        password: newPassword,
        confirmPassword: confirmPassword
    };

    try {
        LoaderShow();
        let res = await postwokr(accountEndPoints.changePassword, model)
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

async function DoRegister() {

    var name = $('#txt_name').val();
    var mobile = $('#txt_mobile_no').val();
    var username = $('#txt_username').val();
    var password = $("#txt_password").val();
    var confirmPassword = $("#txt_confirm_password").val();
    //var referenceKeyword= getCookie("ref")

    if (mobile === "") return ShowError("mobile_no_required_error");

    if (mobile.length < 10) return ShowError("mobile_length_error");

    if (username === "") return ShowError("username_required_error");

    if (username.length < 7) return ShowError("username_length_error");

    if (password.length < 6) return ShowError("pass_length_error");

    if (password === "") return ShowError("password_required_error");

    if (confirmPassword === "") return ShowError("confirm_password_required_error");

    if (name === "") return ShowError("name_required_error");

    if (username === password) return ShowError("username_pass_diff_error");

    var regex = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
    if (!regex.test(password)) return ShowError("pass_alpha_error");

    if (/^[a-zA-Z0-9- ]*$/.test(username) == false)
        return ShowError('Special Charater not allowed');

    if (/^[a-z0-9_]+$/i.test(username) == false)
        return ShowError('Space not allowed');

    var model = {
        name: name,
        mobile: mobile,
        username: username,
        password: password,
        confirmPassword: confirmPassword
        //referenceKeyword: getCookie("ref")
    };

    LoaderShow();
    var res = await PostMethod(accountEndPoints.register, model);
    if (res.status == 200) {
        try {
            if ((res.data.messageResponse.statusCode.split(",").length - 1) == 0)
                ShowError(res.data.messageResponse.smsMessage);
        }
        catch (e) { }
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
        return ShowError("Current Password not matched");
    }

    if ($("#mobile_number").val() == "") {
        $('#mobilenumber_update').modal('hide');
        return ShowError("Emter Mobile Number");
    }

    model = {
        mobile: $('#mobile_number').val()
    };

    if (model.mobile.length < 10) {
        $('#mobilenumber_update').modal('hide');
        return ShowError("mobile_length_error");
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

//#region "ASYNC" Update Mobile Number

async function UpdateName() {

    if ($("#profile_fullname").val() == "") {
        return ShowError("Emter Full Name");
    }

    model = {
        name: $('#profile_fullname').val()
    };

    LoaderShow();
    var res = await PostMethod(accountEndPoints.updateProfile, model);
    if (res.status == 200) {
        LoaderHide();
        ShowSuccess(res.response.message);
        GetProfileAndSetInSessionStorage();
    }
    else {
        LoaderHide();
        ShowError(res.response.message);
    }
}

//#endregion

//#endregion

setInterval(function () {
    regisrationGame();
}, 2000)


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
                resSelectUser.Pragmatic === false
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
                    firstname: resUserData.data.name,
                    lastname: "Webet333"
                };
                try {
                    await PostMethod(GameRegisterEndPoints.registerMaxBet, userMaxBet);
                }
                catch (e) {
                }
            }

            if (resSelectUser.M8 !== true) {
                try {
                    let modelM8 = {
                    };
                    await PostMethod(GameRegisterEndPoints.registerM8, modelM8);
                }
                catch (ex) {
                }
            }

            if (resSelectUser.AG !== true) {
                try {
                    let modelAG = {
                    };
                    await PostMethod(GameRegisterEndPoints.registerAG, modelAG);
                }
                catch (ex) {
                }
            }

            if (resSelectUser.Playtech !== true) {
                try {
                    let modelPlaytech = {
                    };
                    await PostMethod(GameRegisterEndPoints.registerPlaytech, modelPlaytech);
                }
                catch (ex) {
                }
            }

            if (resSelectUser._918Kiss !== true) {
                try {
                    let model918Kiss = {
                    };
                    await PostMethod(GameRegisterEndPoints.register918Kiss, model918Kiss);
                }
                catch (ex) {
                }
            }

            if (resSelectUser.Joker !== true) {
                try {
                    let modelJoker = {
                    };
                    await PostMethod(GameRegisterEndPoints.registerJoker, modelJoker);

                }
                catch (ex) {
                }
            }

            if (resSelectUser.Mega888 !== true) {
                var userMegaa88Model = {
                }
                try {
                    await PostMethod(GameRegisterEndPoints.mega888Register, userMegaa88Model);
                }
                catch {
                }
            }

            if (resSelectUser.DG !== true) {
                var model = {
                }
                try {
                    await PostMethod(GameRegisterEndPoints.dgRegister, model);
                }
                catch {
                }
            }

            if (resSelectUser.SexyBaccarat !== true) {
                var model = {
                }
                try {
                    await PostMethod(GameRegisterEndPoints.sexyRegister, model);
                }
                catch {
                }
            }

            if (resSelectUser.SA !== true) {
                var model = {
                }
                try {
                    await PostMethod(GameRegisterEndPoints.saRegister, model);
                }
                catch {
                }
            }

            if (resSelectUser.Pussy888 !== true) {
                var model = {
                }
                try {
                    await PostMethod(GameRegisterEndPoints.pussyRegister, model);
                }
                catch {
                }
            }

            if (resSelectUser.AllBet !== true) {
                var model = {
                }
                try {
                    await PostMethod(GameRegisterEndPoints.allBetRegister, model);
                }
                catch {
                }
            }

            if (resSelectUser.WM !== true) {
                var model = {
                }
                try {
                    await PostMethod(GameRegisterEndPoints.WMRegister, model);
                }
                catch {
                }
            }

            if (resSelectUser.Pragmatic !== true) {
                var model = {
                }
                try {
                    await PostMethod(GameRegisterEndPoints.pragmaticRegister, model);
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