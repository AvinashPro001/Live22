using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.Account
{
    public class GetUsernameByIdResponse
    {
        [JsonProperty("userName")]
        public string UserName { get; set; }

        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }

        [JsonProperty("userName918")]
        public string UserName918 { get; set; }

        [JsonProperty("agUsername")]
        public string AGUsername { get; set; }

        [JsonProperty("playtechUsername")]
        public string PlaytechUsername { get; set; }

        [JsonProperty("dgUsername")]
        public string DGUsername { get; set; }

        [JsonProperty("saUsername")]
        public string SAUsername { get; set; }

        [JsonProperty("sexyUsername")]
        public string SexyUsername { get; set; }

        [JsonProperty("jokerUsername")]
        public string JokerUsername { get; set; }

        [JsonProperty("m8Username")]
        public string M8Username { get; set; }

        [JsonProperty("allBetUsername")]
        public string AllBetUsername { get; set; }

        [JsonProperty("wmUsername")]
        public string WMUsername { get; set; }

        [JsonProperty("pragmaticUsername")]
        public string PragmaticUsername { get; set; }

        [JsonProperty("yeebetUsername")]
        public string YEEBETUsername { get; set; }

        [JsonProperty("sboUsername")]
        public string SBOUsername { get; set; }

        [JsonProperty("gameplayUsername")]
        public string GamePlayUsername { get; set; }

        [JsonProperty("maxbetUsername")]
        public string MaxbetUsername { get; set; }

        [JsonProperty("mega888Username")]
        public string Mega888Username { get; set; }

        [JsonProperty("pussy888Username")]
        public string Pussy888Username { get; set; }

        [JsonProperty("mainWalletAmount")]
        public decimal MainWalletAmount { get; set; }

        [JsonProperty("mainWalletId")]
        public Guid MainWalletId { get; set; }

        [JsonProperty("toWalletId")]
        public Guid ToWalletId { get; set; }

        [JsonProperty("toWalletMaintenance")]
        public bool ToWalletMaintenance { get; set; }

        [JsonProperty("gameSupport")]
        public string GameSupport { get; set; }
    }
}
