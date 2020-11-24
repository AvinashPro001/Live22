function PostMethod(endPoint, model) {
    if (GetLocalStorage('language') === null)
        return null;
    return $.ajax({
        type: "POST",
        data: JSON.stringify(model),
        headers: {
            'Authorization': 'Bearer ' + GetLocalStorage('currentUser'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Max-Age': 300,
            'Accept-Language': GetLocalStorage('language')
        },
        url: baseUrl + endPoint,
        beforeSend: function () {
            // setting a timeout
            $(window).load(function () {
                $(".loadingImage").fadeOut("slow");
            });
        }
    }).then(function (res) {
        return res;
    }).fail(function (err) {
        if (err.status === 400) {
            if (err.responseJSON.message == "Your account is not active." || err.responseJSON.message == "Akaun anda belum aktif." || err.responseJSON.message == "您的帐户无效。") {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
            }

            if (err.responseJSON.message == "Your access token is expired, please login again." || err.responseJSON.message == "Token akses anda tamat tempoh, sila log masuk sekali lagi." || err.responseJSON.message == "您的访问令牌已过期，请重新登录。") {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
            }
        }
        if (err.responseJSON !== null && err.responseJSON !== undefined) {
            ShowError(err.responseJSON.message);
            LoaderHide();
        }
    });
}

function PostMethodRegister(endPoint, model) {
    return $.ajax({
        type: "POST",
        data: JSON.stringify(model),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Max-Age': 300,
            'Accept-Language': GetLocalStorage('language')
        },
        url: baseUrl + endPoint
    }).then(function (res) {
        return res;
    }).fail(function (err) {
        if (err.responseJSON !== null && err.responseJSON !== undefined)
        ShowError(err.responseJSON.message);
        LoaderHide();
    });
}

function PostMethodWithoutToken(endPoint, model) {
    return $.ajax({
        type: "POST",
        data: JSON.stringify(model),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Max-Age': 300,
            'Accept-Language': GetLocalStorage('language')
        },
        url: baseUrl + endPoint
    }).then(function (res) {
        return res;
    }).fail(function (err) {
        if (err.responseJSON !== null && err.responseJSON !== undefined)
            ShowError(err.responseJSON.message);
    });
}

async function PostMethodWithParameter(endPoint, model) {
    return await $.ajax({
        type: "POST",
        data: JSON.stringify(model),
        headers: {
            'Authorization': 'Bearer ' + GetLocalStorage('currentUser'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Max-Age': 300,
            'Accept-Language': GetLocalStorage('language')
        },
        url: baseUrl + endPoint
    }).then(await  function (res) {
        return res;
    }).fail(await function (err) {
        return err.responseText;
    });
}

function PostMethosFormData(endPoint, data) {
    if (GetLocalStorage('language') === null)
        return null;

    return $.ajax({
        type: "POST",
        data: data,
        headers: {
            'Authorization': 'Bearer ' + GetLocalStorage('currentUser'),
            'Access-Control-Max-Age': 300,
            'Accept-Language': GetLocalStorage('language')
        },
        contentType: false,
        processData: false,
        cache: false,
        url: baseUrl + endPoint
    }, 'json').then(function (res) {
        return res;
    }).fail(function (err) {
        if (err.responseJSON !== null && err.responseJSON !== undefined)
            ShowError(err.responseJSON.message);
    });
}

function GetMethod(endPoint) {
    if (GetLocalStorage('language') === null)
        return null;
    return $.ajax({
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + GetLocalStorage('currentUser'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Max-Age': 300,
            'Accept-Language': GetLocalStorage('language')
        },
        url: baseUrl + endPoint
    }).then(function (res) {
        return res;
    }).fail(function (err) {
        if (err.responseJSON !== null && err.responseJSON !== undefined)
            ShowError(err.responseJSON.message);
    });
}

function GetMethodWithReturn(endPoint) {
    if (GetLocalStorage('language') === null)
        return null;
    return $.ajax({
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + GetLocalStorage('currentUser'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': GetLocalStorage('language')
        },
        url: baseUrl + endPoint
    }).then(function (res) {
        return res;
    }).fail(function (err) {
        return err.responseJSON;
    });
}

//#region M8

async function callMe(endPoint) {
    var apiURL = M8baseUrl + endPoint;
    let model = {
        url: apiURL
    };
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            data: JSON.stringify(model),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Max-Age': 300
            },
            url: 'http://api.webet333.com/api/Default'
        }).then(function (res) {
            var tosend = JSON.parse(res);
            tosend["error"] = false;
            resolve(tosend);
        }).fail(function (err) {
            reject({
                "error": true,
                "data": err
            });
        });
    });
}

