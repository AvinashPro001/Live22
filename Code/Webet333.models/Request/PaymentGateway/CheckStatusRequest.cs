using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Webet333.models.Request.PaymentGateway
{
    public class CheckStatusRequest
    {
        //[Required]
        [JsonProperty(PropertyName ="token")]
        public string Token { get; set; }
    }
}
