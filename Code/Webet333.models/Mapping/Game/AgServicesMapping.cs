using System.Collections.Generic;
using System.Linq;
using Webet333.models.Response.Game;

namespace Webet333.models.Mapping.Game
{
    public class AgServicesMapping
    {
        public List<MappingAGServices> Map(List<Tran> tranList)
        {
            var response = tranList.Select(x=>new MappingAGServices{ 
                id=x.id,
                bankerPoint = x.details.bankerPoint,
                cardList = x.details.cardList,
                cardNum = x.details.cardNum,
                currency=x.currency,
                dragonPoint=x.details.dragonPoint,
                game_code=x.game_code,
                game_type=x.game_type,
                ip=x.ip,
                jackpotcomm=x.jackpotcomm,
                jackpotwin=x.jackpotwin,
                operator_id = x.operator_id,
                pair = x.details.pair,
                platform_type = x.platform_type,
                playerPoint = x.details.playerPoint,
                recaculate_time = x.recaculate_time,
                play_type = x.play_type,
                remark = x.remark,
                round = x.round,
                shoeCode = x.details.shoeCode,
                stake = x.stake,
                status = x.status,
                table_code = x.table_code,
                tigerPoint = x.details.tigerPoint,
                transaction_time = x.transaction_time,
                trans_id = x.trans_id,
                user_id = x.user_id,
                valid_stake = x.valid_stake,
                vid = x.details.vid,
                winlost_amount = x.winlost_amount
            }).ToList();
            return response;
        }
    }
}
