using System.Collections.Generic;

namespace Webet333.models.Response.Game.YEEBET
{
    public class YEEBETBettingDetailsResponse : YEEBETBasicResponse
    {
        public int arraysize { get; set; }

        public List<YEEBETBettingDetailsResult> array { get; set; }
    }

    public class YEEBETBettingDetailsResult
    {
        public int gameid { get; set; }

        public int createtime { get; set; }

        public int userstatus { get; set; }

        public string betpoint { get; set; }

        public double betodds { get; set; }

        public int userid { get; set; }

        public double commamount { get; set; }

        public int gameroundid { get; set; }

        public string uid { get; set; }

        public int settletime { get; set; }

        public string gameresult { get; set; }

        public double winlost { get; set; }

        public int gametype { get; set; }

        public string currency { get; set; }

        public int id { get; set; }

        public int state { get; set; }

        public string describe { get; set; }

        public object gameno { get; set; }

        public int bettype { get; set; }

        public int cid { get; set; }

        public string username { get; set; }

        public double betamount { get; set; }
    }
}