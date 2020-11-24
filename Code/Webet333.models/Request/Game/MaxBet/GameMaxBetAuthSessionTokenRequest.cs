using Newtonsoft.Json;

namespace Webet333.models.Request.Game.MaxBet
{
    public class GameMaxBetAuthSessionTokenRequest
    {
        [JsonProperty("secret_key")]
        public string SecretKey { get; set; }

        [JsonProperty("session_token")]
        public string SessionToken { get; set; }

        [JsonProperty("Op")]
        public string Operator { get; set; }
    }
}
