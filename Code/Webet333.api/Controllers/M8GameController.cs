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

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class M8GameController : BaseController
    {

        #region Global Variable
        public M8GameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions) : base(ConnectionStringsOptions.Value, Localizer)
        {
            this.Localizer = Localizer;
        }

        #endregion Global Variable

        #region M8 game Register

        [Authorize]
        [HttpPost(ActionsConst.M8.Register)]
        public async Task<IActionResult> M8Register([FromBody] GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string username="Test101010";
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.M8GamePrefix + user.Username;
            }
            var result = await M8GameHelpers.CallRegisterAPI(username);
            using (var allbet_helper = new AllBetGameHelpers(Connection))
            {
                if (result.response.errcode != "0") return OkResponse(result.response);
                await allbet_helper.AllBetRegister(request.Id, username, JsonConvert.SerializeObject(result));
                return OkResponse(result);
            }
        }

        #endregion 
    }
}
