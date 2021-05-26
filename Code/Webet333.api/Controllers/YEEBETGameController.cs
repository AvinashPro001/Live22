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

namespace Webet333.api.Controllers
{
    [Authorize]
    [Route(ActionsConst.ApiVersion)]
    public class YEEBETGameController : BaseController
    {
        #region Global Variable

        public YEEBETGameController(
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

        [HttpPost(ActionsConst.YEEBET.Register)]
        public async Task<IActionResult> RegisterAsync([FromBody] GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users) request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            string username;

            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.YEEBETGamePrefix + user.UserId;
            }

            var result = await YEEBETGameHelpers.RegisterCallAPI(username);

            using (var yeebet_helper = new YEEBETGameHelpers(Connection))
            {
                if (result.result != 0) return OkResponse(result);

                await yeebet_helper.WMRegister(request.Id, username, JsonConvert.SerializeObject(result));

                return OkResponse(result);
            }
        }

        #endregion Register

        #region Login

        [HttpPost(ActionsConst.YEEBET.Login)]
        public async Task<IActionResult> LoginAsync([FromBody] GameLoginRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users) request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            string username;

            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.YEEBETGamePrefix + user.UserId;
            }

            int language = Language.Code == LanguageConst.Chinese ? 1 : 2;

            int clienttype = request.IsMobile ? 2 : 1;

            var result = await YEEBETGameHelpers.LoginCallAPI(username, language, clienttype);

            return OkResponse(result);
        }

        #endregion Login
    }
}