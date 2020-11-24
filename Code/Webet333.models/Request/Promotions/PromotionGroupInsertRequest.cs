using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Promotions
{
    public class PromotionGroupInsertRequest
    {
        [JsonProperty(PropertyName ="groupName")]
        public string GroupName { get; set; }

        [JsonProperty(PropertyName = "jsonString")]
        public string JsonString { get; set; }

        [JsonProperty(PropertyName = "isPerUserOnly")]
        public bool IsPerUserOnly { get; set; }

        [JsonProperty(PropertyName = "isDailyOnce")]
        public bool IsDailyOnce { get; set; }

        [JsonProperty(PropertyName = "active")]
        public bool Active { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "createdBy")]
        public string CreatedBy { get; set; }
    }

    public class PromotionGroupUpdateRequest : PromotionGroupInsertRequest
    {
        [JsonProperty(PropertyName = "groupId")]
        public Guid Id { get; set; }
    }
}
