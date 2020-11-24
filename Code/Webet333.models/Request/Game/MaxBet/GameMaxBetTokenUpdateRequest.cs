using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game.MaxBet
{
    public class GameMaxBetTokenUpdateRequest
    {
        [Required]
        [JsonProperty(PropertyName ="token")]
        public string Token { get; set; }
    }
}
