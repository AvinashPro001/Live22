using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Account
{
    public class AdminBehaviourReportResponse
    {
        public string Username { get; set; }

        public string Name { get; set; }

        public string MobileNo { get; set; }
        public string UserICNumber { get; set; }
        public decimal TotalDeposit { get; set; }
        public decimal TotalWithdraw { get; set; }
        public decimal TotalBonus { get; set; }
    }
}
