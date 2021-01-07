using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Webet333.models.Request.VIPCategory
{
    public class UserVIPLevelUpdateRequest
    {
        [JsonIgnore]
        [JsonProperty(PropertyName ="uniqueId")]
        public string UniqueId { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "role")]
        public string Role { get; set; }

        [Required]
        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "levelId")]
        public string LevelId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "managerUsername")]
        public string ManagerUsername { get; set; }

        [Required]
        [JsonProperty(PropertyName = "managerPassword")]
        public string ManagerPassword { get; set; }
    }
}
