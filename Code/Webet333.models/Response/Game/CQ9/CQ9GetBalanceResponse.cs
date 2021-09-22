using Newtonsoft.Json;

namespace Webet333.models.Response.Game.CQ9
{
    public class CQ9GetBalanceResponse : CQ9DefaultResponse
    {
        [JsonProperty("data")]
        public CQ9GetBalanceResponseData Data { get; set; }
    }

    public class CQ9GetBalanceResponseData
    {
        [JsonProperty("balance")]
        public decimal Balance { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }
    }
}