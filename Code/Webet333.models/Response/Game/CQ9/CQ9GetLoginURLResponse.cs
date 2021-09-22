using Newtonsoft.Json;

namespace Webet333.models.Response.Game.CQ9
{
    public class CQ9GetLoginURLResponse : CQ9DefaultResponse
    {
        [JsonProperty("data")]
        public CQ9GetLoginURLResponseData Data { get; set; }
    }

    public class CQ9GetLoginURLResponseData
    {
        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("token")]
        public string Token { get; set; }
    }
}