using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Localization;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml.Linq;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers.SexyBaccarat;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Response.Game.AG;
using Webet333.models.Response.TransferMoney;

namespace Webet333.api.Helpers
{
    public class TransferMoneyHelpers : IDisposable
    {
        #region Local Variables
        private string Connection = string.Empty;

        private IHostingEnvironment _hostingEnvironment;

        protected IStringLocalizer<BaseController> Localizer { get; set; }
        private static readonly HttpClient client = new HttpClient();
        public TransferMoneyHelpers(string Connection = null, IStringLocalizer<BaseController> Localizer = null)
        {
            this.Localizer = Localizer;
            this.Connection = Connection;
        }
        #endregion

        #region Call Third party API
        public static async Task<string> CallThirdPartyApi(string url, StringContent stringContent = null)
        {
            try
            {
                var httpResponseMessage = await client.PostAsync(url, stringContent);
                var response = await httpResponseMessage.Content.ReadAsStringAsync();
                return response;
            }
            catch (Exception ex)
            {
                return String.Empty;
            }
        }
        #endregion

        #region Game Deposit Withdraw Method

        #region Joker game Withdraw & Deposit
        internal static string GenerateHas(string plantext)
        {
            var byteData = Encoding.UTF8.GetBytes(plantext);
            var byteKey = Encoding.UTF8.GetBytes(GameConst.Joker.Secret);
            HMACSHA1 hmac = new HMACSHA1(byteKey);
            var res = Convert.ToBase64String(hmac.ComputeHash(byteData));
            string resencode = HttpUtility.UrlEncode(res);
            return resencode;
        }

        public static async Task<JokerWithdrawDepositResponse> JokerDepsoitWithdrawMethod(string userName, decimal amount)
        {
            DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Local);
            var temp = (long)DateTime.UtcNow.Subtract(UnixEpoch).TotalSeconds;

            string bodyParameter = $"Amount={amount}&Method=TC&Timestamp={temp}&Username={userName}";

            var url = $"{GameConst.Joker.jokerBaseUrl}?AppID={GameConst.Joker.AppID}&Signature={GenerateHas(bodyParameter)}";

            var stringContent = new StringContent(bodyParameter, Encoding.UTF8, "application/x-www-form-urlencoded");

            return JsonConvert.DeserializeObject<JokerWithdrawDepositResponse>(await CallThirdPartyApi(url, stringContent));
        }

        #endregion Joker game Withdraw & Deposit

        #region 918Kiss game Withdraw & Deposit

