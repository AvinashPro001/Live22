using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Payments
{
    public class DepositInsertRequest
    {
        //[JsonIgnore]
        [JsonProperty(PropertyName = "userId")]
        public Guid UserId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "bankId")]
        public Guid BankId { get; set; }

        [JsonProperty(PropertyName = "depositMethodId")]
        public Guid DepositMethodId { get; set; }

        //[Required]
        [JsonProperty(PropertyName = "promotionId")]
        public string PromotionId { get; set; }

        [JsonProperty(PropertyName = "promotionApplyEligible")]
        public bool PromotionApplyEligible { get; set; }

        [Required]
        [JsonProperty(PropertyName = "amount")]
        public double Amount { get; set; }

        [Required]
        [JsonProperty(PropertyName = "referenceNo")]
        public string ReferenceNo { get; set; }

        [Required]
        [JsonProperty(PropertyName = "depositeTime")]
        public long DepositeTime { get; set; }

        [JsonProperty(PropertyName = "adminRemark")]
        public string AdminRemarks { get; set; }
    }

    public class DepositUpdateRequest : DepositInsertRequest
    {
        [Required]
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
    }
}
