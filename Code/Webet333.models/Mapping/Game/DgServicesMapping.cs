using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Webet333.models.Response.Game.DG;

namespace Webet333.models.Mapping.Game
{
    public class DgServicesMapping
    {
        public List<DgBettingDetailsResponse> Map(List<Lists> List)
        {
            var response = List.Select(x => new DgBettingDetailsResponse
            {
                id = x.id,
                tableId = x.tableId,
                shoeId = x.shoeId,
                playId = x.playId,
                lobbyId = x.lobbyId,
                gameType = x.gameType,
                gameId = x.gameId,
                memberId = x.memberId,
                parentId = x.parentId,
                betTime =Convert.ToDateTime(x.betTime),
                calTime = Convert.ToDateTime(x.calTime),
                winOrLoss = x.winOrLoss,
                balanceBefore = x.balanceBefore,
                betPoints = x.betPoints,
                betPointsz = x.betPointsz,
                availableBet = x.availableBet,
                userName = x.userName,
                ip = x.ip,
                ext = x.ext,
                isRevocation = x.isRevocation,
                currencyId = x.currencyId,
                deviceType = x.deviceType,
                roadid = x.roadid,
                pluginid = x.pluginid,
                result= JsonConvert.DeserializeObject<DGResult>(x.result).result,
                pokerBanker =JsonConvert.DeserializeObject<DGResult>(x.result).poker.banker,
                pokerPlayer = JsonConvert.DeserializeObject<DGResult>(x.result).poker.player,
                betDetailsBanker = JsonConvert.DeserializeObject<DGBetDetail>(x.result).banker,
                betDetailsBankerW = JsonConvert.DeserializeObject<DGBetDetail>(x.result).bankerW
            }).ToList();
            return response;
        }
    }
}
