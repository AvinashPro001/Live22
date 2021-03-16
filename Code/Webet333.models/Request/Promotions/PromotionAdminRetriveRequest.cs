using Newtonsoft.Json;

namespace Webet333.models.Request.Promotions
{
    public class PromotionAdminRetriveRequest
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "keyword")]
        public string Keyword { get; set; }

        [JsonProperty(PropertyName = "languageCode")]
        public string LanguageCode { get; set; }
    }
}