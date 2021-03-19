using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.logs;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request.TransferMoney;
using Webet333.models.Response.TransferMoney;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class TransferMoneyController : BaseController
    {
        #region Global variable and Constructor

        protected ApiLogsManager LogManager { get; set; }

        private IHostingEnvironment _hostingEnvironment;

        public TransferMoneyController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IHostingEnvironment environment, IOptions<BaseUrlConfigs> BaseUrlConfigsOption, ApiLogsManager LogManager) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.LogManager = LogManager;
            this.Localizer = Localizer;
            _hostingEnvironment = environment;
        }

        #endregion Global variable and Constructor

        [Authorize]
        [HttpPost(ActionsConst.TransferMoney.TransferBalance)]
        public async Task<IActionResult> BalanceTransfer([FromBody] TransferMoneyRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            var Role = GetUserRole(User);
            if (Role == RoleConst.Users)
                request.UserId = GetUserId(User).ToString();
            else
            if (String.IsNullOrEmpty(request.UserId))
                return BadResponse("error_invalid_modelstate");

            var responseId = await ApiLogsManager.APITransactionLogsInsert(new ApiLogTransactionRequest { Amount = request.Amount.ToString(), UserId = request.UserId, WalletId = request.ToWalletId, Request = JsonConvert.SerializeObject(request) });
            var Id = responseId.ID.ToString();
            UserDetailsTransferResponse userDetails;
            using (var transfer_helper = new TransferMoneyHelpers(Connection))
            {
                userDetails = await transfer_helper.UserDetails(request.UserId.ToString(), request.FromWalletId.ToString(), request.ToWalletId.ToString());
            }

            if (userDetails.FromWalletIsMaintenance == true)
            {
                ApiLogsManager.APITransactionLogsInsert(new ApiLogTransactionRequest { Id = Id, Response = Localizer["error_game_maintenance"].Value });
                return BadResponse("error_game_maintenance");
            }

            if (userDetails.ToWalletIsMaintenance == true)
            {
                ApiLogsManager.APITransactionLogsInsert(new ApiLogTransactionRequest { Id = Id, Response = Localizer["error_game_maintenance"].Value });
                return BadResponse("error_game_maintenance");
            }

            if (userDetails.FromWalletName == "Main Wallet")
                if (userDetails.MainWalletBalance < request.Amount)
                {
                    ApiLogsManager.APITransactionLogsInsert(new ApiLogTransactionRequest { Id = Id, Response = Localizer["error_insufficient_balance"].Value });
                    return BadResponse("error_insufficient_balance");
                }

            using (var transferMoney_helper = new TransferMoneyHelpers(Connection, Localizer))
            {
                transferMoney_helper.UserBalanceIsBeginUpdate(request.UserId, true);
                //Withdraw From Wallet
                var WithdrawResponse = await transferMoney_helper.WithdrawFromWallet(userDetails, userDetails.FromWalletName, request.Amount, request.UserId.ToString(), _hostingEnvironment);
                if (string.IsNullOrEmpty(WithdrawResponse.ErrorMessage) && string.IsNullOrEmpty(WithdrawResponse.GameName) && string.IsNullOrEmpty(WithdrawResponse.GameResponse))
                {
                    // Deposit From Wallet
                    var DepositResponse = await transferMoney_helper.DepositInWallet(userDetails, userDetails.ToWalletName, request.Amount, request.UserId.ToString(), _hostingEnvironment);
                    if (string.IsNullOrEmpty(DepositResponse.ErrorMessage) && string.IsNullOrEmpty(DepositResponse.GameName) && string.IsNullOrEmpty(DepositResponse.GameResponse))
                    {
                        if (Role == RoleConst.Users)
                            await transferMoney_helper.Transfer(request.UserId.ToString(), request.FromWalletId.ToString(), request.ToWalletId.ToString(), request.Amount, request.UserId.ToString(), StatusConsts.Approved, request.UserId.ToString());
                        else
                            await transferMoney_helper.Transfer(request.UserId.ToString(), request.FromWalletId.ToString(), request.ToWalletId.ToString(), request.Amount, GetUserId(User).ToString(), StatusConsts.Approved, GetUserId(User).ToString());

                        ApiLogsManager.APITransactionLogsInsert(new ApiLogTransactionRequest { Id = Id, Response = Localizer["ok_response_success"].Value, FromWalletResponse = JsonConvert.SerializeObject(WithdrawResponse), ToWalletResponse = JsonConvert.SerializeObject(DepositResponse) });
                    }
                    else
                    {
                        var DepositFailedResponse = await transferMoney_helper.DepositInWallet(userDetails, userDetails.FromWalletName, request.Amount, request.UserId.ToString(), _hostingEnvironment);
                        if (string.IsNullOrEmpty(DepositFailedResponse.ErrorMessage) && string.IsNullOrEmpty(DepositFailedResponse.GameName) && string.IsNullOrEmpty(DepositFailedResponse.GameResponse))
                        {
                        }
                        else
                        {
                            //Deposit In Main Wallet and Insert into DB Row
                            await transferMoney_helper.DepositInWallet(userDetails, "Main Wallet", request.Amount, request.UserId.ToString(), _hostingEnvironment);
                            transferMoney_helper.UserBalanceIsBeginUpdate(request.UserId, false);

                            ApiLogsManager.APITransactionLogsInsert(new ApiLogTransactionRequest { Id = Id, Response = "Completed Transaction Is Failed So We Add Money in Main Wallet", FromWalletResponse = JsonConvert.SerializeObject(WithdrawResponse), ToWalletResponse = JsonConvert.SerializeObject(DepositResponse) });

                            return BadResponse("Completed Transaction Is Failed So We Add Money in Main Wallet");
                        }
                        transferMoney_helper.UserBalanceIsBeginUpdate(request.UserId, false);

                        ApiLogsManager.APITransactionLogsInsert(new ApiLogTransactionRequest { Id = Id, Response = DepositResponse.GameName + " Deposit Api Failed \n" + DepositResponse.ErrorMessage, FromWalletResponse = JsonConvert.SerializeObject(WithdrawResponse), ToWalletResponse = JsonConvert.SerializeObject(DepositResponse) });

                        return BadResponse(DepositResponse.GameName + " Deposit Api Failed \n" + DepositResponse.ErrorMessage);
                    }
                }
                else
                {
                    transferMoney_helper.UserBalanceIsBeginUpdate(request.UserId, false);

                    ApiLogsManager.APITransactionLogsInsert(new ApiLogTransactionRequest { Id = Id, Response = WithdrawResponse.GameName + " Withdraw Api Failed \n" + WithdrawResponse.ErrorMessage, FromWalletResponse = JsonConvert.SerializeObject(WithdrawResponse) });

                    return BadResponse(WithdrawResponse.GameName + " Withdraw Api Failed \n " + WithdrawResponse.ErrorMessage);
                }
                transferMoney_helper.UserBalanceIsBeginUpdate(request.UserId, false);

                return OkResponse();
            }
        }
    }
}