using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game
{
    public class GameListUpdateRequest
    {
        [JsonProperty("id")]
        [Required]
        public Guid? Id { get; set; }

        [JsonProperty("gameName")]
        public string GameName { get; set; }

        [JsonProperty("gameCode")]
        public string GameCode { get; set; }

        [JsonProperty("gameType")]
        public string GameType { get; set; }

        [JsonProperty("isNew")]
        public bool? IsNew { get; set; }

        [JsonProperty("isHot")]
        public bool? IsHot { get; set; }

        [JsonProperty("isSlot")]
        public bool? IsSlot { get; set; }

        [JsonProperty("isArcade")]
        public bool? IsArcade { get; set; }

        [JsonProperty("active")]
        public bool? Active { get; set; }

        [JsonProperty("deleted")]
        public bool? Deleted { get; set; }
    }
}
