using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game.AG
{
    public class AGLoginRequest : GetByIdRequest
    {
        [Required]
        [JsonProperty(PropertyName = "gameType")]
        public string GameType { get; set; }

        [Required]
        [JsonProperty(PropertyName = "lang")]
        public string Lang { get; set; }
    }
}