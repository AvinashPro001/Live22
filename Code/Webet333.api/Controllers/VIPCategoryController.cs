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
        public VIPCategoryController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IHostingEnvironment environment, IHubContext<SignalRHub> hubContext) : base(ConnectionStringsOptions.Value, Localizer)
        {
            this.Localizer = Localizer;
            _hostingEnvironment = environment;
            _hubContext = hubContext;
        }

        #endregion Global Variable

        [HttpPost(ActionsConst.VIPCategory.Insert)]
        public async Task<IActionResult> VIPCategoryAdd([FromBody] VIPCategoryInsertRequest request, [FromServices] IOptions<AuthConfig> AuthConfigOptions)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            using (var vipCategory_help = new VIPCategoryHelpers(Connection))
            {
                await vipCategory_help.VIPCategoryInsert(request);
                return OkResponse();
            }
        }
    }
}
