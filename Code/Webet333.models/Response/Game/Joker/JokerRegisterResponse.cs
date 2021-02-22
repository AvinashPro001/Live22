using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.Joker
{
   public class JokerRegisterResponse
    {
        [JsonProperty("Status")]
        public string Status { get; set; }

        [JsonProperty("Data")]
        public JokerRegisterData Data { get; set; }

        [JsonProperty("error")]
        public bool? Error { get; set; }

        [JsonProperty("Message")]
        public string Message { get; set; }
    }

    public class JokerRegisterData
    {
        [JsonProperty("Username")]
        public string Username { get; set; }

        [JsonProperty("Status")]
        public string Status { get; set; }
    }
}
