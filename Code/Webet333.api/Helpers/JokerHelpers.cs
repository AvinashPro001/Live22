using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request.Game;
using Webet333.models.Response.Game.Joker;

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

        #endregion Local Variables

        #region Joker Broken status

        internal async Task<dynamic> JokerBrokenStatus(string UserId)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.Joker.BrokenStatus, new { UserId });
            }
        }

        #endregion Joker Broken status

        #region Call Joker Register API

        internal static async Task<JokerRegisterResponse> JokerRegister(string Username)
        {
            Username = Regex.Replace(Username, @"[^0-9a-zA-Z]+", "");
            DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Local);
            var temp = (long)DateTime.UtcNow.Subtract(UnixEpoch).TotalSeconds;
            var perameter = $"Method={GameConst.Joker.EnsureUserAccount}&Timestamp={temp}&Username={Username}";
            var stringContent = new StringContent(perameter, Encoding.UTF8, "application/x-www-form-urlencoded");

            var jokerURL = $"{GameConst.Joker.jokerBaseUrl}?" +
                           $"AppID={GameConst.Joker.AppID}&" +
                           $"Signature={GameHelpers.GenerateHas(perameter)}";
            dynamic apiResult = JsonConvert.DeserializeObject<JokerRegisterResponse>(await GameHelpers.CallThirdPartyApi(jokerURL, stringContent));

            return apiResult;
        }

        #endregion Call Joker Register API

        #region Register Joker Game in DB

        internal async Task<dynamic> GameJokerRegister(GameJokerRegisterRequest request)
        {
            string response = request.APIResponse.ToString(Newtonsoft.Json.Formatting.None);
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.Game.GameJokerRegister, new { request.UserId, request.JokerUserName, APIResponse = response });
            }
        }

        #endregion Register Joker Game in DB

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

        #endregion House Keeping
    }
}