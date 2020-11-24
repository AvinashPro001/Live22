using System.Collections.Generic;
using System.Linq;
using Webet333.models.Response.Game;

namespace Webet333.models.Mapping.Game
{
    public class JokerServicesMapping
    {
        public List<Winloss> Map(List<Winloss> tranList)
        {
            var response = tranList.Select(x => new Winloss
            {
             Amount=x.Amount,
             OCode = x.OCode,
             Result = x.Result,
             Username = x.Username
            }).ToList();
            return response;
        }
    }
}
