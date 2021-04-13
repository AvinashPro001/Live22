using Newtonsoft.Json;

namespace Webet333.models.Response.PaymentGateway
{
    public class CheckPaymentStatusResponse
    {
        [JsonProperty("transaction")]
        public string Transaction { get; set; }

        [JsonProperty("status")]
        public int Status { get; set; }

        [JsonProperty("status_description")]
        public string StatusDescription { get; set; }

        [JsonProperty("token")]
        public string Token { get; set; }

        [JsonProperty("itemID")]
        public string ItemID { get; set; }

        [JsonProperty("itemDescription")]
        public string ItemDescription { get; set; }

        [JsonProperty("amount")]
        public decimal Amount { get; set; }

        [JsonProperty("total_fees")]
        public double TotalFees { get; set; }

        [JsonProperty("BusinessAcct")]
        public string BusinessAcct { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }

        [JsonProperty("bank_name")]
        public string BankName { get; set; }

        [JsonProperty("bank_code")]
        public string BankCode { get; set; }

        [JsonProperty("bank_account")]
        public string BankAccount { get; set; }

        [JsonProperty("src_bank_account")]
        public string SrcBankAccount { get; set; }

        [JsonProperty("bank_reference")]
        public string BankReference { get; set; }

        [JsonProperty("created_at")]
        public string CreatedAt { get; set; }

        [JsonProperty("updated_at")]
        public string UpdatedAt { get; set; }
    }
}