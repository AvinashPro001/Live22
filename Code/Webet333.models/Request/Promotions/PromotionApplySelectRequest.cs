using Newtonsoft.Json;

namespace Webet333.models.Request.Promotions
{
    public class PromotionApplySelectRequest: GlobalListRequest
    {
        [JsonProperty(PropertyName ="status")]
        public int Status { get; set; }
    }
}
