using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request.VIPCategory;

namespace Webet333.api.Helpers
{
    public class VIPCategoryHelpers : IDisposable
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
                await repository.AddOrUpdateAsync(StoredProcConsts.VIPCategory.VIPCategoryInsert, request);
            }
        }

        #endregion VIP Category Insert

        #region VIP Category Select

        public async Task<dynamic> VIPCategorySelect()
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var res = await repository.FindAsync(StoredProcConsts.VIPCategory.VIPCategorySettingSelect, new { });
                return res;
            }
        }

        #endregion VIP Category Select

        #region Get VIP Level List

        public async Task<List<dynamic>> GetVIPLevelList(BaseUrlConfigs baseUrlConfigs)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.VIPCategory.VIPCategorySelect, new { });
                var response = result.ToList();
                response.ForEach(x =>
                {
                    x.Icon = (x.Icon != null ? baseUrlConfigs.ImageBase + baseUrlConfigs.VIPIcon + "/" + x.Id + x.Icon : null);
                });
                return response;
            }
        }

        #endregion Get VIP Level List

        #region VIP Level Update

        public async Task UserVIPLevelUpdate(UserVIPLevelUpdateRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.VIPCategory.UserVIPLevelUpdate, request);
            }
        }

        #endregion VIP Level Update

        public async Task GiveFreeCredit()
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.GetDataAsync(StoredProcConsts.VIPCategory.VIPFreeCredit, new { });
            }
        }

        public async Task<dynamic> GetFreeCreditPromotionSetting()
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.VIPCategory.VIPFreeCreditPromotionSetting, new { });
            }
        }

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