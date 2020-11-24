using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.WindowsService.Model.Response
{

    public class Data
    {
        public string access_token { get; set; }
    }

    public class LoginResponse
    {
        public string message { get; set; }
        public Data data { get; set; }
    }
}
