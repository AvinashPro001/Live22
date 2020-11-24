using Newtonsoft.Json;

namespace Webet333.models.Request.Promotions
{
    public class PromotionApplyRequest
    {
        [JsonProperty(PropertyName ="userid")]
        public string UserId { get; set; }

        [JsonProperty(PropertyName = "amount")]
        public double Amount { get; set; }

    }

    public class PromotionApplyInsertRequest : PromotionApplyRequest
    {
        [JsonProperty(PropertyName = "promotionid")]
        public string PromotionId { get; set; }
    }
}
