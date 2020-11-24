using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game
{
    public class PromotionExpieryManuallyRequest
    {
        [Required]
        [JsonProperty(PropertyName ="userId")]
        public string UserId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "promotionId")]
        public string PromotionId { get; set; }
    }
}
