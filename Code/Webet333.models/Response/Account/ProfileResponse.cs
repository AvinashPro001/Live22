using Newtonsoft.Json;
using System;
using System.Collections.Generic;

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

        [JsonProperty(PropertyName = "vipLevel")]
        public Guid VIPLevel { get; set; }

        [JsonProperty(PropertyName = "vipBanner")]
        public string VIPBanner { get; set; }

        [JsonProperty(PropertyName = "vipLevelName")]
        public string VIPLevelName { get; set; }


        [JsonProperty(PropertyName = "withdrawLimit")]
        public string WithdrawLimit { get; set; }

        public ICollection<MenusResponse> PermissionsList { get; set; }

        [JsonIgnore]
        public string Permissions { get; set; }

        [JsonIgnore]
        public string DefaultPermission { get; set; }
    }

    #region Permission Management

    public class Submenu
    {
        [JsonProperty("Id")]
        public string Id { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("link", NullValueHandling = NullValueHandling.Ignore)]
        public string Link { get; set; }

        [JsonProperty("icon")]
        public string Icon { get; set; }

        [JsonProperty("IsChecked")]
        public bool IsChecked { get; set; }

        [JsonProperty("Priority")]
        public long Priority { get; set; }

        [JsonProperty("IsActive")]
        public long IsActive { get; set; }

        [JsonProperty("Permissions")]
        public ICollection<Permission> Permissions { get; set; }

        [JsonProperty("submenu", NullValueHandling = NullValueHandling.Ignore)]
        public ICollection<MenusResponse> SubmenuSubmenu { get; set; }

        [JsonProperty("target", NullValueHandling = NullValueHandling.Ignore)]
        public string Target { get; set; }
    }

    public class MenusResponse
    {
        [JsonProperty("Id")]
        public string Id { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("icon")]
        public string Icon { get; set; }

        [JsonProperty("IsChecked")]
        public bool IsChecked { get; set; }

        [JsonProperty("Priority")]
        public long Priority { get; set; }

        [JsonProperty("IsActive")]
        public long IsActive { get; set; }

        [JsonProperty("Permissions")]
        public ICollection<Permission> Permissions { get; set; }

        [JsonProperty("submenu", NullValueHandling = NullValueHandling.Ignore)]
        public ICollection<Submenu> Submenu { get; set; }

        [JsonProperty("link", NullValueHandling = NullValueHandling.Ignore)]
        public string Link { get; set; }
    }

    public class Permission
    {
        [JsonProperty("Id")]
        public Guid Id { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("IsChecked")]
        public bool IsChecked { get; set; }

        [JsonProperty("IsShow")]
        public bool IsShow { get; set; }

        [JsonProperty("IsDisabled")]
        public bool IsDisabled { get; set; }
    }

    #endregion Permission Management
}