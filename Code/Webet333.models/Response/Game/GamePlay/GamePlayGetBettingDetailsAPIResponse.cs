using Newtonsoft.Json;
using System;
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
        public decimal BetAmount { get; set; }

        [JsonProperty("validBetAmount")]
        public decimal ValidBetAmount { get; set; }

        [JsonProperty("winAmount")]
        public decimal WinAmount { get; set; }

        [JsonProperty("netPnl")]
        public decimal NetPnl { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }

        [JsonProperty("transactionTime")]
        public DateTime TransactionTime { get; set; }

        [JsonProperty("gameCode")]
        public string GameCode { get; set; }

        [JsonProperty("gameName")]
        public string GameName { get; set; }

        [JsonProperty("betOrderNo")]
        public string BetOrderNo { get; set; }

        [JsonProperty("betTime")]
        public DateTime BetTime { get; set; }

        [JsonProperty("productType")]
        public long ProductType { get; set; }

        [JsonProperty("gameCategory")]
        public string GameCategory { get; set; }

        [JsonProperty("sessionId")]
        public long SessionId { get; set; }

        [JsonProperty("additionalDetails")]
        public dynamic AdditionalDetails { get; set; }
    }

    //public class GamePlayGetBettingDetailsAPIResponseAdditionalDetails
    //{
    //    [JsonProperty("bundleId")]
    //    public string BundleId { get; set; }

    //    [JsonProperty("tableId")]
    //    public string TableId { get; set; }

    //    [JsonProperty("freeRound")]
    //    public string FreeRound { get; set; }

    //    [JsonProperty("jackpotContribution")]
    //    public decimal JackpotContribution { get; set; }

    //    [JsonProperty("jackpotWin")]
    //    public decimal JackpotWin { get; set; }

    //    [JsonProperty("rebateAmount")]
    //    public decimal RebateAmount { get; set; }

    //    [JsonProperty("luckyNumber")]
    //    public string LuckyNumber { get; set; }

    //    [JsonProperty("gameResult")]
    //    public string GameResult { get; set; }

    //    [JsonProperty("playerHand")]
    //    public string PlayerHand { get; set; }

    //    [JsonProperty("platform")]
    //    public long Platform { get; set; }

    //    [JsonProperty("betContent")]
    //    public string BetContent { get; set; }

    //    [JsonProperty("betType")]
    //    public long BetType { get; set; }
    //}
}