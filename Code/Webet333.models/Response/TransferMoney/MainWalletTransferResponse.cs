using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.TransferMoney
{
    public class MainWalletTransferResponse
    {
        public Guid TransactionId { get; set; }
        public decimal Amount { get; set; }
        public decimal CurrentBalance { get; set; }
        public string Message { get; set; }
        public int ErrorCode { get; set; }
    }
}
