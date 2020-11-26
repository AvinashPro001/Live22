using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Account
{
    public class AdminBehaviourReportRequest
    {
        public string FromDate { get; set; }

        public string ToDate { get; set; }

        public int DepositTimes { get; set; }

        public bool PromotionApply { get; set; }

        public bool PlaySlot { get; set; }

        public bool PlaySports { get; set; }

        public bool PlayLiveCasino { get; set; }

        public decimal DepositAmount { get; set; }

        public decimal LoseAmount { get; set; }

        public decimal WinAmount { get; set; }

    }
}
