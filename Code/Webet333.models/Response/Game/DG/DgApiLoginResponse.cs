using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.DG
{
    public class DgApiLoginResponse
    {
        public int codeId { get; set; }
        public string token { get; set; }
        public string lang { get; set; }
        public string random { get; set; }
        public List<string> list { get; set; }
        public string domains { get; set; }
    }
}
