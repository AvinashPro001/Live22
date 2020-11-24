using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Account
{
    public class EmailRequest
    {
        [Required]
        public string MobileNumber { get; set; }

        [JsonIgnore]
        public string NewPassword { get; set; }
    }
}
