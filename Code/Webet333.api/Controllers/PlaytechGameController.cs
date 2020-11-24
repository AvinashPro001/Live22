using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request.GameBalance;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class PlaytechGameController : BaseController
    {

        #region Global Variable

        private IHostingEnvironment _hostingEnvironment;

        public PlaytechGameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IHostingEnvironment environment) : base(ConnectionStringsOptions.Value, Localizer)
        {
            this.Localizer = Localizer;
            _hostingEnvironment = environment;
        }

        #endregion Global Variable


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
            return OkResponse(new { Status = unfinishedGame,Response=result});
        }
    }
}
