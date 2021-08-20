using Newtonsoft.Json;

namespace Webet333.models.Request.Game.GamePlay
{
    public class GamePlayGetBalanceRequest
    {
        [JsonProperty("method")]
        public string Method { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("product_type")]
        public int ProductType { get; set; }
    }
}