using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Webet333.models.Response.Game.JDB
{
    public class JDBBettingDetailsAPIResponse : JDBDefaultResponse
    {
        [JsonProperty("transactions")]
        public List<JDBBettingDetailsAPIResponseTransaction> Transactions { get; set; }
    }

    public class JDBBettingDetailsAPIResponseTransaction
    {
        [JsonProperty("gameType")]
        public string GameType { get; set; }

        [JsonProperty("winAmount")]
        public decimal WinAmount { get; set; }

        [JsonProperty("txTime")]
        public DateTimeOffset TxTime { get; set; }

        [JsonProperty("settleStatus")]
        public int SettleStatus { get; set; }

        /*  Start   */

        [JsonProperty("gameInfo")]
        public string GameInfo { get; set; }

        [JsonProperty("gameInfoData")]
        public JDBBettingDetailsAPIResponseTransactionGameInfo GameInfoData { get; set; }

        /*  End */

        [JsonProperty("realWinAmount")]
        public decimal RealWinAmount { get; set; }

        [JsonProperty("updateTime")]
        public DateTimeOffset UpdateTime { get; set; }

        [JsonProperty("realBetAmount")]
        public decimal RealBetAmount { get; set; }

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("betType")]
        public string BetType { get; set; }

        [JsonProperty("platform")]
        public string Platform { get; set; }

        [JsonProperty("txStatus")]
        public int TxStatus { get; set; }

        [JsonProperty("betAmount")]
        public decimal BetAmount { get; set; }

        [JsonProperty("gameName")]
        public string GameName { get; set; }

        [JsonProperty("platformTxId")]
        public string PlatformTxId { get; set; }

        [JsonProperty("betTime")]
        public DateTimeOffset BetTime { get; set; }

        [JsonProperty("gameCode")]
        public string GameCode { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }

        [JsonProperty("jackpotWinAmount")]
        public decimal JackpotWinAmount { get; set; }

        [JsonProperty("jackpotBetAmount")]
        public decimal JackpotBetAmount { get; set; }

        [JsonProperty("turnover")]
        public decimal Turnover { get; set; }

        [JsonProperty("roundId")]
        public string RoundId { get; set; }
    }

    public class JDBBettingDetailsAPIResponseTransactionGameInfo
    {
        [JsonProperty("hasFreeGame")]
        public decimal HasFreeGame { get; set; }

        [JsonProperty("denom")]
        public decimal Denom { get; set; }

        [JsonProperty("systemTakeWin")]
        public decimal SystemTakeWin { get; set; }
    }

    public class JDBBettingDetailsAPIResponseInsert : JDBDefaultResponse
    {
        [JsonProperty("transactions")]
        public List<JDBBettingDetailsAPIResponseTransactionInsert> Transactions { get; set; }
    }

    public class JDBBettingDetailsAPIResponseTransactionInsert
    {
        [JsonProperty("gameType")]
        public string GameType { get; set; }

        [JsonProperty("winAmount")]
        public decimal WinAmount { get; set; }

        [JsonProperty("txTime")]
        public DateTimeOffset TxTime { get; set; }

        [JsonProperty("settleStatus")]
        public int SettleStatus { get; set; }

        [JsonProperty("gameInfo")]
        public JDBBettingDetailsAPIResponseTransactionGameInfo GameInfo { get; set; }

        [JsonProperty("realWinAmount")]
        public decimal RealWinAmount { get; set; }

        [JsonProperty("updateTime")]
        public DateTimeOffset UpdateTime { get; set; }

        [JsonProperty("realBetAmount")]
        public decimal RealBetAmount { get; set; }

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("betType")]
        public string BetType { get; set; }

        [JsonProperty("platform")]
        public string Platform { get; set; }

        [JsonProperty("txStatus")]
        public int TxStatus { get; set; }

        [JsonProperty("betAmount")]
        public decimal BetAmount { get; set; }

        [JsonProperty("gameName")]
        public string GameName { get; set; }

        [JsonProperty("platformTxId")]
        public string PlatformTxId { get; set; }

        [JsonProperty("betTime")]
        public DateTimeOffset BetTime { get; set; }

        [JsonProperty("gameCode")]
        public string GameCode { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }

        [JsonProperty("jackpotWinAmount")]
        public decimal JackpotWinAmount { get; set; }

        [JsonProperty("jackpotBetAmount")]
        public decimal JackpotBetAmount { get; set; }

        [JsonProperty("turnover")]
        public decimal Turnover { get; set; }

        [JsonProperty("roundId")]
        public string RoundId { get; set; }
    }
}