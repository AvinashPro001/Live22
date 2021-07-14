using Newtonsoft.Json;
using System.Collections.Generic;

namespace Webet333.models.Response.Game.SBO
{
    public class SBOGetLeagueBetSettingResponse : SBODefaultResponse
    {
        [JsonProperty("result")]
        public List<SBOGetLeagueBetSettingResponseResult> Result { get; set; }
    }

    public class SBOGetLeagueBetSettingResponseResult
    {
        [JsonProperty("league_id")]
        public long LeagueId { get; set; }

        [JsonProperty("league_name")]
        public string LeagueName { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }

        [JsonProperty("is_live")]
        public bool IsLive { get; set; }

        [JsonProperty("min_bet")]
        public decimal MinBet { get; set; }

        [JsonProperty("max_bet")]
        public decimal MaxBet { get; set; }

        [JsonProperty("max_bet_ratio")]
        public decimal MaxBetRatio { get; set; }

        [JsonProperty("group_type")]
        public string GroupType { get; set; }
    }
}