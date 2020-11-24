using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Account
{
    public class SocailMediaStaticsRequest
    {
        [Required]
        public string keyword { get; set; }
    }
}
