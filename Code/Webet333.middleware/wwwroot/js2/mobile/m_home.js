//#region Onload
$(document).ready(function () {
    getReference();
    if (GetLocalStorage('currentUser') !== null) {
        CheckUserVerified();
        GetUser();
        if (localStorage.getItem('IsExecute') == "true" || localStorage.getItem('IsExecute') == true || localStorage.getItem('IsExecute') == null) {
            localStorage.setItem('IsExecute', false);
        }
        VIPBanner();
    }

    //if (window.location.href.toLowerCase().includes("?p=home")) {
    //    SliderPromotion();
    //}

    navaigateRegister();
    load_em();

    if (GetLocalStorage('language') === null) SetLocalStorage('language', 'en-US');
    //getLanguage();
    announcement();
});
//#endregion

async function VIPBanner() {
    var resUserVIPlevel = await GetMethodWithReturn(apiEndPoints.UserVipDetails);
    sessionStorage.setItem("UserVipDetails", enc(JSON.stringify(resUserVIPlevel)))
    try {
        document.getElementById("viplevel_icon").src = resUserVIPlevel.data.VIPBanner;
    }
    catch (e) { }
}

function CheckUserVerified() {
    try {
        var resUserData = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
        if (resUserData.data.mobilenoConfirmed == false) {
            var url = window.location.href.toLowerCase();
            if (!url.includes("?p=verifiedotp"))
                loadPageVerifiedOtp();
        }
    }
    catch (e) { }
}

var isPromotionExecute = false;

async function SliderPromotion() {
    var url = window.location.href.toLowerCase();
    if (url.includes("?p=home")) {
        if (!isPromotionExecute) {
            isPromotionExecute = true;
            var resPanel = await GetMethod(apiEndPoints.homepageBannerList);
            if (resPanel !== null && resPanel !== undefined) {
                var panelData = resPanel.data;
                var panel;
                if (GetLocalStorage('currentUser') !== null)
                    panel = document.getElementById('mobilePromotionSliderLogin');
                else
                    panel = document.getElementById('mobilePromotionSlider');

                if (panel !== null) {
                    panel.innerHTML = "";

                    for (i = 0; i < panelData.length; i++) {
                        panel.innerHTML +=
                            '<div class="promotion-slide-hero-banner" ><a href="#"> <img src="' + panelData[i].bannerMobile + '" class="full-img"></a></div>'
                    }

                    if (GetLocalStorage('currentUser') !== null)
                        document.getElementById("mobilePromotionSliderLogin").className = "login-top-slider";
                    else
                        document.getElementById("mobilePromotionSlider").className = "login-top-slider";
                    slider();
                }
            }
            else {
                isPromotionExecute = false;
                SliderPromotion();
            }
            isPromotionExecute = false;
        }
    }
}

function slider() {
    $('.login-top-slider').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        arrows: false,
        infinite: true,
        speed: 1000,
        fade: true,
        slide: 'div',
        cssEase: 'linear'
    });
}

function ChangeErroMessage(key, parameter = "") {
    var ErrorMessage = "";
    $.ajax({
        url: '../../resources/strings.' + GetLocalStorage('language') + '.json',
        dataType: 'json',
        async: false,
        success: function (lang) {
            ErrorMessage = lang[key] + parameter;
        }
    });
    return ErrorMessage;
}

async function MobileDesktopReferenceInsert(url) {
    if (url.href.toLowerCase() === webUrl) {
        var referenceKeywordModelDesktopElse = {
            keyword: 'DESKTOP'
        };
        await PostMethodWithParameter(apiEndPoints.socialMediaReference, referenceKeywordModelDesktopElse);
    }

    if (url.href.toLowerCase() === mobUrl) {
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
        get();
    }
}

//#region DetectMobileBrowser
function DetectMobileBrowser() {
    if (window.innerWidth <= 1000 && window.innerHeight <= 1691 && (window.location.href === webUrl || window.location.href === webUrl || window.location.href === webUrl || window.location.href === webUrl)) {
        window.location = mobUrl;
    }
}
//#endregion

//#region GetLanguage
function SetDefaultLanguage(ddlLanguages) {
    SetLocalStorage('language', ddlLanguages.value);
    getLanguage();
    window.location.reload();
}

