using Newtonsoft.Json;

namespace Webet333.models.Request.Game.SBO
{
    public class SBOBettingDetailsRequest
    {
        [JsonProperty("Username")]
        public string Username { get; set; }

        [JsonProperty("Portfolio")]
        public string Portfolio { get; set; }

        [JsonProperty("StartDate")]
        public string StartDate { get; set; }

        [JsonProperty("EndDate")]
        public string EndDate { get; set; }

        [JsonProperty("CompanyKey")]
        public string CompanyKey { get; set; }

        [JsonProperty("ServerId")]
        public string ServerId { get; set; }
    }
}