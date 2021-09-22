using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.Game.CQ9
{
    public class CQ9GetBettingDetailsResponseDataDatum
    {
        [JsonProperty("parentid")]
        public string Parentid { get; set; }

        [JsonProperty("account")]
        public string Account { get; set; }

        [JsonProperty("gamecode")]
        public string Gamecode { get; set; }

        [JsonProperty("gamehall")]
        public string Gamehall { get; set; }

        [JsonProperty("rounds")]
        public long Rounds { get; set; }

        [JsonProperty("jackpots")]
        public long Jackpots { get; set; }

        [JsonProperty("bets")]
        public long Bets { get; set; }

        [JsonProperty("validbets")]
        public long Validbets { get; set; }

        [JsonProperty("wins")]
        public long Wins { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }

        [JsonProperty("datetime")]
        public DateTimeOffset Datetime { get; set; }

        [JsonProperty("rakes")]
        public long Rakes { get; set; }

        [JsonProperty("roomfee")]
        public long Roomfee { get; set; }
    }
}