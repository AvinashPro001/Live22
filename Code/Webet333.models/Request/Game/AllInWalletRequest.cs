using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Webet333.models.Request.Game
{
    public class AllInWalletRequest
    {
        [Required]
        [JsonProperty(PropertyName ="walletName")]
        public string WalletName { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }

        [JsonProperty(PropertyName = "amount")]
        public decimal? Amount { get; set; }
    }
}
