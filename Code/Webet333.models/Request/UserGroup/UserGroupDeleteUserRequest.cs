using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Webet333.models.Request.Base;

namespace Webet333.models.Request
{
    public class UserGroupDeleteUserRequest : BaseValidateRequest
    {
        [Required(ErrorMessage = "error_userGroupId_required")]
        [JsonProperty("userGroupId")]
        public Guid UserGroupId { get; set; }

        [JsonProperty("usersIdList")]
        public List<Guid?> UsersId { get; set; }

        [JsonIgnore]
        public string UsersIdList { get; set; }

        [JsonProperty("deleteAll")]
        public bool? DeleteAll { get; set; }
    }
}