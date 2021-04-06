using Newtonsoft.Json;

namespace Webet333.models.Request
{
    public class UserGroupSelectUserRequest : SearchParamRequest
    {

        [JsonIgnore]
        public System.Guid? UserId { get; set; }

        [JsonIgnore]
        public string UniqueId { get; set; }
    }
}
