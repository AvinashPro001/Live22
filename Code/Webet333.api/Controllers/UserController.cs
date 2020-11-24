using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Account;
using Webet333.models.Request.Payments;
using Webet333.models.Request.User;

namespace Webet333.api.Controllers
{
    [Authorize]
    [Route(ActionsConst.ApiVersion)]
    public class UserController : BaseController
    {
        #region Variable
        private IHostingEnvironment _hostingEnvironment;

        public UserController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IHostingEnvironment environment) : base(ConnectionStringsOptions.Value, Localizer)
        {
            this.Localizer = Localizer;
            _hostingEnvironment = environment;
        }

        #endregion Variable

        #region Users Retrive

        [HttpPost(ActionsConst.Users.Retrieve)]
        public async Task<IActionResult> GetUsers([FromBody]SearchRequest request, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {

            await CheckUserRole();
            using (var user_help = new UserHelpers(Connection))
            {
                var users = await user_help.GetUsers(RoleConst.Users, request?.Keyword ?? null, BaseUrlConfigsOptions.Value.ImageBase+ BaseUrlConfigsOptions.Value.UserICImage);

                if (users != null )
                    return OkResponse(users);
                return NotFoundResponse();
            }
        }

        #endregion Users Retrive

        #region Bank Register

        [HttpPost(ActionsConst.Users.BankRegister)]
        public async Task<IActionResult> RegisterBank([FromBody]RegisterBankRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);
            await ValidateUser(role: RoleConst.Users);

            using (var user_help = new UserHelpers(Connection))
            {
                if (string.IsNullOrEmpty(request.AccountName))
                    request.AccountName = UserEntity.Name;

                request.UserId = UserEntity.Id.ToString();
                await user_help.BankRegister(request);
            }
            return OkResponse();
        }

        #endregion Bank Register

        #region Bank Update

        [HttpPost(ActionsConst.Users.BankUpdate)]
        public async Task<IActionResult> BankUpdate([FromBody]RegisterBankRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);
            await ValidateUser(role: RoleConst.Users);

            using (var user_help = new UserHelpers(Connection))
            {
                request.AccountName = null;
                request.UserId = UserEntity.Id.ToString();
                await user_help.BankRegister(request);
            }
            return OkResponse();
        }

        #endregion Bank Update

        #region User balance

        [HttpPost(ActionsConst.Users.UsersBalance)]
        public async Task<IActionResult> UsersBalance([FromBody]GetByIdRequest request)
        {
            //if (request == null) return BadResponse("error_empty_request");
            //if (!ModelState.IsValid) return BadResponse(ModelState);
            
            using (var user_help = new UserHelpers(Connection))
            {
                var Role = GetUserRole(User);
                if (Role == RoleConst.Admin)
                {
                    if (request == null)
                        return BadResponse("error_invalid_value");
                    return OkResponse(await user_help.GetData(StoredProcConsts.User.GetWalletBalance, Guid.Parse(request?.Id.ToString())));
                }
                return OkResponse(await user_help.GetData(StoredProcConsts.User.GetWalletBalance, GetUserId(User)));
            }
        }

        #endregion User balance

        #region Users Bank

        [HttpPost(ActionsConst.Users.UsersBank)]
        public async Task<IActionResult> UsersBank([FromBody]GetByIdRequest request)
        {
            //if (request == null) return BadResponse("error_empty_request");
            //if (!ModelState.IsValid) return BadResponse(ModelState);
            await ValidateUser();
            using (var user_help = new UserHelpers(Connection))
            {
                if (UserEntity.Role != RoleConst.Admin)
                    return OkResponse(await user_help.GetData(StoredProcConsts.User.GetUsersBank, GetUserId(User), UserEntity.Name));
                return OkResponse(await user_help.GetData(StoredProcConsts.User.GetUsersBank, Guid.Parse(request.Id), UserEntity.Name));
            }
        }

        #endregion Users Bank

        #region Profile

        [HttpGet(ActionsConst.Users.Profile)]
        public async Task<IActionResult> Profile()
        {
            await ValidateUser();
            return OkResponse(UserEntity);
        }

        #endregion Profile

        #region Profile Update

        [HttpPost(ActionsConst.Users.ProfileUpdate)]
        public async Task<IActionResult> ProfileUpdate([FromBody]ProfileEditRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);
            await ValidateUser();

            if (UserEntity.Role == RoleConst.Users)
            {
                request.Id = UserEntity.Id;
                request.Password = null;
            }
            else if (UserEntity.Role == RoleConst.Admin)
            {
                if (request.Password != null)
                {
                    using (var account_help = new AccountHelpers(Connection))
                    {
                        await account_help.UserGamePasswordChange(request.Id.ToString(), request.Password, _hostingEnvironment);
                        request.Password = SecurityHelpers.EncryptPassword(request.Password);
                    }
                }
            }

            using (var user_help = new UserHelpers(Connection))
                await user_help.UpdateProfile(request);

            return OkResponse();
        }

        #endregion Profile Update

        #region Profile Change Status

        [HttpPost(ActionsConst.Users.ProfileChangeStatus)]
        public async Task<IActionResult> ProfileChangeStatus([FromBody]DeleteRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);
            await ValidateUser(role: RoleConst.Admin);
            using (var user_help = new UserHelpers(Connection))
            {
                await user_help.ProfileStatusUpdate(request);
            }
            return OkResponse();
        }

        #endregion Profile Change Status

        #region Profile Delete

        [HttpPost(ActionsConst.Users.ProfileDelete)]
        public async Task<IActionResult> ProfileDelete([FromBody]DeleteRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);
            await ValidateUser(role: RoleConst.Admin);
            using (var user_help = new UserHelpers(Connection))
            {
                await user_help.ProfileDelete(request);
            }
            return OkResponse();
        }

        #endregion Profile Delete

        #region Users Winlose report

        [HttpPost(ActionsConst.Users.UserWinloseReport)]
        public async Task<IActionResult> GetWinloseReport([FromBody] GlobalGetRequest request)
        {
            await CheckUserRole();
            using (var user_help = new UserHelpers(Connection))
            {
                var users = await user_help.GetUsersWinloseReport(request.FromDate,request.ToDate);

                if (users != null)
                    return OkResponse(users);
                return NotFoundResponse();
            }
        }

        #endregion Users Retrive
    }
}

