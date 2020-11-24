using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Payments
{
    public class VerifyRequest : GetByIdRequest
    {
        [Required]
        [JsonProperty(PropertyName = "approved")]
        public string Approved { get; set; }

        [JsonProperty(PropertyName = "adminRemarks")]
        public string AdminRemarks { get; set; }
    }
}
