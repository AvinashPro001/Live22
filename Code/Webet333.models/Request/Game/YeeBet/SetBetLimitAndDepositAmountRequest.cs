using Newtonsoft.Json;
using System;

namespace Webet333.models.Request.Game.YeeBet
{
    public class SetBetLimitAndDepositAmountRequest
    {
        [JsonProperty("gameName")]
        public string GameName { get; set; }

        [JsonProperty("minDepositAmount")]
        public decimal MinDepositAmount { get; set; }

        [JsonProperty("maxDepositAmount")]
        public decimal MaxDepositAmount { get; set; }

        [JsonProperty("betLimitId")]
        public string BetLimitId { get; set; }
    }

    public class SetBetLimitAndDepositAmountUpdateRequest : SetBetLimitAndDepositAmountRequest
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }
    }
}