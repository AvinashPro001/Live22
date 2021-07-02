using Newtonsoft.Json;

namespace Webet333.models.Request.Game.GamePlay
{
    public class GamePlayLoginAPIRequest
    {
        [JsonProperty("method")]
        public string Method { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("product_type")]
        public int ProductType { get; set; }

        [JsonProperty("platform")]
        public string Platform { get; set; }

        [JsonProperty("game_mode")]
        public string GameMode { get; set; }

        [JsonProperty("game_code")]
        public string GameCode { get; set; }

        [JsonProperty("back_url")]
        public string BackURL { get; set; }

        [JsonProperty("language")]
        public string Language { get; set; }
    }
}