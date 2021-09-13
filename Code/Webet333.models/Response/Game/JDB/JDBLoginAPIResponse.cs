using Newtonsoft.Json;

namespace Webet333.models.Response.Game.JDB
{
    public class JDBLoginAPIResponse : JDBDefaultResponse
    {
        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("extension")]
        public dynamic Extension { get; set; }
    }
}