using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using Webet333.api.Controllers.Base;
using Webet333.dapper;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Response;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    [Authorize]
    public class FreeCreditEventController : BaseController
    {
        #region Global Variable

        private IHostingEnvironment _hostingEnvironment;

        public FreeCreditEventController(
            IStringLocalizer<BaseController> Localizer,
            IOptions<ConnectionConfigs> ConnectionStringsOptions,
            IHostingEnvironment Environment,
            IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
            _hostingEnvironment = Environment;
        }

        #endregion Global Variable

        #region FreeCreditEvent Insert

        [HttpPost(ActionsConst.FreeCreditEvent.FreeCreditEventInsert)]
        public async System.Threading.Tasks.Task<IActionResult> FreeCreditEventInsertAsync([FromBody] FreeCreditEventInsertRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser(role: RoleConst.Admin);

            request.UserId = GetUserId(User);
            request.UniqueId = GetUniqueId(User);
            request.TermJSON = JsonConvert.SerializeObject(request.FreeCreditEventTerm);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.FreeCreditEvent.FreeCreditEventPersist,
                    new
                    {
                        request.UserId,
                        request.UniqueId,
                        request.Name,
                        request.UserGroupId,
                        request.TermJSON
                    });
            }

            return OkResponse();
        }

        #endregion FreeCreditEvent Insert

        #region FreeCreditEvent Update

        [HttpPost(ActionsConst.FreeCreditEvent.FreeCreditEventUpdate)]
        public async System.Threading.Tasks.Task<IActionResult> FreeCreditEventUpdateAsync([FromBody] FreeCreditEventUpdateRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser(role: RoleConst.Admin);

            request.UserId = GetUserId(User);
            request.UniqueId = GetUniqueId(User);
            //request.TermJSON = JsonConvert.SerializeObject(request.FreeCreditEventTerm);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.FreeCreditEvent.FreeCreditEventPersist,
                    new
                    {
                        request.UserId,
                        request.UniqueId,
                        request.Name,
                        request.Id,
                        request.UserGroupId,
                        TermJSON = request.TermJSON == null ? string.Empty : request.TermJSON
                    });
            }

            return OkResponse();
        }

        #endregion FreeCreditEvent Update

        #region Set Free Credit Term

        [HttpPost(ActionsConst.FreeCreditEvent.FreeCreditEventSetFreeCreditTerm)]
        public async System.Threading.Tasks.Task<IActionResult> FreeCreditEventSetFreeCreditTermAsync([FromBody] SetFreeCreditTermRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser(role: RoleConst.Admin);

            request.UserId = GetUserId(User);
            request.UniqueId = GetUniqueId(User);
            request.TermJSON = JsonConvert.SerializeObject(request.FreeCreditEventTerm);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(
                     StoredProcConsts.FreeCreditEvent.FreeCreditEventSetFreeCreditTerm,
                     new
                     {
                         request.UserId,
                         request.UniqueId,
                         request.Id,
                         request.UserGroupId,
                         request.TermJSON
                     });

                return OkResponse(result);
            }
        }

        #endregion Set Free Credit Term

        #region FreeCreditEvent Select

        [HttpPost(ActionsConst.FreeCreditEvent.FreeCreditEventSelect)]
        public async System.Threading.Tasks.Task<IActionResult> FreeCreditEventSelectAsync([FromBody] SearchParamWithValidationRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser(role: RoleConst.Admin);

            request.UserId = GetUserId(User);
            request.UniqueId = GetUniqueId(User);

            if (request.Id == null)
            {
                using (var repository = new DapperRepository<dynamic>(Connection))
                {
                    var result = await repository.GetDataAsync(StoredProcConsts.FreeCreditEvent.FreeCreditEventSelect, request);

                    return OkResponse(result);
                }
            }
            else
            {
                using (var repository = new DapperRepository<FreeCreditEventSelectResponse>(Connection))
                {
                    var result = await repository.GetDataAsync(StoredProcConsts.FreeCreditEvent.FreeCreditEventSelect, request);

                    if (result.Any())
                    {
                        foreach (var data in result)
                        {
                            data.UserList = data.UserList == null ? null : JsonConvert.DeserializeObject<List<FreeCreditEventSelectUserListResponse>>(data.UserList);
                            data.Terms = data.Terms == null ? null : JsonConvert.DeserializeObject<List<FreeCreditEventSelectTermsResponse>>(data.Terms);
                        }
                    }

                    return OkResponse(result);
                }
            }
        }

        #endregion FreeCreditEvent Select

        #region FreeCreditEvent Update Status

        [HttpPost(ActionsConst.FreeCreditEvent.FreeCreditEventUpdateStatus)]
        public async System.Threading.Tasks.Task<IActionResult> FreeCreditEventUpdateStatusAsync([FromBody] DeleteRequestWithValidation request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser(role: RoleConst.Admin);

            request.UserId = GetUserId(User);
            request.UniqueId = GetUniqueId(User);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.FreeCreditEvent.FreeCreditEventUpdateStatus, request);
            }

            return OkResponse();
        }

        #endregion FreeCreditEvent Update Status

        #region FreeCreditEvent Delete

        [HttpPost(ActionsConst.FreeCreditEvent.FreeCreditEventDelete)]
        public async System.Threading.Tasks.Task<IActionResult> FreeCreditEventDeleteAsync([FromBody] DeleteRequestWithValidation request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser(role: RoleConst.Admin);

            request.UserId = GetUserId(User);
            request.UniqueId = GetUniqueId(User);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.FreeCreditEvent.FreeCreditEventUpdatDelete, request);
            }

            return OkResponse();
        }

        #endregion FreeCreditEvent Delete

        #region FreeCreditEvent Users Select

        [HttpPost(ActionsConst.FreeCreditEvent.FreeCreditEventUsersSelect)]
        public async System.Threading.Tasks.Task<IActionResult> FreeCreditEventUsersSelectAsync([FromBody] FreeCreditEventUsersSelectRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            await ValidateUser(role: RoleConst.Admin);

            request.UserId = GetUserId(User);
            request.UniqueId = GetUniqueId(User);

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.FreeCreditEvent.FreeCreditEventUsersSelect, request);

                return OkResponse(result);
            }
        }

        #endregion FreeCreditEvent Users Select
    }
}