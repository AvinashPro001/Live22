using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Payments
{
    public class WithdrawAmountList
    {
        public string Title { get; set; }
        public string Status { get; set; }
        public decimal WithdrawAmount { get; set; }
        public string Created { get; set; }
    }
}
