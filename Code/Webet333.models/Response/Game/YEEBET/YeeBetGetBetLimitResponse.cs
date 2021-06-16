using Newtonsoft.Json;
using System.Collections.Generic;

namespace Webet333.models.Response.Game.YEEBET
{
    public class YeeBetGetBetLimitResponse
    {
        [JsonProperty("result")]
        public long Result { get; set; }

        [JsonProperty("array")]
        public List<YeeBetGetBetLimitResponseArray> Array { get; set; }

        [JsonProperty("arraysize")]
        public long Arraysize { get; set; }
    }

    public class YeeBetGetBetLimitResponseArray
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("up")]
        public long Up { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("down")]
        public long Down { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; } = "YeeBetDefaultBetLimit";
    }
}