using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.User
{
    public class ProfileEditRequest
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }

        [EmailAddress]
        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        [JsonProperty(propertyName:"username")]
        public string UserName { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [DataType(DataType.PhoneNumber)]
        [JsonProperty(PropertyName = "mobile")]
        public string Mobile { get; set; }

        [JsonProperty(PropertyName = "password")]
        public string Password { get; set; }

        [JsonProperty(propertyName: "username918")]
        public string UserName918 { get; set; }

        [JsonProperty(propertyName: "password918")]
        public string Password918 { get; set; }

        [JsonProperty(propertyName: "autoTransfer")]
        public bool AutoTransfer { get; set; }
    }
}
