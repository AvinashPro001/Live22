using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Payments
{
    public class TransferInsertRequest
    {
        [JsonProperty(PropertyName ="userId")]
        public Guid UserId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "fromWalletId")]
        public Guid FromWalletId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "toWalletId")]
        public Guid ToWalletId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "amount")]
        public double Amount { get; set; }
    }

    public class TransferUpdateRequest: TransferInsertRequest
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }
    }
}