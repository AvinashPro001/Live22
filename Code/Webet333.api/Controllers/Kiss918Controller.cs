using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;

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

        //[Authorize]
        [HttpPost(ActionsConst.Kiss918.Register)]
        public async Task<IActionResult> Kiss918Register([FromBody] GetByIdRequest request)
        {
            //var Role = GetUserRole(User);

            //if (Role == RoleConst.Users)
            //    request.Id = GetUserId(User).ToString();

            //if (Role == RoleConst.Admin)
            //    if (string.IsNullOrEmpty(request.Id))
            //        return BadResponse("error_invalid_modelstate");

            string password,MobileNo;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                password = SecurityHelpers.DecryptPassword(user.Password);
                MobileNo = user.MobileNo;
            }

            var randomUsername = await Kiss918GameHelpers.Kiss918RandomUsername();

            if (!randomUsername.Success) return BadResponse(randomUsername.Msg);

            var username = randomUsername.Account;

            var result = await Kiss918GameHelpers.Kiss918Register(username,password, MobileNo);

            //using (var joker_helper = new JokerHelpers(Connection))
            //{
            //    var JokerRequest = new GameJokerRegisterRequest()
            //    {
            //        JokerUserName = username,
            //        UserId = request.Id,
            //        APIResponse = JObject.FromObject(result)
            //    };
            //    await joker_helper.GameJokerRegister(JokerRequest);
            //    return OkResponse(result);
            //}
            return OkResponse(result);
        }

        #endregion 

    }
}
