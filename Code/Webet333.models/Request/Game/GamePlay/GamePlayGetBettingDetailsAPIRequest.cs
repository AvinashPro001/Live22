using Newtonsoft.Json;

namespace Webet333.models.Request.Game.GamePlay
{
    public class GamePlayGetBettingDetailsAPIRequest
    {
        [JsonProperty("method")]
        public string Method { get; set; }

        [JsonProperty("batch_name")]
        public string BatchName { get; set; }

        [JsonProperty("page")]
        public int Page { get; set; }
    }
}