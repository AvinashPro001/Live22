using Newtonsoft.Json;
using System.Collections.Generic;

namespace Webet333.models.Response.Game.GamePlay
{
    public class GamePlayGetBettingDetailsAPIResponse : GamePlayDefaultResponse
    {
        [JsonProperty("details")]
        public List<GamePlayGetBettingDetailsAPIResponseDetail> Details { get; set; }

        [JsonProperty("page_info")]
        public GamePlayGameListResponsePageInfo PageInfo { get; set; }
    }

    public class GamePlayGetBettingDetailsAPIResponseDetail
    {
        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("betAmount")]
        public string BetAmount { get; set; }

        [JsonProperty("validBetAmount")]
        public string ValidBetAmount { get; set; }

        [JsonProperty("winAmount")]
        public string WinAmount { get; set; }

        [JsonProperty("netPnl")]
        public string NetPnl { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }

        [JsonProperty("transactionTime")]
        public string TransactionTime { get; set; }

        [JsonProperty("gameCode")]
        public string GameCode { get; set; }

        [JsonProperty("gameName")]
        public string GameName { get; set; }

        [JsonProperty("betOrderNo")]
        public string BetOrderNo { get; set; }

        [JsonProperty("betTime")]
        public string BetTime { get; set; }

        [JsonProperty("productType")]
        public long ProductType { get; set; }

        [JsonProperty("gameCategory")]
        public string GameCategory { get; set; }

        [JsonProperty("sessionId")]
        public string SessionId { get; set; }

        [JsonProperty("additionalDetails")]
        public string AdditionalDetails { get; set; }
    }
}