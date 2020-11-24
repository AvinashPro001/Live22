using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.Payments
{
    public class DepositMethod
    {
        [JsonProperty(PropertyName = "id")]
        public Guid id { get; set; }

        [JsonProperty(PropertyName = "method")]
        public string method { get; set; }

        [JsonProperty(PropertyName = "restricted")]
        public bool Restricted { get; set; }
    }
}
