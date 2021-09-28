using Newtonsoft.Json;

namespace Webet333.models.Response.Game.CQ9
{
    public class CQ9RegisterResponse : CQ9DefaultResponse
    {
        [JsonProperty("data")]
        public CQ9RegisterResponseData Data { get; set; }
    }

    public class CQ9RegisterResponseData
    {
        [JsonProperty("account")]
        public string Account { get; set; }

        [JsonProperty("nickname")]
        public string Nickname { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }
    }
}