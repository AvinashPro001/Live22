using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using Webet333.models.Request.Base;

namespace Webet333.models.Request
{
    public class FreeCreditEventInsertRequest : BaseValidateRequest
    {
        [Required(ErrorMessage = "error_name_required")]
        [JsonProperty("name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "error_usergroupId_required")]
        [JsonProperty("usergroupId")]
        public System.Guid UserGroupId { get; set; }

        [Required(ErrorMessage = "error_freeCreditEventTerm_required")]
        [JsonProperty("freeCreditEventTerm")]
        public System.Collections.Generic.List<FreeCreditEventTerm> FreeCreditEventTerm { get; set; }

        [JsonIgnore]
        public string TermJSON { get; set; }
    }

    public class FreeCreditEventTerm
    {
        public decimal? FromAmount { get; set; }

        public decimal? ToAmount { get; set; }

        public decimal? FreeCreditAmount { get; set; }
    }
}