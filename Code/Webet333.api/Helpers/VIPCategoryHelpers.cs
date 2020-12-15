using System;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request.VIPCategory;

namespace Webet333.api.Helpers
{
    public class VIPCategoryHelpers: IDisposable
    {
        private string Connection = string.Empty;

        public VIPCategoryHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #region VIP Category Insert
        public async Task VIPCategoryInsert(VIPCategoryInsertRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.User.RegisterBank, request);
            }
        }
        #endregion VIP Category Insert

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