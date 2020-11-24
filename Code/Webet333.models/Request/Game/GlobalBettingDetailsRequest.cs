using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game
{
    public class GlobalBettingDetailsRequest
    {
        [Required]
        [JsonProperty(PropertyName = "fromdate")]
        public DateTime FromDate { get; set; }

        [Required]
        [JsonProperty(PropertyName ="todate")]
        public DateTime ToDate { get; set; }
    }

    public class PragmaticBettingDetailsRequest
    {
        [Required]
        [JsonProperty(PropertyName = "startTime")]
        public DateTime StartTimeStamp { get; set; }
    }
}
