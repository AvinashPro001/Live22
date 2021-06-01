﻿//#region Set or Get Local Storage

function SetLocalStorage(name, value) {
    localStorage.setItem(name, value);
}

function GetLocalStorage(name) {
    return localStorage.getItem(name);
}

//#endregion Set or Get Local Storage

//#region Set or Get Session Storage

function SetSessionStorage(name, value) {
    sessionStorage.setItem(name, value);
}

function GetSessionStorage(name) {
    return sessionStorage.getItem(name);
}

//#endregion Set or Get Session Storage

// #region Encrypt and Decrypt Data
var key = '997D7F2ADFE547AE8D7A40D519FE434018B780DD3C2147DB8CC652E152325F8B';

function Decryption(ciphertext) {
    if (ciphertext == null)
        return null
    var decryptedBytes = CryptoJS.AES.decrypt(ciphertext, key);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
}

function Encryption(plaintext) {
    if (plaintext == null)
        return null
    return CryptoJS.AES.encrypt(plaintext, key);
}
// #endregion Encrypt and Decrypt Data

//#region POST Method With Token

async function PostMethod(endPoint, model) {
    if (GetLocalStorage('language') === null)
        return null;
    return new Promise(function (resolve, reject) {
        $.ajax({
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
            success: (result, status, xhr) => {
                var response = {
                    "status": 200,
                    "response": result
                }
                resolve(response);
            },
            error: (xhr, status, error) => {
                var response = {
                    "status": xhr.status,
                    "response": xhr.responseJSON
                }
                resolve(response);
            }
        });
    });
}

//#endregion POST Method With Token

//#region GET Method With Token

function GetMethod(endPoint) {
    if (GetLocalStorage('language') === null)
        return null;

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + GetLocalStorage('currentUser'),
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Max-Age': 300,
                'Accept-Language': GetLocalStorage('language')
            },
            url: baseUrl + endPoint,
            success: (result, status, xhr) => {
                var response = {
                    "status": 200,
                    "response": result
                }
                resolve(response);
            },
            error: (xhr, status, error) => {
                var response = {
                    "status": xhr.status,
                    "response": xhr.responseJSON
                }
                resolve(response);
            }
        });
    });
}

//#endregion GET Method With Token

//#region POST Method Without Token

function PostMethodWithoutToken(endPoint, model) {
    if (GetLocalStorage('language') === null)
        return null;

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            data: JSON.stringify(model),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Max-Age': 300,
                'Accept-Language': GetLocalStorage('language')
            },
            url: baseUrl + endPoint,
            success: (result, status, xhr) => {
                var response = {
                    "status": 200,
                    "response": result
                }
                resolve(response);
            },
            error: (xhr, status, error) => {
                var response = {
                    "status": xhr.status,
                    "response": xhr.responseJSON
                }
                resolve(response);
            }
        });
    });
}

//#endregion POST Method Without Token

//#region GET Method Without Token

function GetMethodWithoutToken(endPoint) {
    if (GetLocalStorage('language') === null)
        return null;

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Max-Age': 300,
                'Accept-Language': GetLocalStorage('language')
            },
            url: baseUrl + endPoint,
            success: (result, status, xhr) => {
                var response = {
                    "status": 200,
                    "response": result
                }
                resolve(response);
            },
            error: (xhr, status, error) => {
                var response = {
                    "status": xhr.status,
                    "response": xhr.responseJSON
                }
                resolve(response);
            }
        });
    });
}

//#endregion GET Method Without Token