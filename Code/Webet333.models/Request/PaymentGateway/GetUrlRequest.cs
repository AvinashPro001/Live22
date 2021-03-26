using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.PaymentGateway
{
    public class GetUrlRequest
    {
        [Required]
        [JsonProperty(PropertyName = "amount")]
        public decimal Amount { get; set; }

        [JsonProperty(PropertyName = "promotionId")]
        public string PromotionId { get; set; }

        [JsonProperty(PropertyName = "promotionApplyEligible")]
        public bool PromotionApplyEligible { get; set; }
    }
}