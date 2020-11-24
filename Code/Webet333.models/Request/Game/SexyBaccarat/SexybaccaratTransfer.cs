using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Webet333.models.Request.Game.SexyBaccarat
{
    public class SexybaccaratTransfer : GetByIdRequest
    {
        [Required]
        [JsonProperty(PropertyName = "amount")]
        public decimal Amount { get; set; }
    }
}
