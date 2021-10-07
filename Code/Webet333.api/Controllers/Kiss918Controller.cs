using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
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
    public class Kiss918Controller : BaseController
    {
        #region Global Variable

        public Kiss918Controller(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
        }

        #endregion Global Variable

        #region Kiss 918 game Register

        [Authorize]
        [HttpPost(ActionsConst.Kiss918.Register)]
        public async Task<IActionResult> Kiss918Register([FromBody] GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string password, MobileNo;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                password = "WB3@" + SecurityHelpers.DecryptPassword(user.Password);
                if (password.Length > 14) password = password.Substring(0, 14);
                MobileNo = user.MobileNo;
            }

            var randomUsername = await Kiss918GameHelpers.Kiss918RandomUsername();

            if (!randomUsername.Success) return OkResponse(randomUsername);

            var username = randomUsername.Account;

            var result = await Kiss918GameHelpers.Kiss918Register(username, password, MobileNo);

            if (!result.Success) return OkResponse(result);

            using (var kiss_helper = new Kiss918GameHelpers(Connection))
            {
                var kiss918Request = new Game918KissRegisterRequest()
                {
                    _918KissUserName = username,
                    UserId = request.Id,
                    APIResponse = JObject.FromObject(result)
                };
                await kiss_helper.Game918KissRegister(kiss918Request, password);
                return OkResponse(result);
            }
        }

        #endregion Kiss 918 game Register
    }
}