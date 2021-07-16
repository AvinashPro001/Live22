using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Settings
{
    public class HomePageBannerAddRequest : BaseAdminLogRequest
    {
        [Required]
        [JsonProperty("languageid")]
        public string LanguageId { get; set; }

        [Required]
        [JsonProperty("title")]
        public string Title { get; set; }

        [Required]
        [JsonProperty("sequence")]
        public int Sequence { get; set; }
    }

    public class HomePageBannerUpdateRequest : HomePageBannerAddRequest
    {
        [Required]
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
    }
}