using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Account
{
   public class SmsUsersList
    {
        [JsonProperty(PropertyName ="userName")]
        public string UserName { get; set; }

        [JsonProperty(PropertyName = "mobileNo")]
        public string MobileNo { get; set; }
    }
}
