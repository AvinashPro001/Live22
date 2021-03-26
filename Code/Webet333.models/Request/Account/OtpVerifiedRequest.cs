using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Account
{
    public class OtpVerifiedRequest
    {
        [Required]
        [JsonProperty(PropertyName = "otp")]
        public string OTP { get; set; }
    }
}