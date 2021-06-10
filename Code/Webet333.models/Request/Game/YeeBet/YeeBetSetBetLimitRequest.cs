using Newtonsoft.Json;

namespace Webet333.models.Request.Game.YeeBet
{
    public class YeeBetSetBetLimitRequest
    {
        [JsonProperty("username")]
        public string Username { get; set; }
    }
}