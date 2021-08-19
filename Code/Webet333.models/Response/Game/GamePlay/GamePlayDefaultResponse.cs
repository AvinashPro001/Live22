﻿using Newtonsoft.Json;

namespace Webet333.models.Response.Game.GamePlay
{
    public class GamePlayDefaultResponse
    {
        [JsonProperty("status")]
        public long Status { get; set; }

        [JsonProperty("error_desc")]
        public string ErrorDesc { get; set; }
    }
}