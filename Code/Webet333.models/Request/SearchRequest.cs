using Newtonsoft.Json;

namespace Webet333.models.Request
{
    public class SearchRequest
    {
        [JsonProperty(PropertyName = "keyword")]
        public string Keyword { get; set; }
    }

    public class SearchGlobalRequest:GlobalListRequest
    {
        [JsonProperty(PropertyName = "keyword")]
        public string Keyword { get; set; }
    }
}
