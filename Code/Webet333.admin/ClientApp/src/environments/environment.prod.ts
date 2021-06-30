// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    //apiUrl: 'http://api.webet333.com/api/v1/'
    apiUrl: 'http://uatapi.webet333.com/api/v1/'
    //apiUrl: 'http://localhost:8091/api/v1/'
    //apiUrl: 'http://localhost:5000/api/v1/'
};

export const account = {
    login: environment.apiUrl + 'account/login',
    logout: environment.apiUrl + 'account/logout',
    changePassword: environment.apiUrl + 'account/change_password',
    forgetPassword: environment.apiUrl + 'account/forgot_password',
    resetPassword: environment.apiUrl + 'account/reset_password',
    setPassword: environment.apiUrl + 'account/admin_invite',
    profile: environment.apiUrl + 'account/profile',

    transferBalance: environment.apiUrl + 'transfer/balance',

    dashboard: environment.apiUrl + 'account/dashboard',
    analytics: environment.apiUrl + 'account/analytics',
    walletUpdateBalance: environment.apiUrl + 'payments/UserWalletBalanceUpdate',
    AllWalletBalance: environment.apiUrl + 'Game/AllWalletBalance',
    walletSelect: environment.apiUrl + 'account/wallet/select',
    walletMainteanceUpdat: environment.apiUrl + 'account/wallet/maintenance/update',
    adminbankadd: environment.apiUrl + 'settings/admin_bank/add',
    adminbankedit: environment.apiUrl + 'settings/admin_bank/edit',
    adminbanklist: environment.apiUrl + 'settings/banks/alllist',
    announcementupdate: environment.apiUrl + 'settings/announcement/update',
    adminBankStatus: environment.apiUrl + 'settings/admin_bank/active',
    adminBankImageadd: environment.apiUrl + 'settings/admin_bank/image/add',
    adminBankImageUpdate: environment.apiUrl + 'settings/admin_bank/image/edit',
    getLanguageList: environment.apiUrl + 'account/getlanguage',

    RestoreBalance: environment.apiUrl + 'Game/Balance/Restore',

    lastUpdateDetails: environment.apiUrl + 'Game/LastUpdateBettingDetail',

    managerSelect: environment.apiUrl + 'account/manager/select',
    managerInsert: environment.apiUrl + 'account/manager/insert',
    managerUpdate: environment.apiUrl + 'account/manager/update',

    AdminNotificationParameterUpdate: environment.apiUrl + 'account/notication/info/Update',
    AdminNotificationParameterSelect: environment.apiUrl + 'account/notication/info/select',

    VaderPayParameterSelect: environment.apiUrl + 'account/vaderpay/maintenance/select',
    VaderPayParameterUpdate: environment.apiUrl + 'account/vaderpay/maintenance/update',

    FreeCeditSetting: environment.apiUrl + 'promotions/freecredit',
}

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

export const M8Game = {
    createAction: 'action=create',
    loginAction: 'action=login',
    balanceAction: 'action=balance',
    depositAction: 'action=deposit',
    logoutAction: 'action=logout',
    withdrawalAction: 'action=withdraw',
    secret: 'secret=a782988d',
    agent: 'agent=0a1a',
    M8baseUrl: 'http://apir.mywinday.com/api.aspx?'
}

export const AGGame = {
    AGbaseUrl: 'http://agent.avx99.com/API/',
    CraeteAccount: 'CheckOrCreateGameAccout?',
    TransferCredit: 'TransferCredit?',
    GetBalance: 'GetBalance?',
    ForwadGame: 'forwardGame',
    deposit: 'type=IN',
    withdraw: 'type=OUT',
    A: 'odd_type=A', //(20~50000)
    B: 'odd_type=B', //(50~5000)
    C: 'odd_type=C', //(20~10000)
    D: 'odd_type=D', //(200~20000)
    E: 'odd_type=E', //(300~30000)
    F: 'odd_type=F', //(400~40000)
    G: 'odd_type=G', //(500~50000)
    H: 'odd_type=H', //(1000~100000)
    I: 'odd_type=I',  //(2000~200000)

    MYR: 'currency=MYR', //Malaysia
    CNY: 'currency=CNY', //China
    IDR: 'currency=IDR', //Indonesia
    VND: 'currency=VND', //Vietnam
    THB: 'currency=THB',  //Thailand

    VendorID: 'vendor_id=jdWvhb3sj83fhv33',
    OperatorID: 'operator_id=WB',
}

