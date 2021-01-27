using Newtonsoft.Json;
using System;

namespace Webet333.models.Request.Base
{
    public class BaseValidateRequest
    {
        [JsonIgnore]
        public Guid? UserId { get; set; }

        [JsonIgnore]
        public string UniqueId { get; set; }
    }
}