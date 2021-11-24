using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Webet333.models.Request.Game
{
    public class GameLive22RegisterRequest
    {
        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("Live22UserName")]
        public string Live22UserName { get; set; }

        public JObject APIResponse { get; set; }
    }
}

