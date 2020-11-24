using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Webet333.models.Request.Game.DG
{
    public class DgTransferRequest : GetByIdRequest
    {
        [Required]
        [JsonProperty(PropertyName ="method")]
        public string Method { get; set; }

        [Required]
        [JsonProperty(PropertyName = "amount")]
        public string Amount { get; set; }
    }
}
