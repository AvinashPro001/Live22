using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request.Game;
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
            SBOSelectPlayerDefaultBetLimitResponse playerDefaultBetLimit = await GetPlayerDefaultBetLimitAsync();

            SBOSetPlayerBetLimitRequest model = new SBOSetPlayerBetLimitRequest
            {
                CompanyKey = GameConst.SBO.CompanyKey,
                ServerId = DateTimeOffset.Now.ToUnixTimeSeconds().ToString(),
                Username = Username,
                BetSettings = new List<BetSetting>
                {
                    new BetSetting
                    {
                        MarketType = GameConst.SBO.MarketType.All,
                        MaxBet = playerDefaultBetLimit.Football_OthersMatchType_MaxBet,
                        MaxBetPerMatch =  playerDefaultBetLimit.Football_OthersMatchType_MaxBetMatch,
                        MinBet = playerDefaultBetLimit.Football_OthersMatchType_MinBet,
                        SportType = GameConst.SBO.SportType.Football
                    },
                    new BetSetting
                    {
                        MarketType = GameConst.SBO.MarketType.Over_Under,
                        MaxBet = playerDefaultBetLimit.Football_OverUnder_MaxBet,
                        MaxBetPerMatch = playerDefaultBetLimit.Football_OverUnder_MaxBetMatch,
                        MinBet = playerDefaultBetLimit.Football_OverUnder_MinBet,
                        SportType = GameConst.SBO.SportType.Football
                    },
                    new BetSetting
                    {
                        MarketType = GameConst.SBO.MarketType.Correct_Score,
                        MaxBet = playerDefaultBetLimit.Football_CorrectScore_MaxBet,
                        MaxBetPerMatch = playerDefaultBetLimit.Football_CorrectScore_MaxBetMatch ,
                        MinBet = playerDefaultBetLimit.Football_CorrectScore_MinBet,
                        SportType = GameConst.SBO.SportType.Football
                    },
                    new BetSetting
                    {
                        MarketType = GameConst.SBO.MarketType.All,
                        MaxBet = playerDefaultBetLimit.OthersSport_OthersMatchType_MaxBet,
                        MaxBetPerMatch = playerDefaultBetLimit.OthersSport_OthersMatchType_MaxBetMatch,
                        MinBet = playerDefaultBetLimit.OthersSport_OthersMatchType_MinBet,
                        SportType = GameConst.SBO.SportType.Others
                    },
                    new BetSetting
                    {
                        MarketType = GameConst.SBO.MarketType.Over_Under,
                        MaxBet = playerDefaultBetLimit.OthersSport_OverUnder_MaxBet,
                        MaxBetPerMatch = playerDefaultBetLimit.OthersSport_OverUnder_MaxBetMatch,
                        MinBet = playerDefaultBetLimit.OthersSport_OverUnder_MinBet,
                        SportType =  GameConst.SBO.SportType.Others
                    },
                    new BetSetting
                    {
                        MarketType = GameConst.SBO.MarketType.Correct_Score,
                        MaxBet = playerDefaultBetLimit.OthersSport_CorrectScore_MaxBet,
                        MaxBetPerMatch = playerDefaultBetLimit.OthersSport_CorrectScore_MaxBetMatch,
                        MinBet = playerDefaultBetLimit.OthersSport_CorrectScore_MinBet,
                        SportType = GameConst.SBO.SportType.Others
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

        #region Player Default Bet Limit

        internal async Task SetPlayerDefaultBetLimitAsync(List<SBOSetPlayerDefaultBetLimitRequest> request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.SBO.SetPlayerDefaultBetLimit, request);
            }
        }

        #endregion Player Default Bet Limit

        #region Player Default Bet Limit

        internal async Task UpdatePlayerDefaultBetLimitAsync(List<SBOSetPlayerDefaultBetLimitUpdateRequest> request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.SBO.SetPlayerDefaultBetLimit, request);
            }
        }

        #endregion Player Default Bet Limit

        #region Get Player Default Bet Limit

        internal async Task<SBOSelectPlayerDefaultBetLimitResponse> GetPlayerDefaultBetLimitAsync()
        {
            using (var repository = new DapperRepository<SBOSelectPlayerDefaultBetLimitResponse>(Connection))
            {
                var result = await repository.FindAsync(StoredProcConsts.SBO.SelectPlayerDefaultBetLimit, new { });

                return result;
            }
        }

        #endregion Get Player Default Bet Limit

        #region Deposit

        public static async Task<SBODepositResponse> CallDepositAPI(string Username, decimal Amount)
        {
            string temp = DateTimeOffset.Now.ToUnixTimeSeconds().ToString();

            SBODepositRequest model = new SBODepositRequest
            {
                Amount = Amount,
                CompanyKey = GameConst.SBO.CompanyKey,
                ServerId = temp,
                TxnId = $"{Username}_{temp}",
                Username = Username
            };

            var URL = $"{GameConst.SBO.URL}{GameConst.SBO.EndPoint.Deposit}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");

            var APIResult = await GameHelpers.CallThirdPartyApi(URL, stringContent);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<SBODepositResponse>(APIResult);

            return DeserializeAPIResult;
        }

        #endregion Deposit

        #region Withdraw

        public static async Task<SBOWithdrawResponse> CallWithdrawAPI(string Username, decimal Amount)
        {
            string temp = DateTimeOffset.Now.ToUnixTimeSeconds().ToString();

            SBOWithdrawRequest model = new SBOWithdrawRequest
            {
                Amount = Amount,
                CompanyKey = GameConst.SBO.CompanyKey,
                IsFullAmount = false,
                ServerId = temp,
                TxnId = $"{Username}_{temp}",
                Username = Username
            };

            var URL = $"{GameConst.SBO.URL}{GameConst.SBO.EndPoint.Withdraw}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");

            var APIResult = await GameHelpers.CallThirdPartyApi(URL, stringContent);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<SBOWithdrawResponse>(APIResult);

            return DeserializeAPIResult;
        }

        #endregion Withdraw

        #region Call Betting Details 3rd Party API

        public static async Task<SBOBettingDetailsResponse> BettingDetailsCallAPI(GlobalBettingDetailsRequest request)
        {
            //var time = DateTime.Now.ToUniversalTime();
            //var startTime = time.AddHours(-4).ToString("yyyy-MM-ddTHH:mm:sss");
            //var endTime = time.ToString("yyyy-MM-ddTHH:mm:sss");

            var startTime = request.FromDate.ToString("yyyy-MM-ddTHH:mm:ss.fff");
            var endTime = request.ToDate.ToString("yyyy-MM-ddTHH:mm:ss.fff");

            SBOBettingDetailsRequest model = new SBOBettingDetailsRequest
            {
                CompanyKey = GameConst.SBO.CompanyKey,
                EndDate = endTime,
                Portfolio = GameConst.SBO.Portfolio.SportsBook,
                ServerId = DateTimeOffset.Now.ToUnixTimeSeconds().ToString(),
                StartDate = startTime,
                Username = GameConst.SBO.Agent.Username
            };

            var URL = $"{GameConst.SBO.URL}{GameConst.SBO.EndPoint.BettingDetails}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");

            var APIResult = await GameHelpers.CallThirdPartyApi(URL, stringContent);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<SBOBettingDetailsResponse>(APIResult);

            return DeserializeAPIResult;
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
            if (dispose)
            {
                Connection = string.Empty;
            }
        }

        #endregion House Keeping
    }
}