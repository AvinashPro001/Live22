using Newtonsoft.Json;

namespace Webet333.models.Request.Game.SBO
{
    public class SBOGetLeagueBetSettingRequest
    {
        [JsonProperty("LeagueId")]
        public long LeagueId { get; set; }

        [JsonProperty("Currency")]
        public string Currency { get; set; }

        [JsonProperty("IsLive")]
        public bool IsLive { get; set; }

        [JsonProperty("CompanyKey")]
        public string CompanyKey { get; set; }

        [JsonProperty("ServerId")]
        public string ServerId { get; set; }
    }
}