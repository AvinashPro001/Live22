//#region Declare SiteData Variable

let SiteData = {
    PromotionPageData: null,
    AnnouncementsData: null,
    AdminBankPageData: null,
    DownloadPageData: null,
    AllBankPageData: null,
    WalletData: null,
    HomeBannerData: null
}

//#endregion

//#region OnLoad Function
SetLanguage();
$(window).on('load', function () {
    if (GetSessionStorage("siteData") == null) SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)));
    ChangeLanguageText();
    if (localStorage.getItem('IsExecute') == "true" || localStorage.getItem('IsExecute') == true || localStorage.getItem('IsExecute') == null) localStorage.setItem('IsExecute', false);
    SetLocalStorage("IsSedularExecute", false);
    SetSiteDataVariable()
    SetLastUpdateTime();
    AllPromotionCallAPI();
    HomeBannerCallAPI();
    GetWalletList();
    CheckGameMaintenance();
    SignalRConnect();
    SetRefKeyword();
});

//#endregion

//#region Non "ASYNC" Function Section

//#region Show Error

function ShowError(Message) {
    SetAllValueInElement("error_message", Message);
    $('#error_choose').modal('show');
    setTimeout(function () {
        $('#error_choose').modal('hide');
    }, 5000);
}
//#endregion

//#region Show Success

function ShowSuccess(Message) {
    SetAllValueInElement("success_message", Message);
    $('#success_choose').modal('show');
    setTimeout(function () {
        $('#success_choose').modal('hide');
    }, 5000);
}

//#endregion

//#region Loader Show

function LoaderShow() {
    $(".loadingImage").show();
}

//#endregion

//#region Loader Hide

function LoaderHide() {
    $(".loadingImage").hide();
}

//#endregion

//#region Change Error Message

function ChangeErroMessage(key, parameter = "") {
    var ErrorMessage = "";
    $.ajax({
        url: '../../resources/error-and-message.' + GetLocalStorage('language') + '.json',
        dataType: 'json',
        async: false,
        success: function (lang) {
            ErrorMessage = lang[key] + parameter;
        }
    });
    return ErrorMessage;
}

//#endregion

//#region Change  Message

function ChangeMessageText(key, parameter = "") {
    var Message = "";
    $.ajax({
        url: '../../resources/lang.' + GetLocalStorage('language') + '.json',
        dataType: 'json',
        async: false,
        success: function (lang) {
            Message = lang[key] + parameter;
        }
    });
    return Message;
}

//#endregion

//#region Set Sitedata Variable

function SetSiteDataVariable() {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))
    SiteData.AdminBankPageData = data.AdminBankPageData;
    SiteData.AnnouncementsData = data.AnnouncementsData;
    SiteData.DownloadPageData = data.DownloadPageData;
    SiteData.PromotionPageData = data.PromotionPageData;
    SiteData.AllBankPageData = data.AllBankPageData;
    SiteData.WalletData = data.WalletData;
    SiteData.HomeBannerData = data.HomeBannerData;
}

//#endregion

//#region Reset Sitedata

function SetSiteData() {
    SiteData.PromotionPageData = null;
    SiteData.AnnouncementsData = null;
    SiteData.AdminBankPageData = null;
    SiteData.DownloadPageData = null;
    SiteData.AllBankPageData = null;
    SiteData.WalletData = null;
    SiteData.HomeBannerData = null;
    SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)))
}

//#endregion

//#region  Set All Element Value 

function SetAllValueInElement(id, value) {
    $("[id='" + id + "']").each(function () {
        $(this).html(value)
    });
}

function SetAllInputTextvalue(id, value) {
    $("[id='" + id + "']").each(function () {
        $(this).val(value)
    });
}

//#endregion

//#region Set Path of Images based on ID

function SetAllImagePath(id, value) {
    $("[id='" + id + "']").each(function () {
        $(this).attr('src', value)
    });
}
//#endregion

//#region Set Image in Backgroud in CSS 

function SetBackgroudImagePath(ClassName, value) {
    $("." + ClassName).each(function () {
        $(this).css("background", "url(" + value + ") 24% 10% no-repeat");
    });
}

//#endregion

//#region Promotion Slider Slick JS

function HomepageBannerSliderJsFunction() {
    $('.slick-carousel').slick({
        arrows: true,
        centerPadding: "0px",
        dots: true,
        slidesToShow: 1,
        infinite: false,
        autoplay: true,
    });
}

