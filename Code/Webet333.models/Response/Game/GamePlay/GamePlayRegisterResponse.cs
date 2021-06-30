using Newtonsoft.Json;

namespace Webet333.models.Response.Game.GamePlay
{
    public class GamePlayRegisterResponse
    {
        [JsonProperty("status")]
        public long Status { get; set; }

        [JsonProperty("error_ desc")]
        public string ErrorDesc { get; set; }
    }
}