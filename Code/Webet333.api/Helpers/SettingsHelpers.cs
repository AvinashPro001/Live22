﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Settings;
using Webet333.models.Response.Settings;

namespace Webet333.api.Helpers
{
    public class SettingsHelpers : IDisposable
    {
        private string Connection = string.Empty;

        public SettingsHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #region House Keeping

        public void Dispose()
        {
            Disponse(true);
            GC.SuppressFinalize(this);
        }

        private void Disponse(bool disposing)
        {
            if (disposing)
            {
                Connection = string.Empty;
            }
        }

        #endregion House Keeping

        #region Bank Details

        public async Task<dynamic> GetBanksList(BaseUrlConfigs baseUrl)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var banks = await repository.GetDataAsync(StoredProcConsts.Settings.BanksRetrieve, new { });
                List<dynamic> banksList = banks.ToList();
                if (banksList != null && banksList.Count > 0)
                    banksList.ForEach(bank => bank.Logo = (bank.Logo != null && !string.IsNullOrEmpty(bank.Logo)) ? $"{baseUrl.ImageBase}{baseUrl.BankIconImage}/{bank.id}{bank.Logo}" : "");
                return banks;
            }
        }

        #endregion Bank Details

        #region Admin Bank Details

        public async Task<dynamic> GetAdminBankDetails(BaseUrlConfigs baseUrl, string languageId)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var data = await repository.GetMultiDataAsync(StoredProcConsts.Settings.AdminBankDetailsWithNoteTransactionLimitRetrieve, new { NoteType = NoteTypesContst.Bank, languageId });
                List<dynamic> bankDetails = data.Read<dynamic>();
                if (bankDetails != null && bankDetails.Count > 0)
                {
                    bankDetails.ForEach(bank =>
                    {
                        bank.bankLogo = (bank.bankLogo != null && !string.IsNullOrEmpty(bank.bankLogo)) ? $"{baseUrl.ImageBase}{baseUrl.BankImage}/{bank.id}{bank.bankLogo}" : "";
                        bank.bankIconLogo = (bank.bankIconLogo != null && !string.IsNullOrEmpty(bank.bankIconLogo)) ? $"{baseUrl.ImageBase}{baseUrl.AdminBankIconImage}/{bank.id}{bank.bankIconLogo}" : "";
                    });
                }

                List<dynamic> trancations = data.Read<dynamic>();
                dynamic trancationLimit = from trancation in trancations
                                          group trancation by new { trancation.transactionType } into trancation_group
                                          select new { trancation_group.Key.transactionType, details = trancation_group };
                var notes = data.Read<dynamic>();
                return new { bankDetails, trancationLimit, notes };
            }
        }

        internal async Task<dynamic> GetAllAdminBank(BaseUrlConfigs baseUrl)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var data = await repository.GetDataAsync(StoredProcConsts.Settings.AdminAllBank, new { });
                List<dynamic> bankDetails = data.ToList();
                foreach (var banklogo in bankDetails)
                {
                    if (banklogo.BankLogo != null)
                    {
                        banklogo.BankLogo = (banklogo.BankLogo != null && !string.IsNullOrEmpty(banklogo.BankLogo) ? $"{baseUrl.ImageBase}{baseUrl.BankImage}/{banklogo.Id}{banklogo.BankLogo}" : "");
                    }

                    if (banklogo.BankIconLogo != null)
                        banklogo.BankIconLogo = (banklogo.BankIconLogo != null && !string.IsNullOrEmpty(banklogo.BankIconLogo) ? $"{baseUrl.ImageBase}{baseUrl.AdminBankIconImage}/{banklogo.Id}{banklogo.BankIconLogo}" : "");
                }
                return new { bankDetails };
            }
        }

        public async Task AddOrUpdateAdminBankDetails(dynamic request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Settings.AdminBankDetailsInsertOrUpdate, request);
            }
        }

        public async Task<dynamic> AddAdminBankDetails(dynamic request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var bankId = await repository.GetDataAsync(StoredProcConsts.Settings.AdminBankDetailsInsertOrUpdate, request);
                return bankId;
            }
        }

        public async Task DeleteOrActiveAdminBankDetail(Guid Id, bool Active = true, bool Deleted = false, string adminId = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.Settings.AdminBankDetailsDeleteOrActive,
                    new
                    {
                        Id,
                        Active,
                        Deleted,
                        adminId
                    });
            }
        }

        public async Task AddWalletType(AddWalletTypes request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Payments.WalletTypesInsert, request);
            }
        }

        public async Task AdminBankDetailsImageUpdate(Guid Id, string Extension, string adminId = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.Settings.AdminBankDetailsImageUpdate,
                    new
                    {
                        Id,
                        Extension,
                        adminId
                    });
            }
        }

        #endregion Admin Bank Details

        #region Announcement Details

        public async Task<dynamic> GetAnnouncementList(string languageId = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.GetDataAsync(StoredProcConsts.Settings.AnnouncementList, new { languageId });
            }
        }

        public async Task DeleteOrActiveAnnouncementDetail(Guid Id, bool Active = false, bool Delete = true, string adminId = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.Settings.AnnouncementDelete,
                    new
                    {
                        Id,
                        Active,
                        Delete,
                        adminId
                    });
            }
        }

        public async Task<dynamic> GetAnnouncementAdd(AnnouncementInsertRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.GetDataAsync(
                    StoredProcConsts.Settings.AnnouncementAdd,
                    new
                    {
                        request.Text,
                        request.LanguageId,
                        request.AdminId
                    });
            }
        }

        public async Task<dynamic> GetAnnouncementUpdate(AnnouncementUpdateRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.AddOrUpdateAsync(
                    StoredProcConsts.Settings.AnnouncementUpdate,
                    new
                    {
                        request.Id,
                        request.Text,
                        request.LanguageId,
                        request.AdminId
                    });
            }
        }

        #endregion Announcement Details

        #region Contact Management

        #region Contact Type API's

        #region Contact Type Insert

        public async Task<dynamic> AddContactType(ContactTypeAddRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.User.ContactType_Insert, request);
            }
        }

        #endregion Contact Type Insert

        #region Contact Type Update

        public async Task<dynamic> UpdateContactType(ContactTypeUpdateRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.User.ContactType_Update, request);
            }
        }

        #endregion Contact Type Update

        #region Contact Type Select

        public async Task<List<ContactTypeSelectResponse>> SelectContactType()
        {
            using (var repository = new DapperRepository<ContactTypeSelectResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.User.ContactType_Select, new { });
                return result.ToList();
            }
        }

        #endregion Contact Type Select

        #endregion Contact Type API's

        #region Contact Type Details API's

        #region Contact Type Details Add

        public async Task<dynamic> AddContactTypeDetails(ContactTypeDetailsAddRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.User.ContactTypeDetails_Insert, request);
            }
        }

        #endregion Contact Type Details Add

        #region Contact Type Details Update

        public async Task<dynamic> UpdateContactTypeDetails(ContactTypeDetailsUpdateRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.User.ContactTypeDetails_Update, request);
            }
        }

        #endregion Contact Type Details Update

        #region Contact Type Details Select

        public async Task<List<ContactTypeDetailsSelectResponse>> SelectContactTypeDetails()
        {
            using (var repository = new DapperRepository<ContactTypeDetailsSelectResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.User.ContactTypeDetails_Select, new { });
                return result.ToList();
            }
        }

        #endregion Contact Type Details Select

        #endregion Contact Type Details API's

        #endregion Contact Management

        #region Home Page Banner Management

        #region Insert

        internal async Task<dynamic> HomePageBannerInsertAsync(HomePageBannerAddRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(
                    StoredProcConsts.Settings.HomePageBannersPersist,
                    new
                    {
                        LanguageId = request.LanguageId,
                        Title = request.Title,
                        Sequence = request.Sequence,

                        AdminId = request.AdminId
                    });
            }
        }

        #endregion Insert

        #region Update

        internal async Task<dynamic> HomePageBannerUpdateAsync(HomePageBannerUpdateRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(
                    StoredProcConsts.Settings.HomePageBannersPersist,
                    new
                    {
                        Id = request.Id,
                        LanguageId = request.LanguageId,
                        Title = request.Title,
                        Sequence = request.Sequence,

                        AdminId = request.AdminId
                    });
            }
        }

        #endregion Update

        #region Insert / Update Image

        internal async Task HomePageBannerImageAsync(Guid Id, string ExtensionWeb, string ExtensionMobile, string adminId = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.Settings.HomePageBannersUpdateImage,
                    new
                    {
                        Id,
                        ExtensionWeb,
                        ExtensionMobile,
                        adminId
                    });
            }
        }

        #endregion Insert / Update Image

        #region Delete

        internal async Task HomePageBannerDeleteAsync(Guid Id, string adminId = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.Settings.HomePageBannersDelete,
                    new
                    {
                        Id,
                        adminId
                    });
            }
        }

        #endregion Delete

        #region Update Status

        internal async Task HomePageBannerUpdateStatusAsync(UpdateStatusWithAdminIdRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.Settings.HomePageBannersUpdateActiveStatus,
                    new
                    {
                        request.Id,
                        request.Active,
                        request.AdminId
                    });
            }
        }

        #endregion Update Status

        #region Select By Users

        internal async Task<dynamic> HomePageBannerSelectUserAsync(
            BaseUrlConfigs baseUrl,
            string languageId,
            HomePageBannerRetriveRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(
                    StoredProcConsts.Settings.HomePageBannersSelect,
                    new
                    {
                        languageId,
                        request.isUser
                    });

                List<dynamic> homePageBanners = result.ToList();

                if (homePageBanners.Any())
                {
                    homePageBanners.ForEach(
                        banner =>
                        {
                            banner.BannerWeb = $"{baseUrl.ImageBase}{baseUrl.HomePageBannerWebleImage}/{banner.Id}{banner.BannerWeb}";
                            banner.BannerMobile = $"{baseUrl.ImageBase}{baseUrl.HomePageBannerMobileImage}/{banner.Id}{banner.BannerMobile}";
                        }
                    );
                }

                return homePageBanners;
            }
        }

        #endregion Select By Users

        #region Select By Admin

        internal async Task<dynamic> HomePageBannerSelectByAdminAsync(
            BaseUrlConfigs baseUrl,
            string languageId,
            HomePageBannerRetriveByAdminRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(
                    StoredProcConsts.Settings.HomePageBannersSelect,
                    new
                    {
                        languageId,
                        request.isUser
                    });

                List<dynamic> homePageBanners = result.ToList();

                if (homePageBanners.Any())
                {
                    homePageBanners.ForEach(
                        banner =>
                        {
                            banner.BannerWeb = $"{baseUrl.ImageBase}{baseUrl.HomePageBannerWebleImage}/{banner.id}{banner.bannerWeb}";
                            banner.BannerMobile = $"{baseUrl.ImageBase}{baseUrl.HomePageBannerMobileImage}/{banner.id}{banner.bannerMobile}";
                        }
                    );
                }

                return homePageBanners;
            }
        }

        #endregion Select By Admin

        #endregion Home Page Banner Management
    }
}