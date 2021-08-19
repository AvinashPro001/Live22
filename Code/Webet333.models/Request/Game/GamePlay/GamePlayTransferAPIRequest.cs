using Newtonsoft.Json;

namespace Webet333.models.Request.Game.GamePlay
{
    public class GamePlayTransferAPIRequest
    {
        [JsonProperty("method")]
        public string Method { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("product_type")]
        public int ProductType { get; set; }

        [JsonProperty("fund_type")]
        public string FundType { get; set; }

        [JsonProperty("amount")]
        public decimal Amount { get; set; }

        [JsonProperty("reference_no")]
        public string ReferenceNo { get; set; }
    }
}