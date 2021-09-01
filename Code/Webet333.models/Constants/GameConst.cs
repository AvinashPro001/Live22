namespace Webet333.models.Constants
{
    public class GameConst
    {
        public class GameName
        {
            public const string M8 = "M8";

            public const string AG = "AG";

            public const string Playtech = "Playtech";

            public const string Joker = "Joker";

            public const string Mega888 = "Mega888";

            public const string _918Kiss = "918 Kiss";

            public const string DG = "DG";

            public const string SexyBaccarat = "Sexy Baccarat";

            public const string SA = "SA";

            public const string Pussy888 = "Pussy888";

            public const string AllBet = "AllBet";

            public const string WM = "WM";

            public const string PragmaticPlay = "Pragmatic Play";

            public const string MaxBet = "MaxBet";

            public const string YeeBet = "YeeBet";

            public const string SBO = "SBO";

            public const string GamePlay = "GamePlay";

            public const string CQ9 = "CQ9";
        }

        public class GamesNames
        {
            public const string M8Game = "M8";

            public const string AGGame = "AG";

            public const string PlaytechGame = "PLAYTECH";

            public const string JokerGame = "JOKER";

            public const string Mega888 = "MEGA888";

            public const string _918KisGame = "918 KISS";

            public const string DGGame = "DG";

            public const string Sexy = "SEXY";

            public const string SA = "SA";

            public const string Pussy888 = "PUSSY888";

            public const string AllBet = "AllBet";

            public const string WM = "WM";

            public const string Pragmatic = "PRAGMATIC";

            public const string MaxbetGame = "MAXBET";

            public const string YeeBet = "YeeBet";

            public const string SBO = "SBO";

            public const string GamePlay = "GamePlay";
        }

#if DEBUG

        public const string BaseUrl = "https://www.uatwb3.com/";

        public const string APIUrl = "https://uatapi.wb3api.com/api/v1/";

        public class MaxBet
        {
            public const string VendorId = "u80h60lm91";

            public const string baseURL = "https://api.l0030.ig128.com/api/";

            public const string GameLaunchDesktop = "https://mkt.l0030.ig128.com/deposit_processlogin.aspx?";

            public const string GameLaunchMobile = "https://ismart.l0030.ig128.com/deposit_processlogin.aspx?";

            public const string OperatorId = "WB3";

            public const string auth = "auth";

            public const string OddsType = "1";

            public const string WalletId = "1";

            public const string Currency = "2";

            #region Betting limit Constant

            public const string SportMin = "SportMin";

            public const string SportMax = "SportMax";

            public const string SportMatch = "SportMatch";

            public const string OtherSportMin = "OtherSportMin";

            public const string OtherSportMax = "OtherSportMax";

            public const string OtherSportMatch = "OtherSportMatch";

            public const string OtherSportBall = "OtherSportBall";

            public const string MaxParleyMin = "MaxParleyMin";

            public const string MaxParleyMax = "MaxParleyMax";

            public const string MaxParleyMatch = "MaxParleyMatch";

            public const string MaxbetSportsType1Match = "MaxbetSportsType1Match";

            public const string MaxbetSportsType1Max = "MaxbetSportsType1Max";

            public const string MaxbetSportsType1Min = "MaxbetSportsType1Min";

            #endregion Betting limit Constant
        }

        public class Kiss918
        {
            public const string baseURL = "http://api.918kiss.com:9991/ashx/account/";

            public const string userInfo = "getUserInfo";

            public const string disableAccount = "disable";

            public const string authcode = "swQjTbHQdnAHUyfvgMdN";

            public const string SecretKey = "N4nnU6aQ939p733t5Etw";

            public const string WidthdrawDeposit = "setServerScore";

            public const string AddUser = "AddUser";

            public const string agent = "webet333-api";

            public const string randomUsername = "RandomUserName";

            public const string PlayerType = "11";
        }

        public class AG
        {
            public const string baseURL = "http://agent.avx99.com/API/";

            public const string Action = "TransferCredit";

            public const string VendorId = "jdWvhb3sj83fhv33";

            public const string OperatorId = "WB";

            public const string Currency = "MYR";

            public const string Deposit = "IN";

            public const string Withdraw = "OUT";

            public const string GetBalance = "GetBalance";

            public const string CreateUser = "CheckOrCreateGameAccout";

            public const string ForwardGame = "forwardGame";
        }

        public class M8
        {
            public const string baseURL = "http://apir.mywinday.com/api.aspx";

            public const string Secret = "a782988d";

            public const string agent = "0a1a";

            public const string Deposit = "deposit";

            public const string Withdraw = "withdraw";

            public const string Balance = "balance";

            public const string Update = "update";

            public const string CreateUser = "create";

            public const string login = "login";

            public const string fetch = "fetch2";

            public const string LanguageCode = "en-US";
        }

        public class Joker
        {
            public const string jokerBaseUrl = "http://api688.net:80";

            public const string AppID = "F2NZ";

            public const string Secret = "hgcqgcmgyxs6n";

            public const string EnsureUserAccount = "CU";

            public const string ListGames = "ListGames";

            public const string GetCredit = "GC";

            public const string SetPassword = "SP";
        }

        public class Playtech
        {
            public const string playtechBaseUrl = "https://kioskpublicapi.luckydragon88.com/player/";

            public const string playtechBaseUrlwithoutPlayer = "https://kioskpublicapi.luckydragon88.com/";

            public const string adminName = "GTLCMYRWEBET";

            public const string kioskname = "GTLCMYRWEBET";

            public const string GetBalance = "balance";

            public const string Create = "create";

            public const string CountryCode = "MY";

            public const string VipLevel = "1";
        }

        public class Mega888
        {
            public const string BaseUrl = "http://mgt3.36ozhushou.com/mega-cloud/api/";

            public const string BaseUrlPlayerLog = "https://10mega888.com/ashx/log/GameLog.ashx";

            public const string Register = "open.mega.user.create";

            public const string Balance = "open.mega.balance.get";

            public const string DepositWithdraw = "open.mega.balance.transfer";

            public const string Login = "open.operator.user.login";

            public const string logout = "open.mega.user.logout";

            public const string SN = "ld00";

            public const string SecretKey = "um/vaFvz5fCP3y0pRiHdV0f3AMI=";

            public const string AgentLoginId = "Mega1-350";

            public const string TotalBettingReport = "open.mega.player.total.report";

            public const string PlayerLogURL = "open.mega.player.game.log.url.get";
        }

        public class M8SetLimit
        {
            public const string Com = "Com";

            public const string Comtype = "Comtype";

            public const string Lim1 = "Lim1";

            public const string Lim2 = "Lim2";

            public const string Lim3 = "Lim3";

            public const string Lim4 = "Lim4";

            public const string Max1 = "Max1";

            public const string Max2 = "Max2";

            public const string Max3 = "Max3";

            public const string Max4 = "Max4";

            public const string Max5 = "Max5";

            public const string Max6 = "Max6";

            public const string Max7 = "Max7";

            public const string Suspend = "Suspend";
        }

        public class SAConst
        {
            public const string APIURL = "http://sai-api.sa-apisvr.com/api/api.aspx";

            public const string APIBettingURL = "http://sai-api.sa-apisvr.com/api/api.aspx";

            public const string GameLaunchURL = "https://www.sai.slgaming.net/app.aspx";

            public const string DESEncrptKey = "g9G16nTs";

            public const string SecretKey = "E9D9A79883D24BCC8D9232FF6C272441";

            public const string MD5Key = "GgaIMaiNNtg";

            public const string Curency = "MYR";

            public const string RegisterMethod = "RegUserInfo";

            public const string DepositMethod = "CreditBalanceDV";

            public const string BettingDetails = "GetAllBetDetailsForTimeIntervalDV";

            public const string WithdrawMethod = "DebitBalanceDV";

            public const string LoginMethod = "LoginRequest";

            public const string SetBetLimit = "SetBetLimit";

            public const string BalanceMethod = "GetUserStatusDV";
        }

        public class SexyBaccaratConst
        {
            public const string Cert = "IyEMzNJ6Q5XhU81udNx";

            public const string AgentId = "webetapi";

            public const string Lang = "en";

            public const string Currency = "MYR";

            public const string BettingLimit = @"{""SEXYBCRT"":{""LIVE"":{""limitId"":[340102]}}}";

            public const string APIURL = "https://testapi.onlinegames22.com/";

            public const string BettingDetailsURL = "https://tttint.onlinegames22.com/";

            public const string gameType = "LIVE";

            public const string platform = "SEXYBCRT";

            public const string CreateMember = "wallet/createMember";

            public const string Login = "wallet/doLoginAndLaunchGame";

            public const string Balance = "wallet/getBalance";

            public const string BetLimit = "wallet/updateBetLimit";

            public const string Deposit = "wallet/deposit";

            public const string Withdraw = "wallet/withdraw";

            public const string Logout = "wallet/login";

            public const string BettingDetails = "fetch/getTransactionByTxTime";

            public const string UpdateBetLimit = "wallet/updateBetLimit";

            public const string GetSummaryByBetTimeHour = "wallet/GetSummaryByBetTimeHour";

            public const string GetTransactionHistoryResult = "wallet/GetTransactionHistoryResult";

            public const string ResubmitCancelBetNotification = "wallet/ResubmitCancelbetNotification";
        }

        public class DG
        {
            public const string baseUrl = "http://api.dg99web.com/";

            public const string agentName = "DGTE0101X9";

            public const string apiKey = "14ff9feda81c4e19804d4d73bb0ce865";

            public const string register = "user/signup/";

            public const string Login = "user/login/";

            public const string Balance = "user/getBalance/";

            public const string Transfer = "account/transfer/";

            public const string BettingLimit = "game/updateLimit/";

            public const string BettingDetails = "game/getReport/";

            public const string Currency = "MYR";

            public const string WinLimit = "100000";
        }

        public class Pussy888
        {
            public const string BaseUrl = "http://api.pussy888.com/";

            public const string BettingDetailsBaseUrl = "http://api2.pussy888.com/";

            public const string AuthCode = "wpmmVDyhEMNuFAdAPbSV";

            public const string SecertKey = "4n6EV9a3nDNUb88E9477";

            public const string Register = "ashx/account/account.ashx?action=addUser";

            public const string RandomUsername = "ashx/account/account.ashx?action=RandomUserName";

            public const string GetUserInfo = "ashx/account/account.ashx?action=getUserInfo";

            public const string TransferMoney = "ashx/account/setScore.ashx?action=setServerScore";

            public const string DisableUser = "ashx/account/account.ashx?action=disable";

            public const string BettingDetails = "ashx/AgentTotalReport.ashx?";

            public const string PlayerLog = "ashx/GameLog.ashx?";

            public const string agent = "webetapi";
        }

        public class AllBet
        {
            public const string Url = "https://api3.apidemo.net:8443/";

            public const string Register = "check_or_create";

            public const string ChangePassword = "setup_client_password";

            public const string Balance = "get_balance";

            public const string transfer = "agent_client_transfer";

            public const string Login = "forward_game";

            public const string Modified = "modify_client";

            public const string BettingDetails = "betlog_pieceof_histories_in30days";

            public const string BettingDetailsByUser = "client_betlog_query";

            public const string PropertyId = "2842514";

            public const string DESKey = "vO+n2krxCNmFMSXqMdY9zadAUX8s/Uo0";

            public const string MD5Key = "B/GRkVFfXJzkFr+5S2qcnUZV5n8I0TC9jEjTa02zuvE=";

            public const string Agent = "0ingaa";
        }

        public class WM
        {
            public const string Url = "https://api.a45.me/api/public/Gateway.php";

            public const string Register = "MemberRegister";

            public const string ChangePassword = "ChangePassword";

            public const string Balance = "GetBalance";

            public const string transfer = "ChangeBalance";

            public const string Login = "SigninGame";

            public const string BettingDetails = "GetDateTimeReport";

            public const string Signature = "189aa49d918698cef7ff20b869d72916";

            public const string vendorId = "wb3twapi";
        }

        public class Pragmatic
        {
            public const string Url = "https://api.prerelease-env.biz/IntegrationService/v3/http/CasinoGameAPI/";

            public const string BettingDetailsUrl = "https://api.prerelease-env.biz/IntegrationService/v3/";

            public const string ImageUrl = "https://api.prerelease-env.biz/";

            public const string Register = "player/account/create/";

            public const string Currency = "MYR";

            public const string Balance = "balance/current/";

            public const string transfer = "balance/transfer/";

            public const string Login = "game/start/";

            public const string GameList = "getCasinoGames/";

            public const string BrokenStatus = "DataFeeds/gamerounds/incomplete/";

            public const string BettingDetails = "DataFeeds/gamerounds/";

            public const string SecretKey = "testKey";

            public const string SecureLogin = "sc_webet33";
        }

        public class SMSConst
        {
            public const string Url = "http://www.etracker.cc/bulksms/mesapi.aspx?";

            public const string User = "thvape";

            public const string Password = "778899Abc@";

            public const string Type = "0";

            public const string From = "WEBET333";

            public const string ServId = "MES01";

            public const string Title = "WEBET333";

            public const string TrioUrl = "http://cloudsms.trio-mobile.com/index.php/api/bulk_mt?";

            public const string TrioApiKey = "NUC13010100006272b6dac990a5a38519c724051e6d82d30e";

            public const string TrioSenderId = "CLOUDSMS";
        }

        public class YEEBET
        {
            public const string Url = "http://api.yeebet.vip/api/";

            public const string APPId = "xtd4M3E5YIN1";

            public const string SecretKey = "7caf026d508e35cb48136cf11d98b64c";

            public const string Currency = "MYR";

            public const string IsCreate = "1";

            public const string BettingDetailsSize = "1000";

            public static class InterfaceName
            {
                public const string Register = "register";

                public const string Login = "login";

                public const string GetBalance = "user/balance";

                public const string DepositWithdrawal = "user/dw";

                public const string GetBettingDetails = "data/getbets";

                public const string RemoveGetBettingDetails = "data/removebets";

                public const string GetBetLimit = "quota/list";

                public const string SetBetLimit = "quota/set";
            }
        }

        public class SBO
        {
            public const string URL = "http://ex-api-demo-yy.568win.com/";

            public const string CompanyKey = "2C5ACC95A9E8466FB39A444AB13CC7D2";

            public const string User = "sbotestw";

            public const string Password = "123qwe123";

            public const string Currency = "MYR";

            public const string GameLoginURL = "https:{0}&lang={1}&oddstyle={2}&theme={3}&oddsmode={4}&device={5}";

            public static class EndPoint
            {
                public const string RegisterAgent = "web-root/restricted/agent/register-agent.aspx";

                public const string RegisterPlayer = "web-root/restricted/player/register-player.aspx";

                public const string Login = "web-root/restricted/player/login.aspx";

                public const string GetLeague = "web-root/restricted/league/get-league.aspx";

                public const string SetLeague = "web-root/restricted/league/set-league-bet-setting.aspx";

                public const string SetPlayerBetLimit = "web-root/restricted/player/update-player-bet-setting-by-sportid-and-markettype.aspx";

                public const string Deposit = "web-root/restricted/player/deposit.aspx";

                public const string Withdraw = "web-root/restricted/player/withdraw.aspx";

                public const string GetPlayerBalance = "web-root/restricted/player/get-player-balance.aspx";

                public const string BettingDetails = "web-root/restricted/report/get-bet-list-by-modify-date.aspx";

                public const string GetLeagueBetSetting = "web-root/restricted/league/get-league-bet-setting.aspx";
            }

            public static class Agent
            {
                public const string Username = "AgentWeBet333UAT";

                public const string Password = "AgentWeBet333UAT";

                public const long Min = 5;

                public const long Max = 3000;

                public const long MaxPerMatch = 5000;

                /*
                 *   1: Low
                 *   2: Medium
                 *   3: High
                 *   4: VIP(ALL)
                 */

                public const int CasinoTableLimit = 1;
            }

            public static class Portfolio
            {
                public const string SportsBook = "SportsBook";

                public const string Casino = "Casino";

                public const string Games = "Games";

                public const string VirtualSports = "VirtualSports";

                public const string SeamlessGame = "SeamlessGame";

                public const string ThirdPartySportsBook = "ThirdPartySportsBook";
            }

            public static class Oddstyle
            {
                public const string MalayOdds = "MY";   //  Default

                public const string HongKongOdds = "HK";

                public const string EuroOdds = "EU";

                public const string IndonesiaOdds = "ID";
            }

            public static class Theme
            {
                public const string Black = "Black";

                public const string Blue = "Blue";

                public const string Emerald = "Emerald";

                public const string Green = "Green";

                public const string Ocean = "Ocean";

                public const string SBO = "SBO";    //  Default

                public const string Lawn = "Lawn";

                public const string SBOBETM = "SBOBET-m";

                public const string EuroLayoutM = "Euro-layout-m";

                public const string ChinaLayoutM = "China-layout-m";

                public const string SboMain = "SboMain";
            }

            public static class OddsMode
            {
                public const string Single = "single";

                public const string Double = "double";    //  default
            }

            public static class Device
            {
                public const string Desktop = "d";  //  default

                public const string Mobile = "m";
            }

            public static class MarketType
            {
                public const long All = 0;

                public const long Over_Under = 3;

                public const long Correct_Score = 4;
            }

            public static class SportType
            {
                public const long All = 0;

                public const long Soccer = 1;

                public const long Football = 3;

                public const long Others = 11;
            }

            public static class UserGroup
            {
                public const string A = "a";

                public const string B = "b";

                public const string C = "c";

                public const string D = "d";
            }

            public static class ErrorMessage
            {
                public const string Success = "No Error";
            }
        }

        public class GamePlay
        {
            public const string APIURL = "http://www.connect6play.com/doBusiness.do";

            public const string MerchantCode = "xpwebetmyr";

            public const string DESKey = "1iwsvpQ6";

            public const string SHA256Key = "3v35vr2aggPcJGUx";

            public const string Currency = "MYR";

            public const int ProductType = 76;

            public const string ProductName = "GPI";

            public const string Prefix = "02g";

            public const string GameCode = "GPI001";

            /*
             * URL  =>  https://images.b332411.com:42666/TCG_GAME_ICONS/productname/gameid.png
             * Example  =>  https://images.b332411.com:42666/TCG_GAME_ICONS/GPI/GPI200.png
             */
            public const string ImageURL = "https://images.b332411.com:42666/TCG_GAME_ICONS/{0}/{1}.png";

            /*
             * URL  =>  https://images.b332411.com:42666/TCG_GAME_ICONS/productname/languagecode/gameid.png
             * Example  =>  https://images.b332411.com:42666/TCG_GAME_ICONS/GPI/EN/GPI200.png
             */
            public const string ImageURLWithLanguage = "https://images.b332411.com:42666/TCG_GAME_ICONS/{0}/{1}/{2}.png";

            public class GameType
            {
                public const string Slot = "RNG";

                public const string Fish = "FISH";
            }

            public class GameMode
            {
                public const string Real = "1";

                public const string Trial = "0";
            }

            public class BackURL
            {
                public const string UAT = "https://uatwb3.com/";

                public const string Live = "https://webet333.com/";
            }

            public class LanguageCode
            {
                public const string TraditionalChinese = "TW";

                public const string SimplifiedChinese = "CN";

                public const string English = "EN";

                public const string Malay = "MS";
            }

            public class Method
            {
                public const string Register = "cm";

                public const string UpdatePassword = "up";

                public const string Login = "lg";

                public const string GetGameList = "tgl";

                public const string Transfer = "ft";

                public const string GetBalance = "gb";

                public const string GetBettingDetails = "bd";
            }

            public class Platform
            {
                public const string All = "all";

                public const string Web = "html5-desktop";

                public const string Mobile = "html5";
            }

            public class ClientType
            {
                public const string All = "all";

                public const string Cmputer = "pc";

                public const string Mobile = "phone";

                public const string ComputerWeb = "web";

                public const string MobileWeb = "html5";
            }

            public class FundType
            {
                public const string Deposit = "1";

                public const string Withdraw = "2";
            }
        }

        public class CQ9
        {
            public const string APIURL = "https://api.cqgame.games";

            public const string APIToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2MTI3MWZjMjczNjNjZjAwMDFhMDk3ZjkiLCJhY2NvdW50Ijoid2ViZXQzMzMiLCJvd25lciI6IjYxMjcxZmMyNzM2M2NmMDAwMWEwOTdmOSIsInBhcmVudCI6InNlbGYiLCJjdXJyZW5jeSI6Ik1ZUiIsImp0aSI6Ijk3OTE0NTE2OCIsImlhdCI6MTYyOTk1Mzk4NiwiaXNzIjoiQ3lwcmVzcyIsInN1YiI6IlNTVG9rZW4ifQ.nj2sb4HTJdrsVcdCUzToZ-km64RdUsVEyhm9g78X2Lo";

            public class EndPoint
            {
                public const string Register = "gameboy/player";

                public const string UpdatePassword = "gameboy/player/pwd";

                public const string Login = "gameboy/player/login";

                public const string GameLobby = "gameboy/player/lobbylink";

                public const string TableGameLobby = "gameboy/player/lobbylink/table";

                public const string GetBalance = "gameboy/player/balance/";

                public const string Withdraw = "gameboy/player/withdraw";

                public const string Deposit = "gameboy/player/deposit";

                public const string GetBettingDetails = "gameboy/order/view";
            }

            public class LanguageCode
            {
                public static string Chinese = "zh-cn";

                public static string English = "en";
            }
        }

#elif STAG

        public const string BaseUrl = "https://www.webet333.net/";

        public const string APIUrl = "https://api.wb3api.com/api/v1/";

        public class MaxBet
        {
            public const string VendorId = "u80h60lm91";

            public const string baseURL = "https://api.l0030.ig128.com/api/";

            public const string GameLaunchDesktop = "https://mkt.l0030.ig128.com/deposit_processlogin.aspx?";

            public const string GameLaunchMobile = "https://ismart.l0030.ig128.com/deposit_processlogin.aspx?";

            public const string OperatorId = "WB3";

            public const string auth = "auth";

            public const string OddsType = "1";

            public const string WalletId = "1";

            public const string Currency = "2";

        #region Betting limit Constant

            public const string SportMin = "SportMin";

            public const string SportMax = "SportMax";

            public const string SportMatch = "SportMatch";

            public const string OtherSportMin = "OtherSportMin";

            public const string OtherSportMax = "OtherSportMax";

            public const string OtherSportMatch = "OtherSportMatch";

            public const string OtherSportBall = "OtherSportBall";

            public const string MaxParleyMin = "MaxParleyMin";

            public const string MaxParleyMax = "MaxParleyMax";

            public const string MaxParleyMatch = "MaxParleyMatch";

            public const string MaxbetSportsType1Match = "MaxbetSportsType1Match";

            public const string MaxbetSportsType1Max = "MaxbetSportsType1Max";

            public const string MaxbetSportsType1Min = "MaxbetSportsType1Min";

        #endregion Betting limit Constant
        }

        public class Kiss918
        {
            public const string baseURL = "http://api.918kiss.com:9991/ashx/account/";

            public const string userInfo = "getUserInfo";

            public const string disableAccount = "action=disable";

            public const string authcode = "swQjTbHQdnAHUyfvgMdN";

            public const string SecretKey = "N4nnU6aQ939p733t5Etw";

            public const string WidthdrawDeposit = "setServerScore";

            public const string AddUser = "AddUser";

            public const string agent = "webet333-api";

            public const string randomUsername = "RandomUserName";

            public const string PlayerType = "1";
        }

        public class AG
        {
            public const string baseURL = "http://agent.avx99.com/API/";

            public const string Action = "TransferCredit";

            public const string VendorId = "jdWvhb3sj83fhv33";

            public const string OperatorId = "WB";

            public const string Currency = "MYR";

            public const string Deposit = "IN";

            public const string Withdraw = "OUT";

            public const string GetBalance = "GetBalance";

            public const string CreateUser = "CheckOrCreateGameAccout";

            public const string ForwardGame = "forwardGame";
        }

        public class M8
        {
            public const string baseURL = "http://apir.mywinday.com/api.aspx";

            public const string Secret = "a782988d";

            public const string agent = "0a1a";

            public const string Deposit = "deposit";

            public const string Withdraw = "withdraw";

            public const string Balance = "balance";

            public const string Update = "update";

            public const string CreateUser = "create";

            public const string login = "login";

            public const string fetch = "fetch";

            public const string LanguageCode = "en-US";
        }

        public class Joker
        {
            public const string jokerBaseUrl = "http://api688.net:80";

            public const string AppID = "F2NZ";

            public const string Secret = "hgcqgcmgyxs6n";

            public const string EnsureUserAccount = "CU";

            public const string ListGames = "ListGames";

            public const string GetCredit = "GC";

            public const string SetPassword = "SP";
        }

        public class Playtech
        {
            public const string playtechBaseUrl = "https://kioskpublicapi.luckydragon88.com/player/";

            public const string playtechBaseUrlwithoutPlayer = "https://kioskpublicapi.luckydragon88.com/";

            public const string adminName = "GTLCMYRWEBET";

            public const string kioskname = "GTLCMYRWEBET";

            public const string GetBalance = "balance";

            public const string Create = "create";

            public const string CountryCode = "MY";

            public const string VipLevel = "1";
        }

        public class Mega888
        {
            public const string BaseUrl = "http://mgt3.36ozhushou.com/mega-cloud/api/";

            public const string BaseUrlPlayerLog = "https://10mega888.com/ashx/log/GameLog.ashx";

            public const string Register = "open.mega.user.create";

            public const string Balance = "open.mega.balance.get";

            public const string DepositWithdraw = "open.mega.balance.transfer";

            public const string Login = "open.operator.user.login";

            public const string logout = "open.mega.user.logout";

            public const string SN = "ld00";

            public const string SecretKey = "um/vaFvz5fCP3y0pRiHdV0f3AMI=";

            public const string AgentLoginId = "Mega1-350";

            public const string TotalBettingReport = "open.mega.player.total.report";

            public const string PlayerLogURL = "open.mega.player.game.log.url.get";
        }

        public class M8SetLimit
        {
            public const string Com = "Com";

            public const string Comtype = "Comtype";

            public const string Lim1 = "Lim1";

            public const string Lim2 = "Lim2";

            public const string Lim3 = "Lim3";

            public const string Lim4 = "Lim4";

            public const string Max1 = "Max1";

            public const string Max2 = "Max2";

            public const string Max3 = "Max3";

            public const string Max4 = "Max4";

            public const string Max5 = "Max5";

            public const string Max6 = "Max6";

            public const string Max7 = "Max7";

            public const string Suspend = "Suspend";
        }

        public class SAConst
        {
            public const string APIURL = "http://api.sa-apisvr.com/api/api.aspx";

            public const string APIBettingURL = "http://api.sa-rpt.com/api/api.aspx";

            public const string GameLaunchURL = "https://wb3.sa-api9.com/app.aspx";

            public const string DESEncrptKey = "g9G16nTs";

            public const string SecretKey = "A8F795848AB34332A6CB392A742B8B6B";

            public const string MD5Key = "GgaIMaiNNtg";

            public const string Curency = "MYR";

            public const string RegisterMethod = "RegUserInfo";

            public const string DepositMethod = "CreditBalanceDV";

            public const string BettingDetails = "GetAllBetDetailsForTimeIntervalDV";

            public const string WithdrawMethod = "DebitBalanceDV";

            public const string LoginMethod = "LoginRequest";

            public const string SetBetLimit = "SetBetLimit";

            public const string BalanceMethod = "GetUserStatusDV";
        }

        public class SexyBaccaratConst
        {
            public const string Cert = "1jejX7yENrmDKPrI6DL";

            public const string AgentId = "wbapi";

            public const string Lang = "en";

            public const string Currency = "MYR";

            public const string BettingLimit = @"{""SEXYBCRT"":{""LIVE"":{""limitId"":[340102]}}}";

            public const string APIURL = "https://api.onlinegames22.com/";

            public const string BettingDetailsURL = "https://fetch.onlinegames22.com/";

            public const string gameType = "LIVE";

            public const string platform = "SEXYBCRT";

            public const string CreateMember = "wallet/createMember";

            public const string Login = "wallet/doLoginAndLaunchGame";

            public const string Balance = "wallet/getBalance";

            public const string BetLimit = "wallet/updateBetLimit";

            public const string Deposit = "wallet/deposit";

            public const string Withdraw = "wallet/withdraw";

            public const string Logout = "wallet/login";

            public const string BettingDetails = "fetch/getTransactionByTxTime";

            public const string UpdateBetLimit = "wallet/updateBetLimit";

            public const string GetSummaryByBetTimeHour = "wallet/GetSummaryByBetTimeHour";

            public const string GetTransactionHistoryResult = "wallet/GetTransactionHistoryResult";

            public const string ResubmitCancelBetNotification = "wallet/ResubmitCancelbetNotification";
        }

        public class DG
        {
            public const string baseUrl = "http://api.dg99web.com/";

            public const string agentName = "DG08040201";

            public const string apiKey = "1c4a3ed0a2334959be17447351af6229";

            public const string register = "user/signup/";

            public const string Login = "user/login/";

            public const string Balance = "user/getBalance/";

            public const string Transfer = "account/transfer/";

            public const string BettingLimit = "game/updateLimit/";

            public const string BettingDetails = "game/getReport/";

            public const string Currency = "MYR";

            public const string WinLimit = "100000";
        }

        public class Pussy888
        {
            public const string BaseUrl = "http://api.pussy888.com/";

            public const string BettingDetailsBaseUrl = "http://api2.pussy888.com/";

            public const string AuthCode = "wpmmVDyhEMNuFAdAPbSV";

            public const string SecertKey = "4n6EV9a3nDNUb88E9477";

            public const string Register = "ashx/account/account.ashx?action=addUser";

            public const string RandomUsername = "ashx/account/account.ashx?action=RandomUserName";

            public const string GetUserInfo = "ashx/account/account.ashx?action=getUserInfo";

            public const string TransferMoney = "ashx/account/setScore.ashx?action=setServerScore";

            public const string DisableUser = "ashx/account/account.ashx?action=disable";

            public const string BettingDetails = "ashx/AgentTotalReport.ashx?";

            public const string PlayerLog = "ashx/GameLog.ashx?";

            public const string agent = "webetapi";
        }

        public class AllBet
        {
            public const string Url = "https://api3.abgapi.net/";

            public const string Register = "check_or_create";

            public const string ChangePassword = "setup_client_password";

            public const string Balance = "get_balance";

            public const string transfer = "agent_client_transfer";

            public const string Login = "forward_game";

            public const string Modified = "modify_client";

            public const string BettingDetails = "betlog_pieceof_histories_in30days";

            public const string BettingDetailsByUser = "client_betlog_query";

            public const string PropertyId = "5470471";

            public const string DESKey = "IMQOgJ6JEyU78vLCZ0w0+E+AJhpGkc74";

            public const string MD5Key = "6qS4oBZoRJbSk/RJZxCF4ScA2mgwlF/kVrpCoaV0cDk=";

            public const string Agent = "webetyh";
        }

        public class WM
        {
            public const string Url = "https://wbwb-227.wmapi88.com/api/public/Gateway.php";

            public const string Register = "MemberRegister";

            public const string ChangePassword = "ChangePassword";

            public const string Balance = "GetBalance";

            public const string transfer = "ChangeBalance";

            public const string Login = "SigninGame";

            public const string BettingDetails = "GetDateTimeReport";

            public const string Signature = "9fc928a66fed7f548b2291a229e66b36";

            public const string vendorId = "wb3myrapi";
        }

        public class Pragmatic
        {
            public const string Url = "https://api-sg1.pragmaticplay.net/IntegrationService/v3/http/CasinoGameAPI/";

            public const string BettingDetailsUrl = "https://api-sg1.pragmaticplay.net/IntegrationService/v3/";

            public const string ImageUrl = "https://api-sg1.pragmaticplay.net/";

            public const string Register = "player/account/create/";

            public const string Currency = "MYR";

            public const string Balance = "balance/current/";

            public const string transfer = "balance/transfer/";

            public const string Login = "game/start/";

            public const string GameList = "getCasinoGames/";

            public const string BrokenStatus = "DataFeeds/gamerounds/incomplete/";

            public const string BettingDetails = "DataFeeds/gamerounds/";

            public const string SecretKey = "C9Z9Tdhg3ThbqUzP";

            public const string SecureLogin = "1xp_webet333";
        }

        public class SMSConst
        {
            public const string Url = "http://www.etracker.cc/bulksms/mesapi.aspx?";

            public const string User = "thvape";

            public const string Password = "778899Abc@";

            public const string Type = "0";

            public const string From = "WEBET333";

            public const string ServId = "MES01";

            public const string Title = "WEBET333";

            public const string TrioUrl = "http://cloudsms.trio-mobile.com/index.php/api/bulk_mt?";

            public const string TrioApiKey = "NUC13010100006272b6dac990a5a38519c724051e6d82d30e";

            public const string TrioSenderId = "CLOUDSMS";
        }

        public class YEEBET
        {
            public const string Url = "http://api.yeebet.vip/api/";

            public const string APPId = "xtd019R76QU5";

            public const string SecretKey = "1d6f1e05678290dba54ac00947404bbd";

            public const string Currency = "MYR";

            public const string IsCreate = "1";

            public const string BettingDetailsSize = "1000";

            public static class InterfaceName
            {
                public const string Register = "register";

                public const string Login = "login";

                public const string GetBalance = "user/balance";

                public const string DepositWithdrawal = "user/dw";

                public const string GetBettingDetails = "data/getbets";

                public const string RemoveGetBettingDetails = "data/removebets";

                public const string GetBetLimit = "quota/list";

                public const string SetBetLimit = "quota/set";
            }
        }

        public class SBO
        {
            public const string URL = "http://ex-api-yy.xxttgg.com/";

            public const string CompanyKey = "694F2CFB29414D059B6864702EB18460";

            public const string User = "sbowebet";

            public const string Password = "778899Abc";

            public const string Currency = "MYR";

            public const string GameLoginURL = "https:{0}&lang={1}&oddstyle={2}&theme={3}&oddsmode={4}&device={5}";

            public static class EndPoint
            {
                public const string RegisterAgent = "web-root/restricted/agent/register-agent.aspx";

                public const string RegisterPlayer = "web-root/restricted/player/register-player.aspx";

                public const string Login = "web-root/restricted/player/login.aspx";

                public const string GetLeague = "web-root/restricted/league/get-league.aspx";

                public const string SetLeague = "web-root/restricted/league/set-league-bet-setting.aspx";

                public const string SetPlayerBetLimit = "web-root/restricted/player/update-player-bet-setting-by-sportid-and-markettype.aspx";

                public const string Deposit = "web-root/restricted/player/deposit.aspx";

                public const string Withdraw = "web-root/restricted/player/withdraw.aspx";

                public const string GetPlayerBalance = "web-root/restricted/player/get-player-balance.aspx";

                public const string BettingDetails = "web-root/restricted/report/get-bet-list-by-modify-date.aspx";

                public const string GetLeagueBetSetting = "web-root/restricted/league/get-league-bet-setting.aspx";
            }

            public static class Agent
            {
                public const string Username = "AgentWeBet333LIVE";

                public const string Password = "AgentWeBet333LIVE";

                public const long Min = 5;

                public const long Max = 5000;

                public const long MaxPerMatch = 10000;

                /*
                 *   1: Low
                 *   2: Medium
                 *   3: High
                 *   4: VIP(ALL)
                 */

                public const int CasinoTableLimit = 1;
            }

            public static class Portfolio
            {
                public const string SportsBook = "SportsBook";

                public const string Casino = "Casino";

                public const string Games = "Games";

                public const string VirtualSports = "VirtualSports";

                public const string SeamlessGame = "SeamlessGame";

                public const string ThirdPartySportsBook = "ThirdPartySportsBook";
            }

            public static class Oddstyle
            {
                public const string MalayOdds = "MY";   //  Default

                public const string HongKongOdds = "HK";

                public const string EuroOdds = "EU";

                public const string IndonesiaOdds = "ID";
            }

            public static class Theme
            {
                public const string Black = "Black";

                public const string Blue = "Blue";

                public const string Emerald = "Emerald";

                public const string Green = "Green";

                public const string Ocean = "Ocean";

                public const string SBO = "SBO";    //  Default

                public const string Lawn = "Lawn";

                public const string SBOBETM = "SBOBET-m";

                public const string EuroLayoutM = "Euro-layout-m";

                public const string ChinaLayoutM = "China-layout-m";

                public const string SboMain = "SboMain";
            }

            public static class OddsMode
            {
                public const string Single = "single";

                public const string Double = "double";    //  default
            }

            public static class Device
            {
                public const string Desktop = "d";  //  default

                public const string Mobile = "m";
            }

            public static class MarketType
            {
                public const long All = 0;

                public const long Over_Under = 3;

                public const long Correct_Score = 4;
            }

            public static class SportType
            {
                public const long All = 0;

                public const long Soccer = 1;

                public const long Football = 3;

                public const long Others = 11;
            }

            public static class UserGroup
            {
                public const string A = "a";

                public const string B = "b";

                public const string C = "c";

                public const string D = "d";
            }

            public static class ErrorMessage
            {
                public const string Success = "No Error";
            }
        }

        public class GamePlay
        {
            public const string APIURL = "http://www.connect6play.com/doBusiness.do";

            public const string MerchantCode = "xpwebetmyr";

            public const string DESKey = "1iwsvpQ6";

            public const string SHA256Key = "3v35vr2aggPcJGUx";

            public const string Currency = "MYR";

            public const int ProductType = 76;

            public const string ProductName = "GPI";

            public const string Prefix = "02g";

            public const string GameCode = "GPI001";

            /*
             * URL  =>  https://images.b332411.com:42666/TCG_GAME_ICONS/productname/gameid.png
             * Example  =>  https://images.b332411.com:42666/TCG_GAME_ICONS/GPI/GPI200.png
             */
            public const string ImageURL = "https://images.b332411.com:42666/TCG_GAME_ICONS/{0}/{1}.png";

            /*
             * URL  =>  https://images.b332411.com:42666/TCG_GAME_ICONS/productname/languagecode/gameid.png
             * Example  =>  https://images.b332411.com:42666/TCG_GAME_ICONS/GPI/EN/GPI200.png
             */
            public const string ImageURLWithLanguage = "https://images.b332411.com:42666/TCG_GAME_ICONS/{0}/{1}/{2}.png";

            public class GameType
            {
                public const string Slot = "RNG";

                public const string Fish = "FISH";
            }

            public class GameMode
            {
                public const string Real = "1";

                public const string Trial = "0";
            }

            public class BackURL
            {
                public const string UAT = "https://uatwb3.com/";

                public const string Live = "https://webet333.com/";
            }

            public class LanguageCode
            {
                public const string TraditionalChinese = "TW";

                public const string SimplifiedChinese = "CN";

                public const string English = "EN";

                public const string Malay = "MS";
            }

            public class Method
            {
                public const string Register = "cm";

                public const string UpdatePassword = "up";

                public const string Login = "lg";

                public const string GetGameList = "tgl";

                public const string Transfer = "ft";

                public const string GetBalance = "gb";

                public const string GetBettingDetails = "bd";
            }

            public class Platform
            {
                public const string All = "all";

                public const string Web = "html5-desktop";

                public const string Mobile = "html5";
            }

            public class ClientType
            {
                public const string All = "all";

                public const string Cmputer = "pc";

                public const string Mobile = "phone";

                public const string ComputerWeb = "web";

                public const string MobileWeb = "html5";
            }

            public class FundType
            {
                public const string Deposit = "1";

                public const string Withdraw = "2";
            }
        }

#endif
    }
}