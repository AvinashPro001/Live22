$(document).ready(function () {
    getUTCTime();
});

var UTCTime;

var _918KissbaseUrl = 'http://api.918kiss.com:9991/ashx/account/';


var _918KissConstParameterValue = {
    authcode: 'swQjTbHQdnAHUyfvgMdN',
    Secretkey: 'N4nnU6aQ939p733t5Etw',
    agent: 'webet333-api',
    pwdtype: '1'
};

var _918KissConstParameter = {
    authcode: 'authcode=swQjTbHQdnAHUyfvgMdN',
    Secretkey: 'Secretkey=N4nnU6aQ939p733t5Etw',
    agent: 'agent=webet333-api',
    pwdtype: 'pwdtype=1'
};

var _918KissActionConst = {
    RandomUserName: 'action=RandomUserName',
    AddUser: 'action=AddUser',
    DisableAccount: 'action=disable',
    EnableAccount: 'action=enable',
    UserInfo: 'action=getUserInfo',
    Deposite_WithDraw: 'action=setServerScore',
    UpdatePassword: 'action=editUser'
};

var _918KissUserAreaId = {
    Malaysia: '1',
    Thailand: '2',
    Combodia: '3',
    Myammar: '4',
    China: '5',
    Vietnam: '6',
    Indonesia: '7'
};

var _918KissUserType = {
    realplayer: '1',
    testplayer: '11'
};

//#region Generate HAS Value

function generateHasValue(userName) {
    if (userName === '' || userName === undefined) {
        var hasParameter_RandamUserName = _918KissConstParameterValue.authcode.toLocaleLowerCase() + _918KissConstParameterValue.agent + UTCTime + _918KissConstParameterValue.Secretkey.toLocaleLowerCase();
        return (CryptoJS.MD5(hasParameter_RandamUserName).toString()).toLocaleUpperCase();
    }
    else {
        var hasParameter = _918KissConstParameterValue.authcode.toLocaleLowerCase() + userName + UTCTime + _918KissConstParameterValue.Secretkey.toLocaleLowerCase();
        return (CryptoJS.MD5(hasParameter).toString()).toLocaleUpperCase();
    }
}

//#endregion Generate HAS Value

//#region Generate UTC Time

function getUTCTime() {
    Date.prototype.getUTCTime = function () {
        return this.getTime() - (this.getTimezoneOffset() * 60000);
    };
    UTCTime = new Date().getUTCTime();
}

//#endregion Generate UTC Time

//#region Generate RandomUserName

async function generateRandomUserName() {
    var randamUserName = await _918KissPostMethod('account.ashx?' + _918KissActionConst.RandomUserName + '&' + 'userName=' + _918KissConstParameterValue.agent + '&' + 'UserAreaId=' + _918KissUserAreaId.Malaysia + '&' + 'time=' + UTCTime + '&' + _918KissConstParameter.authcode + '&' + 'sign=' + generateHasValue());
    return randamUserName.account;
}

//#endregion Generate RandomUserName