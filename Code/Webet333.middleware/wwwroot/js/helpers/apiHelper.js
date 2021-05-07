function SetLocalStorage(name, value) {
    localStorage.setItem(name, value);
}

function GetLocalStorage(name) {
    return localStorage.getItem(name);
}

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
        url: baseUrl + endPoint
    }).then(function (res) {
        var response = {
            "status": 200,
            "response": res
        }
        return response;
    }).fail(function (err) {
        return err;
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
        var response = {
            "status": 200,
            "response": res
        }
        return response;
    }).fail(function (err) {
        return err;
    });
}

function PostMethodWithoutToken(endPoint, model) {
    if (GetLocalStorage('language') === null)
        return null;
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
        var response = {
            "status": 200,
            "response": res
        }
        return response;
    }).fail(function (err) {
        return err;
    });
}

function GetMethodWithoutToken(endPoint) {
    if (GetLocalStorage('language') === null)
        return null;
    return $.ajax({
        type: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Max-Age': 300,
            'Accept-Language': GetLocalStorage('language')
        },
        url: baseUrl + endPoint
    }).then(function (res) {
        var response = {
            "status": 200,
            "response": res
        }
        return response;
    }).fail(function (err) {
        return err;
    });
}
