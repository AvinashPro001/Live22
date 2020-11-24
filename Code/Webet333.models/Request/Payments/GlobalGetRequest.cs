using Newtonsoft.Json;

namespace Webet333.models.Request.Payments
{
    public class GlobalGetRequest : SearchRequest
    {
        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }

        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "status")]
        public string Status { get; set; }

        [JsonProperty(PropertyName = "fromDate")]
        public string FromDate { get; set; }

        [JsonProperty(PropertyName = "toDate")]
        public string ToDate { get; set; }
    }
}
