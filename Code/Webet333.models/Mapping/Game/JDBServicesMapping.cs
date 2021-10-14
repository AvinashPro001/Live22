using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using Webet333.models.Response.Game.JDB;

namespace Webet333.models.Mapping.Game
{
    public class JDBServicesMapping
    {
        public List<JDBBettingDetailsAPIResponseTransactionInsert> Map(List<JDBBettingDetailsAPIResponseTransaction> List)
        {
            var response = List.Select(x => new JDBBettingDetailsAPIResponseTransactionInsert
            {
                BetAmount = x.BetAmount,
                BetTime = x.BetTime,
                BetType = x.BetType,
                Currency = x.Currency,
                GameCode = x.GameCode,
                GameInfo = x.GameInfoData,
                GameName = x.GameName,
                GameType = x.GameType,
                JackpotBetAmount = x.JackpotBetAmount,
                JackpotWinAmount = x.JackpotWinAmount,
                Platform = x.Platform,
                PlatformTxId = x.PlatformTxId,
                RealBetAmount = x.RealBetAmount,
                RealWinAmount = x.RealWinAmount,
                RoundId = x.RoundId,
                SettleStatus = x.SettleStatus,
                Turnover = x.Turnover,
                TxStatus = x.TxStatus,
                TxTime = x.TxTime,
                UpdateTime = x.UpdateTime,
                UserId = x.UserId,
                WinAmount = x.WinAmount
            }).ToList();

            return response;
        }
    }
}