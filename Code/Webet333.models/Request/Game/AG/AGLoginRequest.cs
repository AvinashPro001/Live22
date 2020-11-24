using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Webet333.models.Request.Game.AG
{
    public class AGLoginRequest : GetByIdRequest
    {
        [Required]
        [JsonProperty(PropertyName ="gameType")]
        public string GameType { get; set; }

        [Required]
        [JsonProperty(PropertyName = "lang")]
        public string Lang { get; set; }
    }
}
