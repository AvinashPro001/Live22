using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.DG
{
    public class BalanceMember
    {
        public string username { get; set; }
        public decimal balance { get; set; }
    }

    public class DgApiBalanceResponse
    {
        public int codeId { get; set; }
        public string token { get; set; }
        public string random { get; set; }
        public BalanceMember member { get; set; }
    }
}
