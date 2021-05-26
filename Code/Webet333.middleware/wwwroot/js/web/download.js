//#region Variable Declare

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


CallDownloadLinkAPI();

function SetBarcode(Data) {
    console.log(Data);
    for (i = 0; i < Data.length; i++)
        SetAllImagePath(Data[i].name, Data[i].barcodeImage);
}

function AppDownload(Id) {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))

    if (data !== null && data.DownloadPageData !== null && data.DownloadPageData !== undefined) {
        for (i = 0; i < data.length; i++) {
            if (data[i].name == Id) self.location = data[i].value;
        }
    }
    else {}
}

async function CallDownloadLinkAPI() {

    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))
    
    if (data == null) {
        SetSiteData();
        CallDownloadLinkAPI()
    }
    else {
        if (data.DownloadPageData == null || data.DownloadPageData == undefined) {

            var res = await GetMethod(settingEndPoints.downloadLinkList);

            if (res.status == 200) {
                data.DownloadPageData = res.response.data;
                SetSessionStorage("siteData", Encryption(JSON.stringify(data)))
                SetBarcode(data.DownloadPageData)
            }
        }
        else {
            SetBarcode(data.DownloadPageData)
        }
    }
}