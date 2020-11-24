using Newtonsoft.Json;
using System.Collections.Generic;

namespace Webet333.models.Request.Payments
{
    public class DepositImageRequest : GetByIdRequest
    {
        [JsonProperty(PropertyName = "images")]
        public List<ImagesRequest> Images { get; set; }
    }

    public class ImagesRequest
    {
        [JsonProperty(PropertyName = "base64images")]
        public string Images { get; set; }
    }
}
