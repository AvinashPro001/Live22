using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using Webet333.models.Request.Base;

namespace Webet333.models.Request
{
    public class SetFreeCreditTermRequest : BaseValidateRequest
    {
        [JsonProperty("id")]
        public System.Guid? Id { get; set; }

        [Required(ErrorMessage = "error_usergroupId_required")]
        [JsonProperty("usergroupId")]
        public System.Guid UserGroupId { get; set; }

        [Required(ErrorMessage = "error_freeCreditEventTerm_required")]
        [JsonProperty("freeCreditEventTerm")]
        public System.Collections.Generic.List<FreeCreditEventTerm> FreeCreditEventTerm { get; set; }

        [JsonIgnore]
        public string TermJSON { get; set; }
    }
}