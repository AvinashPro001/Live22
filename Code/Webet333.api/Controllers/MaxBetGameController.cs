using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.dapper;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request.Game;
using Webet333.models.Request.Game.MaxBet;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class MaxBetGameController : BaseController
    {
        #region Local variable and Constructor

        private static readonly HttpClient client = new HttpClient();

        public MaxBetGameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
        }

        #endregion Local variable and Constructor

        #region Max Bet Game Register

        [Authorize]
        [HttpPost(ActionsConst.MaxBetGame.GameMaxRegister)]
        public async Task<IActionResult> GameMaxRegister([FromBody] GameMaxBetRegisterRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.UserId = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.UserId))
                    return BadResponse("error_invalid_modelstate");

            using (var account_helper = new AccountHelpers(Connection))
            {
                var userdata = await account_helper.UserGetBalanceInfo(request.UserId);
                request.Username = userdata.MaxbetGamePrefix + userdata.Username;
            }

            var vendorMemberId = request.Username;

            decimal SportMin, SportMax, SportMatch, OtherSportMin, OtherSportMax, OtherSportMatch, OtherSportBall, MaxParleyMin, MaxParleyMax, MaxParleyMatch, MaxbetSportsType1Min, MaxbetSportsType1Match, MaxbetSportsType1Max;
            using (var game_helper = new MaxBetGameHelper(Connection))
            {
                var globalparameters = await game_helper.GetMaxBetGlobalParameters();
                request.mintransfer = Convert.ToDecimal(globalparameters.MaxBetMinimum);
                request.maxtransfer = Convert.ToDecimal(globalparameters.MaxBetMaximum);
                SportMin = Convert.ToDecimal(globalparameters.SportMin);
                SportMax = Convert.ToDecimal(globalparameters.SportMax);
                SportMatch = Convert.ToDecimal(globalparameters.SportMatch);
                OtherSportMin = Convert.ToDecimal(globalparameters.OtherSportMin);
                OtherSportMax = Convert.ToDecimal(globalparameters.OtherSportMax);
                OtherSportMatch = Convert.ToDecimal(globalparameters.OtherSportMatch);
                OtherSportBall = Convert.ToDecimal(globalparameters.OtherSportBall);
                MaxParleyMin = Convert.ToDecimal(globalparameters.MaxParleyMin);
                MaxParleyMax = Convert.ToDecimal(globalparameters.MaxParleyMax);
                MaxParleyMatch = Convert.ToDecimal(globalparameters.MaxParleyMatch);
                MaxbetSportsType1Min = Convert.ToDecimal(globalparameters.MaxbetSportsType1Min);
                MaxbetSportsType1Match = Convert.ToDecimal(globalparameters.MaxbetSportsType1Match);
                MaxbetSportsType1Max = Convert.ToDecimal(globalparameters.MaxbetSportsType1Max);
            }

            var response = await MaxBetGameHelper.CallMaxbetRegisterAPI(request);
            if (response.error_code == 0)
            {
                using (var game_help = new MaxBetGameHelper(Connection: Connection))
                {
                    #region Update Betting Details of User

                    string[] sportTypeList = { "1", "2", "3", "5", "8", "10", "11", "99", "161", "180", "181", "182", "183", "184", "185", "186", "190", "191", "192", "193", "43", "99MP" };
                    var setlimit = new List<JsonStringMaxBetLimit>();
                    foreach (string sportType in sportTypeList)
                    {
                        if (sportType.Equals("1"))
                        {
                            setlimit.Add(new JsonStringMaxBetLimit
                            {
                                sport_type = sportType,
                                min_bet = MaxbetSportsType1Min,
                                max_bet = MaxbetSportsType1Max,
                                max_bet_per_match = MaxbetSportsType1Match,
                            });
                            continue;
                        }
                        if (sportType.Equals("161"))
                        {
                            if (OtherSportMin <= OtherSportMax && OtherSportMax <= OtherSportMatch && OtherSportBall <= OtherSportMatch)
                            {
                                setlimit.Add(new JsonStringMaxBetLimit
                                {
                                    sport_type = sportType,
                                    min_bet = OtherSportMin,
                                    max_bet = OtherSportMax,
                                    max_bet_per_match = OtherSportMatch,
                                    max_bet_per_ball = OtherSportBall,
                                });
                            }
                            else
                            {
                                return BadResponse("(Only For 161 Sport Type) other sport min bet ≦ other sport max bet ≦ other sport max bet per ball ≦ other sport max bet ber match");
                            }
                            continue;
                        }
                        if (sportType.Equals("99MP"))
                        {
                            setlimit.Add(new JsonStringMaxBetLimit
                            {
                                sport_type = sportType,
                                min_bet = MaxParleyMin,
                                max_bet = MaxParleyMax,
                                max_bet_per_match = MaxParleyMatch,
                            });
                            continue;
                        }
                        setlimit.Add(new JsonStringMaxBetLimit
                        {
                            sport_type = sportType,
                            min_bet = SportMin,
                            max_bet = SportMax,
                            max_bet_per_match = SportMatch,
                        });
                        continue;
                    }

                    var setlimitResponse = await MaxBetGameHelper.CallMaxbetBettingLimitsUpdateAPI(setlimit, vendorMemberId.ToString());

                    #endregion Update Betting Details of User

                    var result = await game_help.GameMaxBetRegister(request.Username, request.UserId, JsonConvert.SerializeObject(response));
                    return OkResponse(new { response, result, setlimit, setlimitResponse });
                }
            }

            return OkResponse(response);
        }

        #endregion Max Bet Game Register

        #region Game Login

        [Authorize]
        [HttpPost(ActionsConst.MaxBetGame.GameLogin)]
        public async Task<IActionResult> MaxBetLogin([FromBody] GameLoginRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string VendorMemberId;
            using (var account_help = new AccountHelpers(Connection: Connection))
            {
                var globalparameters = await account_help.UserGetBalanceInfo(request.Id);
                VendorMemberId = globalparameters.VendorMemberId;
            }

            string Url = "";
            var response = await MaxBetGameHelper.CallMaxbetLoginAPI(VendorMemberId);
            if (response.error_code == 0)
            {
                string lanugaeCode = Language.Code == "en-US" ? "en" : "cs";
                if (request.IsMobile)
                    Url = $"{GameConst.MaxBet.GameLaunchMobile}lang={lanugaeCode}&token={response.Data}";
                else
                    Url = $"{GameConst.MaxBet.GameLaunchDesktop}lang={lanugaeCode}&token={response.Data}";

                if (lanugaeCode == "cs")
                    Url += Url + "&webskintype=2";
            }
            return OkResponse(new { error_code = response.error_code, Data = response.Data, message = response.message, gameUrl = Url });
        }

        #endregion Game Login

        #region Max Bet Token Update

        [Authorize]
        [HttpPost(ActionsConst.MaxBetGame.MaxBetGameTokenUpdate)]
        public async Task<IActionResult> MaxBetTokenUpdate([FromBody] GameMaxBetTokenUpdateRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            if (request == null) return BadResponse("error_empty_request");

            await ValidateUser();

            request.Token = $"WB333_{GameConst.MaxBet.VendorId}{request.Token}";

            using (var game_help = new MaxBetGameHelper(Connection: Connection))
            {
                var result = await game_help.MaxBetTokenUpdate(request: request, UserEntity.Id.ToString());
                var updateToken = await game_help.FindUserMaxBetToken(request.Token);
                return OkResponse(updateToken);
            }
        }

        #endregion Max Bet Token Update

        #region Max Bet Game Deposit and Withdraw API

        [Authorize]
        [HttpPost(ActionsConst.MaxBetGame.MaxBetGameDepositeWithdrawl)]
        private async Task<IActionResult> MaxBetDepositAndWithdrawl([FromBody] GameMaxBetDepositAndWithdrawlRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.UserId = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.UserId))
                    return BadResponse("error_invalid_modelstate");

            string vendorMemberId;
            using (var account_help = new AccountHelpers(Connection: Connection))
            {
                var globalparameters = await account_help.UserGetBalanceInfo(request.UserId);
                vendorMemberId = globalparameters.VendorMemberId;
            }

            var response = await MaxBetGameHelper.CallMaxbetDepsoitWithdrawAPI(vendorMemberId, request.Amount, request.Method);

            if (response.ErrorCode == 0)
            {
                return OkResponse(response);
            }

            return OkResponse(response);
        }

        #endregion Max Bet Game Deposit and Withdraw API

        #region SetMemberBetSetting

        [Authorize]
        [HttpPost(ActionsConst.MaxBetGame.MaxBetGameSetAllMemberBetSetting)]
        public async Task<IActionResult> SetAllMemberBetSetting([FromBody] MaxBetSetLimitRequest request)
        {
            await CheckUserRole();

            request.AdminId = GetUserId(User);

            var responseList = new List<string>();

            if (!ModelState.IsValid) return BadResponse(ModelState);
            using (MaxBetGameHelper game_helper = new MaxBetGameHelper(Connection))
            {
                decimal SportMin, SportMax, SportMatch, OtherSportMin, OtherSportMax, OtherSportMatch, OtherSportBall, MaxParleyMin, MaxParleyMax, MaxParleyMatch, MaxbetSportsType1Min, MaxbetSportsType1Match, MaxbetSportsType1Max;
                SportMin = Convert.ToDecimal(request.sportMin);
                SportMax = Convert.ToDecimal(request.sportMax);
                SportMatch = Convert.ToDecimal(request.sportMatch);
                OtherSportMin = Convert.ToDecimal(request.otherSportMin);
                OtherSportMax = Convert.ToDecimal(request.otherSportMax);
                OtherSportMatch = Convert.ToDecimal(request.otherSportMatch);
                OtherSportBall = Convert.ToDecimal(request.otherSportBall);
                MaxParleyMin = Convert.ToDecimal(request.maxParleyMin);
                MaxParleyMax = Convert.ToDecimal(request.maxParleyMax);
                MaxParleyMatch = Convert.ToDecimal(request.maxParleyMatch);
                MaxbetSportsType1Min = Convert.ToDecimal(request.MaxbetSportsType1Min);
                MaxbetSportsType1Match = Convert.ToDecimal(request.MaxbetSportsType1Match);
                MaxbetSportsType1Max = Convert.ToDecimal(request.MaxbetSportsType1Max);

                string[] sportTypeList = { "1", "2", "3", "5", "8", "10", "11", "99", "161", "180", "181", "182", "183", "184", "185", "186", "190", "191", "192", "193", "43", "99MP" };
                var setlimit = new List<JsonStringMaxBetLimit>();
                foreach (string sportType in sportTypeList)
                {
                    if (sportType.Equals("1"))
                    {
                        setlimit.Add(new JsonStringMaxBetLimit
                        {
                            sport_type = sportType,
                            min_bet = MaxbetSportsType1Min,
                            max_bet = MaxbetSportsType1Max,
                            max_bet_per_match = MaxbetSportsType1Match,
                        });
                        continue;
                    }
                    if (sportType.Equals("161"))
                    {
                        if (OtherSportMin <= OtherSportMax && OtherSportMax <= OtherSportMatch && OtherSportBall <= OtherSportMatch)
                        {
                            setlimit.Add(new JsonStringMaxBetLimit
                            {
                                sport_type = sportType,
                                min_bet = OtherSportMin,
                                max_bet = OtherSportMax,
                                max_bet_per_match = OtherSportMatch,
                                max_bet_per_ball = OtherSportBall,
                            });
                        }
                        else
                        {
                            return BadResponse("(Only For 161 Sport Type) other sport min bet ≦ other sport max bet ≦ other sport max bet per ball ≦ other sport max bet ber match");
                        }
                        continue;
                    }
                    if (sportType.Equals("99MP"))
                    {
                        setlimit.Add(new JsonStringMaxBetLimit
                        {
                            sport_type = sportType,
                            min_bet = MaxParleyMin,
                            max_bet = MaxParleyMax,
                            max_bet_per_match = MaxParleyMatch,
                        });
                        continue;
                    }
                    setlimit.Add(new JsonStringMaxBetLimit
                    {
                        sport_type = sportType,
                        min_bet = SportMin,
                        max_bet = SportMax,
                        max_bet_per_match = SportMatch,
                    });
                    continue;
                }
                var responseString = await MaxBetGameHelper.CallMaxbetBettingLimitsAllUser(setlimit);

                if (responseString.error_code == 0)
                {
                    using (MaxBetGameHelper gamehelper = new MaxBetGameHelper(Connection))
                    {
                        await gamehelper.MaxBetSetLimit(true, adminId: request.AdminId.ToString());
                    }
                }
                else
                {
                    return BadResponse(responseString.message);
                }
                return OkResponse(responseList);
            }
        }

        #endregion SetMemberBetSetting

        #region RESET MaxBet Setting

        [Authorize]
        [HttpGet(ActionsConst.MaxBetGame.ResetMemberBetSetting)]
        public async Task<IActionResult> ResetBetSetting()
        {
            await CheckUserRole();

            string adminId = GetUserId(User).ToString();

            using (MaxBetGameHelper game_helper = new MaxBetGameHelper(Connection))
            {
                await game_helper.MaxBetSetLimit(false, adminId: adminId);
            }
            return OkResponse();
        }

        #endregion RESET MaxBet Setting

        #region SET MAXBET MIN & MAX GLOBAL VARIABLE

        [Authorize]
        [HttpPost(ActionsConst.MaxBetGame.maxbetSetMinMax)]
        public async Task<IActionResult> SetMaxbetGlobalVariable([FromBody] MaxBetGlobalVariableRequest request)
        {
            await CheckUserRole();

            request.AdminId = GetUserId(User);

            if (!ModelState.IsValid) return BadResponse(ModelState);
            using (MaxBetGameHelper game_helper = new MaxBetGameHelper(Connection))
            {
                var list = await game_helper.GetAllUserVendorIdList();
                await game_helper.GetAllUserMinMaxLimit(list, Convert.ToDecimal(request.MinimumValue), Convert.ToDecimal(request.Maximumvalue));
                return OkResponse(await game_helper.MaxBetSetGlobalVariable(request.Maximumvalue, request.MinimumValue, request.AdminId.ToString()));
            }
        }

        #endregion SET MAXBET MIN & MAX GLOBAL VARIABLE

        #region GET MAXBET  GLOBAL VARIABLE

        [Authorize]
        [HttpGet(ActionsConst.MaxBetGame.maxbetGetMinMax)]
        public async Task<IActionResult> GetMaxbetGlobalVariable()
        {
            await CheckUserRole();
            using (MaxBetGameHelper game_helper = new MaxBetGameHelper(Connection))
            {
                var globalparameters = await game_helper.GetMaxBetGlobalParameters();
                return OkResponse(globalparameters);
            }
        }

        #endregion GET MAXBET  GLOBAL VARIABLE

        #region SET DEFAULT BETTING LIMITS

        [Authorize]
        [HttpPost(ActionsConst.MaxBetGame.DefaultBettingLimitSet)]
        public async Task<IActionResult> SetMaxbetDefaultBettingVariable([FromBody] MaxBetDefaultBettingVariableRequest request)
        {
            await CheckUserRole();

            request.AdminId = GetUserId(User);

            if (Convert.ToDouble(request.otherSportMin) > Convert.ToDouble(request.otherSportMax) || Convert.ToDouble(request.otherSportMax) > Convert.ToDouble(request.otherSportMatch) || Convert.ToDouble(request.otherSportBall) > Convert.ToDouble(request.otherSportMatch))
            {
                return BadResponse("(Only For 161 Sport Type) other sport min bet ≦ other sport max bet ≦ other sport max bet per ball ≦ other sport max bet ber match");
            }

            using (MaxBetGameHelper game_helper = new MaxBetGameHelper(Connection))
            {
                return OkResponse(await game_helper.DefaultBettingLimit(request));
            }
        }

        #endregion SET DEFAULT BETTING LIMITS

        #region SET user Min Max Limit

        [HttpPost(ActionsConst.MaxBetGame.UserSetMinMax)]
        public async Task<IActionResult> UserSetMinMax([FromBody] MaxbetUserGlobalVariableRequest request)
        {
            await CheckUserRole();

            #region Admin Log

            request.AdminId = GetUserId(User);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.Global.AdminLog_Insert_MaxBet_Parameters,
                    new
                    {
                        request.AdminId,
                        request.UserId,
                        Action = "Edit",
                        Module = "MaxBet Parameters"
                    });
            }

            #endregion Admin Log

            var req = new GameMaxBetRegisterRequest
            {
                mintransfer = Convert.ToDecimal(request.MinimumValue),
                maxtransfer = Convert.ToDecimal(request.Maximumvalue)
            };
            using (MaxBetGameHelper game_helper = new MaxBetGameHelper(Connection))
            {
                var list = await game_helper.GetAllUserVendorIdList(request.UserId.ToString());
                var vendorMemberId = list.FirstOrDefault(x => x.UserId == request.UserId).VendorMemberId;
                var response = await MaxBetGameHelper.CallMaxbetUpdateAPI(req, vendorMemberId);
                return OkResponse(response);
            }
        }

        #endregion SET user Min Max Limit
    }
}