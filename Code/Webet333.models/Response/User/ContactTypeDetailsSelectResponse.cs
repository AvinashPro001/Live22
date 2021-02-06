using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.User
{
    public class ContactTypeDetailsSelectResponse
    {
        [JsonProperty("Id")]
        public Guid Id { get; set; }

        [JsonProperty("Type")]
        public string Type { get; set; }

        [JsonProperty("ContactTypeId")]
        public Guid ContactTypeId { get; set; }

        [JsonProperty("CSName")]
        public string CSName { get; set; }

        [JsonProperty("CSId")]
        public string CSId { get; set; }

        [JsonProperty("CSImage")]
        public string CSImage { get; set; }

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
