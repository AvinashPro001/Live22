using Newtonsoft.Json;

namespace Webet333.models.Response.Game.SBO
{
    public class SBOLoginResponse
    {
        public class GetSBOLoginTokeResponse : SBODefaultResponse
        {
            [JsonProperty("url")]
            public string Url { get; set; }
        }
    }
}