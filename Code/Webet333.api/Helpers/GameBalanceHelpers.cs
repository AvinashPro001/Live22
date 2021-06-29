using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Xml.Linq;
using Webet333.api.Helpers.SexyBaccarat;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request.Game.DG;
using Webet333.models.Request.Game.SBO;
using Webet333.models.Response.Game.AllBet;
using Webet333.models.Response.Game.DG;
using Webet333.models.Response.Game.MAXBet;
using Webet333.models.Response.Game.Pragmatic;
using Webet333.models.Response.Game.SBO;
using Webet333.models.Response.Game.SexyBaccarat;
using Webet333.models.Response.Game.WM;
using Webet333.models.Response.Game.YEEBET;

namespace Webet333.api.Helpers
{
    public class GameBalanceHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public GameBalanceHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion Local Variables

        #region Call Third Party Game Balance API's

        #region Call Third Party API's

        public static async Task<string> CallThirdPartyApi(string url, StringContent stringContent = null)
        {
            try
            {
                var httpResponseMessage = await client.PostAsync(url, stringContent);
                return await httpResponseMessage.Content.ReadAsStringAsync();
            }
            catch
            {
                return String.Empty;
            }
        }

        #endregion Call Third Party API's

        #region Call API of 918 Kiss game

        public async Task<string> Call918KissGameBalance(string kiss918UserName)
        {
            string Kiss918Balance = null;
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            var kiss918URL = $"{GameConst.Kiss918.baseURL}account.ashx?" +
                            $"action={GameConst.Kiss918.userInfo}" +
                            $"&userName={kiss918UserName}" +
                            $"&time={timestamp}" +
                            $"&authcode={GameConst.Kiss918.authcode}" +
                            $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Kiss918.authcode.ToLower() + kiss918UserName + timestamp + GameConst.Kiss918.SecretKey.ToLower()).ToUpper()}";
            try
            {
                dynamic resultKiss918 = JsonConvert.DeserializeObject(await CallThirdPartyApi(kiss918URL, null));
                Kiss918Balance = resultKiss918 != null ? (resultKiss918.success == true ? resultKiss918.ScoreNum : null) : null;
            }
            catch (Exception ex)
            {
                Kiss918Balance = null;
            }

            return Kiss918Balance;
        }

        #endregion Call API of 918 Kiss game

        #region Call API of Mega888 game

        public async Task<string> CallMegaGameBalance(string mega888LoginId)
        {
            string Mega888Balance = null;
            var random = Guid.NewGuid().ToString();

            var mega888Url = $"{GameConst.Mega888.BaseUrl}"
                             + $"{GameConst.Mega888.Balance}"
                             + $"?random={random}"
                             + $"&digest={SecurityHelpers.MD5EncrptText(random + GameConst.Mega888.SN + mega888LoginId + GameConst.Mega888.SecretKey)}"
                             + $"&sn={GameConst.Mega888.SN}"
                             + $"&method={GameConst.Mega888.Balance}"
                             + $"&loginId={mega888LoginId}";
            try
            {
                dynamic resultMega888 = JsonConvert.DeserializeObject(await CallThirdPartyApi(mega888Url, null));
                Mega888Balance = Convert.ToString(resultMega888.error) == "" ? resultMega888.result : null;
            }
            catch (Exception ex)
            {
                Mega888Balance = null;
            }

            return Mega888Balance;
        }

        #endregion Call API of Mega888 game

        #region Call API of Joker game

        public async Task<dynamic> CallJokerGameBalance(string username, bool returnData = false)
        {
            username = Regex.Replace(username, @"[^0-9a-zA-Z]+", "");
            DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Local);
            var temp = (long)DateTime.UtcNow.Subtract(UnixEpoch).TotalSeconds;
            var perameter = $"Method={GameConst.Joker.GetCredit}&Timestamp={temp}&Username={username}";
            var stringContent = new StringContent(perameter, Encoding.UTF8, "application/x-www-form-urlencoded");

            var jokerURL = $"{GameConst.Joker.jokerBaseUrl}?" +
                            $"AppID={GameConst.Joker.AppID}&" +
                            $"Signature={GameHelpers.GenerateHas(perameter)}";

            string JokerBalance = null, status = null;
            try
            {
                dynamic resultJoker = JsonConvert.DeserializeObject(await GameBalanceHelpers.CallThirdPartyApi(jokerURL, stringContent));

                if (returnData)
                    return resultJoker;

                JokerBalance = resultJoker.Credit == null ? null : resultJoker.Credit;
                status = Convert.ToDecimal(resultJoker.OutstandingCredit) > 0 ? "waiting" : "completed";
            }
            catch (Exception ex)
            {
                JokerBalance = null;
                status = "waiting";
            }

            if (returnData)
                return null;

            return new { JokerBalance, status };
        }

        #endregion Call API of Joker game

        #region Call API of Maxbet game

        public async Task<string> CallMaxbetGameBalance(string VendorMemberId)
        {
            var parameter = $"vendor_id={GameConst.MaxBet.VendorId}" +
                   $"&vendor_member_ids={VendorMemberId}" +
                   $"&wallet_id={GameConst.MaxBet.WalletId}";

            var url = $"{GameConst.MaxBet.baseURL}CheckUserBalance?{parameter}";

            string MaxbetBalance = null;

            try
            {
                var responseString = await MaxBetGameHelper.CallThirdPartyApi(url, parameter);
                var resultMaxBet = JsonConvert.DeserializeObject<MaxbetBalanceResponse>(responseString);
                MaxbetBalance = resultMaxBet.ErrorCode == 0 ? resultMaxBet.Data.FirstOrDefault().Balance == null ? "0.0" : resultMaxBet.Data.FirstOrDefault().Balance : null;
            }
            catch (Exception ex)
            {
                MaxbetBalance = null;
            }

            return MaxbetBalance;
        }

        #endregion Call API of Maxbet game

        #region Call API of M8 game

        public async Task<string> CallM8GameBalance(string username)
        {
            var M8URL = $"{GameConst.M8.baseURL}?" +
                        $"action={GameConst.M8.Balance}&" +
                        $"secret={GameConst.M8.Secret}&" +
                        $"agent={GameConst.M8.agent}&" +
                        $"username={username.Trim()}";

            string M8Balance = null;
            try
            {
                var resultM8 = XDocument.Parse(await GameBalanceHelpers.CallThirdPartyApi(M8URL, null));
                M8Balance = resultM8.Descendants("result").Single().Value == "" ? null : resultM8.Descendants("result").Single().Value;
            }
            catch (Exception ex)
            {
                M8Balance = null;
            }

            return M8Balance;
        }

        #endregion Call API of M8 game

        #region Call API of AG game

        public async Task<string> CallAGGameBalance(string username)
        {
            var agURL = $"{GameConst.AG.baseURL}" +
                             $"{GameConst.AG.GetBalance}" +
                             $"?vendor_id={GameConst.AG.VendorId}" +
                             $"&operator_id={GameConst.AG.OperatorId}" +
                             $"&currency={GameConst.AG.Currency}" +
                             $"&user_id={username}";

            string AGBalance = null;
            try
            {
                dynamic resultAG = JsonConvert.DeserializeObject(await GameBalanceHelpers.CallThirdPartyApi(agURL, null));
                AGBalance = resultAG.amount == null ? null : resultAG.amount;
            }
            catch (Exception ex)
            {
                AGBalance = null;
            }

            return AGBalance;
        }

        #endregion Call API of AG game

        #region Call API of Playtech game

        public async Task<string> CallPlaytechGameBalance(string username, IHostingEnvironment _hostingEnvironment)
        {
            username = Regex.Replace(username, "#", "");
            var PlaytechURL = $"{GameConst.Playtech.playtechBaseUrl}" +
                               $"balance?playername={username.ToUpper()}";

            string PlaytechBalance = null;
            DefaultHelper defaultHelper = new DefaultHelper(_hostingEnvironment);
            try
            {
                dynamic resultPlaytech = JsonConvert.DeserializeObject(await defaultHelper.PlaytechAPICertificate(PlaytechURL, true));
                PlaytechBalance = resultPlaytech.result.balance == null ? null : resultPlaytech.result.balance;
            }
            catch (Exception ex)
            {
                PlaytechBalance = null;
            }

            return PlaytechBalance;
        }

        #endregion Call API of Playtech game

        #region Call API of DG game

        public async Task<string> CallDGGameBalance(string username)
        {
            var random = DGGameHelpers.RandomString();
            var apiRequest = new DGAPIGetBalanceRequest
            {
                token = SecurityHelpers.MD5EncrptText(GameConst.DG.agentName + GameConst.DG.apiKey + random),
                random = random,
                member = new Username
                {
                    username = username,
                }
            };

            var url = $"{GameConst.DG.baseUrl}{GameConst.DG.Balance}{GameConst.DG.agentName}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(apiRequest), Encoding.UTF8, "application/json");

            var result = JsonConvert.DeserializeObject<DgApiBalanceResponse>(await GameBalanceHelpers.CallThirdPartyApi(url, stringContent));

            return result.codeId == 0 ? result.member.balance.ToString() : null;
        }

        #endregion Call API of DG game

        #region Call API of Sexy game

        public async Task<string> CallSexyGameBalance(string username)
        {
            username = Regex.Replace(username, @"[^0-9a-zA-Z]+", "");
            if (username.Length > 16)
            {
                username = username.Substring(0, 16);
            }

            var url = $"{GameConst.SexyBaccaratConst.APIURL}{GameConst.SexyBaccaratConst.Balance}";

            var dict = new Dictionary<string, string>();
            dict.Add("cert", GameConst.SexyBaccaratConst.Cert);
            dict.Add("agentId", GameConst.SexyBaccaratConst.AgentId);
            dict.Add("userIds", username);
            dict.Add("isOffline", "0");
            dict.Add("isFilterBalance", "0");
            dict.Add("alluser", "0");

            string balance = null;
            try
            {
                var response = JsonConvert.DeserializeObject<SexyBaccaratGameBalanceResponse>(await SexyBaccaratGameHelpers.CallThirdPartyApi(url, dict));

                if (response.status == "0000")
                    balance = response.results[0].balance.ToString();
            }
            catch (Exception ex)
            {
                try
                {
                    dynamic response = JsonConvert.DeserializeObject(await SexyBaccaratGameHelpers.CallThirdPartyApi(url, dict));
                    if (response.status == "0000")
                        balance = response.results[username.ToLower()];
                }
                catch
                {
                    balance = null;
                }
            }

            return balance;
        }

        #endregion Call API of Sexy game

        #region Call API of SA game

        public async Task<string> CallSAGameBalance(string username)
        {
            username = Regex.Replace(username, @"[^0-9a-zA-Z]+", "");
            if (username.Length > 20)
            {
                username = username.Substring(0, 20);
            }
            var time = DateTime.Now.ToString("yyyyMMddhhmmss");
            var qs = $"method={GameConst.SAConst.BalanceMethod}" +
                    $"&Key={GameConst.SAConst.SecretKey}" +
                    $"&Time={time}" +
                    $"&Username={username}";

            var tokenQ = HttpUtility.UrlEncode(SecurityHelpers.DESEncrptText(qs, GameConst.SAConst.DESEncrptKey));
            var tokenS = SecurityHelpers.MD5EncrptText(qs + GameConst.SAConst.MD5Key + time + GameConst.SAConst.SecretKey);

            var Url = $"{GameConst.SAConst.APIURL}?q={tokenQ}&s={tokenS}";
            string balance = null;
            try
            {
                var response = XDocument.Parse(await GameHelpers.CallThirdPartyApi(Url));
                balance = response.Descendants("ErrorMsgId").Single().Value == "0" ? response.Descendants("Balance").Single().Value : null;
            }
            catch (Exception ex)
            {
                balance = null;
            }

            return balance;
        }

        #endregion Call API of SA game

        #region Call API of Pussy888 game

        public async Task<string> CallPussy888GameBalance(string Pussy888UserName)
        {
            string Pussy888Balance = null;
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            var Pussy888URL = $"{GameConst.Pussy888.BaseUrl}{GameConst.Pussy888.GetUserInfo}" +
                            $"&userName={Pussy888UserName}" +
                            $"&time={timestamp}" +
                            $"&authcode={GameConst.Pussy888.AuthCode}" +
                            $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Pussy888.AuthCode.ToLower() + Pussy888UserName + timestamp + GameConst.Pussy888.SecertKey.ToLower()).ToUpper()}";
            try
            {
                dynamic resultPussy888 = JsonConvert.DeserializeObject(await CallThirdPartyApi(Pussy888URL, null));
                Pussy888Balance = resultPussy888 != null ? (resultPussy888.success == true ? resultPussy888.ScoreNum : null) : null;
            }
            catch (Exception ex)
            {
                Pussy888Balance = null;
            }

            return Pussy888Balance;
        }

        #endregion Call API of Pussy888 game

        #region Call API of AllBet game

        public async Task<string> CallAllBetGameBalance(string Username, string Password)
        {
            Username = Regex.Replace(Username, @"[^0-9a-zA-Z]+", "");
            Password = Regex.Replace(Password, @"[^0-9a-zA-Z]+", "");
            if (Password.Length > 12)
                Password = Password.Substring(0, 12);

            string allBetBalance = null;

            var Parameter = $"random={AllBetGameHelpers.Random()}&client={Username}&password={Password}";
            var Url = $"{GameConst.AllBet.Url}{GameConst.AllBet.Balance}";

            try
            {
                var resultAllBet = JsonConvert.DeserializeObject<AllBetGameBalanceResponse>(await AllBetGameHelpers.CallAPI(Url, Parameter));
                allBetBalance = resultAllBet != null ? (resultAllBet.error_code == "OK" ? resultAllBet.balance : null) : null;
            }
            catch (Exception ex)
            {
                allBetBalance = null;
            }

            return allBetBalance;
        }

        #endregion Call API of AllBet game

        #region Call API of WM Game

        public async Task<string> CallWMGameBalance(string Username, int lang = 1)
        {
            string wmBalance = null;
            var Parameter = $"cmd={GameConst.WM.Balance}&vendorId={GameConst.WM.vendorId}&signature={GameConst.WM.Signature}&user={Username}&syslang={lang}";
            var Url = $"{GameConst.WM.Url}?{Parameter}";
            try
            {
                var resultWM = JsonConvert.DeserializeObject<WMResponse>(await GameHelpers.CallThirdPartyApi(Url));
                wmBalance = resultWM != null ? (resultWM.errorCode == 0 ? resultWM.result : null) : null;
            }
            catch (Exception ex)
            {
                wmBalance = null;
            }
            return wmBalance;
        }

        #endregion Call API of WM Game

        #region Call API of Pragmatic Game

        public async Task<string> CallPragmaticGameBalance(string Username, int lang = 1)
        {
            string pragmaticBalance = null;
            var Parameter = $"externalPlayerId={Username}&secureLogin={GameConst.Pragmatic.SecureLogin}";
            var Url = $"{GameConst.Pragmatic.Url}{GameConst.Pragmatic.Balance}";
            try
            {
                var resultPragmatic = JsonConvert.DeserializeObject<PragmaticBalanceResponse>(await PragmaticGameHelpers.CallAPI(Url, Parameter));
                pragmaticBalance = resultPragmatic != null ? (resultPragmatic.error == "0" ? resultPragmatic.balance.ToString() : null) : null;
            }
            catch (Exception ex)
            {
                pragmaticBalance = null;
            }
            return pragmaticBalance;
        }

        #endregion Call API of Pragmatic Game

        #region Call API of YEEBET Game

        public async Task<string> CallYEEBETGameBalance(string Username, int lang = 1)
        {
            string YEEBETBalance = null;

            var temp = $"appid={GameConst.YEEBET.APPId}&" +
               $"username={Username}";

            var tempMD5 = SecurityHelpers.MD5EncrptText($"{temp}&key={GameConst.YEEBET.SecretKey}");

            var Parameter = $"{temp}&sign={tempMD5}";

            var Url = $"{GameConst.YEEBET.Url}{GameConst.YEEBET.InterfaceName.GetBalance}?{Parameter}";

            try
            {
                var resultYEEBET = JsonConvert.DeserializeObject<YEEBETBalanceResponse>(await GameHelpers.CallThirdPartyApi(Url));

                YEEBETBalance = resultYEEBET != null ? (resultYEEBET.result == 0 ? resultYEEBET.balance.ToString() : null) : null;
            }
            catch (Exception ex)
            {
                YEEBETBalance = null;
            }

            return YEEBETBalance;
        }

        #endregion Call API of YEEBET Game

        #region Call API of SBO Game

        internal async Task<string> CallSBOGameBalance(string Username, int lang = 1)
        {
            string balance = null;

            SBOGetPlayerBalanceRequest model = new SBOGetPlayerBalanceRequest
            {
                CompanyKey = GameConst.SBO.CompanyKey,
                ServerId = DateTimeOffset.Now.ToUnixTimeSeconds().ToString(),
                Username = Username
            };

            var URL = $"{GameConst.SBO.URL}{GameConst.SBO.EndPoint.GetPlayerBalance}";

            try
            {
                var stringContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");

                var APIResult = await GameHelpers.CallThirdPartyApi(URL, stringContent);

                var DeserializeAPIResult = JsonConvert.DeserializeObject<SBOGetPlayerBalanceResponse>(APIResult);

                balance = DeserializeAPIResult != null ? (DeserializeAPIResult.Error.Id == 0 ? DeserializeAPIResult.Balance.ToString() : null) : null;
            }
            catch (Exception ex)
            {
                balance = null;
            }

            return balance;
        }

        #endregion Call API of SBO Game

        #endregion Call Third Party Game Balance API's

        #region Update ALL games balance in db

        #region Main balance 

        internal async Task<dynamic> MainBalance(string UserId)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result=await repository.FindAsync(StoredProcConsts.User.GetWalletBalance, new { UserId, WalletName= "Main Wallet" });
                return result;
            }
        }

        #endregion Main balance 

        #region Kiss 918 balance update

        internal async Task<dynamic> Kiss918BalanceUpdate(string UserId, string Amount)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.GameBalance.Kiss918GameBalanceUpdate, new { UserId, Amount });
            }
        }

        #endregion Kiss 918 balance update

        #region Mega 888 balance update

        internal async Task<dynamic> Mega888BalanceUpdate(string UserId, string Amount)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.GameBalance.Mega888GameBalanceUpdate, new { UserId, Amount });
            }
        }

        #endregion Mega 888 balance update

        #region Joker balance update

        internal async Task<dynamic> JokerBalanceUpdate(string UserId, string Amount, string Status)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.GameBalance.JokerGameBalanceUpdate, new { UserId, Amount, Status });
            }
        }

        #endregion Joker balance update

        #region M8 balance update

        internal async Task<dynamic> M8BalanceUpdate(string UserId, string Amount)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.GameBalance.M8GameBalanceUpdate, new { UserId, Amount });
            }
        }

        #endregion M8 balance update

        #region MaxBet balance update

        internal async Task<dynamic> MaxBetBalanceUpdate(string UserId, string Amount)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.GameBalance.MaxbetGameBalanceUpdate, new { UserId, Amount });
            }
        }

        #endregion MaxBet balance update

        #region AG balance update

        internal async Task<dynamic> AGBalanceUpdate(string UserId, string Amount)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.GameBalance.AgGameBalanceUpdate, new { UserId, Amount });
            }
        }

        #endregion AG balance update

        #region Playtech balance update

        internal async Task<dynamic> PlaytechBalanceUpdate(string UserId, string Amount)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.GameBalance.PlaytechGameBalanceUpdate, new { UserId, Amount });
            }
        }

        #endregion Playtech balance update

        #region DG balance update

        internal async Task<dynamic> DGBalanceUpdate(string UserId, string Amount)
        {
            using (var respository = new DapperRepository<dynamic>(Connection))
            {
                return await respository.FindAsync(StoredProcConsts.GameBalance.DGGameBalanceUpdate, new { UserId, Amount });
            }
        }

        #endregion DG balance update

        #region Sexy balance update

        internal async Task<dynamic> SexyBalanceUpdate(string UserId, string Amount)
        {
            using (var respository = new DapperRepository<dynamic>(Connection))
            {
                return await respository.FindAsync(StoredProcConsts.GameBalance.SexyGameBalanceUpdate, new { UserId, Amount });
            }
        }

        #endregion Sexy balance update

        #region SA balance update

        internal async Task<dynamic> SABalanceUpdate(string UserId, string Amount)
        {
            using (var respository = new DapperRepository<dynamic>(Connection))
            {
                return await respository.FindAsync(StoredProcConsts.GameBalance.SABalanceUpdate, new { UserId, Amount });
            }
        }

        #endregion SA balance update

        #region Pussy888 balance update

        internal async Task<dynamic> Pussy888BalanceUpdate(string UserId, string Amount)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.GameBalance.Pussy888GameBalanceUpdate, new { UserId, Amount });
            }
        }

        #endregion Pussy888 balance update

        #region AllBet balance update

        internal async Task<dynamic> AllBetBalanceUpdate(string UserId, string Amount)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.GameBalance.AllBetGameBalanceUpdate, new { UserId, Amount });
            }
        }

        #endregion AllBet balance update

        #region WM balance update

        internal async Task<dynamic> WMBalanceUpdate(string UserId, string Amount)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.GameBalance.WMGameBalanceUpdate, new { UserId, Amount });
            }
        }

        #endregion WM balance update

        #region Pragmatic balance update

        internal async Task<dynamic> PragmaticBalanceUpdate(string UserId, string Amount)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.GameBalance.PragmaticBalanceUpdate, new { UserId, Amount });
            }
        }

        #endregion Pragmatic balance update

        #region YEEBET Balance Update

        internal async Task<dynamic> YEEBETBalanceUpdate(string UserId, string Amount)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(
                    StoredProcConsts.GameBalance.YEEBETGameBalanceUpdate,
                    new
                    {
                        UserId,
                        Amount
                    });
            }
        }

        #endregion YEEBET Balance Update

        #region SBO Balance Update

        internal async Task<dynamic> SBOBalanceUpdate(string UserId, string Amount)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(
                    StoredProcConsts.GameBalance.SBOGameBalanceUpdate,
                    new
                    {
                        UserId,
                        Amount
                    });
            }
        }

        #endregion SBO Balance Update

        #endregion Update ALL games balance in db

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

        #endregion House Keeping
    }
}