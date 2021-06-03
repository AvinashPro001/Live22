using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.User
{
    public class RewardListResponse
    {
        [JsonProperty("Created")]
        public DateTime Created { get; set; }

        [JsonProperty("TransactionNo")]
        public string TransactionNo { get; set; }

        [JsonProperty("TransactionType")]
        public string TransactionType { get; set; }

        [JsonProperty("Amount")]
        public string Amount { get; set; }

        [JsonProperty("CurrentBalance")]
        public decimal CurrentBalance { get; set; }

        [JsonProperty("Total")]
        public int Total { get; set; }

        [JsonProperty("OffSet")]
        public int OffSet { get; set; }
    }
}
