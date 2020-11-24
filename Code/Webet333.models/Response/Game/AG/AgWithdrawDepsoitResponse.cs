using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.AG
{
    public class AgWithdrawDepsoitResponse
    {
        public long error_code { get; set; }

        public string message { get; set; }

        public string trans_id { get; set; }
    }
}
