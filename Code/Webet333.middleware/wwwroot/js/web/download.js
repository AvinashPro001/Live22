//#region Variable Declare

var SlotsUsernamePasswordId = ["pussy888_password", "pussy888_username", "mega888_password", "mega888_username", "joker_password", "joker_username", "kiss918_password", "kiss918_username"]

let DownloadLinks = {
    mega888_apkURL: null,
    mega888_iosURL: null,
    mega888_ios32URL: null,
    kiss918_apkURL: null,
    kiss918_iosURL: null,
    kiss_ios32URL: null,
    joker_apkURL: null,
    joker_iosURL: null,
    pussy888_apkURL: null,
    pussy888_iosURL: null
}

//#endregion

//#region Non "ASYNC" Function Section

//#region Set Barcode Function

function SetBarcode(Data) {
    if (Data !== null)
        for (i = 0; i < Data.length; i++)
            SetAllImagePath(Data[i].name, Data[i].barcodeImage);
}

//#endregion

//#region Set Download Link

function AppDownload(Id) {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))

    if (data !== null && data.DownloadPageData !== null && data.DownloadPageData !== undefined) {
        for (i = 0; i < data.DownloadPageData.length; i++) {
            if (data.DownloadPageData[i].name == Id) self.location = data.DownloadPageData[i].value;
        }
    }
    else { }
}

//#endregion

//#region Set 'Please Login !!' Text

function SetPleaseLoginText(InputType = false) {
    if (InputType)
        for (i = 0; i < SlotsUsernamePasswordId.length; i++)
            SetAllInputTextvalue(SlotsUsernamePasswordId[i], ChangeErroMessage("please_loign_error"))
    else
        for (i = 0; i < SlotsUsernamePasswordId.length; i++)
            SetAllValueInElement(SlotsUsernamePasswordId[i], ChangeErroMessage("please_loign_error"))
}

//#endregion

//#region Set Username Password in Download Page 

function SetUsernamePassword(InputType = false) {
    debugger
    if (GetLocalStorage("currentUser") == null) {
        SetPleaseLoginText(InputType)
    }
    else {
        var data = JSON.parse(Decryption(GetSessionStorage("userDetails")));
        if (InputType) {
            for (i = 0; i < SlotsUsernamePasswordId.length; i++) {
                switch (SlotsUsernamePasswordId[i]) {
                    case "kiss918_username": SetAllInputTextvalue(SlotsUsernamePasswordId[i], GameUsernames.Kiss918Username); break;
                    case "joker_username": SetAllInputTextvalue(SlotsUsernamePasswordId[i], GameUsernames.JokerUsername); break;
                    case "mega888_username": SetAllInputTextvalue(SlotsUsernamePasswordId[i], GameUsernames.Mega888Username); break;
                    case "pussy888_username": SetAllInputTextvalue(SlotsUsernamePasswordId[i], GameUsernames.Pussy888Username); break;
                    case "pussy888_password": SetAllInputTextvalue(SlotsUsernamePasswordId[i], data.passwordPussy888); break;
                    case "mega888_password": SetAllInputTextvalue(SlotsUsernamePasswordId[i], Decryption(GetLocalStorage('currentUserData'))); break;
                    case "joker_password": SetAllInputTextvalue(SlotsUsernamePasswordId[i], Decryption(GetLocalStorage('currentUserData'))); break;
                    case "kiss918_password": SetAllInputTextvalue(SlotsUsernamePasswordId[i], data.password918); break;
                }
            }
        }
        else {
            for (i = 0; i < SlotsUsernamePasswordId.length; i++) {
                switch (SlotsUsernamePasswordId[i]) {
                    case "kiss918_username": SetAllValueInElement(SlotsUsernamePasswordId[i], GameUsernames.Kiss918Username); break;
                    case "joker_username": SetAllValueInElement(SlotsUsernamePasswordId[i], GameUsernames.JokerUsername); break;
                    case "mega888_username": SetAllValueInElement(SlotsUsernamePasswordId[i], GameUsernames.Mega888Username); break;
                    case "pussy888_username": SetAllValueInElement(SlotsUsernamePasswordId[i], GameUsernames.Pussy888Username); break;
                    case "pussy888_password": SetAllValueInElement(SlotsUsernamePasswordId[i], data.passwordPussy888); break;
                    case "mega888_password": SetAllValueInElement(SlotsUsernamePasswordId[i], Decryption(GetLocalStorage('currentUserData'))); break;
                    case "joker_password": SetAllValueInElement(SlotsUsernamePasswordId[i], Decryption(GetLocalStorage('currentUserData'))); break;
                    case "kiss918_password": SetAllValueInElement(SlotsUsernamePasswordId[i], data.password918); break;
                }
            }
        }
    }
}

//#endregion

//#endregion

//#region "ASYNC" Function Section

//#region "ASYNC"  Call Download Link API and Set Barcode

async function CallDownloadLinkAPI() {

    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))

    if (data.DownloadPageData == null || data.DownloadPageData == undefined) {

        var res = await GetMethod(settingEndPoints.downloadLinkList);

        if (res.status == 200) {
            SiteData.DownloadPageData = res.response.data;
            SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)))
            SetBarcode(data.DownloadPageData)
        }
    }
    else {
        SetBarcode(data.DownloadPageData)
    }
}

//#endregion

//#endregion