using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game
{
    public class UserWalletResponse
    {
        public Guid WalletId { get; set; }

        public string WalletName { get; set; }

        public decimal Amount { get; set; }

        public bool IsMain { get; set; }

        public bool isMaintenance { get; set; }
    }
}
