using Newtonsoft.Json;
using System;

namespace Webet333.models.Request.Settings
{
    public class ContactTypeAddRequest
    {
        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }

        [JsonProperty(PropertyName = "typeImage")]
        public string TypeImage { get; set; }
    }

    public class ContactTypeUpdateRequest : ContactTypeAddRequest
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "active")]
        public bool? Active { get; set; }

        [JsonProperty(PropertyName = "deleted")]
        public bool? Deleted { get; set; }
    }

    public class ContactTypeDetailsAddRequest : BaseAdminLogRequest
    {
        [JsonProperty(PropertyName = "csImage")]
        public string CSImage { get; set; }

        [JsonProperty(PropertyName = "csId")]
        public string CSId { get; set; }

        [JsonProperty(PropertyName = "csName")]
        public string CSName { get; set; }

        [JsonProperty(PropertyName = "contactTypeId")]
        public Guid ContactTypeId { get; set; }

        [JsonProperty(PropertyName = "classCheck")]
        public bool ClassCheck { get; set; }

        [JsonProperty(PropertyName = "Text")]
        public string Text { get; set; }

        [JsonProperty(PropertyName = "isOpenInNewPage")]
        public bool? IsOpenInNewPage { get; set; }
    }

    public class ContactTypeDetailsUpdateRequest : BaseAdminLogRequest
    {
        [JsonProperty(PropertyName = "contactTypeId")]
        public Guid? ContactTypeId { get; set; }

        [JsonProperty(PropertyName = "csImage")]
        public string CSImage { get; set; }

        [JsonProperty(PropertyName = "csId")]
        public string CSId { get; set; }

        [JsonProperty(PropertyName = "csName")]
        public string CSName { get; set; }

        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "active")]
        public bool? Active { get; set; }

        [JsonProperty(PropertyName = "deleted")]
        public bool? Deleted { get; set; }

        [JsonProperty(PropertyName = "classCheck")]
        public bool? ClassCheck { get; set; }

        [JsonProperty(PropertyName = "isOpenInNewPage")]
        public bool? IsOpenInNewPage { get; set; }

        [JsonProperty(PropertyName = "Text")]
        public string Text { get; set; }
    }
}