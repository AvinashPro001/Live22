using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Webet333.models.Request.Game
{
    public class GameJokerRegisterRequest
    {

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("jokerUserName")]
        public string JokerUserName { get; set; }

        public JObject APIResponse { get; set; }

    }

}