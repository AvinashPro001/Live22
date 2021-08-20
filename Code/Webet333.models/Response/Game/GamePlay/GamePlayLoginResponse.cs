using Newtonsoft.Json;

namespace Webet333.models.Response.Game.GamePlay
{
    public class GamePlayLoginResponse : GamePlayDefaultResponse
    {
        [JsonProperty("error_message")]
        public string ErrorMessage { get; set; }

        [JsonProperty("game_url")]
        public string GameUrl { get; set; }
    }
}