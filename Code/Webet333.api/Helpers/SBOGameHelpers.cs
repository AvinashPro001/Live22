using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request.Game.SBO;
using Webet333.models.Response.Game.SBO;
using static Webet333.models.Request.Game.SBO.SBOLoginRequest;
using static Webet333.models.Response.Game.SBO.SBOLoginResponse;

namespace Webet333.api.Helpers
{
    public class SBOGameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public SBOGameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion Local Variables

        #region Call Register Agent 3rd Party API

        public async Task<SBORegistrationResponse> CallRegisterAgentAPI(SBORegistrationAgentRequest request)
        {
            SBORegistrationAgent model = new SBORegistrationAgent
            {
                CasinoTableLimit = request.CasinoTableLimit,
                CompanyKey = GameConst.SBO.CompanyKey,
                Currency = GameConst.SBO.Currency,
                Max = request.Max,
                MaxPerMatch = request.MaxPerMatch,
                Min = request.Min,
                Password = request.Password,
                ServerId = DateTimeOffset.Now.ToUnixTimeSeconds().ToString(),
                Username = request.Username
            };

            var URL = $"{GameConst.SBO.URL}{GameConst.SBO.EndPoint.RegisterAgent}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");

            var APIResult = await GameHelpers.CallThirdPartyApi(URL, stringContent);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<SBORegistrationResponse>(APIResult);

            return DeserializeAPIResult;
        }

        #endregion Call Register Agent 3rd Party API

        #region Call Register 3rd Party API

        public async Task<SBORegistrationResponse> CallRegisterPlayerAPI(string Username)
        {
            SBORegistrationPlayerRequest model = new SBORegistrationPlayerRequest
            {
                Agent = GameConst.SBO.Agent.Username,
                CompanyKey = GameConst.SBO.CompanyKey,
                ServerId = DateTimeOffset.Now.ToUnixTimeSeconds().ToString(),
                Username = Username
            };

            var URL = $"{GameConst.SBO.URL}{GameConst.SBO.EndPoint.RegisterPlayer}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");

            var APIResult = await GameHelpers.CallThirdPartyApi(URL, stringContent);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<SBORegistrationResponse>(APIResult);

            return DeserializeAPIResult;
        }

        #endregion Call Register 3rd Party API

        #region SBO Game Register

        internal async Task SBORegister(string UserId, string Username, string Response)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.SBO.Register,
                    new
                    {
                        UserId,
                        Username,
                        Response
                    });
            }
        }

        #endregion SBO Game Register

        #region Set Player Bet Limit

        internal async Task<SBODefaultResponse> SetPlayerBetLimitAsync(string Username)
        {
            SBOSetPlayerBetLimitRequest model = new SBOSetPlayerBetLimitRequest
            {
                CompanyKey = GameConst.SBO.CompanyKey,
                ServerId = DateTimeOffset.Now.ToUnixTimeSeconds().ToString(),
                Username = Username,
                BetSettings = new System.Collections.Generic.List<BetSetting>
                {
                    new BetSetting
                    {
                        MarketType = 0,
                        MaxBet = 3000,
                        MaxBetPerMatch = 3000,
                        MinBet =5,
                        SportType = 3
                    },
                   new  BetSetting{
                       MarketType = 3,
                       MaxBet = 3000,
                       MaxBetPerMatch = 3000,
                       MinBet =5,
                       SportType = 3
                    },
                   new  BetSetting{
                       MarketType = 4,
                       MaxBet = 3000,
                       MaxBetPerMatch = 3000,
                       MinBet =5,
                       SportType = 3
                    },

                   new BetSetting
                    {
                        MarketType = 0,
                        MaxBet = 3000,
                        MaxBetPerMatch = 3000,
                        MinBet =5,
                        SportType = 11
                    },
                   new  BetSetting{
                       MarketType = 3,
                       MaxBet = 3000,
                       MaxBetPerMatch = 3000,
                       MinBet =5,
                       SportType = 11
                    },
                   new  BetSetting{
                       MarketType = 4,
                       MaxBet = 3000,
                       MaxBetPerMatch = 3000,
                       MinBet =5,
                       SportType = 11
                    }
                }
            };

            var URL = $"{GameConst.SBO.URL}{GameConst.SBO.EndPoint.SetPlayerBetLimit}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");

            var APIResult = await GameHelpers.CallThirdPartyApi(URL, stringContent);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<SBODefaultResponse>(APIResult);

            return DeserializeAPIResult;
        }

        #endregion Set Player Bet Limit

        #region Call Login 3rd Party API

        public static async Task<GetSBOLoginTokeResponse> CallLoginAPI(string Username)
        {
            GetSBOLoginTokeRequest model = new GetSBOLoginTokeRequest
            {
                CompanyKey = GameConst.SBO.CompanyKey,
                Portfolio = GameConst.SBO.Portfolio.SportsBook,
                ServerId = DateTimeOffset.Now.ToUnixTimeSeconds().ToString(),
                Username = Username
            };

            var URL = $"{GameConst.SBO.URL}{GameConst.SBO.EndPoint.Login}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");

            var APIResult = await GameHelpers.CallThirdPartyApi(URL, stringContent);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<GetSBOLoginTokeResponse>(APIResult);

            return DeserializeAPIResult;
        }

        #endregion Call Login 3rd Party API

        #region Get Language Code

        internal static string GetLanguageCode(string Language)
        {
            switch (Language)
            {
                case LanguageConst.Chinese:
                    return "zh-cn";

                case LanguageConst.English:
                    return "en";

                case LanguageConst.Malay:
                    return "en";

                default:
                    return "en";
            }
        }

        #endregion Get Language Code

        #region Call Login to SportsBook 3rd Party API

        public static string CallLoginToSportsBookAPI(
            GetSBOLoginTokeResponse tokeResponse,
            string language,
            string device)
        {
            string loginURL = string.Format(
                GameConst.SBO.GameLoginURL,
                tokeResponse.Url,
                language,
                GameConst.SBO.Oddstyle.MalayOdds,
                GameConst.SBO.Theme.SBO,
                GameConst.SBO.OddsMode.Double,
                device);

            return loginURL;
        }

        #endregion Call Login to SportsBook 3rd Party API

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