using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Mapping.Game;
using Webet333.models.Request.Game;
using Webet333.models.Response.Game.JDB;
using JDBGameConst = Webet333.models.Constants.GameConst.JDB;

namespace Webet333.api.Helpers
{
    public class JDBGameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public JDBGameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion Local Variables

        #region Call Third Party API's

        internal static async Task<string> CallThirdPartyAPI(string url, Dictionary<string, string> parameter)
        {
            try
            {
                var req = new HttpRequestMessage(HttpMethod.Post, url) { Content = new FormUrlEncodedContent(parameter) };
                var httpResponseMessage = await client.SendAsync(req);

                return await httpResponseMessage.Content.ReadAsStringAsync();
            }
            catch
            {
                return string.Empty;
            }
        }

        #endregion Call Third Party API's

        #region Call Register 3rd Party API

        internal async Task<JDBDefaultResponse> CallRegisterPlayerAPI(string Username)
        {
            var url = $"{JDBGameConst.APIURL}{JDBGameConst.EndPoint.Register}";

            var dict = new Dictionary<string, string>();
            dict.Add("cert", JDBGameConst.CertKey);
            dict.Add("agentId", JDBGameConst.AgentId);
            dict.Add("userId", Username);
            dict.Add("currency", JDBGameConst.Currency);
            //dict.Add("betLimit", "");
            dict.Add("language", JDBGameConst.Language);
            dict.Add("userName", Username);

            string temp = await CallThirdPartyAPI(url, dict);

            var deserializeAPIResult = JsonConvert.DeserializeObject<JDBDefaultResponse>(temp);

            return deserializeAPIResult;
        }

        #endregion Call Register 3rd Party API

        #region JDB Game Register

        internal async Task JDBRegister(string UserId, string Username, string Response)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.JDB.Register,
                    new
                    {
                        UserId,
                        Username,
                        Response
                    });
            }
        }

        #endregion JDB Game Register

        #region Call Launch Game API 3rd Party API

        internal static async Task<JDBLoginAPIResponse> CallLaunchGameAPI(
            string Username,
            string Language,
            string IsMobileLogin)
        {
            var url = $"{JDBGameConst.APIURL}{JDBGameConst.EndPoint.Login}";

            var dict = new Dictionary<string, string>();
            dict.Add("cert", JDBGameConst.CertKey);
            dict.Add("agentId", JDBGameConst.AgentId);
            dict.Add("userId", Username);
            dict.Add("isMobileLogin", IsMobileLogin);
            dict.Add("externalURL", GameConst.BaseUrl);
            dict.Add("platform", JDBGameConst.Platform);
            dict.Add("gameType", JDBGameConst.GameType);
            //dict.Add("gameForbidden", "");
            dict.Add("language", Language);
            //dict.Add("betLimit", "");

            string temp = await CallThirdPartyAPI(url, dict);

            var deserializeAPIResult = JsonConvert.DeserializeObject<JDBLoginAPIResponse>(temp);

            return deserializeAPIResult;
        }

        #endregion Call Launch Game API 3rd Party API

        #region Call Withdraw 3rd Party API

        internal static async Task<JDBDefaultResponse> CallWithdrawAPI(string Username, decimal Amount)
        {
            var url = $"{JDBGameConst.APIURL}{JDBGameConst.EndPoint.Withdraw}";

            var dict = new Dictionary<string, string>();
            dict.Add("cert", JDBGameConst.CertKey);
            dict.Add("agentId", JDBGameConst.AgentId);
            dict.Add("userId", Username);
            dict.Add("txCode", Guid.NewGuid().ToString());
            dict.Add("withdrawType", "0");
            dict.Add("transferAmount", Amount.ToString());

            string temp = await CallThirdPartyAPI(url, dict);

            var deserializeAPIResult = JsonConvert.DeserializeObject<JDBDepositWithdrawAPIResponse>(temp);

            return deserializeAPIResult;
        }

        #endregion Call Withdraw 3rd Party API

        #region Call Deposit 3rd Party API

        internal static async Task<JDBDefaultResponse> CallDepositAPI(string Username, decimal Amount)
        {
            var url = $"{JDBGameConst.APIURL}{JDBGameConst.EndPoint.Deposit}";

            var dict = new Dictionary<string, string>();
            dict.Add("cert", JDBGameConst.CertKey);
            dict.Add("agentId", JDBGameConst.AgentId);
            dict.Add("userId", Username);
            dict.Add("txCode", Guid.NewGuid().ToString());
            dict.Add("transferAmount", Amount.ToString());

            string temp = await CallThirdPartyAPI(url, dict);

            var deserializeAPIResult = JsonConvert.DeserializeObject<JDBDepositWithdrawAPIResponse>(temp);

            return deserializeAPIResult;
        }

        #endregion Call Deposit 3rd Party API

        #region Call Betting Details 3rd Party API

        internal static async Task<dynamic> CallBettingDetailsAPI(GlobalBettingDetailsRequest request)
        {
            var url = $"{JDBGameConst.APIURL}{JDBGameConst.EndPoint.BettingDetails}";
            string timeZone = "+08:00";
            string timeformate = "yyyy-MM-ddTHH:mm:ss";

            var dict = new Dictionary<string, string>();
            dict.Add("cert", JDBGameConst.CertKey);
            dict.Add("agentId", JDBGameConst.AgentId);
            dict.Add("startTime", request.FromDate.ToString($"{timeformate}{timeZone}"));
            dict.Add("endTime", request.ToDate.ToString($"{timeformate}{timeZone}"));
            if (!string.IsNullOrWhiteSpace(request.Username)) dict.Add("userId", request.Username);
            //dict.Add("status", string.Empty);
            dict.Add("platform", JDBGameConst.Platform);
            dict.Add("gameType", JDBGameConst.GameType);
            //dict.Add("gameCode", string.Empty);
            //dict.Add("currency", string.Empty);

            HttpClientHandler handler = new HttpClientHandler()
            {
                AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
            };

            using (var httpClient = new HttpClient(handler))
            {
                using (var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, url) { Content = new FormUrlEncodedContent(dict) })
                {
                    var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);
                    var temp = await httpResponseMessage.Content.ReadAsStringAsync();
                    var response = JsonConvert.DeserializeObject<JDBBettingDetailsAPIResponse>(temp);

                    if (response.Status == JDBGameConst.SuccessResponse.Status &&
                        response.Transactions.Any())
                    {
                        foreach (var data in response.Transactions)
                        {
                            if (data.GameInfo != null) data.GameInfoData = JsonConvert.DeserializeObject<JDBBettingDetailsAPIResponseTransactionGameInfo>(data.GameInfo);
                        }

                        JDBServicesMapping JDBServicesMapping = new JDBServicesMapping();
                        var result = JDBServicesMapping.Map(response.Transactions).ToList();

                        var tempResponse = new JDBBettingDetailsAPIResponseInsert
                        {
                            Desc = response.Desc,
                            Status = response.Status,
                            Transactions = result
                        };

                        return tempResponse;
                    }

                    return response;
                }
            }
        }

        #endregion Call Betting Details 3rd Party API

        #region House Keeping

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Dispose(bool dispose)
        {
            if (dispose) Connection = string.Empty;
        }

        #endregion House Keeping
    }
}