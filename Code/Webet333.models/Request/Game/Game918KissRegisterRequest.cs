using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Webet333.models.Request.Game
{

    public class Game918KissRegisterRequest
    {

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("_918KissUserName")]
        public string _918KissUserName { get; set; }

        public JObject APIResponse { get; set; }

    }

}