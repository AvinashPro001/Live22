using Newtonsoft.Json;

namespace Webet333.models.Request.Game.SBO
{
    public class SBOSetLeagueBetSettingRequest
    {
        [JsonProperty("LeagueId")]
        public long LeagueId { get; set; }

        [JsonProperty("Currency")]
        public string Currency { get; set; }

        [JsonProperty("IsLive")]
        public bool IsLive { get; set; }

        [JsonProperty("MinBet")]
        public decimal MinBet { get; set; }

        [JsonProperty("MaxBet")]
        public decimal MaxBet { get; set; }

        [JsonProperty("MaxBetRatio")]
        public decimal MaxBetRatio { get; set; }

        [JsonProperty("GroupType")]
        public string GroupType { get; set; }

        [JsonProperty("CompanyKey")]
        public string CompanyKey { get; set; }

        [JsonProperty("ServerId")]
        public string ServerId { get; set; }
    }
}