using Newtonsoft.Json;

namespace Webet333.models.Request.Settings
{
    public class AddWalletTypes
    {
        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }

        [JsonProperty(PropertyName = "isMain")]
        public bool IsMain { get; set; }
    }
}
