using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.Pussy888
{
    public class TransferMoneyResponse
    {
        public string acc { get; set; }
        public int code { get; set; }
        public int db_index { get; set; }
        public string faildbs { get; set; }
        public bool isDeal { get; set; }
        public bool isProTime { get; set; }
        public bool isalldbok { get; set; }
        public string maxsetmoney { get; set; }
        public string money { get; set; }
        public string msg { get; set; }
        public string s_orderid { get; set; }
        public string settime { get; set; }
        public bool success { get; set; }
    }
}
