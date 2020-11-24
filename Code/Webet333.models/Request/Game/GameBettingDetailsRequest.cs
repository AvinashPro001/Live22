using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Game
{
    public class GameBettingDetailsRequest:GlobalListRequest
    {
        [JsonProperty(PropertyName = "gameName")]
        public string GameName { get; set; }
    }
}
