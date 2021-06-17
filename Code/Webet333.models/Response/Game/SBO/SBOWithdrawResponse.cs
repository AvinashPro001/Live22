using Newtonsoft.Json;

namespace Webet333.models.Response.Game.SBO
{
    public class SBOWithdrawResponse : SBODefaultResponse
    {
        [JsonProperty("amount")]
        public decimal Amount { get; set; }

        [JsonProperty("txnId")]
        public string TxnId { get; set; }

        [JsonProperty("refno")]
        public string Refno { get; set; }

        [JsonProperty("balance")]
        public decimal Balance { get; set; }

        [JsonProperty("outstanding")]
        public decimal Outstanding { get; set; }
    }
}