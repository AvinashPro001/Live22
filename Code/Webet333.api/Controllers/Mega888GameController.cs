using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.logs;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Game;
using Webet333.models.Request.Game.Mega888;
using Webet333.models.Response.Account;
using Webet333.models.Response.Game.Mega888;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class Mega888GameController : BaseController
    {
        #region Local variable and Constructor

        private static readonly HttpClient client = new HttpClient();

        private readonly IOptions<ConnectionConfigs> ConnectionOptions;

        public Mega888GameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionstringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionstringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
            ConnectionOptions = ConnectionstringsOptions;
        }

        #endregion Local variable and Constructor

        #region Mega888 game Register

        [Authorize]
        [HttpPost(ActionsConst.Mega888Game.Mega888Register)]
        public async Task<IActionResult> Mega888Register([FromBody] GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
            {
                Console.WriteLine(GetUserId(User).ToString());
                request.Id = GetUserId(User).ToString();
            }

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string username;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.Mega888GamePrefix + user.UserId;
            }

            var apiResponse = await Mega888GameHelpers.CallRegisterAPI(username);
            var result = JsonConvert.DeserializeObject(apiResponse);
            string error = Convert.ToString(result.error);

            if (error != "")
            {
                string message = result.error.message;
                return BadResponse(message);
            }

            var response = JsonConvert.DeserializeObject<Mega888ApiRegisterResponse>(apiResponse);
            using (var mega888_helper = new Mega888GameHelpers(Connection))
            {
                var userId = await mega888_helper.Mega888Insert(response, request.Id, Convert.ToString(apiResponse));
                return OkResponse(new { userId, response });
            }
        }

        #endregion Mega888 game Register

        #region Mega888 User Betting Details Total Win

        [HttpPost(ActionsConst.Mega888Game.Mega888PlayerLog)]
        public async Task<IActionResult> UserTotalBettingWin([FromBody] SlotsPlayerLogRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var StartTime = request.StartDate.AddMinutes(-5).ToString("yyyy-MM-dd HH:mm:ss");
            var EndTime = request.EndDate.ToString("yyyy-MM-dd HH:mm:ss");

            var urlResponse = await Mega888GameHelpers.CallPlayerLogURLAPI(request.Username, StartTime, EndTime);
            if (urlResponse.Id == null)
            {
                Uri myUri = new Uri(urlResponse.Result);
                string sign = HttpUtility.ParseQueryString(myUri.Query).Get("sign");
                string timeStamp = HttpUtility.ParseQueryString(myUri.Query).Get("time");

                string QueryString = $"action=playerGameLog&user={request.Username}&sDate={StartTime}&eDate={EndTime}&time={timeStamp}&sign={sign}&pageIndex=1";

                var result = JsonConvert.DeserializeObject<Mega888PlayerLogResponse>(await Mega888GameHelpers.CallPlayerLogAPI(QueryString));

                if (result.Success && result.Total > 20)
                {
                    int totalPages = (result.Total / 20) + 1;

                    for (int i = 2; i <= totalPages; i++)
                    {
                        string queryData = $"action=playerGameLog&user={request.Username}&sDate={StartTime}&eDate={EndTime}&time={timeStamp}&sign={sign}&pageIndex={i}";

                        var paginationData = JsonConvert.DeserializeObject<Mega888PlayerLogResponse>(await Mega888GameHelpers.CallPlayerLogAPI(queryData));

                        if (paginationData.Success)
                            if (paginationData.Results.Count > 0)
                                result.Results.AddRange(paginationData.Results);
                    }
                }

                if (request.SaveInDB)
                    if (result.Results.Count > 0)
                    {
                        using (var mega888Helper = new Mega888GameHelpers(Connection))
                        {
                            mega888Helper.Mega888PlayerLogInsert(result.Results, request.Username);
                        }
                    }

                return OkResponse(result);
            }
            return OkResponse();
        }

        #endregion Mega888 User Betting Details Total Win

        #region Mega888 Game Login

        [HttpPost(ActionsConst.Mega888Game.Mega888Login)]
        public async Task<IActionResult> Login()
        {
            string data;
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                data = await reader.ReadToEndAsync();
            }

            var logManager = new LogManager(ConnectionOptions);
            if (String.IsNullOrEmpty(data))
            {
                logManager.AddOrUpdateLogs("error", Localizer["error_invalid_modelstate"].Value, data);
                return Ok(Mega888GameHelpers.Mega888LoginResponse(Guid.NewGuid().ToString(), "0", Localizer["error_invalid_modelstate"].Value));
            }

            var subData = data.Substring(5);

            var request = JsonConvert.DeserializeObject<Mega888Login>(subData);

            if (
                String.IsNullOrEmpty(request.id) ||
                String.IsNullOrEmpty(request.method) ||
                String.IsNullOrEmpty(request.jsonrpc) ||
                String.IsNullOrEmpty(request.@params.digest) ||
                String.IsNullOrEmpty(request.@params.loginId) ||
                String.IsNullOrEmpty(request.@params.password) ||
                String.IsNullOrEmpty(request.@params.random)
                )
            {
                logManager.AddOrUpdateLogs("error", Localizer["error_invalid_modelstate"].Value, JsonConvert.SerializeObject(request));
                return Ok(Mega888GameHelpers.Mega888LoginResponse(request.id, "0", Localizer["error_invalid_modelstate"].Value));
            }

            if (!request.@params.sn.Equals(GameConst.Mega888.SN))
            {
                logManager.AddOrUpdateLogs("error", Localizer["error_mega888_invaild_SN"].Value, JsonConvert.SerializeObject(request));
                return Ok(Mega888GameHelpers.Mega888LoginResponse(request.id, "0", Localizer["error_mega888_invaild_SN"].Value));
            }

            if (!request.method.Equals(GameConst.Mega888.Login))
            {
                logManager.AddOrUpdateLogs("error", Localizer["error_mega888_invalid_method"].Value, JsonConvert.SerializeObject(request));
                return Ok(Mega888GameHelpers.Mega888LoginResponse(request.id, "0", Localizer["error_mega888_invalid_method"].Value));
            }

            using (var mega888_helper = new Mega888GameHelpers(Connection))
            {
                var result = await mega888_helper.Mega888LoginCheck(request.@params.loginId, request.@params.password);
                if (result == null)
                {
                    logManager.AddOrUpdateLogs("error", Localizer["error_mega888_invaild_login"].Value, JsonConvert.SerializeObject(request));
                    return Ok(Mega888GameHelpers.Mega888LoginResponse(request.id, "0", Localizer["error_mega888_invaild_login"].Value));
                }

                logManager.AddOrUpdateLogs("Success", Localizer["登录成功"].Value, JsonConvert.SerializeObject(request));
                return Ok(Mega888GameHelpers.Mega888LoginResponse(request.id, "1", Localizer["登录成功"].Value));
            }
        }

        #endregion Mega888 Game Login

        #region Mega888 Game Logout

        [Authorize]
        [HttpPost(ActionsConst.Mega888Game.Mega888Logout)]
        public async Task<IActionResult> Mega888Logout([FromBody] GetByIdRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            GetUsernameByIdResponse user;
            using (var account_helper = new AccountHelpers(Connection))
            {
                user = await account_helper.GetUsernameInfo(request.Id);
            }

            dynamic response = Mega888GameHelpers.CallLogoutAPI(user.Mega888Username);

            var error = Convert.ToString(response.error);

            if (error != "")
            {
                string message = Convert.ToString(response.error.message);
                return BadResponse(message);
            }

            if (response.result == "0")
                return BadResponse("error_game_logout_failed");

            return OkResponse(response);
        }

        #endregion Mega888 Game Logout
    }
}