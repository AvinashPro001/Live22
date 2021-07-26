using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using QRCoder;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml;
using System.Xml.Linq;
using Webet333.api.Controllers.Base;
using Webet333.api.Filters;
using Webet333.api.Helpers;
using Webet333.api.Helpers.SexyBaccarat;
using Webet333.files.interfaces;
using Webet333.logs;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Game;
using Webet333.models.Request.Game.DG;
using Webet333.models.Request.Game.M8;
using Webet333.models.Request.Game.MaxBet;
using Webet333.models.Request.Payments;
using Webet333.models.Request.User;
using Webet333.models.Response.Account;
using Webet333.models.Response.Game;
using Webet333.models.Response.Game.DG;
using Webet333.models.Response.Game.Joker;
using Webet333.models.Response.Game.Kiss918;
using Webet333.models.Response.Game.Pussy888;
using Webet333.models.Response.Game.SBO;
using Webet333.models.Response.Game.SexyBaccarat;
using Webet333.models.Response.Game.YEEBET;
using Webet333.models.Response.TransferMoney;
using Webet333.queue;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class GameController : BaseController
    {
        #region Global variable and Constructor

        protected ApiLogsManager LogManager { get; set; }

        private SerialQueue Queue { get; set; }

        private static readonly HttpClient client = new HttpClient();

        private IHostingEnvironment _hostingEnvironment;

        private IHubContext<SignalRHub> _hubContext;
        public GameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IHostingEnvironment environment, SerialQueue queue, IOptions<BaseUrlConfigs> BaseUrlConfigsOption, ApiLogsManager LogManager, IHubContext<SignalRHub> hubContext) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.LogManager = LogManager;
            this.Queue = queue;
            this.Localizer = Localizer;
            _hostingEnvironment = environment;
            _hubContext = hubContext;
        }

        #endregion Global variable and Constructor

        #region All game Register

        [HttpPost(ActionsConst.Game.GameJokerRegister)]
        private async Task<IActionResult> GameJokerRegister([FromBody] GameJokerRegisterRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            if (request == null) return BadResponse("error_empty_request");

            using (var game_help = new GameHelpers(Connection: Connection))
            {
                var result = await game_help.GameJokerRegister(request: request);
                return OkResponse(result);
            }
        }

        [HttpPost(ActionsConst.Game.GamePlaytechRegister)]
        private async Task<IActionResult> GamePlaytechRegister([FromBody] GamePlaytechRegisterRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            if (request == null) return BadResponse("error_empty_request");

            using (var game_help = new GameHelpers(Connection: Connection))
            {
                var result = await game_help.GamePlaytechRegister(request: request);
                return OkResponse(result);
            }
        }

        [HttpPost(ActionsConst.Game.Game918KissRegister)]
        private async Task<IActionResult> Game918KissRegister([FromBody] Game918KissRegisterRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            if (request == null) return BadResponse("error_empty_request");

            using (var game_help = new GameHelpers(Connection: Connection))
            {
                var result = await game_help.Game918KissRegister(request: request);
                return OkResponse(result);
            }
        }

        [HttpPost(ActionsConst.Game.GameAGRegister)]
        private async Task<IActionResult> GameAGRegister([FromBody] GameAGRegisterRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            if (request == null) return BadResponse("error_empty_request");

            using (var game_help = new GameHelpers(Connection: Connection))
            {
                var result = await game_help.GameAGRegister(request: request);
                return OkResponse(result);
            }
        }

        [HttpPost(ActionsConst.Game.GameM8Register)]
        private async Task<IActionResult> GameM8Register([FromBody] GameM8RegisterRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            if (request == null) return BadResponse("error_empty_request");

            using (var game_help = new M8GameHelpers(Connection: Connection))
            {
                var limit = await game_help.M8DefaultLimitSelect();

                var Url = $"{GameConst.M8.baseURL}?" +
                                       $"secret={GameConst.M8.Secret}&" +
                                       $"action={GameConst.M8.Update}&" +
                                       $"agent={GameConst.M8.agent}&" +
                                       $"username={request.M8UserName}&" +
                                       $"max1={limit.Max1}&" +
                                       $"max2={limit.Max2}&" +
                                       $"max3={limit.Max3}&" +
                                       $"max4={limit.Max4}&" +
                                       $"max5={limit.Max5}&" +
                                       $"max6={limit.Max6}&" +
                                       $"max7={limit.Max7}&" +
                                       $"lim1={limit.Lim1}&" +
                                       $"lim2={limit.Lim2}&" +
                                       $"lim3={limit.Lim3}&" +
                                       $"lim4={limit.Lim4}&" +
                                       $"com1={limit.Com}&" +
                                       $"com2={limit.Com}&" +
                                       $"com3={limit.Com}&" +
                                       $"com4={limit.Com}&" +
                                       $"com5={limit.Com}&" +
                                       $"com6={limit.Com}&" +
                                       $"com7={limit.Com}&" +
                                       $"com8={limit.Com}&" +
                                       $"com9={limit.Com}&" +
                                       $"comtype={limit.Comtype}&" +
                                       $"suspend={limit.Suspend}";
                await GameHelpers.CallThirdPartyApi(Url, null);
                var result = await game_help.GameM8Register(request: request);
                return OkResponse(result);
            }
        }

        #endregion All game Register

        #region Users Select From Game

        [HttpPost(ActionsConst.Game.UsersSelectFromGame)]
        public async Task<IActionResult> UsersSelectFromGame([FromBody] GetByIdRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            if (request == null) return BadResponse("error_empty_request");

            using (var game_help = new GameHelpers(Connection: Connection))
            {
                var result = await game_help.SelectFromGame(request: request);
                return OkResponse(result);
            }
        }

        #endregion Users Select From Game

        #region Rebate Calculate

        [Authorize]
        [HttpPost(ActionsConst.Game.RebateCalculate)]
        public async Task<IActionResult> GetCalculateData([FromBody] RebateCalculateRequest request)
        {
            await CheckUserRole();
            using (var game_helper = new GameHelpers(Connection: Connection120))
            {
                var calculateData = await game_helper.GetCalculateData(request);

                var CommTotal = Math.Round(calculateData.Select(x => x.CommAmount).Sum(x => x), 2);
                var TurrnoverTotal = Math.Round(calculateData.Select(x => x.Turnover).Sum(x => x), 2);
                var BetTotal = Math.Round(calculateData.Select(x => x.Bet).Sum(x => x), 2);
                var RollingTotal = Math.Round(calculateData.Select(x => x.Rolling).Sum(x => x), 2);
                var WinLoseTotal = Math.Round(calculateData.Select(x => x.WinLose).Sum(x => x), 2);

                return OkResponse(new { CommTotal, TurrnoverTotal, BetTotal, RollingTotal, WinLoseTotal, calculateData }); ;
            }
        }

        #endregion Rebate Calculate

        #region Rebate

        [Authorize]
        [HttpPost(ActionsConst.Game.Rebate)]
        public async Task<IActionResult> GetRebate([FromBody] RebateCalculateRequest request)
        {
            await CheckUserRole();

            string adminId = GetUserId(User).ToString();

            using (var game_helper = new GameHelpers(Connection: Connection120))
            {
                var data = await game_helper.RebateOperation(request, adminId);

                if (data.Count == 0 || data.Count < 0)
                    return NotFoundResponse();

                return OkResponse(data);
            }
        }

        #endregion Rebate

        #region Auto Rebate

        [HttpPost(ActionsConst.Game.AutoRebate)]
        public async Task<IActionResult> GetAutoRebate([FromBody] AutoRebateCalculateRequest request)
        {
            if (request.Username.Equals("CustomerServicesAutoRebate") && request.Password.Equals("Customer!@#$%12345%$#@!Services"))
            {
                using (var game_helper = new GameHelpers(Connection: Connection120))
                {
                    var data = await game_helper.RebateOperation(request);

                    if (data.Count == 0 || data.Count < 0)
                        return NotFoundResponse();

                    return OkResponse(data);
                }
            }
            else
            {
                return BadResponse("error_invalid_login");
            }
        }

        #endregion Auto Rebate

        #region Rebate List

        [Authorize]
        [HttpPost(ActionsConst.Game.RebateList)]
        public async Task<IActionResult> RebateSelect([FromBody] RebateListRequest request)
        {
            await CheckUserRole();
            using (var game_helper = new GameHelpers(Connection: Connection))
            {
                var response = await game_helper.getRebateList(request.FromDate, request.ToDate, request.GameName);
                return OkResponse(response);
            }
        }

        #endregion Rebate List

        #region Rebate Details List

        [Authorize]
        [HttpPost(ActionsConst.Game.RebateDetailsList)]
        public async Task<IActionResult> RebateDetailsSelect([FromBody] GetByIdRequestWithRequired request)
        {
            await CheckUserRole();
            using (var game_helper = new GameHelpers(Connection: Connection))
            {
                return OkResponse(await game_helper.getRebateDetailsList(request.Id));
            }
        }

        #endregion Rebate Details List

        #region Rebate Delete

        [Authorize]
        [HttpPost(ActionsConst.Game.RebateDelete)]
        public async Task<IActionResult> RebateDelete([FromBody] GetByIdRequestWithRequired request)
        {
            await CheckUserRole();

            string adminId = GetUserId(User).ToString();

            using (var game_helper = new GameHelpers(Connection: Connection))
            {
                var users = await game_helper.getRebateDetailsList(request.Id);

                if (users.Count < 0 || users.Count == 0)
                    return NotFoundResponse();

                foreach (var d in users)
                {
                    await game_helper.RebateMainWalletDepositWithdraw(Username: d.Username, Amount: d.CommAmount, Method: "Withdraw", AdminId: adminId);
                }

                await game_helper.GameRebateDelete(request.Id, adminId);

                return OkResponse();
            }
        }

        #endregion Rebate Delete

        #region User Rebate History

        [Authorize]
        [HttpPost(ActionsConst.Game.UserRebateHistory)]
        public async Task<IActionResult> UserRebateHistory([FromBody] GlobalGetWithPaginationRequest request)
        {
            var Role = GetUserRole(User);
            request.UserId = Role == RoleConst.Users ? GetUserId(User).ToString() : request.UserId;

            using (var game_helper = new GameHelpers(Connection: Connection))
            {
                var list = await game_helper.getUserRebateHistory(request);
                if (list.Count != 0)
                {
                    var total = list.FirstOrDefault().Total;
                    var totalPages = GenericHelpers.CalculateTotalPages(total, request.PageSize == null ? list.Count : request.PageSize);

                    return OkResponse(new
                    {
                        result = list,
                        total = total,
                        totalPages = totalPages,
                        pageSize = request.PageSize ?? 10,
                        offset = list.FirstOrDefault().OffSet,
                    });
                }
                return OkResponse(new
                {
                    result = list,
                    total = 0,
                    totalPages = 0,
                    pageSize = 0,
                    offset = 0,
                });
            }
        }

        #endregion User Rebate History

        #region Manually Game Betting Details

        #region Joker Game

        [Authorize]
        [HttpPost(ActionsConst.Game.Manually_Joker_Betting_Details)]
        public async Task<IActionResult> ManuallyJokerBettingDetails([FromBody] GlobalBettingDetailsRequest request)
        {
            await CheckUserRole();

            DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Local);
            var temp = (long)DateTime.UtcNow.Subtract(UnixEpoch).TotalSeconds;

            string bodyParameter = $"EndDate={request.ToDate.ToString("yyyy-MM-dd")}&Method=RWL&StartDate={request.FromDate.ToString("yyyy-MM-dd")}&Timestamp={temp}";

            if (request.Username != null)
                bodyParameter += $"&Username={request.Username}";

            var url = $"{GameConst.Joker.jokerBaseUrl}?" +
                      $"AppID={GameConst.Joker.AppID}" +
                      $"&Signature={GameHelpers.GenerateHas(bodyParameter)}";

            var stringContent = new StringContent(bodyParameter, Encoding.UTF8, "application/x-www-form-urlencoded");

            var responseString = await GameHelpers.CallThirdPartyApi(url, stringContent);

            var JokerServices = JsonConvert.DeserializeObject<JokerServicesResponse>(responseString);

            return OkResponse(JokerServices);
        }

        #endregion Joker Game

        #region AG Game

        [Authorize]
        [HttpPost(ActionsConst.Game.Manually_AG_Betting_Details)]
        public async Task<IActionResult> ManuallyAGBettingDetails([FromBody] GlobalBettingDetailsRequest request)
        {
            await CheckUserRole();

            var url = $"{GameConst.AG.baseURL}getBetDetail?" +
                        $"vendor_id={GameConst.AG.VendorId}" +
                        $"&operator_id={GameConst.AG.OperatorId}" +
                        $"&from={request.FromDate.ToString("yyyy-MM-dd HH:mm:ss")}" +
                        $"&to={request.ToDate.ToString("yyyy-MM-dd HH:mm:ss")}";

            var responseString = await GameHelpers.CallThirdPartyApi(url);

            var agServices = JsonConvert.DeserializeObject<AGServicesResponse>(responseString);
            int total = agServices.total;

            if (agServices.page < agServices.total)
                for (int i = 2; i <= total; i++)
                {
                    var urlWithPage = $"{GameConst.AG.baseURL}getBetDetail?" +
                        $"vendor_id={GameConst.AG.VendorId}" +
                        $"&operator_id={GameConst.AG.OperatorId}" +
                        $"&from={request.FromDate.ToString("yyyy-MM-dd HH:mm:ss")}" +
                        $"&to={request.ToDate.ToString("yyyy-MM-dd HH:mm:ss")}" +
                        $"&page={i}";

                    responseString = await GameHelpers.CallThirdPartyApi(urlWithPage);
                    var agServices1 = JsonConvert.DeserializeObject<AGServicesResponse>(responseString);
                    agServices.trans.AddRange(agServices1.trans);
                }

            return OkResponse(agServices);
        }

        #endregion AG Game

        #region Playtech Game

        [Authorize]
        [HttpPost(ActionsConst.Game.Manually_Playtech_Betting_Details)]
        public async Task<IActionResult> ManuallyPlaytechBettingDetails([FromBody] GlobalBettingDetailsRequest request)
        {
            await CheckUserRole();
            int total = 1;
            var result = new List<Result>();
            for (int i = 1; i <= total; i++)
            {
                var url = $"{GameConst.Playtech.playtechBaseUrlwithoutPlayer}customreport/getdata/reportname/PlayerGames" +
                            $"?frozen=all" +
                            $"&perPage=50000" +
                            $"&startdate={request.FromDate.ToString("yyyy-MM-dd HH:mm:ss")}" +
                            $"&enddate={request.ToDate.ToString("yyyy-MM-dd HH:mm:ss")}" +
                            $"&page={i}";

                if (request.Username != null)
                    url += $"&playername={request.Username.ToUpper()}";

                DefaultHelper defaultHelper = new DefaultHelper(_hostingEnvironment);
                string responseString = await defaultHelper.PlaytechAPICertificate(url, true);

                if (responseString.Equals("Date range more than 30 minutes are not supported for all players games report, use shorter period or provide 'playername'"))
                    return BadResponse(responseString);

                var PlaytechServices = JsonConvert.DeserializeObject<PlaytechResponse>(responseString);
                total = PlaytechServices.pagination.totalPages;
                result.AddRange(PlaytechServices.result);
            }
            return OkResponse(result);
        }

        #endregion Playtech Game

        #region Maxbet Game

        [Authorize]
        [HttpPost(ActionsConst.Game.Manually_Maxbet_Betting_Details)]
        public async Task<IActionResult> ManuallyMaxbetBettingDetails([FromBody] MaxBetBettingDetails request)
        {
            await CheckUserRole();
            long versionKey = 0;
            using (MaxBetGameHelper game_helper = new MaxBetGameHelper(Connection))
            {
                var globalparameters = await game_helper.GetMaxBetGlobalParameters();
                versionKey = Convert.ToInt64(globalparameters.VersionKey);
            }

            if (!String.IsNullOrEmpty(request.VersionKey))
                versionKey = Convert.ToInt32(request.VersionKey);

            List<BetDetail> list = new List<BetDetail>();
            List<BetNumberDetails> numberList = new List<BetNumberDetails>();
            List<long> versionKeyList = new List<long>();
            do
            {
                var parameter = $"vendor_id={GameConst.MaxBet.VendorId}" +
                            $"&version_key={versionKey}" +
                            $"&options=";
                var url = $"{GameConst.MaxBet.baseURL}GetBetDetail";

                var response = JsonConvert.DeserializeObject<MaxBetServicesResponse>(await MaxBetGameHelper.CallThirdPartyApi(url, parameter));
                versionKeyList.Add(versionKey);
                versionKey = response.Data.LastVersionKey;

                if (response.Data.BetDetails != null)
                    list.AddRange(response.Data.BetDetails);

                if (response.Data.BetNumberDetails != null)
                    numberList.AddRange(response.Data.BetNumberDetails);
            }
            while (!versionKeyList.Contains(versionKey));
            return OkResponse(new MaxBetServicesResponse
            {
                ErrorCode = 0,
                Message = "",
                Data = new Data
                {
                    LastVersionKey = versionKey,
                    BetDetails = list,
                    BetNumberDetails = numberList
                }
            });
        }

        #endregion Maxbet Game

        #region 918 Kiss Game

        [Authorize]
        [HttpPost(ActionsConst.Game.Manually_918Kiss_Betting_Details)]
        public async Task<IActionResult> ManuallyKiss918BettingDetails([FromBody] GlobalBettingDetailsRequest request)
        {
            await CheckUserRole();
            string kiss918UserName = "webet333-api";
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            var kiss918URL = $"http://api.918kiss.com:9919/ashx/AgentTotalReport.ashx?" +
                             $"Type=ServerTotalReport" +
                             $"&userName={kiss918UserName}" +
                             $"&time={timestamp}" +
                             $"&authcode={GameConst.Kiss918.authcode}" +
                             $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Kiss918.authcode.ToLower() + kiss918UserName + timestamp + GameConst.Kiss918.SecretKey.ToLower()).ToUpper()}" +
                             $"&sDate={request.FromDate.ToString("yyyy-MM-dd HH:mm:ss")}" +
                             $"&eDate={request.ToDate.ToString("yyyy-MM-dd HH:mm:ss")}";

            var result = JsonConvert.DeserializeObject<Kiss918ServicesResponse>(await GameHelpers.CallThirdPartyApi(kiss918URL, null));
            return OkResponse(result);
        }

        #endregion 918 Kiss Game

        #region Pussy888 Game

        [Authorize]
        [HttpPost(ActionsConst.Game.Manually_Pussy888_Betting_Details)]
        public async Task<IActionResult> ManuallyPussy888BettingDetails([FromBody] GlobalBettingDetailsRequest request)
        {
            await CheckUserRole();
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            var Pussy888URL = $"{GameConst.Pussy888.BettingDetailsBaseUrl}{GameConst.Pussy888.BettingDetails}" +
                             $"Type=ServerTotalReport" +
                             $"&userName={GameConst.Pussy888.agent}" +
                             $"&time={timestamp}" +
                             $"&authcode={GameConst.Pussy888.AuthCode}" +
                             $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Pussy888.AuthCode.ToLower() + GameConst.Pussy888.agent + timestamp + GameConst.Pussy888.SecertKey.ToLower()).ToUpper()}" +
                             $"&sDate={request.FromDate.ToString("yyyy-MM-dd HH:mm:ss")}" +
                             $"&eDate={request.ToDate.ToString("yyyy-MM-dd HH:mm:ss")}";

            var result = JsonConvert.DeserializeObject<Pussy888BettingDetailsResponse>(await GameHelpers.CallThirdPartyApi(Pussy888URL, null));
            return OkResponse(result);
        }

        #endregion Pussy888 Game

        #region Mega888 Game

        [Authorize]
        [HttpPost(ActionsConst.Game.Manually_Mega888_Betting_Details)]
        public async Task<IActionResult> ManuallyMegaBettingDetails([FromBody] GlobalBettingDetailsRequest request)
        {
            await CheckUserRole();
            var random = Guid.NewGuid().ToString();
            var mega888URL = $"{GameConst.Mega888.BaseUrl}{GameConst.Mega888.TotalBettingReport}" +
                             $"?random={random}"
                             + $"&digest={SecurityHelpers.MD5EncrptText(random + GameConst.Mega888.SN + GameConst.Mega888.AgentLoginId + GameConst.Mega888.SecretKey)}"
                             + $"&sn={GameConst.Mega888.SN}"
                             + $"&agentLoginId={GameConst.Mega888.AgentLoginId}"
                             + $"&type=1"
                              + $"&method={GameConst.Mega888.TotalBettingReport}"
                             + $"&startTime={request.FromDate.ToString("yyyy-MM-dd HH:mm:ss")}"
                             + $"&endTime={request.ToDate.ToString("yyyy-MM-dd HH:mm:ss")}";

            dynamic mega888Response = JsonConvert.DeserializeObject<Mega888ServicesResponse>(await GameHelpers.CallThirdPartyApi(mega888URL, null));

            return OkResponse(mega888Response);
        }

        #endregion Mega888 Game

        #region M8 Game

        [Authorize]
        [HttpGet(ActionsConst.Game.Manually_M8_Betting_Details)]
        public async Task<IActionResult> ManuallyM8BettingDetails()
        {
            await CheckUserRole();
            var url = $"{GameConst.M8.baseURL}?" +
                        $"secret={GameConst.M8.Secret}" +
                        $"&agent={GameConst.M8.agent}" +
                        $"&action={GameConst.M8.fetch}" +
                        $"&lang={GameConst.M8.LanguageCode}";

            var responseString = await GameHelpers.CallThirdPartyApi(url);
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(responseString);

            string json = JsonConvert.SerializeXmlNode(doc);
            return OkResponse(JsonConvert.DeserializeObject(json));
        }

        #endregion M8 Game

        #region DG Game

        [Authorize]
        [HttpGet(ActionsConst.Game.Manually_DG_Betting_Details)]
        public async Task<IActionResult> ManuallyDGBettingDetails()
        {
            await CheckUserRole();
            var random = DGGameHelpers.RandomString();
            var apiRequest = new DgApiBettingDetailsRequest
            {
                token = SecurityHelpers.MD5EncrptText(GameConst.DG.agentName + GameConst.DG.apiKey + random),
                random = random,
            };

            var url = $"{GameConst.DG.baseUrl}{GameConst.DG.BettingDetails}{GameConst.DG.agentName}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(apiRequest), Encoding.UTF8, "application/json");
            var result = JsonConvert.DeserializeObject<DgApiBettingDetailsResponse>(await GameHelpers.CallThirdPartyApi(url, stringContent));
            return OkResponse(result);
        }

        #endregion DG Game

        #region Sexy baccarat game

        [Authorize]
        [HttpPost(ActionsConst.Game.Manually_Sexy_Betting_Details)]
        public async Task<IActionResult> ManuallySexyBettingDetails([FromBody] SexyBaccaratManuallyBettingDetailsRequest request)
        {
            await CheckUserRole();

            if (DateTime.Parse(request.ToDate).Subtract(DateTime.Parse(request.FromDate)).TotalMinutes > 60)
                return BadResponse("Time differenct more than 60 ");

            if (DateTime.Parse(request.ToDate).Subtract(DateTime.Parse(request.FromDate)).TotalMinutes < 0)
                return BadResponse("From Date is greater than To date");

            var url = $"{GameConst.SexyBaccaratConst.BettingDetailsURL}{GameConst.SexyBaccaratConst.BettingDetails}";

            var dict = new Dictionary<string, string>();
            dict.Add("cert", GameConst.SexyBaccaratConst.Cert);
            dict.Add("agentId", GameConst.SexyBaccaratConst.AgentId);
            dict.Add("startTime", request.FromDate);
            dict.Add("endTime", request.ToDate);
            dict.Add("platform", "SEXYBCRT");

            if (request.Username != null)
                dict.Add("userId", request.Username);

            HttpClientHandler handler = new HttpClientHandler()
            {
                AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
            };

            var BettingDetailsClient = new HttpClient(handler);
            var req = new HttpRequestMessage(HttpMethod.Post, url) { Content = new FormUrlEncodedContent(dict) };
            var httpResponseMessage = await BettingDetailsClient.SendAsync(req);
            var response = JsonConvert.DeserializeObject<SexyBaccaratBettingDetailsResponse>(await httpResponseMessage.Content.ReadAsStringAsync());

            return OkResponse(new { response });
        }

        #endregion Sexy baccarat game

        #region SA game

        [Authorize]
        [HttpPost(ActionsConst.Game.Manually_SA_Betting_Details)]
        public async Task<IActionResult> ManuallySABettingDetails([FromBody] GlobalBettingDetailsRequest request)
        {
            await CheckUserRole();

            if (request.ToDate.Subtract(request.FromDate).TotalDays > 1)
                return BadResponse("Time differenct more than 1 day");

            if (request.ToDate.Subtract(request.FromDate).TotalDays < 0)
                return BadResponse("From Date is greater than To date");

            var time = DateTime.Now.ToString("yyyyMMddhhmmss");
            var qs = $"method={GameConst.SAConst.BettingDetails}" +
                    $"&Key={GameConst.SAConst.SecretKey}" +
                    $"&Time={time}" +
                    $"&FromTime={request.FromDate:yyyy-MM-dd HH:mm:ss}" +
                    $"&ToTime={request.ToDate:yyyy-MM-dd HH:mm:ss}";

            if (request.Username != null)
                qs += $"&Username={request.Username}";

            var q = HttpUtility.UrlEncode(SecurityHelpers.DESEncrptText(qs, GameConst.SAConst.DESEncrptKey));
            var s = SecurityHelpers.MD5EncrptText(qs + GameConst.SAConst.MD5Key + time + GameConst.SAConst.SecretKey);

            var url = $"{GameConst.SAConst.APIBettingURL}?q={q}&s={s}";

            var response = XDocument.Parse(await GameHelpers.CallThirdPartyApi(url));

            return OkResponse(response.Descendants("BetDetail").ToList());
        }

        #endregion SA game

        #region Allbet game

        [Authorize]
        [HttpPost(ActionsConst.Game.Manually_AllBet_Betting_Details)]
        public async Task<IActionResult> ManuallyAllBetBettingDetails([FromBody] GlobalBettingDetailsRequest request)
        {
            await CheckUserRole();

            if (request.ToDate.Subtract(request.FromDate).Minutes > 59)
                return BadResponse("Time differenct more than 60 minute");

            if (request.ToDate.Subtract(request.FromDate).TotalDays < 0)
                return BadResponse("From Date is greater than To date");

            var response = await AllBetGameHelpers.BettingDetailsCallAPI(request.FromDate.ToString("yyyy-MM-dd HH:mm:ss"), request.ToDate.ToString("yyyy-MM-dd HH:mm:ss"));

            return OkResponse(response);
        }

        #region Allbet game betting details By user

        [Authorize]
        [HttpPost(ActionsConst.Game.Manually_AllBet_Betting_Details_ByUser)]
        public async Task<IActionResult> ManuallyAllBetBettingDetailsByUser([FromBody] GlobalBettingDetailsRequest request)
        {
            await CheckUserRole();

            if (request.ToDate.Subtract(request.FromDate).Minutes > 59)
                return BadResponse("Time differenct more than 60 minute");

            if (request.ToDate.Subtract(request.FromDate).TotalDays < 0)
                return BadResponse("From Date is greater than To date");

            var response = await AllBetGameHelpers.BettingDetailsByUserCallAPI(request.FromDate.ToString("yyyy-MM-dd HH:mm:ss"), request.ToDate.ToString("yyyy-MM-dd HH:mm:ss"), request.Username);

            return OkResponse(response);
        }

        #endregion Allbet game betting details By user

        #endregion Allbet game

        #region WM game

        [Authorize]
        [HttpPost(ActionsConst.Game.Manually_WM_Betting_Details)]
        public async Task<IActionResult> ManuallyWMBettingDetails([FromBody] GlobalBettingDetailsRequest request)
        {
            await CheckUserRole();

            if (request.ToDate.Subtract(request.FromDate).Minutes > 1439)
                return BadResponse("Time differenct more than  minute");

            if (request.ToDate.Subtract(request.FromDate).TotalDays < 0)
                return BadResponse("From Date is greater than To date");

            var response = await WMGameHelpers.BettingDetailsCallAPI(request.FromDate.ToString("yyyyMMddHHmmss"), request.ToDate.ToString("yyyyMMddHHmmss"), request.Username);

            return OkResponse(response);
        }

        #endregion WM game

        #region Pragmatic game

        [Authorize]
        [HttpPost(ActionsConst.Game.Manually_Pragmatic_Betting_Details)]
        public async Task<IActionResult> ManuallyPragmaticBettingDetails([FromBody] PragmaticBettingDetailsRequest request)
        {
            await CheckUserRole();

            DateTime date = request.StartTimeStamp.AddMinutes(-10);
            DateTime baseDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Local);
            var temp = (long)(date.ToUniversalTime() - baseDate).TotalMilliseconds;

            var response = await PragmaticGameHelpers.BettingDetails(temp);

            return OkResponse(response);
        }

        #endregion Pragmatic game

        #region YEEBET Game

        [Authorize]
        [HttpGet(ActionsConst.Game.Manually_YEEBET_Betting_Details)]
        public async Task<IActionResult> ManuallyYEEBETBettingDetails()
        {
            await CheckUserRole();

            var response = await YEEBETGameHelpers.BettingDetailsCallAPI();

            return OkResponse(response);
        }

        #endregion YEEBET Game

        #region SBO Game

        [Authorize]
        [HttpPost(ActionsConst.Game.Manually_SBO_Betting_Details)]
        public async Task<IActionResult> Manually_SBO_Betting_Details([FromBody] GlobalBettingDetailsRequest request)
        {
            await CheckUserRole();

            request.FromDate.AddHours(-12);
            request.ToDate.AddHours(-12);

            var response = await SBOGameHelpers.BettingDetailsCallAPI(request);

            return OkResponse(response);
        }

        #endregion SBO Game

        #endregion Manually Game Betting Details

        #region GAME BETTING DETAILS

        #region AG Betting Details

        [HttpGet(ActionsConst.Game.AG_Betting_Details)]
        public async Task<IActionResult> AGBettingDetails()
        {
            var startTime = DateTime.Now.AddMinutes(-5).ToString("yyyy-MM-dd HH:mm:ss");
            var endTime = DateTime.Now.AddMinutes(5).ToString("yyyy-MM-dd HH:mm:ss");
            var url = $"{GameConst.AG.baseURL}getBetDetail?" +
                        $"vendor_id={GameConst.AG.VendorId}" +
                        $"&operator_id={GameConst.AG.OperatorId}" +
                        $"&from={startTime}" +
                        $"&to={endTime}";

            var responseString = await GameHelpers.CallThirdPartyApi(url);

            var agServices = JsonConvert.DeserializeObject<AGServicesResponse>(responseString);

            int total = 10;
            for (int i = 2; i <= total; i++)
            {
                total = agServices.total;

                var urlWithPage = $"{GameConst.AG.baseURL}getBetDetail?" +
                        $"vendor_id={GameConst.AG.VendorId}" +
                        $"&operator_id={GameConst.AG.OperatorId}" +
                        $"&from={startTime}" +
                        $"&to={endTime}" +
                        $"&page={i}";

                responseString = await GameHelpers.CallThirdPartyApi(urlWithPage);

                var agServices1 = JsonConvert.DeserializeObject<AGServicesResponse>(responseString);
                if (agServices1.trans != null)
                    agServices.trans.AddRange(agServices1.trans);
            }

            using (var game_help = new GameHelpers(Connection: Connection))
            {
                try
                {
                    await game_help.AgServicesInsert(agServices);
                    return OkResponse();
                }
                catch (Exception ex)
                {
                    return OkResponse(ex.Message);
                }
            }
        }

        #endregion AG Betting Details

        #region Joker Betting Details

        [HttpGet(ActionsConst.Game.Joker_Betting_Details)]
        public async Task<IActionResult> JokerBettingDetails()
        {
            DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Local);
            var temp = (long)DateTime.UtcNow.Subtract(UnixEpoch).TotalSeconds;

            string bodyParameter = $"EndDate={DateTime.Now.ToString("yyyy-MM-dd")}" +
                                    $"&Method=RWL" +
                                    $"&StartDate=2018-01-01" +
                                    $"&Timestamp={temp}";

            var url = $"{GameConst.Joker.jokerBaseUrl}?" +
                $"AppID={GameConst.Joker.AppID}" +
                $"&Signature={GameHelpers.GenerateHas(bodyParameter)}";

            var stringContent = new StringContent(bodyParameter, Encoding.UTF8, "application/x-www-form-urlencoded");

            var responseString = await GameHelpers.CallThirdPartyApi(url, stringContent);

            var JokerServices = JsonConvert.DeserializeObject<JokerServicesResponse>(responseString);
            using (var game_help = new GameHelpers(Connection: Connection))
            {
                await game_help.JokerServicesInsert(JokerServices);
                return OkResponse();
            }
        }

        #endregion Joker Betting Details

        #region Playtech Betting Details

        [HttpGet(ActionsConst.Game.Playtech_Betting_Details)]
        public async Task<IActionResult> PlaytechBettingDetails()
        {
            int total = 1;
            DateTime date = DateTime.UtcNow.AddHours(8);
            List<Result> result = new List<Result>();
            var startDate = date.AddMinutes(-5).ToString("yyyy-MM-dd HH:mm:ss");
            var endDate = date.ToString("yyyy-MM-dd HH:mm:ss");
            for (int i = 1; i <= total; i++)
            {
                var url = $"{GameConst.Playtech.playtechBaseUrlwithoutPlayer}customreport/getdata/reportname/PlayerGames?" +
                    $"frozen=all" +
                    $"&perPage=50000" +
                    $"&startdate={startDate}" +
                    $"&enddate={endDate}" +
                    $"&page={i}";

                var defaultHelper = new DefaultHelper(_hostingEnvironment);
                string responseString = await defaultHelper.PlaytechAPICertificate(url, true);

                var PlaytechServices = JsonConvert.DeserializeObject<PlaytechResponse>(responseString);
                total = PlaytechServices.pagination.totalPages;

                result.AddRange(PlaytechServices.result);
            }

            using (var game_help = new GameHelpers(Connection: Connection))
            {
                if (result.Count > 0)
                    await game_help.PlaytechServicesInsert(result);
                return OkResponse();
            }
        }

        #endregion Playtech Betting Details

        #region Maxbet Betting Details

        [HttpGet(ActionsConst.Game.Maxbet_Betting_Details)]
        public async Task<IActionResult> MaxbetBettingDetails()
        {
            long versionKey = 26700815;
            using (MaxBetGameHelper game_helper = new MaxBetGameHelper(Connection))
            {
                var globalparameters = await game_helper.GetMaxBetGlobalParameters();
                versionKey = Convert.ToInt64(globalparameters.VersionKey);
            }
            List<BetDetail> list = new List<BetDetail>();
            List<BetNumberDetails> numberList = new List<BetNumberDetails>();
            List<long> versionKeyList = new List<long>();
            do
            {
                var parameter = $"vendor_id={GameConst.MaxBet.VendorId}" +
                        $"&version_key={versionKey}" +
                        $"&options=";
                var url = $"{GameConst.MaxBet.baseURL}GetBetDetail";

                var response = JsonConvert.DeserializeObject<MaxBetServicesResponse>(await MaxBetGameHelper.CallThirdPartyApi(url, parameter));
                versionKeyList.Add(versionKey);
                versionKey = response.Data.LastVersionKey;
                if (response.Data.BetDetails != null)
                    list.AddRange(response.Data.BetDetails);

                if (response.Data.BetNumberDetails != null)
                    numberList.AddRange(response.Data.BetNumberDetails);
            }
            while (!versionKeyList.Contains(versionKey));

            if (list.Count > 0 || numberList.Count > 0)
            {
                using (var game_helper = new GameHelpers(Connection))
                {
                    dynamic result = await game_helper.MaxBetServicesInsert(list, numberList, versionKey);
                }
            }
            return OkResponse();
        }

        #endregion Maxbet Betting Details

        #region M8 Betting Details

        [HttpGet(ActionsConst.Game.M8_Betting_Details)]
        public async Task<IActionResult> M8BettingDetails()
        {
            var url = $"{GameConst.M8.baseURL}?" +
                             $"secret={GameConst.M8.Secret}" +
                             $"&agent={GameConst.M8.agent}" +
                             $"&action={GameConst.M8.fetch}" +
                             $"&lang={GameConst.M8.LanguageCode}";

            var responseString = await GameHelpers.CallThirdPartyApi(url);
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(responseString);

            string json = JsonConvert.SerializeXmlNode(doc);
            dynamic jsonData = JsonConvert.DeserializeObject(json);
            var value = jsonData.response.errcode;
            if (value.Value == "0")
            {
                List<M8ServicesResponse> M8betting = JsonConvert.DeserializeObject<List<M8ServicesResponse>>(JsonConvert.SerializeObject(jsonData.response.result.ticket));
                using (var game_help = new GameHelpers(Connection: Connection))
                {
                    await game_help.M8ServicesInsert(M8betting);
                    return OkResponse(jsonData);
                }
            }
            return OkResponse(jsonData);
        }

        #endregion M8 Betting Details

        #region 918 Kiss Betting Details

        [HttpGet(ActionsConst.Game.Kiss918_Betting_Details)]
        public async Task<IActionResult> Kiss918BettingDetails()
        {
            string kiss918UserName = "webet333-api";
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            var kiss918URL = $"http://api.918kiss.com:9919/ashx/AgentTotalReport.ashx?" +
                             $"Type=ServerTotalReport" +
                             $"&userName={kiss918UserName}" +
                             $"&time={timestamp}" +
                             $"&authcode={GameConst.Kiss918.authcode}" +
                             $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Kiss918.authcode.ToLower() + kiss918UserName + timestamp + GameConst.Kiss918.SecretKey.ToLower()).ToUpper()}" +
                             $"&sDate={DateTime.Now.AddDays(-30).ToString("yyyy-MM-dd HH:mm:ss")}" +
                             $"&eDate={DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}";

            var result = JsonConvert.DeserializeObject<Kiss918ServicesResponse>(await GameHelpers.CallThirdPartyApi(kiss918URL, null));
            if (result != null)
            {
                if (result.results.Count > 0)
                    using (var game_help = new GameHelpers(Connection: Connection))
                    {
                        await game_help.Kiss918ServicesInsert(result);
                        return OkResponse(result);
                    }
            }
            return OkResponse(result);
        }

        #endregion 918 Kiss Betting Details

        #region Pussy Betting Details

        [HttpGet(ActionsConst.Game.Pussy888_Betting_Details)]
        public async Task<IActionResult> Pussy888BettingDetails()
        {
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            var kiss918URL = $"{GameConst.Pussy888.BettingDetailsBaseUrl}{GameConst.Pussy888.BettingDetails}" +
                             $"Type=ServerTotalReport" +
                             $"&userName={GameConst.Pussy888.agent}" +
                             $"&time={timestamp}" +
                             $"&authcode={GameConst.Pussy888.AuthCode}" +
                             $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Pussy888.AuthCode.ToLower() + GameConst.Pussy888.agent + timestamp + GameConst.Pussy888.SecertKey.ToLower()).ToUpper()}" +
                             $"&sDate=2018-7-1 14:21:00" +
                             $"&eDate={DateTime.Now.AddHours(10).ToString("yyyy-MM-dd HH:mm:ss")}";

            var result = JsonConvert.DeserializeObject<Pussy888BettingDetailsResponse>(await GameHelpers.CallThirdPartyApi(kiss918URL, null));
            if (result.results.Count > 0)
                using (var game_help = new GameHelpers(Connection: Connection))
                {
                    await game_help.Pussy888ServicesInsert(result.results);
                    return OkResponse();
                }
            return OkResponse(result);
        }

        #endregion Pussy Betting Details

        #region Mega888 Betting Details

        [HttpGet(ActionsConst.Game.Mega888_Betting_Details)]
        public async Task<IActionResult> MegaBettingDetails()
        {
            var date = DateTime.UtcNow.AddHours(8);
            var StartTime = date.AddDays(-2).ToString("yyyy-MM-dd HH:mm:ss");
            var EndTime = date.ToString("yyyy-MM-dd HH:mm:ss");
            var random = Guid.NewGuid().ToString();
            var mega888URL = $"{GameConst.Mega888.BaseUrl}{GameConst.Mega888.TotalBettingReport}" +
                             $"?random={random}"
                             + $"&digest={SecurityHelpers.MD5EncrptText(random + GameConst.Mega888.SN + GameConst.Mega888.AgentLoginId + GameConst.Mega888.SecretKey)}"
                             + $"&sn={GameConst.Mega888.SN}"
                             + $"&agentLoginId={GameConst.Mega888.AgentLoginId}"
                             + $"&type=1"
                             + $"&method={GameConst.Mega888.TotalBettingReport}"
                             + $"&startTime={StartTime}"
                             + $"&endTime={EndTime}";

            Mega888ServicesResponse mega888Response = JsonConvert.DeserializeObject<Mega888ServicesResponse>(await GameHelpers.CallThirdPartyApi(mega888URL, null));

            using (var game_help = new GameHelpers(Connection: Connection))
            {
                if (mega888Response != null)
                    await game_help.Mega888ServicesInsert(mega888Response);
                return OkResponse();
            }
        }

        #endregion Mega888 Betting Details

        #region DG Betting Details

        [HttpGet(ActionsConst.Game.Dg_Betting_Details)]
        public async Task<IActionResult> DGBettingDetails()
        {
            var random = DGGameHelpers.RandomString();
            var apiRequest = new DgApiBettingDetailsRequest
            {
                token = SecurityHelpers.MD5EncrptText(GameConst.DG.agentName + GameConst.DG.apiKey + random),
                random = random,
            };

            var url = $"{GameConst.DG.baseUrl}{GameConst.DG.BettingDetails}{GameConst.DG.agentName}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(apiRequest), Encoding.UTF8, "application/json");
            var result = JsonConvert.DeserializeObject<DgApiBettingDetailsResponse>(await GameHelpers.CallThirdPartyApi(url, stringContent));
            if (result.list == null)
                return OkResponse("No Record");
            try
            {
                using (var game_helper = new GameHelpers(Connection))
                {
                    var res = await game_helper.DGServicesInsert(result.list);
                    return OkResponse(result);
                }
            }
            catch
            {
                return OkResponse(result.list);
            }
        }

        #endregion DG Betting Details

        #region Sexy Betting Details

        [HttpGet(ActionsConst.Game.Sexy_Betting_Details)]
        public async Task<IActionResult> SexyBaccaratBettingDetails()
        {
            var url = $"{GameConst.SexyBaccaratConst.BettingDetailsURL}{GameConst.SexyBaccaratConst.BettingDetails}";

            var startTime = DateTime.Now.AddMinutes(-30).ToString("yyyy-MM-ddTHH:mm:sszzzzzz");
            var endTime = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:sszzzzzz");

            var dict = new Dictionary<string, string>();
            dict.Add("cert", GameConst.SexyBaccaratConst.Cert);
            dict.Add("agentId", GameConst.SexyBaccaratConst.AgentId);
            dict.Add("startTime", startTime);
            dict.Add("endTime", endTime);
            dict.Add("platform", "SEXYBCRT");

            HttpClientHandler handler = new HttpClientHandler()
            {
                AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
            };

            var BettingDetailsClient = new HttpClient(handler);
            var req = new HttpRequestMessage(HttpMethod.Post, url) { Content = new FormUrlEncodedContent(dict) };
            var httpResponseMessage = await BettingDetailsClient.SendAsync(req);
            var response = JsonConvert.DeserializeObject<SexyBaccaratBettingDetailsResponse>(await httpResponseMessage.Content.ReadAsStringAsync());

            try
            {
                if (response.Status == "0000" && response.Transactions != null)
                {
                    using (var game_helper = new GameHelpers(Connection))
                    {
                        var res = await game_helper.SexyServicesInsert(response.Transactions);
                        return OkResponse(new { response, startTime, endTime });
                    }
                }
            }
            catch
            {
                return OkResponse(new { response, startTime, endTime });
            }
            return OkResponse(new { response, startTime, endTime });
        }

        #endregion Sexy Betting Details

        #region SA Betting Details

        [HttpGet(ActionsConst.Game.Sa_Betting_Details)]
        public async Task<IActionResult> SABettingDetails()
        {
            var time = DateTime.Now.ToString("yyyyMMddhhmmss");
            var qs = $"method={GameConst.SAConst.BettingDetails}" +
                    $"&Key={GameConst.SAConst.SecretKey}" +
                    $"&Time={time}" +
                    $"&FromTime={DateTime.Now.AddHours(-23):yyyy-MM-dd HH:mm:ss}" +
                    $"&ToTime={DateTime.Now:yyyy-MM-dd HH:mm:ss}";

            var q = HttpUtility.UrlEncode(SecurityHelpers.DESEncrptText(qs, GameConst.SAConst.DESEncrptKey));
            var s = SecurityHelpers.MD5EncrptText(qs + GameConst.SAConst.MD5Key + time + GameConst.SAConst.SecretKey);

            var url = $"{GameConst.SAConst.APIBettingURL}?q={q}&s={s}";

            var response = XDocument.Parse(await GameHelpers.CallThirdPartyApi(url));
            if (response.Descendants("ErrorMsgId").Single().Value == "0")
            {
                if (response.Descendants("BetDetailList").Single().Value != null)
                    using (var game_helper = new GameHelpers(Connection))
                    {
                        var jsonString = JsonConvert.SerializeObject(response.Descendants("BetDetail").ToList());
                        await game_helper.SAServicesInsert(jsonString);
                    }
            }
            return OkResponse(response.Descendants("BetDetail").ToList());
        }

        #endregion SA Betting Details

        #region AllBet Betting Details

        [HttpGet(ActionsConst.Game.AllBet_Betting_Details)]
        public async Task<IActionResult> AllBetBettingDetails()
        {
            var response = await AllBetGameHelpers.BettingDetailsCallAPI();
            if (response.error_code == "OK")
            {
                if (response.histories.Count > 0)
                    using (var game_helper = new GameHelpers(Connection))
                    {
                        var jsonString = JsonConvert.SerializeObject(response.histories);
                        await game_helper.AllBetServicesInsert(jsonString);
                    }
            }
            return OkResponse(JsonConvert.SerializeObject(response));
        }

        #endregion AllBet Betting Details

        #region WM Betting Details

        [HttpGet(ActionsConst.Game.WM_Betting_Details)]
        public async Task<IActionResult> WMBettingDetails()
        {
            var time = DateTime.Now;
            var response = await WMGameHelpers.BettingDetailsCallAPI();

            if (response.errorCode == 0)
            {
                if (response.result.Count > 0)
                    using (var game_helper = new GameHelpers(Connection))
                    {
                        var jsonString = JsonConvert.SerializeObject(response.result);
                        await game_helper.WMServicesInsert(jsonString);
                    }
            }

            return OkResponse(new
            {
                jsonString = JsonConvert.SerializeObject(response),
                startTime = time.AddMinutes(-5).ToString("yyyyMMddHHmmss"),
                endtime = time.ToString("yyyyMMddHHmmss")
            });
        }

        #endregion WM Betting Details

        #region Pragmatic Betting Details

        [HttpGet(ActionsConst.Game.Pragmatic_Betting_Details)]
        public async Task<IActionResult> PragmaticBettingDetails()
        {
            DateTime date = DateTime.Now.AddMinutes(-5);
            DateTime baseDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Local);
            var temp = (long)(date.ToUniversalTime() - baseDate).TotalMilliseconds;

            var response = await PragmaticGameHelpers.BettingDetails(temp);
            if (response.Count > 0)
            {
                using (var game_helper = new GameHelpers(Connection))
                {
                    var jsonString = JsonConvert.SerializeObject(response);
                    await game_helper.PragmaticServicesInsert(jsonString);
                }
            }

            return OkResponse(new { response, timestamp = temp });
        }

        #endregion Pragmatic Betting Details

        #region YEEBET Betting Details

        [HttpGet(ActionsConst.Game.YEEBET_Betting_Details)]
        public async Task<IActionResult> YEEBETBettingDetails()
        {
            var response = await YEEBETGameHelpers.BettingDetailsCallAPI();

            if (response.result == 0)
                if (response.arraysize > 0)
                    using (var game_helper = new GameHelpers(Connection))
                    {
                        var jsonString = JsonConvert.SerializeObject(response.array);
                        await game_helper.YEEBETServicesInsert(jsonString);

                        // Remove bets from get betting details API to avoid duplicate.
                        var ids = response.array.Select(X => X.id).ToList();
                        await YEEBETGameHelpers.RemoveBettingDetailsCallAPI(ids);
                    }

            return OkResponse(new
            {
                jsonString = JsonConvert.SerializeObject(response)
            });
        }

        #endregion YEEBET Betting Details

        #region SBO Betting Details

        [HttpGet(ActionsConst.Game.SBO_Betting_Details)]
        public async Task<IActionResult> SBO_Betting_Details()
        {
            DateTime date = DateTime.Now.AddHours(-12);

            GlobalBettingDetailsRequest request = new GlobalBettingDetailsRequest
            {
                FromDate = date.AddMinutes(-10),
                ToDate = date
            };

            var response = await SBOGameHelpers.BettingDetailsCallAPI(request);

            if (response.Error.Id == 0)
                using (var game_helper = new GameHelpers(Connection))
                {
                    var jsonString = JsonConvert.SerializeObject(response.Result);
                    await game_helper.SBOServicesInsert(jsonString);
                }

            return OkResponse(new
            {
                jsonString = JsonConvert.SerializeObject(response)
            });
        }

        #endregion SBO Betting Details

        #endregion GAME BETTING DETAILS

        #region Game Category

        [Authorize]
        [HttpGet(ActionsConst.Game.GameCategory)]
        public async Task<IActionResult> GetGameCategory()
        {
            await CheckUserRole();
            using (var game_helper = new GameHelpers(Connection: Connection))
            {
                var result = await game_helper.GetCategory();
                return OkResponse(result); ;
            }
        }

        #endregion Game Category

        #region Game Betting Details save

        #region Joker Game

        [Authorize]
        [HttpPost(ActionsConst.Game.JokerBettingDetailsSave)]
        public async Task<IActionResult> JokerBettingDetails_Insert([FromBody] GameBettingDetailsInsertRequest request)
        {
            await CheckUserRole();
            var JokerBetting = JsonConvert.DeserializeObject<List<Winloss>>(request.JsonData.ToString());
            using (var game_help = new GameHelpers(Connection: Connection))
            {
                await game_help.JokerBettingDetailsSave(JokerBetting);
                return OkResponse();
            }
        }

        #endregion Joker Game

        #region Mega888 Game

        [Authorize]
        [HttpPost(ActionsConst.Game.Mega888BettingDetailsSave)]
        public async Task<IActionResult> Mega888BettingDetails_Insert([FromBody] GameBettingDetailsInsertRequest request)
        {
            await CheckUserRole();
            var Mega888Betting = JsonConvert.DeserializeObject<Mega888ServicesResponse>(request.JsonData.ToString());
            using (var game_help = new GameHelpers(Connection: Connection))
            {
                await game_help.Mega888ServicesInsert(Mega888Betting);
                return OkResponse();
            }
        }

        #endregion Mega888 Game

        #region 918 Kiss Game

        [Authorize]
        [HttpPost(ActionsConst.Game.Kiss918BettingDetailsSave)]
        public async Task<IActionResult> Kiss918BettingDetails_Insert([FromBody] GameBettingDetailsInsertRequest request)
        {
            await CheckUserRole();
            var Kiss918Betting = JsonConvert.DeserializeObject<Kiss918ServicesResponse>(request.JsonData.ToString());
            using (var game_help = new GameHelpers(Connection: Connection))
            {
                await game_help.Kiss918ServicesInsert(Kiss918Betting);
                return OkResponse();
            }
        }

        #endregion 918 Kiss Game

        #region Pussy888 Game

        [Authorize]
        [HttpPost(ActionsConst.Game.Pussy888BettingDetailsSave)]
        public async Task<IActionResult> PussyBettingDetails_Insert([FromBody] GameBettingDetailsInsertRequest request)
        {
            await CheckUserRole();
            var Pussy888Betting = JsonConvert.DeserializeObject<Pussy888BettingDetailsResponse>(request.JsonData.ToString());
            using (var game_help = new GameHelpers(Connection: Connection))
            {
                await game_help.Pussy888ServicesInsert(Pussy888Betting.results);
                return OkResponse();
            }
        }

        #endregion Pussy888 Game

        #region AG Game

        [Authorize]
        [HttpPost(ActionsConst.Game.AGBettingDetailsSave)]
        public async Task<IActionResult> AGBettingDetails_Insert([FromBody] GameBettingDetailsInsertRequest request)
        {
            await CheckUserRole();
            AGServicesResponse AGbetting = JsonConvert.DeserializeObject<AGServicesResponse>(request.JsonData.ToString());
            using (var game_help = new GameHelpers(Connection: Connection))
            {
                await game_help.AgServicesInsert(AGbetting);
                return OkResponse();
            }
        }

        #endregion AG Game

        #region M8 Game

        [Authorize]
        [HttpPost(ActionsConst.Game.M8BettingDetailsSave)]
        public async Task<IActionResult> M8BettingDetails_Insert([FromBody] M8GameBettingDetailsInsertRequest request)
        {
            await CheckUserRole();

            List<M8ServicesResponse> M8betting = JsonConvert.DeserializeObject<List<M8ServicesResponse>>(request.JsonData.ToString());
            List<M8ServicesResponse> response = new List<M8ServicesResponse>();

            foreach (string fetchId in request.FetchId)
            {
                response.AddRange(M8betting.Where(x => x.fid == fetchId));
            }

            using (var game_help = new GameHelpers(Connection: Connection))
            {
                await game_help.M8ServicesInsert(response);
                return OkResponse();
            }
        }

        #endregion M8 Game

        #region Playtech Game

        [Authorize]
        [HttpPost(ActionsConst.Game.PlaytechBettingDetailsSave)]
        public async Task<IActionResult> PlaytechBettingDetails_Insert([FromBody] GameBettingDetailsInsertRequest request)
        {
            await CheckUserRole();
            List<Result> PlaytechBetting = JsonConvert.DeserializeObject<List<Result>>(request.JsonData.ToString());
            using (var game_help = new GameHelpers(Connection: Connection))
            {
                await game_help.PlaytechServicesInsert(PlaytechBetting);
                return OkResponse();
            }
        }

        #endregion Playtech Game

        #region MaxBet Game

        [Authorize]
        [HttpPost(ActionsConst.Game.MaxBetBettingDetailsSave)]
        public async Task<IActionResult> MaxBetBettingDetails_Insert([FromBody] MaxBetGameBettingDetailsInsertRequest request)
        {
            await CheckUserRole();

            string adminId = GetUserId(User).ToString();

            MaxBetServicesResponse bettingDetailsList = JsonConvert.DeserializeObject<MaxBetServicesResponse>(request.JsonData.ToString());

            using (var game_help = new GameHelpers(Connection: Connection))
            {
                await game_help.MaxBetServicesInsert(bettingDetailsList.Data.BetDetails, bettingDetailsList.Data.BetNumberDetails, request.VersionKey, adminId: adminId);
                return OkResponse();
            }
        }

        #endregion MaxBet Game

        #region DG Game

        [Authorize]
        [HttpPost(ActionsConst.Game.DGBettingDetailsSave)]
        public async Task<IActionResult> DGBettingDetails_Insert([FromBody] GameBettingDetailsInsertRequest request)
        {
            await CheckUserRole();
            DgApiBettingDetailsResponse DGbetting = JsonConvert.DeserializeObject<DgApiBettingDetailsResponse>(request.JsonData.ToString());
            using (var game_help = new GameHelpers(Connection: Connection))
            {
                if (DGbetting.codeId == 0)
                {
                    await game_help.DGServicesInsert(DGbetting.list);
                }
                return OkResponse();
            }
        }

        #endregion DG Game

        #region Sexy baccarat Game

        [Authorize]
        [HttpPost(ActionsConst.Game.SexyBettingDetailsSave)]
        public async Task<IActionResult> SexyBettingDetails_Insert([FromBody] GameBettingDetailsInsertRequest request)
        {
            await CheckUserRole();
            SexyBaccaratBettingDetailsResponse sexybetting = JsonConvert.DeserializeObject<SexyBaccaratBettingDetailsResponse>(request.JsonData.ToString());
            using (var game_help = new GameHelpers(Connection: Connection))
            {
                if (sexybetting.Status == "0000")
                {
                    await game_help.SexyServicesInsert(sexybetting.Transactions);
                }
                return OkResponse();
            }
        }

        #endregion Sexy baccarat Game

        #region SA Game

        [Authorize]
        [HttpPost(ActionsConst.Game.SABettingDetailsSave)]
        public async Task<IActionResult> SABettingDetails_Insert([FromBody] GameBettingDetailsInsertRequest request)
        {
            await CheckUserRole();
            var result = JsonConvert.SerializeObject(request.JsonData);
            using (var game_help = new GameHelpers(Connection: Connection))
            {
                await game_help.SAServicesInsert(result);
                return OkResponse();
            }
        }

        #endregion SA Game

        #region AllBet Game

        [Authorize]
        [HttpPost(ActionsConst.Game.AllBetBettingDetailsSave)]
        public async Task<IActionResult> AllBetBettingDetails_Insert([FromBody] GameBettingDetailsInsertRequest request)
        {
            await CheckUserRole();
            var result = JsonConvert.SerializeObject(request.JsonData);
            using (var game_help = new GameHelpers(Connection: Connection))
            {
                await game_help.AllBetServicesInsert(result);
                return OkResponse();
            }
        }

        #endregion AllBet Game

        #region WM Game

        [Authorize]
        [HttpPost(ActionsConst.Game.WMBettingDetailsSave)]
        public async Task<IActionResult> WMBettingDetails_Insert([FromBody] GameBettingDetailsInsertRequest request)
        {
            await CheckUserRole();
            var result = JsonConvert.SerializeObject(request.JsonData);
            using (var game_help = new GameHelpers(Connection: Connection))
            {
                await game_help.WMServicesInsert(result);
                return OkResponse();
            }
        }

        #endregion WM Game

        #region Pragmatic Game

        [Authorize]
        [HttpPost(ActionsConst.Game.PragmaticBettingDetailsSave)]
        public async Task<IActionResult> PragmaticBettingDetails_Insert([FromBody] GameBettingDetailsInsertRequest request)
        {
            await CheckUserRole();
            var result = JsonConvert.SerializeObject(request.JsonData);
            using (var game_help = new GameHelpers(Connection: Connection))
            {
                await game_help.PragmaticServicesInsert(result);
                return OkResponse();
            }
        }

        #endregion Pragmatic Game

        #region YEEBET Game

        [Authorize]
        [HttpPost(ActionsConst.Game.YEEBETBettingDetailsSave)]
        public async Task<IActionResult> YEEBETBettingDetails_Insert([FromBody] GameBettingDetailsInsertRequest request)
        {
            await CheckUserRole();

            if (request.JsonData != null)
            {
                List<YEEBETBettingDetailsResult> result = JsonConvert.DeserializeObject<List<YEEBETBettingDetailsResult>>(request.JsonData.ToString());

                if (result.Any())
                {
                    using (var game_help = new GameHelpers(Connection: Connection))
                    {
                        await game_help.YEEBETServicesInsert(request.JsonData);

                        var ids = result.Select(X => X.id).ToList();
                        await YEEBETGameHelpers.RemoveBettingDetailsCallAPI(ids);
                    }
                }
            }

            return OkResponse();
        }

        #endregion YEEBET Game

        #region SBO Game

        [Authorize]
        [HttpPost(ActionsConst.Game.SBOBettingDetailsSave)]
        public async Task<IActionResult> SBOBettingDetails_Insert([FromBody] GameBettingDetailsInsertRequest request)
        {
            await CheckUserRole();

            if (request.JsonData != null)
            {
                List<SBOBettingDetailsResponseResult> result = JsonConvert.DeserializeObject<List<SBOBettingDetailsResponseResult>>(request.JsonData.ToString());

                if (result.Any())
                {
                    using (var game_help = new GameHelpers(Connection: Connection))
                    {
                        await game_help.SBOServicesInsert(request.JsonData);
                    }
                }
            }

            return OkResponse();
        }

        #endregion SBO Game

        #endregion Game Betting Details save

        #region User Balance

        [Authorize]
        [HttpPost(ActionsConst.Game.GameWalletBalance)]
        public async Task<IActionResult> Balance([FromBody] GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string username,
                kiss918UserName,
                vendorMemeberId,
                mega888LoginId,
                AGUsername,
                PlaytechUsername,
                Mega888Username,
                Kiss918Username,
                JokerUsername,
                MaxbetUsername,
                M8Username;

            DefaultHelper defaultHelper = new DefaultHelper(_hostingEnvironment);

            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.Username;
                kiss918UserName = user.Username918;
                vendorMemeberId = user.VendorMemberId;
                mega888LoginId = user.Mega888LoginId;
                AGUsername = user.AGGamePrefix + user.Username;
                PlaytechUsername = user.PlaytechGamePrefix + user.Username;
                Mega888Username = user.Mega888GamePrefix + user.Username;
                Kiss918Username = user.Kiss918GamePrefix + user.Username;
                JokerUsername = user.JokerGamePrefix + user.Username;
                MaxbetUsername = user.MaxbetGamePrefix + user.Username;
                M8Username = user.M8GamePrefix + user.Username;
            }

            DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Local);
            var temp = (long)DateTime.UtcNow.Subtract(UnixEpoch).TotalSeconds;
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            var perameter = $"Method={GameConst.Joker.GetCredit}&Timestamp={temp}&Username={JokerUsername}";
            var stringContent = new StringContent(perameter, Encoding.UTF8, "application/x-www-form-urlencoded");

            var jokerURL = $"{GameConst.Joker.jokerBaseUrl}?" +
                            $"AppID={GameConst.Joker.AppID}&" +
                            $"Signature={GameHelpers.GenerateHas(perameter)}";

            var agURL = $"{GameConst.AG.baseURL}" +
                            $"{GameConst.AG.GetBalance}" +
                            $"?vendor_id={GameConst.AG.VendorId}" +
                            $"&operator_id={GameConst.AG.OperatorId}" +
                            $"&currency={GameConst.AG.Currency}" +
                            $"&user_id={AGUsername}";

            var kiss918URL = $"{GameConst.Kiss918.baseURL}account.ashx?" +
                            $"action={GameConst.Kiss918.userInfo}" +
                            $"&userName={kiss918UserName}" +
                            $"&time={timestamp}" +
                            $"&authcode={GameConst.Kiss918.authcode}" +
                            $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Kiss918.authcode.ToLower() + kiss918UserName + timestamp + GameConst.Kiss918.SecretKey.ToLower()).ToUpper()}";

            var M8URL = $"{GameConst.M8.baseURL}?" +
                        $"action={GameConst.M8.Balance}&" +
                        $"secret={GameConst.M8.Secret}&" +
                        $"agent={GameConst.M8.agent}&" +
                        $"username={M8Username.Trim()}";

            var PlaytechURL = $"{GameConst.Playtech.playtechBaseUrl}" +
                                $"balance?playername={PlaytechUsername.ToUpper()}";

            var maxBetUrl = $@"{GameConst.MaxBet.baseURL}CheckUserBalance?"
                             + $"&vendor_id={GameConst.MaxBet.VendorId}"
                             + $"&vendor_member_ids={vendorMemeberId}"
                             + $"&wallet_id={GameConst.MaxBet.WalletId}"
                             + $"&operatorid={GameConst.MaxBet.OperatorId}";

            var random = Guid.NewGuid().ToString();
            var mega888Url = $"{GameConst.Mega888.BaseUrl}"
                             + $"{GameConst.Mega888.Balance}"
                             + $"?random={random}"
                             + $"&digest={SecurityHelpers.MD5EncrptText(random + GameConst.Mega888.SN + mega888LoginId + GameConst.Mega888.SecretKey)}"
                             + $"&sn={GameConst.Mega888.SN}"
                             + $"&method={GameConst.Mega888.Balance}"
                             + $"&loginId={mega888LoginId}";

            dynamic resultJoker = JsonConvert.DeserializeObject(await GameHelpers.CallThirdPartyApi(jokerURL, stringContent));
            dynamic resultAG = JsonConvert.DeserializeObject(await GameHelpers.CallThirdPartyApi(agURL, null));
            dynamic resultKiss918 = JsonConvert.DeserializeObject(await GameHelpers.CallThirdPartyApi(kiss918URL, null));
            dynamic resultMaxBet = JsonConvert.DeserializeObject(await GameHelpers.CallThirdPartyApi(maxBetUrl, null));
            var resultM8 = XDocument.Parse(await GameHelpers.CallThirdPartyApi(M8URL, null));
            dynamic resultPlaytech = JsonConvert.DeserializeObject(await defaultHelper.PlaytechAPICertificate(PlaytechURL, true));
            dynamic resultMega888 = JsonConvert.DeserializeObject(await GameHelpers.CallThirdPartyApi(mega888Url, null));

            var M8Balance = resultM8.Descendants("result").Single().Value == "" ? "0.0" : resultM8.Descendants("result").Single().Value;
            var JokerBalance = resultJoker.Credit == null ? "0.0" : resultJoker.Credit;
            var Kiss918Balance = resultKiss918 != null ? (resultKiss918.success == true ? resultKiss918.ScoreNum : "0.0") : "0.0";
            var AGBalance = resultAG.amount == null ? "0.0" : resultAG.amount;
            var MaxbetBalance = resultMaxBet.error_code == 0 ? resultMaxBet.Data[0].balance : "0.0";
            var PlaytechBalance = resultPlaytech.result.balance == null ? "0.0" : resultPlaytech.result.balance;
            var Mega888Balance = Convert.ToString(resultMega888.error) == "" ? resultMega888.result : "0.0";

            using (var gamehelper = new GameHelpers(Connection))
            {
                var Walletbalance = await gamehelper.GetWaletUserBalance(
                    StoredProcConsts.Payments.UserWalletBalanceUpdate, userid: request.Id, m8walletName: "M8 Wallet", m8wallet: M8Balance.ToString(), playtechwalletName: "PlayTech Wallet", playtechwallet: PlaytechBalance.ToString(), agwalletName: "AG Wallet", agwallet: AGBalance.ToString(), jokerwalletName: "Joker Wallet", jokerwallet: JokerBalance.ToString(), _918kisswaletName: "918Kiss Wallet", _918kisswalet: Kiss918Balance.ToString(), maxbetWaletName: "MaxBet Wallet", maxbetAmount: MaxbetBalance.ToString(), mega888WaletName: "Mega888 Wallet", mega888Amount: Mega888Balance.ToString());

                return OkResponse(new { Walletbalance });
            }
        }

        #endregion User Balance

        #region Game Restore Balance

        [Authorize]
        [HttpPost(ActionsConst.Game.GameWalletBalanceRestore)]
        public async Task<IActionResult> UserBalanceRestore([FromBody] GamBalanceRestoreRequest request)
        {
            var Role = GetUserRole(User);
            var UserId = GetUserId(User).ToString();
            if (Role == RoleConst.Users) request.Id = UserId;

            if (Role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse("error_invalid_modelstate");

            GetBalanceUserResponse user;
            string AGUsername,
                PlaytechUsername,
                DGUsername,
                SAUsername,
                SexyUsername,
                JokerUsername,
                M8Username,
                MaxBetUsername,
                WMUsername,
                AllbetUsername,
                PragmaticUsername,
                YeeBetUsername,
                SBOUsername;

            using (var account_helper = new AccountHelpers(Connection))
            {
                user = await account_helper.UserGetBalanceInfo(request.Id);
                AllbetUsername = user.AllBetGamePrefix + user.UserId;
                AGUsername = user.AGGamePrefix + user.Username;
                PlaytechUsername = user.PlaytechGamePrefix + user.Username;
                DGUsername = user.DGGamePrefix + user.Username;
                SAUsername = user.SAGamePrefix + user.Username;
                SexyUsername = user.SexyGamePrefix + user.Username;
                JokerUsername = user.JokerGamePrefix + user.Username;
                M8Username = user.M8GamePrefix + user.Username;
                MaxBetUsername = user.MaxbetGamePrefix + user.Username;
                WMUsername = user.WMGamePrefix + user.UserId;
                PragmaticUsername = user.PragmaticGamePrefix + user.UserId;
                YeeBetUsername = user.YEEBETGamePrefix + user.UserId;
                SBOUsername = user.SBOGamePrefix + user.UserId;
            }

            decimal mainBalance = 0.0m,
                AGBalance = 0.0m,
                DGBalance = 0.0m,
                PlaytechBalance = 0.0m,
                Kiss918Balance = 0.0m,
                MaxbetBalance = 0.0m,
                M8Balance = 0.0m,
                JokerBalance = 0.0m,
                Mega888Balance = 0.0m,
                SexyBaccaratBalance = 0.0m,
                SABalance = 0.0m,
                AllbetBalance = 0.0m,
                WMBalance = 0.0m,
                PragmaticBalance = 0.0m,
                PussyBalance = 0.0m,
                YeeBetBalance = 0.0m,
                SBOBalance = 0.0m;

            using (var game_helper = new GameHelpers(Connection))
            {
                if (request.AGWallet != 0)
                {
                    try
                    {
                        var resultAG = await game_helper.AGDepositWithdrawMethod(AGUsername, request.AGWallet, GameConst.AG.Withdraw);
                        mainBalance += resultAG.error_code == 0 ? request.AGWallet : 0;
                        AGBalance = resultAG.error_code == 0 ? request.AGWallet : 0;
                    }
                    catch
                    {
                    }
                }

                if (request.Pussy888Wallet != 0)
                {
                    try
                    {
                        var resultPussy888 = await Pussy888GameHelpers.CallTransferAPI(user.Pussy888Username, -Math.Abs(request.Pussy888Wallet));
                        mainBalance += resultPussy888.code == 0 ? request.Pussy888Wallet : 0;
                        PussyBalance = resultPussy888.code == 0 ? request.Pussy888Wallet : 0;
                    }
                    catch
                    {
                    }
                }

                if (request.PlayTechWallet != 0)
                {
                    try
                    {
                        var result = await game_helper.PlaytechWithdrawMehtod(PlaytechUsername, request.PlayTechWallet, _hostingEnvironment);
                        dynamic resultPlaytech = JObject.Parse(result);
                        mainBalance += resultPlaytech.result == "Withdraw OK" ? request.PlayTechWallet : 0;
                        PlaytechBalance = resultPlaytech.result == "Withdraw OK" ? request.PlayTechWallet : 0;
                    }
                    catch
                    {
                    }
                }

                if (request.JokerWallet != 0)
                {
                    try
                    {
                        dynamic resultJoker = JObject.Parse(await game_helper.JokerDepsoitWithdrawMethod(JokerUsername, -Math.Abs(request.JokerWallet)));
                        mainBalance += resultJoker.Message == null ? request.JokerWallet : 0;
                        JokerBalance = resultJoker.Message == null ? request.JokerWallet : 0;
                    }
                    catch
                    {
                    }
                }

                if (request.M8Wallet != 0)
                {
                    try
                    {
                        var resultM8 = XDocument.Parse(await game_helper.M8DepsoitWithdrawMethod(M8Username, request.M8Wallet, GameConst.M8.Withdraw));
                        mainBalance += resultM8.Descendants("errcode").Single().Value == "0" ? request.M8Wallet : 0;
                        M8Balance = resultM8.Descendants("errcode").Single().Value == "0" ? request.M8Wallet : 0;
                    }
                    catch
                    {
                    }
                }

                if (request.MaxBetWallet != 0)
                {
                    try
                    {
                        var resultMaxBet = await MaxBetGameHelper.CallMaxbetDepsoitWithdrawAPI(user.VendorMemberId, request.MaxBetWallet, 0);
                        mainBalance += resultMaxBet.ErrorCode == 0 ? request.MaxBetWallet : 0;
                        MaxbetBalance = resultMaxBet.ErrorCode == 0 ? request.MaxBetWallet : 0;
                    }
                    catch
                    {
                    }
                }

                if (request.Kiss918Wallet != 0)
                {
                    try
                    {
                        dynamic result918Kiss = JObject.Parse(await game_helper.Kiss918DepsoitWithdrawMehtod(user.Username918, -Math.Abs(request.Kiss918Wallet)));
                        mainBalance += result918Kiss.success == true ? request.Kiss918Wallet : 0;
                        Kiss918Balance = result918Kiss.success == true ? request.Kiss918Wallet : 0;
                    }
                    catch
                    { }
                }

                if (request.Mega888Wallet != 0)
                {
                    try
                    {
                        var resultMega888 = await Mega888GameHelpers.CallWithdrawDepositAPI(user.Mega888LoginId, -Math.Abs(request.Mega888Wallet));
                        mainBalance += resultMega888.error == null ? request.Mega888Wallet : 0;
                        Mega888Balance = resultMega888.error == null ? request.Mega888Wallet : 0;
                    }
                    catch { }
                }

                if (request.DgWallet != 0)
                {
                    try
                    {
                        var resultDg = await DGGameHelpers.CallWithdrawDepsoitAPI(DGUsername, "-" + request.DgWallet);
                        mainBalance += resultDg.codeId == 0 ? request.DgWallet : 0;
                        DGBalance = resultDg.codeId == 0 ? request.DgWallet : 0;
                    }
                    catch { }
                }

                if (request.SexyBaccaratWallet != 0)
                {
                    try
                    {
                        var resultSexy = await SexyBaccaratGameHelpers.CallWithdrawAPI(SexyUsername, request.SexyBaccaratWallet);
                        mainBalance += resultSexy.status == "0000" ? request.SexyBaccaratWallet : 0;
                        SexyBaccaratBalance = resultSexy.status == "0000" ? request.SexyBaccaratWallet : 0;
                    }
                    catch { }
                }

                if (request.SAWallet != 0)
                {
                    try
                    {
                        var resultSA = await SAGameHelpers.CallAPIWithdraw(SAUsername, request.SAWallet);
                        mainBalance += resultSA.Descendants("ErrorMsgId").Single().Value == "0" ? request.SAWallet : 0;
                        SABalance = resultSA.Descendants("ErrorMsgId").Single().Value == "0" ? request.SAWallet : 0;
                    }
                    catch
                    {
                    }
                }

                if (request.AllBetWallet != 0)
                {
                    try
                    {
                        var resultAllbet = await AllBetGameHelpers.DepositWithdrawCallAPI(AllbetUsername, 0, request.AllBetWallet);
                        mainBalance += resultAllbet.error_code == "OK" ? request.AllBetWallet : 0;
                        AllbetBalance = resultAllbet.error_code == "OK" ? request.AllBetWallet : 0;
                    }
                    catch
                    {
                    }
                }

                if (request.WMWallet != 0)
                {
                    try
                    {
                        var resultWM = await WMGameHelpers.TransferCallAPI(WMUsername, -Math.Abs(request.WMWallet));
                        mainBalance += resultWM.errorCode == 0 ? request.WMWallet : 0;
                        WMBalance = resultWM.errorCode == 0 ? request.WMWallet : 0;
                    }
                    catch
                    {
                    }
                }

                if (request.PragmaticWallet != 0)
                {
                    try
                    {
                        var resultPragmatic = await PragmaticGameHelpers.TransferBalance(PragmaticUsername, -Math.Abs(request.PragmaticWallet));
                        mainBalance += resultPragmatic.error == "0" ? request.PragmaticWallet : 0;
                        PragmaticBalance = resultPragmatic.error == "0" ? request.PragmaticWallet : 0;
                    }
                    catch
                    {
                    }
                }

                if (request.YeeBetWallet != 0)
                {
                    try
                    {
                        var resultYeeBet = await YEEBETGameHelpers.TransferBalanceAsync(YeeBetUsername, -Math.Abs(request.YeeBetWallet));
                        mainBalance += resultYeeBet.result == 0 ? request.YeeBetWallet : 0;
                        YeeBetBalance = resultYeeBet.result == 0 ? request.YeeBetWallet : 0;
                    }
                    catch
                    { }
                }

                if (request.SBOWallet != 0)
                {
                    try
                    {
                        var result = await SBOGameHelpers.CallWithdrawAPI(SBOUsername, Math.Abs(request.SBOWallet));

                        mainBalance += result.Error.Id == 0 ? request.SBOWallet : 0;

                        SBOBalance = result.Error.Id == 0 ? request.SBOWallet : 0;
                    }
                    catch
                    { }
                }

                await game_helper.BalanceRestore(
                    request.Id, UserId,
                    mainBalance,
                    AGBalance,
                    DGBalance,
                    PlaytechBalance,
                    Kiss918Balance,
                    MaxbetBalance,
                    M8Balance,
                    JokerBalance,
                    Mega888Balance,
                    SexyBaccaratBalance,
                    SABalance,
                    PussyBalance,
                    AllbetBalance,
                    WMBalance,
                    PragmaticBalance,
                    YeeBetBalance,
                    SBOBalance
                );

                return OkResponse(new { mainBalance, MaxbetBalance });
            }
        }

        #endregion Game Restore Balance

        #region Update Slots games app download link & Create Barcode

        [Authorize]
        [HttpPost(ActionsConst.Game.DownloadLinkUpdate)]
        public async Task<IActionResult> UpdateDownloadLink([FromBody] AppDownloadLinkUpdateRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();

            request.AdminId = GetUserId(User);

            string qrText = String.Empty;
            using (var game_helper = new GameHelpers(Connection))
            {
                var link = await game_helper.UpdateLink(request);
                if (link == null)
                    return BadResponse("Update Request fail");
                qrText = request.Link;
            }

            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(qrText,
            QRCodeGenerator.ECCLevel.Q);
            QRCode qrCode = new QRCode(qrCodeData);

            Bitmap bImage = qrCode.GetGraphic(5);

            System.IO.MemoryStream ms = new MemoryStream();
            bImage.Save(ms, ImageFormat.Jpeg);
            byte[] byteImage = ms.ToArray();
            var SigBase64 = Convert.ToBase64String(byteImage);

            using (var generic_help = new GenericHelpers(Connection))
            {
                generic_help.DeleteImage(uploadManager, request.Id.ToString(), BaseUrlConfigsOptions.Value.AppDownloadImage);
                generic_help.GetImage(uploadManager, SigBase64, BaseUrlConfigsOptions.Value.AppDownloadImage, request.Id.ToString());
            }
            await _hubContext.Clients.All.SendAsync("DownloadLinkUpdate");
            return OkResponse();
        }

        #endregion Update Slots games app download link & Create Barcode

        #region DownloadLink  List

        [HttpGet(ActionsConst.Game.DownloadLinkList)]
        public async Task<IActionResult> DownloadLinkSelect([FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOption)
        {
            using (var game_helper = new GameHelpers(Connection))
            {
                return OkResponse(await game_helper.GetDownloadLinkList(BaseUrlConfigsOption.Value));
            }
        }

        #endregion DownloadLink  List

        #region Global paramertes

        [HttpGet(ActionsConst.Game.GlobalParameter)]
        public async Task<IActionResult> GlobalParameters()
        {
            using (var game_helper = new GameHelpers(Connection))
            {
                var globalparameters = await game_helper.UserGetBalanceInfo();
                return OkResponse(globalparameters);
            }
        }

        #endregion Global paramertes

        #region Check users Register in Game

        [HttpGet(ActionsConst.Game.CheckGameRegister)]
        public async Task<IActionResult> CheckRegister()
        {
            using (var game_helper = new GameHelpers(Connection))
            {
                return OkResponse(await game_helper.CheckGameRegister());
            }
        }

        #endregion Check users Register in Game

        #region All game Register with Third Party API

        #region Joker Game Register

        [HttpPost(ActionsConst.Game.GameRegisterJoker)]
        public async Task<IActionResult> JokerGameRegister([FromBody] AllGameRegisterRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            if (request == null) return BadResponse("error_empty_request");

            DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Local);
            var temp = (long)DateTime.UtcNow.Subtract(UnixEpoch).TotalSeconds;
            var perameter = $"Method={GameConst.Joker.EnsureUserAccount}&Timestamp={temp}&Username={request.GamePrefix}{request.Username}";
            var stringContent = new StringContent(perameter, Encoding.UTF8, "application/x-www-form-urlencoded");

            var jokerURL = $"{GameConst.Joker.jokerBaseUrl}?" +
                           $"AppID={GameConst.Joker.AppID}&" +
                           $"Signature={GameHelpers.GenerateHas(perameter)}";
            dynamic apiResult = JsonConvert.DeserializeObject(await GameHelpers.CallThirdPartyApi(jokerURL, stringContent));

            if (apiResult.Status == "OK" || apiResult.Status == "Created")
            {
                var GameJokerRegister = new GameJokerRegisterRequest()
                {
                    APIResponse = apiResult,
                    JokerUserName = request.GamePrefix + request.Username,
                    UserId = request.UserId
                };
                using (var game_help = new GameHelpers(Connection: Connection))
                {
                    var result = await game_help.GameJokerRegister(request: GameJokerRegister);
                    return OkResponse(result);
                }
            }
            return BadResponse();
        }

        #endregion Joker Game Register

        #region Playtech Game Register

        [HttpPost(ActionsConst.Game.GameRegisterPlaytech)]
        public async Task<IActionResult> GameRegisterPlaytech([FromBody] AllGameRegisterRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            if (request == null) return BadResponse("error_empty_request");

            var PlaytechURL = $"{GameConst.Playtech.playtechBaseUrl}{GameConst.Playtech.Create}" +
                $"?playername={request.GamePrefix}{request.Username}" +
                $"&adminname={GameConst.Playtech.adminName}" +
                $"&kioskname={GameConst.Playtech.kioskname}" +
                $"&phone={request.MobileNo}" +
                $"&password={SecurityHelpers.DecryptPassword(request.Password)}";

            DefaultHelper defaultHelper = new DefaultHelper(_hostingEnvironment);
            dynamic apiResult = await defaultHelper.PlaytechAPICertificate(PlaytechURL, true);
            dynamic resultPlaytech;
            try
            {
                resultPlaytech = JsonConvert.DeserializeObject(apiResult);
            }
            catch (Exception ex)
            {
                return BadResponse(apiResult);
            }

            var apiResponse = new GamePlaytechRegisterRequest()
            {
                APIResponse = resultPlaytech,
                PlaytechUserName = request.GamePrefix + request.Username,
                UserId = request.UserId
            };
            using (var game_help = new GameHelpers(Connection: Connection))
            {
                var result = await game_help.GamePlaytechRegister(request: apiResponse);
                return OkResponse(result);
            }
        }

        #endregion Playtech Game Register

        #region 918 Kiss game Register

        [HttpPost(ActionsConst.Game.GameRegister918Kiss)]
        public async Task<IActionResult> GameRegister918Kiss([FromBody] AllGameRegisterRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            if (request == null) return BadResponse("error_empty_request");

            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

            var kiss918RandomUsername = $"{GameConst.Kiss918.baseURL}account.ashx?" +
                            $"action={GameConst.Kiss918.randomUsername}" +
                            $"&userName={GameConst.Kiss918.agent}" +
                            $"&UserAreaId=1" +
                            $"&time={timestamp}" +
                            $"&authcode={GameConst.Kiss918.authcode}" +
                            $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Kiss918.authcode.ToLower() + GameConst.Kiss918.agent + timestamp + GameConst.Kiss918.SecretKey.ToLower()).ToUpper()}";

            dynamic randomUsernameResult = JsonConvert.DeserializeObject(await GameHelpers.CallThirdPartyApi(kiss918RandomUsername, null));
            var password = GameHelpers.RandomPassword();
            var kiss918URL = $"{GameConst.Kiss918.baseURL}account.ashx?" +
                            $"action={GameConst.Kiss918.AddUser}" +
                            $"&agent={GameConst.Kiss918.agent}" +
                            $"&userName={randomUsernameResult.account}" +
                            $"&PassWd={password}" +
                            $"&Name={request.Name}" +
                            $"&Tel={request.MobileNo}" +
                            $"&Memo=null" +
                            $"&UserType=1" +
                            $"&UserAreaId=1" +
                            $"&time={timestamp}" +
                            $"&authcode={GameConst.Kiss918.authcode}" +
                            $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Kiss918.authcode.ToLower() + randomUsernameResult.account + timestamp + GameConst.Kiss918.SecretKey.ToLower()).ToUpper()}" +
                            $"&pwdtype=1";

            dynamic apiResult = JsonConvert.DeserializeObject(await GameHelpers.CallThirdPartyApi(kiss918URL, null));

            if (apiResult.code == 0)
            {
                var gameRequset = new Game918KissRegisterRequest()
                {
                    APIResponse = apiResult,
                    UserId = request.UserId,
                    _918KissUserName = randomUsernameResult.account
                };
                using (var game_help = new GameHelpers(Connection: Connection))
                {
                    var result = await game_help.Game918KissRegister(request: gameRequset);
                    var profileUpdate = new ProfileEditRequest()
                    {
                        Password918 = password
                    };
                    using (var user_help = new UserHelpers(Connection))
                        await user_help.UpdateProfile(profileUpdate);
                    return OkResponse(result);
                }
            }
            return BadResponse();
        }

        #endregion 918 Kiss game Register

        #region Ag Game Register

        [HttpPost(ActionsConst.Game.GameRegisterAG)]
        public async Task<IActionResult> AGGameRegister([FromBody] AllGameRegisterRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            if (request == null) return BadResponse("error_empty_request");

            var agURL = $"{GameConst.AG.baseURL}" +
                $"{GameConst.AG.CreateUser}" +
                $"?vendor_id={GameConst.AG.VendorId}" +
                $"&operator_id={GameConst.AG.OperatorId}" +
                $"&odd_type=A" +
                $"&currency={GameConst.AG.Currency}" +
                $"&user_id={request.GamePrefix}{request.Username}";

            dynamic apiResult = JsonConvert.DeserializeObject(await GameHelpers.CallThirdPartyApi(agURL, null));

            if (apiResult.error_code == 0)
            {
                var GameAGRegister = new GameAGRegisterRequest()
                {
                    AGUserName = request.GamePrefix + request.Username,
                    APIResponse = apiResult,
                    UserId = request.UserId
                };
                using (var game_help = new GameHelpers(Connection: Connection))
                {
                    var result = await game_help.GameAGRegister(request: GameAGRegister);
                    return OkResponse(result);
                }
            }
            return BadResponse();
        }

        #endregion Ag Game Register

        #region M8 Game Register

        [HttpPost(ActionsConst.Game.GameRegisterM8)]
        public async Task<IActionResult> GameRegisterM8([FromBody] AllGameRegisterRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            if (request == null) return BadResponse("error_empty_request");

            var username = request.GamePrefix + request.Username;
            var M8URL = $"{GameConst.M8.baseURL}?" +
                        $"action={GameConst.M8.CreateUser}&" +
                        $"secret={GameConst.M8.Secret}&" +
                        $"agent={GameConst.M8.agent}&" +
                        $"username={username}";

            var apiResult = await GameHelpers.CallThirdPartyApi(M8URL, null);

            var xmlResult = XDocument.Parse(apiResult);

            var Response = xmlResult.Root.ToString();
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(Response);
            string jsonText = JsonConvert.SerializeXmlNode(doc);
            dynamic JsonObject = JsonConvert.DeserializeObject(jsonText);
            if (xmlResult.Descendants("errcode").Single().Value == "0")
            {
                var gameRequest = new GameM8RegisterRequest()
                {
                    APIResponse = JsonObject.response,
                    UserId = request.UserId,
                    M8UserName = username
                };
                using (var game_help = new M8GameHelpers(Connection: Connection))
                {
                    var limit = await game_help.M8DefaultLimitSelect();
                    var Url = $"{GameConst.M8.baseURL}?" +
                                       $"secret={GameConst.M8.Secret}&" +
                                       $"action={GameConst.M8.Update}&" +
                                       $"agent={GameConst.M8.agent}&" +
                                       $"username={username}&" +
                                       $"max1={limit.Max1}&" +
                                       $"max2={limit.Max2}&" +
                                       $"max3={limit.Max3}&" +
                                       $"max4={limit.Max4}&" +
                                       $"max5={limit.Max5}&" +
                                       $"max6={limit.Max6}&" +
                                       $"max7={limit.Max7}&" +
                                       $"lim1={limit.Lim1}&" +
                                       $"lim2={limit.Lim2}&" +
                                       $"lim3={limit.Lim3}&" +
                                       $"lim4={limit.Lim4}&" +
                                       $"com1={limit.Com}&" +
                                       $"com2={limit.Com}&" +
                                       $"com3={limit.Com}&" +
                                       $"com4={limit.Com}&" +
                                       $"com5={limit.Com}&" +
                                       $"com6={limit.Com}&" +
                                       $"com7={limit.Com}&" +
                                       $"com8={limit.Com}&" +
                                       $"com9={limit.Com}&" +
                                       $"comtype={limit.Comtype}&" +
                                       $"suspend={limit.Suspend}";
                    await GameHelpers.CallThirdPartyApi(Url, null);

                    var result = await game_help.GameM8Register(request: gameRequest);
                    return OkResponse(result);
                }
            }
            return BadResponse();
        }

        #endregion M8 Game Register

        #region Pragmatic Game Register

        [HttpGet(ActionsConst.Game.GameRegisterPragmaticRemains)]
        public async Task<IActionResult> GameRegisterPragmatic()
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            //if (request == null) return BadResponse("error_empty_request");
            using (var game_helper = new GameHelpers(Connection: Connection))
            {
                var result = await game_helper.PragmaticNotRegisterUsers();
                if (result.Count == 0)
                {
                    return OkResponse("All Users registered with Pragmatic Game.");
                }
                else
                {
                    for (int i = 0; i < result.Count; i++)
                    {
                        string username;
                        using (var account_helper = new AccountHelpers(Connection))
                        {
                            var user = await account_helper.UserGetBalanceInfo(result[i].Id.ToString());
                            username = user.PragmaticGamePrefix + user.UserId;
                        }
                        var resultRegister = await PragmaticGameHelpers.RegisterCallAPI(username);
                        using (var pragmatic_helper = new PragmaticGameHelpers(Connection))
                        {
                            if (resultRegister.error == "0")
                                await pragmatic_helper.PragmaticRegister(result[i].Id.ToString(), username, JsonConvert.SerializeObject(resultRegister));
                        }
                    }
                }
                return OkResponse(result);
            }
        }

        #endregion Pragmatic Game Register

        #endregion All game Register with Third Party API

        #region M8 Bet Default Limit Update

        [Authorize]
        [HttpPost(ActionsConst.Game.M8GameSetLimit)]
        public async Task<IActionResult> M8SetLimitUpdate([FromBody] M8SetLimitRequest request)
        {
            await CheckUserRole();

            request.AdminId = GetUserId(User);

            using (var game_helper = new GameHelpers(Connection))
            {
                await game_helper.M8DefaultLimitUpdate(request);
                return OkResponse();
            }
        }

        #endregion M8 Bet Default Limit Update

        #region M8 Bet Default Limit Select

        [Authorize]
        [HttpGet(ActionsConst.Game.M8GameGetLimit)]
        public async Task<IActionResult> M8SetLimitSelect()
        {
            using (var m8_helper = new M8GameHelpers(Connection))
            {
                var result = await m8_helper.M8DefaultLimitSelect();
                return OkResponse(result);
            }
        }

        #endregion M8 Bet Default Limit Select

        #region M8 Bet Users Limit Reset

        [Authorize]
        [HttpGet(ActionsConst.Game.M8ResetSetLimit)]
        public async Task<IActionResult> M8UsersLimitReset()
        {
            await CheckUserRole();

            string adminId = GetUserId(User).ToString();

            using (var game_helper = new GameHelpers(Connection))
            {
                await game_helper.M8LimitReset(false, adminId: adminId);

                return OkResponse();
            }
        }

        #endregion M8 Bet Users Limit Reset

        #region M8 Users Bettting Limits Update in Third Party M8 game API

        [Authorize]
        [HttpPost(ActionsConst.Game.M8SetUsersBettingLimit)]
        public async Task<IActionResult> M8UserBettingLimitSet([FromBody] M8SetLimitRequestWithRequired request)
        {
            await CheckUserRole();
            if (!ModelState.IsValid) return BadResponse(ModelState);
            using (var game_helper = new GameHelpers(Connection))
            {
                var users = await game_helper.GetAllM8UsersSetLimit();
                if (users != null)
                {
                    Queue.Enqueue(async () =>
                    {
                        int i = 1;
                        var m8UsersSetBettingLimitsRequest = new List<M8UsersSetBettingLimitsRequest>();
                        foreach (var user in users)
                        {
                            var Url = $"{GameConst.M8.baseURL}?" +
                                        $"secret={GameConst.M8.Secret}&" +
                                        $"action={GameConst.M8.Update}&" +
                                        $"agent={GameConst.M8.agent}&" +
                                        $"username={user.Username}&" +
                                        $"max1={request.Max1}&" +
                                        $"max2={request.Max2}&" +
                                        $"max3={request.Max3}&" +
                                        $"max4={request.Max4}&" +
                                        $"max5={request.Max5}&" +
                                        $"max6={request.Max6}&" +
                                        $"max7={request.Max7}&" +
                                        $"lim1={request.Lim1}&" +
                                        $"lim2={request.Lim2}&" +
                                        $"lim3={request.Lim3}&" +
                                        $"lim4={request.Lim4}&" +
                                        $"com1={request.Com}&" +
                                        $"com2={request.Com}&" +
                                        $"com3={request.Com}&" +
                                        $"com4={request.Com}&" +
                                        $"com5={request.Com}&" +
                                        $"com6={request.Com}&" +
                                        $"com7={request.Com}&" +
                                        $"com8={request.Com}&" +
                                        $"com9={request.Com}&" +
                                        $"comtype={request.Comtype}&" +
                                        $"suspend={request.Suspend}";
                            var result = XDocument.Parse(await GameHelpers.CallThirdPartyApi(Url, null));

                            if (result.Descendants("errcode").Single().Value == "0")
                                m8UsersSetBettingLimitsRequest.Add(new M8UsersSetBettingLimitsRequest { Id = user.Id.ToString(), SetLimit = true, AdminId = GetUserId(User) });
                        }
                        using (var gamehelper = new GameHelpers(Connection))
                        {
                            await gamehelper.M8LimitSet(m8UsersSetBettingLimitsRequest);
                        }
                    });
                    return OkResponse();
                }
                return NotFoundResponse("Users Not Found");
            }
        }

        #endregion M8 Users Bettting Limits Update in Third Party M8 game API

        #region Main Wallet to All Wallet

        [Authorize]
        [HttpPost(ActionsConst.Game.BalacneInWallet)]
        public async Task<IActionResult> BalacneInWallet([FromBody] AllInWalletRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            var role = GetUserRole(User);
            if (role == RoleConst.Users) request.UserId = GetUserId(User).ToString();
            else if (String.IsNullOrEmpty(request.UserId)) return BadResponse("error_invalid_modelstate");

            UserDetailsTransferResponse userDetails;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.UserId, request.WalletName);
                userDetails = new UserDetailsTransferResponse()
                {
                    AGUserName = user.AGGamePrefix + user.Username,
                    AllBetUsername = user.AllBetGamePrefix + user.UserId,
                    DGUsername = user.DGGamePrefix + user.Username,
                    JokerUserName = user.JokerGamePrefix + user.Username,
                    M8UserName = user.M8GamePrefix + user.Username,
                    MaxBetUsername = user.VendorMemberId,
                    MegaUsername = user.Mega888LoginId,
                    _918KissUserName = user.Username918,
                    PlaytechUserName = user.PlaytechGamePrefix + user.Username,
                    PragmaticUsername = user.PragmaticGamePrefix + user.UserId,
                    Pussy888Username = user.Pussy888Username,
                    SAUsername = user.SAGamePrefix + user.Username,
                    SexyUsername = user.SexyGamePrefix + user.Username,
                    WMUsername = user.WMGamePrefix + user.UserId,
                    YEEBETUsername = user.YEEBETGamePrefix + user.UserId,
                    SBOUsername = user.SBOGamePrefix + user.UserId,

                    FromWalletIsMaintenance = false,
                    FromWalletName = "Main Wallet",
                    MainWalletBalance = (decimal)user.MainWalletAmount,
                    ToWalletIsMaintenance = (bool)user.ToWalletMaintenance,
                    ToWalletName = request.WalletName
                };
                request.ToWalletId = user.ToWalletId;
                request.FromWalletId = user.MainWalletId;
                request.Amount = (decimal)user.MainWalletAmount;
            }

            var responseId = await ApiLogsManager.APITransactionLogsInsert(new ApiLogTransactionRequest { Amount = request.Amount.ToString(), UserId = request.UserId, WalletId = request.ToWalletId, Request = JsonConvert.SerializeObject(request) });
            var Id = responseId.ID.ToString();

            if (userDetails.FromWalletIsMaintenance == true)
            {
                await ApiLogsManager.APITransactionLogsInsert(new ApiLogTransactionRequest { Id = Id, Response = Localizer["error_game_maintenance"].Value });
                return BadResponse("error_game_maintenance");
            }

            if (userDetails.ToWalletIsMaintenance == true)
            {
                await ApiLogsManager.APITransactionLogsInsert(new ApiLogTransactionRequest { Id = Id, Response = Localizer["error_game_maintenance"].Value });
                return BadResponse("error_game_maintenance");
            }

            if (userDetails.MainWalletBalance == 0)
            {
                return OkResponse();
            }

            using (var transferMoney_helper = new TransferMoneyHelpers(Connection, Localizer))
            {
                transferMoney_helper.UserBalanceIsBeginUpdate(request.UserId, true);
                //Withdraw From Wallet
                var WithdrawResponse = await transferMoney_helper.WithdrawFromWallet(userDetails, userDetails.FromWalletName, request.Amount, request.UserId.ToString(), _hostingEnvironment);
                if (string.IsNullOrEmpty(WithdrawResponse.ErrorMessage) && string.IsNullOrEmpty(WithdrawResponse.GameName) && string.IsNullOrEmpty(WithdrawResponse.GameResponse))
                {
                    // Deposit From Wallet
                    var DepositResponse = await transferMoney_helper.DepositInWallet(userDetails, userDetails.ToWalletName, request.Amount, request.UserId.ToString(), _hostingEnvironment);
                    if (string.IsNullOrEmpty(DepositResponse.ErrorMessage) && string.IsNullOrEmpty(DepositResponse.GameName) && string.IsNullOrEmpty(DepositResponse.GameResponse))
                    {
                        if (role == RoleConst.Users) await transferMoney_helper.Transfer(request.UserId.ToString(), request.FromWalletId.ToString(), request.ToWalletId.ToString(), request.Amount, request.UserId.ToString(), StatusConsts.Approved, request.UserId.ToString());
                        else await transferMoney_helper.Transfer(request.UserId.ToString(), request.FromWalletId.ToString(), request.ToWalletId.ToString(), request.Amount, GetUserId(User).ToString(), StatusConsts.Approved, GetUserId(User).ToString());

                        await ApiLogsManager.APITransactionLogsInsert(new ApiLogTransactionRequest { Id = Id, Response = Localizer["ok_response_success"].Value, FromWalletResponse = JsonConvert.SerializeObject(WithdrawResponse), ToWalletResponse = JsonConvert.SerializeObject(DepositResponse) });
                    }
                    else
                    {
                        var DepositFailedResponse = await transferMoney_helper.DepositInWallet(userDetails, userDetails.FromWalletName, request.Amount, request.UserId.ToString(), _hostingEnvironment);
                        if (string.IsNullOrEmpty(DepositFailedResponse.ErrorMessage) && string.IsNullOrEmpty(DepositFailedResponse.GameName) && string.IsNullOrEmpty(DepositFailedResponse.GameResponse))
                        {
                        }
                        else
                        {
                            //Deposit In Main Wallet and Insert into DB Row
                            await transferMoney_helper.DepositInWallet(userDetails, "Main Wallet", request.Amount, request.UserId.ToString(), _hostingEnvironment);
                            transferMoney_helper.UserBalanceIsBeginUpdate(request.UserId, false);

                            await ApiLogsManager.APITransactionLogsInsert(new ApiLogTransactionRequest { Id = Id, Response = "Completed Transaction Is Failed So We Add Money in Main Wallet", FromWalletResponse = JsonConvert.SerializeObject(WithdrawResponse), ToWalletResponse = JsonConvert.SerializeObject(DepositResponse) });

                            return BadResponse("Completed Transaction Is Failed So We Add Money in Main Wallet");
                        }
                        transferMoney_helper.UserBalanceIsBeginUpdate(request.UserId, false);

                        await ApiLogsManager.APITransactionLogsInsert(new ApiLogTransactionRequest { Id = Id, Response = DepositResponse.GameName + " Deposit Api Failed \n" + DepositResponse.ErrorMessage, FromWalletResponse = JsonConvert.SerializeObject(WithdrawResponse), ToWalletResponse = JsonConvert.SerializeObject(DepositResponse) });

                        return BadResponse(DepositResponse.GameName + " Deposit Api Failed \n" + DepositResponse.ErrorMessage);
                    }
                }
                else
                {
                    transferMoney_helper.UserBalanceIsBeginUpdate(request.UserId, false);

                    await ApiLogsManager.APITransactionLogsInsert(new ApiLogTransactionRequest { Id = Id, Response = WithdrawResponse.GameName + " Withdraw Api Failed \n" + WithdrawResponse.ErrorMessage, FromWalletResponse = JsonConvert.SerializeObject(WithdrawResponse) });

                    return BadResponse(WithdrawResponse.GameName + " Withdraw Api Failed \n " + WithdrawResponse.ErrorMessage);
                }
                transferMoney_helper.UserBalanceIsBeginUpdate(request.UserId, false);

                return OkResponse();
            }
        }

        #endregion Main Wallet to All Wallet

        #region Expiry Promotion of users

        [HttpPost(ActionsConst.Game.PromotionExpiry)]
        public async Task<IActionResult> ExpiryPromotion(string Username, string Password)
        {
            if (String.IsNullOrEmpty(Username) || String.IsNullOrEmpty(Password))
                return BadResponse("error_invalid_modelstate");

            if (!Username.Equals("CustomerServices") || !Password.Equals("Webet333!@#$12345"))
                return BadResponse("error_invalid_login");

            string AGGamePrefix,
                PlaytechGamePrefix,
                DGGamePrefix,
                SAGamePrefix,
                SexyGamePrefix,
                JokerGamePrefix,
                allbetGamePrefix,
                wmGamePrefix,
                pragmaticGamePrefix,
                M8GamePrefix;

            List<ExpieryPromotionResponse> expieryPromotionList;
            using (var game_helper = new GameHelpers(Connection))
            {
                var user = await game_helper.UserGetBalanceInfo();
                AGGamePrefix = user.AGGamePrefix;
                PlaytechGamePrefix = user.PlaytechGamePrefix;
                DGGamePrefix = user.DGGamePrefix;
                SAGamePrefix = user.SAGamePrefix;
                SexyGamePrefix = user.SexyGamePrefix;
                JokerGamePrefix = user.JokerGamePrefix;
                M8GamePrefix = user.M8GamePrefix;
                allbetGamePrefix = user.AllBetGamePrefix;
                wmGamePrefix = user.WMGamePrefix;
                pragmaticGamePrefix = user.PragmaticGamePrefix;

                expieryPromotionList = await game_helper.GetListPromotionExpiery();
            }

            using (var gamebalanceHelper = new GameBalanceHelpers(Connection))
            {
                foreach (var expieryUsersList in expieryPromotionList)
                {
                    #region userBalance Update

                    if (expieryUsersList.Joker)
                    {
                        var resultJoker = await gamebalanceHelper.CallJokerGameBalance(JokerGamePrefix + expieryUsersList.Username);
                        expieryUsersList.JokerBalance = Convert.ToDecimal(resultJoker.JokerBalance);
                    }

                    if (expieryUsersList.Pussy888)
                    {
                        var resultPussy888 = await gamebalanceHelper.CallPussy888GameBalance(expieryUsersList.Pussy888Username);
                        expieryUsersList.Pussy888Balance = Convert.ToDecimal(resultPussy888);
                    }

                    if (expieryUsersList.AG)
                    {
                        var resultAG = await gamebalanceHelper.CallAGGameBalance(AGGamePrefix + expieryUsersList.Username);
                        expieryUsersList.AgBalance = Convert.ToDecimal(resultAG);
                    }

                    if (expieryUsersList.KISS918)
                    {
                        var resultKiss918 = await gamebalanceHelper.Call918KissGameBalance(expieryUsersList.Username918);
                        expieryUsersList.Kiss918Balance = Convert.ToDecimal(resultKiss918);
                    }

                    if (expieryUsersList.M8)
                    {
                        var resultM8 = await gamebalanceHelper.CallM8GameBalance(M8GamePrefix + expieryUsersList.Username);
                        expieryUsersList.M8Balance = Convert.ToDecimal(resultM8);
                    }

                    if (expieryUsersList.PlayTech)
                    {
                        var resultPlaytech = await gamebalanceHelper.CallPlaytechGameBalance(PlaytechGamePrefix + expieryUsersList.Username, _hostingEnvironment);
                        expieryUsersList.PlaytechBalance = Convert.ToDecimal(resultPlaytech);
                    }

                    if (expieryUsersList.MaxBet)
                    {
                        string resultMaxBet = await gamebalanceHelper.CallMaxbetGameBalance(expieryUsersList.VendorMemberId);
                        expieryUsersList.MaxbetBalance = Convert.ToDecimal(resultMaxBet);
                    }

                    if (expieryUsersList.Mega888)
                    {
                        string resultMega888 = await gamebalanceHelper.CallMegaGameBalance(expieryUsersList.LoginId);
                        expieryUsersList.Mega888Balance = Convert.ToDecimal(resultMega888);
                    }

                    if (expieryUsersList.DG)
                    {
                        var resultDG = await gamebalanceHelper.CallDGGameBalance(DGGamePrefix + expieryUsersList.Username);
                        expieryUsersList.DgBalance = Convert.ToDecimal(resultDG);
                    }

                    if (expieryUsersList.Sexy)
                    {
                        var resultSexy = await gamebalanceHelper.CallSexyGameBalance(SexyGamePrefix + expieryUsersList.Username);
                        expieryUsersList.SexyBalance = Convert.ToDecimal(resultSexy);
                    }

                    if (expieryUsersList.SA)
                    {
                        var resultSA = await gamebalanceHelper.CallSAGameBalance(SAGamePrefix + expieryUsersList.Username);
                        expieryUsersList.SABalance = Convert.ToDecimal(resultSA);
                    }
                    if (expieryUsersList.AllBet)
                    {
                        var resultAllbet = await gamebalanceHelper.CallAllBetGameBalance(allbetGamePrefix + expieryUsersList.Id, SecurityHelpers.DecryptPassword(expieryUsersList.Password));
                        expieryUsersList.AllbetBalance = Convert.ToDecimal(resultAllbet);
                    }

                    if (expieryUsersList.WM)
                    {
                        var resultWM = await gamebalanceHelper.CallWMGameBalance(wmGamePrefix + expieryUsersList.Id);
                        expieryUsersList.WMBalance = Convert.ToDecimal(resultWM);
                    }

                    if (expieryUsersList.Pragmatic)
                    {
                        var resultPragmatic = await gamebalanceHelper.CallPragmaticGameBalance(pragmaticGamePrefix + expieryUsersList.Id);
                        expieryUsersList.PragmaticBalance = Convert.ToDecimal(resultPragmatic);
                    }

                    #endregion userBalance Update

                    #region userBalance Restore

                    decimal mainBalance = expieryUsersList.MainBalance,
                        AGBalance = 0.0m,
                        DGBalance = 0.0m,
                        PlaytechBalance = 0.0m,
                        Kiss918Balance = 0.0m,
                        MaxbetBalance = 0.0m,
                        M8Balance = 0.0m,
                        JokerBalance = 0.0m,
                        Mega888Balance = 0.0m,
                        SexyBaccaratBalance = 0.0m,
                        SABalance = 0.0m,
                        AllbetBalance = 0.0m,
                        PussyBalance = 0.0m,
                        PragmaticBalance = 0.0m,
                        WMBalance = 0.0m;
                    using (var game_helper = new GameHelpers(Connection))
                    {
                        if (expieryUsersList.AgBalance != 0)
                        {
                            try
                            {
                                var resultAG = await game_helper.AGDepositWithdrawMethod(AGGamePrefix + expieryUsersList.Username, expieryUsersList.AgBalance, GameConst.AG.Withdraw);
                                mainBalance += resultAG.error_code == 0 ? Convert.ToDecimal(expieryUsersList.AgBalance) : 0m;
                                AGBalance = resultAG.error_code == 0 ? Convert.ToDecimal(expieryUsersList.AgBalance) : 0m;
                            }
                            catch { }
                        }

                        if (expieryUsersList.Pussy888Balance != 0)
                        {
                            try
                            {
                                var resultPussy888 = await Pussy888GameHelpers.CallTransferAPI(expieryUsersList.Pussy888Username, -Math.Abs(expieryUsersList.Pussy888Balance));

                                if (resultPussy888.code != 0)
                                    resultPussy888 = await Pussy888GameHelpers.CallTransferAPI(expieryUsersList.Pussy888Username, -Math.Abs(expieryUsersList.Pussy888Balance));

                                mainBalance += resultPussy888.code == 0 ? Convert.ToDecimal(expieryUsersList.Pussy888Balance) : 0m;
                                PussyBalance = resultPussy888.code == 0 ? Convert.ToDecimal(expieryUsersList.Pussy888Balance) : 0m;
                            }
                            catch
                            {
                            }
                        }

                        if (expieryUsersList.PlaytechBalance != 0)
                        {
                            try
                            {
                                var result = await game_helper.PlaytechWithdrawMehtod(PlaytechGamePrefix + expieryUsersList.Username, expieryUsersList.PlaytechBalance, _hostingEnvironment);
                                dynamic resultPlaytech = JObject.Parse(result);
                                mainBalance += resultPlaytech.result == "Withdraw OK" ? Convert.ToDecimal(expieryUsersList.PlaytechBalance) : 0m;
                                PlaytechBalance = resultPlaytech.result == "Withdraw OK" ? Convert.ToDecimal(expieryUsersList.PlaytechBalance) : 0m;
                            }
                            catch { }
                        }

                        if (expieryUsersList.JokerBalance != 0)
                        {
                            try
                            {
                                dynamic resultJoker = JObject.Parse(await game_helper.JokerDepsoitWithdrawMethod(JokerGamePrefix + expieryUsersList.Username, -Math.Abs(expieryUsersList.JokerBalance)));
                                mainBalance += resultJoker.Message == null ? Convert.ToDecimal(expieryUsersList.JokerBalance) : 0m;
                                JokerBalance = resultJoker.Message == null ? Convert.ToDecimal(expieryUsersList.JokerBalance) : 0m;
                            }
                            catch { }
                        }

                        if (expieryUsersList.M8Balance != 0)
                        {
                            try
                            {
                                var resultM8 = XDocument.Parse(await game_helper.M8DepsoitWithdrawMethod(M8GamePrefix + expieryUsersList.Username, expieryUsersList.M8Balance, GameConst.M8.Withdraw));
                                mainBalance += resultM8.Descendants("errcode").Single().Value == "0" ? Convert.ToDecimal(expieryUsersList.M8Balance) : 0m;
                                M8Balance = resultM8.Descendants("errcode").Single().Value == "0" ? Convert.ToDecimal(expieryUsersList.M8Balance) : 0m;
                            }
                            catch { }
                        }

                        if (expieryUsersList.MaxbetBalance != 0)
                        {
                            try
                            {
                                var resultMaxBet = await MaxBetGameHelper.CallMaxbetDepsoitWithdrawAPI(expieryUsersList.VendorMemberId, expieryUsersList.MaxbetBalance, 0);
                                mainBalance += resultMaxBet.ErrorCode == 0 ? Convert.ToDecimal(expieryUsersList.MaxbetBalance) : 0m;
                                MaxbetBalance = resultMaxBet.ErrorCode == 0 ? Convert.ToDecimal(expieryUsersList.MaxbetBalance) : 0m;
                            }
                            catch { }
                        }

                        if (expieryUsersList.Kiss918Balance != 0)
                        {
                            try
                            {
                                dynamic result918Kiss = JObject.Parse(await game_helper.Kiss918DepsoitWithdrawMehtod(expieryUsersList.Username918, -Math.Abs(expieryUsersList.Kiss918Balance)));
                                mainBalance += result918Kiss.success == true ? Convert.ToDecimal(expieryUsersList.Kiss918Balance) : 0m;
                                Kiss918Balance = result918Kiss.success == true ? Convert.ToDecimal(expieryUsersList.Kiss918Balance) : 0m;
                            }
                            catch { }
                        }

                        if (expieryUsersList.Mega888Balance != 0)
                        {
                            try
                            {
                                var resultMega888 = await Mega888GameHelpers.CallWithdrawDepositAPI(expieryUsersList.LoginId, -Math.Abs(expieryUsersList.Mega888Balance));
                                mainBalance += resultMega888.error == null ? Convert.ToDecimal(expieryUsersList.Mega888Balance) : 0m;
                                Mega888Balance = resultMega888.error == null ? Convert.ToDecimal(expieryUsersList.Mega888Balance) : 0m;
                            }
                            catch { }
                        }

                        if (expieryUsersList.DgBalance != 0)
                        {
                            try
                            {
                                var resultDG = await DGGameHelpers.CallWithdrawDepsoitAPI(DGGamePrefix + expieryUsersList.Username, "-" + expieryUsersList.DgBalance);
                                mainBalance += resultDG.codeId == 0 ? Convert.ToDecimal(expieryUsersList.DgBalance) : 0m;
                                DGBalance = resultDG.codeId == 0 ? Convert.ToDecimal(expieryUsersList.DgBalance) : 0m;
                            }
                            catch { }
                        }

                        if (expieryUsersList.SexyBalance != 0)
                        {
                            try
                            {
                                var resultSexy = await SexyBaccaratGameHelpers.CallWithdrawAPI(SexyGamePrefix + expieryUsersList.Username, expieryUsersList.SexyBalance);
                                mainBalance += resultSexy.status == "0000" ? Convert.ToDecimal(expieryUsersList.SexyBalance) : 0m;
                                SexyBaccaratBalance = resultSexy.status == "0000" ? Convert.ToDecimal(expieryUsersList.SexyBalance) : 0m;
                            }
                            catch { }
                        }

                        if (expieryUsersList.SABalance != 0)
                        {
                            try
                            {
                                var resultSA = await SAGameHelpers.CallAPIWithdraw(SAGamePrefix + expieryUsersList.Username, expieryUsersList.SABalance);
                                mainBalance += resultSA.Descendants("ErrorMsgId").Single().Value == "0" ? Convert.ToDecimal(expieryUsersList.SABalance) : 0m;
                                SABalance = resultSA.Descendants("ErrorMsgId").Single().Value == "0" ? Convert.ToDecimal(expieryUsersList.SABalance) : 0m;
                            }
                            catch { }
                        }

                        if (expieryUsersList.AllbetBalance != 0)
                        {
                            try
                            {
                                var resultAllBet = await AllBetGameHelpers.DepositWithdrawCallAPI(allbetGamePrefix + expieryUsersList.Id, 0, expieryUsersList.AllbetBalance);
                                mainBalance += resultAllBet.error_code == "OK" ? Convert.ToDecimal(expieryUsersList.AllbetBalance) : 0m;
                                AllbetBalance = resultAllBet.error_code == "OK" ? Convert.ToDecimal(expieryUsersList.AllbetBalance) : 0m;
                            }
                            catch { }
                        }

                        if (expieryUsersList.WMBalance != 0)
                        {
                            try
                            {
                                var resultWM = await WMGameHelpers.TransferCallAPI(wmGamePrefix + expieryUsersList.Id, -Math.Abs(expieryUsersList.WMBalance));
                                mainBalance += resultWM.errorCode == 0 ? Convert.ToDecimal(expieryUsersList.WMBalance) : 0m;
                                WMBalance = resultWM.errorCode == 0 ? Convert.ToDecimal(expieryUsersList.WMBalance) : 0m;
                            }
                            catch { }
                        }

                        if (expieryUsersList.PragmaticBalance != 0)
                        {
                            try
                            {
                                var resultPragmatic = await PragmaticGameHelpers.TransferBalance(pragmaticGamePrefix + expieryUsersList.Id, -Math.Abs(expieryUsersList.PragmaticBalance));
                                mainBalance += resultPragmatic.error == "0" ? Convert.ToDecimal(expieryUsersList.PragmaticBalance) : 0m;
                                PragmaticBalance = resultPragmatic.error == "0" ? Convert.ToDecimal(expieryUsersList.PragmaticBalance) : 0m;
                            }
                            catch { }
                        }
                    }

                    #endregion userBalance Restore

                    var bonusWinAmount = mainBalance - expieryUsersList.BonusAmount;
                    mainBalance -= bonusWinAmount;

                    if (mainBalance < 0)
                        mainBalance = 0m;

                    using (var transfer_helper = new TransferMoneyHelpers(Connection))
                    {
                        await transfer_helper.MainWalletDepositWithdraw(expieryUsersList.UserId.ToString(), mainBalance, "Update");
                    }
                }
            }
            return OkResponse(expieryPromotionList);
        }

        #endregion Expiry Promotion of users

        #region Expiery Promotion from Admin

        [Authorize]
        [HttpPost(ActionsConst.Game.ManuallyPromotionExpiry)]
        public async Task<IActionResult> ExpiryPromotionAdmin([FromBody] PromotionExpieryManuallyRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            var Role = GetUserRole(User);
            if (Role == RoleConst.Users)
                request.UserId = GetUserId(User).ToString();

            using (var game_helper = new GameHelpers(Connection))
            {
                await game_helper.ManuallyExpieryPromotion(request);
                return OkResponse();
            }
        }

        #endregion Expiery Promotion from Admin

        #region Game Last Update

        [Authorize]
        [HttpGet(ActionsConst.Game.LastUpdateBettingDetail)]
        public async Task<IActionResult> GameLastUpdateList()
        {
            await CheckUserRole();
            if (!ModelState.IsValid) return BadResponse(ModelState);
            using (var game_helper = new GameHelpers(Connection))
            {
                return OkResponse(await game_helper.LastUpdatedList());
            }
        }

        #endregion Game Last Update

        #region Daily Turnover

        [Authorize]
        [HttpPost(ActionsConst.Game.DailyTurnover)]
        public async Task<IActionResult> DailyTurnOver([FromBody] GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users) request.Id = GetUserId(User).ToString();

            using (var game_helper = new GameHelpers(Connection))
            {
                var result = await game_helper.DailyTurnover(request.Id);

                var JokerGame = result.Where(x => x.GameName == GameConst.GamesNames.JokerGame).ToList();
                var _918KisGame = result.Where(x => x.GameName == GameConst.GamesNames._918KisGame).ToList();
                var M8Game = result.Where(x => x.GameName == GameConst.GamesNames.M8Game).ToList();
                var AGGame = result.Where(x => x.GameName == GameConst.GamesNames.AGGame).ToList();
                var MaxbetGame = result.Where(x => x.GameName == GameConst.GamesNames.MaxbetGame).ToList();
                var PlaytechGame = result.Where(x => x.GameName == GameConst.GamesNames.PlaytechGame).ToList();
                var Mega888Game = result.Where(x => x.GameName == GameConst.GamesNames.Mega888).ToList();
                var DGGame = result.Where(x => x.GameName == GameConst.GamesNames.DGGame).ToList();
                var SAGame = result.Where(x => x.GameName == GameConst.GamesNames.SA).ToList();
                var SexyGame = result.Where(x => x.GameName == GameConst.GamesNames.Sexy).ToList();
                var Pussy888Game = result.Where(x => x.GameName == GameConst.GamesNames.Pussy888).ToList();
                var AllBetGame = result.Where(x => x.GameName == GameConst.GamesNames.AllBet).ToList();
                var WMGame = result.Where(x => x.GameName == GameConst.GamesNames.WM).ToList();
                var PragmaticGame = result.Where(x => x.GameName == GameConst.GamesNames.Pragmatic).ToList();
                var YeeBetGame = result.Where(x => x.GameName == GameConst.GamesNames.YeeBet).ToList();
                var SBOGame = result.Where(x => x.GameName == GameConst.GamesNames.SBO).ToList();

                var response = new
                {
                    jokerWinover = JokerGame.Count > 0 ? JokerGame.FirstOrDefault().Turnover : 0,
                    kiss918Winover = _918KisGame.Count > 0 ? _918KisGame.FirstOrDefault().Turnover : 0,
                    m8Turover = M8Game.Count > 0 ? M8Game.FirstOrDefault().Turnover : 0,
                    agTurover = AGGame.Count > 0 ? AGGame.FirstOrDefault().Turnover : 0,
                    maxbetTurover = MaxbetGame.Count > 0 ? MaxbetGame.FirstOrDefault().Turnover : 0,
                    playtechTurover = PlaytechGame.Count > 0 ? PlaytechGame.FirstOrDefault().Turnover : 0,
                    mega888Winover = Mega888Game.Count > 0 ? Mega888Game.FirstOrDefault().Turnover : 0,
                    dgTurover = DGGame.Count > 0 ? DGGame.FirstOrDefault().Turnover : 0,
                    saTurover = SAGame.Count > 0 ? SAGame.FirstOrDefault().Turnover : 0,
                    sexyTurover = SexyGame.Count > 0 ? SexyGame.FirstOrDefault().Turnover : 0,
                    pussy888Turover = Pussy888Game.Count > 0 ? Pussy888Game.FirstOrDefault().Turnover : 0,
                    AllBetTurover = AllBetGame.Count > 0 ? AllBetGame.FirstOrDefault().Turnover : 0,
                    WMTurover = WMGame.Count > 0 ? WMGame.FirstOrDefault().Turnover : 0,
                    PragmaticTurover = PragmaticGame.Count > 0 ? PragmaticGame.FirstOrDefault().Turnover : 0,
                    YeeBetTurover = YeeBetGame.Count > 0 ? YeeBetGame.FirstOrDefault().Turnover : 0,
                    SBOTurover = SBOGame.Count > 0 ? SBOGame.FirstOrDefault().Turnover : 0
                };
                decimal total = response.agTurover + response.m8Turover + response.maxbetTurover + response.playtechTurover + response.dgTurover + response.saTurover + response.sexyTurover + response.AllBetTurover + response.WMTurover + response.PragmaticTurover + response.YeeBetTurover + response.SBOTurover;

                return OkResponse(new { response, Total = total });
            }
        }

        #endregion Daily Turnover

        #region Get Game Support of user

        [Authorize]
        [HttpPost(ActionsConst.Game.UserGameSupport)]
        public async Task<IActionResult> GameSupportForUser([FromBody] GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            using (var game_helper = new GameHelpers(Connection))
            {
                var result = await game_helper.GetSupportGameOfUser(request.Id);

                return OkResponse(result);
            }
        }

        #endregion Get Game Support of user

        #region Get Betting Limits of Game

        [Authorize]
        [HttpGet(ActionsConst.Game.GetBettingLimit)]
        public async Task<IActionResult> GetBettingLimit()
        {
            await CheckUserRole();
            using (var account_helper = new AccountHelpers(Connection))
            {
                var DGbettingLimits = account_helper.GlobalSelect("DGLimit").Result.Value;
                var AGbettingLimits = account_helper.GlobalSelect("AGLimit").Result.Value;
                var SexybettingLimits = JsonConvert.DeserializeObject(account_helper.GlobalSelect("SexyLimit").Result.Value);
                return OkResponse(new { DGbettingLimits, AGbettingLimits, SexybettingLimits });
            }
        }

        #endregion Get Betting Limits of Game

        #region Get Betting DETAILS of Game

        [Authorize]
        [HttpPost(ActionsConst.Game.GetBettingDetails)]
        public async Task<IActionResult> GetBettingDetails([FromBody] GameBettingDetailsRequest request)
        {
            await CheckUserRole();
            using (var game_helper = new GameHelpers(Connection))
            {
                var result = await game_helper.GetListBettingDetails(request);

                if (result == null) return NotFoundResponse();

                return OkResponse(result);
            }
        }

        #endregion Get Betting DETAILS of Game

        #region 918 Kiss game password reset

        [Authorize]
        [HttpGet(ActionsConst.Game.Kiss918_ResetPassword)]
        public async Task<IActionResult> Kiss918GamePasswordReset()
        {
            await ValidateUser();
            string password;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(UserEntity.Id.ToString());
                password = SecurityHelpers.DecryptPassword(user.Password);
            }
            using (var game_helper = new GameHelpers(Connection))
            {
                var newPassword = "Wb3@" + SecurityHelpers.DecryptPassword(password);

                if (newPassword.Length > 14)
                    newPassword = newPassword.Substring(0, 14);

                var result = await game_helper.Kiss918GamePasswordReset(UserEntity, newPassword);
                if (result.code != 0) return BadResponse(result.msg);
                var profileUpdateRequest = new ProfileEditRequest();
                profileUpdateRequest.Id = UserEntity.Id;
                profileUpdateRequest.Password918 = newPassword;
                using (var user_help = new UserHelpers(Connection))
                    await user_help.UpdateProfile(profileUpdateRequest);
                return OkResponse(new { newPassword });
            }
        }

        #endregion 918 Kiss game password reset

        #region 918 Kiss game password reset by Admin

        [Authorize]
        [HttpPost(ActionsConst.Game.Kiss918_ResetPassword_By_Admin)]
        public async Task<IActionResult> Kiss918GamePasswordResetByAdmin([FromBody] SlotsGamePasswordResertByAdmin request)
        {
            await ValidateUser(role: RoleConst.Admin);
            using (var game_helper = new GameHelpers(Connection))
            {
                var newPassword = "Wb3@" + SecurityHelpers.DecryptPassword(request.Password);

                if (newPassword.Length > 14)
                    newPassword = newPassword.Substring(0, 14);

                var PasswordUpdateRequest = new ProfileResponse
                {
                    UserName = request.Username,
                    UserName918 = request.GameUsername,
                    Password918 = request.GamePassword,
                };

                var result = await game_helper.Kiss918GamePasswordReset(PasswordUpdateRequest, newPassword);
                if (result.code != 0) return BadResponse(result.msg);
                var profileUpdateRequest = new ProfileEditRequest();
                profileUpdateRequest.Id = request.UserId;
                profileUpdateRequest.Password918 = newPassword;
                using (var user_help = new UserHelpers(Connection))
                    await user_help.UpdateProfile(profileUpdateRequest);
                await game_helper.ResetPasswordStatusUpdate(true, request.RowId);
                return OkResponse(new { newPassword });
            }
        }

        #endregion 918 Kiss game password reset by Admin

        #region All 918 Kiss game users password reset

        [Authorize]
        [HttpGet(ActionsConst.Game.AllUsers_Kiss918_ResetPassword)]
        public async Task<IActionResult> Kiss918GameAllUsersPasswordReset()
        {
            await ValidateUser();
            using (var game_helper = new GameHelpers(Connection))
            {
                var users = await game_helper.GetAllKiss918Usersname();

                List<Kiss918PasswordResetResponse> list = new List<Kiss918PasswordResetResponse>();
                foreach (var user in users)
                {
                    var newPassword = "Wb3@" + SecurityHelpers.DecryptPassword(user.Password);
                    if (newPassword.Length > 14)
                        newPassword = newPassword.Substring(0, 14);

                    var request = new ProfileResponse();
                    request.Password918 = user.KissPassword;
                    request.UserName918 = user.KissUsername;
                    request.UserName = user.Username;

                    var result = await game_helper.Kiss918GamePasswordReset(request, newPassword);
                    if (result.code == 0)
                    {
                        var profileUpdateRequest = new ProfileEditRequest();
                        profileUpdateRequest.Id = user.Id;
                        profileUpdateRequest.Password918 = newPassword;
                        using (var user_help = new UserHelpers(Connection))
                            await user_help.UpdateProfile(profileUpdateRequest);
                    }
                    list.Add(result);
                }
                return OkResponse(new { list });
            }
        }

        #endregion All 918 Kiss game users password reset

        #region 918 Kiss Player Log

        [HttpPost(ActionsConst.Game.Kiss918PlayerLog)]
        public async Task<IActionResult> Kiss918PlayerGameLog([FromBody] SlotsPlayerLogRequest request)
        {
            string kiss918UserName = request.Username;
            string startDate = request.StartDate.AddMinutes(-5).ToString("yyyy-MM-dd HH:mm:ss");
            string endDate = request.EndDate.ToString("yyyy-MM-dd HH:mm:ss");
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            int pageSize = 100;
            var kiss918URL = $"http://api.918kiss.com:9919/ashx/GameLog.ashx?" +
                             $"userName={kiss918UserName}" +
                             $"&time={timestamp}" +
                             $"&authcode={GameConst.Kiss918.authcode}" +
                             $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Kiss918.authcode.ToLower() + kiss918UserName + timestamp + GameConst.Kiss918.SecretKey.ToLower()).ToUpper()}" +
                             $"&sDate={startDate}" +
                             $"&eDate={endDate}" +
                             $"&pageSize={pageSize}";

            var result = JsonConvert.DeserializeObject<Kiss918PlayerGameLogResponse>(await GameHelpers.CallThirdPartyApi(kiss918URL, null));

            if (result == null)
            {
                kiss918URL = $"http://api.918kiss.com:9919/ashx/GameLog.ashx?" +
                             $"userName={kiss918UserName}" +
                             $"&time={timestamp}" +
                             $"&authcode={GameConst.Kiss918.authcode}" +
                             $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Kiss918.authcode.ToLower() + kiss918UserName + timestamp + GameConst.Kiss918.SecretKey.ToLower()).ToUpper()}" +
                             $"&sDate={startDate}" +
                             $"&eDate={endDate}" +
                             $"&pageSize={pageSize}";

                result = JsonConvert.DeserializeObject<Kiss918PlayerGameLogResponse>(await GameHelpers.CallThirdPartyApi(kiss918URL, null));
            }

            if (result != null)
            {
                if (result.total > pageSize)
                {
                    int pageNumber = (result.total / pageSize) + 1;

                    for (int i = 2; i <= pageNumber; i++)
                    {
                        var URL = $"http://api.918kiss.com:9919/ashx/GameLog.ashx?" + $"pageIndex={i}" +
                            $"&userName={kiss918UserName}" +
                            $"&time={timestamp}" +
                            $"&authcode={GameConst.Kiss918.authcode}" +
                            $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Kiss918.authcode.ToLower() + kiss918UserName + timestamp + GameConst.Kiss918.SecretKey.ToLower()).ToUpper()}" +
                            $"&sDate={startDate}" +
                            $"&eDate={endDate}" +
                            $"&pageSize={pageSize}";

                        var res = JsonConvert.DeserializeObject<Kiss918PlayerGameLogResponse>(await GameHelpers.CallThirdPartyApi(URL, null));

                        if (res != null)
                            if (res.results.Count > 0)
                                result.results.AddRange(res.results);
                    }
                }

                if (!request.SaveInDB)
                    if (result.results != null)
                        if (result.results.Count > 0)
                            using (var game_helper = new GameHelpers(Connection))
                            {
                                game_helper.Kiss918PlayerLogInsert(result.results, kiss918UserName);
                            }
            }

            return OkResponse(result);
        }

        #endregion 918 Kiss Player Log

        #region Pussy888 Player Log

        [HttpPost(ActionsConst.Game.Pussy888PlayerLog)]
        public async Task<IActionResult> Pussy888PlayerLog([FromBody] SlotsPlayerLogRequest request)
        {
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            string startDate = request.StartDate.AddMinutes(-5).ToString("yyyy-MM-dd HH:mm:ss");
            string endDate = request.EndDate.ToString("yyyy-MM-dd HH:mm:ss");
            var userName = request.Username;
            int pageSize = 100;
            var PussyURL = $"{GameConst.Pussy888.BettingDetailsBaseUrl}{GameConst.Pussy888.PlayerLog}" +
                             $"userName={userName}" +
                             $"&time={timestamp}" +
                             $"&authcode={GameConst.Pussy888.AuthCode}" +
                             $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Pussy888.AuthCode.ToLower() + userName + timestamp + GameConst.Pussy888.SecertKey.ToLower()).ToUpper()}" +
                             $"&sDate={startDate}" +
                             $"&eDate={endDate}" +
                             $"&pageSize={pageSize}";

            var result = JsonConvert.DeserializeObject<Kiss918PlayerGameLogResponse>(await GameHelpers.CallThirdPartyApi(PussyURL, null));

            if (result != null)
            {
                if (result.total > pageSize)
                {
                    int pageNumber = (result.total / pageSize) + 1;

                    for (int i = 2; i <= pageNumber; i++)
                    {
                        var URL = $"{GameConst.Pussy888.BettingDetailsBaseUrl}{GameConst.Pussy888.PlayerLog}" + $"pageIndex={i}" +
                             $"&userName={userName}" +
                             $"&time={timestamp}" +
                             $"&authcode={GameConst.Pussy888.AuthCode}" +
                             $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Pussy888.AuthCode.ToLower() + userName + timestamp + GameConst.Pussy888.SecertKey.ToLower()).ToUpper()}" +
                             $"&sDate={startDate}" +
                             $"&eDate={endDate}" +
                             $"&pageSize={pageSize}";

                        var res = JsonConvert.DeserializeObject<Kiss918PlayerGameLogResponse>(await GameHelpers.CallThirdPartyApi(URL, null));

                        if (res != null)
                            if (res.results.Count > 0)
                                result.results.AddRange(res.results);
                    }
                }

                if (!request.SaveInDB)
                    if (result.results != null)
                        if (result.results.Count > 0)
                            using (var game_helper = new GameHelpers(Connection))
                            {
                                game_helper.PussyPlayerLogInsert(result.results, userName);
                            }
            }
            return OkResponse(result);
        }

        #endregion Pussy888 Player Log

        #region Joker Player Log

        [HttpGet(ActionsConst.Game.JokerPlayerLog)]
        public async Task<IActionResult> JokerPlayerLog()
        {
            DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Local);
            var temp = (long)DateTime.UtcNow.Subtract(UnixEpoch).TotalSeconds;

            var date = DateTime.Now;
            var startDate = date.AddMinutes(-30).ToString("yyyy-MM-dd HH:mm:ss");
            var endDate = date.ToString("yyyy-MM-dd HH:mm:ss");

            bool initilizeVariable = true;
            var totalRecords = new JokerPlayerLogResponse();

            string nextId = string.Empty;
            do
            {
                string bodyParameter = $"EndDate={endDate}" +
                                    $"&Method=TSM" +
                                    $"&NextId={nextId}" +
                                    $"&StartDate={startDate}" +
                                    $"&Timestamp={temp}";

                var url = $"{GameConst.Joker.jokerBaseUrl}?" +
                    $"AppID={GameConst.Joker.AppID}" +
                    $"&Signature={GameHelpers.GenerateHas(bodyParameter)}";

                var stringContent = new StringContent(bodyParameter, Encoding.UTF8, "application/x-www-form-urlencoded");

                var responseString = await GameHelpers.CallThirdPartyApi(url, stringContent);

                var JokerServices = JsonConvert.DeserializeObject<JokerPlayerLogResponse>(responseString);

                if (initilizeVariable)
                {
                    totalRecords = JokerServices;
                    initilizeVariable = false;
                }
                else
                {
                    if (JokerServices.Data != null)
                    {
                        if (JokerServices.Data.Game != null) totalRecords.Data.Game.AddRange(JokerServices.Data.Game);

                        if (JokerServices.Data.Jackpot != null) totalRecords.Data.Jackpot.AddRange(JokerServices.Data.Jackpot);
                    }
                }

                nextId = JokerServices.NextId;
            } while (!String.IsNullOrWhiteSpace(nextId));

            var notSave = false;

            if (totalRecords.Data.Jackpot == null && totalRecords.Data.Game == null)
                return OkResponse(new { totalRecords, startDate, endDate, notSave });

            using (var game_help = new GameHelpers(Connection: Connection))
            {
                notSave = true;
                await game_help.JokerPlayerLogInsert(totalRecords);

                return OkResponse(new { totalRecords, startDate, endDate, notSave });
            }
        }

        #endregion Joker Player Log

        #region Get Users Betting Summery

        [Authorize]
        [HttpPost(ActionsConst.Game.BettingSummery)]
        public async Task<IActionResult> BettingSummery([FromBody] GlobalGetWithPaginationRequest request)
        {
            request.UserId = GetUserId(User).ToString();
            using (var game_helper = new GameHelpers(Connection))
            {
                var list = await game_helper.BettingSummerySelect(request);
                if (list.Count != 0)
                {
                    var total = list.FirstOrDefault().Total;
                    var totalPages = GenericHelpers.CalculateTotalPages(total, request.PageSize == null ? list.Count : request.PageSize);

                    return OkResponse(new
                    {
                        result = list,
                        total = total,
                        totalPages = totalPages,
                        pageSize = request.PageSize ?? 10,
                        offset = list.FirstOrDefault().OffSet,
                    });
                }
                return OkResponse(new
                {
                    result = list,
                    total = 0,
                    totalPages = 0,
                    pageSize = 0,
                    offset = 0,
                });
            }
        }


        #endregion Get Users Betting Summery

        #region Game List Excel file Upload

        [Authorize]
        [HttpPost(ActionsConst.Game.GameListUpload)]
        public async Task<IActionResult> GameListUpload([FromBody] GameListUploadRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            var extension = ".xlsx";
            var filename = "gamelist" + DateTime.Now.ToString("yyyyMMddHHmmssffff");
            request.File = request.File.Split("base64,")[1] ?? request.File;
            using (var generic_help = new GenericHelpers(Connection))
                generic_help.GetImageWithExtension(uploadManager, request.File, BaseUrlConfigsOptions.Value.ExcelFilesPath, filename, extension);

            var gameList = JsonConvert.DeserializeObject<List<GameListUploadResponse>>(GameHelpers.ReadExcelasJSON(BaseUrlConfigsOptions.Value.ExcelLocalPath + "\\" + filename + extension));

            using (var game_help = new GameHelpers(Connection))
                await game_help.GameListInsert(gameList, request.Id, baseUrlConfigs.ImageBase);

            return OkResponse(gameList);
        }


        #endregion Game List Excel file Upload

        #region Slot Game List Select

        [HttpPost(ActionsConst.Game.SlotsGameSelect)]
        public async Task<IActionResult> SlotsGameSelect([FromBody] GameListSelectRequest request)
        {
            var role = RoleConst.Users;
            try
            {
                role = GetUserRole(User);
            }
            catch (Exception e) { }

            using (var game_helper = new GameHelpers(Connection: Connection))
            {
                var list = await game_helper.GameListSelect(request, role);
                if (list.Count != 0)
                {
                    var total = list.FirstOrDefault().Total;
                    var totalPages = GenericHelpers.CalculateTotalPages(total, request.PageSize == null ? list.Count : request.PageSize);

                    return OkResponse(new
                    {
                        result = list,
                        total = total,
                        totalPages = totalPages,
                        pageSize = request.PageSize ?? 10,
                        offset = list.FirstOrDefault().OffSet,
                    });
                }
                return OkResponse(new
                {
                    result = list,
                    total = 0,
                    totalPages = 0,
                    pageSize = 0,
                    offset = 0,
                });
            }
        }

        #endregion Slot Game List Select

        #region Slot Game List Update

        [Authorize]
        [HttpPost(ActionsConst.Game.SlotsGameUpdate)]
        public async Task<IActionResult> SlotsGameUpdate([FromBody] GameListUpdateRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);
            var role = GetUserRole(User);
            var uniqueId = GetUniqueId(User);
            using (var game_helper = new GameHelpers(Connection: Connection))
            {
                await game_helper.GameListUpdate(request, role, uniqueId);
                return OkResponse();
            }
        }

        #endregion

        #region Hot Slots Game List Select

        [HttpPost(ActionsConst.Game.HotSlotsGameSelect)]
        public async Task<IActionResult> HotSlotsGameSelect([FromBody] GameListSelectRequest request)
        {
            using (var game_helper = new GameHelpers(Connection: Connection))
            {
                var list = await game_helper.HotGameListSelect(request);
                if (list.Count != 0)
                {
                    var total = list.FirstOrDefault().Total;
                    var totalPages = GenericHelpers.CalculateTotalPages(total, request.PageSize == null ? list.Count : request.PageSize);

                    return OkResponse(new
                    {
                        result = list,
                        total = total,
                        totalPages = totalPages,
                        pageSize = request.PageSize ?? 20,
                        offset = list.FirstOrDefault().OffSet,
                    });
                }
                return OkResponse(new
                {
                    result = list,
                    total = 0,
                    totalPages = 0,
                    pageSize = 0,
                    offset = 0,
                });
            }
        }

        #endregion Hot Slots Game List Select

    }
}