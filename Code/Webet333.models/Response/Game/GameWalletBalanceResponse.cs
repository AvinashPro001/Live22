using Newtonsoft.Json;

namespace Webet333.models.Response.Game
{
    public class GameWalletBalanceResponse
    {
        [JsonProperty(PropertyName = "mainwallet")]
        public decimal MainWallet { get; set; }

        [JsonProperty(PropertyName = "kiss918wallet")]
        public decimal Kiss918Wallet { get; set; }

        [JsonProperty(PropertyName = "maxbetwallet")]
        public decimal MaxBetWallet { get; set; }

        [JsonProperty(PropertyName = "jokerwallet")]
        public decimal JokerWallet { get; set; }

        [JsonProperty(PropertyName = "agwallet")]
        public decimal AGWallet { get; set; }

        [JsonProperty(PropertyName = "m8wallet")]
        public decimal M8Wallet { get; set; }

        [JsonProperty(PropertyName = "playtechwallet")]
        public decimal PlayTechWallet { get; set; }

        [JsonProperty(PropertyName = "mega888wallet")]
        public decimal Mega888Wallet { get; set; }
    }
}
