$(document).ready(function () {
    timestamp = Math.floor(new Date().getTime() / 1000.0);
});
var timestamp;

var jokerBaseUrl = "http://api688.net:80";

var jokerMethodConst = {
    EnsureUserAccount: "CU",
    GetCredit: "GC",
    TransferCredit: "TC",
    Signout: "SO",
    SetPassword: "SP"
};

var jokerConstParameter = {
    AppID: "AppID=F2NZ",
    Secret: "Secret=hgcqgcmgyxs6n"
};

var jokerConstParameterValue = {
    AppID: "F2NZ",
    Secret: "hgcqgcmgyxs6n"
};

function generateSignature(method, userName, password, amount) {
    var requestData_;
    if (method === 'SP') {
        requestData_ = 'Method=' + method + '&' + 'Password=' + password + '&Timestamp=' + timestamp + '&Username=' + userName;
    }
    else if (method === 'TC') {
        requestData_ = 'Amount=' + amount + '&' + 'Method=' + method + '&' + 'Timestamp=' + timestamp + '&' + 'Username=' + userName;
    }
    else {
        requestData_ = 'Method=' + method + '&' + 'Timestamp=' + timestamp + '&' + 'Username=' + userName;
    }

    var encrypted = CryptoJS.HmacSHA1(requestData_, jokerConstParameterValue.Secret);
    var encryptedBAse64 = CryptoJS.enc.Base64.stringify(encrypted);
    var urlNew = encodeURIComponent(encryptedBAse64);
    return urlNew;
}