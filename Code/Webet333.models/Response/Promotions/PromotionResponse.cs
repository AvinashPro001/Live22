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

        [JsonProperty(PropertyName = "active")]
        public bool Active { get; set; }

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

        [JsonProperty(PropertyName = "isAG")]
        public bool IsAG { get; set; }

        [JsonProperty(PropertyName = "isDG")]
        public bool IsDG { get; set; }

        [JsonProperty(PropertyName = "isSA")]
        public bool IsSA { get; set; }

        [JsonProperty(PropertyName = "isPlaytech")]
        public bool IsPlaytech { get; set; }

        [JsonProperty(PropertyName = "isPlaytechSlot")]
        public bool IsPlaytechSlot { get; set; }

        [JsonProperty(PropertyName = "isPragmatic")]
        public bool IsPragmatic { get; set; }

        [JsonProperty(PropertyName = "isSexyBaccarat")]
        public bool IsSexyBaccarat { get; set; }

        [JsonProperty(PropertyName = "isWM")]
        public bool IsWM { get; set; }

        [JsonProperty(PropertyName = "isYeeBet")]
        public bool IsYeeBet { get; set; }

        [JsonProperty(PropertyName = "isAllBet")]
        public bool IsAllBet { get; set; }

        [JsonProperty(PropertyName = "isMaxbet")]
        public bool IsMaxbet { get; set; }

        [JsonProperty(PropertyName = "isM8")]
        public bool IsM8 { get; set; }

        [JsonProperty(PropertyName = "is918Kiss")]
        public bool Is918Kiss { get; set; }

        [JsonProperty(PropertyName = "isPussy888")]
        public bool IsPussy888 { get; set; }

        [JsonProperty(PropertyName = "isMega888")]
        public bool IsMega888 { get; set; }

        [JsonProperty(PropertyName = "isJoker")]
        public bool IsJoker { get; set; }

        [JsonProperty(PropertyName = "isNewMember")]
        public bool IsNewMember { get; set; }

        [JsonProperty(PropertyName = "isSports")]
        public bool IsSports { get; set; }

        [JsonProperty(PropertyName = "isCasino")]
        public bool IsCasino { get; set; }

        [JsonProperty(PropertyName = "isSlots")]
        public bool IsSlots { get; set; }

        [JsonProperty(PropertyName = "isRebate")]
        public bool IsRebate { get; set; }

        [JsonProperty(PropertyName = "isLimitedTime")]
        public bool IsLimitedTime { get; set; }

        [JsonProperty(PropertyName = "isNormal")]
        public bool IsNormal { get; set; }

        [JsonProperty(PropertyName = "isBronze")]
        public bool IsBronze { get; set; }

        [JsonProperty(PropertyName = "isSilver")]
        public bool IsSilver { get; set; }

        [JsonProperty(PropertyName = "isGold")]
        public bool IsGold { get; set; }

        [JsonProperty(PropertyName = "isPlatinum")]
        public bool IsPlatinum { get; set; }

        [JsonProperty(PropertyName = "isDiamond")]
        public bool IsDiamond { get; set; }

        [JsonProperty(PropertyName = "minDeposit")]
        public decimal MinDeposit { get; set; }

        [JsonProperty(PropertyName = "promotionFixedBonus")]
        public dynamic PromotionFixedBonus { get; set; }

        [JsonProperty(PropertyName = "isYeeBetBetLimit")]
        public bool IsYeeBetBetLimit { get; set; }
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