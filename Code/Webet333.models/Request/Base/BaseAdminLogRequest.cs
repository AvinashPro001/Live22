using Newtonsoft.Json;

namespace Webet333.models
{
    public class BaseAdminLogRequest
    {
        [JsonIgnore]
        public System.Guid AdminId { get; set; }

        [JsonIgnore]
        public string Description { get; set; }
    }
}