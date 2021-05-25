//#region Declare SiteData Variable
let SiteData = {
    PromotionPageData: null,
    AnnouncementsData: null,
    AdminBankPageData:null
}
//#endregion

//#region OnLoad Function
$(document).ready(function () {
    if (GetSessionStorage("siteData") == null) SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)))
    SetLastUpdateTime();
    AllPromotionCallAPI();
    if (GetLocalStorage('language') === null) SetLocalStorage('language', 'en-US');
});
//#endregion

//#region Set Sitedata
function SetSiteData() {
    SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)))
}
//#endregion

//#region Set LastUpdateTime of Sitedate Variable
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
        if (diff > 0) {
            SetSiteData();
            var date = new Date();
            SetLocalStorage("time", date);
        }
    }
}
//#endregion

//#region  Set All Element Value 
function SetAllValueInElement(id, value) {
    $("[id='" + id + "']").each(function () {
        $(this).html(value)
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
function PromotionSliderJsFunction() {
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

//#region Call Promotion API for Get data
async function AllPromotionCallAPI() {

    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))

    if (data.PromotionPageData == null || data.PromotionPageData == undefined) {

        let res = await GetMethodWithoutToken(promotionEndPoints.webRetrieve);

        if (res.status == 200) {
            data.PromotionPageData = res.response.data;
            SetSessionStorage("siteData", Encryption(JSON.stringify(data)))
        }
    }
}
//#endregion

//#region Set Main Page Slider Html
function SetPromotionInMainPage() {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))

    if (data != null && data.PromotionPageData != null) {
        var promotion = data.PromotionPageData.filter(x => x.IsMain == true);
        var promotionData = "";
        for (i = 0; i < promotion.length; i++)promotionData += '<div><img src="' + promotion[i].banner + '"></div>'
        document.getElementById("slider_promotion_div").innerHTML = "";
        SetAllValueInElement("slider_promotion_div", promotionData)
        PromotionSliderJsFunction();
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

//#region Call Announcements API for get data
async function AllAnnouncementsCallAPI() {

    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))

    if (data.AnnouncementsData == null || data.AnnouncementsData == undefined) {

        let res = await GetMethodWithoutToken(settingEndPoints.announcementList);

        if (res.status == 200) {
            data.AnnouncementsData = res.response.data;
            SetSessionStorage("siteData", Encryption(JSON.stringify(data)));
            SetAnnouncementsOnAllPages();
        }
    }
    else {
        SetAnnouncementsOnAllPages();
    }
}
//#endregion

//#region Set Announcements of pages
function SetAnnouncementsOnAllPages() {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))

    if (data != null && data.AnnouncementsData != null) {
        var announcements = data.AnnouncementsData;
        var announcementsData = "";
        for (i = 0; i < announcements.length; i++)announcementsData += announcements[i].announcement + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        document.getElementById("announcements").innerHTML = "";
        SetAllValueInElement("announcements", announcementsData)
    }
}
//#endregion