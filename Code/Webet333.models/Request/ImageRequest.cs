using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request
{
    public class ImageRequest : GetByIdRequest
    {
        [Required]
        [JsonProperty(PropertyName = "file")]
        public string FormFile { get; set; }
    }

    public class PromotionImageRequest : ImageRequest
    {
        [Required]
        [JsonProperty(PropertyName = "mobilefile")]
        public string FormMobileFile { get; set; }

        [JsonIgnore]
        public System.Guid AdminId { get; set; }
    }

    public class PromotionImageUpdateRequest : GetByIdRequestWithRequired
    {
        [JsonProperty(PropertyName = "file")]
        public string FormFile { get; set; }

        [JsonProperty(PropertyName = "mobilefile")]
        public string FormMobileFile { get; set; }
    }

    public class BankImagesIconInsertRequest : GetByIdRequest
    {
        [JsonProperty(PropertyName = "file")]
        public string FormFile { get; set; }

        [JsonProperty(PropertyName = "fileIcon")]
        public string FormIconFile { get; set; }
    }

    public class HomePageBannerImageRequest : GetByIdRequest
    {
        [Required]
        [JsonProperty("bannerIdEnglish")]
        public string BannerIdEnglish { get; set; }

        [Required]
        [JsonProperty("bannerWebEnglish")]
        public string BannerWebEnglish { get; set; }

        [Required]
        [JsonProperty("bannerMobileEnglish")]
        public string BannerMobileEnglish { get; set; }

        [Required]
        [JsonProperty("bannerIdMalay")]
        public string BannerIdMalay { get; set; }

        [Required]
        [JsonProperty("bannerWebMalay")]
        public string BannerWebMalay { get; set; }

        [Required]
        [JsonProperty("bannerMobileMalay")]
        public string BannerMobileMalay { get; set; }

        [Required]
        [JsonProperty("bannerIdChinese")]
        public string BannerIdChinese { get; set; }

        [Required]
        [JsonProperty("bannerWebChinese")]
        public string BannerWebChinese { get; set; }

        [Required]
        [JsonProperty("bannerMobileChinese")]
        public string BannerMobileChinese { get; set; }

        [JsonIgnore]
        public System.Guid AdminId { get; set; }
    }

    public class HomePageBannerImageUpdateRequest : GetByIdRequestWithRequired
    {
        [JsonProperty("bannerIdEnglish")]
        public string BannerIdEnglish { get; set; }

        [JsonProperty("bannerWebEnglish")]
        public string BannerWebEnglish { get; set; }

        [JsonProperty("bannerMobileEnglish")]
        public string BannerMobileEnglish { get; set; }

        [JsonProperty("bannerIdMalay")]
        public string BannerIdMalay { get; set; }

        [JsonProperty("bannerWebMalay")]
        public string BannerWebMalay { get; set; }

        [JsonProperty("bannerMobileMalay")]
        public string BannerMobileMalay { get; set; }

        [JsonProperty("bannerIdChinese")]
        public string BannerIdChinese { get; set; }

        [JsonProperty("bannerWebChinese")]
        public string BannerWebChinese { get; set; }

        [JsonProperty("bannerMobileChinese")]
        public string BannerMobileChinese { get; set; }

        [JsonIgnore]
        public System.Guid AdminId { get; set; }
    }
}