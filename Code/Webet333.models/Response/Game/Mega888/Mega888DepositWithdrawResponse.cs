using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.Mega888
{
    public class Mega888DepositWithdrawResponse
    {
        public object id { get; set; }

        public long result { get; set; }

        public Error error { get; set; }

        public string jsonrpc { get; set; }
    }

    public  class Error
    {
        public long code { get; set; }

        public string sn { get; set; }

        public string message { get; set; }

        public string reason { get; set; }

        public string action { get; set; }
    }
}
