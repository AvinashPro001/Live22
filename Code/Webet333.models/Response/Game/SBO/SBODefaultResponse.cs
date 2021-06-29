using Newtonsoft.Json;

namespace Webet333.models.Response.Game.SBO
{
    public class SBODefaultResponse
    {
        [JsonProperty("serverId")]
        public string ServerId { get; set; }

        [JsonProperty("error")]
        public SBOErrorResponse Error { get; set; }
    }

    public class SBOErrorResponse
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("msg")]
        public string Msg { get; set; }
    }
}