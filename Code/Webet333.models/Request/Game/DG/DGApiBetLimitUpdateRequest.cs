using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Game.DG
{
    public class DGApiBetLimitUpdateRequest
    {
        public string token { get; set; }
        public string random { get; set; }
        public string data { get; set; }
        public BettingLimitMember member { get; set; }
    }

    public class BettingLimitMember
    {
        public string username { get; set; }
    }
}
