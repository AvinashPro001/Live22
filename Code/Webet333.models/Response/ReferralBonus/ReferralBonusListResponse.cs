using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.ReferralBonus
{
    public class ReferralBonusListResponse
    {
        [JsonProperty("Username")]
        public string Username { get; set; }

        [JsonProperty("ReferUsername")]
        public string ReferUsername { get; set; }

        [JsonProperty("Turnover")]
        public int Turnover { get; set; }

        [JsonProperty("ReferPercentage")]
        public double ReferPercentage { get; set; }

        [JsonProperty("ReferralBonus")]
        public double ReferralBonus { get; set; }

        [JsonProperty("CalculationDate")]
        public DateTime CalculationDate { get; set; }

        [JsonProperty("Created")]
        public DateTime Created { get; set; }

        [JsonProperty("Total")]
        public int Total { get; set; }

        [JsonProperty("OffSet")]
        public int OffSet { get; set; }
    }
}
