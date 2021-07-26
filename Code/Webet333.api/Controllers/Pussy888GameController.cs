using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Game;
using Webet333.models.Response.Account;
using Webet333.models.Response.Game;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class Pussy888GameController : BaseController
    {
        #region Local variable and Constructor

        private static readonly HttpClient client = new HttpClient();

        public Pussy888GameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
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

            string username, MobileNo, password;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.Pussy888GamePrefix + user.Username;
                MobileNo = user.MobileNo;
                password = SecurityHelpers.DecryptPassword(user.Password);
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
            string password;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(UserEntity.Id.ToString());
                password = SecurityHelpers.DecryptPassword(user.Password);
            }
            using (var pussygame_helper = new Pussy888GameHelpers(Connection))
            {
                var newPassword = "Wb3@" + SecurityHelpers.DecryptPassword(password);

                if (newPassword.Length > 14)
                    newPassword = newPassword.Substring(0, 14);

                var result = await pussygame_helper.Pussy888GamePasswordReset(UserEntity, newPassword);
                if (result.code != 0) return BadResponse(result.msg);
                await pussygame_helper.Pussy888PasswordUpdate(UserEntity.Id.ToString(), newPassword);
                return OkResponse(new { newPassword });
            }
        }

        #endregion Pussy888 game password reset

        #region Pussy888 game password reset by Admin

        [Authorize]
        [HttpPost(ActionsConst.Pussy888.ResetPasswordByAdmin)]
        public async Task<IActionResult> Pussy888GamePasswordResetByAdmin([FromBody] SlotsGamePasswordResertByAdmin request)
        {
            await ValidateUser(role: RoleConst.Admin);
            using (var pussygame_helper = new Pussy888GameHelpers(Connection))
            {
                var newPassword = "Wb3@" + SecurityHelpers.DecryptPassword(request.Password);

                if (newPassword.Length > 14)
                    newPassword = newPassword.Substring(0, 14);

                var PasswordUpdateRequest = new ProfileResponse
                {
                    UserName = request.Username,
                    UserNamePussy888 = request.GameUsername,
                    PasswordPussy888 = request.GamePassword,
                };

                var result = await pussygame_helper.Pussy888GamePasswordReset(PasswordUpdateRequest, newPassword);
                if (result.code != 0) return BadResponse(result.msg);

                await pussygame_helper.Pussy888PasswordUpdate(request.UserId.ToString(), newPassword);
                await pussygame_helper.ResetPasswordStatusUpdate(true, request.RowId);
                return OkResponse(new { newPassword });
            }
        }

        #endregion Pussy888 game password reset by Admin

        #region All Pussy888 game users password reset

        [Authorize]
        [HttpGet(ActionsConst.Pussy888.AllUsers_Pussy888_ResetPassword)]
        public async Task<IActionResult> Kiss918GameAllUsersPasswordReset()
        {
            await ValidateUser();
            using (var pussygame_helper = new Pussy888GameHelpers(Connection))
            {
                var users = await pussygame_helper.GetAllPussy888Usersname();

                List<Kiss918PasswordResetResponse> list = new List<Kiss918PasswordResetResponse>();
                foreach (var user in users)
                {
                    var newPassword = "Wb3@" + SecurityHelpers.DecryptPassword(user.Password);
                    if (newPassword.Length > 14)
                        newPassword = newPassword.Substring(0, 14);

                    var request = new ProfileResponse();
                    request.PasswordPussy888 = user.KissPassword;
                    request.UserNamePussy888 = user.KissUsername;
                    request.UserName = user.Username;

                    var result = await pussygame_helper.Pussy888GamePasswordReset(request, newPassword);
                    if (result.code == 0)
                    {
                        await pussygame_helper.Pussy888PasswordUpdate(user.Id.ToString(), newPassword);
                    }
                    list.Add(result);
                }
                return OkResponse(new { list });
            }
        }

        #endregion All Pussy888 game users password reset
    }
}