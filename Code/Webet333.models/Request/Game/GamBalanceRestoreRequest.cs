using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game
{
    public class GamBalanceRestoreRequest : GetByIdRequestWithRequired
    {
        [Required]
        [JsonProperty(PropertyName = "kiss918wallet")]
        public decimal Kiss918Wallet { get; set; }

        [Required]
        [JsonProperty(PropertyName = "maxbetwallet")]
        public decimal MaxBetWallet { get; set; }

        [Required]
        [JsonProperty(PropertyName = "jokerwallet")]
        public decimal JokerWallet { get; set; }

        [Required]
        [JsonProperty(PropertyName = "agwallet")]
        public decimal AGWallet { get; set; }

        [Required]
        [JsonProperty(PropertyName = "m8wallet")]
        public decimal M8Wallet { get; set; }

        [Required]
        [JsonProperty(PropertyName = "playtechwallet")]
        public decimal PlayTechWallet { get; set; }

        [Required]
        [JsonProperty(PropertyName = "mega888wallet")]
        public decimal Mega888Wallet { get; set; }

        [Required]
        [JsonProperty(PropertyName = "dgwallet")]
        public decimal DgWallet { get; set; }

        [Required]
        [JsonProperty(PropertyName = "sexywallet")]
        public decimal SexyBaccaratWallet { get; set; }

        [Required]
        [JsonProperty(PropertyName = "sawallet")]
        public decimal SAWallet { get; set; }

        [Required]
        [JsonProperty(PropertyName = "pussy888wallet")]
        public decimal Pussy888Wallet { get; set; }

        [Required]
        [JsonProperty(PropertyName = "allbetwallet")]
        public decimal AllBetWallet { get; set; }

        [Required]
        [JsonProperty(PropertyName = "WMwallet")]
        public decimal WMWallet { get; set; }

        [Required]
        [JsonProperty(PropertyName = "pragmaticwallet")]
        public decimal PragmaticWallet { get; set; }

        [Required]
        [JsonProperty(PropertyName = "yeebetwallet")]
        public decimal YeeBetWallet { get; set; }

        [Required]
        [JsonProperty(PropertyName = "sbowallet")]
        public decimal SBOWallet { get; set; }
    }
}