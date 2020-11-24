using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Webet333.models.Request.Game
{

    public class GamePlaytechRegisterRequest
    {

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("playtechUserName")]
        public string PlaytechUserName { get; set; }

        public JObject APIResponse { get; set; }

    }

}