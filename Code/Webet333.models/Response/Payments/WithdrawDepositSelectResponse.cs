using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.Payments
{
    public class WithdrawDepositSelectResponse
    {
        [JsonProperty("Created")]
        public DateTime Created { get; set; }

        [JsonProperty("Amount")]
        public int Amount { get; set; }

        [JsonProperty("Method")]
        public string Method { get; set; }

        [JsonProperty("Status")]
        public string Status { get; set; }

        [JsonProperty("Type")]
        public string Type { get; set; }

        [JsonProperty("Total")]
        public int Total { get; set; }

        [JsonProperty("OffSet")]
        public int OffSet { get; set; }
    }
}
