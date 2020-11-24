using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Game
{
    public class GameLoginRequest:GetByIdRequest
    {
        [JsonProperty(PropertyName ="isMobile")]
        public bool IsMobile { get; set; }
    }

    public class PragmaticGameLoginRequest : GameLoginRequest
    {
        [JsonProperty(PropertyName = "gameId")]
        public string GameId { get; set; }
    }
}
