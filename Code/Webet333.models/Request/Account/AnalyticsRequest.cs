using Newtonsoft.Json;

namespace Webet333.models.Request.Account
{
    public class AnalyticsRequest
    {
        [JsonProperty(PropertyName ="fromdate")]
        public string FromDate { get; set; }

        [JsonProperty(PropertyName = "todate")]
        public string ToDate { get; set; }
    }
}
