﻿var baseUrl = "https://api.wb3api.com/api/v1/";
var baseUrlWithoutVersion = "https://api.wb3api.com";

var globalEndPoints = {
    globalParameter: "Game/GlobalParameters"
}

var accountEndPoints = {
    login: "account/login",
    register: "account/register",
    getProfile: "customer/profile",
    updateProfile: "customer/profile/update",
    userBankDetail: "customer/bank",
    withdrawPromotionList: 'payments/check/withdrawamount/list',
    changePassword: "account/change_password",
    userDepositPromotion: "promotions/daily/list",
    gameRegisterCheck: "Game/SelectUser",
    promotionApplyCheck: 'promotions/promotionapply/check',
    depositCheckWithoutPromotion: 'payments/checkdepositwithoutpromotion',
    LoginRegisterTracking: "account/tracking/insert",
    getUserByMobile: "account/getuser",
    SendOTP: "account/send/otp",
    VerifiedOTP: "account/verified/otp",
    userTotalTurnover: "Game/DailyTurnover",
    GetGameSupport: "Game/User/GameSupport",
    PlaytechBrokenStatus: "playtech/broken",
    PragmaticBrokenStatus: "pragmatic/broken",
    userLastTimeUpdate: "account/users/logintime/update",
};

var promotionEndPoints = {
    webRetrieve: "promotions/web/retrieve",
};

var settingEndPoints = {
    announcementList: "settings/announcement/user/list",
    admin_page_bank: "settings/admin_bank/list",
    downloadLinkList: "Game/DownloadLink/list",
    allbank: "settings/banks/list",
    walletList: "account/wallet/select",
    socialMediaReference: "account/socialmediastatics",
    VaderPayMainteanceSelect: "account/vaderpay/maintenance/select",
    homepageBannerList: "settings/homePage-banner/select/user"
};

var gameBalanceEndPoints = {
    mainBalance: "gamebalance/main",
    kiss918Balance: "gamebalance/918kiss",
    mega888Balance: "gamebalance/mega888",
    jokerBalance: "gamebalance/joker",
    maxbetBalance: "gamebalance/maxbet",
    m8Balance: "gamebalance/m8",
    agBalance: "gamebalance/ag",
    playtechBalance: "gamebalance/playtech",
    dgBalance: "gamebalance/dg",
    sexyBalance: "gamebalance/sexybaccarat",
    saBalance: "gamebalance/sa",
    pussy888Balance: "gamebalance/pussy888",
    allBetBalance: "gamebalance/allbet",
    wmBalance: "gamebalance/wm",
    pragmaticBalance: "gamebalance/pragmatic",
    yeebetBalance: "gamebalance/yeebet",
    sboBalance: "gamebalance/sbo",
};

var transactionEndPoints = {
    restore: "Game/Balance/Restore",
    addwithdraw: "payments/withdraw",
    addtransfer: "transfer/balance",
    addDeposite: "payments/deposit",
    onlinePayment: "payment/get/url",
    allInWallet: "Game/Balance/InWallet",
    transferHistroy: "payments/transfer/retrieve",
    withdrawDepositHistroy: "payments/withdraw_deposit_select",
    promotionHistroy: "promotions/promotionapply/list",
    rebateHistroy: "Game/Rebate/User/History",
    rewadHistroy: "customer/reward/list",
    bettingSummeryHistroy: "Game/bettingsummery",
    uploadReceipt: "payments/deposit/image",
}

var gameRegisterEndPoints = {
    registerAG: "ag/register",
    registerJoker: "joker/register",
    registerPlaytech: "playtech/register",
    register918Kiss: "918kiss/register",
    registerM8: "m8/register",
    registerMaxBet: "MaxBet/Register",
    mega888Register: "mega888/register",
    sexyRegister: "sexybaccarart/register",
    saRegister: "sa/register",
    pussyRegister: "pussy888/register",
    allBetRegister: "allbet/register",
    WMRegister: "wm/register",
    pragmaticRegister: "pragmatic/register",
    dgRegister: "dg/register",
    sboRegister: "sbo/register/player",
}

var gameLoginEndPoints = {
    aglogin: "ag/login",
    maxbetlogin: "MaxBet/Login",
    sexylogin: "sexybaccarart/login",
    saLogin: "sa/login",
    allBetLogin: "allbet/login",
    wmLogin: "wm/login",
    pragmaticLogin: "pragmatic/login",
    dgLogin: "dg/login",
    m8Login: "m8/login",
    yeebetLogin: "yeebet/login",
    sboLogin: "sbo/login"
}

var gameSettingEndPoints = {
    slotsGameList: "Game/slotsgame/list",
    pragmaticGameList: "pragmatic/game/list",
    HotGameList: "Game/hotslotsgame/list",
    JokerGameId:"F2NZ."
}