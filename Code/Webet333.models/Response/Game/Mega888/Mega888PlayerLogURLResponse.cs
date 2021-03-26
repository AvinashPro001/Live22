using Newtonsoft.Json;

namespace Webet333.models.Response.Game.Mega888
{
    public class Mega888PlayerLogURLResponse
    {
        [JsonProperty("id")]
        public dynamic Id { get; set; }

        [JsonProperty("result")]
        public string Result { get; set; }

        [JsonProperty("error")]
        public dynamic Error { get; set; }

        [JsonProperty("jsonrpc")]
        public string Jsonrpc { get; set; }
    }
}