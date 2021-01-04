using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Helpers;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.PaymentGateway;

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

        #region Payment Gateway URL Register

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
                await paymentgateway_helpers.PaymentTokenSave(userId, uniqueId, Role, response.token, response.status, response.transaction, JsonConvert.SerializeObject(response),response.amount,request.PromotionApplyEligible,request.PromotionId);

                response.redirect_to = response.redirect_to.Split("=", 2)[1];

                return OkResponse(response);
            }
        }

        #endregion

        #region Payment Verifiy API

        [Consumes("application/x-www-form-urlencoded")]
        [HttpPost(ActionsConst.PaymentGateway.PaymentVerified)]
        public async Task<IActionResult> VerifiedTransactions([FromForm] PaymentGatewayVerifiedRequest request )
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            using (var helper = new PaymentGatewayHelpers(Connection))
            {
                await helper.PaymentVerified(request);
                return OkResponse();
            }
        }

        #endregion
    }
}
