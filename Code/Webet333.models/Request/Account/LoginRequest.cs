using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using Webet333.models.Enums;

namespace Webet333.models.Request.Account
{
    public class LoginRequest
    {
        public string UserName { get; set; }

        [DataType(DataType.Password)]
        [Required(ErrorMessage = "error_password_required")]
        public string Password { get; set; }

        [Required]
        public GrantTypeEnums GrantType { get; set; }
    }
}