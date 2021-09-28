using Newtonsoft.Json;

namespace Webet333.models.Response.Game.CQ9
{
    public class CQ9LoginResponse : CQ9DefaultResponse
    {
        [JsonProperty("data")]
        public CQ9LoginResponseData Data { get; set; }
    }

    public class CQ9LoginResponseData
    {
        [JsonProperty("usertoken")]
        public string Usertoken { get; set; }
    }
}