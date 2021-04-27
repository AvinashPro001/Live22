using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Game;
using Webet333.models.Request.GameBalance;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class PlaytechGameController : BaseController
    {
        #region Global Variable

        private IHostingEnvironment _hostingEnvironment;

        public PlaytechGameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IHostingEnvironment environment, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
            _hostingEnvironment = environment;
        }

        #endregion Global Variable

        #region Playtech Broken Status

        [HttpPost(ActionsConst.Playtech.Broken)]
        public async Task<IActionResult> BrokenStatusUpdate([FromBody] UserBalanceRequest request)
        {
            bool unfinishedGame;
            var result = await PlaytechGameHelpers.CallPlaytechBrokenAPI(request.Username, _hostingEnvironment);
            if (result.result == null)
            {
                using (var game_helper = new PlaytechGameHelpers(Connection))
                    await game_helper.BrokenStatusUpdate(request.Username, "complete", JsonConvert.SerializeObject(result));
                unfinishedGame = false;
            }
            else
            {
                string status;
                var waitingList = result.result.Where(x => x.STATUS == "waiting");
                if (waitingList.Count() == 0)
                    status = result.result.OrderByDescending(x => x.FINISHEDGAMEDATE).First().STATUS;
                else
                    status = "waiting";

                unfinishedGame = status == "waiting" ? true : false;
                using (var game_helper = new PlaytechGameHelpers(Connection))
                    await game_helper.BrokenStatusUpdate(request.Username, status, JsonConvert.SerializeObject(result));
            }
            return OkResponse(new { Status = unfinishedGame, Response = result });
        }

        #endregion Playtech Broken Status

        #region Playtech game Register

        [Authorize]
        [HttpPost(ActionsConst.Playtech.Register)]
        public async Task<IActionResult> PlaytechRegister([FromBody] GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string username, password;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.PlaytechGamePrefix + user.Username;
                password = SecurityHelpers.DecryptPassword(user.Password);
            }

            username = Regex.Replace(username, "#", "");

            var result = await PlaytechGameHelpers.PlaytechRegister(username, password, _hostingEnvironment);

            if (result.Result == null) return OkResponse(result);

            using (var playtech_helper = new PlaytechGameHelpers(Connection))
            {
                var PlaytechRequest = new GamePlaytechRegisterRequest()
                {
                    PlaytechUserName = username,
                    UserId = request.Id,
                    APIResponse = JObject.FromObject(result)
                };
                await playtech_helper.GamePlaytechRegister(PlaytechRequest);
                return OkResponse(result);
            }
        }

        #endregion Playtech game Register
    }
}