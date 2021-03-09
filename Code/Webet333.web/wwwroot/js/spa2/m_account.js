
$(document).ready(async function () {
    var url_string = window.location;
    var url = new URL(url_string);
    var name = url.searchParams.get("ref");
    if (name !== null) {
        setCookie("ref", name, 1000);
    }
    else {
        setCookie("ref", null, 1000);
    }
    //if (localStorage.getItem('currentUser') != null)
    //    await regisrationGame();
});


//#region DoLogin
async function DoLogin() {
    LoaderShow();

    let model = {
        userName: $('#m_txt_username').val(),
        password: $("#m_txt_password").val(),
        grantType: 'User'
    };
    let res = await PostMethod(apiEndPoints.login, model);
    if (res !== null && res !== undefined) {

        try {
            await TrackingLoginRegister("Login", model.userName, "loginCookies");
        }
        catch (e) { }

        localStorage.setItem('currentUser', res.data.access_token);
        localStorage.setItem('bank', res.data.totalBankAccount);

        localStorage.setItem('currentUserData', enc($("#m_txt_password").val()));

        try {
            var resUserDataMobile = await GetMethod(apiEndPoints.getProfile);
            if (resUserDataMobile.data.mobilenoConfirmed)
                loadPageHome({ backFrom:'login'});
            else
                loadPageVerifiedOtp();

            sessionStorage.setItem('UserDetails', enc(JSON.stringify(resUserDataMobile)));
            localStorage.setItem('currentUserName', resUserDataMobile.data.username);

            remember_me();
        }
        catch(e) {
            location.reload()
        }
       
    }
    LoaderHide();
}
//#endregion

//#region Tranking Loing Registe
async function TrackingLoginRegister(process, username, cookiesName) {
    if (getCookie(cookiesName) == "" || getCookie(cookiesName) == null) {
        var FirstArray = [];
        FirstArray.push(username.toUpperCase())
        setCookie(cookiesName, FirstArray, 1000);
    }
    var usernameList = [];
    usernameList.push(getCookie(cookiesName));
    var result = getCookie(cookiesName);
    if (result.indexOf(username.toUpperCase()) == -1) {
        usernameList.push(username.toUpperCase());
        setCookie(cookiesName, usernameList, 1000);
    }

    result = getCookie(cookiesName);
    var data = result.split(",");
    if (data.length > 1) {
        let model = {
            usernames: result,
            process: process
        }
        let res = await PostMethod(apiEndPoints.LoginRegisterTracking, model);
    }
}
//#endregion Tranking Loing Registe

//#region Login On Enter Press
function DoLoginOnEnter() {
    if (event.keyCode === 13) DoLogin();
}
//#endregion Login On Enter Press

//#region DoForgotPassword
async function DoForgotPassword() {
    LoaderShow();
    var mobile = $('#m_txt_mobile').val();
    if (mobile === null || mobile === undefined || mobile === "") {
        LoaderHide();
        return ShowError(ChangeErroMessage("mobile_no_required_error"));
    }
    let model = {
        mobileNumber: mobile
    };
    var res = await PostMethod(apiEndPoints.getUserByMobile, model);
    ShowSuccess(res.message);
    LoaderHide();
}
//#endregion

