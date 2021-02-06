using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.dapper;
using Webet333.files.interfaces;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Account;
using Webet333.models.Request.Base;
using Webet333.models.Request.Payments;
using Webet333.models.Request.User;
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
            using (var user_help = new UserHelpers(Connection))
            {
                await user_help.ProfileStatusUpdate(request);
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
                var users = await user_help.GetUsersWinloseReport(request.FromDate, request.ToDate);

                if (users != null)
                    return OkResponse(users);
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
                        request.Role
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
                        request.Username
                    });
            }

            return OkResponse();
        }

        #endregion MyRegion

        #endregion Permission Management

        #region Contact Management

        #region Contact Type API's

        #region Contact Type Insert

        [HttpPost(ActionsConst.Users.ContactTypeAdd)]
        public async Task<IActionResult> ContactTypeAdd([FromBody] ContactTypeAddRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();
            var extension = request.TypeImage == null ? null : "." + request.TypeImage.Split("base64,")[0].Split("/")[1].Replace(";", "");
            var image = request.TypeImage == null ? null : request.TypeImage.Split("base64,")[1];
            request.TypeImage = extension;

            using (var user_help = new UserHelpers(Connection))
            {
                var type = await user_help.AddContactType(request);

                if (request.TypeImage != null)
                    using (var generic_help = new GenericHelpers(Connection))
                        generic_help.GetImageWithExtension(uploadManager, image, BaseUrlConfigsOptions.Value.ContactImage, type.Id.ToString(), extension);

                return OkResponse();
            }
        }

        #endregion

        #region Contact Type Update

        [HttpPost(ActionsConst.Users.ContactTypeUpdate)]
        public async Task<IActionResult> ContactTypeUpdate([FromBody] ContactTypeUpdateRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();
            var extension = request.TypeImage == null ? null : "." + request.TypeImage.Split("base64,")[0].Split("/")[1].Replace(";", "");
            var image = request.TypeImage == null ? null : request.TypeImage.Split("base64,")[1];
            request.TypeImage = extension;

            using (var user_help = new UserHelpers(Connection))
            {
                var type = await user_help.UpdateContactType(request);

                if (request.TypeImage != null)
                {
                    using (var generic_help = new GenericHelpers(Connection))
                    {
                        generic_help.DeleteImage(uploadManager, type.Id.ToString(), BaseUrlConfigsOptions.Value.ContactImage);
                        generic_help.GetImageWithExtension(uploadManager, image, BaseUrlConfigsOptions.Value.ContactImage, type.Id.ToString(), extension);
                    }
                }
                return OkResponse();
            }
        }

        #endregion

        #region Contact Type Select

        [HttpGet(ActionsConst.Users.ContactTypeSelect)]
        public async Task<IActionResult> ContactTypeSelect([FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();

            using (var user_help = new UserHelpers(Connection))
            {
                var type = await user_help.SelectContactType();
                type.ForEach(x =>
                {
                    x.TypeImage = x.TypeImage == null ? null : $"{BaseUrlConfigsOptions.Value.ImageBase}{BaseUrlConfigsOptions.Value.ContactImage}/{x.Id}{x.TypeImage}";
                });
                return OkResponse(type);
            }
        }

        #endregion

        #endregion

        #region Contact Type Details API's

        #region Contact Type Details Insert 

        [HttpPost(ActionsConst.Users.ContactDetailsAdd)]
        public async Task<IActionResult> ContactTypeDetailsAdd([FromBody] ContactTypeDetailsAddRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();
            var extension = request.CSImage == null ? null : "." + request.CSImage.Split("base64,")[0].Split("/")[1].Replace(";", "");
            var image = request.CSImage == null ? null : request.CSImage.Split("base64,")[1];
            request.CSImage = extension;

            using (var user_help = new UserHelpers(Connection))
            {
                var type = await user_help.AddContactTypeDetails(request);

                if (request.CSImage != null)
                    using (var generic_help = new GenericHelpers(Connection))
                        generic_help.GetImageWithExtension(uploadManager, image, BaseUrlConfigsOptions.Value.ContactImage, type.ID.ToString(), extension);

                return OkResponse();
            }
        }

        #endregion

        #region Contact Type Details Update

        [HttpPost(ActionsConst.Users.ContactDetailsUpdate)]
        public async Task<IActionResult> ContactTypeDetailsUpdate([FromBody] ContactTypeDetailsUpdateRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();
            var extension = request.CSImage == null ? null : "." + request.CSImage.Split("base64,")[0].Split("/")[1].Replace(";", "");
            var image = request.CSImage == null ? null : request.CSImage.Split("base64,")[1];
            request.CSImage = extension;

            using (var user_help = new UserHelpers(Connection))
            {
                var type = await user_help.UpdateContactTypeDetails(request);

                if (request.CSImage != null)
                {
                    using (var generic_help = new GenericHelpers(Connection))
                    {
                        generic_help.DeleteImage(uploadManager, type.ID.ToString(), BaseUrlConfigsOptions.Value.ContactImage);
                        generic_help.GetImageWithExtension(uploadManager, image, BaseUrlConfigsOptions.Value.ContactImage, type.ID.ToString(), extension);
                    }
                }

                return OkResponse();
            }
        }

        #endregion

        #region Contact Type Details Select

        [HttpGet(ActionsConst.Users.ContactDetailsSelect)]
        public async Task<IActionResult> ContactTypeDetailsSelect([FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();

            using (var user_help = new UserHelpers(Connection))
            {
                var type = await user_help.SelectContactTypeDetails();
                type.ForEach(x =>
                {
                    x.CSImage = x.CSImage == null ? null : $"{BaseUrlConfigsOptions.Value.ImageBase}{BaseUrlConfigsOptions.Value.ContactImage}/{x.Id}{x.CSImage}";
                });
                return OkResponse(type);
            }
        }

        #endregion

        #endregion

        #endregion
    }
}