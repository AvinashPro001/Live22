using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.Payments
{
    public class TransferRetriveResponse
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("orderId")]
        public string OrderId { get; set; }

        [JsonProperty("userId")]
        public Guid UserId { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("fromWalletId")]
        public Guid FromWalletId { get; set; }

        [JsonProperty("fromWallet")]
        public string FromWallet { get; set; }

        [JsonProperty("toWalletId")]
        public Guid ToWalletId { get; set; }

        [JsonProperty("toWallet")]
        public string ToWallet { get; set; }

        [JsonProperty("amount")]
        public decimal Amount { get; set; }

        [JsonProperty("verified")]
        public string Verified { get; set; }

        [JsonProperty("created")]
        public DateTime Created { get; set; }

        [JsonProperty("createdByName")]
        public string CreatedByName { get; set; }

        [JsonProperty("modified")]
        public DateTime Modified { get; set; }

        [JsonProperty("Total")]
        public int Total { get; set; }

        [JsonProperty("OffSet")]
        public int OffSet { get; set; }
    }
}
