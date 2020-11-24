using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.logs.interfaces;
using Webet333.models.Configs;
using Webet333.models.Constants;

namespace Webet333.logs
{
    public class ApiLogsManager
    {
        public static string ConnectionString = string.Empty;

        public ApiLogsManager(IOptions<ConnectionConfigs> ConnectionStringsOptions)
        {
            ConnectionString = ConnectionStringsOptions.Value.DefaultConnection;
        }

        public static async Task APILogsInsert(ApiLogMangaerRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(ConnectionString))
            {
               await repository.AddOrUpdateAsync(query: StoredProcConsts.Global.ApiLog, request);
            }
        }

    }

    public class ApiLogMangaerRequest
    {
        public string apiname { get; set; }
        public string requestbody { get; set; }
        public string responsebody { get; set; }
        public string Status { get; set; }
        public int StatusCode { get; set; }
        public string createdby { get; set; }
        public string UniqueId { get; set; }
        public string Role { get; set; }

    }
}
