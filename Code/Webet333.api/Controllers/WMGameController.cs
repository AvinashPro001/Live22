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
    [Route(ActionsConst.ApiVersion)]
    public class WMGameController : BaseController
    {

        #region Global Variable

        public WMGameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions) : base(ConnectionStringsOptions.Value, Localizer)
        {
            this.Localizer = Localizer;
        }

        #endregion Global Variable

        #region WM game Register

        [Authorize]
        [HttpPost(ActionsConst.WM.Register)]
        public async Task<IActionResult> WMRegister([FromBody] GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string username, password;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.WMGamePrefix + user.UserId;
                password = SecurityHelpers.DecryptPassword(user.Password);
            }
            var result = await WMGameHelpers.RegisterCallAPI(username, password);
            using (var wm_helper = new WMGameHelpers(Connection))
            {
                if (result.errorCode != 0) return OkResponse(result);
                await wm_helper.WMRegister(request.Id, username, JsonConvert.SerializeObject(result));
                return OkResponse(result);
            }
        }

        #endregion

        #region WM game Login

        [Authorize]
        [HttpPost(ActionsConst.WM.Login)]
        public async Task<IActionResult> WMLogin([FromBody] GameLoginRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string username, password;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.WMGamePrefix + user.UserId;
                password = SecurityHelpers.DecryptPassword(user.Password);
            }
            int lang = Language.Code == LanguageConst.English ? 1 : (Language.Code == LanguageConst.Chinese ? 0 : 7);
            int UI = request.IsMobile ? 2 : 0;
            var result = await WMGameHelpers.LoginCallAPI(username, password, lang,UI);
            return OkResponse(result);
        }

        #endregion
    }
}