//#endregion

//#region Set Main Page Slider Html

function SetHomePageBanner() {
    let data = JSON.parse(Decryption(GetSessionStorage("siteData")));

    if (data != null && data.HomeBannerData != null) {

        let homepageBanner = data.HomeBannerData;
        let homepageBannerData = "";

        for (i = 0; i < homepageBanner.length; i++) homepageBannerData += '<div><img src="' + homepageBanner[i].bannerWeb + '"></div>'

        document.getElementById("slider_promotion_div").innerHTML = "";
        SetAllValueInElement("slider_promotion_div", homepageBannerData)

        HomepageBannerSliderJsFunction();
    }
}

//#endregion

//#region Set Promotion Page Html

function SetPromotionInPromotionPage() {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))

    if (data != null && data.PromotionPageData != null) {
        var promotion = data.PromotionPageData;

        var IsSlotsPromotion = promotion.filter(x => x.IsSlots == true);
        var IsSportsPromotion = promotion.filter(x => x.IsSports == true);
        var IsLivePromotion = promotion.filter(x => x.IsCasino == true);
        var IsNewMemberPromotion = promotion.filter(x => x.IsNewMember == true);
        var IsRebatePromotion = promotion.filter(x => x.IsRebate == true);
        var IsLimitedTimePromotion = promotion.filter(x => x.IsLimitedTime == true);

        SetHtmlInPromotionPage("all_promotion", promotion);
        SetHtmlInPromotionPage("slots_promotion", IsSlotsPromotion);
        SetHtmlInPromotionPage("sports_promotion", IsSportsPromotion);
        SetHtmlInPromotionPage("live_promotion", IsLivePromotion);
        SetHtmlInPromotionPage("newmember_promotion", IsNewMemberPromotion);
        SetHtmlInPromotionPage("rebate_promotion", IsRebatePromotion);
        SetHtmlInPromotionPage("limited_promotion", IsLimitedTimePromotion);

        var description = "";
        for (i = 0; i < promotion.length; i++)
            description +=
                '<div class="modal fade Reload_bonus_myModal" id="' + promotion[i].id + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button><h4 class="modal-title"><span>' + promotion[i].title + '</span></h4></div><div class="modal-body">' + promotion[i].Description + '</div></div></div ></div >';

        SetAllValueInElement("description_section", description);
    }
}

//#endregion

//#region Create Html of Promotion Page

function SetHtmlInPromotionPage(Id, Data) {
    HTMLData = "";
    if (Data.length > 0) {
        for (i = 0; i < Data.length; i++)HTMLData += '<div class="col-sm-6 pl0" ><div class="all_promotion_left"><a href="#' + Data[i].id + '" data-toggle="modal"><img src="' + Data[i].banner + '" alt="promotio1"></a></div></div>';
    }
    else {
        HTMLData += '<div class="col-sm-12 pl0" ><div class="all_promotion_left no_promotion">NO PROMOTION</div></div>';
    }
    SetAllValueInElement(Id, HTMLData);
}

//#endregion

//#region Set Announcements of pages

function SetAnnouncementsOnAllPages() {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))

    if (data != null && data.AnnouncementsData != null) {
        var announcements = data.AnnouncementsData;
        var announcementsData = "";
        for (i = 0; i < announcements.length; i++)announcementsData += announcements[i].announcement + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        SetAllValueInElement("announcements", "");
        SetAllValueInElement("announcements", announcementsData)
    }
}

//#endregion

//#endregion 

//#region "ASYNC" Function Section

//#region "ASYNC" Call Announcements API for Get Data

async function AllAnnouncementsCallAPI() {

    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))

    if (data.AnnouncementsData === null || data.AnnouncementsData == undefined) {

        let res = await GetMethodWithoutToken(settingEndPoints.announcementList);

        if (res.status == 200) {
            SiteData.AnnouncementsData = res.response.data;
            SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)));
            SetAnnouncementsOnAllPages();
        }
    }
    else {
        SetAnnouncementsOnAllPages();
    }

}

//#endregion

//#region "ASYNC" Call Promotion API for Get data

