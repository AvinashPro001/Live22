using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Game
{
    public class SlotsPlayerLogRequest
    {
        public string Username { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public bool SaveInDB  { get; set; }

    }
}
