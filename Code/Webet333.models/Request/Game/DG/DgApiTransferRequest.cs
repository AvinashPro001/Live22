using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Game.DG
{
    public class TransferMember
    {
        public string username { get; set; }
        public decimal amount { get; set; }
    }

    public class DgApiTransferRequest
    {
        public string token { get; set; }
        public string random { get; set; }
        public string data { get; set; }
        public TransferMember member { get; set; }
    }
}
