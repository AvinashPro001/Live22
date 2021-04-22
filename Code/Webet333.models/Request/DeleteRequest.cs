using Newtonsoft.Json;

namespace Webet333.models.Request
{
    public class DeleteRequest : GetByIdRequest
    {
        [JsonProperty(PropertyName = "active")]
        public bool Active { get; set; }
    }

    public class DeleteRequestWithValidation : GetByIdRequest
    {
        [JsonProperty(PropertyName = "active")]
        public bool Active { get; set; }

        [JsonIgnore]
        public System.Guid? UserId { get; set; }

        [JsonIgnore]
        public string UniqueId { get; set; }
    }
}