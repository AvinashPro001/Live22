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
using Webet333.models.Response.Game.CQ9;
using CQ9Const = Webet333.models.Constants.GameConst.CQ9;

namespace Webet333.api.Controllers
{
    [Authorize]
    [Route(ActionsConst.ApiVersion)]
    public class CQ9GameController : BaseController
    {
        #region Global Variable & Constructor

        public CQ9GameController(
            IStringLocalizer<BaseController> Localizer,
            IOptions<ConnectionConfigs> ConnectionStringsOptions,
            IOptions<BaseUrlConfigs> BaseUrlConfigsOption) :
            base(
                ConnectionStringsOptions.Value,
                Localizer,
                BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
        }

        #endregion Global Variable & Constructor

        #region Register

        [HttpPost(ActionsConst.CQ9.Register)]
        public async Task<IActionResult> Register([FromBody] GetByIdRequest request)
        {
            if (request == null) return BadResponse(ErrorConsts.EmptyRequest);
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);
            if (Role == RoleConst.Users) request.Id = GetUserId(User).ToString();
            if (Role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            string username, nickname, password;

            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.CQ9GamePrefix + user.UserId;
                nickname = user.Username;
                password = SecurityHelpers.DecryptPassword(user.Password);

                password = Regex.Replace(password, @"[^0-9a-zA-Z]+", "");
                //if (password.Length < 6) password = $"{user.GamePlayGamePrefix}{password}";
                //else if (password.Length > 12) password = password.Substring(0, 11);
            }

            using (var CQ9Game_Helpers = new CQ9GameHelpers(Connection))
            {
                var result = await CQ9Game_Helpers.CallRegisterPlayerAPI(username, password, nickname);

                if (result.Status.Code != "0") return OkResponse(result);

                await CQ9Game_Helpers.CQ9Register(request.Id, username, nickname, password, JsonConvert.SerializeObject(result));

                return OkResponse(result);
            }
        }

        #endregion Register

        #region Update Password

        [HttpPost(ActionsConst.CQ9.UpdatePassword)]
        public async Task<IActionResult> UpdatePassword([FromBody] GetByIdRequest request)
        {
            if (request == null) return BadResponse(ErrorConsts.EmptyRequest);
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);
            if (Role == RoleConst.Users) request.Id = GetUserId(User).ToString();
            if (Role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            string username, password;

            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.CQ9GamePrefix + user.UserId;
                password = SecurityHelpers.DecryptPassword(user.Password);

                password = $"WB4@{password}";
                password = Regex.Replace(password, @"[^0-9a-zA-Z]+", "");
                //if (password.Length < 6) password = $"{user.GamePlayGamePrefix}{password}";
                //else if (password.Length > 12) password = password.Substring(0, 11);
            }

            using (var CQ9_Helpers = new CQ9GameHelpers(Connection))
            {
                var result = await CQ9_Helpers.CallUpdatePasswordAPI(username, password);

                if (result.Status.Code != "0") return BadResponse(result.Status.Message);

                await CQ9_Helpers.GamePlayUpdatePassword(request.Id, password);

                return OkResponse(new { password });
            }
        }

        #endregion Update Password

        #region Login

        [HttpPost(ActionsConst.CQ9.Login)]
        public async Task<IActionResult> LoginAsync([FromBody] GameLoginRequest request)
        {
            if (request == null) return BadResponse(ErrorConsts.EmptyRequest);
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);
            if (Role == RoleConst.Users) request.Id = GetUserId(User).ToString();
            if (Role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            string username, password;

            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.GetUsernameInfo(request.Id);
                username = user.CQ9Username;
                password = user.CQ9Password;
            }

            var result = await CQ9GameHelpers.CallLoginAPI(username, password);

            if (result.Status.Code != "0") return BadResponse(result.Status.Message);

            string language = Language.Code == LanguageConst.Chinese ? CQ9Const.LanguageCode.Chinese : CQ9Const.LanguageCode.English;

            CQ9GetLoginURLResponse res = await CQ9GameHelpers.CallGetLoginURLAPI(result.Data.Usertoken, language);

            if (res.Status.Code != "0") return BadResponse(res.Status.Message);

            return OkResponse(res);
        }

        #endregion Login
    }
}