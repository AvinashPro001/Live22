using Newtonsoft.Json;
using System;

namespace Webet333.models.Request.Game.SBO
{
    public class SBOSetPlayerDefaultBetLimitRequest
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("value")]
        public long Value { get; set; }

        [JsonProperty("comment")]
        public string Comment { get; set; }

        [JsonIgnore]
        [JsonProperty("adminId")]
        public Guid AdminId { get; set; }
    }

    public class SBOSetPlayerDefaultBetLimitUpdateRequest : SBOSetPlayerDefaultBetLimitRequest
    {
        [JsonProperty("id")]
        public System.Guid Id { get; set; }
    }
}