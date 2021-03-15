using System;
using System.Collections.Generic;

namespace Webet333.models.Response.Game.Playtech
{
    public class PlaytechBrokenStatusResponse
    {
        public List<BrokenStatusResult> result { get; set; }
    }

    public class BrokenStatusResult
    {
        public string PLAYERNAME { get; set; }

        public string GAME { get; set; }

        public string CLIENTTYPE { get; set; }

        public string BET { get; set; }

        public int INFOBET { get; set; }

        public string JACKPOTBET { get; set; }

        public string REMOTEIP { get; set; }

        public string BROKENGAMETYPE { get; set; }

        public string STATUS { get; set; }

        public string GAMEDATE { get; set; }

        public DateTime? FINISHEDGAMEDATE { get; set; }

        public string FINISHEDGAMECODE { get; set; }

        public int RNUM { get; set; }
    }
}