using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Mapping.Promotions;
using Webet333.models.Request;
using Webet333.models.Request.Promotions;
using Webet333.models.Response.Promotions;

namespace Webet333.api.Helpers
{
    public class PromotionsHelpers : IDisposable
    {
        private string Connection = string.Empty;

        public PromotionsHelpers(string Connection)
        {
            this.Connection = Connection;
        }

        public async Task<dynamic> Retrieve(BaseUrlConfigs baseUrl, PromotionRetriveRequest request, string LanguageCode, string Id = null, string Keyword = null)
        {
            List<PromotionResponse> promotions = new List<PromotionResponse>();

            using (var repository = new DapperRepository<PromotionResponse>(Connection))
            {
                var result = await repository.GetMultiDataAsync(StoredProcConsts.Promotions.Retrieve, new { Id, Keyword, LanguageCode });
                promotions = result.Read<PromotionResponse>();

                promotions = promotions.Where(x => x.IsAdmin == false).ToList();

                if (promotions != null && promotions.Count > 0)
                {
                    List<Notes> Details = result.Read<Notes>();
                    List<Notes> Terms = result.Read<Notes>();

                    if (request.IsMobile)
                        promotions.ForEach(promotion =>
                        {
                            promotion.Banner = (!string.IsNullOrEmpty(promotion.BannerMobileImage)) ? $"{baseUrl.ImageBase}{baseUrl.PromotionMobileImage}/{promotion.Id}{promotion.BannerMobileImage}" : "";
                            promotion.Details = Details.ToList().Where(x => x.ParentId == promotion.Id).ToList();
                            promotion.Terms = Terms.ToList().Where(x => x.ParentId == promotion.Id).ToList();
                        });
                    else
                        promotions.ForEach(promotion =>
                        {
                            promotion.Banner = (!string.IsNullOrEmpty(promotion.Banner)) ? $"{baseUrl.ImageBase}{baseUrl.PromotionImage}/{promotion.Id}{promotion.Banner}" : "";
                            promotion.Details = Details.ToList().Where(x => x.ParentId == promotion.Id).ToList();
                            promotion.Terms = Terms.ToList().Where(x => x.ParentId == promotion.Id).ToList();
                        });
                }

                if (!string.IsNullOrEmpty(Id))
                    return promotions?.FirstOrDefault();

                if (request.IsMain)
                    return promotions.Where(x => x.IsMain == true);

                return promotions;
            }
        }

