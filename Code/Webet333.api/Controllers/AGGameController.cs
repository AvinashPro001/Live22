using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Game.AG;
using Webet333.models.Request.Game.DG;
using Webet333.models.Response.Game.AG;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class AGGameController : BaseController
    {
        #region Global variable and Constructor

        public AGGameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
        }

        #endregion Global variable and Constructor

        #region Create Member

        [Authorize]
        [HttpPost(ActionsConst.AGGame.AGRegister)]
        public async Task<IActionResult> SexyBaccaratRegister([FromBody] GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (String.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string username, bettingLimits;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.AGGamePrefix + user.Username;
                bettingLimits = account_helper.GlobalSelect("AGLimit").Result.Value;
            }
            try
            {
                var response = await AGGameHelpers.CallRegisterAPI(username, bettingLimits);
                if (response.error_code != 0)
                    return OkResponse(response);

                using (var ag_helper = new AGGameHelpers(Connection))
                {
                    await ag_helper.GameAGRegister(request.Id, username, JsonConvert.SerializeObject(response));
                    return OkResponse(response);
                }
            }
            catch
            {
                var response = new AgRegisterResponse { error_code = 8585, Message = "maintenance" };
                return OkResponse(response);
            }
        }

        #endregion Create Member

        #region Login Member

        [Authorize]
        [HttpPost(ActionsConst.AGGame.AGLogin)]
        public async Task<IActionResult> SexyBaccaratLogin([FromBody] AGLoginRequest request)
        {
            var Role = GetUserRole(User);

            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (String.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string username, bettingLimits;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.AGGamePrefix + user.Username;
                bettingLimits = account_helper.GlobalSelect("AGLimit").Result.Value;
            }
            try
            {
                var response = await AGGameHelpers.CallLoginAPI(username, bettingLimits, request.GameType, request.Lang);
                if (response.error_code == 0)
                    return OkResponse(response);

                return OkResponse(response);
            }
            catch
            {
                var response = new AgRegisterResponse { error_code = 8585, Message = "maintenance" };
                return OkResponse(response);
            }
        }

        #endregion Login Member

        #region Set default Bet Limit

        [Authorize]
        [HttpPost(ActionsConst.AGGame.AgDefaultBetlimit)]
        public async Task<IActionResult> AGSetDefaultBetlimit([FromBody] DGBettingLimitRequest request)
        {
            await CheckUserRole();

            string adminId = GetUserId(User).ToString();

            using (var game_helper = new AGGameHelpers(Connection))
            {
                var result = await game_helper.AGBetLimit(request.BettingLimit, adminId);
                return OkResponse(result);
            }
        }

        #endregion Set default Bet Limit
    }
}