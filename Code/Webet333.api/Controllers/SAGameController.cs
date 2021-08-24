using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Game;
using Webet333.models.Request.Game.SA;
using Webet333.models.Response.Game.SA;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class SAGameController : BaseController
    {
        #region Global variable and Constructor

        private static readonly HttpClient client = new HttpClient();

        private IHostingEnvironment _hostingEnvironment;

        public SAGameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IHostingEnvironment environment, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
            _hostingEnvironment = environment;
        }

        #endregion Global variable and Constructor

        #region SA game Register

        [Authorize]
        [HttpPost(ActionsConst.SA.SARegsiter)]
        public async Task<IActionResult> SARegister([FromBody] GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string username = "";
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.SAGamePrefix + user.UserId;
            }
            try
            {
                username = Regex.Replace(username, @"[^0-9a-zA-Z]+", "");
                if (username.Length > 20)
                {
                    username = username.Substring(0, 20);
                }
                var response = await SAGameHelpers.CallAPIRegister(username);
                if (response.Descendants("ErrorMsgId").Single().Value == "0")
                {
                    using (var sa_helper = new SAGameHelpers(Connection))
                    {
                        var result = await sa_helper.SARegister(username, response.ToString(), request.Id);

                        return OkResponse(new SARegisterResponse { status = response.Descendants("ErrorMsgId").Single().Value, Message = response.Descendants("ErrorMsg").Single().Value });
                    }
                }
                return OkResponse(new SARegisterResponse { status = response.Descendants("ErrorMsgId").Single().Value, Message = response.Descendants("ErrorMsg").Single().Value });
            }
            catch
            {
                return OkResponse(new SARegisterResponse { status = "8", Message = "Maintenance" });
            }
        }

        #endregion SA game Register

        #region SA game Login

        [Authorize]
        [HttpPost(ActionsConst.SA.SALogin)]
        public async Task<IActionResult> SALogin([FromBody] GameLoginRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string username;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.GetUsernameInfo(request.Id);
                username = user.SAUsername;
            }

            try
            {
                var response = await SAGameHelpers.CallAPILogin(username);

                if (response.Descendants("ErrorMsgId").Single().Value == "0")
                {
                    var token = response.Descendants("Token").Single().Value;
                    var displayName = response.Descendants("DisplayName").Single().Value;
                    var language = Language.Name == "English" ? "en_US" : Language.Name == "Malay" ? "ms" : "zh_CN";
                    var launchUrl = $"{GameConst.SAConst.GameLaunchURL}?username={displayName}&token={token}&lobby=A2717&lang={language}&returnurl={GameConst.BaseUrl}&mobile={request.IsMobile}";
                    return OkResponse(new SALoginResponse { Url = launchUrl, status = response.Descendants("ErrorMsgId").Single().Value, Message = response.Descendants("ErrorMsg").Single().Value });
                }
                return OkResponse(new SALoginResponse { status = response.Descendants("ErrorMsgId").Single().Value, Message = response.Descendants("ErrorMsg").Single().Value });
            }
            catch
            {
                return OkResponse(new SARegisterResponse { status = "8585", Message = "Maintenance" });
            }
        }

        #endregion SA game Login
    }
}