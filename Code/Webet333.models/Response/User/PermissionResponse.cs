using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using Webet333.models.Response.Account;

namespace Webet333.models.Response.User
{
    public class PermissionResponse
    {
        public Guid Id { get; set; }

        public ICollection<MenusResponse> PermissionsList { get; set; }

        [JsonIgnore]
        public string Permissions { get; set; }

        [JsonIgnore]
        public string DefaultPermission { get; set; }
    }
}