using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Game
{
    public class GameListUploadRequest
    {
        [JsonProperty(PropertyName = "file")]
        public string File { get; set; }

        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
    }
}
