using System.Collections.Generic;

namespace Webet333.models.Response.Game
{
    public class Kiss918BettingDetails
    {
        public string Account { get; set; }
        public string agentwin { get; set; }
        public int idx { get; set; }
        public object jtime { get; set; }
        public string memo { get; set; }
        public string mydate { get; set; }
        public string name { get; set; }
        public string press { get; set; }
        public string pump { get; set; }
        public string selfwin { get; set; }
        public string tel { get; set; }
        public int type { get; set; }
        public string win { get; set; }
        public string yield { get; set; }
    }

    public class Kiss918ServicesResponse
    {
        public int ViewTYPE { get; set; }
        public string msg { get; set; }
        public List<Kiss918BettingDetails> results { get; set; }
        public bool success { get; set; }
    }
}
