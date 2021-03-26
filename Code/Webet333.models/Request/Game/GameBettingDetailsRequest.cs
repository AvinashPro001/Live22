using Newtonsoft.Json;

namespace Webet333.models.Request.Game
{
    public class GameBettingDetailsRequest : GlobalListRequest
    {
        [JsonProperty(PropertyName = "gameName")]
        public string GameName { get; set; }
    }
}