using Newtonsoft.Json;

namespace Webet333.models.Response.Game.SBO
{
    public class SBOGetPlayerBalanceResponse : SBODefaultResponse
    {
        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }

        [JsonProperty("balance")]
        public decimal Balance { get; set; }

        [JsonProperty("outstanding")]
        public decimal Outstanding { get; set; }
    }
}