//#region UpdateProfile
async function UpdateProfile(userName918, password918, newpassword918) {
    LoaderShow();
    var model;
    if (userName918 !== null && userName918 !== undefined) {
        model = {
            username918: userName918,
            password918: password918
        };
    }
    else if (newpassword918 !== null && newpassword918 !== undefined) {
        model = {
            password918: newpassword918
        };
    }
    else {
        if (document.getElementById("chk_login_password").value == "") {
            LoaderHide();
            document.getElementById("chk_login_password").value = "";
            return ShowError(ChangeErroMessage("password_required_error"));
        }

        if (document.getElementById("chk_login_password").value != dec(GetLocalStorage("currentUserData"))) {
            LoaderHide();
            document.getElementById("chk_login_password").value = "";
            return ShowError(ChangeErroMessage("pass_not_match_error"));
        }

        model = {
            mobile: $('#txt_mobileUpdate').val()
        };
        if (model.mobile.length < 10) {
            LoaderHide();
            document.getElementById("chk_login_password").value = "";
            return ShowError(ChangeErroMessage("mobile_length_error"));
        }
        if (model.mobile === "") {
            LoaderHide();
            document.getElementById("chk_login_password").value = "";
            return ShowError(ChangeErroMessage("mobile_no_required_error"));
        }
    }

    var res = await PostMethod(apiEndPoints.updateProfile, model);
    if (res !== null && res !== undefined) {
        ShowSuccess(res.message);
        if (model.mobile != null && model.mobile != "" && model.mobile != undefined) {
            document.getElementById("txt_mobileUpdate").value = model.mobile;
            document.getElementById("chk_login_password").value = "";
        }
    }
    LoaderHide();
}
//#endregion

//#region ChangePassword
async function ChangePassword(i) {

    LoaderShow();
    if (i === 1) {
        

        //var randomPasswordString = randomPassword();
        //var res918 = await _918KissPostMethod('account.ashx?' + _918KissActionConst.UpdatePassword + '&' + 'userName=' + res.data.username918 + '&' + 'OldPassWd=' + res.data.password918 + '&' + 'PassWd=' + randomPasswordString + '&' + 'Name=' + res.data.username + '&' + 'time=' + UTCTime + '&' + _918KissConstParameter.authcode + '&' + 'sign=' + generateHasValue(res.data.username918) + '&' + _918KissConstParameter.pwdtype);

        //if (res918.success === true) {
        //    UpdateProfile(null, null, randomPasswordString);
        //    document.getElementById('_918resetpasswordDownload').innerText = randomPasswordString;
        //}
        //else {
        //    window.alert(res918.msg);
        //}
        
        let resdata = await GetMethod(apiEndPoints.Change918PassWordReset, model);
        var res = await GetMethod(apiEndPoints.getProfile);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
        document.getElementById('_918resetpasswordDownload').innerText = resdata.data.newPassword;
    }
    else {
        var model = {
            currentPassword: $('#txt_currentPassword').val(),
            password: $("#txt_newPassword").val(),
            confirmPassword: $("#txt_confirmPassword").val()
        };

        if (model.password.length < 6) {
            LoaderHide();
            return ShowError(ChangeErroMessage("pass_length_error"));
        }

        if (model.password === "") {
            LoaderHide();
            return ShowError(ChangeErroMessage("password_required_error"));
        }
        if (model.confirmPassword === "") {
            LoaderHide();
            return ShowError(ChangeErroMessage("confirm_password_required_error"));
        }

        if (localStorage.getItem("currentUserName") === model.password) {
            LoaderHide();
            return ShowError(ChangeErroMessage("username_pass_diff_error"));
        }

        var Char = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
        if (!Char.test(model.password)) {
            LoaderHide();
            return ShowError(ChangeErroMessage("pass_alpha_error"));
        }

        let res = await PostMethod(apiEndPoints.changePassword, model);
        if (res !== null && res !== undefined) {
            ShowSuccess(res.message);
            localStorage.setItem('currentUserData', enc(model.password));
            logoutMain(1);
        }
        reset(4);
    }
    LoaderHide();
}
//#endregion

//#region randomPassword
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
//#endregion randomPassword

//#region DoResetPassword
async function DoResetPassword() {
    LoaderShow();
    var token = $('#txt_reset_token').val();
    if (token === null || token === undefined)
        ShowError("Token is required.");
    var password = $('#txt_reset_password').val();
    if (password === null || password === undefined)
        ShowError("Password is required.");
    var confirmPassword = $('#txt_reset_confirm_password').val();
    if (confirmPassword === null || confirmPassword === undefined)
        ShowError("Token is required.");
    var model = {
        token: token,
        password: password,
        confirmPassword: confirmPassword
    };
    let res = await PostMethodWithoutToken(apiEndPoints.resetPassword, model);
    if (res !== null && res !== undefined) {
        ShowSuccess(res.message);
    }
    LoaderHide();
}

