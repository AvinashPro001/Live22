using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.Payments
{
    public class TransactionResponse
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("userId")]
        public Guid UserId { get; set; }

        [JsonProperty("transactionId")]
        public Guid TransactionId { get; set; }

        [JsonProperty("currentBalance")]
        public double CurrentBalance { get; set; }

        [JsonProperty("transactionType")]
        public string TransactionType { get; set; }

        [JsonProperty("amount")]
        public string Amount { get; set; }

        [JsonProperty("transactionNo")]
        public string TransactionNo { get; set; }

        [JsonProperty("debitFrom")]
        public string DebitFrom { get; set; }

        [JsonProperty("creditTo")]
        public string CreditTo { get; set; }

        [JsonProperty("created")]
        public DateTime Created { get; set; }

        [JsonProperty("Total")]
        public int Total { get; set; }

        [JsonProperty("OffSet")]
        public int OffSet { get; set; }
    }


}
