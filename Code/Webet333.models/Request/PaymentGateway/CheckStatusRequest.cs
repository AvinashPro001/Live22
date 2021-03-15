using Newtonsoft.Json;

namespace Webet333.models.Request.PaymentGateway
{
    public class CheckStatusRequest
    {
        //[Required]
        [JsonProperty(PropertyName = "token")]
        public string Token { get; set; }
    }
}