using System;
using System.Collections.Generic;

namespace Webet333.models.Response.Game.SexyBaccarat
{
    public partial class SexyBaccaratBettingDetailsResponse
    {
        public List<Transaction> Transactions { get; set; }
        public string Status { get; set; }
        public string desc { get; set; }
    }


    public class Transaction
    {
        public string GameType { get; set; }
        public long WinAmount { get; set; }
        public DateTimeOffset TxTime { get; set; }
        public string GameInfo { get; set; }
        public long RealWinAmount { get; set; }
        public DateTimeOffset UpdateTime { get; set; }
        public long RealBetAmount { get; set; }
        public string UserId { get; set; }
        public string BetType { get; set; }
        public string Platform { get; set; }
        public long TxStatus { get; set; }
        public long BetAmount { get; set; }
        public string PlatformTxId { get; set; }
        public string GameCode { get; set; }
        public string Currency { get; set; }
        public long JackpotWinAmount { get; set; }
        public long Id { get; set; }
        public long JackpotBetAmount { get; set; }
        public long Turnover { get; set; }
        public string RoundId { get; set; }
    }

    public partial class GameInfo
    {
        public string[] Result { get; set; }
        public string RoundStartTime { get; set; }
        public string Winner { get; set; }
        public string Ip { get; set; }
        public long Odds { get; set; }
        public long TableId { get; set; }
        public string DealerDomain { get; set; }
        public long WinLoss { get; set; }
        public string Status { get; set; }
    }

    public class BettingDetailsInsertResponse
    {
        public string GameType { get; set; }
        public decimal WinAmount { get; set; }
        public string TxTime { get; set; }
        public string Result { get; set; }
        public string RoundStartTime { get; set; }
        public string Winner { get; set; }
        public string Ip { get; set; }
        public long Odds { get; set; }
        public long TableId { get; set; }
        public string DealerDomain { get; set; }
        public decimal WinLoss { get; set; }
        public string Status { get; set; }
        public decimal RealWinAmount { get; set; }
        public string UpdateTime { get; set; }
        public decimal RealBetAmount { get; set; }
        public string UserId { get; set; }
        public string BetType { get; set; }
        public string Platform { get; set; }
        public long TxStatus { get; set; }
        public decimal BetAmount { get; set; }
        public string PlatformTxId { get; set; }
        public string GameCode { get; set; }
        public string Currency { get; set; }
        public decimal JackpotWinAmount { get; set; }
        public long Id { get; set; }
        public decimal JackpotBetAmount { get; set; }
        public decimal Turnover { get; set; }
        public string RoundId { get; set; }
    }
}
