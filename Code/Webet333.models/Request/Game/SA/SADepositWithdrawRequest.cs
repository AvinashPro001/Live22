using Newtonsoft.Json;

namespace Webet333.models.Request.Game.SA
{
    public class SADepositWithdrawRequest : GetByIdRequest
    {
        [JsonProperty(PropertyName = "amount")]
        public decimal Amount { get; set; }
    }
}