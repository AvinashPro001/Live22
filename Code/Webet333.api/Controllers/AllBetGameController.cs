using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
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
    public class AllBetGameController : BaseController
    {
        #region Global Variable

        public AllBetGameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
        }

        #endregion Global Variable

        #region AllBet game Register

        [Authorize]
        [HttpPost(ActionsConst.AllBet.Register)]
        public async Task<IActionResult> ALLBetRegister([FromBody] GetByIdRequest request)
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
                username = user.AllBetGamePrefix + user.UserId;
                password = SecurityHelpers.DecryptPassword(user.Password);
            }

            username = Regex.Replace(username, @"[^0-9a-zA-Z]+", "");

            var result = await AllBetGameHelpers.RegisterCallAPI(username, password);
            using (var allbet_helper = new AllBetGameHelpers(Connection))
            {
                if (result.error_code != "OK") return OkResponse(result);
                await allbet_helper.AllBetRegister(request.Id, username, JsonConvert.SerializeObject(result));
                return OkResponse(result);
            }
        }

        #endregion AllBet game Register

        #region AllBet game Login

        [Authorize]
        [HttpPost(ActionsConst.AllBet.Login)]
        public async Task<IActionResult> ALLBetLogin([FromBody] GameLoginRequest request)
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
                username = user.AllBetGamePrefix + user.UserId;
                password = SecurityHelpers.DecryptPassword(user.Password);
            }
            var languageCode = Language.Name == "English" ? "en" : "zh_CN";
            var Apptype = request.IsMobile ? 3 : 6;
            var result = await AllBetGameHelpers.LoginCallAPI(username, password, languageCode, Apptype);
            return OkResponse(result);
        }

        #endregion AllBet game Login

        #region AllBet game Login

        
        [HttpPost(ActionsConst.AllBet.Modified)]
        public async Task<IActionResult> ALLBetModified([FromQuery]string Username,string hadicap)
        {
            var result = await AllBetGameHelpers.CallModifiedClient(Username,hadicap);
            return OkResponse(result);
        }

        #endregion AllBet game Login

        #region AllBet game Change password

        [Authorize]
        [HttpPost(ActionsConst.AllBet.ChangePassword)]
        public async Task<IActionResult> ALLBetChangePassword([FromBody] GameLoginRequest request)
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
                username = user.AllBetGamePrefix + user.UserId;
                password = SecurityHelpers.DecryptPassword(user.Password);
            }

            var result = await AllBetGameHelpers.ChangePasswordCallAPI(username, password);
            return OkResponse(result);
        }

        #endregion AllBet game Change password
    }
}