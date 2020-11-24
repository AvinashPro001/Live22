using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Account
{
    public class WalletMaintenanceUpdateRequest
    {
        [Required]
        [JsonProperty(PropertyName ="id")]
        public Guid Id { get; set; }

        [Required]
        [JsonProperty(PropertyName = "maintenance")]
        public bool Maintenance { get; set; }
    }
}
