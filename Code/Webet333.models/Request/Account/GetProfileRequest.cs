using Newtonsoft.Json;

namespace Webet333.models.Request.Account
{
    public class GetProfileRequest
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "username")]
        public string Username { get; set; }
    }
}