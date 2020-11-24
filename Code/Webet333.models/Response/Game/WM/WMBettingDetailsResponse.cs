using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.WM
{
    public class WMBettingResult
    {
        public string user { get; set; }
        public string betId { get; set; }
        public string betTime { get; set; }
        public string beforeCash { get; set; }
        public string bet { get; set; }
        public string validbet { get; set; }
        public string water { get; set; }
        public string result { get; set; }
        public string betCode { get; set; }
        public string betResult { get; set; }
        public string waterbet { get; set; }
        public string winLoss { get; set; }
        public string ip { get; set; }
        public string gid { get; set; }
        public string @event { get; set; }
        public string eventChild { get; set; }
        public string round { get; set; }
        public string subround { get; set; }
        public string tableId { get; set; }
        public string commission { get; set; }
        public string settime { get; set; }
        public string reset { get; set; }
        public string gameResult { get; set; }
        public string gname { get; set; }
    }

    public class WMBettingDetailsResponse
    {
        public int errorCode { get; set; }
        public string errorMessage { get; set; }
        public List<WMBettingResult> result { get; set; }
    }


}
