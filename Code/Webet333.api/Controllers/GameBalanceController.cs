using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request.GameBalance;
using Webet333.models.Response.Account;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class GameBalanceController : BaseController
    {
        #region Global variable and Constructor

        private static readonly HttpClient client = new HttpClient();

        private IHostingEnvironment _hostingEnvironment;

        static GetBalanceUserResponse UserDetails { get; set; }

        public GameBalanceController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IHostingEnvironment environment, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
            _hostingEnvironment = environment;
        }

        #endregion Global variable and Constructor

        #region 918 Kiss game balance

        [Authorize]
        [HttpPost(ActionsConst.GameBalance.Kiss918Balance)]
        public async Task<IActionResult> Kiss918Balance([FromBody] UserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            dynamic previousBalance = 0.00;

            if (request.Username != null)
            {
                using (var gamehelper = new GameBalanceHelpers(Connection))
                {
                    string Kiss918Balance = await gamehelper.Call918KissGameBalance(request.Username);
                    previousBalance = await gamehelper.Kiss918BalanceUpdate(request.Id, Kiss918Balance);

                    return OkResponse(new { balance = Kiss918Balance, previousBalance.PreviousBalance });
                }
            }
            string response = null;
            return OkResponse(new { balance = response, previousBalance });
        }

        #endregion 918 Kiss game balance

        #region Mega888 game balance

        [Authorize]
        [HttpPost(ActionsConst.GameBalance.Mega888Balance)]
        public async Task<IActionResult> Mega888Balance([FromBody] UserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (GetUserRole(User) == RoleConst.Users)
                request.Id = GetUserId(User).ToString();
            else
                if (String.IsNullOrEmpty(request.Id))
                return BadResponse("error_invalid_modelstate");

            dynamic previousBalance = 0.00;

            if (request.Username != null)
            {
                using (var gamehelper = new GameBalanceHelpers(Connection))
                {
                    string Mega888Balance = await gamehelper.CallMegaGameBalance(request.Username);

                    previousBalance = await gamehelper.Mega888BalanceUpdate(request.Id, Mega888Balance);

                    return OkResponse(new { balance = Mega888Balance, previousBalance.PreviousBalance });
                }
            }
            string response = null;
            return OkResponse(new { balance = response, previousBalance });
        }

        #endregion Mega888 game balance

        #region Joker game balance

        [Authorize]
        [HttpPost(ActionsConst.GameBalance.JokerBalance)]
        public async Task<IActionResult> JokerBalance([FromBody] UserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (GetUserRole(User) == RoleConst.Users)
                request.Id = GetUserId(User).ToString();
            else
                if (String.IsNullOrEmpty(request.Id))
                return BadResponse("error_invalid_modelstate");

            dynamic previousBalance = 0.00;

            if (request.Username != null)
            {
                using (var gamehelper = new GameBalanceHelpers(Connection))
                {
                    dynamic JokerBalance = await gamehelper.CallJokerGameBalance(request.Username);

                    previousBalance = await gamehelper.JokerBalanceUpdate(request.Id, JokerBalance.JokerBalance, JokerBalance.status);

                    return OkResponse(new { balance = JokerBalance.JokerBalance, previousBalance.PreviousBalance });
                }
            }
            string response = null;
            return OkResponse(new { balance = response, previousBalance });
        }

        #endregion Joker game balance

        #region MaxBet game balance

        [Authorize]
        [HttpPost(ActionsConst.GameBalance.MaxBetBalance)]
        public async Task<IActionResult> MaxBetBalance([FromBody] UserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (GetUserRole(User) == RoleConst.Users)
                request.Id = GetUserId(User).ToString();
            else
                if (String.IsNullOrEmpty(request.Id))
                return BadResponse("error_invalid_modelstate");

            dynamic previousBalance = 0.00;

            if (request.Username != null)
            {
                using (var gamehelper = new GameBalanceHelpers(Connection))
                {
                    string MaxbetBalance = await gamehelper.CallMaxbetGameBalance(request.Username);
                    previousBalance = await gamehelper.MaxBetBalanceUpdate(request.Id, MaxbetBalance);
                    return OkResponse(new { balance = MaxbetBalance, previousBalance.PreviousBalance });
                }
            }
            string response = null;
            return OkResponse(new { balance = response, previousBalance });
        }

        #endregion MaxBet game balance

        #region M8 game balance

        [Authorize]
        [HttpPost(ActionsConst.GameBalance.M8Balance)]
        public async Task<IActionResult> M8Balance([FromBody] UserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (GetUserRole(User) == RoleConst.Users)
                request.Id = GetUserId(User).ToString();
            else
                if (String.IsNullOrEmpty(request.Id))
                return BadResponse("error_invalid_modelstate");

            dynamic previousBalance = 0.00;

            if (request.Username == null)
            {
                string response = null;
                return OkResponse(new { balance = response, previousBalance });
            }

            using (var gamehelper = new GameBalanceHelpers(Connection))
            {
                string M8Balance = await gamehelper.CallM8GameBalance(request.Username);
                previousBalance = await gamehelper.M8BalanceUpdate(request.Id, M8Balance);
                return OkResponse(new { balance = M8Balance, previousBalance.PreviousBalance });
            }
        }

        #endregion M8 game balance

        #region AG game balance

        [Authorize]
        [HttpPost(ActionsConst.GameBalance.AgBalance)]
        public async Task<IActionResult> AgBalance([FromBody] UserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (GetUserRole(User) == RoleConst.Users)
                request.Id = GetUserId(User).ToString();
            else
                if (String.IsNullOrEmpty(request.Id))
                return BadResponse("error_invalid_modelstate");

            dynamic previousBalance = 0.00;

            if (request.Username == null)
            {
                string response = null;
                return OkResponse(new { balance = response, previousBalance });
            }

            using (var gamehelper = new GameBalanceHelpers(Connection))
            {
                string AGBalance = await gamehelper.CallAGGameBalance(request.Username);
                previousBalance = await gamehelper.AGBalanceUpdate(request.Id, AGBalance);
                return OkResponse(new { balance = AGBalance, previousBalance.PreviousBalance });
            }
        }

        #endregion AG game balance

        #region Playtech game balance

        [Authorize]
        [HttpPost(ActionsConst.GameBalance.PlaytechBalance)]
        public async Task<IActionResult> PlaytechBalance([FromBody] UserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (GetUserRole(User) == RoleConst.Users)
                request.Id = GetUserId(User).ToString();
            else
                if (String.IsNullOrEmpty(request.Id))
                return BadResponse("error_invalid_modelstate");

            dynamic previousBalance = 0.00;

            if (request.Username == null)
            {
                string response = null;
                return OkResponse(new { balance = response, previousBalance });
            }

            using (var gamehelper = new GameBalanceHelpers(Connection))
            {
                string PlaytechBalance = await gamehelper.CallPlaytechGameBalance(request.Username, _hostingEnvironment);

                previousBalance = await gamehelper.PlaytechBalanceUpdate(request.Id, PlaytechBalance);

                return OkResponse(new { balance = PlaytechBalance, previousBalance.PreviousBalance });
            }
        }

        #endregion Playtech game balance

        #region DG game balance

        [Authorize]
        [HttpPost(ActionsConst.GameBalance.DGBalance)]
        public async Task<IActionResult> DGBalance([FromBody] UserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (GetUserRole(User) == RoleConst.Users)
                request.Id = GetUserId(User).ToString();
            else
                if (String.IsNullOrEmpty(request.Id))
                return BadResponse("error_invalid_modelstate");

            dynamic previousBalance = 0.00;

            if (request.Username == null)
            {
                string response = null;
                return OkResponse(new { balance = response, previousBalance });
            }

            using (var gamehelper = new GameBalanceHelpers(Connection))
            {
                var result = await gamehelper.CallDGGameBalance(request.Username);
                previousBalance = await gamehelper.DGBalanceUpdate(request.Id, result);
                return OkResponse(new { balance = result, previousBalance.PreviousBalance });
            }
        }

        #endregion DG game balance

        #region Sexy Baccarat Balance

        [Authorize]
        [HttpPost(ActionsConst.GameBalance.SexyBaccaratBalance)]
        public async Task<IActionResult> SexyBaccaratBalance([FromBody] UserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (GetUserRole(User) == RoleConst.Users)
                request.Id = GetUserId(User).ToString();
            else
                if (String.IsNullOrEmpty(request.Id))
                return BadResponse("error_invalid_modelstate");

            dynamic previousBalance = 0.00;

            if (request.Username == null)
            {
                string response = null;
                return OkResponse(new { balance = response, previousBalance });
            }

            using (var gamehelper = new GameBalanceHelpers(Connection))
            {
                string balance = await gamehelper.CallSexyGameBalance(request.Username);
                previousBalance = await gamehelper.SexyBalanceUpdate(request.Id, balance);
                return OkResponse(new { balance, previousBalance.PreviousBalance });
            }
        }

        #endregion Sexy Baccarat Balance

        #region SA Balance

        [Authorize]
        [HttpPost(ActionsConst.GameBalance.SABalance)]
        public async Task<IActionResult> SABalance([FromBody] UserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (GetUserRole(User) == RoleConst.Users)
                request.Id = GetUserId(User).ToString();
            else
                if (String.IsNullOrEmpty(request.Id))
                return BadResponse("error_invalid_modelstate");

            dynamic previousBalance = 0.00;

            if (request.Username == null)
            {
                string response = null;
                return OkResponse(new { balance = response, previousBalance });
            }

            using (var gamehelper = new GameBalanceHelpers(Connection))
            {
                string balance = await gamehelper.CallSAGameBalance(request.Username);
                previousBalance = await gamehelper.SABalanceUpdate(request.Id, balance);
                return OkResponse(new { balance, previousBalance.PreviousBalance });
            }
        }

        #endregion SA Balance

        #region Pussy888 balance

        [Authorize]
        [HttpPost(ActionsConst.GameBalance.Pussy888Balance)]
        public async Task<IActionResult> Pussy888Balance([FromBody] UserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (GetUserRole(User) == RoleConst.Users)
                request.Id = GetUserId(User).ToString();
            else
                if (String.IsNullOrEmpty(request.Id))
                return BadResponse("error_invalid_modelstate");

            dynamic previousBalance = 0.00;

            if (request.Username == null)
            {
                string response = null;
                return OkResponse(new { balance = response, previousBalance });
            }

            using (var gamehelper = new GameBalanceHelpers(Connection))
            {
                string Pussy888Balance = await gamehelper.CallPussy888GameBalance(request.Username);
                previousBalance = await gamehelper.Pussy888BalanceUpdate(request.Id, Pussy888Balance);
                return OkResponse(new { balance = Pussy888Balance, previousBalance.PreviousBalance });
            }
        }

        #endregion Pussy888 balance

        #region AllBet balance

        [Authorize]
        [HttpPost(ActionsConst.GameBalance.AllBetBalance)]
        public async Task<IActionResult> AllBetBalance([FromBody] AllBetGameUserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (GetUserRole(User) == RoleConst.Users)
                request.Id = GetUserId(User).ToString();
            else
            {
                if (String.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");
                request.Password = SecurityHelpers.DecryptPassword(request.Password);
            }

            dynamic previousBalance = 0.00;

            if (request.Username == null || request.Password == null)
            {
                string response = null;
                return OkResponse(new { balance = response, previousBalance });
            }

            using (var gamehelper = new GameBalanceHelpers(Connection))
            {
                string AllBetBalance = await gamehelper.CallAllBetGameBalance(request.Username, request.Password);
                previousBalance = await gamehelper.AllBetBalanceUpdate(request.Id, AllBetBalance);
                return OkResponse(new { balance = AllBetBalance, previousBalance.PreviousBalance });
            }
        }

        #endregion AllBet balance

        #region WM balance

        [Authorize]
        [HttpPost(ActionsConst.GameBalance.WMBalance)]
        public async Task<IActionResult> WMBalance([FromBody] UserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (GetUserRole(User) == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (String.IsNullOrEmpty(request.Id))
                return BadResponse("error_invalid_modelstate");

            dynamic previousBalance = 0.00;

            using (var gamehelper = new GameBalanceHelpers(Connection))
            {
                string WMBalance = await gamehelper.CallWMGameBalance(request.Username);
                previousBalance = await gamehelper.WMBalanceUpdate(request.Id, WMBalance);
                return OkResponse(new { balance = WMBalance, previousBalance.PreviousBalance });
            }
        }

        #endregion WM balance

        #region Pragmatic balance

        [Authorize]
        [HttpPost(ActionsConst.GameBalance.PragmaticBalance)]
        public async Task<IActionResult> PragmaticBalance([FromBody] UserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (GetUserRole(User) == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (String.IsNullOrEmpty(request.Id))
                return BadResponse("error_invalid_modelstate");

            dynamic previousBalance = 0.00;

            using (var gamehelper = new GameBalanceHelpers(Connection))
            {
                string PragmaticBalance = await gamehelper.CallPragmaticGameBalance(request.Username);
                previousBalance = await gamehelper.PragmaticBalanceUpdate(request.Id, PragmaticBalance);
                return OkResponse(new { balance = PragmaticBalance, previousBalance.PreviousBalance });
            }
        }

        #endregion Pragmatic balance

        #region Check Sports game balance for pending bets or running games

        #region Check MaxBet game balance

        [HttpPost(ActionsConst.GameBalance.CheckMaxBetBalance)]
        public async Task<IActionResult> CheckMaxBetBalance([FromBody] UserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (String.IsNullOrEmpty(request.Id))
                return BadResponse("error_invalid_modelstate");

            dynamic previousBalance = 0.00;

            if (request.Username != null)
            {
                using (var gamehelper = new GameBalanceHelpers(Connection))
                {
                    string MaxbetBalance = await gamehelper.CallMaxbetGameBalance(request.Username);
                    previousBalance = await gamehelper.MaxBetBalanceUpdate(request.Id, MaxbetBalance);
                    return OkResponse(new { balance = MaxbetBalance, previousBalance.PreviousBalance });
                }
            }
            string response = null;
            return OkResponse(new { balance = response, previousBalance });
        }

        #endregion Check MaxBet game balance

        #region Check M8 game balance

        [HttpPost(ActionsConst.GameBalance.CheckM8Balance)]
        public async Task<IActionResult> CheckM8Balance([FromBody] UserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (String.IsNullOrEmpty(request.Id))
                return BadResponse("error_invalid_modelstate");

            dynamic previousBalance = 0.00;

            if (request.Username == null)
            {
                string response = null;
                return OkResponse(new { balance = response, previousBalance });
            }

            using (var gamehelper = new GameBalanceHelpers(Connection))
            {
                string M8Balance = await gamehelper.CallM8GameBalance(request.Username);
                previousBalance = await gamehelper.M8BalanceUpdate(request.Id, M8Balance);
                return OkResponse(new { balance = M8Balance, previousBalance.PreviousBalance });
            }
        }

        #endregion Check M8 game balance

        #endregion Check Sports game balance for pending bets or running games

        #region YEEBET Balance

        [Authorize]
        [HttpPost(ActionsConst.GameBalance.YEEBETBalance)]
        public async Task<IActionResult> YEEBETBalance([FromBody] UserBalanceRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (GetUserRole(User) == RoleConst.Users) request.Id = GetUserId(User).ToString();

            if (String.IsNullOrEmpty(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            dynamic previousBalance = 0.00;

            using (var gamehelper = new GameBalanceHelpers(Connection))
            {
                string YEEBETBalance = await gamehelper.CallYEEBETGameBalance(request.Username);
                previousBalance = await gamehelper.YEEBETBalanceUpdate(request.Id, YEEBETBalance);

                return OkResponse(new
                {
                    balance = YEEBETBalance,
                    previousBalance.PreviousBalance
                });
            }
        }

        #endregion YEEBET Balance

        #region SBO Balance

        [Authorize]
        [HttpPost(ActionsConst.GameBalance.SBOBalance)]
        public async Task<IActionResult> SBOBalance([FromBody] UserBalanceRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (GetUserRole(User) == RoleConst.Users) request.Id = GetUserId(User).ToString();

            if (string.IsNullOrWhiteSpace(request.Id)) return BadResponse(ErrorConsts.InvalidModelstate);

            dynamic previousBalance = 0.00;

            using (var gamehelper = new GameBalanceHelpers(Connection))
            {
                string balance = await gamehelper.CallSBOGameBalance(request.Username);
                previousBalance = await gamehelper.SBOBalanceUpdate(request.Id, balance);

                return OkResponse(new
                {
                    balance = balance,
                    previousBalance.PreviousBalance
                });
            }
        }

        #endregion SBO Balance
    }
}