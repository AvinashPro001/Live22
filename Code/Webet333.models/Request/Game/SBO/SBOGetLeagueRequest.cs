using Newtonsoft.Json;

namespace Webet333.models.Request.Game.SBO
{
    public class SBOGetLeagueRequest
    {
        [JsonProperty("LeagueNameKeyWord")]
        public string LeagueNameKeyWord { get; set; }

        [JsonProperty("FromDate")]
        public string FromDate { get; set; }

        [JsonProperty("ToDate")]
        public string ToDate { get; set; }

        [JsonProperty("SportType")]
        public long SportType { get; set; }

        [JsonProperty("CompanyKey")]
        public string CompanyKey { get; set; }

        [JsonProperty("ServerId")]
        public string ServerId { get; set; }
    }

    public class SBOGetLeagueAdminRequest : OnlyDateRangeFilterRequest
    {
        [JsonProperty("leagueKeyWord")]
        public string LeagueKeyWord { get; set; }
    }
}