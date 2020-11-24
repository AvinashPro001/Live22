using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.DG
{
    public class TransferMemberResponse
    {
        public string username { get; set; }
        public decimal balance { get; set; }
    }

    public class DgApiTransferResponse
    {
        public int codeId { get; set; }
        public string token { get; set; }
        public string random { get; set; }
        public string data { get; set; }
        public TransferMemberResponse member { get; set; }
    }
}
