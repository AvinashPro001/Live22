﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.User;
using Webet333.models.Response;
using Webet333.models.Response.User;

namespace Webet333.api.Helpers
{
    public class UserHelpers : IDisposable
    {
        private string Connection = string.Empty;

        public UserHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #region Get User's List

        /// <summary>
        /// UserId use when admin call API to get Admin list.
        /// </summary>
        public async Task<List<dynamic>> GetUsers(string Role, string Keyword, BaseUrlConfigs baseUrlConfigs, string UserId = null)
        {
            using (var repository = new DapperRepository<GlobalJsonResponse>(Connection))
            {
                var result = await repository.FindAsync(StoredProcConsts.User.GetUsersByRole, new { Role, Keyword, UserId });

                if (result != null && result.DocumentListSerialized != null)
                {
                    var users = JsonConvert.DeserializeObject<List<dynamic>>(result.DocumentListSerialized);
                    users.ForEach(user =>
                    {
                        user.userICImage = (user.userICImage != null ? baseUrlConfigs.ImageBase + baseUrlConfigs.UserICImage + "/" + user.userICImage : null);
                        user.VIPBanner = (user.VIPBanner != null ? baseUrlConfigs.ImageBase + baseUrlConfigs.VIPIcon + "/" + user.VIPLevel + user.VIPBanner : null);
                    });
                    return users;
                }
                else return new List<dynamic>();
            }
        }

        #endregion Get User's List

        #region User's Bank data

        public async Task BankRegister(RegisterBankRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.User.RegisterBank, request);
            }
        }

        #endregion User's Bank data

        public async Task UpdateProfile(ProfileEditRequest request)
        {
            if (new SystemHelpers().IsValidEmail(request.Email) && new SystemHelpers().IsValidMobile(request.Mobile))
                await Update(StoredProcConsts.User.ProfileUpdate, request);
        }

        public async Task ProfileStatusUpdate(DeleteRequest request, string adminId = null, string description = null)
        {
            await Update(
                StoredProcConsts.User.ProfileUpdateStatus,
                new
                {
                    request.Id,
                    request.Active,
                    adminId,
                    description
                });
        }

        public async Task ProfileDelete(DeleteRequest request, string adminId = null, string description = null)
        {
            await Update(
                StoredProcConsts.User.ProfileDelete,
                new
                {
                    request.Id,
                    request.Active,
                    adminId,
                    description
                });
        }

        private async Task Update(string sp_name, dynamic request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(sp_name, request);
            }
        }

        public async Task<List<dynamic>> GetData(string sp_name, Guid UserId)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(sp_name, new { UserId });
                return result.ToList(); ;
            }
        }

        public async Task<List<dynamic>> GetData(string sp_name, Guid UserId, string UniqueId, string Role)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(sp_name, new { UserId, UniqueId, Role });
                return result.ToList();
            }
        }

        #region Get User's List

        public async Task<dynamic> GetUsersWinloseReport(string FromDate, string ToDate)
        {
            using (var repository = new DapperRepository<GlobalJsonResponse>(Connection))
            {
                var result = await repository.FindAsync(StoredProcConsts.User.GetUsersWinloseReport, new { FromDate, ToDate });
                if (result != null && result.DocumentListSerialized != null)
                {
                    var users = JsonConvert.DeserializeObject<List<WinloseReportResponse>>(result.DocumentListSerialized);
                    decimal totalDeposit = users.Sum(x => x.TotalDeposit);
                    decimal totalWithdraw = users.Sum(x => x.TotalWithdraw);
                    decimal totalBonus = users.Sum(x => x.TotalBonus);
                    decimal totalWinlose = users.Sum(x => x.WinLose);
                    return new { totalDeposit, totalWithdraw, totalBonus, totalWinlose, users };
                }
                return null;
            }
        }

        #endregion Get User's List

        #region House Keeping

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            if (disposing)
            {
                Connection = string.Empty;
            }
        }

        #endregion House Keeping
    }
}