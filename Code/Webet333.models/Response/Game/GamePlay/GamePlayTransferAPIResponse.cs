using Newtonsoft.Json;

namespace Webet333.models.Response.Game.GamePlay
{
    public class GamePlayTransferAPIResponse : GamePlayDefaultResponse
    {
        [JsonProperty("transaction_status")]
        public string TransactionStatus { get; set; }
    }
}