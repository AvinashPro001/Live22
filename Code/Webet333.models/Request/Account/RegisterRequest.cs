using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Webet333.models.Request.Base;
using Webet333.models.Response.Account;

namespace Webet333.models.Request.Account
{
    public class RegisterRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        public string Mobile { get; set; }

        [Required]
        [RegularExpression(@"^\S*$", ErrorMessage = "Space Not allowed")]
        public string Username { get; set; }

        [StringLength(128, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        [JsonProperty(PropertyName = "referenceKeyword")]
        public string ReferenceKeyword { get; set; }

        [Required]
        [JsonProperty(PropertyName = "otp")]
        public string OTP { get; set; }

        [JsonProperty(PropertyName = "referralCode")]
        public string ReferralCode { get; set; }
    }

    public class RegisterAdminRequest : BaseValidateRequest
    {
        [Required]
        [RegularExpression(@"^\S*$", ErrorMessage = "Space Not allowed")]
        public string Username { get; set; }

        [StringLength(128, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [JsonIgnore]
        public string Permissions { get; set; }

        public ICollection<MenusResponse> PermissionsList { get; set; }

        [JsonIgnore]
        public string Role { get; set; }

        [JsonIgnore]
        public System.Guid AdminId { get; set; }
    }

    public class UpdateAdminRequest : BaseValidateRequest
    {
        [Required(ErrorMessage = "error_bad_request_id_required_filed")]
        public System.Guid Id { get; set; }

        [RegularExpression(@"^\S*$", ErrorMessage = "Space Not allowed")]
        public string Username { get; set; }

        [StringLength(128, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public ICollection<MenusResponse> PermissionsList { get; set; }

        [JsonIgnore]
        public System.Guid AdminId { get; set; }
    }
}