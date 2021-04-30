using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Webet333.models.Request.Base;

namespace Webet333.models.Request
{
    public class UserGroupInsertUserRequest : BaseValidateRequest
    {
        [Required(ErrorMessage = "error_userGroupId_required")]
        [JsonProperty("userGroupId")]
        public Guid UserGroupId { get; set; }

        [Required(ErrorMessage = "error_userId_required")]
        [JsonProperty("userId")]
        public List<Guid> UsersId { get; set; }

        [JsonIgnore]
        public string UsersIdList { get; set; }
    }
}