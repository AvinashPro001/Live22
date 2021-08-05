"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRegister = exports.ErrorMessages = exports.VIPSetting = exports.smsConst = exports.gameBalance = exports._918Kiss = exports.Joker = exports.playtech = exports.customer = exports.AGGame = exports.M8Game = exports.account = exports.environment = void 0;
var baseUrl = '', baseUrlWithoutVersion = '';
var environmentName = 'LOCAL'; // 'DEBUG' OR 'STAG' OR 'LOCAL'
var PortAPI = '9001';
switch (environmentName.toUpperCase()) {
    case 'DEBUG':
        baseUrl = 'https://uatapi.wb3api.com/api/v1/';
        baseUrlWithoutVersion = 'https://uatapi.wb3api.com';
        break;
    case 'STAG':
        baseUrl = 'https://api.wb3api.com/api/v1/';
        baseUrlWithoutVersion = 'https://api.wb3api.com';
        break;
    case 'LOCAL':
        baseUrl = 'http://127.0.0.1:' + PortAPI + '/api/v1/';
        baseUrlWithoutVersion = 'http://127.0.0.1:' + PortAPI;
        break;
}
exports.environment = {
    production: false,
    apiUrl: baseUrl,
    apiUrlWithVersion: baseUrlWithoutVersion
};
exports.account = {
    login: exports.environment.apiUrl + 'account/login',
    logout: exports.environment.apiUrl + 'account/logout',
    changePassword: exports.environment.apiUrl + 'account/change_password',
    forgetPassword: exports.environment.apiUrl + 'account/forgot_password',
    resetPassword: exports.environment.apiUrl + 'account/reset_password',
    setPassword: exports.environment.apiUrl + 'account/admin_invite',
    profile: exports.environment.apiUrl + 'account/profile',
    transferBalance: exports.environment.apiUrl + 'transfer/balance',
    dashboard: exports.environment.apiUrl + 'account/dashboard',
    analytics: exports.environment.apiUrl + 'account/analytics',
    walletUpdateBalance: exports.environment.apiUrl + 'payments/UserWalletBalanceUpdate',
    AllWalletBalance: exports.environment.apiUrl + 'Game/AllWalletBalance',
    walletSelect: exports.environment.apiUrl + 'account/wallet/select',
    walletMainteanceUpdat: exports.environment.apiUrl + 'account/wallet/maintenance/update',
    adminbankadd: exports.environment.apiUrl + 'settings/admin_bank/add',
    adminbankedit: exports.environment.apiUrl + 'settings/admin_bank/edit',
    adminbanklist: exports.environment.apiUrl + 'settings/banks/alllist',
    announcementupdate: exports.environment.apiUrl + 'settings/announcement/update',
    adminBankStatus: exports.environment.apiUrl + 'settings/admin_bank/active',
    adminBankImageadd: exports.environment.apiUrl + 'settings/admin_bank/image/add',
    adminBankImageUpdate: exports.environment.apiUrl + 'settings/admin_bank/image/edit',
    getLanguageList: exports.environment.apiUrl + 'account/getlanguage',
    RestoreBalance: exports.environment.apiUrl + 'Game/Balance/Restore',
    lastUpdateDetails: exports.environment.apiUrl + 'Game/LastUpdateBettingDetail',
    managerSelect: exports.environment.apiUrl + 'account/manager/select',
    managerInsert: exports.environment.apiUrl + 'account/manager/insert',
    managerUpdate: exports.environment.apiUrl + 'account/manager/update',
    AdminNotificationParameterUpdate: exports.environment.apiUrl + 'account/notication/info/Update',
    AdminNotificationParameterSelect: exports.environment.apiUrl + 'account/notication/info/select',
    VaderPayParameterSelect: exports.environment.apiUrl + 'account/vaderpay/maintenance/select',
    VaderPayParameterUpdate: exports.environment.apiUrl + 'account/vaderpay/maintenance/update',
    FreeCeditSetting: exports.environment.apiUrl + 'promotions/freecredit',
};
//export const Game = {
//    selectUser: environment.apiUrl + 'Game/SelectUser',
//    registerAG: environment.apiUrl + 'Game/AG/Register',
//    registerJoker: environment.apiUrl + 'Game/Joker/Register',
//    registerPlaytech: environment.apiUrl + 'Game/Playtech/Register',
//    register918Kiss: environment.apiUrl + 'Game/918Kiss/Register',
//    registerM8: environment.apiUrl + 'Game/M8/Register',
//    registerMaxBet: environment.apiUrl + 'MaxBet/Register',
//    registerMega888: environment.apiUrl + 'mega888/register'
//}
exports.M8Game = {
    createAction: 'action=create',
    loginAction: 'action=login',
    balanceAction: 'action=balance',
    depositAction: 'action=deposit',
    logoutAction: 'action=logout',
    withdrawalAction: 'action=withdraw',
    secret: 'secret=a782988d',
    agent: 'agent=0a1a',
    M8baseUrl: 'http://apir.mywinday.com/api.aspx?'
};
exports.AGGame = {
    AGbaseUrl: 'http://agent.avx99.com/API/',
    CraeteAccount: 'CheckOrCreateGameAccout?',
    TransferCredit: 'TransferCredit?',
    GetBalance: 'GetBalance?',
    ForwadGame: 'forwardGame',
    deposit: 'type=IN',
    withdraw: 'type=OUT',
    A: 'odd_type=A',
    B: 'odd_type=B',
    C: 'odd_type=C',
    D: 'odd_type=D',
    E: 'odd_type=E',
    F: 'odd_type=F',
    G: 'odd_type=G',
    H: 'odd_type=H',
    I: 'odd_type=I',
    MYR: 'currency=MYR',
    CNY: 'currency=CNY',
    IDR: 'currency=IDR',
    VND: 'currency=VND',
    THB: 'currency=THB',
    VendorID: 'vendor_id=jdWvhb3sj83fhv33',
    OperatorID: 'operator_id=WB',
};
exports.customer = {
    transferBalanceMega888: exports.environment.apiUrl + 'mega888/deposit_withdraw',
    transferBalanceDG: exports.environment.apiUrl + 'dg/transfer',
    customerList: exports.environment.apiUrl + 'customer/list',
    customerWinloseReport: exports.environment.apiUrl + 'customer/winlose/report',
    customerDelete: exports.environment.apiUrl + 'customer/profile/delete',
    customerStatus: exports.environment.apiUrl + 'customer/profile/status',
    customerUpdate: exports.environment.apiUrl + 'customer/profile/update',
    changeSatus: exports.environment.apiUrl + 'activate_customer',
    depositList: exports.environment.apiUrl + 'payments/deposit/retrieve',
    withdrawList: exports.environment.apiUrl + 'payments/withdraw/retrieve',
    withdrawListTemp: exports.environment.apiUrl + 'payments/withdraw/retrieve/temp',
    transferList: exports.environment.apiUrl + 'payments/transfer/retrieve',
    transferAdd: exports.environment.apiUrl + 'payments/transfer',
    depositVerify: exports.environment.apiUrl + 'payments/deposit/verify',
    withdrawVerify: exports.environment.apiUrl + 'payments/withdraw/verify',
    walletBalance: exports.environment.apiUrl + 'customer/wallet/balance',
    promotionApplySelect: exports.environment.apiUrl + 'promotions/promotionapply/select',
    promotionApplyList: exports.environment.apiUrl + 'promotions/promotionapply/list',
    rebateHistory: exports.environment.apiUrl + 'Game/Rebate/User/History',
    statementHistory: exports.environment.apiUrl + 'payments/transactions',
    restoreHistory: exports.environment.apiUrl + 'Game/restore/list',
    slotsGameList: exports.environment.apiUrl + 'Game/slotsgame/list',
    slotsGameUpdate: exports.environment.apiUrl + 'Game/slotsgame/update',
    PragmaticGameListUpdate: exports.environment.apiUrl + 'pragmatic/game/list',
    GameListFileUpload: exports.environment.apiUrl + 'Game/list/upload',        
    GameplayGameListUpdate: exports.environment.apiUrl + 'gameplay/get/slot-gamelist',
    ManuallyPromotionExpiery: exports.environment.apiUrl + 'Game/ManuallyPromotionExpiry',
    similarNameList: exports.environment.apiUrl + 'payments/withdraw/similarname/list',
    usernamPrifix: exports.environment.apiUrl + 'Game/GlobalParameters',
    refKeywordList: exports.environment.apiUrl + 'account/refkeyword/select',
    refKeywordDelete: exports.environment.apiUrl + 'account/refkeyword/delete',
    refKeywordAdd: exports.environment.apiUrl + 'account/refkeyword/insert',
    paymentStatics: exports.environment.apiUrl + 'payments/statics',
    paymentStaticsDetails: exports.environment.apiUrl + 'payments/statics/details',
    kiss918PasswordReset: exports.environment.apiUrl + 'Game/Kiss918/ResetPassword/ByAdmin',
    pussy888PasswordReset: exports.environment.apiUrl + 'pussy888/ResetPassword/ByAdmin',
    pragmaticBrokenStatus: exports.environment.apiUrl + 'pragmatic/broken',
    playtechBrokenStatus: exports.environment.apiUrl + 'playtech/broken',
    jokerBrokenStatus: exports.environment.apiUrl + 'joker/broken',
    jokerBrokenStatusDetails: exports.environment.apiUrl + 'joker/broken/details',
    depositDdl: exports.environment.apiUrl + 'payments/deposit/dropdown_deposit',
    addDeposit: exports.environment.apiUrl + 'payments/deposit',
    promotionApplyCheck: exports.environment.apiUrl + 'promotions/promotionapply/check',
    promotionApplyInsert: exports.environment.apiUrl + 'promotions/promotionapply/insert',
    depositCheck: exports.environment.apiUrl + 'payments/checkdepositwithoutpromotion',
    maxbetFundTransation: exports.environment.apiUrl + 'MaxBet/fundtransfer',
    maxbetBalanceUpdate: exports.environment.apiUrl + 'MaxBet/getbalance',
    maxbetSetLimit: exports.environment.apiUrl + 'MaxBet/Set_AllMember_BetSetting',
    CheckPromotionApply: exports.environment.apiUrl + 'promotions/promotionapply/check',
    maxbetReset: exports.environment.apiUrl + 'MaxBet/Reset_BetSetting',
    maxbetMinMaxSet: exports.environment.apiUrl + 'MaxBet/MinMaxSet',
    maxbetMinMaxGet: exports.environment.apiUrl + 'MaxBet/GetDefaultVariable',
    maxbetUserMinMax: exports.environment.apiUrl + 'MaxBet/User/Set/MinMax',
    GameCategory: exports.environment.apiUrl + 'Game/GetCategory',
    RebateCalculate: exports.environment.apiUrl + 'Game/RebateCalculate',
    Rebate: exports.environment.apiUrl + 'Game/Rebate',
    RebateList: exports.environment.apiUrl + 'Game/Rebate/Select',
    RebateDelete: exports.environment.apiUrl + 'Game/Rebate/Delete',
    RebateDetailsList: exports.environment.apiUrl + 'Game/RebateDetails/Select',
    addWithdrawal: exports.environment.apiUrl + 'payments/withdraw',
    userBank: exports.environment.apiUrl + 'customer/bank',
    userReceipt: exports.environment.apiUrl + 'payments/deposit/image',
    managerApprovalShowPassword: exports.environment.apiUrl + 'account/manager/gamepassword/show',
    promotionList: exports.environment.apiUrl + 'promotions/retrieve',
    promotionAdminList: exports.environment.apiUrl + 'promotions/admin/retrive',
    promotionDailyList: exports.environment.apiUrl + 'promotions/daily/list',
    promotionAdd: exports.environment.apiUrl + 'promotions/insert',
    promotionImage: exports.environment.apiUrl + 'promotions/image',
    promotionDelete: exports.environment.apiUrl + 'promotions/delete',
    promotionUpdate: exports.environment.apiUrl + 'promotions/update',
    promotionUpdateStatus: exports.environment.apiUrl + 'promotions/update/status',
    promotionImageUpdate: exports.environment.apiUrl + 'promotions/image/update',
    promotionHtml: exports.environment.apiUrl + 'promotions/html/retrieve',
    M8SetLimit: exports.environment.apiUrl + 'Game/M8/SetDefaultLimit',
    M8GetLimit: exports.environment.apiUrl + 'Game/M8/GetDefaultLimit',
    M8UsersLimitReset: exports.environment.apiUrl + 'Game/M8/ResetSetlimit',
    M8UsersLimitSet: exports.environment.apiUrl + 'Game/M8/SetUsersBettingLimit',
    bonusList: exports.environment.apiUrl + 'payments/bonus/retrieve',
    bonusDdl: exports.environment.apiUrl + 'payments/deposit/dropdown_bonus',
    adjustmentAdd: exports.environment.apiUrl + 'payments/AdjustUserBalance',
    adjustmentList: exports.environment.apiUrl + 'payments/AdjustUserBalanceRetrive',
    announcementList: exports.environment.apiUrl + 'settings/announcement/admin/list',
    announcementDelete: exports.environment.apiUrl + 'settings/announcement/delete',
    announcementAdd: exports.environment.apiUrl + 'settings/announcement/add',
    GlobalparameterSelect: exports.environment.apiUrl + 'account/globalparameter/select',
    GlobalparameterUpdate: exports.environment.apiUrl + 'account/globalparameter/update',
    RebateSettingUpdate: exports.environment.apiUrl + 'account/rebate/setting/update',
    JokerBettingDetails: exports.environment.apiUrl + 'Game/Manually/Joker_Betting_Details',
    Mega888BettingDetails: exports.environment.apiUrl + 'Game/Manually/Mega888_Betting_Details',
    Kiss918BettingDetails: exports.environment.apiUrl + 'Game/Manually/918Kiss_Betting_Details',
    AGBettingDetails: exports.environment.apiUrl + 'Game/Manually/AG_Betting_Details',
    DGBettingDetails: exports.environment.apiUrl + 'Game/Manually/DG_Betting_Details',
    SexyBettingDetails: exports.environment.apiUrl + 'Game/Manually/Sexy_Betting_Details',
    SABettingDetails: exports.environment.apiUrl + 'Game/Manually/SA_Betting_Details',
    Pussy888BettingDetails: exports.environment.apiUrl + 'Game/Manually/Pussy888_Betting_Details',
    AllBetBettingDetails: exports.environment.apiUrl + 'Game/Manually/AllBet_Betting_Details',
    WMBettingDetails: exports.environment.apiUrl + 'Game/Manually/WM_Betting_Details',
    PragmaticBettingDetails: exports.environment.apiUrl + 'Game/Manually/Pragmatic_Betting_Details',
    PlaytechBettingDetails: exports.environment.apiUrl + 'Game/Manually/Playtech_Betting_Details',
    M8BettingDetails: exports.environment.apiUrl + 'Game/Manually/M8_Betting_Details',
    MaxbetBettingDetails: exports.environment.apiUrl + 'Game/Manually/Maxbet_Betting_Details',
    YeeBetBettingDetails: exports.environment.apiUrl + 'Game/Manually/YeeBet_Betting_Details',
    SBOBettingDetails: exports.environment.apiUrl + 'Game/Manually/SBO_Betting_Details',
    Kiss918PlayerLog: exports.environment.apiUrl + '918kiss/playerlog',
    Pussy888PlayerLog: exports.environment.apiUrl + 'pussy888/playerlog',
    MaxbetDefaultBettingLimit: exports.environment.apiUrl + 'MaxBet/DefaultBettingLimitSet',
    MaxbetGetDefaultVariable: exports.environment.apiUrl + 'MaxBet/GetDefaultVariable',
    SaveJokerBettingDetails: exports.environment.apiUrl + 'Game/JokerBettingDetailsSave',
    SaveMega888BettingDetails: exports.environment.apiUrl + 'Game/Mega888BettingDetailsSave',
    SaveKiss918BettingDetails: exports.environment.apiUrl + 'Game/918KissBettingDetailsSave',
    SaveAGBettingDetails: exports.environment.apiUrl + 'Game/AGBettingDetailsSave',
    SaveDGBettingDetails: exports.environment.apiUrl + 'Game/DGBettingDetailsSave',
    SaveSABettingDetails: exports.environment.apiUrl + 'Game/SABettingDetailsSave',
    SaveM8BettingDetails: exports.environment.apiUrl + 'Game/M8BettingDetailsSave',
    SavePlaytechBettingDetails: exports.environment.apiUrl + 'Game/PlaytechBettingDetailsSave',
    SaveMaxBetBettingDetails: exports.environment.apiUrl + 'Game/MaxBetBettingDetailsSave',
    SavePussy888BettingDetails: exports.environment.apiUrl + 'Game/Pussy888BettingDetailsSave',
    SaveAllbetBettingDetails: exports.environment.apiUrl + 'Game/AllBetBettingDetailsSave',
    SaveWMBettingDetails: exports.environment.apiUrl + 'Game/WMBettingDetailsSave',
    SavePragmaticBettingDetails: exports.environment.apiUrl + 'Game/PragmaticBettingDetailsSave',
    SaveYeeBetBettingDetails: exports.environment.apiUrl + 'Game/YeeBetBettingDetailsSave',
    SaveSBOBettingDetails: exports.environment.apiUrl + 'Game/SBOBettingDetailsSave',
    approvalTimeInsert: exports.environment.apiUrl + 'payments/approvaltime/insert',
    approvalTimeSelect: exports.environment.apiUrl + 'payments/approvaltime/select',
    passwordResetSelect: exports.environment.apiUrl + 'account/gamepassword/select',
    trackingSelect: exports.environment.apiUrl + 'account/tracking/select',
    LastUpdateSelect: exports.environment.apiUrl + 'account/betdetails_lastupdate/select',
    downloadLinkSelect: exports.environment.apiUrl + 'Game/DownloadLink/list',
    downloadLinkUpdate: exports.environment.apiUrl + 'Game/DownloadLink/Update',
    SexyBaccaratDeposit: exports.environment.apiUrl + 'sexybaccarart/deposit',
    SexyBaccaratWithdraw: exports.environment.apiUrl + 'sexybaccarart/withdraw',
    saDeposit: exports.environment.apiUrl + 'sa/deposit',
    saWithdraw: exports.environment.apiUrl + 'sa/withdraw',
    agBetLimit: exports.environment.apiUrl + 'ag/default/betlimit',
    dgBetLimit: exports.environment.apiUrl + 'dg/set/default/betlimit',
    sexyBetLimit: exports.environment.apiUrl + 'sexybaccarart/set/default/betlimit',
    getBetLimit: exports.environment.apiUrl + 'Game/GetBettingLimit',
    SetSexyBetLimit: exports.environment.apiUrl + 'sexybaccarart/set/betlimit',
    SetDGBetLimit: exports.environment.apiUrl + 'dg/set/betlimit',
    SmsUserList: exports.environment.apiUrl + 'account/sms/users/list',
    SendSMS: exports.environment.apiUrl + 'account/sms/send',
    GetUsername: exports.environment.apiUrl + 'account/game/username',
    ICImage: exports.environment.apiUrl + 'account/icimage/select',
    promotionGroupInsert: exports.environment.apiUrl + 'promotions/group/insert',
    promotionGroupUpdate: exports.environment.apiUrl + 'promotions/group/update',
    promotionGroupSelect: exports.environment.apiUrl + 'promotions/group/select',
    promotionGroupDelete: exports.environment.apiUrl + 'promotions/group/delete',
    userRegisterReport: exports.environment.apiUrl + 'account/users_register_report',
    userBehaviorReport: exports.environment.apiUrl + 'account/users_behaviour_report',
    DownlaodExcel: exports.environment.apiUrl + 'excel/download',
    promotionReport: exports.environment.apiUrl + 'promotions/report',
    BettingDetailsByUsername: exports.environment.apiUrl + 'Game/GetBettingDetails',
    CustomerICNumberAdd: exports.environment.apiUrl + 'account/icnumber/insert',
    CustomerICImageAdd: exports.environment.apiUrl + 'account/icimage/insert',
    adminList: exports.environment.apiUrl + 'admin/list',
    adminAdd: exports.environment.apiUrl + 'admin/add',
    adminUpdate: exports.environment.apiUrl + 'admin/update',
    defaultPermissionList: exports.environment.apiUrl + 'user/default_permission/retrieve',
    customerListById: exports.environment.apiUrl + 'customer/list_by_id',
    customerListForDropdown: exports.environment.apiUrl + 'customer/list_for_dropdown',
    contactTypeSelect: exports.environment.apiUrl + 'settings/contact/type/select',
    contactDetailsSelect: exports.environment.apiUrl + 'settings/contact/details/select',
    contactDetailsUpdate: exports.environment.apiUrl + 'settings/contact/details/update',
    contactDetailsAdd: exports.environment.apiUrl + 'settings/contact/details/add',
    GameSelectUser: exports.environment.apiUrl + 'Game/SelectUser',
    adminLogList: exports.environment.apiUrl + 'admin/log/select',
    adminAction: exports.environment.apiUrl + 'admin/action/select_for_dropdown',
    adminModule: exports.environment.apiUrl + 'admin/module/select_for_dropdown',
    dailyReport: exports.environment.apiUrl + 'daily/report/select',
    userGroupList: exports.environment.apiUrl + 'usergroup/select',
    userGroupListForDropdown: exports.environment.apiUrl + 'usergroup/select/dropdown',
    userGroupInsert: exports.environment.apiUrl + 'usergroup/insert',
    userGroupUpdate: exports.environment.apiUrl + 'usergroup/update',
    userGroupUpdateStatus: exports.environment.apiUrl + 'usergroup/update/status',
    userGroupDelete: exports.environment.apiUrl + 'usergroup/delete',
    userGroupUserInsert: exports.environment.apiUrl + 'usergroup/user/insert',
    userGroupUserList: exports.environment.apiUrl + 'usergroup/user/select',
    userGroupUserDelete: exports.environment.apiUrl + 'usergroup/user/delete',
    freeCreditEventList: exports.environment.apiUrl + 'freecreditevent/select',
    freeCreditEventUpdateStatus: exports.environment.apiUrl + 'freecreditevent/update/status',
    freeCreditEventDelete: exports.environment.apiUrl + 'freecreditevent/delete',
    freeCreditEventInsert: exports.environment.apiUrl + 'freecreditevent/insert',
    freeCreditEventUpdate: exports.environment.apiUrl + 'freecreditevent/update',
    freeCreditEventSetFreeCreditTerm: exports.environment.apiUrl + 'freecreditevent/setfreecreditterm',
    freeCreditEventUsersSelect: exports.environment.apiUrl + 'freecreditevent/users/select',
    promotionUsersSelect: exports.environment.apiUrl + 'promotions/users/select',
    promotionSelectForDropdown: exports.environment.apiUrl + 'promotions/select/dropdown',
    setSBOPlayerDefaultBetLimit: exports.environment.apiUrl + 'sbo/set/playerdefaultbetlimit',
    updateSBOPlayerDefaultBetLimit: exports.environment.apiUrl + 'sbo/update/playerdefaultbetlimit',
    getSBOPlayerDefaultBetLimit: exports.environment.apiUrl + 'sbo/get/playerdefaultbetlimit',
    sboGetLeague: exports.environment.apiUrl + 'sbo/getLeague',
    sboSetLeague: exports.environment.apiUrl + 'sbo/set/league',
    getLeagueBetSetting: exports.environment.apiUrl + 'sbo/get/league-bet-setting',
    sboGetBlankLeague: exports.environment.apiUrl + 'sbo/blank-getLeague',
    resendOTP: exports.environment.apiUrl + 'account/send/otp',
    homePageBannerList: exports.environment.apiUrl + 'settings/homePage-banner/select/admin',
    homePageBannerDelete: exports.environment.apiUrl + 'settings/homePage-banner/delete',
    homePageBannerChangeStatus: exports.environment.apiUrl + 'settings/homePage-banner/update/status',
    homePageBannerAdd: exports.environment.apiUrl + 'settings/homePage-banner/add',
    homePageBannerUpdate: exports.environment.apiUrl + 'settings/homePage-banner/update',
    homePageBannerImage: exports.environment.apiUrl + 'settings/homePage-banner/image',
    homePageBannerImageUpdate: exports.environment.apiUrl + 'settings/homePage-banner/image/update',
    homePageBannerSelectById: exports.environment.apiUrl + 'settings/homePage-banner/select/id',
    slotsGameInsert: exports.environment.apiUrl + 'Game/slotsgame/insert'
};
exports.playtech = {
    playtechUrl: 'https://api.wb3api.com/api/Default/playtech',
    PlaytechbaseUrl: 'https://kioskpublicapi-am.hotspin88.com/player/',
    Entity_Key: '2f024a8c55f1de8f588f9b540081d2de0b46d9deae4149dc24fbb58ee4adb069ca767bf4eb001dda2a85ffacc722cf869d210fec9e8d2805dd3e5dd2da15ee40',
    PlayerName: 'WEBET333',
    InstantCashTypeOne: 'local',
    InstantCashTypeTwo: 'api',
    adminName: 'WEBET',
    kioskName: 'WBET333SUBMYR',
    CreateAccount: 'create?',
    GetBalance: 'balance?',
    DepositeAmount: 'deposit?',
    WithdrawAmount: 'withdraw?',
    Logout: 'logout?',
    UpdatePassword: 'update?',
};
exports.Joker = {
    EnsureUserAccount: 'CU',
    GetCredit: 'GC',
    TransferCredit: 'TC',
    Signout: 'SO',
    SetPassword: 'SP',
    AppID: 'AppID=F2NZ',
    Secret: 'Secret=hgcqgcmgyxs6n'
};
exports._918Kiss = {
    RandomUserName: 'action=RandomUserName',
    AddUser: 'action=AddUser',
    DisableAccount: 'action=disable',
    EnableAccount: 'action=enable',
    UserInfo: 'action=getUserInfo',
    Deposite_WithDraw: 'action=setServerScore',
    UpdatePassword: 'action=editUser',
    authcode: 'authcode=swQjTbHQdnAHUyfvgMdN',
    Secretkey: 'Secretkey=N4nnU6aQ939p733t5Etw',
    agent: 'agent=webet333-api',
    pwdtype: 'pwdtype=1',
    Malaysia: '1',
    Thailand: '2',
    Combodia: '3',
    Myammar: '4',
    China: '5',
    Vietnam: '6',
    Indonesia: '7'
};
exports.gameBalance = {
    restoreBalance: exports.environment.apiUrl + 'Game/Balance/Restore',
    withdrawAmountList: exports.environment.apiUrl + 'payments/check/withdrawamount/list',
    Kiss918: exports.environment.apiUrl + 'gamebalance/918kiss',
    Mega888: exports.environment.apiUrl + 'gamebalance/mega888',
    Maxbet: exports.environment.apiUrl + 'gamebalance/maxbet',
    m8: exports.environment.apiUrl + 'gamebalance/m8',
    AG: exports.environment.apiUrl + 'gamebalance/ag',
    DG: exports.environment.apiUrl + 'gamebalance/dg',
    Playtech: exports.environment.apiUrl + 'gamebalance/playtech',
    Joker: exports.environment.apiUrl + 'gamebalance/joker',
    SexyBaccarat: exports.environment.apiUrl + 'gamebalance/sexybaccarat',
    SA: exports.environment.apiUrl + 'gamebalance/sa',
    Pussy888: exports.environment.apiUrl + 'gamebalance/pussy888',
    AllBet: exports.environment.apiUrl + 'gamebalance/allbet',
    WM: exports.environment.apiUrl + 'gamebalance/wm',
    Pragmatic: exports.environment.apiUrl + 'gamebalance/pragmatic',
    walletBalance: exports.environment.apiUrl + 'customer/wallet/balance',
    YeeBet: exports.environment.apiUrl + 'gamebalance/YeeBet',
    SBO: exports.environment.apiUrl + 'gamebalance/SBO'
};
exports.smsConst = {
    SMSbaseUrl: 'http://cloudsms.trio-mobile.com/index.php/api/bulk_mt?',
    action: 'action=send',
    api_key: 'api_key=NUC13010100006272b6dac990a5a38519c724051e6d82d30e',
    sender_id: 'sender_id=CLOUDSMS',
    content_type: 'content_type=1',
    mode: 'mode=shortcode',
    campaign: 'campaign=Webet333'
};
exports.VIPSetting = {
    addVIP: exports.environment.apiUrl + 'vipcategorysetting/insert',
    getVIP: exports.environment.apiUrl + 'vipcategorysetting/select',
    VIPLevelList: exports.environment.apiUrl + 'viplevel/select',
    UserVIPLevelUpdate: exports.environment.apiUrl + 'viplevel/user/update',
    VIPFreeCreditPromotionSetting: exports.environment.apiUrl + 'viplevel/freecredit/promotion/setting',
    VIPGiveFreeCredit: exports.environment.apiUrl + 'viplevel/give/freecredit',
};
exports.ErrorMessages = {
    unAuthorized: 'You are not authorized to access this page!!',
    PleaseProvideFromDateToDate: 'Please Provide From Date and To Date !!!'
};
exports.GameRegister = {
    selectUser: exports.environment.apiUrl + 'Game/SelectUser',
    registerAG: exports.environment.apiUrl + 'ag/register',
    registerJoker: exports.environment.apiUrl + 'joker/register',
    registerPlaytech: exports.environment.apiUrl + 'playtech/register',
    register918Kiss: exports.environment.apiUrl + '918kiss/register',
    registerM8: exports.environment.apiUrl + 'm8/register',
    registerMaxBet: exports.environment.apiUrl + 'MaxBet/Register',
    registerMega888: exports.environment.apiUrl + 'mega888/register',
    registerPussy888: exports.environment.apiUrl + 'pussy888/register',
    registerDG: exports.environment.apiUrl + 'dg/register',
    registerSA: exports.environment.apiUrl + 'sa/register',
    registerWM: exports.environment.apiUrl + 'wm/register',
    registerAllBet: exports.environment.apiUrl + 'allbet/register',
    registerSexy: exports.environment.apiUrl + 'sexybaccarart/register',
    registerPragmatic: exports.environment.apiUrl + 'pragmatic/register',
    registerYeeBet: exports.environment.apiUrl + 'yeebet/register',
    registerSBO: exports.environment.apiUrl + 'sbo/register/player'
};
//# sourceMappingURL=environment.js.map