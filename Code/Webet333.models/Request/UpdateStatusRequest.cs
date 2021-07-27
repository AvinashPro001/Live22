using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request
{
    public class UpdateStatusRequest : GetByIdRequestWithRequired
    {
        [Required]
        [JsonProperty("active")]
        public bool Active { get; set; }
    }

    public class UpdateStatusWithAdminIdRequest : GetByIdRequestWithRequired
    {
        [Required]
        [JsonProperty("active")]
        public bool Active { get; set; }

        [JsonIgnore]
        public System.Guid AdminId { get; set; }
    }
}