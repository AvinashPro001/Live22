using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Webet333.models.Request.Game
{

    public class GameM8RegisterRequest
    {

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("M8UserName")]
        public string M8UserName { get; set; }

        public JObject APIResponse { get; set; }

    }

}