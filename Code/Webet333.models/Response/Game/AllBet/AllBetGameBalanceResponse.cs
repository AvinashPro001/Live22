using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.AllBet
{
    public class AllBetGameBalanceResponse
    {
        public string error_code { get; set; }

        public string message { get; set; }

        public string currency { get; set; }

        public string balance { get; set; }
    }
}
