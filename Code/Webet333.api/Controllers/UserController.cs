using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.dapper;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Account;
using Webet333.models.Request.Base;
using Webet333.models.Request.Payments;
using Webet333.models.Request.User;
using Webet333.models.Response;
using Webet333.models.Response.User;

namespace Webet333.api.Controllers
{
    [Authorize]
    [Route(ActionsConst.ApiVersion)]
    public class UserController : BaseController
    {
        #region Variable

        private IHostingEnvironment _hostingEnvironment;

        public UserController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IHostingEnvironment environment, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
            _hostingEnvironment = environment;
        }

        #endregion Variable

        #region Users Retrive

        [HttpPost(ActionsConst.Users.Retrieve)]
        public async Task<IActionResult> GetUsers([FromBody] SearchRequest request, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();
            using (var user_help = new UserHelpers(Connection))
            {
                var users = await user_help.GetUsers(RoleConst.Users, request?.Keyword ?? null, BaseUrlConfigsOptions.Value);

                if (users != null)
                    return OkResponse(users);
                return NotFoundResponse();
            }
        }

        #endregion Users Retrive

        #region Bank Register

        [HttpPost(ActionsConst.Users.BankRegister)]
        public async Task<IActionResult> RegisterBank([FromBody] RegisterBankRequest request)
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
        public async Task<IActionResult> BankUpdate([FromBody] RegisterBankRequest request)
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
        public async Task<IActionResult> UsersBalance([FromBody] GetByIdRequest request)
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
        public async Task<IActionResult> UsersBank([FromBody] GetByIdRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            string userRole = GetUserRole(User);
            using (var user_help = new UserHelpers(Connection))
            {
                if (userRole != RoleConst.Admin)
                    return OkResponse(await user_help.GetData(StoredProcConsts.User.GetUsersBank, GetUserId(User), GetUniqueId(User), GetUserRole(User)));
                return OkResponse(await user_help.GetData(StoredProcConsts.User.GetUsersBank, Guid.Parse(request.Id), GetUniqueId(User), GetUserRole(User)));
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
        public async Task<IActionResult> ProfileUpdate([FromBody] ProfileEditRequest request)
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
        public async Task<IActionResult> ProfileChangeStatus([FromBody] DeleteRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);
            await ValidateUser(role: RoleConst.Admin);

            string adminId = GetUserId(User).ToString();

            using (var user_help = new UserHelpers(Connection))
            {
                await user_help.ProfileStatusUpdate(request, adminId);
            }
            return OkResponse();
        }

        #endregion Profile Change Status

        #region Profile Delete

        [HttpPost(ActionsConst.Users.ProfileDelete)]
        public async Task<IActionResult> ProfileDelete([FromBody] DeleteRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);
            await ValidateUser(role: RoleConst.Admin);

            string adminId = GetUserId(User).ToString();

            using (var user_help = new UserHelpers(Connection))
            {
                await user_help.ProfileDelete(request, adminId);
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
                var users = await user_help.GetUsersWinloseReport(request.FromDate, request.ToDate);

                if (users != null) return OkResponse(users);

                return NotFoundResponse();
            }
        }

        #endregion Users Winlose report

        #region Permission Management

        #region Permission Retrieve Based on Role

