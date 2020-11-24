using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Webet333.models.Request.Game
{

    public class GameAGRegisterRequest
    {

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("AGUserName")]
        public string AGUserName { get; set; }

        public JObject APIResponse { get; set; }

    }

}