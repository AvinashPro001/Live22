using Newtonsoft.Json;

namespace Webet333.models.Response.Game
{
    public class BettingSummerySelectResponse
    {
        [JsonProperty("GameName")]
        public string GameName { get; set; }

        [JsonProperty("BetCount")]
        public int BetCount { get; set; }

        [JsonProperty("VaildBetAmount")]
        public decimal VaildBetAmount { get; set; }

        [JsonProperty("BetAmount")]
        public decimal BetAmount { get; set; }

        [JsonProperty("TotalRebate")]
        public decimal TotalRebate { get; set; }

        [JsonProperty("Total")]
        public int Total { get; set; }

        [JsonProperty("OffSet")]
        public int OffSet { get; set; }
    }
}
