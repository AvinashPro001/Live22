using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.api.Helpers.SexyBaccarat;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Game.SexyBaccarat;
using Webet333.models.Response;
using Webet333.models.Response.Game;
using Webet333.models.Response.Game.SexyBaccarat;
using System.Text.RegularExpressions;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class SexyBaccaratGameController : BaseController
    {

        #region Global variable and Constructor

        private static readonly HttpClient client = new HttpClient();

        private IHostingEnvironment _hostingEnvironment;

        public SexyBaccaratGameController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IHostingEnvironment environment, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
            _hostingEnvironment = environment;
        }

        #endregion Global variable and Constructor   

        #region Create Member

        [Authorize]
        [HttpPost(ActionsConst.SexyBaccaratConst.SexyBaccarartRegsiter)]
        public async Task<IActionResult> SexyBaccaratRegister([FromBody]GetByIdRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            string username, bettingLimits;
            using (var account_helper = new AccountHelpers(Connection))
            {
                var user = await account_helper.UserGetBalanceInfo(request.Id);
                username = user.SexyGamePrefix + user.Username;
                bettingLimits = account_helper.GlobalSelect("SexyLimit").Result.Value;
            }
            try
            {
                username = Regex.Replace(username, @"[^0-9a-zA-Z]+", "");
                if (username.Length > 20)
                {
                    username = username.Substring(0, 16);
                }

                var response = await SexyBaccaratGameHelpers.CallRegisterAPI(username, bettingLimits);

                if (!response.status.Equals("0000"))
                    return OkResponse(new { response });

                using (var sexybaccarat_helper = new SexyBaccaratGameHelpers(Connection))
                {
                    var result = await sexybaccarat_helper.SexyBaccaratRegister(username, response, request.Id);
                    return OkResponse(new { response, result });
                }
            }
            catch
            {
                string result = null;
                var response = new SexyBaccaratAPIResponse { status = "8585", desc = "maintenance" };
                return OkResponse(new { response, result });
            }
        }
        #endregion Create Member 

        #region Login Member

        [Authorize]
        [HttpPost(ActionsConst.SexyBaccaratConst.SexyBaccarartLogin)]
        public async Task<IActionResult> SexyBaccaratLogin([FromBody]SexybaccaratLoginRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

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
                username = user.SexyGamePrefix + user.Username;
            }

            try
            {
                var response = await SexyBaccaratGameHelpers.CallLoginAPI(username, request.IsMobile);

                return OkResponse(response);
            }
            catch
            {
                var response = new SexyBaccaratAPIResponse { status = "8585", desc = "maintenance" };
                return OkResponse(response);
            }
        }
        #endregion Create Member 

        #region Deposit Member

        [Authorize]
        [HttpPost(ActionsConst.SexyBaccaratConst.SexyBaccarartDeposit)]
        private async Task<IActionResult> SexyBaccaratDeposit([FromBody]SexybaccaratTransfer request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

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
                username = user.SexyGamePrefix + user.Username;
            }
            try
            {
                var response = await SexyBaccaratGameHelpers.CallDepositAPI(username, request.Amount);

                return OkResponse(response);
            }
            catch
            {
                var response = new SexyBaccaratAPIResponse { status = "8585", desc = "maintenance" };
                return OkResponse(response);
            }
        }
        #endregion Deposit Member

        #region Withdraw Member

        [Authorize]
        [HttpPost(ActionsConst.SexyBaccaratConst.SexyBaccarartWithdraw)]
        private async Task<IActionResult> SexyBaccaratWithdraw([FromBody]SexybaccaratTransfer request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

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
                username = user.SexyGamePrefix + user.Username;
            }
            try
            {
                var response = await SexyBaccaratGameHelpers.CallWithdrawAPI(username, request.Amount);
                return OkResponse(response);
            }
            catch
            {
                var response = new SexyBaccaratAPIResponse { status = "8585", desc = "maintenance" };
                return OkResponse(response);
            }
        }
        #endregion Deposit Member

        #region Set default Bet Limit

        [Authorize]
        [HttpPost(ActionsConst.SexyBaccaratConst.SexyBaccarartSetDefaultBetLimit)]
        public async Task<IActionResult> SexyBaccaratSetDefaultBetlimit([FromBody]SexyBaccaratBetLimitRequest request)
        {

            await CheckUserRole();
            SexyBaccaratBetlimitResponse bettingLimits;
            using (var account_helper = new AccountHelpers(Connection))
            {
                bettingLimits = JsonConvert.DeserializeObject<SexyBaccaratBetlimitResponse>(account_helper.GlobalSelect("SexyLimit").Result.Value);
            }

            if (request.delete)
            {
                bettingLimits.Sexybcrt.Live.LimitId.Remove(request.betLimit);
            }
            else
            {
                if (bettingLimits.Sexybcrt.Live.LimitId.Contains(request.betLimit))
                    return OkResponse();

                bettingLimits.Sexybcrt.Live.LimitId.Add(request.betLimit);
            }

            using (var game_helper = new SexyBaccaratGameHelpers(Connection))
            {
                var result = await game_helper.SexyBaccaratSetBetLimit(bettingLimits.Sexybcrt.Live.LimitId);
                return OkResponse();
            }
        }

        #endregion Set Bet Limit

        #region Set Bet Limit

        [HttpGet(ActionsConst.SexyBaccaratConst.SexyBaccarartSetBetLimit)]
        public async Task<IActionResult> SexyBaccaratSetBetlimit()
        {
            string bettingLimits;
            using (var account_helper = new AccountHelpers(Connection))
            {
                bettingLimits = account_helper.GlobalSelect("SexyLimit").Result.Value;
            }

            List<AllGameUsernameResponse> Users = new List<AllGameUsernameResponse>();

            using (var game_helper = new GameHelpers(Connection))
            {
                Users = await game_helper.GetAllGameUser("Sexy");
            }

            var response = new List<SexyBaccaratAPIResponse>();
            if (Users.Count > 0)
            {
                foreach (var user in Users)
                {
                    var result = await SexyBaccaratGameHelpers.CallBettingLimitAPI(user.Username, bettingLimits);
                    if (result.status.Equals("0000"))
                        response.Add(result);
                }
            }

            return OkResponse(response);
        }

        #endregion Set Bet Limit
    }
}