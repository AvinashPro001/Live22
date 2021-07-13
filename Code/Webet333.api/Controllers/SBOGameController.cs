using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Game;
using Webet333.models.Request.Game.SBO;

namespace Webet333.api.Controllers
{
    [Authorize]
    [Route(ActionsConst.ApiVersion)]
    public class SBOGameController : BaseController
    {
        #region Global Variable

        public SBOGameController(
            IStringLocalizer<BaseController> Localizer,
            IOptions<ConnectionConfigs> ConnectionStringsOptions,
            IOptions<BaseUrlConfigs> BaseUrlConfigsOption) :
            base(
                ConnectionStringsOptions.Value,
                Localizer,
                BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
        }

        #endregion Global Variable

        #region Registration Agent

        [AllowAnonymous]
        [HttpPost(ActionsConst.SBO.RegisterAgent)]
        public async Task<IActionResult> RegisterAgentAsync([FromBody] SBORegistrationAgentRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            using (var SBO_helper = new SBOGameHelpers())
            {
                var result = await SBO_helper.CallRegisterAgentAPI(request);

                return OkResponse(result);
            }
        }

        #endregion Registration Agent

        #region Registration Player

        [HttpPost(ActionsConst.SBO.RegisterPlayer)]
        public async Task<IActionResult> RegisterAsync([FromBody] GetByIdRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);

            if (Role == RoleConst.Users) request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            string username;

            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.SBOGamePrefix + user.UserId;
            }

            using (var SBO_helper = new SBOGameHelpers(Connection))
            {
                var result = await SBO_helper.CallRegisterPlayerAPI(username);

                if (result.Error.Id != 0) return OkResponse(result);

                await SBO_helper.SBORegister(request.Id, username, JsonConvert.SerializeObject(result));

                await SBO_helper.SetPlayerBetLimitAsync(username);

                return OkResponse(result);
            }
        }

        #endregion Registration Player

        #region Login

        [HttpPost(ActionsConst.SBO.Login)]
        public async Task<IActionResult> LoginAsync([FromBody] GameLoginRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);

            if (Role == RoleConst.Users) request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            string username;

            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.SBOGamePrefix + user.UserId;
            }

            var loginToken = await SBOGameHelpers.CallLoginAPI(username);

            if (loginToken.Error.Msg != GameConst.SBO.ErrorMessage.Success) return BadResponse(loginToken.Error.Msg);

            string language = SBOGameHelpers.GetLanguageCode(Language.Code.ToString());

            string device = request.IsMobile ? GameConst.SBO.Device.Mobile : GameConst.SBO.Device.Desktop;

            var getLoginURL = SBOGameHelpers.CallLoginToSportsBookAPI(loginToken, language, device);

            loginToken.Url = getLoginURL;

            return OkResponse(loginToken);
        }

        #endregion Login

        #region Set Player Default Bet Limit

        [HttpPost(ActionsConst.SBO.SetPlayerDefaultBetLimit)]
        public async Task<IActionResult> SetPlayerDefaultBetLimitAsync([FromBody] List<SBOSetPlayerDefaultBetLimitRequest> request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await CheckUserRole();

            var adminId = GetUserId(User);
            request.ForEach(x => x.AdminId = adminId);

            using (var SBO_helper = new SBOGameHelpers(Connection))
            {
                await SBO_helper.SetPlayerDefaultBetLimitAsync(request);

                return OkResponse();
            }
        }

        #endregion Set Player Default Bet Limit

        #region Update Player Default Bet Limit

        [HttpPost(ActionsConst.SBO.UpdatePlayerDefaultBetLimit)]
        public async Task<IActionResult> UpdatePlayerDefaultBetLimitAsync([FromBody] List<SBOSetPlayerDefaultBetLimitUpdateRequest> request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await CheckUserRole();

            var adminId = GetUserId(User);
            request.ForEach(x => x.AdminId = adminId);

            using (var SBO_helper = new SBOGameHelpers(Connection))
            {
                await SBO_helper.UpdatePlayerDefaultBetLimitAsync(request);

                return OkResponse();
            }
        }

        #endregion Update Player Default Bet Limit

        #region Get Player Default Bet Limit

        [HttpGet(ActionsConst.SBO.GetPlayerDefaultBetLimit)]
        public async Task<IActionResult> GetPlayerDefaultBetLimitAsync()
        {
            await CheckUserRole();

            using (var SBO_helper = new SBOGameHelpers(Connection))
            {
                var result = await SBO_helper.GetPlayerDefaultBetLimitAsync();

                return OkResponse(result);
            }
        }

        #endregion Get Player Default Bet Limit

        #region Get League

        [HttpPost(ActionsConst.SBO.GetLeague)]
        public async Task<IActionResult> GetLeagueAsync([FromBody] SBOGetLeagueAdminRequest request)
        {
            await CheckUserRole();

            request.FromDate.AddHours(-12);
            request.ToDate.AddHours(-12);

            using (SBOGameHelpers SBOGame_Helpers = new SBOGameHelpers(Connection))
            {
                var result = await SBOGame_Helpers.GetLeague(request);

                return OkResponse(result);
            }
        }

        #endregion Get League

        #region Get Blank League List

        [HttpPost(ActionsConst.SBO.GetBlankLeague)]
        public async Task<IActionResult> GetBlankLeague([FromBody] SBOGetLeagueAdminRequest request)
        {
            await CheckUserRole();

            request.FromDate.AddHours(-12);
            request.ToDate.AddHours(-12);

            using (SBOGameHelpers SBOGame_Helpers = new SBOGameHelpers(Connection))
            {
                var result = await SBOGame_Helpers.GetBlankLeagueAsync(request);

                return OkResponse(result);
            }
        }

        #endregion Get Blank League List

        #region Set League Bet Setting

        [HttpPost(ActionsConst.SBO.SetLeagueBetSetting)]
        public async Task<IActionResult> SetLeagueBetSettingAsync([FromBody] List<SBOSetLeagueBetSettingRequest> requests)
        {
            await CheckUserRole();

            using (SBOGameHelpers SBOGame_Helpers = new SBOGameHelpers(Connection))
            {
                await SBOGame_Helpers.CallSetLeagueBetSettingAPI(requests);
            }

            return OkResponse();
        }

        #endregion Set League Bet Setting

        #region Get League Bet Setting

        [HttpGet(ActionsConst.SBO.GetLeagueBetSetting)]
        public async Task<IActionResult> GetLeagueBetSetting()
        {
            await CheckUserRole();

            using (SBOGameHelpers SBOGame_Helpers = new SBOGameHelpers(Connection))
            {
                var result = await SBOGame_Helpers.CallGetLeagueBetSettingAPI();

                return OkResponse(result);
            }
        }

        #endregion Get League Bet Setting
    }
}