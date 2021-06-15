using Newtonsoft.Json;

namespace Webet333.models.Request.Game.SBO
{
    public class SBORegistrationPlayerRequest
    {
        [JsonProperty("Username")]
        public string Username { get; set; }

        [JsonProperty("Agent")]
        public string Agent { get; set; }

        [JsonProperty("CompanyKey")]
        public string CompanyKey { get; set; }

        [JsonProperty("ServerId")]
        public string ServerId { get; set; }
    }

    public class SBORegistrationAgentRequest
    {
        [JsonProperty("Username")]
        public string Username { get; set; }

        [JsonProperty("Password")]
        public string Password { get; set; }

        [JsonProperty("Min")]
        public long Min { get; set; }

        [JsonProperty("Max")]
        public long Max { get; set; }

        [JsonProperty("MaxPerMatch")]
        public long MaxPerMatch { get; set; }

        [JsonProperty("CasinoTableLimit")]
        public long CasinoTableLimit { get; set; }
    }

    public class SBORegistrationAgent : SBORegistrationAgentRequest
    {
        [JsonProperty("Currency")]
        public string Currency { get; set; }

        [JsonProperty("CompanyKey")]
        public string CompanyKey { get; set; }

        [JsonProperty("ServerId")]
        public string ServerId { get; set; }
    }
}