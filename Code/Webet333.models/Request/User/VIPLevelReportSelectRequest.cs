using Newtonsoft.Json;

namespace Webet333.models.Request.User
{
    public class VIPLevelReportSelectRequest
    {
        [JsonProperty("VIPLevelId")]
        public string VIPLevelId { get; set; }

        [JsonProperty("pageNo")]
        public int? PageNo { get; set; }

        [JsonProperty("pageSize")]
        public int? PageSize { get; set; }
    }
}