using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game
{
    public class AllInWalletRequest
    {
        [Required]
        [JsonProperty(PropertyName = "walletName")]
        public string WalletName { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }

        [JsonProperty(PropertyName = "amount")]
        public decimal Amount { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "fromWalletId")]
        public string FromWalletId { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "toWalletId")]
        public string ToWalletId { get; set; }
    }
}