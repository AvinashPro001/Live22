using Newtonsoft.Json;
using System.Collections.Generic;

namespace Webet333.models.Response.Game.SBO
{
    public class SBOGetLeagueResponse : SBODefaultResponse
    {
        [JsonProperty("result")]
        public List<SBOGetLeagueResponseResult> Result { get; set; }
    }

    public class SBOGetLeagueResponseResult
    {
        [JsonProperty("league_id")]
        public long LeagueId { get; set; }

        [JsonProperty("league_name")]
        public string LeagueName { get; set; }

        [JsonProperty("sportType")]
        public string SportType { get; set; }

        [JsonProperty("MinBet")]
        public decimal MinBet { get; set; } = 0;

        [JsonProperty("MaxBet")]
        public decimal MaxBet { get; set; } = 0;

        [JsonProperty("MaxBetRatio")]
        public decimal MaxBetRatio { get; set; } = 0;

        [JsonProperty("GroupType")]
        public string GroupType { get; set; }
    }
}