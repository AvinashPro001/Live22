using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.Pragmatic
{
    public class PragmaticBettingDetailsResponse
    {
        public string playerID { get; set; }
        public string extPlayerID { get; set; }
        public string gameID { get; set; }
        public string playSessionID { get; set; }
        public string parentSessionID { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
        public string status { get; set; }
        public string type { get; set; }
        public string bet { get; set; }
        public string win { get; set; }
        public string currency { get; set; }
        public string jackpot { get; set; }
        public string bonusCode { get; set; }
    }
}
