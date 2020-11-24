using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.GameBalance
{
    public class UserBalanceRequest:GetByIdRequest
    {
        [Required]
        [JsonProperty(PropertyName = "username")]
        public string Username { get; set; }
    }

    public class AllBetGameUserBalanceRequest: UserBalanceRequest
    {
        [Required]
        [JsonProperty(PropertyName = "password")]
        public string Password { get; set; }
    }
}
