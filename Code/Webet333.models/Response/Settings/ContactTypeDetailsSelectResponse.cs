using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.Settings
{
    public class ContactTypeDetailsSelectResponse
    {
        [JsonProperty("Id")]
        public Guid Id { get; set; }

        [JsonProperty("Type")]
        public string Type { get; set; }

        [JsonProperty("TypeImage")]
        public string TypeImage { get; set; }

        [JsonProperty("ContactTypeId")]
        public Guid ContactTypeId { get; set; }

        [JsonProperty("CSName")]
        public string CSName { get; set; }

        [JsonProperty("CSId")]
        public string CSId { get; set; }

        [JsonProperty("CSImage")]
        public string CSImage { get; set; }

        [JsonProperty("Text")]
        public string Text { get; set; }

        [JsonProperty("ClassChecked")]
        public bool ClassChecked { get; set; }

        [JsonProperty("IsOpenInNewPage")]
        public bool IsOpenInNewPage { get; set; }

        [JsonProperty("Active")]
        public bool Active { get; set; }

        [JsonProperty("Created")]
        public DateTime Created { get; set; }
    }

    public class ContactTypeSelectResponse
    {
        [JsonProperty("Id")]
        public Guid Id { get; set; }

        [JsonProperty("Type")]
        public string Type { get; set; }

        [JsonProperty("TypeImage")]
        public string TypeImage { get; set; }

        [JsonProperty("Active")]
        public bool Active { get; set; }

        [JsonProperty("Deleted")]
        public bool Deleted { get; set; }

        [JsonProperty("Created")]
        public DateTime Created { get; set; }

        [JsonProperty("Modified")]
        public DateTime Modified { get; set; }
    }
}
