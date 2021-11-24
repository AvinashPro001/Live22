using Newtonsoft.Json;

namespace Webet333.models.Response.Game.Live22
{
	
 public class Live22RegisterResponse
    {
        [JsonProperty("errCode")]
        public int Code { get; set; }

        [JsonProperty("errMsg")]
        public string Msg { get; set; }

        [JsonProperty("success")]
        public bool Success { get; set; }

        //[JsonProperty("type")]
        //public int Type { get; set; }
    }
}