export const customer = {
    transferBalanceMega888: environment.apiUrl + 'mega888/deposit_withdraw',
    transferBalanceDG: environment.apiUrl + 'dg/transfer',
    customerList: environment.apiUrl + 'customer/list',
    customerWinloseReport: environment.apiUrl + 'customer/winlose/report',
    customerDelete: environment.apiUrl + 'customer/profile/delete',
    customerStatus: environment.apiUrl + 'customer/profile/status',
    customerUpdate: environment.apiUrl + 'customer/profile/update',
    changeSatus: environment.apiUrl + 'activate_customer',
    depositList: environment.apiUrl + 'payments/deposit/retrieve',
    withdrawList: environment.apiUrl + 'payments/withdraw/retrieve',
    transferList: environment.apiUrl + 'payments/transfer/retrieve',
    transferAdd: environment.apiUrl + 'payments/transfer',
    depositVerify: environment.apiUrl + 'payments/deposit/verify',
    withdrawVerify: environment.apiUrl + 'payments/withdraw/verify',
    walletBalance: environment.apiUrl + 'customer/wallet/balance',
    promotionApplySelect: environment.apiUrl + 'promotions/promotionapply/select',
    rebateHistory: environment.apiUrl + 'Game/Rebate/User/History',
    statementHistory: environment.apiUrl + 'payments/transactions',
    restoreHistory: environment.apiUrl + 'Game/restore/list',

    ManuallyPromotionExpiery: environment.apiUrl + 'Game/ManuallyPromotionExpiry',

    similarNameList: environment.apiUrl + 'payments/withdraw/similarname/list',

    usernamPrifix: environment.apiUrl + 'Game/GlobalParameters',

    refKeywordList: environment.apiUrl + 'account/refkeyword/select',
    refKeywordDelete: environment.apiUrl + 'account/refkeyword/delete',
    refKeywordAdd: environment.apiUrl + 'account/refkeyword/insert',

    paymentStatics: environment.apiUrl + 'payments/statics',
    paymentStaticsDetails: environment.apiUrl + 'payments/statics/details',

    kiss918PasswordReset: environment.apiUrl + 'Game/Kiss918/ResetPassword/ByAdmin',
    pussy888PasswordReset: environment.apiUrl + 'pussy888/ResetPassword/ByAdmin',

    pragmaticBrokenStatus: environment.apiUrl + 'pragmatic/broken',
    playtechBrokenStatus: environment.apiUrl + 'playtech/broken',
    jokerBrokenStatus: environment.apiUrl + 'joker/broken',
    jokerBrokenStatusDetails: environment.apiUrl + 'joker/broken/details',

    depositDdl: environment.apiUrl + 'payments/deposit/dropdown_deposit',
    addDeposit: environment.apiUrl + 'payments/deposit',
    promotionApplyCheck: environment.apiUrl + 'promotions/promotionapply/check',
    promotionApplyInsert: environment.apiUrl + 'promotions/promotionapply/insert',

    depositCheck: environment.apiUrl + 'payments/checkdepositwithoutpromotion',

    maxbetFundTransation: environment.apiUrl + 'MaxBet/fundtransfer',
    maxbetBalanceUpdate: environment.apiUrl + 'MaxBet/getbalance',

    maxbetSetLimit: environment.apiUrl + 'MaxBet/Set_AllMember_BetSetting',
    CheckPromotionApply: environment.apiUrl + 'promotions/promotionapply/check',
    maxbetReset: environment.apiUrl + 'MaxBet/Reset_BetSetting',
    maxbetMinMaxSet: environment.apiUrl + 'MaxBet/MinMaxSet',
    maxbetMinMaxGet: environment.apiUrl + 'MaxBet/GetDefaultVariable',

    maxbetUserMinMax: environment.apiUrl + 'MaxBet/User/Set/MinMax',

    GameCategory: environment.apiUrl + 'Game/GetCategory',
    RebateCalculate: environment.apiUrl + 'Game/RebateCalculate',
    Rebate: environment.apiUrl + 'Game/Rebate',
    RebateList: environment.apiUrl + 'Game/Rebate/Select',
    RebateDelete: environment.apiUrl + 'Game/Rebate/Delete',
    RebateDetailsList: environment.apiUrl + 'Game/RebateDetails/Select',

    addWithdrawal: environment.apiUrl + 'payments/withdraw',

    userBank: environment.apiUrl + 'customer/bank',
    userReceipt: environment.apiUrl + 'payments/deposit/image',

    managerApprovalShowPassword: environment.apiUrl + 'account/manager/gamepassword/show',

    promotionList: environment.apiUrl + 'promotions/retrieve',
    promotionAdminList: environment.apiUrl + 'promotions/admin/retrive',
    promotionDailyList: environment.apiUrl + 'promotions/daily/list',
    promotionAdd: environment.apiUrl + 'promotions/insert',
    promotionImage: environment.apiUrl + 'promotions/image',
    promotionDelete: environment.apiUrl + 'promotions/delete',
    promotionUpdate: environment.apiUrl + 'promotions/update',
    promotionUpdateStatus: environment.apiUrl + 'promotions/update/status',
    promotionImageUpdate: environment.apiUrl + 'promotions/image/update',

    promotionHtml: environment.apiUrl + 'promotions/html/retrieve',

    M8SetLimit: environment.apiUrl + 'Game/M8/SetDefaultLimit',
    M8GetLimit: environment.apiUrl + 'Game/M8/GetDefaultLimit',

    M8UsersLimitReset: environment.apiUrl + 'Game/M8/ResetSetlimit',
    M8UsersLimitSet: environment.apiUrl + 'Game/M8/SetUsersBettingLimit',

    bonusList: environment.apiUrl + 'payments/bonus/retrieve',
    bonusDdl: environment.apiUrl + 'payments/deposit/dropdown_bonus',

    adjustmentAdd: environment.apiUrl + 'payments/AdjustUserBalance',
    adjustmentList: environment.apiUrl + 'payments/AdjustUserBalanceRetrive',

    announcementList: environment.apiUrl + 'settings/announcement/admin/list',
    announcementDelete: environment.apiUrl + 'settings/announcement/delete',
    announcementAdd: environment.apiUrl + 'settings/announcement/add',

    GlobalparameterSelect: environment.apiUrl + 'account/globalparameter/select',
    GlobalparameterUpdate: environment.apiUrl + 'account/globalparameter/update',
    RebateSettingUpdate: environment.apiUrl + 'account/rebate/setting/update',

    JokerBettingDetails: environment.apiUrl + 'Game/Manually/Joker_Betting_Details',
    Mega888BettingDetails: environment.apiUrl + 'Game/Manually/Mega888_Betting_Details',
    Kiss918BettingDetails: environment.apiUrl + 'Game/Manually/918Kiss_Betting_Details',
    AGBettingDetails: environment.apiUrl + 'Game/Manually/AG_Betting_Details',
    DGBettingDetails: environment.apiUrl + 'Game/Manually/DG_Betting_Details',
    SexyBettingDetails: environment.apiUrl + 'Game/Manually/Sexy_Betting_Details',
    SABettingDetails: environment.apiUrl + 'Game/Manually/SA_Betting_Details',
    Pussy888BettingDetails: environment.apiUrl + 'Game/Manually/Pussy888_Betting_Details',
    AllBetBettingDetails: environment.apiUrl + 'Game/Manually/AllBet_Betting_Details',
    WMBettingDetails: environment.apiUrl + 'Game/Manually/WM_Betting_Details',
    PragmaticBettingDetails: environment.apiUrl + 'Game/Manually/Pragmatic_Betting_Details',
    PlaytechBettingDetails: environment.apiUrl + 'Game/Manually/Playtech_Betting_Details',
    M8BettingDetails: environment.apiUrl + 'Game/Manually/M8_Betting_Details',
    MaxbetBettingDetails: environment.apiUrl + 'Game/Manually/Maxbet_Betting_Details',
    YeeBetBettingDetails: environment.apiUrl + 'Game/Manually/YeeBet_Betting_Details',
    SBOBettingDetails: environment.apiUrl + 'Game/Manually/SBO_Betting_Details',

    Kiss918PlayerLog: environment.apiUrl + '918kiss/playerlog',
    Pussy888PlayerLog: environment.apiUrl + 'pussy888/playerlog',

    MaxbetDefaultBettingLimit: environment.apiUrl + 'MaxBet/DefaultBettingLimitSet',
    MaxbetGetDefaultVariable: environment.apiUrl + 'MaxBet/GetDefaultVariable',

    SaveJokerBettingDetails: environment.apiUrl + 'Game/JokerBettingDetailsSave',
    SaveMega888BettingDetails: environment.apiUrl + 'Game/Mega888BettingDetailsSave',
    SaveKiss918BettingDetails: environment.apiUrl + 'Game/918KissBettingDetailsSave',
    SaveAGBettingDetails: environment.apiUrl + 'Game/AGBettingDetailsSave',
    SaveDGBettingDetails: environment.apiUrl + 'Game/DGBettingDetailsSave',
    SaveSABettingDetails: environment.apiUrl + 'Game/SABettingDetailsSave',
    SaveM8BettingDetails: environment.apiUrl + 'Game/M8BettingDetailsSave',
    SavePlaytechBettingDetails: environment.apiUrl + 'Game/PlaytechBettingDetailsSave',
    SaveMaxBetBettingDetails: environment.apiUrl + 'Game/MaxBetBettingDetailsSave',
    SavePussy888BettingDetails: environment.apiUrl + 'Game/Pussy888BettingDetailsSave',
    SaveAllbetBettingDetails: environment.apiUrl + 'Game/AllBetBettingDetailsSave',
    SaveWMBettingDetails: environment.apiUrl + 'Game/WMBettingDetailsSave',
    SavePragmaticBettingDetails: environment.apiUrl + 'Game/PragmaticBettingDetailsSave',
    SaveYeeBetBettingDetails: environment.apiUrl + 'Game/YeeBetBettingDetailsSave',
    SaveSBOBettingDetails: environment.apiUrl + 'Game/SBOBettingDetailsSave',

    approvalTimeInsert: environment.apiUrl + 'payments/approvaltime/insert',
    approvalTimeSelect: environment.apiUrl + 'payments/approvaltime/select',

    passwordResetSelect: environment.apiUrl + 'account/gamepassword/select',

    trackingSelect: environment.apiUrl + 'account/tracking/select',

    LastUpdateSelect: environment.apiUrl + 'account/betdetails_lastupdate/select',

    downloadLinkSelect: environment.apiUrl + 'Game/DownloadLink/list',
    downloadLinkUpdate: environment.apiUrl + 'Game/DownloadLink/Update',

    SexyBaccaratDeposit: environment.apiUrl + 'sexybaccarart/deposit',
    SexyBaccaratWithdraw: environment.apiUrl + 'sexybaccarart/withdraw',

    saDeposit: environment.apiUrl + 'sa/deposit',
    saWithdraw: environment.apiUrl + 'sa/withdraw',

    agBetLimit: environment.apiUrl + 'ag/default/betlimit',
    dgBetLimit: environment.apiUrl + 'dg/set/default/betlimit',
    sexyBetLimit: environment.apiUrl + 'sexybaccarart/set/default/betlimit',
    getBetLimit: environment.apiUrl + 'Game/GetBettingLimit',

    SetSexyBetLimit: environment.apiUrl + 'sexybaccarart/set/betlimit',
    SetDGBetLimit: environment.apiUrl + 'dg/set/betlimit',

    SmsUserList: environment.apiUrl + 'account/sms/users/list',
    SendSMS: environment.apiUrl + 'account/sms/send',
    GetUsername: environment.apiUrl + 'account/game/username',

    ICImage: environment.apiUrl + 'account/icimage/select',

    promotionGroupInsert: environment.apiUrl + 'promotions/group/insert',
    promotionGroupUpdate: environment.apiUrl + 'promotions/group/update',
    promotionGroupSelect: environment.apiUrl + 'promotions/group/select',
    promotionGroupDelete: environment.apiUrl + 'promotions/group/delete',

    userRegisterReport: environment.apiUrl + 'account/users_register_report',
    userBehaviorReport: environment.apiUrl + 'account/users_behaviour_report',

    DownlaodExcel: environment.apiUrl + 'excel/download',

    promotionReport: environment.apiUrl + 'promotions/report',
    BettingDetailsByUsername: environment.apiUrl + 'Game/GetBettingDetails',

    CustomerICNumberAdd: environment.apiUrl + 'account/icnumber/insert',
    CustomerICImageAdd: environment.apiUrl + 'account/icimage/insert',

    adminList: environment.apiUrl + 'admin/list',
    adminAdd: environment.apiUrl + 'admin/add',
    adminUpdate: environment.apiUrl + 'admin/update',
    defaultPermissionList: environment.apiUrl + 'user/default_permission/retrieve',

    customerListById: environment.apiUrl + 'customer/list_by_id',
    customerListForDropdown: environment.apiUrl + 'customer/list_for_dropdown',

    contactTypeSelect: environment.apiUrl + 'settings/contact/type/select',
    contactDetailsSelect: environment.apiUrl + 'settings/contact/details/select',
    contactDetailsUpdate: environment.apiUrl + 'settings/contact/details/update',
    contactDetailsAdd: environment.apiUrl + 'settings/contact/details/add',

    GameSelectUser: environment.apiUrl + 'Game/SelectUser',
    adminLogList: environment.apiUrl + 'admin/log/select',
    adminAction: environment.apiUrl + 'admin/action/select_for_dropdown',
    adminModule: environment.apiUrl + 'admin/module/select_for_dropdown',

    dailyReport: environment.apiUrl + 'daily/report/select',

    userGroupList: environment.apiUrl + 'usergroup/select',
    userGroupListForDropdown: environment.apiUrl + 'usergroup/select/dropdown',
    userGroupInsert: environment.apiUrl + 'usergroup/insert',
    userGroupUpdate: environment.apiUrl + 'usergroup/update',
    userGroupUpdateStatus: environment.apiUrl + 'usergroup/update/status',
    userGroupDelete: environment.apiUrl + 'usergroup/delete',
    userGroupUserInsert: environment.apiUrl + 'usergroup/user/insert',
    userGroupUserList: environment.apiUrl + 'usergroup/user/select',
    userGroupUserDelete: environment.apiUrl + 'usergroup/user/delete',

    freeCreditEventList: environment.apiUrl + 'freecreditevent/select',
    freeCreditEventUpdateStatus: environment.apiUrl + 'freecreditevent/update/status',
    freeCreditEventDelete: environment.apiUrl + 'freecreditevent/delete',
    freeCreditEventInsert: environment.apiUrl + 'freecreditevent/insert',
    freeCreditEventUpdate: environment.apiUrl + 'freecreditevent/update',
    freeCreditEventSetFreeCreditTerm: environment.apiUrl + 'freecreditevent/setfreecreditterm',
    freeCreditEventUsersSelect: environment.apiUrl + 'freecreditevent/users/select',

    promotionUsersSelect: environment.apiUrl + 'promotions/users/select',
    promotionSelectForDropdown: environment.apiUrl + 'promotions/select/dropdown',

    setSBOPlayerDefaultBetLimit: environment.apiUrl + 'sbo/set/playerdefaultbetlimit',
    updateSBOPlayerDefaultBetLimit: environment.apiUrl + 'sbo/update/playerdefaultbetlimit',
    getSBOPlayerDefaultBetLimit: environment.apiUrl + 'sbo/get/playerdefaultbetlimit',
    sboGetLeague: environment.apiUrl + 'sbo/getLeague',
    sboSetLeague: environment.apiUrl + 'sbo/set/league',
    getLeagueBetSetting: environment.apiUrl + 'sbo/get/league-bet-setting'
}

