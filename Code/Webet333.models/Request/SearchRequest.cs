using Newtonsoft.Json;
using System;

namespace Webet333.models.Request
{
    public class SearchRequest
    {
        [JsonProperty(PropertyName = "keyword")]
        public string Keyword { get; set; }
    }

    public class SearchGlobalRequest : GlobalListRequest
    {
        [JsonProperty(PropertyName = "keyword")]
        public string Keyword { get; set; }
    }

    public class SearchParamRequest : DateRangeFilterRequest
    {
        public string SearchParam { get; set; }
    }

    public class DateRangeFilterRequest
    {
        [JsonProperty("id")]
        public Guid? Id { get; set; }

        [JsonProperty("fromDate")]
        public DateTime? FromDate { get; set; }

        [JsonProperty("toDate")]
        public DateTime? ToDate { get; set; }

        [JsonProperty("pageSize")]
        public int? PageSize { get; set; }

        [JsonProperty("pageNo")]
        public int? PageNo { get; set; }

        [JsonProperty("orderBy")]
        public string OrderBy { get; set; }
    }
}