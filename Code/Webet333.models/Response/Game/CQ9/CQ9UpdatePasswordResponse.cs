using Newtonsoft.Json;

namespace Webet333.models.Response.Game.CQ9
{
    public class CQ9UpdatePasswordResponse : CQ9DefaultResponse
    {
        [JsonProperty("data")]
        public string Data { get; set; }
    }
}