export const playtech = {
    playtechUrl: 'http://api.webet333.com/api/Default/playtech',
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
}

export const Joker = {
    EnsureUserAccount: 'CU',
    GetCredit: 'GC',
    TransferCredit: 'TC',
    Signout: 'SO',
    SetPassword: 'SP',
    AppID: 'AppID=F2NZ',
    Secret: 'Secret=hgcqgcmgyxs6n'
}

export const _918Kiss = {
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
}

export const gameBalance = {
    restoreBalance: environment.apiUrl + 'Game/Balance/Restore',
    withdrawAmountList: environment.apiUrl + 'payments/check/withdrawamount/list',

    Kiss918: environment.apiUrl + 'gamebalance/918kiss',
    Mega888: environment.apiUrl + 'gamebalance/mega888',
    Maxbet: environment.apiUrl + 'gamebalance/maxbet',
    m8: environment.apiUrl + 'gamebalance/m8',
    AG: environment.apiUrl + 'gamebalance/ag',
    DG: environment.apiUrl + 'gamebalance/dg',
    Playtech: environment.apiUrl + 'gamebalance/playtech',
    Joker: environment.apiUrl + 'gamebalance/joker',
    SexyBaccarat: environment.apiUrl + 'gamebalance/sexybaccarat',
    SA: environment.apiUrl + 'gamebalance/sa',
    Pussy888: environment.apiUrl + 'gamebalance/pussy888',
    AllBet: environment.apiUrl + 'gamebalance/allbet',
    WM: environment.apiUrl + 'gamebalance/wm',
    Pragmatic: environment.apiUrl + 'gamebalance/pragmatic',
    walletBalance: environment.apiUrl + 'customer/wallet/balance',
    YeeBet: environment.apiUrl + 'gamebalance/YeeBet',
    SBO: environment.apiUrl + 'gamebalance/SBO'
}

