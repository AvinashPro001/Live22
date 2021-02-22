using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.Kiss918
{
    public class Kiss918RandomUsernameResponse
    {
        [JsonProperty("account")]
        public string Account { get; set; }

        [JsonProperty("code")]
        public int Code { get; set; }

        [JsonProperty("msg")]
        public string Msg { get; set; }

        [JsonProperty("success")]
        public bool Success { get; set; }
    }
}
