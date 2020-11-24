using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game.MaxBet
{
    public class MaxBetGlobalVariableRequest
    {
        [Required]
        [JsonProperty(PropertyName = "minValue")]
        public string MinimumValue { get; set; }

        [Required]
        [JsonProperty(PropertyName = "maxValue")]
        public string Maximumvalue { get; set; }

    }

    public class MaxBetBettingDetails
    {
        [JsonProperty(PropertyName = "versionKey")]
        public string VersionKey { get; set; }
    }

    public class MaxbetUserGlobalVariableRequest : MaxBetGlobalVariableRequest
    {
        [Required]
        [JsonProperty(PropertyName = "userId")]
        public Guid UserId { get; set; }
    }
}
