using Newtonsoft.Json;

namespace Webet333.models.Request.Game.SBO
{
    public class SBOGetPlayerBalanceRequest
    {
        [JsonProperty("Username")]
        public string Username { get; set; }

        [JsonProperty("CompanyKey")]
        public string CompanyKey { get; set; }

        [JsonProperty("ServerId")]
        public string ServerId { get; set; }
    }
}