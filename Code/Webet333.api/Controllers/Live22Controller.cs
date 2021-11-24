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
    public class Live22Controller : BaseController
    {
        #region Global Variable

        public Live22Controller(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
        }

        #endregion Global Variable

        #region Live22 game Register

        [Authorize]
        [HttpPost(ActionsConst.Live22.Register)]
        public async Task<IActionResult> Live22Register([FromBody] GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string password, MobileNo;
            var username ="";
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                password = "WB3@" + SecurityHelpers.DecryptPassword(user.Password);
                if (password.Length > 14) password = password.Substring(0, 14);
                MobileNo = user.MobileNo;
                username = user.Live22GamePrefix + user.UserId;
            }

            //var randomUsername = await Live22GameHelpers.Live22RandomUsername();

           // if (!randomUsername.Success) return OkResponse(user.userNAme);

            //var username = randomUsername.Account;

           

            var result = await Live22GameHelpers.Live22Register(username);

            if (result.Success) return OkResponse(result);

            using (var Live22_helper = new Live22GameHelpers(Connection))
            {
                var Live22Request = new GameLive22RegisterRequest()
                {
                    Live22UserName = username,
                    UserId = request.Id,
                    APIResponse = JObject.FromObject(result)
                };
                await Live22_helper.GameLive22Register(Live22Request, password);
                return OkResponse(result);
            }
        }

        #endregion Live22 game Register

        [Authorize]
        [HttpPost(ActionsConst.Live22.GameLaunch)]
        public async Task<IActionResult> LaunchLive22([FromBody] GameLaunchRequest request)
        {
                   

            using (var account_helper = new AccountHelpers(Connection))
            {
                var result = await Live22GameHelpers.Live22gameLaunch(request.username, request.password);               
                return OkResponse(result);
            }

        }


    }
}



