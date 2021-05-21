//#region Onload
$(document).ready(function () {
        if (GetLocalStorage('language') === null) SetLocalStorage('language', 'en-US');
});
//#endregion

function SetAllValueInElement(id, value) {
    $("[id='"+id+"']").each(function () {
        $(this).html(value)
    });
}

function SetAllImagePath(id, value) {
    $("[id='" + id + "']").each(function () {
        $(this).attr('src',value)
    });
}

function SetBackgroudImagePath(ClassName, value) {
    $("." + ClassName).each(function () {
        $(this).css("background", "url(" + value + ") 24% 10% no-repeat");
    });
}


function PromotionSlider() {

}