using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;
using Webet333.models.Request.Payments;

namespace Webet333.models.Request.Account
{
    public class IcNumberAddRequest
    {
        [JsonProperty(PropertyName = "icNumber")]
        public string ICNumber { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }
    }

    public class IcImageAddRequest
    {
        [JsonProperty(PropertyName = "file")]
        public List<ImagesRequest> Images { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }
    }

    public class IcImageRequestList
    {
        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }

        public string ICImage { get; set; }
    }
}