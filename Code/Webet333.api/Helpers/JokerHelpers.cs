using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;

namespace Webet333.api.Helpers
{
    public class JokerHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public JokerHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion

        #region Joker Broken status

        internal async Task<dynamic> JokerBrokenStatus(string UserId)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
              return await repository.FindAsync(StoredProcConsts.Joker.BrokenStatus, new { UserId});
            }
        }

        #endregion


        #region House Keeping

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Dispose(bool dispose)
        {
            if (dispose)
            {
                Connection = string.Empty;
            }
        }

        #endregion
    }
}
