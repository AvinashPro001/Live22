using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Game;
using Webet333.models.Request.GameBalance;
using Webet333.models.Response.Game.Joker;

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
                var res = await joker_helper.CallJokerGameBalance(request.Username, true);
                return OkResponse(res);
            }
        }

        #endregion 

        #region Joker game Register

        [Authorize]
        [HttpPost(ActionsConst.Joker.Register)]
        public async Task<IActionResult> JokerRegister([FromBody] GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string username;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.JokerGamePrefix + user.Username;
            }
            var result = await JokerHelpers.JokerRegister(username);

            if (result.Status == null) return BadResponse(result.Message);

            using (var joker_helper = new JokerHelpers(Connection))
            {
                var JokerRequest = new GameJokerRegisterRequest()
                {
                    JokerUserName = username,
                    UserId = request.Id,
                    APIResponse = JObject.FromObject(result)
                };
                await joker_helper.GameJokerRegister(JokerRequest);
                return OkResponse(result);
            }
        }

        #endregion 
    }
}
