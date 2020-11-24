using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Webet333.models.Request.Account
{
    public class OtpVerifiedRequest
    {
        [Required]
        [JsonProperty(PropertyName = "otp")]
        public string OTP { get; set; }
    }
}