function getLanguage(IsLanguageExecute = true) {
    //document.getElementById("flag").attributes.src=
    (GetLocalStorage('language') === null) ? SetLocalStorage('language', 'en-US') : false;
    (GetLocalStorage('currentUser') === null) ? $('#afterlogin').css('display', 'none') : $('#beforelogin').css('display', 'none');
    (GetLocalStorage('currentUser') === null) ? $('#afterloginbank').css('display', 'none') : $('#beforeloginbank').css('display', 'none');
    (GetLocalStorage('currentUser') === null) ? $('#afterloginbankfooter').css('display', 'none') : $('#beforeloginbankfooter').css('display', 'none');
    navaigateRegister();

    if (IsLanguageExecute) {
        document.getElementById("englishbtn").style.background = "";
        document.getElementById("malaybtn").style.background = "";
        document.getElementById("chinesebtn").style.background = "";
        if (GetLocalStorage('language') == "en-US")
            document.getElementById("englishbtn").style.background = "orange";

        if (GetLocalStorage('language') == "ms-MY")
            document.getElementById("malaybtn").style.background = "orange";

        if (GetLocalStorage('language') == "zh-Hans")
            document.getElementById("chinesebtn").style.background = "orange";
    }

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

//#region GetUser
async function GetUser() {
    var data = JSON.parse(dec(sessionStorage.getItem('UserDetails')));
    var gameprefixdata = JSON.parse(dec(sessionStorage.getItem('GamePreFix')));
    if (data != null && gameprefixdata != null) {
        try {
            document.getElementById("lbl_fullName").innerText = data.data.name;
            document.getElementById("lbl_userName").innerText = data.data.username;
            document.getElementById("txt_mobileUpdate").value = data.data.mobileNo;
        }
        catch (e) { }
        PlaytechBrokenStatus();
        PragmaticBrokenStatus();
    }
    else {
        var res = await GetMethod(apiEndPoints.getProfile);
        var gamePrefix = await GetMethodWithReturn(apiEndPoints.globalParameter);
        sessionStorage.setItem('UserDetails', enc(JSON.stringify(res)));
        sessionStorage.setItem('GamePreFix', enc(JSON.stringify(gamePrefix)));
        getDetails();
        PlaytechBrokenStatus();
        PragmaticBrokenStatus();
        try {
            document.getElementById("lbl_fullName").innerText = res.data.name;
            document.getElementById("lbl_userName").innerText = res.data.username;
            document.getElementById("txt_mobileUpdate").value = res.data.mobileNo;
        }
        catch (e) { }
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

    $("#m_txt_username").val(u);
    $("#m_txt_password").val(p);
    if (u !== null) {
        $("#m_rember_me" + name).prop('checked', true);
    }
    else {
        $("#m_rember_me" + name).prop("checked", false);
    }
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

//#region promotionList
async function promotionList() {
    var x = screen.width
    var model = {
        ismobile: true,
        ismain: false
    };

    var resPanel = await PostMethod(apiEndPoints.promotionsList, model);
    if (resPanel !== null && resPanel !== undefined) {
        var panelData = resPanel.data;
        var panel = document.getElementById('accordion');
        var description = document.getElementById('promotion-description');
        var height = "180px";
        if (x < 600)
            height = "150px";
        for (i = 0; i < panelData.length; i++) {
            description.innerHTML += '<div class="promotion-details-full-page" id="' + panelData[i].id + '"><div class="container promo-inner"> <div class="info-form text-center"><div class="row" ><div class="col-xs-2"><div class="back-btn"><a onclick="myFunction(\'' + panelData[i].id + '\')" rel="prefetch"><img  class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt=""></a></div></div><div class="col-xs-8"><figure><a onclick="loadPageHome({backFrom:\'promotion\'})"><img class="logo" src="../images/mobile/webet-main-logo.png" alt="WEBET 333.com"></a></figure></div></div></div></div><div class="promotion-details-header" style="background-color: #232323;color: white;text-align: center;"><span class="lang promotion-details-name ">' + panelData[i].title + '</span></div><div class="promotion-margin-top" style="padding-bottom:100px;">' + panelData[i].description + '<div class="padding-Promotion-bottom"></div></div></div>';
        }

        for (i = 0; i < panelData.length; i++) {
            //panel.innerHTML += '<div class="promotion-bg" style="background-image: url(' + panelData[i].banner + ');" onclick="OpenFunction(\'' + panelData[i].id + '\')" ><a href="#"></a></div>'
            panel.innerHTML += '<div class="promotion-hero-banner" onclick="OpenFunction(\'' + panelData[i].id + '\')" ><a href="#"> <img src="' + panelData[i].banner + '" class="full-img"></a></div>'
        }
    }
}

//#endregion