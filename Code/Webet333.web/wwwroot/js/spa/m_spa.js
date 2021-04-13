function mHome() {
    $('.content').empty();
    $('#home').empty();
    var cUser = GetLocalStorage('currentUser');
    $.ajax({
        url: '/SPA/Home',
        type: "Get",
        dataType: "text",
        success: function (response) {
            history.pushState(null, null, "/SPA/Home");
            $('.loadingImage').hide();
            if (cUser == null) {
                setTimeout(() => {
                    $('#beforelogin_SPA').hide();
                }, 5000);
            } else {
                $('#afterlogin_SPA').hide();
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
        url: '/SPA/promotions',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('.content').html(response);
            history.pushState(null, null, "/SPA/promotions");
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
        url: '/SPA/contactus',
        type: "Get",
        dataType: "text",

        success: function (response) {
            $('.content').html(response);
            history.pushState(null, null, "/SPA/contactus");
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
        url: '/SPA/Transfer',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('body').attr('id', 'hideBody');
            history.pushState(null, null, "/SPA/Transfer");
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
        url: '/SPA/Deposit',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('body').attr('id', 'hideBody');
            history.pushState(null, null, "/SPA/deposit");
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
        url: '/SPA/Withdraw',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('body').attr('id', 'hideBody');
            history.pushState(null, null, "/SPA/withdraw");
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
        url: '/SPA/History',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('body').attr('id', 'hideBody');
            history.pushState(null, null, "/SPA/history");
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
        url: '/SPA/Home',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('.content').html(response);
            history.pushState(null, null, "/SPA/home");
            $('.loadingImage').hide();
            if (cUser != null) {
                $('#afterlogin_SPA').hide();
            }
            else {
                $('#beforelogin_SPA').hide();
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
        url: '/SPA/Home',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('#comContent').html(response);
            history.pushState(null, null, "/SPA/home");
            $('.loadingImage').hide();
            if (cUser == null) {
                setTimeout(() => {
                    $('#beforelogin_SPA').hide();
                }, 5000);
            } else {
                $('#afterlogin_SPA').hide();
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
        url: '/SPA/promotions',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('#comContent').html(response);
            history.pushState(null, null, "/SPA/promotions");
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
        url: '/SPA/contactus',
        type: "Get",
        dataType: "text",

        success: function (response) {
            $('#comContent').html(response);
            history.pushState(null, null, "/SPA/contactus");
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
        url: '/SPA/Home',
        type: "Get",
        dataType: "text",
        success: function (response) {
            $('body').attr('id', 'hideBody');
            $('.content').html(response);
            history.pushState(null, null, "/SPA/home");
            $('.loadingImage').hide();
            if (cUser != null) {
                $('#afterlogin_SPA').hide();
            }
            else {
                $('#beforelogin_SPA').hide();
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
        url: '/SPA/about',
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
        url: '/SPA/TermandCondtion',
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
        url: '/SPA/Login',
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
//~/SPA/Account

function mAccount() {
    $('.content').empty();
    $('#home').empty();

    $.ajax({
        url: '/SPA/Account',
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
        url: '/SPA/Login',
        type: "Get",
        dataType: "text",

        success: function (response) {
            $('body').attr('id', 'hideBody');
            $('.content').html(response);
            history.pushState(null, null, "/SPA/login");
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