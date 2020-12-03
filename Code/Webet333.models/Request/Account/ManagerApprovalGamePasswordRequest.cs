using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Account
{
    public class ManagerApprovalGamePasswordRequest
    {
        [Required]
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [Required]
        [JsonProperty(PropertyName = "managerUsername")]
        public string ManagerUsername { get; set; }

        [Required]
        [JsonProperty(PropertyName = "managerPassword")]
        public string ManagerPassword { get; set; }

        [Required]
        [JsonProperty(PropertyName = "gameName")]
        public string GameName { get; set; }
    }
}