        public async Task<dynamic> Insert(PromotionRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.Promotions.Insert, request);
            }
        }

        public async Task<dynamic> PromotionUpdate(PromotionUpdateRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.Promotions.Update, request);
            }
        }

        public async Task Update(Guid Id, string Extension, string ExtensionMobile, string adminId = null, string description = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.Promotions.Image,
                    new
                    {
                        Id,
                        Extension,
                        ExtensionMobile,
                        adminId,
                        description
                    });
            }
        }

        public async Task Delete(Guid Id, string adminId = null, string descripton = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.Promotions.Delete,
                    new
                    {
                        Id,
                        adminId,
                        descripton
                    });
            }
        }

        public async Task UpdateStatus(PromotionUpdateStatusRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.Promotions.UpdateActiveStatus,
                    new
                    {
                        request.Id,
                        request.Active,
                        request.AdminId,
                        request.Description
                    });
            }
        }

        public async Task<dynamic> SelectPromotion(BaseUrlConfigs baseUrl, string languageId, UsersPromotionRetrive request, string role)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Promotions.SelectDailyPromotion, new { languageId, request.Id, role });
                List<dynamic> promotions = result.ToList();
                if (promotions != null && promotions.Count > 0)
                    if (request.IsMobile)
                        promotions.ForEach(promotion =>
                        promotion.bannerImage = (promotion.bannerMobileImage != null && !string.IsNullOrEmpty(promotion.bannerMobileImage)) ? $"{baseUrl.ImageBase}{baseUrl.PromotionMobileImage}/{promotion.id}{promotion.bannerMobileImage}" : "");
                    else
                        promotions.ForEach(promotion =>
                        promotion.bannerImage = (promotion.bannerImage != null && !string.IsNullOrEmpty(promotion.bannerImage)) ? $"{baseUrl.ImageBase}{baseUrl.PromotionImage}/{promotion.id}{promotion.bannerImage}" : "");
                return promotions;
            }
        }

        public async Task<dynamic> RetrieveAdmin(PromotionAdminRetriveRequest request,BaseUrlConfigs baseUrl)
        {
            var promotions = new List<PromotionResponse>();
            using (var repository = new DapperRepository<PromotionResponse>(Connection))
            {
                var result = await repository.GetMultiDataAsync(StoredProcConsts.Promotions.AdminRetrieve, request);
                promotions = result.Read<PromotionResponse>();

                if (promotions != null && promotions.Count > 0)
                {
                    List<Notes> Details = result.Read<Notes>();
                    List<Notes> Terms = result.Read<Notes>();
                    promotions.ForEach(promotion =>
                    {
                        promotion.Details = Details.ToList().Where(x => x.ParentId == promotion.Id).ToList();
                        promotion.Terms = Terms.ToList().Where(x => x.ParentId == promotion.Id).ToList();
                    });

                }
                return AdminPromotionMapping.Map(promotions, baseUrl);
            }
        }

        public async Task<dynamic> PromotionApplyCheck(PromotionApplyRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.Promotions.PromotionApplyCheck, request);
            }
        }

        public async Task<dynamic> PromotionApplyList(PromotionApplySelectRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.GetDataAsync(StoredProcConsts.Promotions.PromotionApplyList, new { request.UserId, request.FromDate, request.ToDate, request.Status });
            }
        }


        public async Task<dynamic> PromotionReport(GlobalListRequest request)
        {
            using (var repository = new DapperRepository<PromotionReport>(Connection))
            {
                var result = await repository.GetMultiDataAsync(StoredProcConsts.Promotions.PromotionReport, new { request.FromDate, request.ToDate });
                List<PromotionReport> promotionReport = result.Read<PromotionReport>();
                List<PromotionTotalReports> promotionTotalReport = result.Read<PromotionTotalReports>();
                var resultss = new
                {
                    promotionReport,
                    //promotionTotalReport.FirstOrDefault().TotalDepositAmount,
                    //promotionTotalReport.FirstOrDefault().TotalIssueBonus,
                    //promotionTotalReport.FirstOrDefault().TotalWithdrawAmount,
                    //promotionTotalReport.FirstOrDefault().WinLose,
                    promotionTotalReport.FirstOrDefault().NewUserTotalDeposit,
                    promotionTotalReport.FirstOrDefault().NewUserTotalWithdraw,
                    promotionTotalReport.FirstOrDefault().OldUserTotalDeposit,
                    promotionTotalReport.FirstOrDefault().OldUserTotalWithdraw,
                    promotionTotalReport.FirstOrDefault().TotalUniqueUserDeposit,
                    promotionTotalReport.FirstOrDefault().TotalUniqueUserWithdraw,
                    promotionTotalReport.FirstOrDefault().NewUserCount,
                    promotionTotalReport.FirstOrDefault().OldUserCount
                };
                return resultss;
            }
        }

        public async Task PromotionApplyInsert(PromotionApplyInsertRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Promotions.PromotionApplyInsert, request);
            }
        }

        public async Task PromotionGroupInsert(PromotionGroupInsertRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Promotions.PromotionGroupInsert, request);
            }
        }

        public async Task PromotionGroupUpdate(PromotionGroupUpdateRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Promotions.PromotionGroupUpdate, request);
            }
        }

        public async Task PromotionGroupDelete(GetByIdRequestWithRequiredAndAdminId request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Promotions.PromotionGroupDelete, request);
            }
        }

        public async Task<List<PromotionGroupMasterSelectResponse>> PromotionGroupSelect()
        {
            List<PromotionGroupMasterSelectResponse> promotionsMaster = new List<PromotionGroupMasterSelectResponse>();
            List<PromotionGroupDetailsSelectResponse> promotionsDetails = new List<PromotionGroupDetailsSelectResponse>();
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var response = await repository.GetMultiDataAsync(StoredProcConsts.Promotions.PromotionGroupSelect, new { });
                promotionsMaster = response.Read<PromotionGroupMasterSelectResponse>();
                promotionsDetails = response.Read<PromotionGroupDetailsSelectResponse>();

                promotionsMaster.ForEach(x =>
                {
                    x.details = promotionsDetails.Where(promotionDetailsObj => promotionDetailsObj.PromotionGroupId == x.Id).ToList();
                    x.totalPromotion = promotionsDetails.Where(promotionDetailsObj => promotionDetailsObj.PromotionGroupId == x.Id).Count();
                });
                return promotionsMaster;
            }
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
