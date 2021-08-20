using Newtonsoft.Json;

namespace Webet333.models.Response.Game.GamePlay
{
    public class GamePlayGetBalanceResponse : GamePlayDefaultResponse
    {
        [JsonProperty("balance")]
        public decimal Balance { get; set; }
    }
}