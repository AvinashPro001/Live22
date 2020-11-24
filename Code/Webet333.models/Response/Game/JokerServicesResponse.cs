using System.Collections.Generic;

namespace Webet333.models.Response.Game
{
    public class JokerServicesResponse
    {
        public List<Winloss> Winloss { get; set; }
    }

    public class Winloss
    {
        public string Username { get; set; }
        public string OCode { get; set; }
        public double Amount { get; set; }
        public double Result { get; set; }
    }
}
