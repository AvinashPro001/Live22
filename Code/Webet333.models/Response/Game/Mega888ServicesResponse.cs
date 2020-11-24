using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game
{
  

    public class MegaDetails
    {
        public string loginId { get; set; }
        public string memo { get; set; }
        public string statisticDate { get; set; }
        public string userId { get; set; }
        public decimal bet { get; set; }
        public decimal yield { get; set; }
        public string name { get; set; }
        public string tel { get; set; }
        public string sn { get; set; }
        public string idx { get; set; }
        public decimal win { get; set; }
    }

    public class Mega888ServicesResponse
    {
        public object id { get; set; }
        public List<MegaDetails> result { get; set; }
        public object error { get; set; }
        public string jsonrpc { get; set; }
    }
}
