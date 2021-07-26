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
using Webet333.models.Request.PaymentGateway;
using Webet333.models.Response.PaymentGateway;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class PaymentGatewayController : BaseController
    {
        #region Variable

        public PaymentGatewayController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
        }

        #endregion Variable

        #region Payment Gateway URL

        [Authorize]
        [HttpPost(ActionsConst.PaymentGateway.GetPaymentGatewayURL)]
        public async Task<IActionResult> GetUrl([FromBody] GetUrlRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);
            var Name = GetUserName(User);
            var uniqueId = GetUniqueId(User);
            var userId = GetUserId(User).ToString();

            if (string.IsNullOrWhiteSpace(request.PromotionId))
                request.PromotionId = null;

            var response = await PaymentGatewayHelpers.CallPaymentgetURL(Name, request.Amount);
            using (var paymentgateway_helpers = new PaymentGatewayHelpers(Connection))
            {
                await paymentgateway_helpers.PaymentTokenSave(userId, uniqueId, Role, response.token, response.status, response.transaction, JsonConvert.SerializeObject(response), response.amount, request.PromotionApplyEligible, request.PromotionId);

                response.redirect_to = response.redirect_to == null ? null : response.redirect_to.Split("=", 2)[1];

                return OkResponse(response);
            }
        }

        #endregion Payment Gateway URL

        #region Payment Auto Verifiy API

        [HttpPost(ActionsConst.PaymentGateway.PaymentAutoVerified)]
        public async Task<IActionResult> AutoVerfiedTransaction([FromBody] CheckStatusRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var result = new List<GetTokenResponse>();
            var responseList = new List<PaymentGatewayVerifiedRequest>();
            using (var paymentgateway_helpers = new PaymentGatewayHelpers(Connection))
            {
                result = await paymentgateway_helpers.GetPendingTokenList();

                foreach (var token in result)
                {
                    var response = await PaymentGatewayHelpers.CheckStatus(token.Token);
                    var updateResponse = new PaymentGatewayVerifiedRequest()
                    {
                        transaction = response.Transaction,
                        status = response.StatusDescription == "processing" ? "0" : response.Status.ToString(),
                        status_message = response.StatusDescription,
                        decline_reason = response.BankReference,
                        src_bank_account = response.SrcBankAccount,
                        created_at = response.CreatedAt,
                        apikey = "TransactionCheckStatusOfVaderPayCustomerService2"
                    };
                    responseList.Add(updateResponse);
                    await paymentgateway_helpers.PaymentVerified(updateResponse);
                }
            }
            return OkResponse(responseList);
        }

        #endregion Payment Auto Verifiy API

        #region Payment Verifiy API

        [Consumes("application/x-www-form-urlencoded")]
        [HttpPost(ActionsConst.PaymentGateway.PaymentVerified)]
        public async Task<IActionResult> VerifiedTransactions([FromForm] PaymentGatewayVerifiedRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            using (var helper = new PaymentGatewayHelpers(Connection))
            {
                await helper.PaymentVerified(request);
                return OkResponse();
            }
        }

        #endregion Payment Verifiy API
    }
}