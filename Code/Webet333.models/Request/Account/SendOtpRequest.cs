using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Account
{
    public class SendOtpRequest: GetByIdRequest
    {
        [Required]
        [JsonProperty(PropertyName = "mobileNo")]
        public string MobileNo { get; set; }

        [Required]
        [JsonProperty(PropertyName = "tri")]
        public bool Trio { get; set; }

        [Required]
        [JsonProperty(PropertyName = "etk")]
        public bool Etracker { get; set; }

        
        [JsonIgnore]
        [JsonProperty(PropertyName = "role")]
        public string Role { get; set; }
    }
}