using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game
{
    public class UserRebateHistoryResponse
    {

        public string GameName { get; set; }

        public decimal Turnover { get; set; }

        public decimal Bet { get; set; }

        public decimal WinLose { get; set; }

        public decimal CommAmount { get; set; }

        public DateTime Created { get; set; }

        public string GameType { get; set; }

        public Decimal Rolling { get; set; }

    }
}
