var baseUrl = "http://uatapi.webet333.com/api/v1/";
//var baseUrl = "http://api.webet333.com/api/v1/";
//var baseUrl ="http://localhost:5001/api/v1/"

var apiEndPoints = {
    login: "account/login",
    register: "account/register",
    forgotPassword: "account/forgot_password",
    resetPassword: "account/reset_password",
    resetPasswordData: "account/reset_password_data",
    //confirmPassword: "account/confirm_email",
    changePassword: "account/change_password",
    getProfile: "customer/profile",
    userLastTimeUpdate: "account/users/logintime/update",
    updateProfile: "customer/profile/update",
    updateBank: "customer/bank/update",

    Change918PassWordReset: "Game/Kiss918/ResetPassword",
    ChangePussy888PassWordReset: "pussy888/ResetPassword",

    socialMediaReference: "account/socialmediastatics",

    contactInformationSelect: "contact/information/select",

    addBank: "customer/bank/register",
    userBankDetail: "customer/bank",
    walletBalance: "customer/wallet/balance",
    walletUpdateBalance: "Game/AllWalletBalance",
    restoreBalance: "Game/Balance/Restore",

    downloadLinkList: "Game/DownloadLink/list",

    depositDdl: "payments/deposit/dropdown_deposit",
    uploadReceipt: "payments/deposit/image",

    walletSelect: 'account/wallet/select',

    promotionApplyCheck: 'promotions/promotionapply/check',
    promotionApplyInsert: 'promotions/promotionapply/insert',

    withdrawListAmount: 'payments/check/withdrawamount/list',

    DepositCheckWithoutPromotion: 'payments/checkdepositwithoutpromotion',

    addDeposite: "payments/deposit",
    addWithdraw: "payments/withdraw",
    paymentTransfer: "payments/transfer",

    onlinePayment: "payment/get/url",

    paymentTransferInOneAPi: "transfer/balance",

    transferHistory: "payments/transfer/retrieve",
    withdrawHistory: "payments/withdraw/retrieve",
    depositHistory: "payments/deposit/retrieve",
    transactionHistory: "payments/transactions",
    rebateHistory: "Game/Rebate/User/History",
    promotionHistory: "promotions/promotionapply/select",
    RestoreHistory: "Game/restore/list",

    AllInWallet: "Game/Balance/InWallet",

    admin_bank: "settings/admin_bank/list",
    bank: "settings/banks/list",

    promotionsList: "promotions/retrieve",

    promotionsDailyList: "promotions/daily/list",

    announcementList: "settings/announcement/user/list",

    selectUser: "Game/SelectUser",

    PlaytechBrokenStatus: "playtech/broken",
    PragmaticBrokenStatus: "pragmatic/broken",

    globalParameter: "Game/GlobalParameters",

    registerAG: "ag/register",
    loginAG: "ag/login",

    registerJoker: "joker/register",
    registerPlaytech: "playtech/register",
    register918Kiss: "918kiss/register",
    registerM8: "m8/register",

    registerMaxBet: "MaxBet/Register",
    loginMaxBet: "MaxBet/Login",
    getUserByMobile: "account/getuser",

    LoginRegisterTracking: "account/tracking/insert",

    mega888Register: "mega888/register",
    mega888Logout: "mega888/logout",

    sexyRegister: "sexybaccarart/register",
    sexyLogin: "sexybaccarart/login",

    saRegister: "sa/register",
    saLogin: "sa/login",

    pussyRegister: "pussy888/register",

    allBetRegister: "allbet/register",
    allBetLogin: "allbet/login",

    WMRegister: "wm/register",
    WMLogin: "wm/login",

    pragmaticRegister: "pragmatic/register",
    pragmaticLogin: "pragmatic/login",
    pragmaticList: "pragmatic/game/list",

    dgRegister: "dg/register",
    dgLogin: "dg/login",

    YeeBetRegister: "yeebet/register",
    YeeBetLogin: "yeebet/login",

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
    Pussy888Balance: "gamebalance/pussy888",
    AllBetBalance: "gamebalance/allbet",
    WMBalance: "gamebalance/wm",
    PragmaticBalance: "gamebalance/pragmatic",
    YeeBetBalance: "gamebalance/yeebet",

    userDetaisSetGameBalance: "userdetails/set",

    TotalTurnover: "Game/DailyTurnover",

    SendOTP: "account/send/otp",
    VerifiedOTP: "account/verified/otp",

    VaderPayMainteanceSelect: "account/vaderpay/maintenance/select",

    GetGameSupport: "Game/User/GameSupport",

    UserVipDetails: "viplevel/user/details"
};