async function resetPasswordData() {
    LoaderShow();
    var token = $('#txt_reset_token').val();
    var model = {
        token: token
    };
    let res = await PostMethodWithoutToken(apiEndPoints.resetPasswordData, model); {
        if (res !== null && res !== undefined) {
            document.getElementById("txt_username").value = res.data.username;
            document.getElementById("txt_name").value = res.data.name;
            document.getElementById("txt_email").value = res.data.email;
            document.getElementById("txt_mobile").value = res.data.mobileNo;
        }
    }
    LoaderHide();
}
//#endregion

//#region DoRegister
async function DoRegister() {
    LoaderShow();
    var model = {
        name: $('#m_regsiter_name').val(),
        mobile: $('#m_regsiter_mobile').val(),
        username: $('#m_regsiter_username').val(),
        password: $("#m_regsiter_password").val(),
        confirmPassword: $("#m_regsiter_confirmpassword").val(),
        referenceKeyword: getCookie("ref")
    };

    if (model.mobile === "") {
        LoaderHide();
        return ShowError("Mobile Filed is required.");
    }
    if (model.mobile.length < 10) {
        LoaderHide();
        return ShowError(ChangeErroMessage("mobile_length_error"));
    }
    if (model.username === "") {
        LoaderHide();
        return ShowError("Username Filed is required.");
    }

    if (model.password.length < 6) {
        LoaderHide();
        return ShowError(ChangeErroMessage("pass_length_error"));
    }

    if (model.username.length < 7) {
        LoaderHide();
        return ShowError("Username Length too short.");
    }
    if (model.password === "") {
        LoaderHide();
        return ShowError("Password Filed is required.");
    }
    if (model.confirmPassword === "") {
        LoaderHide();
        return ShowError("Confirm Password Filed is required.");
    }
    if (model.name === "") {
        LoaderHide();
        return ShowError("Name Filed is required.");
    }

    if (model.username === model.password) {
        LoaderHide();
        return ShowError("Password and username must be different.");
    }

    var Char = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
    if (!Char.test(model.password)) {
        LoaderHide();
        return ShowError("Password must be alphanumeric.");
    }

    if (model.mobile !== "" && model.username !== "" && model.name !== "" && model.password !== "" && model.confirmPassword !== "" && model.username.length > 6) {
        //WEBET333 Account Create
        var res = await PostMethodRegister(apiEndPoints.register, model);
        if (res !== null && res !== undefined) {
            try {
                if ((res.data.messageResponse.statusCode.split(",").length - 1) == 0)
                    ShowError(res.data.messageResponse.smsMessage);
            }
            catch(e) {

            }
            let model = {
                userName: $('#m_regsiter_username').val(),
                password: $("#m_regsiter_password").val(),
                grantType: 'User'
            };
            let res = await PostMethod(apiEndPoints.login, model);
            if (res !== null && res !== undefined) {
                localStorage.setItem('currentUser', res.data.access_token);
                try {
                    await TrackingLoginRegister("Register", model.userName, "registerCookies");
                } catch (e) {}
                localStorage.setItem('currentUserName', model.userName);
                localStorage.setItem('currentUserData', enc(model.password));
                loadPageVerifiedOtp();
            }
        }
        LoaderHide();
    }
}
//#endregion

//#region checkPasswordMatch
function checkPasswordMatch() {
    var password = $("#m_regsiter_password").val();
    var confirmPassword = $("#m_regsiter_confirmpassword").val();
    if (password !== confirmPassword)
        $("#divCheckPasswordMatch").html(ChangeErroMessage("pass_not_match_error"));
    else
        $("#divCheckPasswordMatch").html("");
}
//#endregion

