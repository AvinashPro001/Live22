using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game.SexyBaccarat
{
    public class SexybaccaratLoginRequest : GetByIdRequest
    {
        [Required]
        [JsonProperty(PropertyName = "isMobile")]
        public bool IsMobile { get; set; }
    }
}
