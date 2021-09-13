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
using JDBGameConst = Webet333.models.Constants.GameConst.JDB;

namespace Webet333.api.Controllers
{
    [Authorize]
    [Route(ActionsConst.ApiVersion)]
    public class JDBGameController : BaseController
    {
        #region Global Variable

        public JDBGameController(
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

        [HttpPost(ActionsConst.JDB.Register)]
        public async Task<IActionResult> Register([FromBody] GetByIdRequest request)
        {
            if (request == null) return BadResponse(ErrorConsts.EmptyRequest);
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var role = GetUserRole(User);
            if (role == RoleConst.Users) request.Id = GetUserId(User).ToString();
            if (role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            string username;

            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.JDBGamePrefix + user.UserId;
            }

            using (var JDB_Helpers = new JDBGameHelpers(Connection))
            {
                var result = await JDB_Helpers.CallRegisterPlayerAPI(username);

                if (result.Status != JDBGameConst.SuccessResponse.Status) return OkResponse(result);

                await JDB_Helpers.JDBRegister(request.Id, username, JsonConvert.SerializeObject(result));

                return OkResponse(result);
            }
        }

        #endregion Register

        #region Login

        [HttpPost(ActionsConst.JDB.Login)]
        public async Task<IActionResult> LoginAsync([FromBody] GameLoginRequest request)
        {
            if (request == null) return BadResponse(ErrorConsts.EmptyRequest);
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var role = GetUserRole(User);
            if (role == RoleConst.Users) request.Id = GetUserId(User).ToString();
            if (role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            string username;

            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.GetUsernameInfo(request.Id);
                username = user.JDBUsername;
            }

            string language = Language.Code == LanguageConst.Chinese ? JDBGameConst.LanguageCode.SimplifiedChinese : JDBGameConst.LanguageCode.English;

            var result = await JDBGameHelpers.CallLaunchGameAPI(username, language, request.IsMobile.ToString());

            if (result.Status != JDBGameConst.SuccessResponse.Status) return BadResponse(result.Desc);

            return OkResponse(result);
        }

        #endregion Login
    }
}