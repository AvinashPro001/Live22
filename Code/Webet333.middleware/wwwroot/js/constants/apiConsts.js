var baseUrl = "http://localhost:8080/api/v1/";

var apiEndPoints = {
    //login: "account/login",
    //register: "account/register",
    //forgotPassword: "account/forgot_password",
    //resetPassword: "account/reset_password",
    //resetPasswordData: "account/reset_password_data",
    ////confirmPassword: "account/confirm_email",
    //changePassword: "account/change_password",
    //getProfile: "customer/profile",
    //userLastTimeUpdate: "account/users/logintime/update",
    //updateProfile: "customer/profile/update",
    //updateBank: "customer/bank/update",

    //Change918PassWordReset: "Game/Kiss918/ResetPassword",
    //ChangePussy888PassWordReset: "pussy888/ResetPassword",

    //socialMediaReference: "account/socialmediastatics",

    //contactInformationSelect: "contact/information/select",

    //addBank: "customer/bank/register",
    //userBankDetail: "customer/bank",
    //walletBalance: "customer/wallet/balance",
    //walletUpdateBalance: "Game/AllWalletBalance",
    //restoreBalance: "Game/Balance/Restore",

    //downloadLinkList: "Game/DownloadLink/list",

    //depositDdl: "payments/deposit/dropdown_deposit",
    //uploadReceipt: "payments/deposit/image",

    //walletSelect: 'account/wallet/select',

    //promotionApplyCheck: 'promotions/promotionapply/check',
    //promotionApplyInsert: 'promotions/promotionapply/insert',

    //withdrawListAmount: 'payments/check/withdrawamount/list',

    //DepositCheckWithoutPromotion: 'payments/checkdepositwithoutpromotion',

    //addDeposite: "payments/deposit",
    //addWithdraw: "payments/withdraw",
    //paymentTransfer: "payments/transfer",

    //onlinePayment: "payment/get/url",

    //paymentTransferInOneAPi: "transfer/balance",

    //transferHistory: "payments/transfer/retrieve",
    //withdrawHistory: "payments/withdraw/retrieve",
    //depositHistory: "payments/deposit/retrieve",
    //transactionHistory: "payments/transactions",
    //rebateHistory: "Game/Rebate/User/History",
    //promotionHistory: "promotions/promotionapply/select",
    //RestoreHistory: "Game/restore/list",

    //AllInWallet: "Game/Balance/InWallet",

    //admin_bank: "settings/admin_bank/list",
    //bank: "settings/banks/list",

    //promotionsList: "promotions/retrieve",

    //promotionsDailyList: "promotions/daily/list",

    //announcementList: "settings/announcement/user/list",

    //selectUser: "Game/SelectUser",

    //PlaytechBrokenStatus: "playtech/broken",
    //PragmaticBrokenStatus: "pragmatic/broken",

    //globalParameter: "Game/GlobalParameters",

    //registerAG: "ag/register",
    //loginAG: "ag/login",

    //registerJoker: "joker/register",
    //registerPlaytech: "playtech/register",
    //register918Kiss: "918kiss/register",
    //registerM8: "m8/register",

    //registerMaxBet: "MaxBet/Register",
    //loginMaxBet: "MaxBet/Login",
    //getUserByMobile: "account/getuser",

    //LoginRegisterTracking: "account/tracking/insert",

    //mega888Register: "mega888/register",
    //mega888Logout: "mega888/logout",

    //sexyRegister: "sexybaccarart/register",
    //sexyLogin: "sexybaccarart/login",

    //saRegister: "sa/register",
    //saLogin: "sa/login",

    //pussyRegister: "pussy888/register",

    //allBetRegister: "allbet/register",
    //allBetLogin: "allbet/login",

    //WMRegister: "wm/register",
    //WMLogin: "wm/login",

    //pragmaticRegister: "pragmatic/register",
    //pragmaticLogin: "pragmatic/login",
    //pragmaticList: "pragmatic/game/list",

    //dgRegister: "dg/register",
    //dgLogin: "dg/login",

    //kiss918Balance: "gamebalance/918kiss",
    //mega888Balance: "gamebalance/mega888",
    //jokerBalance: "gamebalance/joker",
    //maxbetBalance: "gamebalance/maxbet",
    //m8Balance: "gamebalance/m8",
    //agBalance: "gamebalance/ag",
    //playtechBalance: "gamebalance/playtech",
    //dgBalance: "gamebalance/dg",
    //sexyBalance: "gamebalance/sexybaccarat",
    //saBalance: "gamebalance/sa",
    //Pussy888Balance: "gamebalance/pussy888",
    //AllBetBalance: "gamebalance/allbet",
    //WMBalance: "gamebalance/wm",
    //PragmaticBalance: "gamebalance/pragmatic",

    //userDetaisSetGameBalance: "userdetails/set",

    //TotalTurnover: "Game/DailyTurnover",

    //SendOTP: "account/send/otp",
    //VerifiedOTP: "account/verified/otp",

    //VaderPayMainteanceSelect: "account/vaderpay/maintenance/select",

    //GetGameSupport: "Game/User/GameSupport",

    //UserVipDetails:"viplevel/user/details"
};

var globalEndPoints = {
    globalParameter: "Game/GlobalParameters"
}

var accountEndPoints = {
    login: "account/login",
    register: "account/register",
    getProfile: "customer/profile",
    userBankDetail: "customer/bank",
    withdrawPromotionList: 'payments/check/withdrawamount/list',
    changePassword: "account/change_password",
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


};

var transactionEndPoints = {
    restore: "Game/Balance/Restore",
    addwithdraw: "payments/withdraw",
    addtransfer: "transfer/balance",
    transferHistroy:"payments/transfer/retrieve"
}