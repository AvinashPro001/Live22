using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Settings
{
    public class HomePageBannerRetriveRequest
    {
        [Required]
        [JsonProperty("languageId")]
        public string LanguageId { get; set; }

        [JsonIgnore]
        [JsonProperty("IsUser")]
        public bool isUser { get; set; }
    }

    public class HomePageBannerRetriveByAdminRequest
    {
        [JsonProperty("languageId")]
        public string LanguageId { get; set; }

        [JsonIgnore]
        [JsonProperty("IsUser")]
        public bool isUser { get; set; }
    }
}