        [HttpPost(ActionsConst.Users.DefaultPermissionList)]
        public async Task<IActionResult> DefaultPermissionList(
           [FromBody] BaseRoleRequest request,
           [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await ValidateUser(role: RoleConst.Admin);

            using (var repository = new DapperRepository<PermissionResponse>(Connection))
            {
                var result = await repository.FindAsync(StoredProcConsts.User.SelectDefaultPermission, request);

                if (result == null
                    || string.IsNullOrEmpty(result.DefaultPermission))
                    return OkResponse(result);

                var defaultPermissions = new GenericHelpers(Connection).BindDefaultPermissionList(result.DefaultPermission);

                return OkResponse(new
                {
                    id = result.Id,
                    permissionsList = defaultPermissions
                });
            }
        }

        #endregion Permission Retrieve Based on Role

        #region Add Admin

        [HttpPost(ActionsConst.Users.AdminAdd)]
        public async Task<IActionResult> AdminAdd(
            [FromBody] RegisterAdminRequest request,
            [FromServices] IOptions<AuthConfig> AuthConfigOptions)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            request.UniqueId = GetUniqueId(User);
            request.UserId = GetUserId(User);
            request.Role = RoleConst.Admin;
            request.AdminId = GetUserId(User);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.User.UsersAdminPersist,
                    new
                    {
                        Password = SecurityHelpers.EncryptPassword(request.Password),
                        Permissions = JsonConvert.SerializeObject(request.PermissionsList),
                        request.UniqueId,
                        request.UserId,
                        request.Username,
                        request.Role,
                        request.AdminId
                    });
            }

            return OkResponse();
        }

        #endregion Add Admin

        #region Admin Retrive

        [HttpPost(ActionsConst.Users.AdminRetrieve)]
        public async Task<IActionResult> AdminRetrieve(
            [FromBody] SearchRequest request,
            [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await ValidateUser(role: RoleConst.Admin);

            using (var user_help = new UserHelpers(Connection))
            {
                var users = await user_help.GetUsers(RoleConst.Admin, request?.Keyword ?? null, BaseUrlConfigsOptions.Value, GetUserId(User).ToString());

                return OkResponse(users);
            }
        }

        #endregion Admin Retrive

        #region Update

        [HttpPost(ActionsConst.Users.AdminUpdate)]
        public async Task<IActionResult> AdminUpdateAsync(
            [FromBody] UpdateAdminRequest request,
            [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            request.UniqueId = GetUniqueId(User);
            request.UserId = GetUserId(User);
            request.AdminId = GetUserId(User);

            if (request.PermissionsList == null) request.PermissionsList = null;

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.User.UsersAdminPersist,
                    new
                    {
                        Id = request.Id,
                        Password = SecurityHelpers.EncryptPassword(request.Password),
                        Permissions = request.PermissionsList == null ? null : JsonConvert.SerializeObject(request.PermissionsList),
                        request.UniqueId,
                        request.UserId,
                        request.Username,
                        request.AdminId
                    });
            }

            return OkResponse();
        }

        #endregion Update

        #endregion Permission Management

        #region Get User Details Based on Id or Username

        [HttpPost(ActionsConst.Users.RetrieveById)]
        public async Task<IActionResult> RetrieveById([FromBody] RetrieveByIdRequest request)
        {
            await CheckUserRole();

            request.UserId = GetUserId(User);
            request.UniqueId = GetUniqueId(User);

            using (var repository = new DapperRepository<GlobalJsonResponse>(Connection))
            {
                var result = await repository.FindAsync(StoredProcConsts.User.Users_Select_By_Id, request);

                if (result != null && result.DocumentListSerialized != null)
                {
                    var users = JsonConvert.DeserializeObject<List<dynamic>>(result.DocumentListSerialized);

                    foreach (var data in users)
                    {
                        if (data.VIPBanner != null)
                        {
                            data.VIPBanner = (data.VIPBanner != null ? baseUrlConfigs.ImageBase + baseUrlConfigs.VIPIcon + "/" + data.VIPLevel + data.VIPBanner : null);
                        }

                        if (data.UserICImage != null)
                        {
                            foreach (var data1 in data.UserICImage)
                            {
                                data1.ICImageBanner = baseUrlConfigs.ImageBase + baseUrlConfigs.UserICImage + "/" + data1.ICImageBanner;
                            }
                        }
                    }

                    return OkResponse(users);
                }
                else return NotFoundResponse();
            }
        }

        #endregion Get User Details Based on Id or Username

        #region Get Users Id & Username

        [HttpPost(ActionsConst.Users.RetrieveForDropdown)]
        public async Task<IActionResult> RetrieveForDropdown([FromBody] BaseRoleRequest request)
        {
            await CheckUserRole();

            request.UniqueId = GetUniqueId(User);
            request.UserId = GetUserId(User);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.User.Users_Select_For_Dropdown, request);
                //dynamic users = new List<dynamic>();
                //if (result != null && result.DocumentListSerialized != null) users = JsonConvert.DeserializeObject<List<dynamic>>(result.DocumentListSerialized);

                return OkResponse(result);
            }
        }

        #endregion Get Users Id & Username

        #region Admin Log Select

        [HttpPost(ActionsConst.Users.AdminLogSelect)]
        public async Task<IActionResult> AdminLogSelect([FromBody] AdminLogSelectRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser(role: RoleConst.Admin);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.User.AdminLogSelect, request);

                return OkResponse(result);
            }
        }

        #endregion Admin Log Select

        #region Admin Action Select For Dropdown

        [HttpGet(ActionsConst.Users.AdminActionSelectForDropdown)]
        public async Task<IActionResult> AdminActionSelectForDropdown()
        {
            await ValidateUser(role: RoleConst.Admin);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.User.MasterAction_Select_For_Dropdown, new { });

                return OkResponse(result);
            }
        }

        #endregion Admin Action Select For Dropdown

        #region Admin Module Select For Dropdown

        [HttpGet(ActionsConst.Users.AdminModuleSelectForDropdown)]
        public async Task<IActionResult> AdminModuleSelectForDropdown()
        {
            await ValidateUser(role: RoleConst.Admin);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.User.MasterModule_Select_For_Dropdown, new { });

                return OkResponse(result);
            }
        }

        #endregion Admin Module Select For Dropdown
    }
}