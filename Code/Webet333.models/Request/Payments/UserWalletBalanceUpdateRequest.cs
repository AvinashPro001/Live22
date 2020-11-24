using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Payments
{

    public class UserWalletBalanceUpdateRequest
    {

        [Required]
        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "m8walletName")]
        public string M8WalletName { get; set; }

        [Required]
        [RegularExpression(@"^-?([0-9]+(\.[0-9]{1,2})?)$", ErrorMessage = "Enter Valid Amount")]
        [JsonProperty(PropertyName = "m8amount")]
        public string M8Amount { get; set; }

        [Required]
        [JsonProperty(PropertyName = "playtechwalletName")]
        public string PlaytechWalletName { get; set; }

        [Required]
        [RegularExpression(@"^-?([0-9]+(\.[0-9]{1,2})?)$", ErrorMessage = "Enter Valid Amount")]
        [JsonProperty(PropertyName = "playtechamount")]
        public string PlaytechAmount { get; set; }

        [Required]
        [JsonProperty(PropertyName = "agwalletName")]
        public string AGWalletName { get; set; }

        [Required]
        [RegularExpression(@"^-?([0-9]+(\.[0-9]{1,2})?)$", ErrorMessage = "Enter Valid Amount")]
        [JsonProperty(PropertyName = "agamount")]
        public string AgAmount { get; set; }

        [Required]
        [JsonProperty(PropertyName = "_918walletName")]
        public string _918WalletName { get; set; }

        [Required]
        [RegularExpression(@"^-?([0-9]+(\.[0-9]{1,2})?)$", ErrorMessage = "Enter Valid Amount")]
        [JsonProperty(PropertyName = "_918amount")]
        public string _918Amount { get; set; }

        [Required]
        [JsonProperty(PropertyName = "jokerwalletName")]
        public string JokerWalletName { get; set; }

        [Required]
        [RegularExpression(@"^-?([0-9]+(\.[0-9]{1,2})?)$", ErrorMessage = "Enter Valid Amount")]
        [JsonProperty(PropertyName = "jokeramount")]
        public string JokerAmount { get; set; }

    }

}