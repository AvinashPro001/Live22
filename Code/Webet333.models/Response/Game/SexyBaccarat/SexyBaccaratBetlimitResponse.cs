using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.SexyBaccarat
{

    public  class SexyBaccaratBetlimitResponse
    {
        public Sexybcrt Sexybcrt { get; set; }
    }

    public  class Sexybcrt
    {
        public Live Live { get; set; }
    }

    public class Live
    {
        public List<long> LimitId { get; set; }
    }

}
