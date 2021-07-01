using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request;
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

        private static string[] abcd = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" };

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
                Username = Username,
                UserGroup = GameConst.SBO.UserGroup.D
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
                BetSettings = new List<SBOSetPlayerBetLimitRequestBetSetting>
                {
                    new SBOSetPlayerBetLimitRequestBetSetting
                    {
                        MarketType = GameConst.SBO.MarketType.All,
                        MaxBet = playerDefaultBetLimit.Football_OthersMatchType_MaxBet,
                        MaxBetPerMatch =  playerDefaultBetLimit.Football_OthersMatchType_MaxBetMatch,
                        MinBet = playerDefaultBetLimit.Football_OthersMatchType_MinBet,
                        SportType = GameConst.SBO.SportType.Soccer
                    },
                    new SBOSetPlayerBetLimitRequestBetSetting
                    {
                        MarketType = GameConst.SBO.MarketType.Over_Under,
                        MaxBet = playerDefaultBetLimit.Football_OverUnder_MaxBet,
                        MaxBetPerMatch = playerDefaultBetLimit.Football_OverUnder_MaxBetMatch,
                        MinBet = playerDefaultBetLimit.Football_OverUnder_MinBet,
                        SportType = GameConst.SBO.SportType.Soccer
                    },
                    new SBOSetPlayerBetLimitRequestBetSetting
                    {
                        MarketType = GameConst.SBO.MarketType.Correct_Score,
                        MaxBet = playerDefaultBetLimit.Football_CorrectScore_MaxBet,
                        MaxBetPerMatch = playerDefaultBetLimit.Football_CorrectScore_MaxBetMatch ,
                        MinBet = playerDefaultBetLimit.Football_CorrectScore_MinBet,
                        SportType = GameConst.SBO.SportType.Soccer
                    },
                    new SBOSetPlayerBetLimitRequestBetSetting
                    {
                        MarketType = GameConst.SBO.MarketType.All,
                        MaxBet = playerDefaultBetLimit.OthersSport_OthersMatchType_MaxBet,
                        MaxBetPerMatch = playerDefaultBetLimit.OthersSport_OthersMatchType_MaxBetMatch,
                        MinBet = playerDefaultBetLimit.OthersSport_OthersMatchType_MinBet,
                        SportType = GameConst.SBO.SportType.Others
                    },
                    new SBOSetPlayerBetLimitRequestBetSetting
                    {
                        MarketType = GameConst.SBO.MarketType.Over_Under,
                        MaxBet = playerDefaultBetLimit.OthersSport_OverUnder_MaxBet,
                        MaxBetPerMatch = playerDefaultBetLimit.OthersSport_OverUnder_MaxBetMatch,
                        MinBet = playerDefaultBetLimit.OthersSport_OverUnder_MinBet,
                        SportType =  GameConst.SBO.SportType.Others
                    },
                    new SBOSetPlayerBetLimitRequestBetSetting
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
                device == GameConst.SBO.Device.Desktop ? GameConst.SBO.Theme.SBO : GameConst.SBO.Theme.Lawn,
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

            //int res = DateTime.Compare(request.FromDate, request.ToDate);
            //if (res > 0)
            //{
            //    throw new Exception("FromDate is smaller than ToDate.");
            //}

            //if ((request.FromDate - DateTime.Now).TotalDays > 60)
            //{
            //    throw new Exception("You can only get bet list data within 60 days.");
            //}

            var startTime = request.FromDate.ToString("yyyy-MM-ddTHH:mm:ss.fff");
            var endTime = request.ToDate.ToString("yyyy-MM-ddTHH:mm:ss.fff");

            SBOBettingDetailsRequest model = new SBOBettingDetailsRequest
            {
                CompanyKey = GameConst.SBO.CompanyKey,
                EndDate = endTime,
                Portfolio = GameConst.SBO.Portfolio.SportsBook,
                ServerId = DateTimeOffset.Now.ToUnixTimeSeconds().ToString(),
                StartDate = startTime,
                Username = string.IsNullOrWhiteSpace(request.Username) ? GameConst.SBO.Agent.Username : request.Username
            };

            var URL = $"{GameConst.SBO.URL}{GameConst.SBO.EndPoint.BettingDetails}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");

            var APIResult = await GameHelpers.CallThirdPartyApi(URL, stringContent);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<SBOBettingDetailsResponse>(APIResult);

            return DeserializeAPIResult;
        }

        #endregion Call Betting Details 3rd Party API

        #region Get League

        internal async Task<SBOGetLeagueResponse> GetLeague(SBOGetLeagueAdminRequest request)
        {
            SBOGetLeagueResponse callGetLeagueAPIFootball = await CallGetLeagueAPIFootball(request);
            //SBOGetLeagueResponse callGetLeagueAPIOthers = await CallGetLeagueAPIOthers(request);

            //if (callGetLeagueAPIFootball.Error.Id == 0 &&
            //    callGetLeagueAPIOthers.Error.Id == 0)
            //{
            //    callGetLeagueAPIFootball.Result.AddRange(callGetLeagueAPIOthers.Result);
            //}
            //else if (callGetLeagueAPIFootball.Error.Id != 0 &&
            //callGetLeagueAPIOthers.Error.Id == 0)
            //{
            //    await MapWithDBValueAsync(callGetLeagueAPIOthers);

            //    return callGetLeagueAPIOthers;
            //}

            if (callGetLeagueAPIFootball.Error.Id == 0) await MapWithDBValueAsync(callGetLeagueAPIFootball);

            if (callGetLeagueAPIFootball != null &&
                callGetLeagueAPIFootball.Result.Any())
            {
                var big = callGetLeagueAPIFootball.Result.Where(x => x.GroupType == "BIG").ToList();
                var medium = callGetLeagueAPIFootball.Result.Where(x => x.GroupType == "MEDIUM").ToList();
                var small = callGetLeagueAPIFootball.Result.Where(x => x.GroupType == "SMALL").ToList();
                var others = callGetLeagueAPIFootball.Result.Where(x => x.GroupType != "BIG" && x.GroupType != "MEDIUM" && x.GroupType != "SMALL").ToList();
                //var nullGroupType = callGetLeagueAPIFootball.Result.Where(x => x.GroupType == null).ToList();

                List<SBOGetLeagueResponseResult> tempResult = new List<SBOGetLeagueResponseResult>();
                tempResult.AddRange(big);
                tempResult.AddRange(medium);
                tempResult.AddRange(small);
                tempResult.AddRange(others);
                //tempResult.AddRange(nullGroupType);

                callGetLeagueAPIFootball.Result = tempResult;

                // callGetLeagueAPIFootball.Result = callGetLeagueAPIFootball.Result.OrderBy(x => x.GroupType).ToList();   //  BIG > MEDIUM > SMALL
            }

            return callGetLeagueAPIFootball;
        }

        public class MyClassComp : IEqualityComparer<SBOGetLeagueResponseResult>
        {
            public bool Equals(SBOGetLeagueResponseResult x, SBOGetLeagueResponseResult y)
            {
                return x.LeagueId == y.LeagueId;
            }

            public int GetHashCode(SBOGetLeagueResponseResult obj)
            {
                if (Object.ReferenceEquals(obj, null)) return 0;
                int hashName = obj.LeagueId == null ? 0 : obj.LeagueId.GetHashCode();

                return hashName;
            }
        }

        private static async Task<SBOGetLeagueResponse> CallGetLeagueAPIFootball(SBOGetLeagueAdminRequest request)
        {
            SBOGetLeagueResponse temp = new SBOGetLeagueResponse();

            if (string.IsNullOrWhiteSpace(request.LeagueKeyWord))
            {
                foreach (var abc in abcd)
                {
                    SBOGetLeagueRequest model = new SBOGetLeagueRequest
                    {
                        CompanyKey = GameConst.SBO.CompanyKey,
                        //FromDate = DateTime.Now.AddHours(12),
                        //FromDate = DateTime.Now.AddDays(-200).ToString("yyyy-MM-dd HH:mm:ss.fff"),
                        FromDate = request.FromDate.ToString(),
                        LeagueNameKeyWord = abc,
                        ServerId = DateTimeOffset.Now.ToUnixTimeSeconds().ToString(),
                        SportType = GameConst.SBO.SportType.Soccer,
                        //ToDate = DateTime.Now.AddHours(12)
                        //ToDate = DateTime.Now.AddDays(200).ToString("yyyy-MM-dd HH:mm:ss.fff")
                        ToDate = request.ToDate.ToString()
                    };

                    var result = await CallGetLeagueAPI(model);

                    if (temp.Result != null) temp.Result.AddRange(result.Result);
                    else temp = result;
                }

                List<SBOGetLeagueResponseResult> newList = temp.Result.Distinct(new MyClassComp()).ToList();
                temp.Result = newList;
            }
            else
            {
                SBOGetLeagueRequest model = new SBOGetLeagueRequest
                {
                    CompanyKey = GameConst.SBO.CompanyKey,
                    //FromDate = DateTime.Now.AddHours(12),
                    //FromDate = DateTime.Now.AddDays(-200).ToString("yyyy-MM-dd HH:mm:ss.fff"),
                    FromDate = request.FromDate.ToString(),
                    LeagueNameKeyWord = request.LeagueKeyWord,
                    ServerId = DateTimeOffset.Now.ToUnixTimeSeconds().ToString(),
                    SportType = GameConst.SBO.SportType.Soccer,
                    //ToDate = DateTime.Now.AddHours(12)
                    //ToDate = DateTime.Now.AddDays(200).ToString("yyyy-MM-dd HH:mm:ss.fff")
                    ToDate = request.ToDate.ToString()
                };

                var result = await CallGetLeagueAPI(model);

                temp = result;
            }

            if (temp != null &&
                temp.Error.Id == 0 &&
                temp.Result.Any())
            {
                //temp.Result.ForEach(x => x.SportType = "Football");
                temp.Result.ForEach(x => x.SportType = "Soccer");
            }

            return temp;
        }

        private static async Task<SBOGetLeagueResponse> CallGetLeagueAPIOthers(OnlyDateRangeFilterRequest request)
        {
            SBOGetLeagueResponse temp = new SBOGetLeagueResponse();

            foreach (var abc in abcd)
            {
                SBOGetLeagueRequest model = new SBOGetLeagueRequest
                {
                    CompanyKey = GameConst.SBO.CompanyKey,
                    //FromDate = DateTime.Now.AddHours(12),
                    //FromDate = DateTime.Now.AddDays(-200).ToString("yyyy-MM-dd HH:mm:ss.fff"),
                    FromDate = request.FromDate.ToString(),
                    LeagueNameKeyWord = abc,
                    ServerId = DateTimeOffset.Now.ToUnixTimeSeconds().ToString(),
                    SportType = GameConst.SBO.SportType.Others,
                    //ToDate = DateTime.Now.AddHours(12)
                    //ToDate = DateTime.Now.AddDays(200).ToString("yyyy-MM-dd HH:mm:ss.fff")
                    ToDate = request.ToDate.ToString()
                };

                var result = await CallGetLeagueAPI(model);

                if (temp.Result != null) temp.Result.AddRange(result.Result);
                else temp = result;
            }

            List<SBOGetLeagueResponseResult> newList = temp.Result.Distinct(new MyClassComp()).ToList();
            temp.Result = newList;

            if (temp != null &&
               temp.Error.Id == 0 &&
               temp.Result.Any())
            {
                temp.Result.ForEach(x => x.SportType = "Others");
            }

            return temp;
        }

        private static async Task<SBOGetLeagueResponse> CallGetLeagueAPI(SBOGetLeagueRequest model)
        {
            var URL = $"{GameConst.SBO.URL}{GameConst.SBO.EndPoint.GetLeague}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");

            var APIResult = await GameHelpers.CallThirdPartyApi(URL, stringContent);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<SBOGetLeagueResponse>(APIResult);

            return DeserializeAPIResult;
        }

        private async Task<List<SBOGetLeagueResponseResult>> GetLeagueDBAsync()
        {
            using (var repository = new DapperRepository<SBOGetLeagueResponseResult>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.SBO.SelectLeagueBetSetting, new { });

                return result.ToList();
            }
        }

        private async Task<SBOGetLeagueResponse> MapWithDBValueAsync(SBOGetLeagueResponse League)
        {
            var getLeagueDB = await GetLeagueDBAsync();

            if (getLeagueDB != null)
            {
                foreach (var league in League.Result)
                {
                    foreach (var leagueDB in (getLeagueDB.Where(t => t.LeagueId == league.LeagueId)))
                    {
                        league.GroupType = leagueDB.GroupType;
                        league.MaxBet = leagueDB.MaxBet;
                        league.MinBet = leagueDB.MinBet;
                        league.MaxBetRatio = leagueDB.MaxBetRatio;
                    }
                }
            }

            return League;
        }

        #endregion Get League

        #region Get Blank League

        internal async Task<SBOGetLeagueResponse> GetBlankLeagueAsync(SBOGetLeagueAdminRequest request)
        {
            SBOGetLeagueResponse callGetLeagueAPIFootball = await CallGetLeagueAPIFootball(request);

            if (callGetLeagueAPIFootball.Result.Any()) await MapWithDBValueAndRemoveExistsLeagueAsync(callGetLeagueAPIFootball);

            return callGetLeagueAPIFootball;
        }

        private async Task<SBOGetLeagueResponse> MapWithDBValueAndRemoveExistsLeagueAsync(SBOGetLeagueResponse League)
        {
            var getLeagueDB = await GetLeagueDBAsync();

            if (getLeagueDB != null)
            {
                foreach (var league in getLeagueDB)
                {
                    var index = League.Result.FindIndex(x => x.LeagueId == league.LeagueId);
                    if (index != -1) League.Result.RemoveAt(index);
                }
            }

            return League;
        }

        #endregion Get Blank League

        #region Set League Bet Setting

        internal async Task CallSetLeagueBetSettingAPI(List<SBOSetLeagueBetSettingRequest> request)
        {
            foreach (var data in request)
            {
                SBOSetLeagueBetSettingAPIRequest model = new SBOSetLeagueBetSettingAPIRequest
                {
                    CompanyKey = GameConst.SBO.CompanyKey,
                    Currency = GameConst.SBO.Currency,
                    GroupType = data.GroupType,
                    IsLive = false,
                    LeagueId = data.LeagueId,
                    MaxBet = data.MaxBet,
                    MaxBetRatio = data.MaxBetRatio,
                    MinBet = data.MinBet,
                    ServerId = DateTimeOffset.Now.ToUnixTimeSeconds().ToString()
                };

                var URL = $"{GameConst.SBO.URL}{GameConst.SBO.EndPoint.SetLeague}";

                var stringContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");

                // For testing only.
                //Console.WriteLine(JsonConvert.SerializeObject(model));

                var APIResult = await GameHelpers.CallThirdPartyApi(URL, stringContent);

                var DeserializeAPIResult = JsonConvert.DeserializeObject<SBODefaultResponse>(APIResult);

                // await SetLeagueBetSetting(data);

                if (DeserializeAPIResult != null &&
                    DeserializeAPIResult.Error.Id == 0)
                {
                    await SetLeagueBetSetting(data);
                }
            }
        }

        private async Task SetLeagueBetSetting(SBOSetLeagueBetSettingRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.SBO.UpdateLeagueBetSetting,
                    new
                    {
                        LeagueId = request.LeagueId,
                        LeagueName = request.LeagueName,
                        SportType = request.SportType,
                        MinBet = request.MinBet,
                        MaxBet = request.MaxBet,
                        MaxBetRatio = request.MaxBetRatio,
                        GroupType = request.GroupType
                    });
            }
        }

        #endregion Set League Bet Setting

        #region Get League Bet Limit

        internal async Task<SBOGetLeagueBetSettingResponse> CallGetLeagueBetSettingAPI()
        {
            var getLeagueDB = await GetLeagueDBAsync();

            SBOGetLeagueBetSettingResponse temp = new SBOGetLeagueBetSettingResponse();

            foreach (var data in getLeagueDB)
            {
                SBOGetLeagueBetSettingRequest model = new SBOGetLeagueBetSettingRequest
                {
                    CompanyKey = GameConst.SBO.CompanyKey,
                    Currency = GameConst.SBO.Currency,
                    IsLive = false,
                    LeagueId = data.LeagueId,
                    ServerId = DateTimeOffset.Now.ToUnixTimeSeconds().ToString()
                };

                var URL = $"{GameConst.SBO.URL}{GameConst.SBO.EndPoint.GetLeagueBetSetting}";

                var stringContent = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");

                var APIResult = await GameHelpers.CallThirdPartyApi(URL, stringContent);

                var DeserializeAPIResult = JsonConvert.DeserializeObject<SBOGetLeagueBetSettingResponse>(APIResult);

                if (DeserializeAPIResult.Error.Id == 0) DeserializeAPIResult.Result.ForEach(x => x.LeagueName = data.LeagueName);

                if (temp.Result != null) temp.Result.AddRange(DeserializeAPIResult.Result);
                else temp = DeserializeAPIResult;
            }

            if (temp != null &&
                temp.Result.Any())
            {
                //var big = temp.Result.Where(x => x.GroupType == "BIG").ToList();
                //var medium = temp.Result.Where(x => x.GroupType == "MEDIUM").ToList();
                //var small = temp.Result.Where(x => x.GroupType == "SMALL").ToList();
                //var others = temp.Result.Where(x => x.GroupType != "BIG" && x.GroupType != "MEDIUM" && x.GroupType != "SMALL").ToList();

                //List<SBOGetLeagueBetSettingResponseResult> tempResult = new List<SBOGetLeagueBetSettingResponseResult>();
                //tempResult.AddRange(big);
                //tempResult.AddRange(medium);
                //tempResult.AddRange(small);
                //tempResult.AddRange(others);

                //temp.Result = tempResult;

                temp.Result = temp.Result.OrderBy(x => x.GroupType).ToList();   //  BIG > MEDIUM > SMALL
            }

            return temp;
        }

        #endregion Get League Bet Limit

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