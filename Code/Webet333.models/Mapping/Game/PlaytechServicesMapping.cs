using System;
using System.Collections.Generic;
using System.Linq;
using Webet333.models.Response.Game;

namespace Webet333.models.Mapping.Game
{
    public class PlaytechServicesMapping
    {
        public List<Result> Map(List<Result> result)
        {
            var response = result.Select(x => new Result
            {
                BET = x.BET,
                BALANCE = x.BALANCE,
                CURRENCYCODE = x.CURRENTBET,
                CURRENTBET = x.CURRENTBET,
                GAMECODE = x.GAMECODE,
                GAMEDATE = x.GAMEDATE,
                GAMEID = x.GAMEID,
                GAMENAME = x.GAMENAME,
                GAMETYPE = x.GAMETYPE,
                LIVENETWORK = x.LIVENETWORK,
                PLAYERNAME = x.PLAYERNAME,
                PROGRESSIVEBET = x.PROGRESSIVEBET,
                PROGRESSIVEWIN = x.PROGRESSIVEWIN,
                SESSIONID = x.SESSIONID,
                WIN = x.WIN,
                WINDOWCODE = x.WINDOWCODE
            }).ToList();
            return response;
        }
    }
}
