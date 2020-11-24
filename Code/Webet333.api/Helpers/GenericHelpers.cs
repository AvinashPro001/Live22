using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using Webet333.api.Filters;
using Webet333.dapper;
using Webet333.files.interfaces;

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
        #endregion

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
        #endregion

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
        #endregion

        public void GetImage(IUploadManager uploadManager, string file, string folder, string name)
        {
            uploadManager.Store(file, name, folder);
        }

        public void DeleteImage(IUploadManager uploadManager, string file, string folder)
        {
            uploadManager.Delete(file, folder);
        }

        public void GetImageWithExtension(IUploadManager uploadManager, string file, string folder, string name,string extension)
        {
            uploadManager.StoreWithExtension(file, name, folder,extension);
        }
    }
}
