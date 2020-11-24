using Newtonsoft.Json;

namespace Webet333.models.Request.Game
{
    public class GameBettingDetailsInsertRequest
    {
        [JsonProperty(PropertyName ="jsondata")]
        public dynamic JsonData { get; set; }
    }

    public class M8GameBettingDetailsInsertRequest : GameBettingDetailsInsertRequest
    {
        public string[] FetchId { get; set; }
    }

    public class MaxBetGameBettingDetailsInsertRequest : GameBettingDetailsInsertRequest
    {
        public long VersionKey { get; set; }
    }
}
