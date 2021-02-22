using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
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

        [Authorize]
        [HttpPost(ActionsConst.Kiss918.Register)]
        public async Task<IActionResult> Kiss918Register([FromBody] GetByIdRequest request)
        {
            //var Role = GetUserRole(User);

            //if (Role == RoleConst.Users)
            //    request.Id = GetUserId(User).ToString();

            //if (Role == RoleConst.Admin)
            //    if (string.IsNullOrEmpty(request.Id))
            //        return BadResponse("error_invalid_modelstate");

            //string username;

            //var result = await JokerHelpers.JokerRegister(username);

            //if (result.Status == null) return BadResponse(result.Message);

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
            return OkResponse();
        }

        #endregion 

    }
}
