using Newtonsoft.Json;

namespace Webet333.models.Response.Game.SBO
{
    public class SBODepositResponse : SBODefaultResponse
    {
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