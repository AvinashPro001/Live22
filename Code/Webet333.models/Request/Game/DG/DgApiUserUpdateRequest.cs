using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Game.DG
{
    public class DgApiUserUpdateRequest
    {
        public string token { get; set; }
        public string random { get; set; }

        public UpdateMember member { get; set; }
    }

    public class UpdateMember
    {
        public string username { get; set; }
        public string password { get; set; }

        public decimal winLimit { get; set; }
        public int status { get; set; }
    }
}
