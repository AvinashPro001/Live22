using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Game;
using GamePlayConst = Webet333.models.Constants.GameConst.GamePlay;

namespace Webet333.api.Controllers
{
    [Authorize]
    [Route(ActionsConst.ApiVersion)]
    public class GamePlayController : BaseController
    {
        #region Global Variable

        public GamePlayController(
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

        #region Register

        [HttpPost(ActionsConst.GamePlay.Register)]
        public async Task<IActionResult> Register([FromBody] GetByIdRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);

            if (Role == RoleConst.Users) request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            string username, password;

            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.GamePlayGamePrefix + user.UserId;
                password = SecurityHelpers.DecryptPassword(user.Password);
            }

            using (var GamePlay_Helpers = new GamePlayHelpers(Connection))
            {
                var result = await GamePlay_Helpers.CallRegisterPlayerAPI(username, password);

                if (result.Status != 0) return BadResponse(result.ErrorDesc);

                await GamePlay_Helpers.GamePlayRegister(request.Id, username, password, JsonConvert.SerializeObject(result));

                return OkResponse(result);
            }
        }

        #endregion Register

        #region Update Password

        [HttpPost(ActionsConst.GamePlay.UpdatePassword)]
        public async Task<IActionResult> UpdatePassword([FromBody] GetByIdRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);

            if (Role == RoleConst.Users) request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            string username, password;

            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.GamePlayGamePrefix + user.UserId;
                password = SecurityHelpers.DecryptPassword(user.Password);
            }

            using (var GamePlay_Helpers = new GamePlayHelpers(Connection))
            {
                password = $"WB4@{password}";
                if (password.Length > 12) password = password.Substring(0, 12);

                var result = await GamePlay_Helpers.CallUpdatePasswordAPI(username, password);

                if (result.Status != 0) return BadResponse(result.ErrorDesc);

                await GamePlay_Helpers.GamePlayUpdatePassword(request.Id, password);

                return OkResponse(new { password });
            }
        }

        #endregion Update Password

        #region Login

        [HttpPost(ActionsConst.GamePlay.Login)]
        public async Task<IActionResult> LoginAsync([FromBody] GamePlayGameLoginRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users) request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            string username;

            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.GamePlayGamePrefix + user.UserId;
            }

            string language = Language.Code == LanguageConst.Chinese ? GamePlayConst.LanguageCode.TraditionalChinese : Language.Code == LanguageConst.Malay ? GamePlayConst.LanguageCode.Malay : GamePlayConst.LanguageCode.English;

            string platform = request.IsMobile == true ? "html5" : "html5-desktop";

            if (string.IsNullOrWhiteSpace(request.GameCode)) request.GameCode = GamePlayConst.GameCode;

            var result = await GamePlayHelpers.CallLaunchGameAPI(username, language, platform, request.GameCode);

            if (result.Status != 0) return BadResponse(result.ErrorDesc);

            return OkResponse(result);
        }

        #endregion Login

        #region Game List API

        [HttpGet(ActionsConst.GamePlay.GetGameList)]
        public async Task<IActionResult> GetGameList()
        {
            string language = Language.Code == LanguageConst.Chinese ? GamePlayConst.LanguageCode.TraditionalChinese : Language.Code == LanguageConst.Malay ? GamePlayConst.LanguageCode.Malay : GamePlayConst.LanguageCode.English;

            var result = await GamePlayHelpers.CallGetGameListAPI(language);

            if (result.Status != 0) return BadResponse(result.ErrorDesc);

            return OkResponse(result);
        }

        #endregion Game List API
    }
}