using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game
{
    public class SexyBaccaratManuallyBettingDetailsRequest 
    {
        [Required]
        [JsonProperty(PropertyName = "fromdate")]
        public string FromDate { get; set; }

        [Required]
        [JsonProperty(PropertyName = "todate")]
        public string ToDate { get; set; }
    }
}