async function AllPromotionCallAPI() {

    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))

    if (data.PromotionPageData == null || data.PromotionPageData == undefined) {

        let res = await GetMethodWithoutToken(promotionEndPoints.webRetrieve);

        if (res.status == 200) {
            SiteData.PromotionPageData = res.response.data;
            SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)))
        }
    }
}

//#endregion

//#region "ASYNC" Call Home Banner API for Get data

async function HomeBannerCallAPI() {

    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))

    if (data.HomeBannerData == null || data.HomeBannerData == undefined) {

        let res = await GetMethodWithoutToken(settingEndPoints.homepageBannerList);

        if (res.status == 200) {
            SiteData.HomeBannerData = res.response.data;
            SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)))
        }
    }
}

//#endregion

//#region "ASYNC" Set LastUpdateTime of Sitedate Variable

async function SetLastUpdateTime() {
    if (GetSessionStorage("siteData") == null) SetSiteData()

    if (GetLocalStorage("time") == null) {
        SetSiteData();
        var date = new Date();
        SetLocalStorage("time", date);
    }
    else {
        var Currentdate = new Date();
        var OldDate = new Date(GetLocalStorage("time"));

        var diff = (Currentdate.getTime() - OldDate.getTime()) / 1000;
        diff /= 60;
        diff = Math.abs(Math.round(diff));

        //#region TODO:: signleR not working in UAT.

        if (environmentName.toUpperCase() == 'DEBUG') {
            await HomeBannerCallAPI();
        }

        //#endregion

        if (diff > 9) {
            SetSiteData();
            var date = new Date();
            SetLocalStorage("time", date);
        }
    }
}

//#endregion

//#region "ASYNC" Get Wallet List

async function GetWalletList() {

    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))

    if (data.WalletData == null || data.WalletData == undefined) {

        let res = await GetMethod(settingEndPoints.walletList);
        if (res.status == 200) {
            SiteData.WalletData = res.response.data;

            SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)))
        }
    }
}

//#endregion

//#endregion

function SetRefKeyword() {
    var url_string = window.location.href.toLowerCase();
    var url = new URL(url_string);
    var name = url.searchParams.get("ref");
    if (name !== null) {
        SetCookie("ref", name, 1000);
        var referenceKeywordModel = {
            keyword: name
        };
        PostMethod(settingEndPoints.socialMediaReference, referenceKeywordModel);
    }
    else {
        SetCookie("ref", null, 1000);
    }

    var referenceKeywordModelDesktopElse = {
        keyword: 'DESKTOP'
    };
    PostMethod(settingEndPoints.socialMediaReference, referenceKeywordModelDesktopElse);
}

function SetLanguage() {
    var url_string = window.location;
    var url = new URL(url_string);
    url.href = url.href.toLowerCase();
    var Langauge = url.searchParams.get("lang");
    if (Langauge != null)
        SetLocalStorage('language', Langauge == "cn" ? "zh-Hans" : (Langauge == "my" ? "ms-MY" : "en-US"));
    else
        if (GetLocalStorage('language') === null) SetLocalStorage('language', 'en-US');
}

function SetYoutubeVideo() {
    var youtubLink = ""

    if (GetLocalStorage('language') == "en-US" || GetLocalStorage('language') == "ms-MY")
        youtubLink = "https://www.youtube-nocookie.com/embed/wiiRGBVanQo?autoplay=1&mute=1";
    else
        youtubLink = "https://www.youtube.com/embed/Y0mB5txA0_I?autoplay=1&mute=1";

    $("#youtube_video_link").attr("src", youtubLink)
}

function ChangeLanguageText() {
    var lang = GetLocalStorage('language');
    $("#" + GetLocalStorage("language")).addClass("text-theam-color");
    $.ajax({
        url: '../../resources/lang.' + lang + '.json',
        dataType: 'json',
        async: false,
        success: function (lang) {
            $('.lang').each(function () {
                $(this).text(lang[$(this).attr('key')]);
            });
        }
    });
    if (lang == "ms-MY") {
        $("#restore-btn-malay").css("padding-left", "45px");
        $("#restore-btn-malay").css("width", "160px");
        $(".restore_amount_sec_wrap").css("width", "75%");
    }
}

function ChangeLanguage(LangCode) {
    SetLocalStorage("language", LangCode);
    for (i = 0; i < 5; i++)
        sessionStorage.removeItem("siteData");
    window.location.reload();
}

