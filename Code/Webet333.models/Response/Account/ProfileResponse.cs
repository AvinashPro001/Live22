using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.Account
{
    public class ProfileResponse
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "username")]
        public string UserName { get; set; }

        [JsonProperty(PropertyName = "username918")]
        public string UserName918 { get; set; }

        [JsonProperty(PropertyName = "password918")]
        public string Password918 { get; set; }

        [JsonProperty(PropertyName = "usernamePussy888")]
        public string UserNamePussy888 { get; set; }

        [JsonProperty(PropertyName = "passwordPussy888")]
        public string PasswordPussy888 { get; set; }

        [JsonProperty(PropertyName = "mobileNo")]
        public string MobileNo { get; set; }

        [JsonProperty(PropertyName = "role")]
        public string Role { get; set; }

        [JsonProperty(PropertyName = "totalBankAccount")]
        public int BankAccount { get; set; }

        [JsonProperty(PropertyName = "vendorememberid")]
        public string VendoreMemberId { get; set; }

        [JsonProperty(PropertyName = "loginid")]
        public string LoginId { get; set; }

        [JsonProperty(PropertyName = "emailConfirmed")]
        public bool EmailConfirmed { get; set; }

        [JsonProperty(PropertyName = "active")]
        public bool Active { get; set; }

        [JsonProperty(PropertyName = "deleted")]
        public bool Deleted { get; set; }

        [JsonProperty(PropertyName = "autoTransfer")]
        public bool AutoTransfer { get; set; }

        [JsonProperty(PropertyName = "mobilenoConfirmed")]
        public bool MobileNoConfirmed { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }
    }
}
