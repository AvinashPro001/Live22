using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Payments
{
    public class WithdrawalRequest
    {
        [Required]
        [JsonProperty(PropertyName = "bankId")]
        public Guid BankId { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public Guid UserId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "accountNumber")]
        public string AccountNumber { get; set; }

        [Required]
        [JsonProperty(PropertyName = "accountName")]
        public string AccountName { get; set; }

        [Required]
        [JsonProperty(PropertyName = "amount")]
        public decimal Amount { get; set; }

        [JsonProperty(PropertyName = "adminRemark")]
        public string AdminRemarks { get; set; }
    }
}