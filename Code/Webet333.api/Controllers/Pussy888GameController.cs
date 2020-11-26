using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.User;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class Pussy888GameController : BaseController
    {
        #region Local variable and Constructor

        private static readonly HttpClient client = new HttpClient();

        public Pussy888GameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions) : base(ConnectionStringsOptions.Value, Localizer)
        {
            this.Localizer = Localizer;
        }

        #endregion Local variable and Constructor

        #region Pussy888 game Register

        [Authorize]
        [HttpPost(ActionsConst.Pussy888.Register)]
        public async Task<IActionResult> DGRegister([FromBody] GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string username, MobileNo,password;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.Pussy888GamePrefix + user.Username;
                MobileNo = user.MobileNo;
                password = user.Password;
            }
            var result = await Pussy888GameHelpers.CallRegisterAPI(MobileNo, username, password);
            using (var pussy888_helper = new Pussy888GameHelpers(Connection))
            {
                if (result.Code != 0) return BadResponse(JsonConvert.SerializeObject(result));
                await pussy888_helper.Pussy888Register(request.Id, result.Username, result.Password, JsonConvert.SerializeObject(result));
                return OkResponse(result);
            }
        }

        #endregion Pussy888 game Register

        #region Pussy888 game password reset

        [Authorize]
        [HttpGet(ActionsConst.Pussy888.ResetPassword)]
        public async Task<IActionResult> PussyGamePasswordReset()
        {
            await ValidateUser();
            using (var pussygame_helper = new Pussy888GameHelpers(Connection))
            {
                var newPassword = Pussy888GameHelpers.genratePassword();
                var result = await pussygame_helper.Pussy888GamePasswordReset(UserEntity, newPassword);
                if (result.code != 0) return BadResponse(result.msg);
                await pussygame_helper.Pussy888PasswordUpdate(UserEntity.Id.ToString(), newPassword);
                return OkResponse(new { newPassword });
            }
        }

        #endregion
    }
}
