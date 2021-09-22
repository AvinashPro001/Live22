using Newtonsoft.Json;

namespace Webet333.models.Response.Game.CQ9
{
    public class CQ9DepositWithdrawResponse : CQ9DefaultResponse
    {
        [JsonProperty("data")]
        public CQ9DepositWithdrawResponseData Data { get; set; }
    }

    public class CQ9DepositWithdrawResponseData
    {
        [JsonProperty("balance")]
        public decimal Balance { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }
    }
}