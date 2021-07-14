using System.ComponentModel.DataAnnotations;

namespace Webet333.service.Model
{
    public class LoginRequest
    {
        public string UserName { get; set; }

        [StringLength(128, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Required]
        public string Password { get; set; }

        [Required]
        public GrantTypeEnums GrantType { get; set; }
    }

    public enum GrantTypeEnums
    {
        error,
        admin,
        user
    }
}