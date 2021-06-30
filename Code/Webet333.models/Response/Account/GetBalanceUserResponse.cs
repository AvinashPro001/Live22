using Newtonsoft.Json;

namespace Webet333.models.Response.Account
{
    public class GetBalanceUserResponse
    {
        public string Username { get; set; }

        public string Username918 { get; set; }

        public string Pussy888Username { get; set; }

        public long UserId { get; set; }

        public string VendorMemberId { get; set; }

        public string Mega888LoginId { get; set; }

        public string Password { get; set; }

        public string AGGamePrefix { get; set; }

        public string PlaytechGamePrefix { get; set; }

        public string DGGamePrefix { get; set; }

        public string SAGamePrefix { get; set; }

        public string SexyGamePrefix { get; set; }

        public string Mega888GamePrefix { get; set; }

        public string Kiss918GamePrefix { get; set; }

        public string JokerGamePrefix { get; set; }

        public string MaxbetGamePrefix { get; set; }

        public string M8GamePrefix { get; set; }

        public string Pussy888GamePrefix { get; set; }

        public string AllBetGamePrefix { get; set; }

        public string PragmaticGamePrefix { get; set; }

        public string WMGamePrefix { get; set; }

        public string YEEBETGamePrefix { get; set; }

        public string SBOGamePrefix { get; set; }

        public string GamePlayGamePrefix { get; set; }

        public string MobileNo { get; set; }

        public string GameSupport { get; set; }

        public decimal? MainWalletAmount { get; set; }

        public string MainWalletId { get; set; }

        public string ToWalletId { get; set; }

        public bool? ToWalletMaintenance { get; set; }
    }

    public class GameSupport
    {
        [JsonProperty("IsAG")]
        public bool IsAG { get; set; }

        [JsonProperty("IsDG")]
        public bool IsDG { get; set; }

        [JsonProperty("IsSA")]
        public bool IsSA { get; set; }

        [JsonProperty("IsPragmatic")]
        public bool IsPragmatic { get; set; }

        [JsonProperty("IsPlaytech")]
        public bool IsPlaytech { get; set; }

        [JsonProperty("IsSexyBaccarat")]
        public bool IsSexyBaccarat { get; set; }

        [JsonProperty("IsWM")]
        public bool IsWM { get; set; }

        [JsonProperty("IsAllBet")]
        public bool IsAllBet { get; set; }

        [JsonProperty("IsMaxbet")]
        public bool IsMaxbet { get; set; }

        [JsonProperty("IsM8")]
        public bool IsM8 { get; set; }

        [JsonProperty("Is918Kiss")]
        public bool Is918Kiss { get; set; }

        [JsonProperty("IsMega888")]
        public bool IsMega888 { get; set; }

        [JsonProperty("IsJoker")]
        public bool IsJoker { get; set; }

        [JsonProperty("IsPussy888")]
        public bool IsPussy888 { get; set; }
    }
}