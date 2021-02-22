using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.Playtech
{
    public class PlaytechRegisterResponse
    {
        [JsonProperty("error")]
        public string Error { get; set; }

        [JsonProperty("errorcode")]
        public int Errorcode { get; set; }

        [JsonProperty("result")]
        public PlaytechRegisterResult Result { get; set; }
    }

    public class PlaytechRegisterResult
    {

        [JsonProperty("result")]
        public string Result { get; set; }

        [JsonProperty("playername")]
        public string Playername { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }

        [JsonProperty("executiontime")]
        public Executiontime Executiontime { get; set; }

        [JsonProperty("error")]
        public bool Error { get; set; }

    }

    public class Executiontime
    {
        [JsonProperty("webapi")]
        public string Webapi { get; set; }

        [JsonProperty("skywind")]
        public string Skywind { get; set; }
    }
}
