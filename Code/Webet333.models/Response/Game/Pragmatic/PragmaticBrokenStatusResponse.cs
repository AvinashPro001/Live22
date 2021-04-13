using System.Collections.Generic;

namespace Webet333.models.Response.Game.Pragmatic
{
    public class PragmaticBrokenStatusResponse
    {
        public string error { get; set; }

        public string description { get; set; }

        public string playerId { get; set; }

        public List<BrokenGameList> data { get; set; }
    }

    public class BrokenGameList
    {
        public string gameId { get; set; }

        public string playSessionID { get; set; }

        public double betAmount { get; set; }
    }
}