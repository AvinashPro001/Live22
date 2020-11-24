using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Account
{
    public class TrackingInsertRequest
    {
        [Required]
        [JsonProperty(PropertyName ="usernames")]
        public string UserNames { get; set; }

        [Required]
        [JsonProperty(PropertyName = "process")]
        public string Process { get; set; }
    }
}
