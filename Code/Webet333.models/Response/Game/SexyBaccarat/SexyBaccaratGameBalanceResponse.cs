using System;

namespace Webet333.models.Response.Game.SexyBaccarat
{

    public partial class SexyBaccaratGameBalanceResponse
    {
        public SexyBalanceResult[] results { get; set; }

        public long count { get; set; }

        public DateTimeOffset querytime { get; set; }

        public string status { get; set; }

        public string desc { get; set; }
    }

    public partial class SexyBalanceResult
    {
        public string userId { get; set; }

        public decimal balance { get; set; }

        public DateTimeOffset lastModified { get; set; }
    }
}
