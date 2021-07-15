using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game
{
    public class GameListUploadResponse
    {

        [JsonProperty(PropertyName = "gameType")]
        public string GameType { get; set; }

        [JsonProperty(PropertyName = "gameCode")]
        public string GameCode { get; set; }

        [JsonProperty(PropertyName = "gameName")]
        public string GameName { get; set; }

        [JsonProperty(PropertyName = "imagePath1")]
        public string ImagePath1 { get; set; }

        [JsonProperty(PropertyName = "imagePath2")]
        public string ImagePath2 { get; set; }
    }
}
