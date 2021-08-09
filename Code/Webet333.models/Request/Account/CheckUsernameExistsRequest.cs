using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Account
{
    public class CheckUsernameExistsRequest
    {
        [JsonProperty(PropertyName ="username")]
        [Required]
        public string Username { get; set; }
    }
}
