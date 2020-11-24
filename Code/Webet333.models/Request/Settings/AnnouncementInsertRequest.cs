using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Settings
{
    public class AnnouncementInsertRequest
    {
        [Required(ErrorMessage ="Announcement Filed Required")]
        [JsonProperty(PropertyName = "announcement")]
        public string Text { get; set; }

        [Required(ErrorMessage = "Language Filed Required")]
        [JsonProperty(PropertyName = "languageid")]
        public string LanguageId { get; set; }
    }

    public class AnnouncementUpdateRequest: AnnouncementInsertRequest
    {
        [Required(ErrorMessage = "Id Filed Required")]
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
    }
}
