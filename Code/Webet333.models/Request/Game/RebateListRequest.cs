using Newtonsoft.Json;

namespace Webet333.models.Request.Game
{

    public class RebateListRequest
    {
        [JsonProperty(PropertyName ="fromDate")]
        public string FromDate { get; set; }

        [JsonProperty(PropertyName = "toDate")]
        public string ToDate { get; set; }

        [JsonProperty(PropertyName = "gamename")]
        public string GameName { get; set; }
    }
}
