using Newtonsoft.Json;
using Webet333.models.Request.Payments;

namespace Webet333.models.Request.Game
{
    public class GameListSelectRequest: GlobalGetWithPaginationRequest
    {
        [JsonProperty(PropertyName = "WalletName")]
        public string WalletName { get; set; }

        [JsonProperty(PropertyName = "Name")]
        public string Name { get; set; }
    }
}
