using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.FreeCreditEvent
{
    public class FreeCreditEventReportResponse
    {
        [JsonProperty("registerdate")]
        public DateTime Registerdate { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("fullname")]
        public string Fullname { get; set; }

        [JsonProperty("freecredit")]
        public string Freecredit { get; set; }

        [JsonProperty("weeklytotaldepositamount")]
        public string Weeklytotaldepositamount { get; set; }

        [JsonProperty("createddate")]
        public DateTime Createddate { get; set; }

        [JsonProperty("Total")]
        public int Total { get; set; }

        [JsonProperty("OffSet")]
        public int OffSet { get; set; }
    }
}
