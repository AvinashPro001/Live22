using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.logs;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
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

        public Mega888GameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionstringsOptions) : base(ConnectionstringsOptions.Value, Localizer)
        {
            this.Localizer = Localizer;
            ConnectionOptions = ConnectionstringsOptions;
        }

        #endregion Local variable and Constructor

        #region Mega888 game Register

        [Authorize]
        [HttpPost(ActionsConst.Mega888Game.Mega888Register)]
        public async Task<IActionResult> Mega888Register([FromBody]GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string username;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.Mega888GamePrefix + user.Username;
            }

            var apiResponse = await Mega888GameHelpers.CallRegisterAPI(username);
            var result=JsonConvert.DeserializeObject(apiResponse);
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

        #region Mega888 Depsoit Withdraw Amount

        [Authorize]
        [HttpPost(ActionsConst.Mega888Game.Mega888DepositWithdraw)]
        public async Task<IActionResult> WithdrawDepsoit([FromBody]DepsoitWihtdrawRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            if (request.Amount == 0) return BadResponse("error_invaild_amount");
            if (request.Method != 1 && request.Method != 0) return BadResponse("error_invaild_method");

            var Role = GetUserRole(User);

            request.UserId = Role == RoleConst.Users ? GetUserId(User).ToString() : request.UserId;

            GetBalanceUserResponse user;
            using (var account_helper = new AccountHelpers(Connection))
            {
                user = await account_helper.UserGetBalanceInfo(request.UserId);
            }

            if (user.Mega888LoginId == null) return BadResponse("error_user_not_found_game");

            if (request.Method == 1)
                request.Amount = -Math.Abs(request.Amount);

            var response =await Mega888GameHelpers.CallWithdrawDepositAPI(user.Mega888LoginId, request.Amount);

            //var error = Convert.ToString(response.error);

            //if (error != "")
            //{
            //    string message = Convert.ToString(response.error.message);
            //    return BadResponse(message);
            //}

            return OkResponse(response);
        }

        #endregion Mega888 Depsoit Withdraw Amount

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

        #endregion

        #region Mega888 Game Logout

        [Authorize]
        [HttpPost(ActionsConst.Mega888Game.Mega888Logout)]
        public async Task<IActionResult> Mega888Logout([FromBody]GetByIdRequest request)
        {
            

            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");


            GetBalanceUserResponse user;
            using (var account_helper = new AccountHelpers(Connection))
            {
                user = await account_helper.UserGetBalanceInfo(request.Id);
            }


            dynamic response = Mega888GameHelpers.CallLogoutAPI(user.Mega888LoginId);

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