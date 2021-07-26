using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.Payments
{
    public class PaymentWithdrawalListResponse
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("similarPercentage")]
        public decimal SimilarPercentage { get; set; }

        [JsonProperty("orderId")]
        public string OrderId { get; set; }

        [JsonProperty("userId")]
        public Guid UserId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("userName")]
        public string UserName { get; set; }

        [JsonProperty("walletBalance")]
        public decimal WalletBalance { get; set; }

        [JsonProperty("bankId")]
        public Guid BankId { get; set; }

        [JsonProperty("bankName")]
        public string BankName { get; set; }

        [JsonProperty("accountName")]
        public string AccountName { get; set; }

        [JsonProperty("accountNo")]
        public string AccountNo { get; set; }

        [JsonProperty("walletId")]
        public Guid WalletId { get; set; }

        [JsonProperty("walletName")]
        public string WalletName { get; set; }

        [JsonProperty("withdrawalAmount")]
        public decimal WithdrawalAmount { get; set; }

        [JsonProperty("verified")]
        public string Verified { get; set; }

        [JsonProperty("verifiedBy")]
        public Guid VerifiedBy { get; set; }

        [JsonProperty("operatorName")]
        public string OperatorName { get; set; }

        [JsonProperty("verifiedAt")]
        public DateTime VerifiedAt { get; set; }

        [JsonProperty("created")]
        public DateTime Created { get; set; }

        [JsonProperty("createdByName")]
        public string CreatedByName { get; set; }

        [JsonProperty("modified")]
        public DateTime Modified { get; set; }

        [JsonProperty("modifiedByName")]
        public string ModifiedByName { get; set; }

        [JsonProperty("promotionTitle")]
        public string PromotionTitle { get; set; }

        [JsonProperty("total")]
        public long Total { get; set; }

        [JsonProperty("offSet")]
        public long OffSet { get; set; }
    }
}