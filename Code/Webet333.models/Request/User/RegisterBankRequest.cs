using Newtonsoft.Json;

namespace Webet333.models.Request.User
{
    public class RegisterBankRequest
    {
        [JsonProperty(PropertyName = "bankName")]
        public string BankName { get; set; }

        [JsonProperty(PropertyName = "accountName")]
        public string AccountName { get; set; }

        [JsonProperty(PropertyName = "accountNo")]
        public string AccountNo { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }
    }
}
