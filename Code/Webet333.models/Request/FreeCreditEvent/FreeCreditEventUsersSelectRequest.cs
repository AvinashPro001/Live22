using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request
{
    public class FreeCreditEventUsersSelectRequest : SearchParamWithValidationRequest
    {
        [Required(ErrorMessage = "error_userGroupId_required")]
        [JsonProperty("userGroupId")]
        public System.Guid UserGroupId { get; set; }
    }
}