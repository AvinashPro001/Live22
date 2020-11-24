using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Game.DG
{
    public class DgApiLoginRequest
    {
        public string token { get; set; }
        public string random { get; set; }
        public string lang { get; set; }
        public string domains { get; set; }
        public LoginMember member { get; set; }
    }

    public class LoginMember
    {
        public string username { get; set; }
        public string password { get; set; }
    }


}
