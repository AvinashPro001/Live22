using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request.Game.DG;
using Webet333.models.Response.Game.DG;

namespace Webet333.api.Helpers
{
    public class DGGameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public DGGameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion

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
        #endregion

        #region Dg Game Register API

        internal static async Task<DgApiResponse> CallRegisterAPI(string username, string password,string bettingLimit)
        {
            var random = RandomString();

            var apiRequest = new DgApiRegisterRequest
            {
                token = SecurityHelpers.MD5EncrptText(GameConst.DG.agentName + GameConst.DG.apiKey + random),
                random = random,
                data = bettingLimit,
                member = new Member
                {
                    username = username,
                    password = password,
                    currencyName = GameConst.DG.Currency,
                    winLimit = GameConst.DG.WinLimit
                }
            };

            var url = $"{GameConst.DG.baseUrl}{GameConst.DG.register}{GameConst.DG.agentName}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(apiRequest), Encoding.UTF8, "application/json");
            return JsonConvert.DeserializeObject<DgApiResponse>(await GameHelpers.CallThirdPartyApi(url, stringContent));
        }

        #endregion

        #region Dg Game Login API

        internal static async Task<DgApiLoginResponse> CallLoginAPI(string username, string password,string language )
        {
            var random = DGGameHelpers.RandomString();
            var apiRequest = new DgApiLoginRequest
            {

                token = SecurityHelpers.MD5EncrptText(GameConst.DG.agentName + GameConst.DG.apiKey + random),
                random = random,
                lang = language == LanguageConst.English ? "en" : "cn",
                domains = "1",
                member = new LoginMember
                {
                    username = username,
                    password = password,
                }
            };

            var url = $"{GameConst.DG.baseUrl}{GameConst.DG.Login}{GameConst.DG.agentName}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(apiRequest), Encoding.UTF8, "application/json");
            return JsonConvert.DeserializeObject<DgApiLoginResponse>(await GameHelpers.CallThirdPartyApi(url, stringContent));
        }

        #endregion

        #region Dg Game Withdraw & Transfer API

        internal static async Task<DgApiTransferResponse> CallWithdrawDepsoitAPI(string username, string amount)
        {
            var random = DGGameHelpers.RandomString();
            var apiRequest = new DgApiTransferRequest
            {
                token = SecurityHelpers.MD5EncrptText(GameConst.DG.agentName + GameConst.DG.apiKey + random),
                random = random,
                data = DGGameHelpers.RandomString(),
                member = new TransferMember
                {
                    username = username,
                    amount = Convert.ToDecimal(amount),
                }
            };

            var url = $"{GameConst.DG.baseUrl}{GameConst.DG.Transfer}{GameConst.DG.agentName}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(apiRequest), Encoding.UTF8, "application/json");
            return JsonConvert.DeserializeObject<DgApiTransferResponse>(await GameHelpers.CallThirdPartyApi(url, stringContent));
        }

        #endregion

        #region Dg Game Update API

        internal static async Task<DgApiResponse> CallUpdateuserAPI(string username, string password,int status=1,decimal Winlimit=1000m)
        {
            var random = DGGameHelpers.RandomString();
            var apiRequest = new DgApiUserUpdateRequest
            {
                token = SecurityHelpers.MD5EncrptText(GameConst.DG.agentName + GameConst.DG.apiKey + random),
                random = random,
                member = new UpdateMember
                {
                    username = username,
                    password=password,
                    status=status,
                    winLimit=Winlimit
                }
            };

            var url = $"{GameConst.DG.baseUrl}{GameConst.DG.Transfer}{GameConst.DG.agentName}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(apiRequest), Encoding.UTF8, "application/json");
            return JsonConvert.DeserializeObject<DgApiResponse>(await GameHelpers.CallThirdPartyApi(url, stringContent));
        }

        #endregion

        #region Dg Game Update Betting limit

        internal static async Task<DgApiResponse> CallUpdateBetLimitAPI(string username,string betLimit)
        {
            var random = DGGameHelpers.RandomString();
            var apiRequest = new DGApiBetLimitUpdateRequest
            {
                token = SecurityHelpers.MD5EncrptText(GameConst.DG.agentName + GameConst.DG.apiKey + random),
                random = random,
                data=betLimit,
                member = new BettingLimitMember
                {
                    username = username,
                }
            };

            var url = $"{GameConst.DG.baseUrl}{GameConst.DG.BettingLimit}{GameConst.DG.agentName}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(apiRequest), Encoding.UTF8, "application/json");
            return JsonConvert.DeserializeObject<DgApiResponse>(await GameHelpers.CallThirdPartyApi(url, stringContent));
        }

        #endregion

        #region DG game Register

        internal async Task DGRegister(string UserId, string Username, string Response)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.DG.Register, new { UserId, Username, Response });
            }
        }

        #endregion

        #region DG game Bet Limit

        internal async Task<dynamic> DGBetLimit(string BetLimit)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result=await repository.AddOrUpdateAsync(StoredProcConsts.Global.UpdateGlobalParamters, new { Value = BetLimit, Name = "DGLimit" });
                return result;
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
