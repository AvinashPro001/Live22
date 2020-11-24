using Newtonsoft.Json;

namespace Webet333.models.Request.Account
{
    public class TrackingSelectRequest : AnalyticsRequest
    {
        [JsonProperty(PropertyName = "process")]
        public string Process { get; set; }
    }

}
