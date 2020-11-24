using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request.Settings;

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
        #endregion

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
        #endregion

        #region Admin Bank Details
        public async Task<dynamic> GetAdminBankDetails(BaseUrlConfigs baseUrl ,string languageId)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var data = await repository.GetMultiDataAsync(StoredProcConsts.Settings.AdminBankDetailsWithNoteTransactionLimitRetrieve, new { NoteType = NoteTypesContst.Bank, languageId });
                List<dynamic> bankDetails = data.Read<dynamic>();
                if (bankDetails != null && bankDetails.Count > 0)
                    bankDetails.ForEach(bank => bank.bankLogo = (bank.bankLogo != null && !string.IsNullOrEmpty(bank.bankLogo)) ? $"{baseUrl.ImageBase}{baseUrl.BankImage}/{bank.id}{bank.bankLogo}" : "");
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

        public async Task DeleteOrActiveAdminBankDetail(Guid Id, bool Active = true, bool Deleted = false)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Settings.AdminBankDetailsDeleteOrActive, new { Id, Active, Deleted });
            }
        }

        public async Task AddWalletType(AddWalletTypes request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Payments.WalletTypesInsert, request);
            }
        }

        public async Task AdminBankDetailsImageUpdate(Guid Id, string Extension)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Settings.AdminBankDetailsImageUpdate, new { Id, Extension });
            }
        }
        #endregion

        #region Announcement Details
        public async Task<dynamic> GetAnnouncementList(string languageId=null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.GetDataAsync(StoredProcConsts.Settings.AnnouncementList, new { languageId });
            }
        }

        public async Task DeleteOrActiveAnnouncementDetail(Guid Id, bool Active = false, bool Delete = true)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Settings.AnnouncementDelete, new { Id, Active, Delete });
            }
        }

        public async Task<dynamic> GetAnnouncementAdd(AnnouncementInsertRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.GetDataAsync(StoredProcConsts.Settings.AnnouncementAdd, new { request.Text,request.LanguageId });
            }
        }

        public async Task<dynamic> GetAnnouncementUpdate(AnnouncementUpdateRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.AddOrUpdateAsync(StoredProcConsts.Settings.AnnouncementUpdate, new {request.Id, request.Text, request.LanguageId });
            }
        }
        #endregion

    }
}
