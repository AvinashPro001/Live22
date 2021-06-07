using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.Game
{
    public class GameListSelectResponse
    {
        [JsonProperty("GameName")]
        public string GameName { get; set; }

        [JsonProperty("GameCode")]
        public string GameCode { get; set; }

        [JsonProperty("GameType")]
        public string GameType { get; set; }

        [JsonProperty("IsNew")]
        public bool IsNew { get; set; }

        [JsonProperty("IsHot")]
        public bool IsHot { get; set; }

        [JsonProperty("Sequence")]
        public int Sequence { get; set; }

        [JsonProperty("ImagePath1")]
        public string ImagePath1 { get; set; }

        [JsonProperty("ImagePath2")]
        public string ImagePath2 { get; set; }

        [JsonProperty("Active")]
        public bool Active { get; set; }

        [JsonProperty("Created")]
        public DateTime Created { get; set; }

        [JsonProperty("Total")]
        public int Total { get; set; }

        [JsonProperty("OffSet")]
        public int OffSet { get; set; }
    }
}
