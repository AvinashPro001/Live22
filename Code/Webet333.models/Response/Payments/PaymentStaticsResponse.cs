using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Payments
{
    public class PaymentStaticsResponse
    {
        public string BankName { get; set; }
        public Decimal TotalDeposit { get; set; }
        public Decimal TotalDepositAmount { get; set; }
        public Decimal TotalWithdraw { get; set; }
        public Decimal TotalWithdrawAmount { get; set; }
    }

    public class TotalUniqueCountResponse
    {
        public int TotalUniqueUser { get; set; }
    }
}
