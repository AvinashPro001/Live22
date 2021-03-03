using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Promotions
{
    public class PromotionUpdateStatusRequest: GetByIdRequestWithRequired
    {
        [Required]
        [JsonProperty(PropertyName ="active")]
        public bool Active { get; set; }

        [JsonIgnore]
        public System.Guid AdminId { get; set; }

        [JsonIgnore]
        public string Description { get; set; }
    }
}
