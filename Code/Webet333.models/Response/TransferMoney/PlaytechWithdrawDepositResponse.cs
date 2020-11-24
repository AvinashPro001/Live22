using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.TransferMoney
{
    public class PlaytechWithdrawDepositResponse
    {
        public PlaytechTransferResult result { get; set; }
        public string error { get; set; }
        public string errorcode { get; set; }
    }

    public class PlaytechTransferResult
    {
        public string amount { get; set; }
        public string currentplayerbalance { get; set; }
        public string executiontime { get; set; }
        public object externaltransactionid { get; set; }
        public object instantcashtype { get; set; }
        public string kiosktransactionid { get; set; }
        public string kiosktransactiontime { get; set; }
        public string ptinternaltransactionid { get; set; }
        public string result { get; set; }
    }
}
