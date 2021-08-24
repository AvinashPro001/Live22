using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Promotions
{
    public class PromotionRequest : BaseAdminLogRequest
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

        //[Required]
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

        //[Required]
        [JsonProperty(PropertyName = "maxbonus")]
        public decimal MaxBonus { get; set; }

        [JsonProperty(PropertyName = "minDeposit")]
        public decimal MinDeposit { get; set; }

        [JsonProperty("fixedBonus")]
        public System.Collections.Generic.List<PromotionFixedBonusAmount> FixedBonus { get; set; }

        [JsonProperty(PropertyName = "isLiveCategory")]
        public bool IsLiveCategory { get; set; }

        [JsonProperty(PropertyName = "isSportsCategory")]
        public bool IsSportsCategory { get; set; }

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

        [JsonProperty(PropertyName = "isPragmaticCasino")]
        public bool IsPragmaticCasino { get; set; }

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

        [JsonProperty(PropertyName = "isSBO")]
        public bool IsSBO { get; set; }

        [JsonProperty(PropertyName = "isGamePlayCasino")]
        public bool IsGamePlayCasino { get; set; }

        [JsonProperty(PropertyName = "isGamePlaySlot")]
        public bool IsGamePlaySlot { get; set; }

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

        [JsonProperty(PropertyName = "isYeeBetBetLimit")]
        public bool IsYeeBetBetLimit { get; set; }
    }

    public class PromotionUpdateRequest : PromotionRequest
    {
        [Required]
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
    }

    public class PromotionFixedBonusAmount
    {
        public Guid? id { get; set; } = Guid.NewGuid();

        public decimal? depositAmount { get; set; }

        public decimal? bonusAmount { get; set; }
    }
}