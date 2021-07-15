using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Promotions
{
    public class PromotionApplySelectResponse
    {
        [JsonProperty("Id")]
        public Guid Id { get; set; }

        [JsonProperty("UserTurnover")]
        public decimal UserTurnover { get; set; }

        [JsonProperty("Title")]
        public string Title { get; set; }

        [JsonProperty("Username")]
        public string Username { get; set; }

        [JsonProperty("TurnoverTime")]
        public string TurnoverTime { get; set; }

        [JsonProperty("WinTurn")]
        public string WinTurn { get; set; }

        [JsonProperty("Created")]
        public DateTime Created { get; set; }

        [JsonProperty("Staus")]
        public string Staus { get; set; }

        [JsonProperty("TurnoverTarget")]
        public decimal TurnoverTarget { get; set; }

        [JsonProperty("TurnTarget")]
        public decimal TurnTarget { get; set; }

        [JsonProperty("ExpiryDate")]
        public DateTime ExpiryDate { get; set; }

        [JsonProperty("RemainingDay")]
        public int RemainingDay { get; set; }

        [JsonProperty("DepositAmount")]
        public decimal DepositAmount { get; set; }

        [JsonProperty("BonusAmount")]
        public decimal BonusAmount { get; set; }

        [JsonProperty("total")]
        public int Total { get; set; }

        [JsonProperty("offSet")]
        public int OffSet { get; set; }
    }
}
