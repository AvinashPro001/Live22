using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Game.DG
{
  public class DgApiRegisterRequest
    {
        public string token { get; set; }
        public string random { get; set; }
        public string data { get; set; }
        public Member member { get; set; }
    }

    public class Member
    {
        public string username { get; set; }
        public string password { get; set; }
        public string currencyName { get; set; }
        public string winLimit { get; set; }
    }
}
