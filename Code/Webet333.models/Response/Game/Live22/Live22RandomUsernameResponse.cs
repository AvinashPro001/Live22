using Newtonsoft.Json;

namespace Webet333.models.Response.Game.Live22
{
	
      public class Live22RandomUsernameResponse
    {
        [JsonProperty("account")]
        public string Account { get; set; }

        [JsonProperty("code")]
        public int Code { get; set; }

        [JsonProperty("msg")]
        public string Msg { get; set; }

        [JsonProperty("success")]
        public bool Success { get; set; }
    }
}
