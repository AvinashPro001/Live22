using Newtonsoft.Json;

namespace Webet333.models.Request.Game.GamePlay
{
    public class GamePlayUpdatePasswordRequest
    {
        [JsonProperty("method")]
        public string Method { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }
    }
}