using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Promotions
{
    public class PromotionRetriveRequest
    {
        [JsonProperty(PropertyName = "ismobile")]
        public bool IsMobile { get; set; }

        [JsonProperty(PropertyName = "ismain")]
        public bool IsMain { get; set; }
    }

    public class UsersPromotionRetrive: GetByIdRequest
    {

        [Required]
        [JsonProperty(PropertyName = "ismobile")]
        public bool IsMobile { get; set; }
    }


}
