using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game.SexyBaccarat
{
    public class SexybaccaratTransfer : GetByIdRequest
    {
        [Required]
        [JsonProperty(PropertyName = "amount")]
        public decimal Amount { get; set; }
    }
}