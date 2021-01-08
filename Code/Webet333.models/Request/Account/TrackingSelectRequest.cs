using Newtonsoft.Json;

namespace Webet333.models.Request.Account
{
    public class TrackingSelectRequest : AnalyticsRequest
    {
        [JsonProperty(PropertyName = "process")]
        public string Process { get; set; }

        [JsonProperty(PropertyName = "username")]
        public string Username { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "uniqueId")]
        public string UniqueId { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "role")]
        public string Role { get; set; }
    }

}
