using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Webet333.models.Request.Account
{
    public class ManagerOperationInsertRequest
    {
        [Required]
        [JsonProperty(PropertyName ="userId")]
        public string UserId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "operationType")]
        public string OperationType { get; set; }

        [Required]
        [JsonProperty(PropertyName = "old")]
        public string Old { get; set; }

        [Required]
        [JsonProperty(PropertyName = "new")]
        public string New { get; set; }

        [Required]
        [JsonProperty(PropertyName = "identityProof")]
        public string IdentityProof { get; set; }
    }
}
