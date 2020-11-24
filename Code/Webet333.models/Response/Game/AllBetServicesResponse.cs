using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game
{
    public class AllBetServicesResponse
    {
        public string endTime { get; set; }
        public string error_code { get; set; }
        public ICollection<History> histories { get; set; }
        public string message { get; set; }
        public string startTime { get; set; }
    }

    public class History
    {
        public string appType { get; set; }
        public string betAmount { get; set; }
        public string betNum { get; set; }
        public string betTime { get; set; }
        public string betType { get; set; }
        public string client { get; set; }
        public string commission { get; set; }
        public string currency { get; set; }
        public string exchangeRate { get; set; }
        public string gameResult { get; set; }
        public string gameRoundEndTime { get; set; }
        public string gameRoundId { get; set; }
        public string gameRoundStartTime { get; set; }
        public string gameType { get; set; }
        public string state { get; set; }
        public string tableName { get; set; }
        public string validAmount { get; set; }
        public string winOrLoss { get; set; }
    }
}
