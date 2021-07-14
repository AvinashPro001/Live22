//#region Onload
$(document).ready(function () {
    if (GetLocalStorage('currentUser') === null) {
        document.getElementById("urlSportbookHome").title = ChangeErroMessage("user_not_login_error");
        $("#urlSportbookHome").prop('onclick', null).off('click');
        $("#urlSportbookHome").removeAttr("href");
        document.getElementById("AGGame").title = ChangeErroMessage("user_not_login_error");
        document.getElementById("PTGame").title = ChangeErroMessage("user_not_login_error");
        document.getElementById("PTGameSlot").title = ChangeErroMessage("user_not_login_error");
        document.getElementById("918Game").title = ChangeErroMessage("user_not_login_error");
        document.getElementById("JokerGame").title = ChangeErroMessage("user_not_login_error");
        document.getElementById("MaxBetGame").title = ChangeErroMessage("user_not_login_error");
        document.getElementById("AGSlotGame").title = ChangeErroMessage("user_not_login_error");
        document.getElementById("Mega888Game").title = ChangeErroMessage("user_not_login_error");
        document.getElementById("DGGame").title = ChangeErroMessage("user_not_login_error");
        document.getElementById("SAGame").title = ChangeErroMessage("user_not_login_error");
        document.getElementById("pussy888").title = ChangeErroMessage("user_not_login_error");
        document.getElementById("AllbetGame").title = ChangeErroMessage("user_not_login_error");
        document.getElementById("WMGame").title = ChangeErroMessage("user_not_login_error");
        document.getElementById("YeeBetGame").title = ChangeErroMessage("user_not_login_error");
        document.getElementById("SBOGame").title = ChangeErroMessage("user_not_login_error");
    }
});
//#endregion

async function M8Login(usernamePrifix) {
    LoaderShow();
    var languageCode = (GetLocalStorage('language') === "zh-Hans" ? "ZH-CN" : "EN-US");

    var resultM8Login = await callMe(M8ConstAction.loginAction + "&" + M8ConstParameter.secret + "&" + M8ConstParameter.agent + "&" + "username=" + usernamePrifix + "&host=sport.mywinday.com&lang=" + languageCode + "&accType=DEC,IN,CN,US,ML,HK&ref=https://webet333.com");

    if (resultM8Login.response.errcode !== "0") {
        ShowError(resultM8Login.response.errtext);
    } else {
        localStorage.setItem('M8Url', resultM8Login.response.result.login.weburlsecure['#cdata-section']);
        localStorage.setItem('M8UrlMobile', resultM8Login.response.result.login.mobiurlsecure['#cdata-section']);
    }

    window.location.href = GetLocalStorage('M8Url');

    //if (screen.width > 786) {
    //    document.getElementById("mainpagebody").style.display = "none";
    //    document.getElementById("iframeModel").style.display = "block";
    //    document.getElementById("gameFrame").src = GetLocalStorage('M8Url');
    //}
    //else {
    //    cument.getElementById("mainpagebody").style.display = "none";
    //    document.getElementById("iframeModel").style.display = "block";
    //    document.getElementById("gameFrame").src = GetLocalStorage('M8Url');
    //}

    LoaderHide();
}