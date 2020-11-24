using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Webet333.models.Response.Payments
{
    public class DepositResponse
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public Guid UserId { get; set; }

        [JsonProperty(PropertyName = "orderId")]
        public string OrderId { get; set; }

        [JsonProperty(PropertyName = "userEmail")]
        public string UserEmail { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "username")]
        public string UserName { get; set; }

        [JsonProperty(PropertyName = "walletId")]
        public Guid WalletId { get; set; }

        [JsonProperty(PropertyName = "walletName")]
        public string WalletName { get; set; }

        [JsonProperty(PropertyName = "bankId")]
        public Guid BankId { get; set; }

        [JsonProperty(PropertyName = "bankName")]
        public string BankName { get; set; }

        [JsonProperty(PropertyName = "depositMethodId")]
        public Guid DepositMethodId { get; set; }

        [JsonProperty(PropertyName = "depositMethod")]
        public string DepositMethod { get; set; }

        [JsonProperty(PropertyName = "promotionId")]
        public Guid PromotionId { get; set; }

        [JsonProperty(PropertyName = "promotionTitle")]
        public string PromotionTitle { get; set; }

        [JsonProperty(PropertyName = "amount")]
        public double Amount { get; set; }

        [JsonProperty(PropertyName = "referenceNo")]
        public string ReferenceNo { get; set; }

        [JsonProperty(PropertyName = "depositTime")]
        public string DepositTime { get; set; }

        [JsonProperty(PropertyName = "verified")]
        public string Verified { get; set; }

        [JsonProperty(PropertyName = "verifiedBy")]
        public Guid VerifiedBy { get; set; }

        [JsonProperty(PropertyName = "adminRemarks")]
        public string AdminRemarks { get; set; }

        [JsonProperty(PropertyName = "operatorName")]
        public string OperatorName { get; set; }

        [JsonProperty(PropertyName = "receipts")]
        public List<DepositReceipts> Receipts { get; set; }

        [JsonProperty(PropertyName = "created")]
        public DateTime Created { get; set; }

        [JsonProperty(PropertyName = "modified")]
        public DateTime Modified { get; set; }
    }

    public class DepositReceipts
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }

        [JsonProperty(PropertyName = "usersDepositId")]
        public Guid UsersDepositId { get; set; }

        [JsonProperty(PropertyName = "receipt")]
        public string Receipt { get; set; }
    }
}
