using Newtonsoft.Json;

namespace Webet333.models.Response.Base
{
    public class LoginResponse
    {
        [JsonProperty("token")]
        public string AccessToken { get; set; }

        [JsonProperty("username")]
        public string UserName { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("phone_number")]
        public string PhoneNumber { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
    }
}