using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Account;
using Webet333.models.Request.User;
using Webet333.models.Response;

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
        public async Task<List<dynamic>> GetUsers(string Role, string Keyword, string ImagePath)
        {
            using (var repository = new DapperRepository<GlobalJsonResponse>(Connection))
            {
                var result = await repository.FindAsync(StoredProcConsts.User.GetUsersByRole, new { Role, Keyword });
                var users = JsonConvert.DeserializeObject<List<dynamic>>(result.DocumentListSerialized);
                users.ForEach(user =>
                {
                    user.userICImage = (user.userICImage != null ? ImagePath + "/" +  user.userICImage : null);
                });
                return users;
            }
        }
        #endregion

        #region User's Bank data
        public async Task BankRegister(RegisterBankRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.User.RegisterBank, request);
            }
        }
        #endregion

        public async Task UpdateProfile(ProfileEditRequest request)
        {
            if (new SystemHelpers().IsValidEmail(request.Email) && new SystemHelpers().IsValidMobile(request.Mobile))
                await Update(StoredProcConsts.User.ProfileUpdate, request);
        }

        public async Task ProfileStatusUpdate(DeleteRequest request)
        {
            await Update(StoredProcConsts.User.ProfileUpdateStatus, request);
        }

        public async Task ProfileDelete(DeleteRequest request)
        {
            await Update(StoredProcConsts.User.ProfileDelete, request);
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

        public async Task<List<dynamic>> GetData(string sp_name, Guid UserId, string FullName)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(sp_name, new { UserId });
                return result.ToList();
            }
        }

        #region Get User's List
        public async Task<List<dynamic>> GetUsersWinloseReport(string FromDate, string ToDate)
        {
            using (var repository = new DapperRepository<GlobalJsonResponse>(Connection))
            {
                var result = await repository.FindAsync(StoredProcConsts.User.GetUsersWinloseReport, new { FromDate, ToDate});
                var users = JsonConvert.DeserializeObject<List<dynamic>>(result.DocumentListSerialized);
                return users;
            }
        }
        #endregion

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
        #endregion
    }
}
