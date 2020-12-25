function mHome() {
    $('.content').empty();
    $('#home').empty();
    var cUser = GetLocalStorage('currentUser');
    $.ajax({
        url: '/Mobile/Home',
        type: "Get",
        dataType: "text",
        success: function (response) {
            console.log("response came");
            $('.content').html(response);
            history.pushState(null, null, "/Mobile/Home");
            $('.loadingImage').hide();
            console.log("currentUserData=>" + cUser);
            if (cUser == null) {
                setTimeout(() => {
                    $('#beforelogin_mobile').hide();
                }, 5000);
            } else {
                $('#afterlogin_mobile').hide();
            }
            $("html").removeClass("intro");
        },
        error: function (error) {
            console.log('the page was not loaded', error);
        }
    });
}
function mPromotions() {
    $('.content').empty();
    $('#home').empty();

    $.ajax({
        url: '/Mobile/promotions',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('.content').html(response);
            history.pushState(null, null, "/Mobile/promotions");
            $('.loadingImage').hide();
            $("html").removeClass("intro");
        },
        error: function (error) {
            console.log('the page was not loaded', error);
        }
    });
}
function mContactus() {
    $('.content').empty();
    $('#home').empty();

    $.ajax({
        url: '/mobile/contactus',
        type: "Get",
        dataType: "text",

        success: function (response) {
            $('.content').html(response);
            history.pushState(null, null, "/mobile/contactus");
            $('.loadingImage').hide();
            $("html").removeClass("intro");
        },
        error: function (error) {
            console.log('the page was not loaded', error);
        }
    });
}
function mTransfer() {
    $('.content').empty();
    $('#home').empty();

    $.ajax({
        url: '/Mobile/Transfer',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('body').attr('id', 'hideBody');
            history.pushState(null, null, "/Mobile/Transfer");
            $('.content').html(response);
            $("html").removeClass("intro");
        },
        error: function (error) {
            console.log('the page was not loaded', error);
        },
        complete: function (xhr, status) {
            console.log("the request is complete from Home!");
        }
    });
}
function mDeposit() {
    $('.content').empty();
    $('#home').empty();

    $.ajax({
        url: '/Mobile/Deposit',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('body').attr('id', 'hideBody');
            history.pushState(null, null, "/Mobile/Deposit");
            $('.content').html(response);
            $('body').attr('id', 'hideBody');
            $("html").removeClass("intro");
        },
        error: function (error) {
            console.log('the page was not loaded', error);
        },
        complete: function (xhr, status) {
            console.log("the request is complete from Home!");
        }
    });
}
function mWithdraw() {
    $('.content').empty();
    $('#home').empty();

    $.ajax({
        url: '/Mobile/Withdraw',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('body').attr('id', 'hideBody');
            history.pushState(null, null, "/Mobile/Withdraw");
            $('.content').html(response);
            $("html").removeClass("intro");
        },
        error: function (error) {
            console.log('the page was not loaded', error);
        },
        complete: function (xhr, status) {
            console.log("the request is complete from Home!");
        }
    });
}
function mHistory() {
    $('.content').empty();
    $('#home').empty();

    $.ajax({
        url: '/Mobile/History',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('body').attr('id', 'hideBody');
            history.pushState(null, null, "/Mobile/History");
            $('.content').html(response);
            $("html").removeClass("intro");

        },
        error: function (error) {
            console.log('the page was not loaded', error);
        },
        complete: function (xhr, status) {
            console.log("the request is complete from Home!");
        }
    });
}
function backToHome() {
    var cUser = GetLocalStorage('currentUser');
    $.ajax({
        url: '/Mobile/Home',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('.content').html(response);
            history.pushState(null, null, "/Mobile/Home");
            $('.loadingImage').hide();
            if (cUser != null) {
                $('#afterlogin_mobile').hide();
            }
            else {
                $('#beforelogin_mobile').hide();
            }
            $("html").removeClass("intro");
            $('#hideBody').css('padding-top', '40px');
        },
        error: function (error) {
            console.log('the page was not loaded', error);
        },
        complete: function (xhr, status) {
            console.log("the request is complete from Home!");
        }
    });
}
function mProHome() {
    var cUser = GetLocalStorage('currentUser');
    $('#comContent').empty();
    $("#mComContent").empty();
    $.ajax({
        url: '/Mobile/Home',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('#comContent').html(response);
            history.pushState(null, null, "/Mobile/Home");
            $('.loadingImage').hide();
            if (cUser == null) {
                setTimeout(() => {
                    $('#beforelogin_mobile').hide();
                }, 5000);

            } else {
                $('#afterlogin_mobile').hide();

            }
            $("html").removeClass("intro");
        },
        error: function (error) {
            console.log('the page was not loaded', error);
        },
        complete: function (xhr, status) {
            console.log("the request is complete! from Layout");
        }
    });
}
function mProPromotions() {

    $('#comContent').empty();
    $("#mComContent").empty();
    $.ajax({
        url: '/Mobile/promotions',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('#comContent').html(response);
            history.pushState(null, null, "/Mobile/promotions");
            $('.loadingImage').hide();
            $("html").removeClass("intro");
        },
        error: function (error) {
            console.log('the page was not loaded', error);
        },
        complete: function (xhr, status) {
            console.log("the request is complete! from Layout");
        }
    });
}
function mProContactus() {

    $('#comContent').empty();
    $("#mComContent").empty();
    $.ajax({
        url: '/mobile/contactus',
        type: "Get",
        dataType: "text",

        success: function (response) {
            $('#comContent').html(response);
            history.pushState(null, null, "/mobile/contactus");
            $('.loadingImage').hide();
            $("html").removeClass("intro");
        },     
        error: function (error) {
            console.log('the page was not loaded', error);
        },
        complete: function (xhr, status) {
            console.log("the request is complete! from Layout");
        }
    });
}
function backToHomeSM() {
    var cUser = GetLocalStorage('currentUser');
    $.ajax({
        url: '/Mobile/Home',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('body').attr('id', 'hideBody');
            $('.content').html(response);
            history.pushState(null, null, "/Mobile/Home");
            $('.loadingImage').hide();
            if (cUser != null) {
                $('#afterlogin_mobile').hide();
            }
            else {
                $('#beforelogin_mobile').hide();
            }
            $("html").removeClass("intro");
        },
        error: function (error) {
            console.log('the page was not loaded', error);
        },
        complete: function (xhr, status) {
            console.log("the request is complete from Home!");
        }
    });
}

