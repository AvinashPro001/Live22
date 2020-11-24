using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Payments
{
    public class AdjustUserBalanceRequest
    {
        [Required]
        [JsonProperty(PropertyName = "userId")]
        public Guid UserId { get; set; }

        [JsonProperty(PropertyName = "walletId")]
        public Guid? WalletId { get; set; }

        [Required]
        [RegularExpression(@"^-?([0-9]+(\.[0-9]{1,2})?)$", ErrorMessage = "Enter Valid Amount")]
        [JsonProperty(PropertyName = "amount")]
        public double Amount { get; set; }

        [JsonProperty(PropertyName = "adminRemark")]
        public string AdminRemarks { get; set; }
    }
}