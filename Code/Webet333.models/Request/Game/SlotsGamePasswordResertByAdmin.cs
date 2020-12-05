using Newtonsoft.Json;
using System;

namespace Webet333.models.Request.Game
{
    public class SlotsGamePasswordResertByAdmin
    {
        [JsonProperty(PropertyName ="userId")]
        public Guid UserId { get; set; }

        [JsonProperty(PropertyName = "gameUsername")]
        public string GameUsername { get; set; }

        [JsonProperty(PropertyName = "gamePassword")]
        public string GamePassword { get; set; }

        [JsonProperty(PropertyName = "username")]
        public string Username { get; set; }

        [JsonProperty(PropertyName = "rowId")]
        public string RowId { get; set; }

        [JsonProperty(PropertyName = "password")]
        public string Password { get; set; }
    }
}
