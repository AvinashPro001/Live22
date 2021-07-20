using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Settings
{
    public class HomePageBannerAddRequest : BaseAdminLogRequest
    {
        [Required]
        [JsonProperty("titleEnglish")]
        public string TitleEnglish { get; set; }

        [Required]
        [JsonProperty("titleMalay")]
        public string TitleMalay { get; set; }

        [Required]
        [JsonProperty("titleChinese")]
        public string TitleChinese { get; set; }

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