using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Game.DG
{
    public class DGAPIGetBalanceRequest
    {
        public string token { get; set; }
        public string random { get; set; }
        public Username member { get; set; }
    }

    public class Username
    {
        public string username { get; set; }
    }
}
