using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Webet333.models.Response.Game.SexyBaccarat;

namespace Webet333.models.Mapping.Game
{
    public class SexyBaccaratServicesMapping
    {
        public List<BettingDetailsInsertResponse> Map(List<Transaction> List)
        {

            var response = List.Select(x => new BettingDetailsInsertResponse
            {
                BetAmount = x.BetAmount,
                BetType = x.BetType,
                Currency = x.Currency,
                DealerDomain = JsonConvert.DeserializeObject<GameInfo>(x.GameInfo).DealerDomain,
                GameCode = x.GameCode,
                GameType = x.GameType,
                Id = x.Id,
                Ip = JsonConvert.DeserializeObject<GameInfo>(x.GameInfo).Ip,
                JackpotBetAmount = x.JackpotBetAmount,
                JackpotWinAmount = x.JackpotWinAmount,
                Odds = JsonConvert.DeserializeObject<GameInfo>(x.GameInfo).Odds,
                Platform = x.Platform,
                PlatformTxId = x.PlatformTxId,
                RealBetAmount = x.RealBetAmount,
                RealWinAmount = x.RealWinAmount,
                Result = string.Join(",", JsonConvert.DeserializeObject<GameInfo>(x.GameInfo).Result),
                RoundId = x.RoundId,
                RoundStartTime = JsonConvert.DeserializeObject<GameInfo>(x.GameInfo).RoundStartTime,
                Status = JsonConvert.DeserializeObject<GameInfo>(x.GameInfo).Status,
                TableId = JsonConvert.DeserializeObject<GameInfo>(x.GameInfo).TableId,
                Turnover = x.Turnover,
                TxStatus = x.TxStatus,
                TxTime = x.TxTime.ToString(),
                UpdateTime = x.UpdateTime.ToString(),
                UserId = x.UserId,
                WinAmount = x.WinAmount,
                WinLoss = JsonConvert.DeserializeObject<GameInfo>(x.GameInfo).WinLoss,
                Winner = JsonConvert.DeserializeObject<GameInfo>(x.GameInfo).Winner,
            }).ToList();
            return response;
        }

    }
}
