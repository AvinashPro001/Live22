using Newtonsoft.Json;

namespace Webet333.models.Request.Game.GamePlay
{
    public class GamePlayGetGameListAPIRequest
    {
        [JsonProperty("platform")]
        public string Platform { get; set; }

        [JsonProperty("page")]
        public long Page { get; set; }

        [JsonProperty("method")]
        public string Method { get; set; }

        [JsonProperty("product_type")]
        public long ProductType { get; set; }

        [JsonProperty("client_type")]
        public string ClientType { get; set; }

        [JsonProperty("game_type")]
        public string GameType { get; set; }

        [JsonProperty("page_size")]
        public long PageSize { get; set; }

        [JsonProperty("language")]
        public string Language { get; set; }

    }
}