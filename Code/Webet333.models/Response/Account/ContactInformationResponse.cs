using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.Account
{
    public class ContactInformationResponse
    {

        [JsonProperty("Type")]
        public string Type { get; set; }

        [JsonProperty("TypeImage")]
        public string TypeImage { get; set; }

        [JsonProperty("TypeId")]
        public Guid TypeId { get; set; }

        [JsonProperty("Details")]
        public string Details { get; set; }
    }

    public class ContactInformationDetails
    {
        [JsonProperty("CSName")]
        public string CSName { get; set; }

        [JsonProperty("CSId")]
        public string CSId { get; set; }

        [JsonProperty("CSImage")]
        public string CSImage { get; set; }

        [JsonProperty("TypeDetailsId")]
        public Guid TypeDetailsId { get; set; }

        [JsonProperty("ClassChecked")]
        public bool ClassChecked { get; set; }

        [JsonProperty("Url")]
        public string Url { get; set; }

        [JsonProperty("IsOpenInNewPage")]
        public bool IsOpenInNewPage { get; set; }
    }
}
