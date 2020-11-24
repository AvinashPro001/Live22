using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request
{
    public class GetByIdRequest
    {
        //[Required]
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
    }

    public class GetByIdRequestWithRequired
    {
        [Required]
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
    }
}
