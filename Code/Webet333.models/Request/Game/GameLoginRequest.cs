using Newtonsoft.Json;

namespace Webet333.models.Request.Game
{
    public class GameLoginRequest : GetByIdRequest
    {
        [JsonProperty(PropertyName = "isMobile")]
        public bool IsMobile { get; set; }
    }

    public class PragmaticGameLoginRequest : GameLoginRequest
    {
        [JsonProperty(PropertyName = "gameId")]
        public string GameId { get; set; }
    }

    public class GamePlayGameLoginRequest : GameLoginRequest
    {
        [JsonProperty(PropertyName = "gameCode")]
        public string GameCode { get; set; }
    }

    public class CQ9GameLoginRequest : GameLoginRequest
    {
        [JsonProperty("isSlot")]
        public bool IsSlot { get; set; }
    }
}