using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Game.DG;
using Webet333.models.Response;
using Webet333.models.Response.Game.DG;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class DGGameController : BaseController
    {
        #region Local variable and Constructor

        private static readonly HttpClient client = new HttpClient();

        public DGGameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
        }

        #endregion Local variable and Constructor

        #region DG game Register

        [Authorize]
        [HttpPost(ActionsConst.DGGame.DGRegister)]
        public async Task<IActionResult> DGRegister([FromBody]GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string username, password, bettingLimits;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.DGGamePrefix + user.Username;
                password = SecurityHelpers.MD5EncrptText(SecurityHelpers.DecryptPassword(user.Password));
                bettingLimits = account_helper.GlobalSelect("DGLimit").Result.Value;
            }
            var result = await DGGameHelpers.CallRegisterAPI(username, password, bettingLimits);
            using (var dg_helper = new DGGameHelpers(Connection))
            {
                if (result.codeId != 0) return BadResponse(JsonConvert.SerializeObject(result));
                await dg_helper.DGRegister(request.Id, username, JsonConvert.SerializeObject(result));
                return OkResponse(result);
            }
        }

        #endregion DG game Register

        #region DG game Login

        [Authorize]
        [HttpPost(ActionsConst.DGGame.DGLogin)]
        public async Task<IActionResult> DGLogin([FromBody]GetByIdRequest request)
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
                username = user.DGGamePrefix + user.Username;
                password = SecurityHelpers.MD5EncrptText(SecurityHelpers.DecryptPassword(user.Password));
            }

            var result = await DGGameHelpers.CallLoginAPI(username, password, Language.Code);

            if (result.codeId != 0) return BadResponse(JsonConvert.SerializeObject(result));

            return OkResponse(result);
        }

        #endregion DG game Login

        #region DG game Transfer

        [Authorize]
        [HttpPost(ActionsConst.DGGame.DGTransfer)]
        private async Task<IActionResult> DGTransfer([FromBody]DgTransferRequest request)
        {

            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            if (request.Method == "Withdraw")
                request.Amount = "-" + request.Amount;

            string username;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.DGGamePrefix + user.Username;
            }

            var result = await DGGameHelpers.CallWithdrawDepsoitAPI(username, request.Amount);
            return OkResponse(result);
        }

        #endregion DG game Transfer

        #region Set default Bet Limit

        [Authorize]
        [HttpPost(ActionsConst.DGGame.DGdefaultBetlimit)]
        public async Task<IActionResult> DGSetDefaultBetlimit([FromBody]DGBettingLimitRequest request)
        {
            await CheckUserRole();

            string adminId = GetUserId(User).ToString();

            using (var game_helper = new DGGameHelpers(Connection))
            {
                var result = await game_helper.DGBetLimit(request.BettingLimit, adminId);
                return OkResponse(result);
            }
        }

        #endregion Set Bet Limit

        #region Set Bet Limit

        [HttpGet(ActionsConst.DGGame.DGBetlimit)]
        public async Task<IActionResult> DGSetBetlimit()
        {
            string bettingLimits;
            using (var account_helper = new AccountHelpers(Connection))
            {
                bettingLimits = account_helper.GlobalSelect("DGLimit").Result.Value;
            }

            List<AllGameUsernameResponse> Users = new List<AllGameUsernameResponse>();

            using (var game_helper = new GameHelpers(Connection))
            {
                Users = await game_helper.GetAllGameUser("DG");
            }

            var response = new List<DgApiResponse>();
            if (Users.Count > 0)
            {
                foreach (var user in Users)
                {
                    var result = await DGGameHelpers.CallUpdateBetLimitAPI(user.Username, bettingLimits);
                    if (result.codeId == 0)
                        response.Add(result);
                }
            }

            return OkResponse(response);
        }

        #endregion Set Bet Limit
    }
}