        public static async Task<Kiss918DepositWithdrawResponse> Kiss918DepsoitWithdrawMehtod(string kiss918UserName, decimal amount)
        {
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            //var DisableUrl = $"{GameConst.Kiss918.baseURL}account.ashx?" +
            //                $"action={GameConst.Kiss918.disableAccount}" +
            //                $"&userName={kiss918UserName}" +
            //                $"&time={timestamp}" +
            //                $"&authcode={GameConst.Kiss918.authcode}" +
            //                $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Kiss918.authcode.ToLower() + kiss918UserName + timestamp + GameConst.Kiss918.SecretKey.ToLower()).ToUpper()}";
            //await CallThirdPartyApi(DisableUrl, null);

            var url = $"{GameConst.Kiss918.baseURL}setScore.ashx?" +
                            $"action={GameConst.Kiss918.WidthdrawDeposit}" +
                            $"&scoreNum={amount}" +
                            $"&userName={kiss918UserName}" +
                            $"&ActionUser={GameConst.Kiss918.agent}" +
                            $"&ActionIp=192.0.1" +
                            $"&time={timestamp}" +
                            $"&authcode={GameConst.Kiss918.authcode}" +
                            $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Kiss918.authcode.ToLower() + kiss918UserName + timestamp + GameConst.Kiss918.SecretKey.ToLower()).ToUpper()}";

            return JsonConvert.DeserializeObject<Kiss918DepositWithdrawResponse>(await CallThirdPartyApi(url, null));
        }

        #endregion 918Kiss game Withdraw & Deposit

        #region AG game Withdraw & Deposit
        public static string genrate()
        {

            DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Local);
            string temp = ((long)DateTime.UtcNow.Subtract(UnixEpoch).TotalMilliseconds).ToString();
            return temp.Substring(1);

        }

        public static async Task<AgWithdrawDepsoitResponse> AGDepositWithdrawMethod(string userName, decimal amount, string Type)
        {
            var url = $"{GameConst.AG.baseURL}{GameConst.AG.Action}" +
                $"?vendor_id={GameConst.AG.VendorId}" +
                $"&operator_id={GameConst.AG.OperatorId}" +
                $"&user_id={userName}" +
                $"&currency={GameConst.AG.Currency}" +
                $"&credit={amount}" +
                $"&billno={genrate()}" +
                $"&type={Type}";

            return JsonConvert.DeserializeObject<AgWithdrawDepsoitResponse>(await CallThirdPartyApi(url, null));
        }

        #endregion AG game Withdraw & Deposit

        #region Playtech game Withdraw

        public static async Task<PlaytechWithdrawDepositResponse> PlaytechWithdrawMehtod(string userName, decimal amount, IHostingEnvironment environment)
        {
            var logoutUrl = $"{GameConst.Playtech.playtechBaseUrl}logout" +
                $"?playername={userName.ToUpper()}";

            var url = $"{GameConst.Playtech.playtechBaseUrl}withdraw" +
                $"?playername={userName.ToUpper()}" +
                $"&amount={Math.Round(amount, 2)}" +
                $"&adminname={GameConst.Playtech.adminName}";

            DefaultHelper defaultHelper = new DefaultHelper(environment);
            await defaultHelper.PlaytechAPICertificate(logoutUrl, false);
            return JsonConvert.DeserializeObject<PlaytechWithdrawDepositResponse>(await defaultHelper.PlaytechAPICertificate(url, false, true));
        }

        #endregion Playtech game Withdraw

        #region M8 game Withdraw & Deposit

        public static async Task<XDocument> M8DepsoitWithdrawMethod(string userName, decimal amount, string Method)
        {
            var url = $"{GameConst.M8.baseURL}" +
                $"?secret={GameConst.M8.Secret}" +
                $"&agent={GameConst.M8.agent}" +
                $"&username={userName}" +
                $"&action={Method}" +
                $"&serial={Guid.NewGuid().ToString()}" +
                $"&amount={amount}";

            return XDocument.Parse(await CallThirdPartyApi(url, null));
        }

        #endregion M8 game Withdraw & Deposit

        #region Playtech game Depsoit

        public static async Task<PlaytechWithdrawDepositResponse> PlaytechDepsoitMehtod(string userName, decimal amount, IHostingEnvironment environment)
        {
            var logoutUrl = $"{GameConst.Playtech.playtechBaseUrl}logout" +
                $"?playername={userName.ToUpper()}";

            var url = $"{GameConst.Playtech.playtechBaseUrl}deposit" +
                $"?playername={userName.ToUpper()}" +
                $"&amount={Math.Round(amount, 2)}" +
                $"&adminname={GameConst.Playtech.adminName}";

            DefaultHelper defaultHelper = new DefaultHelper(environment);
            await defaultHelper.PlaytechAPICertificate(logoutUrl, false);
            return JsonConvert.DeserializeObject<PlaytechWithdrawDepositResponse>(await defaultHelper.PlaytechAPICertificate(url, false, true));
        }

        #endregion Playtech game Depsoit

        #region Main Wallet Deposit & Withdraw
        public async Task<MainWalletTransferResponse> MainWalletDepositWithdraw(string UserId, decimal Amount, string Method)
        {
            using (var repository = new DapperRepository<MainWalletTransferResponse>(Connection))
            {
                var response = await repository.FindAsync(StoredProcConsts.TransferMoney.MainWalletTransfer, new { UserId, Amount, Method });
                return response;
            }
        }
        #endregion

        #endregion Game Deposit Withdraw Method

        #region Get User Details for transfer
        public async Task<UserDetailsTransferResponse> UserDetails(string UserId, string FromWallet, string ToWallet)
        {
            using (var repository = new DapperRepository<UserDetailsTransferResponse>(Connection))
            {
                var details = await repository.FindAsync(StoredProcConsts.TransferMoney.UserDetails, new { UserId, FromWallet, ToWallet });
                return details;
            }
        }
        #endregion

        #region Withdraw From Wallet
        public async Task<TransferAPIDepositWithdrawResponse> WithdrawFromWallet(UserDetailsTransferResponse UsernameResponse, string WalletName, decimal Amount, string UserId, IHostingEnvironment environment = null)
        {
            var response = new TransferAPIDepositWithdrawResponse
            {
                ErrorMessage = string.Empty,
                GameName = string.Empty,
                GameResponse = string.Empty
            };

            switch (WalletName)
            {
                case "Main Wallet":
                    try
                    {
                        var mainResponse = await MainWalletDepositWithdraw(UserId, Amount, "Withdraw");
                        if (mainResponse.ErrorCode != 0)
                        {
                            response.ErrorMessage = mainResponse.Message;
                            response.GameName = "Main Wallet";
                            response.GameResponse = mainResponse.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "Main Wallet";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "PlayTech Wallet":
                    try
                    {
                        var playtechResponse = await PlaytechWithdrawMehtod(UsernameResponse.PlaytechUserName, Amount, environment);
                        if (playtechResponse.errorcode != null)
                        {
                            response.ErrorMessage = playtechResponse.error;
                            response.GameName = "Playtech Game";
                            response.GameResponse = playtechResponse.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "PlayTech Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "Joker Wallet":
                    try
                    {
                        var jokerResponse = await JokerDepsoitWithdrawMethod(UsernameResponse.JokerUserName, -Math.Abs(Amount));
                        if (jokerResponse.Message != null)
                        {
                            response.ErrorMessage = jokerResponse.Message;
                            response.GameName = "Joker Game";
                            response.GameResponse = jokerResponse.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "Joker Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "M8 Wallet":
                    try
                    {
                        var m8Response = await M8DepsoitWithdrawMethod(UsernameResponse.M8UserName, Amount, GameConst.M8.Withdraw);
                        if (m8Response.Descendants("errcode").Single().Value != "0")
                        {
                            response.ErrorMessage = m8Response.Descendants("errtext").Single().Value;
                            response.GameName = "M8 Game";
                            response.GameResponse = m8Response.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "M8 Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "AG Wallet":
                    try
                    {
                        var agResponse = await AGDepositWithdrawMethod(UsernameResponse.AGUserName, Amount, GameConst.AG.Withdraw);
                        if (agResponse.error_code != 0)
                        {
                            response.ErrorMessage = agResponse.message;
                            response.GameName = "AG Game";
                            response.GameResponse = agResponse.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "AG Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "918Kiss Wallet":
                    try
                    {
                        var kiss918Response = await Kiss918DepsoitWithdrawMehtod(UsernameResponse._918KissUserName, -Math.Abs(Amount));
                        if (kiss918Response.code != 0)
                        {
                            response.ErrorMessage = kiss918Response.msg;
                            response.GameName = "918 Kiss Game";
                            response.GameResponse = kiss918Response.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "918 Kiss Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "MaxBet Wallet":
                    try
                    {
                        var maxbetResponse = await MaxBetGameHelper.CallMaxbetDepsoitWithdrawAPI(UsernameResponse.MaxBetUsername, Amount, 0);
                        if (maxbetResponse.ErrorCode != 0)
                        {
                            response.ErrorMessage = maxbetResponse.Message;
                            response.GameName = "Maxbet Game";
                            response.GameResponse = maxbetResponse.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "Maxbet Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "Mega888 Wallet":
                    try
                    {
                        var mega888Response = await Mega888GameHelpers.CallWithdrawDepositAPI(UsernameResponse.MegaUsername, -Math.Abs(Amount));
                        if (mega888Response.error != null)
                        {
                            response.ErrorMessage = mega888Response.error.message;
                            response.GameName = "Mega888 Game";
                            response.GameResponse = mega888Response.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "Mega888 Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "DG Wallet":
                    try
                    {
                        var dgResponse = await DGGameHelpers.CallWithdrawDepsoitAPI(UsernameResponse.DGUsername, "-" + Amount.ToString());
                        if (dgResponse.codeId != 0)
                        {
                            response.ErrorMessage = "Tranaction Failed";
                            response.GameName = "DG Game";
                            response.GameResponse = dgResponse.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "DG Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "Sexy Wallet":
                    try
                    {
                        var sexyResponse = await SexyBaccaratGameHelpers.CallWithdrawAPI(UsernameResponse.SexyUsername, Amount);
                        if (sexyResponse.status != "0000")
                        {
                            response.ErrorMessage = sexyResponse.desc;
                            response.GameName = "Sexy Game";
                            response.GameResponse = sexyResponse.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "Sexy Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "SA Wallet":
                    try
                    {
                        var saResponse = await SAGameHelpers.CallAPIWithdraw(UsernameResponse.SAUsername, Amount);
                        if (saResponse.Descendants("ErrorMsgId").Single().Value != "0")
                        {
                            response.ErrorMessage = saResponse.Descendants("ErrorMsg").Single().Value;
                            response.GameName = "SA Game";
                            response.GameResponse = saResponse.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "SA Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "Pussy888 Wallet":
                    try
                    {
                        var pussy888Response = await Pussy888GameHelpers.CallTransferAPI(UsernameResponse.Pussy888Username, -Math.Abs(Amount));
                        if (pussy888Response.code != 0)
                        {
                            response.ErrorMessage = pussy888Response.msg;
                            response.GameName = "Pussy888 Game";
                            response.GameResponse = pussy888Response.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "Pussy888 Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "AllBet Wallet":
                    try
                    {
                        var allBetResponse = await AllBetGameHelpers.DepositWithdrawCallAPI(UsernameResponse.AllBetUsername, 0, Amount);
                        if (allBetResponse.error_code != "OK")
                        {
                            response.ErrorMessage = allBetResponse.message;
                            response.GameName = "AllBet Game";
                            response.GameResponse = JsonConvert.SerializeObject(allBetResponse);
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "AllBet Game";
                        response.GameResponse = ex.Message;
                    }
                    break;

                case "WM Wallet":
                    try
                    {
                        var wmResponse = await WMGameHelpers.TransferCallAPI(UsernameResponse.WMUsername, -Math.Abs(Amount));
                        if (wmResponse.errorCode != 0)
                        {
                            response.ErrorMessage = wmResponse.errorMessage;
                            response.GameName = "WM Game";
                            response.GameResponse = JsonConvert.SerializeObject(wmResponse);
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "WM Game";
                        response.GameResponse = ex.Message;
                    }
                    break;

                case "Pragmatic Wallet":
                    try
                    {
                        var pragmaticResponse = await PragmaticGameHelpers.TransferBalance(UsernameResponse.PragmaticUsername, -Math.Abs(Amount));
                        if (pragmaticResponse.error != "0")
                        {
                            response.ErrorMessage = pragmaticResponse.description;
                            response.GameName = "Pragmatic Game";
                            response.GameResponse = JsonConvert.SerializeObject(pragmaticResponse);
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "Pragmatic Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
            }

            return response;
        }
        #endregion

        #region Deposit In Wallet
        public async Task<TransferAPIDepositWithdrawResponse> DepositInWallet(UserDetailsTransferResponse UsernameResponse, string WalletName, decimal Amount, string UserId, IHostingEnvironment environment = null)
        {
            var response = new TransferAPIDepositWithdrawResponse
            {
                ErrorMessage = string.Empty,
                GameName = string.Empty,
                GameResponse = string.Empty
            };

            switch (WalletName)
            {
                case "Main Wallet":
                    try
                    {
                        var mainResponse = await MainWalletDepositWithdraw(UserId, Amount, "Deposit");
                        if (mainResponse.ErrorCode != 0)
                        {
                            response.ErrorMessage = mainResponse.Message;
                            response.GameName = "Playtech Game";
                            response.GameResponse = mainResponse.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "Main Wallet";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "PlayTech Wallet":
                    try
                    {
                        var playtechResponse = await PlaytechDepsoitMehtod(UsernameResponse.PlaytechUserName, Amount, environment);
                        if (playtechResponse.errorcode != null)
                        {
                            response.ErrorMessage = playtechResponse.error;
                            response.GameName = "Playtech Game";
                            response.GameResponse = playtechResponse.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "PlayTech Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "Joker Wallet":
                    try
                    {
                        var jokerResponse = await JokerDepsoitWithdrawMethod(UsernameResponse.JokerUserName, Amount);
                        if (jokerResponse.Message != null)
                        {
                            response.ErrorMessage = jokerResponse.Message;
                            response.GameName = "Joker Game";
                            response.GameResponse = jokerResponse.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "Joker Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "M8 Wallet":
                    try
                    {
                        var m8Response = await M8DepsoitWithdrawMethod(UsernameResponse.M8UserName, Amount, GameConst.M8.Deposit);
                        if (m8Response.Descendants("errcode").Single().Value != "0")
                        {
                            response.ErrorMessage = m8Response.Descendants("errtext").Single().Value;
                            response.GameName = "M8 Game";
                            response.GameResponse = m8Response.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "M8 Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "AG Wallet":
                    try
                    {
                        var agResponse = await AGDepositWithdrawMethod(UsernameResponse.AGUserName, Amount, GameConst.AG.Deposit);
                        if (agResponse.error_code != 0)
                        {
                            response.ErrorMessage = agResponse.message;
                            response.GameName = "AG Game";
                            response.GameResponse = agResponse.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "AG Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "918Kiss Wallet":
                    try
                    {
                        var Kiss918Response = await Kiss918DepsoitWithdrawMehtod(UsernameResponse._918KissUserName, Amount);
                        if (Kiss918Response.code != 0)
                        {
                            response.ErrorMessage = Kiss918Response.msg;
                            response.GameName = "918 Kiss Game";
                            response.GameResponse = Kiss918Response.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "918 Kiss Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "MaxBet Wallet":
                    try
                    {
                        var maxbetResponse = await MaxBetGameHelper.CallMaxbetDepsoitWithdrawAPI(UsernameResponse.MaxBetUsername, Amount, 1);
                        if (maxbetResponse.ErrorCode != 0)
                        {
                            response.ErrorMessage = maxbetResponse.Message;
                            response.GameName = "Maxbet Game";
                            response.GameResponse = maxbetResponse.ToString();
                        }

                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "Maxbet Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "Mega888 Wallet":
                    try
                    {
                        var mega888Response = await Mega888GameHelpers.CallWithdrawDepositAPI(UsernameResponse.MegaUsername, Amount);
                        if (mega888Response.error != null)
                        {
                            response.ErrorMessage = mega888Response.error.message;
                            response.GameName = "Mega888 Game";
                            response.GameResponse = mega888Response.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "Mega888 Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "DG Wallet":
                    try
                    {
                        var dgResponse = await DGGameHelpers.CallWithdrawDepsoitAPI(UsernameResponse.DGUsername, Amount.ToString());
                        if (dgResponse.codeId != 0)
                        {
                            response.ErrorMessage = "Tranaction Failed";
                            response.GameName = "DG Game";
                            response.GameResponse = dgResponse.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "DG Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "Sexy Wallet":
                    try
                    {
                        var sexyResponse = await SexyBaccaratGameHelpers.CallDepositAPI(UsernameResponse.SexyUsername, Amount);
                        if (sexyResponse.status != "0000")
                        {
                            response.ErrorMessage = sexyResponse.desc;
                            response.GameName = "Sexy Game";
                            response.GameResponse = sexyResponse.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "Sexy Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "SA Wallet":
                    try
                    {
                        var saResponse = await SAGameHelpers.CallAPIDeposit(UsernameResponse.SAUsername, Amount);
                        if (saResponse.Descendants("ErrorMsgId").Single().Value != "0")
                        {
                            response.ErrorMessage = saResponse.Descendants("ErrorMsg").Single().Value;
                            response.GameName = "SA Game";
                            response.GameResponse = saResponse.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "SA Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "Pussy888 Wallet":
                    try
                    {
                        var pussy888Response = await Pussy888GameHelpers.CallTransferAPI(UsernameResponse.Pussy888Username, Amount);
                        if (pussy888Response.code != 0)
                        {
                            response.ErrorMessage = pussy888Response.msg;
                            response.GameName = "Pussy888 Game";
                            response.GameResponse = pussy888Response.ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "Pussy888 Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "AllBet Wallet":
                    try
                    {
                        var allBetResponse = await AllBetGameHelpers.DepositWithdrawCallAPI(UsernameResponse.AllBetUsername, 1, Amount);
                        if (allBetResponse.error_code != "OK")
                        {
                            response.ErrorMessage = allBetResponse.message;
                            response.GameName = "AllBet Game";
                            response.GameResponse = JsonConvert.SerializeObject(allBetResponse);
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "AllBet Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "WM Wallet":
                    try
                    {
                        var wmResponse = await WMGameHelpers.TransferCallAPI(UsernameResponse.WMUsername, Amount);
                        if (wmResponse.errorCode != 0)
                        {
                            response.ErrorMessage = wmResponse.errorMessage;
                            response.GameName = "WM Game";
                            response.GameResponse = JsonConvert.SerializeObject(wmResponse);
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "WM Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
                case "Pragmatic Wallet":
                    try
                    {
                        var pragmaticResponse = await PragmaticGameHelpers.TransferBalance(UsernameResponse.PragmaticUsername, Amount);
                        if (pragmaticResponse.error != "0")
                        {
                            response.ErrorMessage = pragmaticResponse.description;
                            response.GameName = "Pragmatic Game";
                            response.GameResponse = JsonConvert.SerializeObject(pragmaticResponse);
                        }
                    }
                    catch (Exception ex)
                    {
                        response.ErrorMessage = Localizer["error_transaction_failed"].Value;
                        response.GameName = "Pragmatic Game";
                        response.GameResponse = ex.Message;
                    }
                    break;
            }

            return response;
        }
        #endregion

        #region Transfer Insert
        public async Task Transfer(string UserId, string FromWalletId, string ToWalletId, decimal Amount, string AddedBy, string Verified, string VerifiedBy)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.TransferMoney.TransferInsert, new { UserId, FromWalletId, ToWalletId, Amount, AddedBy, VerifiedBy, Verified });
            }
        }
        #endregion


        #region UserBalance IsBegin Update
        public async Task UserBalanceIsBeginUpdate(string UserId, bool IsBegin)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.TransferMoney.UserBalanceIsBeginUpdate, new { UserId, IsBegin});
            }
        }
        #endregion

        #region House Keeping
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Dispose(bool dispose)
        {
            if (dispose)
            {
                Connection = string.Empty;
            }
        }
        #endregion
    }
}
