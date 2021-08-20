using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Game;
using Webet333.models.Response.Game;
using GamePlayConst = Webet333.models.Constants.GameConst.GamePlay;

namespace Webet333.api.Controllers
{
    [Authorize]
    [Route(ActionsConst.ApiVersion)]
    public class GamePlayController : BaseController
    {
        #region Global Variable

        public GamePlayController(
            IStringLocalizer<BaseController> Localizer,
            IOptions<ConnectionConfigs> ConnectionStringsOptions,
            IOptions<BaseUrlConfigs> BaseUrlConfigsOption) :
            base(
                ConnectionStringsOptions.Value,
                Localizer,
                BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
        }

        #endregion Global Variable

        #region Register

        [HttpPost(ActionsConst.GamePlay.Register)]
        public async Task<IActionResult> Register([FromBody] GetByIdRequest request)
        {
            if (request == null) return BadResponse(ErrorConsts.EmptyRequest);
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);

            if (Role == RoleConst.Users) request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            string username, password;

            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.GamePlayGamePrefix + user.UserId;
                password = SecurityHelpers.DecryptPassword(user.Password);

                password = Regex.Replace(password, @"[^0-9a-zA-Z]+", "");
                if (password.Length < 6) password = $"{user.GamePlayGamePrefix}{password}";
                else if (password.Length > 12) password = password.Substring(0, 11);
            }

            using (var GamePlay_Helpers = new GamePlayGameHelpers(Connection))
            {
                var result = await GamePlay_Helpers.CallRegisterPlayerAPI(username, password);

                if (result.Status != 0) return BadResponse(result.ErrorDesc);

                await GamePlay_Helpers.GamePlayRegister(request.Id, username, password, JsonConvert.SerializeObject(result));

                return OkResponse(result);
            }
        }

        #endregion Register

        #region Update Password

        [HttpPost(ActionsConst.GamePlay.UpdatePassword)]
        public async Task<IActionResult> UpdatePassword([FromBody] GetByIdRequest request)
        {
            if (request == null) return BadResponse(ErrorConsts.EmptyRequest);
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);

            if (Role == RoleConst.Users) request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            string username, password;

            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.GamePlayGamePrefix + user.UserId;
                password = SecurityHelpers.DecryptPassword(user.Password);
            }

            using (var GamePlay_Helpers = new GamePlayGameHelpers(Connection))
            {
                password = $"WB4@{password}";
                if (password.Length > 12) password = password.Substring(0, 12);

                var result = await GamePlay_Helpers.CallUpdatePasswordAPI(username, password);

                if (result.Status != 0) return BadResponse(result.ErrorDesc);

                await GamePlay_Helpers.GamePlayUpdatePassword(request.Id, password);

                return OkResponse(new { password });
            }
        }

        #endregion Update Password

        #region Login

        [HttpPost(ActionsConst.GamePlay.Login)]
        public async Task<IActionResult> LoginAsync([FromBody] GamePlayGameLoginRequest request)
        {
            if (request == null) return BadResponse(ErrorConsts.EmptyRequest);
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);

            if (Role == RoleConst.Users) request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin) if (string.IsNullOrEmpty(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            string username;

            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.GetUsernameInfo(request.Id);
                username = user.GamePlayUsername;
            }

            string language = Language.Code == LanguageConst.Chinese ? GamePlayConst.LanguageCode.TraditionalChinese : Language.Code == LanguageConst.Malay ? GamePlayConst.LanguageCode.Malay : GamePlayConst.LanguageCode.English;

            string platform = request.IsMobile == true ? "html5" : "html5-desktop";

            if (string.IsNullOrWhiteSpace(request.GameCode)) request.GameCode = GamePlayConst.GameCode;

            var result = await GamePlayGameHelpers.CallLaunchGameAPI(username, language, platform, request.GameCode);

            if (result.Status != 0) return BadResponse(result.ErrorDesc);

            return OkResponse(result);
        }

        #endregion Login

        #region Get Slot Game List API

        [HttpGet(ActionsConst.GamePlay.GetSlotGameList)]
        public async Task<IActionResult> GetSlotGameList()
        {
            await CheckUserRole();

            string adminId = GetUserId(User).ToString();

            string language = Language.Code == LanguageConst.Chinese ? GamePlayConst.LanguageCode.TraditionalChinese : Language.Code == LanguageConst.Malay ? GamePlayConst.LanguageCode.Malay : GamePlayConst.LanguageCode.English;

            var result = await GamePlayGameHelpers.CallGetGameListAPI(language, GamePlayConst.GameType.Slot);

            if (result.Status != 0) return BadResponse(result.ErrorDesc);

            var gameListModel = new List<GameListUploadResponse>();
            result.Games.ForEach(game =>
            {
                gameListModel.Add(new GameListUploadResponse
                {
                    GameCode = game.TcgGameCode,
                    GameName = game.GameName,
                    GameType = "Slots",
                    ImagePath1 = game.ImageURL,
                    ImagePath2 = ""
                });
            });

            using (var Game_Helpers = new GameHelpers(Connection))
            {
                await Game_Helpers.GameListDeleted(WalletConst.WalletName.GamePlay);
                await Game_Helpers.GameListInsert(gameListModel, WalletConst.WalletName.GamePlay, adminId);
            }

            return OkResponse(result);
        }

        #endregion Get Slot Game List API

        #region Get Fish Game List API

        [HttpGet(ActionsConst.GamePlay.GetFishGameList)]
        public async Task<IActionResult> GetFishGameList()
        {
            string language = Language.Code == LanguageConst.Chinese ? GamePlayConst.LanguageCode.TraditionalChinese : Language.Code == LanguageConst.Malay ? GamePlayConst.LanguageCode.Malay : GamePlayConst.LanguageCode.English;

            var result = await GamePlayGameHelpers.CallGetGameListAPI(language, GamePlayConst.GameType.Fish);

            if (result.Status != 0) return BadResponse(result.ErrorDesc);

            return OkResponse(result);
        }

        #endregion Get Fish Game List API
    }
}