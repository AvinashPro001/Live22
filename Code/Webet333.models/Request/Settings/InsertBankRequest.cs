using Newtonsoft.Json;
using System;

namespace Webet333.models.Request.Settings
{
    public class InsertUserBankRequest
    {
        [JsonProperty(PropertyName = "bankName")]
        public string BankName { get; set; }

        [JsonProperty(PropertyName = "accountName")]
        public string AccountName { get; set; }

        [JsonProperty(PropertyName = "accountNo")]
        public string AccountNo { get; set; }
    }

    public class UpdateUserBankRequest: InsertUserBankRequest
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }
    }
}
