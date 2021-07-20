using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.Settings
{
    public class HomePageBannerRetriveByUserResponse
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("languageId")]
        public Guid LanguageId { get; set; }

        [JsonProperty("languageName")]
        public string LanguageName { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("sequence")]
        public int Sequence { get; set; }

        [JsonProperty("bannerWeb")]
        public string BannerWeb { get; set; }

        [JsonProperty("bannerMobile")]
        public string BannerMobile { get; set; }
    }

    public class HomePageBannerRetriveByAdminResponse
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("sequence")]
        public int Sequence { get; set; }

        [JsonProperty("active")]
        public bool Active { get; set; }

        [JsonProperty("total")]
        public int Total { get; set; }

        [JsonProperty("offSet")]
        public int OffSet { get; set; }
    }
}