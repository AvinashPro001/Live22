using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.dapper;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Response.ReferralBonus;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class ReferralBonusController : BaseController
    {
        #region Global Variable

        public ReferralBonusController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
        }

        #endregion Global Variable

        #region Referral Bonus Retrive

        [Authorize]
        [HttpPost(ActionsConst.ReferralBonus.retrive)]
        public async Task<IActionResult> ReferralBonusRetrive([FromBody] DateRangeFilterRequest request)
        {
            if (RoleConst.Users == GetUserRole(User))
                request.Id = GetUserId(User);

            List<ReferralBonusListResponse> list = new List<ReferralBonusListResponse>();
            using (var repository = new DapperRepository<ReferralBonusListResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.ReferralBonus.ReferralBonusRetrive, new { UserId = request.Id, request.FromDate, request.ToDate });
                list = result.ToList();
            }

            if (list.Count != 0)
            {
                var total = list.FirstOrDefault().Total;
                var totalPages = GenericHelpers.CalculateTotalPages(total, request.PageSize == null ? list.Count : request.PageSize);

                return OkResponse(new
                {
                    result = list,
                    total = total,
                    totalPages = totalPages,
                    pageSize = request.PageSize ?? 10,
                    offset = list.FirstOrDefault().OffSet,
                });
            }
            return OkResponse(new
            {
                result = list,
                total = 0,
                totalPages = 0,
                pageSize = 0,
                offset = 0,
            });
        }

        #endregion Referral Bonus Retrive
    }
}
