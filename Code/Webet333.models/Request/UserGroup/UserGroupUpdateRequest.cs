using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using Webet333.models.Request.Base;

namespace Webet333.models.Request
{
    public class UserGroupUpdateRequest : BaseValidateRequest
    {
        [Required(ErrorMessage = "error_id_required")]
        [JsonProperty("id")]
        public System.Guid Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
    }
}