var PlaytechbaseUrl = "https://kioskpublicapi.luckydragon88.com/player/";

var PlaytechConstParameter = {
    Entity_Key: "f13fec2c9cf27139bf0d68cf212b1573f55c51f4ab6534f212ca7251ccb81957a376f6f0b99e5d8487cde4d809b5a3ac5522bc6e4c7fa10c7bbd07d302999ad6",
    adminname: "adminname=GTLCMYRWEBET",
    kioskname: "kioskname=GTLCMYRWEBET",
    entity: "entityname=GTLCMYRWEBET"
};

var PlaytechConstAction = {
    CreateAccount: "create?",
    GetBalance: "balance?",
    DepositeAmount: "deposit?",
    WithdrawAmount: "withdraw?",
    Logout: "logout?",
    UpdatePassword: 'update?',
};

var PlaytechInstantCashType = {
    InstantCashTypeOne: "local",
    InstantCashTypeTwo: "api"
};

var PlaytechExternalTransactionId = generateGuid();

function generateGuid() {
    var result, i, j;
    result = '';
    for (j = 0; j < 32; j++) {
        if (j === 8 || j === 12 || j === 16 || j === 20)
            result = result + '-';
        i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
        result = result + i;
    }
    return result;
}