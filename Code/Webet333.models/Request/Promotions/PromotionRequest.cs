using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Promotions
{
    public class PromotionRequest
    {
        [Required]
        [JsonProperty(PropertyName = "bankAccountClaimOnce")]
        public bool BankAccountClaimOnce { get; set; }
        
        [Required]
        [JsonProperty(PropertyName = "isdailyavail")]
        public bool IsDailyAvail { get; set; }

        [Required]
        [JsonProperty(PropertyName = "ismain")]
        public bool IsMain { get; set; }

        [Required]
        [JsonProperty(PropertyName = "isperuseronly")]
        public bool IsPerUserOnly { get; set; }

        [Required]
        [JsonProperty(PropertyName = "isadmin")]
        public bool IsAdmin { get; set; }

        [Required]
        [JsonProperty(PropertyName = "isdepositpage")]
        public bool IsDepositPage { get; set; }

        [Required]
        [JsonProperty(PropertyName = "languageid")]
        public string LanguageId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "startDate")]
        public string StartDate { get; set; }

        [Required]
        [JsonProperty(PropertyName = "endDate")]
        public string EndDate { get; set; }

        [Required]
        [JsonProperty(PropertyName = "startTime")]
        public string StartTime { get; set; }

        [Required]
        [JsonProperty(PropertyName = "endTime")]
        public string EndTime { get; set; }

        [Required]
        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }

        [Required]
        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [Required]
        [JsonProperty(PropertyName = "banner")]
        public string Banner { get; set; }

        [Required]
        [JsonProperty(PropertyName = "discountType")]
        public string DiscountType { get; set; }

        [Required]
        [JsonProperty(PropertyName = "discount")]
        public string Discount { get; set; }

        [Required]
        [JsonProperty(PropertyName = "sequence")]
        public int Sequence { get; set; }

        [Required]
        [JsonProperty(PropertyName = "turnovertime")]
        public int TurnoverTime { get; set; }

        [Required]
        [JsonProperty(PropertyName = "winturn")]
        public int WinTurn { get; set; }

        [Required]
        [JsonProperty(PropertyName = "maxbonus")]
        public decimal MaxBonus { get; set; }

        [JsonProperty(PropertyName = "isLiveCategory")]
        public bool IsLiveCategory { get; set; }

        [JsonProperty(PropertyName = "isSportsCategory")]
        public bool IsSportsCategory { get; set; }
    }

    public class PromotionUpdateRequest:PromotionRequest
    {
        [Required]
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
    }

}
