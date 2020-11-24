using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Account
{
    public class TokenRequest
    {
        [Required]
        public string Token
        {
            get => _Token;
            set => _Token = value.Replace(" ", "+");
        }

        private string _Token { get; set; }
    }
}
