using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using Webet333.models.Request.Base;

namespace Webet333.models.Request
{
    public class UserGroupInsertRequest : BaseValidateRequest
    {
        [Required(ErrorMessage = "error_name_required")]
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}