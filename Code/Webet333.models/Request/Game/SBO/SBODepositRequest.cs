using Newtonsoft.Json;

namespace Webet333.models.Request.Game.SBO
{
    public class SBODepositRequest
    {
        [JsonProperty("Username")]
        public string Username { get; set; }

        [JsonProperty("TxnId")]
        public string TxnId { get; set; }

        [JsonProperty("Amount")]
        public decimal Amount { get; set; }

        [JsonProperty("CompanyKey")]
        public string CompanyKey { get; set; }

        [JsonProperty("ServerId")]
        public string ServerId { get; set; }
    }
}