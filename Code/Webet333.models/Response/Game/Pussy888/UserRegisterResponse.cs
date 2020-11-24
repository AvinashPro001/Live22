using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.Pussy888
{
    public class UserResponseAPI
    {
        public int code { get; set; }
        public string msg { get; set; }
        public bool success { get; set; }
        public int type { get; set; }

    }

    public class UserRegisterResponse
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public int Type { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public bool Success { get; set; }
    }
}
