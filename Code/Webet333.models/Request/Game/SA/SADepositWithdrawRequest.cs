using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Game.SA
{
    public class SADepositWithdrawRequest:GetByIdRequest
    {
        [JsonProperty(PropertyName ="amount")]
        public decimal Amount { get; set; }
    }
}
