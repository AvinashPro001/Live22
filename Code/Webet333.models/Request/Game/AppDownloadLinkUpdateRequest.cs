using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game
{
    public class AppDownloadLinkUpdateRequest
    {
        [Required]
        [JsonProperty(PropertyName ="id")]
        public string Id { get; set; }

        [Required]
        [JsonProperty(PropertyName = "link")]
        public string Link { get; set; }
    }
}
