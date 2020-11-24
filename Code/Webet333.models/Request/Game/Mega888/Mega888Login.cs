using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game.Mega888
{
    public class Params
    {
        public string sn { get; set; }

        public string loginId { get; set; }

        public string password { get; set; }

        public string random { get; set; }

        public string digest { get; set; }
    }

    public class Mega888Login
    {
        public string id { get; set; }

        public string method { get; set; }

        public Params @params { get; set; }

        public string jsonrpc { get; set; }
    }

    public class Mega888LoginRequest
    {
        [Required]
        public string Json { get; set; }
    }
}
