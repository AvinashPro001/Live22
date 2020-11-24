using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Account
{
    public class ResetPasswordRequest : TokenRequest
    {
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}
