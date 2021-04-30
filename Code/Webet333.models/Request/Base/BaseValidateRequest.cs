using Newtonsoft.Json;

namespace Webet333.models.Request.Base
{
    public class BaseValidateRequest
    {
        [JsonIgnore]
        public System.Guid? UserId { get; set; }

        [JsonIgnore]
        public string UniqueId { get; set; }
    }
}