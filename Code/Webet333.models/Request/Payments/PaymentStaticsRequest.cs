using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Payments
{
    public class PaymentStaticsRequest
    {
        [JsonProperty(PropertyName = "fromDate")]
        public string FromDate { get; set; }

        [JsonProperty(PropertyName = "toDate")]
        public string ToDate { get; set; }

        [Required]
        [JsonProperty(PropertyName = "method")]
        public string Method { get; set; }
    }

    public class PaymentStaticsRequestDetails : PaymentStaticsRequest
    {
        [Required]
        [JsonProperty(PropertyName = "bankName")]
        public string BankName { get; set; }
    }
}
