using Newtonsoft.Json;

namespace Webet333.models.Request.Game.SBO
{
    public class SBOWithdrawRequest
    {
        [JsonProperty("Username")]
        public string Username { get; set; }

        [JsonProperty("txnId")]
        public string TxnId { get; set; }

        [JsonProperty("IsFullAmount")]
        public bool IsFullAmount { get; set; }

        [JsonProperty("Amount")]
        public decimal Amount { get; set; }

        [JsonProperty("CompanyKey")]
        public string CompanyKey { get; set; }

        [JsonProperty("ServerId")]
        public string ServerId { get; set; }
    }
}