//#region logout
async function logoutMain(i) {
    LoaderShow();
    var language = GetLocalStorage('language');

    //Get Username
    try {
        if (i === 1) {
            getLanguage();
            localStorage.clear();
            loadPageHome({ backFrom: 'login' });
        } else {
            getLanguage();
            localStorage.clear();
            //window.location = '/';
            loadPageHome({ backFrom: 'login' });
        }
        var res = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
        var globalParameters = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));
        var username = res.data.username;
        var JokerUsername = globalParameters.data.jokerGamePrefix + username;
        var M8Username = globalParameters.data.m8GamePrefix + username;
        var PlaytechUsername = globalParameters.data.playtechGamePrefix + username;


        //M8 Account Logout
        await callMe(M8ConstAction.logoutAction + "&" + M8ConstParameter.secret + "&" + M8ConstParameter.agent + "&" + "username=" + M8Username);

        //Playtech Account Logout;
        var userNameUpperCase = PlaytechUsername.toUpperCase();
        await PlaytechPostMethod(PlaytechConstAction.Logout + "playername=" + userNameUpperCase);

        //Joker Account Logout
        var perameter = 'Method=' + jokerMethodConst.Signout + '&Timestamp=' + timestamp + '&Username=' + JokerUsername;
        await JokerPostMethod('?' + jokerConstParameter.AppID + '&Signature=' + generateSignature(jokerMethodConst.Signout, JokerUsername), perameter);

        sessionStorage.clear();
        SetLocalStorage('language', language);
      
        LoaderHide();
    }
    catch(e){
        sessionStorage.clear();
        localStorage.clear();
        SetLocalStorage('language', language);
        if (i === 1) {
            getLanguage();
            loadPageHome({ backFrom: 'login' });
        } else {
            getLanguage();
            //window.location = '/';
            loadPageHome({ backFrom: 'login' });
        }
        LoaderHide();

    }
}
//#endregion

//#region remember_me
function remember_me() {
    var x = document.getElementById("m_rember_me").checked;
    if (x === true) {
        var u = $("#m_txt_username").val();
        var p = $("#m_txt_password").val();
        var d = new Date();
        setCookie("un", u, 30);
        setCookie("ps", p, 30);
    } else {
        deleteCookie('un');
        deleteCookie('ps');
    }
}
//#endregion

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

