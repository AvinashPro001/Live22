using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Filters;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request.VIPCategory;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class VIPCategoryController : BaseController
    {
        #region Global Variable

        private IHostingEnvironment _hostingEnvironment;

        private IHubContext<SignalRHub> _hubContext;

        public VIPCategoryController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IHostingEnvironment environment, IHubContext<SignalRHub> hubContext, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
            _hostingEnvironment = environment;
            _hubContext = hubContext;
        }

        #endregion Global Variable

        [Authorize]
        [HttpPost(ActionsConst.VIPCategory.Insert)]
        public async Task<IActionResult> VIPCategoryAdd([FromBody] VIPCategoryInsertRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            request.AdminId = GetUserId(User);

            using (var vipCategory_help = new VIPCategoryHelpers(Connection))
            {
                await vipCategory_help.VIPCategoryInsert(request);
                return OkResponse();
            }
        }

        [Authorize]
        [HttpGet(ActionsConst.VIPCategory.Select)]
        public async Task<IActionResult> VIPCategorySelect()
        {
            using (var vipCategory_help = new VIPCategoryHelpers(Connection))
            {
                var res = await vipCategory_help.VIPCategorySelect();
                return OkResponse(res);
            }
        }

        [HttpGet(ActionsConst.VIPCategory.VIPLevelSelect)]
        public async Task<IActionResult> VIPSelect([FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            using (var vipCategory_help = new VIPCategoryHelpers(Connection))
            {
                var data = await vipCategory_help.GetVIPLevelList(BaseUrlConfigsOptions.Value);
                return OkResponse(data);
            }
        }

        [Authorize]
        [HttpPost(ActionsConst.VIPCategory.VIPLevelUserUpdate)]
        public async Task<IActionResult> VIPLevelUpdate([FromBody] UserVIPLevelUpdateRequest request)
        {
            request.Role = GetUserRole(User);
            request.UniqueId = GetUniqueId(User);

            using (var vipCategory_help = new VIPCategoryHelpers(Connection))
            {
                await vipCategory_help.UserVIPLevelUpdate(request);
                return OkResponse();
            }
        }

        #region VIP Level Free Credit

        [HttpGet(ActionsConst.VIPCategory.VIPLevelGiveFreeCredit)]
        public async Task<IActionResult> GiveFreeCredit()
        {
            await CheckUserRole();

            using (var vip_help = new VIPCategoryHelpers(Connection))
            {
                await vip_help.GiveFreeCredit();
                return OkResponse();
            }
        }

        #endregion VIP Level Free Credit

        #region VIP Free Credit Promotion Setting

        [Authorize]
        [HttpGet(ActionsConst.VIPCategory.VIPFreeCreditPromotionSetting)]
        public async Task<IActionResult> FreeCreditPromotionSetting()
        {
            var Role = GetUserRole(User);

            using (var vip_helper = new VIPCategoryHelpers(Connection))
            {
                return OkResponse(await vip_helper.GetFreeCreditPromotionSetting());
            }
        }

        #endregion VIP Free Credit Promotion Setting

        [Authorize]
        [HttpGet(ActionsConst.VIPCategory.VIPLevelUserDetails)]
        public async Task<IActionResult> UserVIPLevelDetails()
        {
            var Role = GetUserRole(User);
            var UniqueId = GetUniqueId(User);
            var UserId = GetUserId(User);

            using (var vipCategory_help = new VIPCategoryHelpers(Connection))
            {
                var result=await vipCategory_help.UserVIPLevelDetails(UserId,UniqueId,Role);
                result.VIPBanner = (result.VIPBanner != null ? baseUrlConfigs.ImageBase + baseUrlConfigs.VIPIcon + "/" + result.VIPLevel + result.VIPBanner : null);
                return OkResponse(result);
            }
        }

    }
}