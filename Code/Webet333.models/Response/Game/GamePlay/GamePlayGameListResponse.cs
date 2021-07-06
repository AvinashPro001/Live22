using Newtonsoft.Json;
using System.Collections.Generic;

namespace Webet333.models.Response.Game.GamePlay
{
    public class GamePlayGameListResponse : GamePlayDefaultResponse
    {
        [JsonProperty("games")]
        public List<Game> Games { get; set; }

        [JsonProperty("page_info")]
        public PageInfo PageInfo { get; set; }
    }

    public class Game
    {
        [JsonProperty("displayStatus")]
        public long DisplayStatus { get; set; }

        [JsonProperty("gameType")]
        public string GameType { get; set; }

        [JsonProperty("gameName")]
        public string GameName { get; set; }

        [JsonProperty("tcgGameCode")]
        public string TcgGameCode { get; set; }

        [JsonProperty("productCode")]
        public string ProductCode { get; set; }

        [JsonProperty("productType")]
        public long ProductType { get; set; }

        [JsonProperty("platform")]
        public string Platform { get; set; }

        [JsonProperty("gameSubType")]
        public string GameSubType { get; set; }

        [JsonProperty("trialSupport")]
        public bool TrialSupport { get; set; }
    }

    public class PageInfo
    {
        [JsonProperty("totalPage")]
        public long TotalPage { get; set; }

        [JsonProperty("currentPage")]
        public long CurrentPage { get; set; }

        [JsonProperty("totalCount")]
        public long TotalCount { get; set; }
    }
}