//#region RegistrationGame
async function regisrationGame() {
    try {
        if (localStorage.getItem('IsExecute') == "false" || localStorage.getItem('IsExecute') == false || localStorage.getItem('IsExecute') == null) {
            localStorage.setItem('IsExecute', true);

            var resUserData = JSON.parse(dec(sessionStorage.getItem('UserDetails')));

            let userModel = {
                id: resUserData.data.id
            };
            let resSelectUser = JSON.parse(dec(sessionStorage.getItem('UserRegisterDetails')));
            if (
                resSelectUser === null ||
                resSelectUser.data.MaxBet === false ||
                resSelectUser.data.M8 === false ||
                resSelectUser.data.Playtech === false ||
                resSelectUser.data.AG === false ||
                resSelectUser.data._918Kiss === false ||
                resSelectUser.data.Joker === false ||
                resSelectUser.data.Mega888 === false ||
                resSelectUser.data.DG === false ||
                resSelectUser.data.SexyBaccarat === false ||
                resSelectUser.data.SA === false ||
                resSelectUser.data.Pussy888 === false ||
                resSelectUser.data.AllBet === false ||
                resSelectUser.data.WM === false ||
                resSelectUser.data.Pragmatic === false
            ) {
                resSelectUser = await PostMethod(apiEndPoints.selectUser, userModel);
                sessionStorage.setItem('UserRegisterDetails', enc(JSON.stringify(resSelectUser)));
            }
            let globalParameters = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));
            var username = resUserData.data.username


            var JokerUsername = globalParameters.data.jokerGamePrefix + username;
            var M8Username = globalParameters.data.m8GamePrefix + username;
            var PlaytechUsername = globalParameters.data.playtechGamePrefix + username;

            if (resSelectUser.data.MaxBet !== true) {
                var userMaxBet = {
                    firstname: resUserData.data.name,
                    lastname: "Webet333"
                };
                try {
                    await PostMethodWithParameter(apiEndPoints.registerMaxBet, userMaxBet);
                }
                catch (e) {
                }
            }

            if (resSelectUser.data.M8 !== true) {
                try {
                    var resultM8 = await callMe(M8ConstAction.createAction + "&" + M8ConstParameter.secret + "&" + M8ConstParameter.agent + "&" + "username=" + M8Username);
                    if (resultM8.response.errcode == "0") {
                        let modelM8 = {
                            userId: resUserData.data.id,
                            M8UserName: M8Username,
                            apiResponse: resultM8.response
                        };

                        var resM8 = await PostMethod(apiEndPoints.registerM8, modelM8);
                        var resultM8LoginRegister = await callMe(M8ConstAction.loginAction + "&" + M8ConstParameter.secret + "&" + M8ConstParameter.agent + "&" + "username=" + M8Username + "&host=sport.mywinday.com&lang=EN-US&accType=HK&ref=https://webet333.com");

                        if (resultM8LoginRegister.response.errcode !== '0') {
                            return ShowError(resultM8LoginRegister.response.errtext);
                        } else {
                            localStorage.setItem('M8Url', resultM8LoginRegister.response.result.login.weburlsecure['#cdata-section']);
                            localStorage.setItem('M8UrlMobile', resultM8LoginRegister.response.result.login.mobiurlsecure['#cdata-section']);
                        }
                    }
                }
                catch (ex) {

                }
            }

            if (resSelectUser.data.AG === false) {
                try {
                    let modelAG = {
                    };
                    var resAG = await PostMethod(apiEndPoints.registerAG, modelAG);
                }
                catch (ex) {

                }
            }

            if (resSelectUser.data.Playtech !== true) {
                try {
                    var resultPlaytechDeposit = await PlaytechPostMethod(PlaytechConstAction.CreateAccount + "playername=" + PlaytechUsername + "&" + PlaytechConstParameter.adminname + "&" + PlaytechConstParameter.kioskname + "&firstname=" + resUserData.data.name + "&firstname=Webet333" + "&countrycode=MY" + "&viplevel=1" + "&languagecode=EN" + "&" + "password=" + dec(GetLocalStorage("currentUserData")));


                    if (typeof resultPlaytechDeposit === "string") {
                        try {
                            JSON.parse(resultPlaytechDeposit);
                        } catch (e) {
                            var jObject = {
                                data: resultPlaytechDeposit
                            };
                        }
                    }
                    else {
                        let modelPlaytech = {
                            userId: resUserData.data.id,
                            PlaytechUserName: PlaytechUsername,
                            apiResponse: resultPlaytechDeposit
                        };
                        var resPlaytech1 = await PostMethod(apiEndPoints.registerPlaytech, modelPlaytech);
                    }
                }
                catch (ex) {

                }
            }

            if (resSelectUser.data._918Kiss !== true) {
                try {
                    var randamUserName = await generateRandomUserName();

                    var randomPasswordString = randomPassword();

                    var password = "Wb3@" + dec(GetLocalStorage("currentUserData"));

                    if (password.length > 14)
                        password = password.substring(0, 14)

                    var result981Kiss = await _918KissPostMethod("account.ashx?" + _918KissActionConst.AddUser + "&" + _918KissConstParameter.agent + "&" + "userName=" + randamUserName + "&" + "PassWd=" + password.substring(0, 14) + "&" + "Name=" + resUserData.data.name + "&" + "Tel=" + resUserData.data.mobileNo + "&" + "Memo=" + null + "&" + "UserType=" + _918KissUserType.realplayer + "&" + "UserAreaId=" + _918KissUserAreaId.Malaysia + "&" + "time=" + UTCTime + "&" + _918KissConstParameter.authcode + "&" + "sign=" + generateHasValue(randamUserName) + "&" + _918KissConstParameter.pwdtype);
                    if (result981Kiss.code == 0) {
                        var modelUpdateProfile = {
                            username918: randamUserName,
                            password918: password
                        };
                        var updateProfile = await PostMethod(apiEndPoints.updateProfile, modelUpdateProfile);
                        let model918Kiss = {
                            userId: resUserData.data.id,
                            _918KissUserName: randamUserName,
                            apiResponse: result981Kiss
                        };
                        var res918Kiss = await PostMethod(apiEndPoints.register918Kiss, model918Kiss);
                    }
                }
                catch (ex) {

                }
            }

            if (resSelectUser.data.Joker !== true) {
                try {
                    var perameter = 'Method=' + jokerMethodConst.EnsureUserAccount + '&Timestamp=' + timestamp + '&Username=' + JokerUsername;
                    var resultJoker = await JokerPostMethod('?' + jokerConstParameter.AppID + '&Signature=' + generateSignature(jokerMethodConst.EnsureUserAccount, JokerUsername, null, null), perameter);

                    var jokerSetPasswordperameter = 'Method=' + jokerMethodConst.SetPassword + '&' + 'Password=' + dec(GetLocalStorage('currentUserData')) + '&' + 'Timestamp=' + timestamp + '&' + 'Username=' + JokerUsername;
                    var resultJokerSetPassword = await JokerPostMethod('?' + jokerConstParameter.AppID + '&' + 'Signature=' + generateSignature(jokerMethodConst.SetPassword, JokerUsername, dec(GetLocalStorage('currentUserData'))), jokerSetPasswordperameter);
                    if (resultJoker.Status == "OK" || resultJoker.Status == "Created") {
                        let modelJoker = {
                            userId: resUserData.data.id,
                            JokerUserName: JokerUsername,
                            apiResponse: resultJoker
                        };
                        var resJoker = await PostMethod(apiEndPoints.registerJoker, modelJoker);
                    }
                }
                catch (ex) {

                }
            }

            if (resSelectUser.data.Mega888 !== true) {
                var userMegaa88Model = {

                }
                try {
                    var res = await PostMethodWithParameter(apiEndPoints.mega888Register, userMegaa88Model);
                }
                catch(e){

                }
            }

            if (resSelectUser.data.DG !== true) {
                var model = {

                }
                try {
                    var res = await PostMethodWithParameter(apiEndPoints.dgRegister, model);
                }
                catch (e){

                }
            }

            if (resSelectUser.data.SexyBaccarat !== true) {
                var model = {

                }
                try {
                    var res = await PostMethodWithParameter(apiEndPoints.sexyRegister, model);
                }
                catch (e){

                }
            }

            if (resSelectUser.data.SA !== true) {
                var model = {

                }
                try {
                    var res = await PostMethodWithParameter(apiEndPoints.saRegister, model);
                }
                catch (e){

                }
            }

            if (resSelectUser.data.Pussy888 !== true) {
                var model = {

                }
                try {
                    var res = await PostMethodWithParameter(apiEndPoints.pussyRegister, model);
                }
                catch (e){

                }
            }

            if (resSelectUser.data.AllBet !== true) {
                var model = {

                }
                try {
                    var res = await PostMethodWithParameter(apiEndPoints.allBetRegister, model);
                }
                catch (e){

                }
            }

            if (resSelectUser.data.WM !== true) {
                var model = {

                }
                try {
                    var res = await PostMethodWithParameter(apiEndPoints.WMRegister, model);
                }
                catch (e){

                }
            }

            if (resSelectUser.data.Pragmatic !== true) {
                var model = {

                }
                try {
                    var res = await PostMethodWithParameter(apiEndPoints.pragmaticRegister, model);
                }
                catch (e){

                }
            }

            localStorage.setItem('IsExecute', false);
        }
    }
    catch (e){

    }
}
//#endregion RegistrationGame