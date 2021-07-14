using Newtonsoft.Json;
using System.Collections.Generic;

namespace Webet333.models.Request.Game.SBO
{
    public class SBOSetPlayerBetLimitRequest
    {
        [JsonProperty("Username")]
        public string Username { get; set; }

        [JsonProperty("BetSettings")]
        public List<SBOSetPlayerBetLimitRequestBetSetting> BetSettings { get; set; }

        [JsonProperty("CompanyKey")]
        public string CompanyKey { get; set; }

        [JsonProperty("ServerId")]
        public string ServerId { get; set; }
    }

    public class SBOSetPlayerBetLimitRequestBetSetting
    {
        [JsonProperty("sport_type")]
        public long SportType { get; set; }

        [JsonProperty("market_type")]
        public long MarketType { get; set; }

        [JsonProperty("min_bet")]
        public long MinBet { get; set; }

        [JsonProperty("max_bet")]
        public long MaxBet { get; set; }

        [JsonProperty("max_bet_per_match")]
        public long MaxBetPerMatch { get; set; }
    }
}