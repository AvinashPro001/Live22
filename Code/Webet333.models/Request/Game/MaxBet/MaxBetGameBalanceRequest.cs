using Newtonsoft.Json;
using System;

namespace Webet333.models.Request.Game.MaxBet
{
    public class MaxBetGameBalanceRequest
    {
        [JsonProperty(PropertyName ="userid")]
        public Guid? UserId { get; set; }
    }
}
