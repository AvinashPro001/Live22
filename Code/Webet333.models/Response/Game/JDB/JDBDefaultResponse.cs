using Newtonsoft.Json;

namespace Webet333.models.Response.Game.JDB
{
    public class JDBDefaultResponse
    {
        [JsonProperty("desc")]
        public string Desc { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }
    }
}