function FollowOnFacebook() {
    window.open("https://www.facebook.com/WEBET333MY/");
}

function FollowOnInstagram() {
    window.open("https://www.instagram.com/webet333/");
}

function FollowOnYoutube() {
    window.open("https://www.youtube.com/channel/UCE_HSoTYqGLkDa6rX8scNKw");
}

function OpenChatWindow() {
    $("#onlinehelp-float-button-2 img").click();
}

function OpenWhatsapp(mobileNo = '60174780045') {
    window.open('https://api.whatsapp.com/send?phone=' + mobileNo + '&text=Claim%20and%20Join', '_blank');
}

function OpenTelegram(Id) {
    window.open('https://t.me/mywbcs1' + Id, '_blank');
}

function ClickOnJoin() {
    if (GetLocalStorage("currentUser") == null)
        window.location.href = './Web/register'
    else
        window.location.href = './Web/profile#deposit'
}

function ClickOnDeposit() {
    if (GetLocalStorage("currentUser") == null)
        window.location.href = './Web/register'
    else
        window.location.href = './Web/profile#deposit'
}

function ClickOnPlay() {
    if (GetLocalStorage("currentUser") == null)
        window.location.href = './Web/register'
    else
        window.location.href = './Web/profile#deposit'
}

function ClickOnWithdraw() {
    if (GetLocalStorage("currentUser") == null)
        window.location.href = './Web/register'
    else
        window.location.href = './Web/profile#withdraw'
}

function CheckGameMaintenance() {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")));
    if (data !== null) {
        if (data.WalletData !== null) {
            var isMaintenance = data.WalletData.filter(x => x.isMaintenance == true);
            var isNotMaintenance = data.WalletData.filter(x => x.isMaintenance == false);
            if (isMaintenance.length > 0) {
                for (i = 0; i < isMaintenance.length; i++) {
                    var id = isMaintenance[i].walletType.replace(" ", "-").toLowerCase();

                    $("[id='" + id + "']").each(function () {
                        $(this).css("filter", "grayscale(1)");
                        $(this).attr("title", "Game In Maintenance.");
                        $("#" + id + "-allin").attr("disabled", "disabled");
                    });
                }
            }
            if (isNotMaintenance.length > 0) {
                for (i = 0; i < isNotMaintenance.length; i++) {
                    var id = isNotMaintenance[i].walletType.replace(" ", "-").toLowerCase();

                    $("[id='" + id + "']").each(function () {
                        $(this).css("filter", "");
                        $(this).attr("title", "");
                        $("#" + id + "-allin").removeAttr("disabled");
                    });
                }
            }
        }
    }
}

function SignalRConnect() {
    try {
        "use strict";

        var connection = new signalR.HubConnectionBuilder().withUrl(baseUrlWithoutVersion + "/signalrhub").build();

        connection.on("WalletUpdate", function (data) {
            SiteData.WalletData = data.data;
            SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)))
            CheckGameMaintenance();
        });

        connection.on("PromotionInsertUpdate", function () {
            SiteData.PromotionPageData = null;
            SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)));
            AllPromotionCallAPI();
        });

        connection.on("AnnouncementInsertUpdate", function () {
            SiteData.AnnouncementsData = null;
            SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)));
            AllAnnouncementsCallAPI();
        });

        connection.on("AdminBankInsertUpdate", async function () {
            SiteData.AdminBankPageData = null;
            SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)));
            await CallAPIForBankPages();
            SetDepositPageBank();
        });

        connection.on("DownloadLinkUpdate", function () {
            SiteData.DownloadPageData = null;
            SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)));
            CallDownloadLinkAPI();
        });

        connection.start().then(function () {
            console.log("Connected with SignalR Hub");
        }).catch(function (err) {
            console.log("Not Connected with SignalR Hub");
            return console.error(err.toString());
        });

        connection.on("HomePageBannerInsertUpdate", function () {
            SiteData.HomeBannerData = null;
            SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)));
            HomeBannerCallAPI();
        });
    }
    catch {
        SignalRConnect();
    }
}

function CheckTokenIsValid(StausCode, StatusMessage) {
    if (StausCode == 400)
        if (StatusMessage == "Your access token is expired, please login again." || StatusMessage == "Token akses anda tamat tempoh, sila log masuk sekali lagi." || StatusMessage == "您的访问令牌已过期，请重新登录。") {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
        }
}