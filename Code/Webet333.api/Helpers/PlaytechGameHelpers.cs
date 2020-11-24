using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Response.Game.Playtech;

namespace Webet333.api.Helpers
{
    public class PlaytechGameHelpers : IDisposable
    {

        #region Local Variables

        private string Connection = string.Empty;



        private static readonly HttpClient client = new HttpClient();

        public PlaytechGameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion

        #region Call Broken API of Playtech game 

        public static async Task<PlaytechBrokenStatusResponse> CallPlaytechBrokenAPI(string username, IHostingEnvironment _hostingEnvironment)
        {
            var PlaytechURL = $"{GameConst.Playtech.playtechBaseUrl}" +
                               $"brokengames?playername={username.ToUpper()}";

            DefaultHelper defaultHelper = new DefaultHelper(_hostingEnvironment);
            try
            {
                var resultPlaytech = JsonConvert.DeserializeObject<PlaytechBrokenStatusResponse>(await defaultHelper.PlaytechAPICertificate(PlaytechURL, returnResult: true));
                return resultPlaytech;

            }
            catch (Exception ex)
            {
                return new PlaytechBrokenStatusResponse();
            }

        }

        #endregion

        #region Broken Status Update

        internal async Task BrokenStatusUpdate(string Username, string Status, string Response)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Playtech.BrokenTokenUpdate, new { Username, Status, Response });
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
