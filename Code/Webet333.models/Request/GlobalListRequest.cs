using Newtonsoft.Json;

namespace Webet333.models.Request
{
    public class GlobalListRequest
    {
        [JsonProperty(PropertyName ="userid")]
        public string UserId { get; set; }

        [JsonProperty(PropertyName = "fromdate")]
        public string FromDate { get; set; }

        [JsonProperty(PropertyName = "todate")]
        public string ToDate { get; set; }
    }
}
