using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Game;
using Webet333.models.Request.GameBalance;
using Webet333.models.Response.Game;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class PargmaticGameController : BaseController
    {
        #region Global Variable

        public PargmaticGameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
        }

        #endregion Global Variable

        #region Pragmatic Game Register

        [Authorize]
        [HttpPost(ActionsConst.Pragmatic.Register)]
        public async Task<IActionResult> PragmaticRegister([FromBody] GetByIdRequest request)
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
                username = user.PragmaticGamePrefix + user.UserId;
            }
            var result = await PragmaticGameHelpers.RegisterCallAPI(username);
            using (var pragmatic_helper = new PragmaticGameHelpers(Connection))
            {
                if (result.error != "0") return OkResponse(result);
                await pragmatic_helper.PragmaticRegister(request.Id, username, JsonConvert.SerializeObject(result));
                return OkResponse(result);
            }
        }

        #endregion Pragmatic Game Register

        #region Pragmatic game Login

        [Authorize]
        [HttpPost(ActionsConst.Pragmatic.Login)]
        public async Task<IActionResult> PragmaticLogin([FromBody] PragmaticGameLoginRequest request)
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
                username = user.PragmaticGamePrefix + user.UserId;
            }
            var languageCode = Language.Name == "English" ? "en" : (Language.Name == "Malay" ? "ms" : "zh");
            var platform = request.IsMobile ? "MOBILE" : "WEB";
            if (string.IsNullOrWhiteSpace(request.GameId)) request.GameId = GameConst.Pragmatic.Casino.GameCode;
            var result = await PragmaticGameHelpers.LoginCallAPI(username, languageCode, platform, request.GameId);
            return OkResponse(result);
        }

        #endregion Pragmatic game Login

        #region Pragmatic game List

        [Authorize]
        [HttpPost(ActionsConst.Pragmatic.GameList)]
        public async Task<IActionResult> PragmaticGameList([FromBody] GameLoginRequest request)
        {
            await CheckUserRole();

            string adminId = GetUserId(User).ToString();

            var result = await PragmaticGameHelpers.GameListCallAPI();
            var gameListModel = new List<GameListUploadResponse>();
            if (!request.IsMobile)
            {
                result.gameList.ForEach(game =>
                {
                    game.ImagePath = $"{GameConst.Pragmatic.ImageUrl}game_pic/rec/325/{game.gameID}.png";

                    gameListModel.Add(new GameListUploadResponse
                    {
                        GameCode = game.gameID,
                        GameName = game.gameName,
                        GameType = "Slots",
                        ImagePath1 = game.ImagePath,
                        ImagePath2 = $"{GameConst.Pragmatic.ImageUrl}game_pic/square/200/{game.gameID}.png"
                    });
                });
            }
            else
            {
                result.gameList.ForEach(game =>
                {
                    game.ImagePath = $"{GameConst.Pragmatic.ImageUrl}game_pic/rec/325/{game.gameID}.png";

                    gameListModel.Add(new GameListUploadResponse
                    {
                        GameCode = game.gameID,
                        GameName = game.gameName,
                        GameType = "Slots",
                        ImagePath1 = game.ImagePath,
                        ImagePath2 = $"{GameConst.Pragmatic.ImageUrl}game_pic/square/200/{game.gameID}.png"
                    });
                });
            }

            using (var game_help = new GameHelpers(Connection))
            {
                await game_help.GameListDeleted("Pragmatic Wallet");
                await game_help.GameListInsert(gameListModel, "Pragmatic Wallet", adminId);
            }

            return OkResponse(result);
        }

        #endregion Pragmatic game List

        #region Pragmatic Broken Status

        [HttpPost(ActionsConst.Pragmatic.Broken)]
        public async Task<IActionResult> PragmaticBrokenGameStatus([FromBody] UserBalanceRequest request)
        {
            var result = await PragmaticGameHelpers.BrokenStatus(request.Username);
            bool? unfinishedGame = false;
            if (result.error == "0")
            {
                if (result.data.Count == 0)
                {
                    using (var pragmatic_helper = new PragmaticGameHelpers(Connection))
                        await pragmatic_helper.PragmaticBrokenStatus(request.Username, "completed", JsonConvert.SerializeObject(result));
                    unfinishedGame = false;
                }
                else
                {
                    using (var pragmatic_helper = new PragmaticGameHelpers(Connection))
                        await pragmatic_helper.PragmaticBrokenStatus(request.Username, "waiting", JsonConvert.SerializeObject(result));
                    unfinishedGame = true;
                }
            }
            return OkResponse(new { Status = unfinishedGame, Response = result });
        }

        #endregion Pragmatic Broken Status
    }
}