using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.Game.JDB
{
    public class JDBDepositWithdrawAPIResponse : JDBDefaultResponse
    {
        [JsonProperty("method")]
        public string Method { get; set; }

        [JsonProperty("databaseId")]
        public long DatabaseId { get; set; }

        [JsonProperty("currentBalance")]
        public string CurrentBalance { get; set; }

        [JsonProperty("lastModified")]
        public DateTimeOffset LastModified { get; set; }

        [JsonProperty("txCode")]
        public string TxCode { get; set; }

        [JsonProperty("amount")]
        public string Amount { get; set; }
    }
}