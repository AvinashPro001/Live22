using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Response.Game.SexyBaccarat;

namespace Webet333.api.Helpers.SexyBaccarat
{
    public class SexyBaccaratGameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public SexyBaccaratGameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion Local Variables

        #region Call Register API of Sexy game

        internal static async Task<SexyBaccaratAPIResponse> CallRegisterAPI(string username, string bettingLimit)
        {
            username = Regex.Replace(username, @"[^0-9a-zA-Z]+", "");
            if (username.Length > 16)
            {
                username = username.Substring(0, 16);
            }

            var url = $"{GameConst.SexyBaccaratConst.APIURL}{GameConst.SexyBaccaratConst.CreateMember}";

            var dict = new Dictionary<string, string>();
            dict.Add("cert", GameConst.SexyBaccaratConst.Cert);
            dict.Add("agentId", GameConst.SexyBaccaratConst.AgentId);
            dict.Add("userId", username);
            dict.Add("currency", "MYR");
            dict.Add("betLimit", bettingLimit);
            dict.Add("language", GameConst.SexyBaccaratConst.Lang);

            return JsonConvert.DeserializeObject<SexyBaccaratAPIResponse>(await CallThirdPartyApi(url, dict));
        }

        #endregion Call Register API of Sexy game

        #region Call BetingLimit API of Sexy game

        internal static async Task<dynamic> CallBettingLimitAPI(string username, string betLimit)
        {
            username = Regex.Replace(username, @"[^0-9a-zA-Z]+", "");
            if (username.Length > 16)
            {
                username = username.Substring(0, 16);
            }

            var url = $"{GameConst.SexyBaccaratConst.APIURL}{GameConst.SexyBaccaratConst.BetLimit}";

            var dict = new Dictionary<string, string>();
            dict.Add("cert", GameConst.SexyBaccaratConst.Cert);
            dict.Add("agentId", GameConst.SexyBaccaratConst.AgentId);
            dict.Add("userId", username);
            dict.Add("betLimit", betLimit);

            return JsonConvert.DeserializeObject<SexyBaccaratLoginResponse>(await CallThirdPartyApi(url, dict));
        }

        #endregion Call BetingLimit API of Sexy game

        #region Call Login API of Sexy game

        internal static async Task<SexyBaccaratLoginResponse> CallLoginAPI(string username, bool isMoible)
        {
            username = Regex.Replace(username, @"[^0-9a-zA-Z]+", "");
            if (username.Length > 16)
            {
                username = username.Substring(0, 16);
            }

            var url = $"{GameConst.SexyBaccaratConst.APIURL}{GameConst.SexyBaccaratConst.Login}";

            var dict = new Dictionary<string, string>();
            dict.Add("cert", GameConst.SexyBaccaratConst.Cert);
            dict.Add("agentId", GameConst.SexyBaccaratConst.AgentId);
            dict.Add("userId", username);
            dict.Add("isMobileLogin", isMoible.ToString());
            dict.Add("gameType", GameConst.SexyBaccaratConst.gameType);
            dict.Add("platform", GameConst.SexyBaccaratConst.platform);
            dict.Add("externalURL", GameConst.SexyBaccaratConst.RedirectURL);

            return JsonConvert.DeserializeObject<SexyBaccaratLoginResponse>(await CallThirdPartyApi(url, dict));
        }

        #endregion Call Login API of Sexy game

        #region Call Depsoit API of Sexy game

        internal static async Task<SexyBaccaratDepositResponse> CallDepositAPI(string username, decimal Amount)
        {
            username = Regex.Replace(username, @"[^0-9a-zA-Z]+", "");
            if (username.Length > 16)
            {
                username = username.Substring(0, 16);
            }

            var url = $"{GameConst.SexyBaccaratConst.APIURL}{GameConst.SexyBaccaratConst.Deposit}";

            var dict = new Dictionary<string, string>();
            dict.Add("cert", GameConst.SexyBaccaratConst.Cert);
            dict.Add("agentId", GameConst.SexyBaccaratConst.AgentId);
            dict.Add("userId", username);
            dict.Add("transferAmount", Amount.ToString());
            dict.Add("txCode", RandomString());

            return JsonConvert.DeserializeObject<SexyBaccaratDepositResponse>(await CallThirdPartyApi(url, dict));
        }

        #endregion Call Depsoit API of Sexy game

        #region Call Withdraw API of Sexy game

        internal static async Task<SexybaccaratWithdrawResponse> CallWithdrawAPI(string username, decimal Amount)
        {
            username = Regex.Replace(username, @"[^0-9a-zA-Z]+", "");
            if (username.Length > 16)
            {
                username = username.Substring(0, 16);
            }

            var url = $"{GameConst.SexyBaccaratConst.APIURL}{GameConst.SexyBaccaratConst.Withdraw}";

            var dict = new Dictionary<string, string>();
            dict.Add("cert", GameConst.SexyBaccaratConst.Cert);
            dict.Add("agentId", GameConst.SexyBaccaratConst.AgentId);
            dict.Add("userId", username);
            dict.Add("transferAmount", Amount.ToString());
            dict.Add("withdrawType", "0");
            dict.Add("txCode", RandomString());

            return JsonConvert.DeserializeObject<SexybaccaratWithdrawResponse>(await CallThirdPartyApi(url, dict));
        }

        #endregion Call Withdraw API of Sexy game

        #region Sexybaccarat Register

        internal async Task<dynamic> SexyBaccaratRegister(string username, SexyBaccaratAPIResponse request, string UserId)
        {
            string response = JsonConvert.SerializeObject(request);
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.SexyBaccarat.Register, new { username, response, UserId });
                return result;
            }
        }

        #endregion Sexybaccarat Register

        #region Random Genrate

        public static string RandomString()
        {
            int size = 10;
            char[] chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray();
            byte[] data = new byte[size];

            using (RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider())
            {
                crypto.GetBytes(data);
            }

            StringBuilder result = new StringBuilder(size);

            foreach (byte b in data)
            {
                result.Append(chars[b % (chars.Length)]);
            }

            return (result.ToString());
        }

        #endregion Random Genrate

        #region Sexybaccarat Set Limit

        internal async Task<dynamic> SexyBaccaratSetBetLimit(List<long> bettingLimit, string adminId = null)
        {
            var request = new SexyBaccaratBetlimitResponse
            {
                Sexybcrt = new Sexybcrt
                {
                    Live = new Live
                    {
                        LimitId = bettingLimit
                    }
                }
            };
            string response = JsonConvert.SerializeObject(request);
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(
                    StoredProcConsts.Global.UpdateGlobalParamters,
                    new
                    {
                        Value = response,
                        Name = "SexyLimit",
                        adminId
                    });

                return result;
            }
        }

        #endregion Sexybaccarat Set Limit

        #region Call Third Party API's

        public static async Task<string> CallThirdPartyApi(string url, Dictionary<string, string> parameter)
        {
            try
            {
                var req = new HttpRequestMessage(HttpMethod.Post, url) { Content = new FormUrlEncodedContent(parameter) };
                var httpResponseMessage = await client.SendAsync(req);
                return await httpResponseMessage.Content.ReadAsStringAsync();
            }
            catch
            {
                return String.Empty;
            }
        }

        #endregion Call Third Party API's

        #region House Keeping

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            if (disposing)
            {
                Connection = string.Empty;
            }
        }

        #endregion House Keeping
    }
}