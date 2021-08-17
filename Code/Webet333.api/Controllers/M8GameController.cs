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
    public class M8GameController : BaseController
    {
        #region Global Variable

        public M8GameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
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

            string username;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.M8GamePrefix + user.UserId;
            }
            var result = await M8GameHelpers.CallRegisterAPI(username);
            if (result.response.errcode != "0") return OkResponse(result);
            using (var m8_helper = new M8GameHelpers(Connection))
            {
                var limit = await m8_helper.M8DefaultLimitSelect();

                var Url = $"{GameConst.M8.baseURL}?" +
                            $"secret={GameConst.M8.Secret}&" +
                            $"action={GameConst.M8.Update}&" +
                            $"agent={GameConst.M8.agent}&" +
                            $"username={username}&" +
                            $"max1={limit.Max1}&" +
                            $"max2={limit.Max2}&" +
                            $"max3={limit.Max3}&" +
                            $"max4={limit.Max4}&" +
                            $"max5={limit.Max5}&" +
                            $"max6={limit.Max6}&" +
                            $"max7={limit.Max7}&" +
                            $"lim1={limit.Lim1}&" +
                            $"lim2={limit.Lim2}&" +
                            $"lim3={limit.Lim3}&" +
                            $"lim4={limit.Lim4}&" +
                            $"com1={limit.Com}&" +
                            $"com2={limit.Com}&" +
                            $"com3={limit.Com}&" +
                            $"com4={limit.Com}&" +
                            $"com5={limit.Com}&" +
                            $"com6={limit.Com}&" +
                            $"com7={limit.Com}&" +
                            $"com8={limit.Com}&" +
                            $"com9={limit.Com}&" +
                            $"comtype={limit.Comtype}&" +
                            $"suspend={limit.Suspend}";
                await GameHelpers.CallThirdPartyApi(Url, null);

                var m8Request = new GameM8RegisterRequest()
                {
                    M8UserName = username,
                    UserId = request.Id,
                    APIResponse = JObject.FromObject(result)
                };
                await m8_helper.GameM8Register(m8Request);
                return OkResponse(result);
            }
        }

        #endregion M8 game Register

        #region M8 game Login

        [Authorize]
        [HttpPost(ActionsConst.M8.Login)]
        public async Task<IActionResult> M8Login([FromBody] GameLoginRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users) request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse("error_invalid_modelstate");

            string username;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.GetUsernameInfo(request.Id);
                username = user.M8Username;
            }

            var lang = Language.Code == "zh-Hans" ? "ZH-CN" : "EN-US";
            var result = await M8GameHelpers.CallLoginAPI(username, lang);

            if (result.Response.Errcode != "0") return OkResponse(new { errorcode = result.Response.Errcode, errortext = result.Response.Errtext, result = "" });

            if (request.IsMobile) return OkResponse(new { errorcode = result.Response.Errcode, errortext = result.Response.Errtext, result = result.Response.Result.Login.Mobiurlsecure.CdataSection });
            else return OkResponse(new { errorcode = result.Response.Errcode, errortext = result.Response.Errtext, result = result.Response.Result.Login.Weburlsecure.CdataSection });
        }

        #endregion M8 game Login
    }
}