export const smsConst = {
    SMSbaseUrl: 'http://cloudsms.trio-mobile.com/index.php/api/bulk_mt?',
    action: 'action=send',
    api_key: 'api_key=NUC13010100006272b6dac990a5a38519c724051e6d82d30e',
    sender_id: 'sender_id=CLOUDSMS',
    content_type: 'content_type=1',
    mode: 'mode=shortcode',
    campaign: 'campaign=Webet333'
}

export const VIPSetting = {
    addVIP: environment.apiUrl + 'vipcategorysetting/insert',
    getVIP: environment.apiUrl + 'vipcategorysetting/select',

    VIPLevelList: environment.apiUrl + 'viplevel/select',
    UserVIPLevelUpdate: environment.apiUrl + 'viplevel/user/update',

    VIPFreeCreditPromotionSetting: environment.apiUrl + 'viplevel/freecredit/promotion/setting',
    VIPGiveFreeCredit: environment.apiUrl + 'viplevel/give/freecredit',
}

export const ErrorMessages = {
    unAuthorized: 'You are not authorized to access this page!!',
    PleaseProvideFromDateToDate: 'Please Provide From Date and To Date !!!'
}

export const GameRegister = {
    selectUser: environment.apiUrl + 'Game/SelectUser',

    registerAG: environment.apiUrl + 'ag/register',
    registerJoker: environment.apiUrl + 'joker/register',
    registerPlaytech: environment.apiUrl + 'playtech/register',
    register918Kiss: environment.apiUrl + '918kiss/register',
    registerM8: environment.apiUrl + 'm8/register',
    registerMaxBet: environment.apiUrl + 'MaxBet/Register',
    registerMega888: environment.apiUrl + 'mega888/register',
    registerPussy888: environment.apiUrl + 'pussy888/register',
    registerDG: environment.apiUrl + 'dg/register',
    registerSA: environment.apiUrl + 'sa/register',
    registerWM: environment.apiUrl + 'wm/register',
    registerAllBet: environment.apiUrl + 'allbet/register',
    registerSexy: environment.apiUrl + 'sexybaccarart/register',
    registerPragmatic: environment.apiUrl + 'pragmatic/register',
    registerYeeBet: environment.apiUrl + 'yeebet/register',
    registerSBO: environment.apiUrl + 'sbo/register/player'
}