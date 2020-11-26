using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class JokerController : BaseController
    {

        #region Global Variable

        public JokerController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions) : base(ConnectionStringsOptions.Value, Localizer)
        {
            this.Localizer = Localizer;
        }

        #endregion Global Variable

        #region Joker Broken Status

        [HttpPost(ActionsConst.Joker.Broken)]
        public async Task<IActionResult> JokerBrokenGameStatus([FromBody] GetByIdRequest request)
        {
            using (var joker_helper = new JokerHelpers(Connection))
            {
                var res = await joker_helper.JokerBrokenStatus(request.Id);
                return OkResponse(res);
            }
        }

        #endregion 

    }
}
