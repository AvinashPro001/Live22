using Newtonsoft.Json;

namespace Webet333.models.Response.Account
{
    public class WebAnalyticsResponse
    {
        [JsonProperty(PropertyName ="refkeyword")]
        public string RefKeyword { get; set; }

        [JsonProperty(PropertyName = "total")]
        public string Total { get; set; }

        [JsonProperty(PropertyName = "totaluser")]
        public string TotalUsers { get; set; }


        [JsonProperty(PropertyName = "totalDepoist")]
        public decimal TotalDepoist { get; set; }


        [JsonProperty(PropertyName = "totalWithdraw")]
        public decimal TotalWithdraw { get; set; }

        [JsonProperty(PropertyName = "totalBonus")]
        public decimal TotalBonus { get; set; }

        [JsonProperty(PropertyName = "totalWinLose")]
        public decimal TotalWinLose { get; set; }
    }
}
