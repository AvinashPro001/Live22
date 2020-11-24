using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Webet333.models.Response.Promotions
{
    public class PromotionResponse
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }

        [JsonProperty(PropertyName = "startDate")]
        public DateTime StartDate { get; set; }

        [JsonProperty(PropertyName = "endDate")]
        public DateTime EndDate { get; set; }

        [JsonProperty(PropertyName = "startTime")]
        public dynamic StartTime { get; set; }

        [JsonProperty(PropertyName = "endTime")]
        public dynamic EndTime { get; set; }

        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "banner")]
        public string Banner { get; set; }

        [JsonProperty(PropertyName = "bannerMobileImage")]
        public string BannerMobileImage { get; set; }

        [JsonProperty(PropertyName = "discountType")]
        public string DiscountType { get; set; }

        [JsonProperty(PropertyName = "discount")]
        public string Discount { get; set; }

        [JsonProperty(PropertyName = "sequence")]
        public int Sequence { get; set; }

        [JsonProperty(PropertyName = "languageId")]
        public Guid LanguageId { get; set; }

        [JsonProperty(PropertyName = "languageName")]
        public string LanguageName { get; set; }

        [JsonProperty(PropertyName = "isdailyavail")]
        public bool IsDailyAvail { get; set; }

        [JsonProperty(PropertyName = "isdepositpage")]
        public bool IsDepositPage { get; set; }

        [JsonProperty(PropertyName = "isperuseronly")]
        public bool IsPerUserOnly { get; set; }

        [JsonProperty(PropertyName = "isadmin")]
        public bool IsAdmin { get; set; }

        [JsonProperty(PropertyName = "bankAccountClaimOnce")]
        public bool BankAccountClaimOnce { get; set; }

        [JsonProperty(PropertyName = "isMain")]
        public bool IsMain { get; set; }

        [JsonProperty(PropertyName = "isLiveCategory")]
        public bool IsLiveCategory { get; set; }

        [JsonProperty(PropertyName = "isSportsCategory")]
        public bool IsSportsCategory { get; set; }

        [JsonProperty(PropertyName = "turnovertime")]
        public int TurnoverTime { get; set; }

        [JsonProperty(PropertyName = "winturn")]
        public int WinTurn { get; set; }

        [JsonProperty(PropertyName = "maxbonus")]
        public decimal MaxBonus { get; set; }

        [JsonProperty(PropertyName = "details")]
        public List<Notes> Details { get; set; }

        [JsonProperty(PropertyName = "terms")]
        public List<Notes> Terms { get; set; }


    }

    public class Notes
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }

        [JsonProperty(PropertyName = "note")]
        public string Note { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "parentId")]
        public Guid ParentId { get; set; }
    }

    public class PromotionResponseWithMobileBanner : PromotionResponse
    {

        [JsonProperty(PropertyName = "mobilebanner")]
        public string MobileBanner { get; set; }


    }


}
