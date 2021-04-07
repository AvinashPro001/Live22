using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Webet333.api.Controllers.Base;
using Webet333.dapper;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    [Authorize]
    public class UserGroupController : BaseController
    {
        #region Global Variable

        private IHostingEnvironment _hostingEnvironment;

        public UserGroupController(
            IStringLocalizer<BaseController> Localizer,
            IOptions<ConnectionConfigs> ConnectionStringsOptions,
            IHostingEnvironment environment,
            IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
            _hostingEnvironment = environment;
        }

        #endregion Global Variable

        #region UserGroup Insert

        [HttpPost(ActionsConst.UserGroup.UserGroupInsert)]
        public async System.Threading.Tasks.Task<IActionResult> UserGroupInsertAsync([FromBody] UserGroupInsertRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser(role: RoleConst.Admin);

            request.UserId = GetUserId(User);
            request.UniqueId = GetUniqueId(User);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.UserGroup.UserGroupPersist, request);
            }

            return OkResponse();
        }

        #endregion UserGroup Insert

        #region UserGroup Update

        [HttpPost(ActionsConst.UserGroup.UserGroupUpdate)]
        public async System.Threading.Tasks.Task<IActionResult> UserGroupUpdateAsync([FromBody] UserGroupUpdateRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser(role: RoleConst.Admin);

            request.UserId = GetUserId(User);
            request.UniqueId = GetUniqueId(User);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.UserGroup.UserGroupPersist, request);
            }

            return OkResponse();
        }

        #endregion UserGroup Update

        #region UserGroup Select

        [HttpPost(ActionsConst.UserGroup.UserGroupSelect)]
        public async System.Threading.Tasks.Task<IActionResult> UserGroupSelectAsync([FromBody] SearchParamRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser(role: RoleConst.Admin);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.UserGroup.UserGroupSelect, request);

                return OkResponse(result);
            }
        }

        #endregion UserGroup Select

        #region UserGroup Update Status

        [HttpPost(ActionsConst.UserGroup.UserGroupUpdateStatus)]
        public async System.Threading.Tasks.Task<IActionResult> UserGroupUpdateStatusAsync([FromBody] DeleteRequestWithValidation request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser(role: RoleConst.Admin);

            request.UserId = GetUserId(User);
            request.UniqueId = GetUniqueId(User);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.UserGroup.UserGroupUpdateStatus, request);
            }

            return OkResponse();
        }

        #endregion UserGroup Update Status

        #region UserGroup Delete

        [HttpPost(ActionsConst.UserGroup.UserGroupDelete)]
        public async System.Threading.Tasks.Task<IActionResult> UserGroupDeleteAsync([FromBody] DeleteRequestWithValidation request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser(role: RoleConst.Admin);

            request.UserId = GetUserId(User);
            request.UniqueId = GetUniqueId(User);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.UserGroup.UserGroupUpdatDelete, request);
            }

            return OkResponse();
        }

        #endregion UserGroup Delete

        #region Add User Into user Group

        [HttpPost(ActionsConst.UserGroup.UserGroupInsertUser)]
        public async System.Threading.Tasks.Task<IActionResult> UserGroupInsertUserAsync([FromBody] UserGroupInsertUserRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser(role: RoleConst.Admin);

            request.UserId = GetUserId(User);
            request.UniqueId = GetUniqueId(User);
            request.UsersIdList = JsonConvert.SerializeObject(request.UsersId);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.UserGroup.UserGroupUsersInsert,
                    new
                    {
                        UserId = request.UserId,
                        UniqueId = request.UniqueId,
                        UserGroupId = request.UserGroupId,
                        UsersIdList = request.UsersIdList
                    });
            }

            return OkResponse();
        }

        #endregion Add User Into user Group

        #region Delete User From User Group

        [HttpPost(ActionsConst.UserGroup.UserGroupDeleteUser)]
        public async System.Threading.Tasks.Task<IActionResult> UserGroupDeleteUserAsync([FromBody] UserGroupDeleteUserRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser(role: RoleConst.Admin);

            request.UserId = GetUserId(User);
            request.UniqueId = GetUniqueId(User);
            request.UsersIdList = JsonConvert.SerializeObject(request.UsersId);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.UserGroup.UserGroupUsersDelete,
                    new
                    {
                        UserId = request.UserId,
                        UniqueId = request.UniqueId,
                        UserGroupId = request.UserGroupId,
                        UsersIdList = request.UsersIdList,
                        DeleteAll = request.DeleteAll
                    });
            }

            return OkResponse();
        }

        #endregion Delete User From User Group

        #region Select User From user Group

        [HttpPost(ActionsConst.UserGroup.UserGroupSelectUser)]
        public async System.Threading.Tasks.Task<IActionResult> UserGroupSelectUserAsync([FromBody] UserGroupSelectUserRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser(role: RoleConst.Admin);

            request.UserId = GetUserId(User);
            request.UniqueId = GetUniqueId(User);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.UserGroup.UserGroupUsersInsert, request);

                return OkResponse(result);
            }
        }

        #endregion Select User From user Group
    }
}