//Chnages for Side Menu
function mAboutUs() {
    $('.content').empty();
    $('#home').empty();

    $.ajax({
        url: '/Mobile/about',
        type: "Get",
        dataType: "text",

        success: function (response) {
            $('body').attr('id', 'hideBody');
            $('.content').html(response);
            $('.loadingImage').hide();
            $("html").removeClass("intro");
        },
        error: function (error) {
            console.log('the page was not loaded', error);
        },
        complete: function (xhr, status) {
            console.log("the request is complete from Home!");
        }
    });
}
function mTermandCondtion() {
    $('.content').empty();
    $('#home').empty();

    $.ajax({
        url: '/Mobile/TermandCondtion',
        type: "Get",
        dataType: "text",

        success: function (response) {
            $('body').attr('id', 'hideBody');
            $('.content').html(response);
            $('.loadingImage').hide();
            $("html").removeClass("intro");
        },
        error: function (error) {
            console.log('the page was not loaded', error);
        },
        complete: function (xhr, status) {
            console.log("the request is complete from Home!");
        }
    });
}

function mLogin() {
    $('.content').empty();
    $('#home').empty();

    $.ajax({
        url: '/Mobile/Login',
        type: "Get",
        dataType: "text",

        success: function (response) {
            $('body').attr('id', 'hideBody');
            $('.content').html(response);
            $('.loadingImage').hide();
            $("html").removeClass("intro");

        },
        error: function (error) {
            console.log('the page was not loaded', error);
        },
        complete: function (xhr, status) {
            console.log("the request is complete from Home!");
        }
    });
}
function mregister() {
    $('.content').empty();
    $('#home').empty();

    $.ajax({
        url: '~/../register',
        type: "Get",
        dataType: "text",

        success: function (response) {
            $('body').attr('id', 'hideBody');
            $('.content').html(response);
            $('.loadingImage').hide();
            $("html").removeClass("intro");
        },
        error: function (error) {
            console.log('the page was not loaded', error);
        },
        complete: function (xhr, status) {
            console.log("the request is complete from Home!");
        }
    });
}
//~/Mobile/Account

function mAccount() {
    $('.content').empty();
    $('#home').empty();

    $.ajax({
        url: '/Mobile/Account',
        type: "Get",
        dataType: "text",

        success: function (response) {
            $('body').attr('id', 'hideBody');
            $('.content').html(response);
            $('.loadingImage').hide();
            $("html").removeClass("intro");
        },
        error: function (error) {
            console.log('the page was not loaded', error);
        },
        complete: function (xhr, status) {
            console.log("the request is complete from Home!");
        }
    });
}

function smLogin() {
    $('.content').empty();
    $('#home').empty();

    $.ajax({
        url: '/Mobile/Login',
        type: "Get",
        dataType: "text",

        success: function (response) {
            $('body').attr('id', 'hideBody');
            $('.content').html(response);
            history.pushState(null, null, "/Mobile/Login");
            $('.loadingImage').hide();
            $("html").removeClass("intro");

        },
        error: function (error) {
            console.log('the page was not loaded', error);
        },
        complete: function (xhr, status) {
            console.log("the request is complete from Home!");
        }
    });
}