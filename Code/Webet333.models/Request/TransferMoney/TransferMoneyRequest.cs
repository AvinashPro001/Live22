using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Webet333.models.Request.TransferMoney
{
    public class TransferMoneyRequest
    {
        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "fromWalletId")]
        public string FromWalletId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "toWalletId")]
        public string ToWalletId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "amount")]
        public decimal Amount { get; set; }
    }
}
