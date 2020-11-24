using Newtonsoft.Json;
using System;

namespace Webet333.models.Request.Payments
{
    public class ApprovalDurationRequest
    {
        [JsonProperty(PropertyName ="userid")]
        public string UserId { get; set; }

        [JsonProperty(PropertyName = "username")]
        public string Username { get; set; }

        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }

        [JsonProperty(PropertyName = "Id")]
        public string Id { get; set; }
    }

    public class ApprovalDurationRetriveRequest
    {
        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }

        [JsonProperty(PropertyName = "duration")]
        public long Duration { get; set; }

        [JsonProperty(PropertyName = "fromdate")]
        public string FromDate { get; set; }

        [JsonProperty(PropertyName = "todate")]
        public string ToDate { get; set; }
    }
}
