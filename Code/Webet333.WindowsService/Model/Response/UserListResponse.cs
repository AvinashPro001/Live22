using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.WindowsService.Model.Response
{


    public class Datum
    {
        public string Username { get; set; }
        public string GameName { get; set; }
        public string UserId { get; set; }
        public string Mobile { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Prefix { get; set; }
    }

    public class UserListResponse
    {
        public string message { get; set; }
        public List<Datum> data { get; set; }
    }
}
