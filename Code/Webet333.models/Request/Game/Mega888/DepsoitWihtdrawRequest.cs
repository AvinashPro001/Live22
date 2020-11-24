using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game.Mega888
{
    public class DepsoitWihtdrawRequest
    {
        [JsonProperty(PropertyName ="userid")]
        public string UserId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "amount")]
        public decimal Amount { get; set; }

        [Required]
        [JsonProperty(PropertyName = "method")]
        public int Method { get; set; }
    }
}
