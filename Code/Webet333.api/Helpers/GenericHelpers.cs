using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using Webet333.api.Filters;
using Webet333.dapper;
using Webet333.files.interfaces;
using Webet333.models.Mapping.Permissions;
using Webet333.models.Response.Account;

namespace Webet333.api.Helpers
{
    public class GenericHelpers : IDisposable
    {
        #region Object Delcatation

        private string Connection { get; set; }

        public GenericHelpers(string Connection = null)
        {
            this.Connection = Connection ?? throw new ApiException(nameof(Connection), 400);
        }

        #endregion Object Delcatation

        #region House Keeping

        public void Dispose()
        {
            GC.SuppressFinalize(this);
            this.Dispose(true);
        }

        public void Dispose(bool disposing)
        {
            if (disposing)
            {
                Connection = string.Empty;
            }
        }

        #endregion House Keeping

        #region Get Data Generic Functions

        public List<dynamic> GetList(string stored_proc, object param)
        {
            using (var GetRepository = new DapperRepository<dynamic>(Connection))
                return GetRepository.GetData(stored_proc, param, System.Data.CommandType.StoredProcedure).ToList();
        }

        public dynamic Find(string stored_proc, object param)
        {
            using (var GetRepository = new DapperRepository<dynamic>(Connection))
                return GetRepository.Find(stored_proc, param, System.Data.CommandType.StoredProcedure);
        }

        #endregion Get Data Generic Functions

        #region Get Image

        public void GetImage(IUploadManager uploadManager, string file, string folder, string name)
        {
            uploadManager.Store(file, name, folder);
        }

        #endregion Get Image

        #region Delete Image

        public void DeleteImage(IUploadManager uploadManager, string file, string folder)
        {
            uploadManager.Delete(file, folder);
        }

        #endregion Delete Image

        #region Get Image With Extension

        public void GetImageWithExtension(IUploadManager uploadManager, string file, string folder, string name, string extension)
        {
            uploadManager.StoreWithExtension(file, name, folder, extension);
        }

        #endregion Get Image With Extension

        #region Calculate Total page

        public static int CalculateTotalPages(dynamic total, int? pageSize)
        {
            var pages = Convert.ToDecimal(total) / pageSize;
            var response = pages < 1 ? 1 : Convert.ToInt32(Math.Ceiling(pages));
            return response;
        }

        #endregion Calculate Total page

        #region Bind Permission

        public ICollection<MenusResponse> BindPermissionList(
            string permission,
            string defaultPermission)
        {
            if (string.IsNullOrEmpty(permission)) return null;

            var permissionList = JsonConvert.DeserializeObject<ICollection<MenusResponse>>(permission);

            if (!string.IsNullOrEmpty(defaultPermission))
            {
                var defaultPermissionList = JsonConvert.DeserializeObject<ICollection<MenusResponse>>(defaultPermission);

                if (defaultPermissionList == null || defaultPermissionList.Count == 0) return permissionList;

                var response = new PermissionsMapping().Map(permissionList, defaultPermissionList);

                return response;
            }

            return permissionList.OrderBy(x => x.Priority).ToList();
        }

        public ICollection<MenusResponse> BindDefaultPermissionList(string defaultPermission)
        {
            if (string.IsNullOrEmpty(defaultPermission)) return null;

            var response = JsonConvert.DeserializeObject<ICollection<MenusResponse>>(defaultPermission);

            return response.OrderBy(x => x.Priority).ToList();
        }

        #endregion Bind Permission
    }
}