using System.Collections.Generic;
using System.Linq;
using Webet333.models.Configs;
using Webet333.models.Response.Promotions;

namespace Webet333.models.Mapping.Promotions
{
    public class AdminPromotionMapping
    {
        public static List<PromotionResponseWithMobileBanner> Map(List<PromotionResponse> promotionResponses, BaseUrlConfigs baseUrl)
        {
            var response = promotionResponses.Select(x => new PromotionResponseWithMobileBanner
            {
                Description = x.Description,
                Details = x.Details,
                Discount = x.Discount,
                DiscountType = x.DiscountType,
                EndDate = x.EndDate,
                EndTime = x.EndTime,
                Id = x.Id,
                IsDailyAvail = x.IsDailyAvail,
                IsDepositPage = x.IsDepositPage,
                LanguageId = x.LanguageId,
                LanguageName = x.LanguageName,
                Title = x.Title,
                Sequence = x.Sequence,
                StartDate = x.StartDate,
                StartTime = x.StartTime,
                Terms = x.Terms,
                Banner = (!string.IsNullOrEmpty(x.Banner)) ? $"{baseUrl.ImageBase}{baseUrl.PromotionImage}/{x.Id}{x.Banner}" : "",
                MobileBanner = (!string.IsNullOrEmpty(x.BannerMobileImage)) ? $"{baseUrl.ImageBase}{baseUrl.PromotionMobileImage}/{x.Id}{x.BannerMobileImage}" : "",
                TurnoverTime=x.TurnoverTime,
                MaxBonus=x.MaxBonus,
                IsAdmin=x.IsAdmin,
                IsPerUserOnly=x.IsPerUserOnly,
                BankAccountClaimOnce=x.BankAccountClaimOnce,
                IsMain=x.IsMain,
                IsLiveCategory = x.IsLiveCategory,
                IsSportsCategory = x.IsSportsCategory,
                WinTurn =x.WinTurn
                
            }).ToList();
            return response;
        }
    }
}