//#endregion M8

//#region Playtech

function PlaytechPostMethod(endPoint) {
    var apiURL = PlaytechbaseUrl + endPoint;
    let model = {
        url: apiURL
    };
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            data: JSON.stringify(model),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Max-Age': 300
            },
            url: 'http://api.webet333.com/api/Default/playtech'
        }).then(function (res) {

            try {
                var tosend = JSON.parse(res);
                tosend["error"] = false;
                resolve(tosend);
            }
            catch (e) {
                resolve(res);
            }

        }).fail(function (err) {
            reject({
                "error": true,
                "data": err
            });
        });
    });
}

//#endregion Playtech

//#region AG
function AGPostMethod(endPoint) {
    var apiURL = AGbaseUrl + endPoint;
    let model = {
        url: apiURL
    };
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            data: JSON.stringify(model),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Max-Age': 300
            },
            url: 'http://api.webet333.com/api/Default/ag'
        }).then(function (res) {
            var tosend = JSON.parse(res);
            tosend["error"] = false;
            resolve(tosend);
        }).fail(function (err) {
            reject({
                "error": true,
                "data": err
            });
        });
    });
}

//#endregion AG

//#region 981Kiss

function _918KissPostMethod(endPoint) {
    var apiURL = _918KissbaseUrl + endPoint;
    let model = {
        url: apiURL
    };
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            data: JSON.stringify(model),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Max-Age': 300
            },
            url: 'http://api.webet333.com/api/Default/ag'
        }).then(function (res) {
            try {
                var tosend = JSON.parse(res);
                tosend["error"] = false;
                resolve(tosend);
            }
            catch (ex) {
                resolve(res);
            }
        }).fail(function (err) {
            reject({
                "error": true,
                "data": err
            });
        });
    });
}

//#endregion 981Kiss

//#region MaxBet

function MaxBetPostMethod(endPoint,model) {
    var apiURL = baseUrl + endPoint;
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            data: JSON.stringify(model),
            headers: {
                'Authorization': 'Bearer ' + GetLocalStorage('currentUser'),
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Max-Age': 300
            },
            url: apiURL
        }).then(function (res) {
            resolve(res);
        }).fail(function (err) {
            resolve({
                "error": true,
                "data": err.responseJSON
            });
        });
    });
}

//#endregion 981Kiss

//#region Joker

function JokerPostMethod(endPoint, perameter) {
    var apiURL = jokerBaseUrl + endPoint;
    let models = {
        model: perameter,
        url: apiURL
    };
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            data: JSON.stringify(models),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Max-Age': 300
            },
            url: 'http://api.webet333.com/api/Default/joker',
            beforeSend: function () {
                // setting a timeout
                $(".loadingImage").fadeOut("slow");
            },
        }).then(function (res) {
            var tosend = JSON.parse(res);
            tosend["error"] = false;
            resolve(tosend);
        }).fail(function (err) {
            reject({
                "error": true,
                "data": err
            });
        });
    });
}
//#endregion Joker

//#region SMS

function SMSGetMethod(endPoint) {
    return $.ajax({
        type: "GET",
        url: SMSbaseUrl + endPoint
    }).then(function (res) {
        return res;
    }).fail(function (err) {
        if (err.statusText === "error") {
            ShowError("SMS Not send !! Please Contact to Administration. ");
            LoaderHide();
        }
    });
}
//#endregion SMS

//#region game Balance

function GameBalancePostMethod(endPoint, model) {
    if (GetLocalStorage('language') === null)
        return null;
    return $.ajax({
        type: "POST",
        data: JSON.stringify(model),
        headers: {
            'Authorization': 'Bearer ' + GetLocalStorage('currentUser'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Max-Age': 300,
            'Accept-Language': GetLocalStorage('language')
        },
        url: baseUrl + endPoint,
        beforeSend: function () {
            // setting a timeout
            $(window).load(function () {
                $(".loadingImage").fadeOut("slow");
            });
        }
    }).then(function (res) {
        return res;
    });
}


//#endregion game Balance