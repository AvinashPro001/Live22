using Newtonsoft.Json;
using Webet333.models.Request.Payments;

namespace Webet333.models.Request.Game
{
    public class GameListSelectRequest: GlobalGetWithPaginationRequest
    {
        [JsonProperty(PropertyName = "walletId")]
        public string WalletId { get; set; }
    }
}
