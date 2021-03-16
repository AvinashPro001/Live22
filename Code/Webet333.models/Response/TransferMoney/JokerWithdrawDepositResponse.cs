using System;

namespace Webet333.models.Response.TransferMoney
{
    public class JokerWithdrawDepositResponse
    {
        public string RequestID { get; set; }

        public string Username { get; set; }

        public DateTime Time { get; set; }

        public decimal Credit { get; set; }

        public decimal BeforeCredit { get; set; }

        public decimal OutstandingCredit { get; set; }

        public string Message { get; set; }
    }
}