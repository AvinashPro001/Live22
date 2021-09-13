using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Webet333.models.Response.Game.JDB
{
    public class JDBGetBalanceResponse : JDBDefaultResponse
    {
        [JsonProperty("results")]
        public List<Result> Results { get; set; }

        [JsonProperty("count")]
        public long Count { get; set; }

        [JsonProperty("querytime")]
        public DateTime Querytime { get; set; }
    }

    public partial class Result
    {
        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("balance")]
        public string Balance { get; set; }

        [JsonProperty("lastModified")]
        public DateTime LastModified { get; set; }
    }
}