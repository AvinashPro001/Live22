using Newtonsoft.Json;

namespace Webet333.models.Request
{
    public class DeleteRequest: GetByIdRequest
    {
        [JsonProperty(PropertyName = "active")]
        public bool Active { get; set; }
    }
}
