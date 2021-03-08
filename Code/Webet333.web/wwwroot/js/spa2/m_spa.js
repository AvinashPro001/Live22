function loadPageHome(obj) {
    debugger
    if (obj != undefined) {
        console.log(obj);
        if (obj.backFrom == "about") {
            $('body').css('padding-top', '40px');
        }
        if (obj.backFrom == "termandCondi") {
            $('body').css('padding-top', '40px');
        }
        if (obj.backFrom == "login") {
            $('body').css('padding-top', '40px');
        }
        if (obj.backFrom == "deposit") {
            $('body').css('padding-top', '40px');
        }
    }

    $('.content').empty();
    $('#home').empty();
    var cUser = GetLocalStorage('currentUser');
    $.ajax({
        url: '/spa2/home',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('#pageResponse').html(response);
            if (cUser == null) {
                $('#afterlogin_mobile').show();
                $('#beforelogin_mobile').hide();

            } else {
                $('#afterlogin_mobile').hide();
                $('#beforelogin_mobile').show();
                //$('#afterlogin_SPA').hide();
            }
            $("html").removeClass("intro");
        }
    });
}
function loadPagePromotions() {
    $.ajax({
        url: '/spa2/promotions',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('#pageResponse').html(response);
            $("html").removeClass("intro");
        }
    });
}
function loadPageContactus() {
    $.ajax({
        url: '/spa2/contactus',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('#pageResponse').html(response);
            $("html").removeClass("intro");
        }
    });
}
function loadPageAbout() {
    $.ajax({
        url: '/spa2/about',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('body').attr('id', 'hideBody');
            $('#pageResponse').html(response);
            $("html").removeClass("intro");
        }
    });
}
function loadPageAccount() {
    $.ajax({
        url: '/spa2/account',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('body').attr('id', 'hideBody');
            $('#pageResponse').html(response);
            $('.loadingImage').hide();
            $("html").removeClass("intro");
        }
    });
}
function loadPagedeposit() {
    $.ajax({
        url: '/spa2/deposit',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('body').attr('id', 'hideBody');
            history.pushState(null, null, "/SPA2/deposit");
            $('#pageResponse').html(response);
            $('body').attr('id', 'hideBody');
            $("html").removeClass("intro");
        }
    });
}
function loadPagedownload() {
    $.ajax({
        url: '/spa2/download',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('#pageResponse').html(response);
            $("html").removeClass("intro");
        }
    });
}
function loadPageForgetpassword() {
    $.ajax({
        url: '/spa2/forgetpassword',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('#pageResponse').html(response);
            $("html").removeClass("intro");
        }
    });
}
function loadPageGame() {
    $.ajax({
        url: '/spa2/Game',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('#pageResponse').html(response);
        }
    });
}
function loadPageHistory() {
    $.ajax({
        url: '/spa2/history',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('#pageResponse').html(response);
            $("html").removeClass("intro");
        }
    });
}
function loadPageJokerdownload() {
    $.ajax({
        url: '/spa2/jokerdownload',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('#pageResponse').html(response);
            $("html").removeClass("intro");
        }
    });
}
function loadPageLogin() {
    $.ajax({
        url: '/spa2/login',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('#pageResponse').html(response);
            $("html").removeClass("intro");
        }
    });
}
function loadPagePragmaticGame() {
    $.ajax({
        url: '/spa2/PragmaticGame',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('#pageResponse').html(response);
        }
    });
}
function loadPageRegister() {
    $.ajax({
        url: '/spa2/register',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('#pageResponse').html(response);
            $("html").removeClass("intro");
        }
    });
}
function loadPageTermandCondtion() {
    $.ajax({
        url: '/spa2/TermandCondtion',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('body').attr('id', 'hideBody');
            $('#pageResponse').html(response);
            $("html").removeClass("intro");
        }
    });
}
function loadPageTransfer() {
    $.ajax({
        url: '/spa2/transfer',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('body').attr('id', 'hideBody');
            $('#pageResponse').html(response);
            $("html").removeClass("intro");
        }
    });
}
function loadPageVerifiedOtp() {
    $.ajax({
        url: '/spa2/VerifiedOtp',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('#pageResponse').html(response);
        }
    });
}
function loadPageWithdraw() {
    $.ajax({
        url: '/spa2/withdraw',
        type: "Get",
        dataType: "text",
        cache: true,
        success: function (response) {
            $('#pageResponse').html(response);

            $("html").removeClass("intro");
        }
    });
}