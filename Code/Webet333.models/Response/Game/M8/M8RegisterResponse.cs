using Newtonsoft.Json;

namespace Webet333.models.Response.Game.M8
{
    public class Xml
    {
        [JsonProperty("@version")]
        public string Version { get; set; }

        [JsonProperty("@encoding")]
        public string Encoding { get; set; }
    }

    public class Response
    {
        public string errcode { get; set; }

        public string errtext { get; set; }

        public string result { get; set; }
    }

    public class M8RegisterResponse
    {
        [JsonProperty("?xml")]
        public Xml Xml { get; set; }

        public Response response { get; set; }
    }
}