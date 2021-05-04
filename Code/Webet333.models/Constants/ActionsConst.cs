namespace Webet333.models.Constants
{
    public class ActionsConst
    {
        public const string ApiVersion = "api/v1";

        public class Account
        {
            public const string Login = "account/login";

            public const string Register = "account/register";

            public const string Profile = "account/profile";

            public const string ForgotPassword = "account/forgot_password";

            public const string ResetPasswordGetTokenData = "account/reset_password_data";

            public const string ResetPassword = "account/reset_password";

            public const string AdminInvite = "account/admin_invite";

            public const string ChangePassword = "account/change_password";

            public const string Logout = "account/logout";

            public const string EmailConfirm = "account/confirm_email";

            public const string Dashboard = "account/dashboard";

            public const string Analytics = "account/analytics";

            public const string ProfileGetBYMobileNumber = "account/getuser";

            public const string WalletMaintenanceUpdate = "account/wallet/maintenance/update";

            public const string WalletList = "account/wallet/select";

            public const string SocialMediaReference = "account/socialmediastatics";

            public const string RefKeywordSelect = "account/refkeyword/select";

            public const string RefKeywordInsert = "account/refkeyword/insert";

            public const string RefKeywordDelete = "account/refkeyword/delete";

            public const string GetLanguage = "account/getlanguage";

            public const string TrackingInsert = "account/tracking/insert";

            public const string TrackingSelect = "account/tracking/select";

            public const string BetDetailsLastUpdateSelect = "account/betdetails_lastupdate/select";

            public const string ManagerOperationInsert = "account/manager/insert";

            public const string ManagerOperationSelect = "account/manager/select";

            public const string ManagerOperationUpdate = "account/manager/update";

            public const string ManagerGamePasswordShow = "account/manager/gamepassword/show";

            public const string ContactInformationSelect = "contact/information/select";

            public const string GameResetPasswordSelect = "account/gamepassword/select";

            public const string AdminRegisterReportSelect = "account/users_register_report";

            public const string AdminBehaviourReportSelect = "account/users_behaviour_report";

            public const string ExcelDownload = "excel/download";

            public const string SmsList = "account/sms/users/list";

            public const string SendSMS = "account/sms/send/";

            public const string LastLoginTimeUpdate = "account/users/logintime/update";

            public const string NotificationUpdate = "account/notication/info/Update";

            public const string NotificationSelect = "account/notication/info/select";

            public const string GameUsername = "account/game/username";

            public const string SendOtp = "account/send/otp";

            public const string VerifiedOtp = "account/verified/otp";

            public const string ICNumberAdd = "account/icnumber/insert";

            public const string ICImageAdd = "account/icimage/insert";

            public const string ICImagesList = "account/icimage/select";

            public const string VaderPayMaintenanceSelect = "account/vaderpay/maintenance/select";

            public const string VaderPayMaintenanceUpdate = "account/vaderpay/maintenance/update";

            public const string GlobalparameterSelect = "account/globalparameter/select";

            public const string GlobalparameterUpdate = "account/globalparameter/update";

            public const string RebateSettingUpdate = "account/rebate/setting/update";
        }

        public class Payments
        {
            public const string Transaction = "payments/transactions";

            public const string SimilarnameList = "payments/withdraw/similarname/list";

            public const string PaymentStatics = "payments/statics";

            public const string DepositCheckWithoutPromotion = "payments/checkdepositwithoutpromotion";

            public const string WithdrawCheckAmountList = "payments/check/withdrawamount/list";

            public const string PaymentStaticsDetails = "payments/statics/details";

            public const string DropdownDeposit = "payments/deposit/dropdown_deposit";

            public const string DropdownBonus = "payments/deposit/dropdown_bonus";

            public const string Deposit = "payments/deposit";

            public const string DepositList = "payments/deposit/retrieve";

            public const string BonusList = "payments/bonus/retrieve";

            public const string DepositImage = "payments/deposit/image";

            public const string DepositVerify = "payments/deposit/verify";

            public const string Withdraw = "payments/withdraw";

            public const string WithdrawList = "payments/withdraw/retrieve";

            public const string WithdrawVerify = "payments/withdraw/verify";

            public const string Transfer = "payments/transfer";

            public const string TransferList = "payments/transfer/retrieve";

            public const string Statement = "payments/statement";

            public const string UserBalanceAdjust = "payments/AdjustUserBalance";

            public const string UserBalanceAdjustRetrive = "payments/AdjustUserBalanceRetrive";

            public const string UserWalletBalanceUpdate = "payments/UserWalletBalanceUpdate";

            public const string ApprovalTimeInsert = "payments/approvaltime/insert";

            public const string ApprovalTimeRetrive = "payments/approvaltime/select";

            public const string BalanceUpdate = "payments/balance/Update";
        }

        public class PaymentGateway
        {
            public const string GetPaymentGatewayURL = "payment/get/url";

            public const string PaymentAutoVerified = "online/payment/auto/verified";

            public const string PaymentVerified = "online/payment/verified";
        }

        public class Users
        {
            public const string Retrieve = "customer/list";

            public const string BankRegister = "customer/bank/register";

            public const string BankUpdate = "customer/bank/update";

            public const string UsersBalance = "customer/wallet/balance";

            public const string UsersBank = "customer/bank";

            public const string Profile = "customer/profile";

            public const string ProfileUpdate = "customer/profile/update";

            public const string ProfileChangeStatus = "customer/profile/status";

            public const string ProfileDelete = "customer/profile/delete";

            public const string UserWinloseReport = "customer/winlose/report";

            public const string AdminAdd = "admin/add";

            public const string AdminRetrieve = "admin/list";

            public const string DefaultPermissionList = "user/default_permission/retrieve";

            public const string AdminUpdate = "admin/update";

            public const string RetrieveById = "customer/list_by_id";

            public const string RetrieveForDropdown = "customer/list_for_dropdown";

            public const string AdminLogSelect = "admin/log/select";

            public const string AdminActionSelectForDropdown = "admin/action/select_for_dropdown";

            public const string AdminModuleSelectForDropdown = "admin/module/select_for_dropdown";

            public const string DailyReportSelect = "daily/report/select";
        }

        public class Promotions
        {
            public const string HtmlRetrive = "promotions/html/retrieve";

            public const string Retrive = "promotions/retrieve";

            public const string Insert = "promotions/insert";

            public const string Image = "promotions/image";

            public const string Delete = "promotions/delete";

            public const string UpdateStatus = "promotions/update/status";

            public const string Update = "promotions/update";

            public const string SelectDaily = "promotions/daily/list";

            public const string AdminRetrive = "promotions/admin/retrive";

            public const string UpdateImage = "promotions/image/update";

            public const string PromotionApplyCheck = "promotions/promotionapply/check";

            public const string PromotionApplyList = "promotions/promotionapply/select";

            public const string PromotionReport = "promotions/report";

            public const string PromotionApplyInsert = "promotions/promotionapply/insert";

            public const string PromotionGroupInsert = "promotions/group/insert";

            public const string PromotionGroupSelect = "promotions/group/select";

            public const string PromotionGroupUpdate = "promotions/group/update";

            public const string PromotionGroupDelete = "promotions/group/delete";

            public const string PromotionUsersSelect = "promotions/users/select";

            public const string PromotionSelectForDropdown = "promotions/select/dropdown";
        }

        public class Settings
        {
            public const string BankList = "settings/banks/list";

            public const string AdminAllBankList = "settings/banks/alllist";

            public const string AdminBankList = "settings/admin_bank/list";

            public const string AdminBankAdd = "settings/admin_bank/add";

            public const string AdminBankEdit = "settings/admin_bank/edit";

            public const string AdminBankImage = "settings/admin_bank/image/add";

            public const string AdminBankImageUpdate = "settings/admin_bank/image/edit";

            public const string AdminBankDelete = "settings/admin_bank/delete";

            public const string AdminBankActive = "settings/admin_bank/active";

            public const string WalletTypeAdd = "payments/wallet/types_add";

            public const string AnnouncementUserList = "settings/announcement/user/list";

            public const string AnnouncementAdminList = "settings/announcement/admin/list";

            public const string AnnouncementAdd = "settings/announcement/add";

            public const string AnnouncementUpdate = "settings/announcement/update";

            public const string AnnouncementDelete = "settings/announcement/delete";

            public const string ContactTypeSelect = "settings/contact/type/select";
            public const string ContactTypeUpdate = "settings/contact/type/update";
            public const string ContactTypeAdd = "settings/contact/type/add";
            public const string ContactDetailsSelect = "settings/contact/details/select";
            public const string ContactDetailsUpdate = "settings/contact/details/update";
            public const string ContactDetailsAdd = "settings/contact/details/add";
        }

        public class Game
        {
            public const string M8GameGetLimit = "Game/M8/GetDefaultLimit";

            public const string M8SetUsersBettingLimit = "Game/M8/SetUsersBettingLimit";

            public const string M8ResetSetLimit = "Game/M8/ResetSetlimit";

            public const string M8GameSetLimit = "Game/M8/SetDefaultLimit";

            public const string GameRegisterJoker = "Game/Register/Joker";

            public const string GameRegisterM8 = "Game/Register/M8";

            public const string GameRegisterAG = "Game/Register/AG";

            public const string GameRegisterPragmatic = "Game/Register/Pragmatic";

            public const string GameRegisterPragmaticRemains = "Game/Register/Pragmatic/Remains";

            public const string GameRegisterPlaytech = "Game/Register/Playtech";

            public const string GameRegister918Kiss = "Game/Register/918Kiss";

            public const string DownloadLinkUpdate = "Game/DownloadLink/Update";

            public const string CheckGameRegister = "Game/CheckAllGameRegister";

            public const string DownloadLinkList = "Game/DownloadLink/list";

            public const string BalacneInWallet = "Game/Balance/InWallet";

            public const string PromotionExpiry = "Game/PromotionExpiry";

            public const string ManuallyPromotionExpiry = "Game/ManuallyPromotionExpiry";

            public const string LastUpdateBettingDetail = "Game/LastUpdateBettingDetail";

            public const string RestoreList = "Game/restore/list";

            public const string DailyTurnover = "Game/DailyTurnover";

            public const string UserGameSupport = "Game/User/GameSupport";

            public const string GlobalParameter = "Game/GlobalParameters";

            public const string GetBettingLimit = "Game/GetBettingLimit";

            public const string GetBettingDetails = "Game/GetBettingDetails";

            public const string Kiss918_ResetPassword = "Game/Kiss918/ResetPassword";

            public const string Kiss918_ResetPassword_By_Admin = "Game/Kiss918/ResetPassword/ByAdmin";

            public const string AllUsers_Kiss918_ResetPassword = "Game/Kiss918_AllUsers/ResetPassword";

            public const string GameJokerRegister = "Game/Joker/Register";

            public const string GamePlaytechRegister = "Game/Playtech/Register";

            public const string Game918KissRegister = "Game/918Kiss/Register";

            public const string GameAGRegister = "Game/AG/Register";

            public const string GameM8Register = "Game/M8/Register";

            public const string UsersSelectFromGame = "Game/SelectUser";

            public const string AG_Betting_Details = "Game/AG_Betting_Details";

            public const string M8_Betting_Details = "Game/M8_Betting_Details";

            public const string Joker_Betting_Details = "Game/Joker_Betting_Details";

            public const string Kiss918_Betting_Details = "Game/918Kiss_Betting_Details";

            public const string Pussy888_Betting_Details = "Game/Pussy888_Betting_Details";

            public const string Mega888_Betting_Details = "Game/Mega888_Betting_Details";

            public const string Dg_Betting_Details = "Game/DG_Betting_Details";

            public const string Sexy_Betting_Details = "Game/Sexy_Betting_Details";

            public const string Sa_Betting_Details = "Game/SA_Betting_Details";

            public const string AllBet_Betting_Details = "Game/AllBet_Betting_Details";

            public const string WM_Betting_Details = "Game/WM_Betting_Details";

            public const string Pragmatic_Betting_Details = "Game/Pragmatic_Betting_Details";

            public const string Manually_Joker_Betting_Details = "Game/Manually/Joker_Betting_Details";

            public const string Manually_AG_Betting_Details = "Game/Manually/AG_Betting_Details";

            public const string Manually_Playtech_Betting_Details = "Game/Manually/Playtech_Betting_Details";

            public const string Manually_918Kiss_Betting_Details = "Game/Manually/918Kiss_Betting_Details";

            public const string Manually_Pussy888_Betting_Details = "Game/Manually/Pussy888_Betting_Details";

            public const string Manually_M8_Betting_Details = "Game/Manually/M8_Betting_Details";

            public const string Manually_Mega888_Betting_Details = "Game/Manually/Mega888_Betting_Details";

            public const string Manually_Maxbet_Betting_Details = "Game/Manually/Maxbet_Betting_Details";

            public const string Manually_DG_Betting_Details = "Game/Manually/DG_Betting_Details";

            public const string Manually_Sexy_Betting_Details = "Game/Manually/Sexy_Betting_Details";

            public const string Manually_SA_Betting_Details = "Game/Manually/SA_Betting_Details";

            public const string Manually_AllBet_Betting_Details = "Game/Manually/AllBet_Betting_Details";

            public const string Manually_AllBet_Betting_Details_ByUser = "Game/Manually/AllBet_Betting_Details_ByUser";

            public const string Manually_WM_Betting_Details = "Game/Manually/WM_Betting_Details";

            public const string Manually_Pragmatic_Betting_Details = "Game/Manually/Pragmatic_Betting_Details";

            public const string Playtech_Betting_Details = "Game/Playtech_Betting_Details";

            public const string Maxbet_Betting_Details = "Game/Maxbet_Betting_Details";

            public const string RebateCalculate = "Game/RebateCalculate";

            public const string GameCategory = "Game/GetCategory";

            public const string Rebate = "Game/Rebate";

            public const string AutoRebate = "Game/AutoRebate";

            public const string RebateList = "Game/Rebate/Select";

            public const string RebateDetailsList = "Game/RebateDetails/Select";

            public const string UserRebateHistory = "Game/Rebate/User/History";

            public const string RebateDelete = "Game/Rebate/Delete";

            public const string JokerBettingDetailsSave = "Game/JokerBettingDetailsSave";

            public const string Mega888BettingDetailsSave = "Game/Mega888BettingDetailsSave";

            public const string Kiss918BettingDetailsSave = "Game/918KissBettingDetailsSave";

            public const string Pussy888BettingDetailsSave = "Game/Pussy888BettingDetailsSave";

            public const string AGBettingDetailsSave = "Game/AGBettingDetailsSave";

            public const string DGBettingDetailsSave = "Game/DGBettingDetailsSave";

            public const string SexyBettingDetailsSave = "Game/SexyBettingDetailsSave";

            public const string SABettingDetailsSave = "Game/SABettingDetailsSave";

            public const string AllBetBettingDetailsSave = "Game/AllBetBettingDetailsSave";

            public const string WMBettingDetailsSave = "Game/WMBettingDetailsSave";

            public const string PragmaticBettingDetailsSave = "Game/PragmaticBettingDetailsSave";

            public const string PlaytechBettingDetailsSave = "Game/PlaytechBettingDetailsSave";

            public const string MaxBetBettingDetailsSave = "Game/MaxBetBettingDetailsSave";

            public const string M8BettingDetailsSave = "Game/M8BettingDetailsSave";

            public const string GameWalletBalance = "Game/AllWalletBalance";

            public const string GameWalletBalanceRestore = "Game/Balance/Restore";

            public const string Kiss918PlayerLog = "918kiss/playerlog";

            public const string Pussy888PlayerLog = "pussy888/playerlog";

            public const string JokerPlayerLog = "joker/playerlog";
        }

        public class GameBalance
        {
            public const string Kiss918Balance = "gamebalance/918kiss";

            public const string AgBalance = "gamebalance/ag";

            public const string PlaytechBalance = "gamebalance/playtech";

            public const string Mega888Balance = "gamebalance/mega888";

            public const string M8Balance = "gamebalance/m8";

            public const string JokerBalance = "gamebalance/joker";

            public const string MaxBetBalance = "gamebalance/maxbet";

            public const string DGBalance = "gamebalance/dg";

            public const string SexyBaccaratBalance = "gamebalance/sexybaccarat";

            public const string SABalance = "gamebalance/sa";

            public const string Pussy888Balance = "gamebalance/pussy888";

            public const string AllBetBalance = "gamebalance/allbet";

            public const string WMBalance = "gamebalance/wm";

            public const string PragmaticBalance = "gamebalance/pragmatic";

            public const string CheckM8Balance = "check/gamebalance/m8";

            public const string CheckMaxBetBalance = "check/gamebalance/maxbet";
        }

        public class TransferMoney
        {
            public const string TransferBalance = "transfer/balance";
        }

        public class Pussy888
        {
            public const string Register = "pussy888/register";
            public const string ResetPassword = "pussy888/ResetPassword";
            public const string ResetPasswordByAdmin = "pussy888/ResetPassword/ByAdmin";
            public const string AllUsers_Pussy888_ResetPassword = "pussy888/AllUsers_Pussy888_ResetPassword";
        }

        public class AllBet
        {
            public const string Register = "allbet/register";

            public const string Login = "allbet/login";

            public const string ChangePassword = "allbet/changepassword";
        }

        public class Pragmatic
        {
            public const string Register = "pragmatic/register";

            public const string Login = "pragmatic/login";

            public const string GameList = "pragmatic/game/list";

            public const string Broken = "pragmatic/broken";
        }

        public class Joker
        {
            public const string Broken = "joker/broken";

            public const string BrokenDetails = "joker/broken/details";

            public const string Register = "joker/register";
        }

        public class Kiss918
        {
            public const string Register = "918kiss/register";
        }

        public class WM
        {
            public const string Register = "wm/register";

            public const string Login = "wm/login";
        }

        public class MaxBetGame
        {
            public const string GameMaxRegister = "MaxBet/Register";

            public const string GameLogin = "MaxBet/Login";

            public const string MaxBetGameTokenUpdate = "MaxBet/token/update";

            public const string MaxBetGameDepositeWithdrawl = "MaxBet/fundtransfer";

            public const string MaxBetGameGetBalance = "MaxBet/getbalance";

            public const string MaxBetGameSetAllMemberBetSetting = "MaxBet/Set_AllMember_BetSetting";

            public const string MaxBetGameBetSetting = "MaxBet/SetBetSetting";

            public const string MaxBetGameSetDefaultMemberBetSetting = "MaxBet/Set_Default_Member_BetSetting";

            public const string ResetMemberBetSetting = "MaxBet/Reset_BetSetting";

            public const string maxbetSetMinMax = "MaxBet/MinMaxSet";

            public const string maxbetGetMinMax = "MaxBet/GetDefaultVariable";

            public const string DefaultBettingLimitSet = "MaxBet/DefaultBettingLimitSet";

            public const string UserSetMinMax = "MaxBet/User/Set/MinMax";
        }

        public class Mega888Game
        {
            public const string Mega888Register = "mega888/register";

            public const string Mega888DepositWithdraw = "mega888/deposit_withdraw";

            public const string Mega888PlayerLog = "mega888/playerlog";

            public const string Mega888Login = "mega888/login";

            public const string Mega888Logout = "mega888/logout";
        }

        public class SA
        {
            public const string SARegsiter = "sa/register";

            public const string SALogin = "sa/login";

            public const string SAWithdraw = "sa/withdraw";

            public const string SADeposit = "sa/deposit";
        }

        public class SexyBaccaratConst
        {
            public const string SexyBaccarartRegsiter = "sexybaccarart/register";

            public const string SexyBaccarartLogin = "sexybaccarart/login";

            public const string SexyBaccarartWithdraw = "sexybaccarart/withdraw";

            public const string SexyBaccarartDeposit = "sexybaccarart/deposit";

            public const string SexyBaccarartBettingDetails = "sexybaccarart/bettingdetails";

            public const string SexyBaccarartSetDefaultBetLimit = "sexybaccarart/set/default/betlimit";

            public const string SexyBaccarartSetBetLimit = "sexybaccarart/set/betlimit";
        }

        public class DGGame
        {
            public const string DGRegister = "dg/register";

            public const string DGLogin = "dg/login";

            public const string DGTransfer = "dg/transfer";

            public const string DGdefaultBetlimit = "dg/set/default/betlimit";

            public const string DGBetlimit = "dg/set/betlimit";
        }

        public class AGGame
        {
            public const string AGRegister = "ag/register";

            public const string AGLogin = "ag/login";

            public const string AGTransfer = "ag/transfer";

            public const string AgDefaultBetlimit = "ag/default/betlimit";
        }

        public class M8
        {
            public const string Register = "m8/register";

            public const string Login = "m8/login";
        }

        public class Playtech
        {
            public const string Broken = "playtech/broken";

            public const string Register = "playtech/register";
        }

        public class VIPCategory
        {
            public const string Insert = "vipcategorysetting/insert";

            public const string Select = "vipcategorysetting/select";

            public const string VIPLevelSelect = "viplevel/select";

            public const string VIPLevelUserUpdate = "viplevel/user/update";

            public const string VIPLevelUserDetails = "viplevel/user/details";

            public const string VIPLevelGiveFreeCredit = "viplevel/give/freecredit";

            public const string VIPFreeCreditPromotionSetting = "viplevel/freecredit/promotion/setting";
        }

        public class UserGroup
        {
            public const string UserGroupInsert = "usergroup/insert";

            public const string UserGroupUpdate = "usergroup/update";

            public const string UserGroupSelect = "usergroup/select";

            public const string UserGroupSelectForDropdown = "usergroup/select/dropdown";

            public const string UserGroupUpdateStatus = "usergroup/update/status";

            public const string UserGroupDelete = "usergroup/delete";

            public const string UserGroupInsertUser = "usergroup/user/insert";

            public const string UserGroupUpdateUser = "usergroup/user/update";

            public const string UserGroupDeleteUser = "usergroup/user/delete";

            public const string UserGroupSelectUser = "usergroup/user/select";
        }

        public class FreeCreditEvent
        {
            public const string FreeCreditEventInsert = "freecreditevent/insert";

            public const string FreeCreditEventUpdate = "freecreditevent/update";

            public const string FreeCreditEventSetFreeCreditTerm = "freecreditevent/setfreecreditterm";

            public const string FreeCreditEventSelect = "freecreditevent/select";

            public const string FreeCreditEventUpdateStatus = "freecreditevent/update/status";

            public const string FreeCreditEventDelete = "freecreditevent/delete";

            public const string FreeCreditEventUsersSelect = "freecreditevent/users/select";
        }
    }
}