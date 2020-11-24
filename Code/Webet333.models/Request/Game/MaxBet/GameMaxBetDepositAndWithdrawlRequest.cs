using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game.MaxBet
{
    public class GameMaxBetDepositAndWithdrawlRequest
    {
        [JsonProperty(PropertyName ="userid")]
        public string UserId { get; set; }

        [Required]
        [JsonProperty(PropertyName ="amount")]
        public decimal Amount {get;set;}

        [Required]
        [Range(typeof(int), "0", "1")]
        [JsonProperty(PropertyName = "method")]
        public int Method {get;set;}
    }
}
