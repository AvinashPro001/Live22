using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Webet333.models.Request.Account
{
   public class ManagerOperationUpdateRequest
    {
        [Required]
        [JsonProperty(PropertyName ="id")]
        public string Id { get; set; }

        [Required]
        [JsonProperty(PropertyName = "managerUsername")]
        public string ManagerUsername { get; set; }

        [Required]
        [JsonProperty(PropertyName = "managerPassword")]
        public string ManagerPassword { get; set; }

        [Required]
        [JsonProperty(PropertyName = "verifid")]
        public string Verified { get; set; }
    }
}
