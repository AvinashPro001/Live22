using Newtonsoft.Json;

namespace Webet333.models.Response.Game.Kiss918
{
    public class Kiss918RegisterResponse
    {
        [JsonProperty("code")]
        public int Code { get; set; }

        [JsonProperty("msg")]
        public string Msg { get; set; }

        [JsonProperty("success")]
        public bool Success { get; set; }

        [JsonProperty("type")]
        public int Type { get; set; }
    }
}