using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.GameBalance;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class JokerController : BaseController
    {

        #region Global Variable

        public JokerController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
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

        #region Joker Broken Status details

        [HttpPost(ActionsConst.Joker.BrokenDetails)]
        public async Task<IActionResult> JokerBrokenGameStatusDetails([FromBody] UserBalanceRequest request)
        {
            using (var joker_helper = new GameBalanceHelpers(Connection))
            {
                var res = await joker_helper.CallJokerGameBalance(request.Username,true);
                return OkResponse(res);
            }
        }

        #endregion 


    }
}
