using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.PaymentGateway
{
    public class PaymentGatewayVerifiedRequest
    {
        [Required]
        public string contract { get; set; }

        [Required]
        public string apikey { get; set; }

        [Required]
        public string transaction { get; set; }

        [Required]
        public string status { get; set; }

        [Required]
        public string status_message { get; set; }

        public string decline_reason { get; set; }

        [Required]
        public string ItemID { get; set; }

        [Required]
        public string ItemDescription { get; set; }

        [Required]
        public string Amount { get; set; }

        [Required]
        public string total_fees { get; set; }

        [Required]
        public string Currency { get; set; }

        [Required]
        public string ClientName { get; set; }

        public string bank_name { get; set; }

        public string bank_account { get; set; }

        public string BusinessAcct { get; set; }

        public string src_bank_account { get; set; }

        public string bank_reference { get; set; }

        [Required]
        public string signature2 { get; set; }

        [Required]
        public string created_at { get; set; }

        [Required]
        public string updated_at { get; set; }
    }
}