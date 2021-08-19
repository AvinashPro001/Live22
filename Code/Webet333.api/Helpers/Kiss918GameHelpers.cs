using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request.Game;
using Webet333.models.Response.Game.Kiss918;

namespace Webet333.api.Helpers
{
    public class Kiss918GameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public Kiss918GameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion Local Variables

        #region Call Kiss 918 Random Username API

        internal static async Task<Kiss918RandomUsernameResponse> Kiss918RandomUsername()
        {
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

            var URL = $"{GameConst.Kiss918.baseURL}account.ashx?" +
                           $"action={GameConst.Kiss918.randomUsername}" +
                           $"&userName={GameConst.Kiss918.agent}" +
                           $"&UserAreaId=1" +
                           $"&time={timestamp}" +
                           $"&authcode={GameConst.Kiss918.authcode}" +
                           $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Kiss918.authcode.ToLower() + GameConst.Kiss918.agent + timestamp + GameConst.Kiss918.SecretKey.ToLower()).ToUpper()}";

            dynamic apiResult = JsonConvert.DeserializeObject<Kiss918RandomUsernameResponse>(await GameHelpers.CallThirdPartyApi(URL, null));

            return apiResult;
        }

        #endregion Call Kiss 918 Random Username API

        #region Call Kiss 918 Register API

        internal static async Task<Kiss918RegisterResponse> Kiss918Register(string Username, string Password, string MobileNo)
        {
            Password = "WB3@" + Password;
            if (Password.Length > 14)
                Password = Password.Substring(0, 14);

            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

            var URL = $"{GameConst.Kiss918.baseURL}account.ashx?" +
                           $"action={GameConst.Kiss918.AddUser}" +
                           $"&agent={GameConst.Kiss918.agent}" +
                           $"&userName={Username}" +
                           $"&PassWd={Password}" +

                           $"&Name={Username}Webet333" +
                           $"&Tel={MobileNo}" +
                           $"&Memo=null" +
                           $"&UserType={GameConst.Kiss918.PlayerType}" +

                           $"&UserAreaId=1" +
                           $"&time={timestamp}" +
                           $"&authcode={GameConst.Kiss918.authcode}" +
                           $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Kiss918.authcode.ToLower() + Username + timestamp + GameConst.Kiss918.SecretKey.ToLower()).ToUpper()}" +
                           $"&pwdtype=1";

            dynamic apiResult = JsonConvert.DeserializeObject<Kiss918RegisterResponse>(await GameHelpers.CallThirdPartyApi(URL, null));

            return apiResult;
        }

        #endregion Call Kiss 918 Register API

        #region Kiss Register API

        internal async Task<dynamic> Game918KissRegister(Game918KissRegisterRequest request,string Password)
        {
            string response = request.APIResponse.ToString(Newtonsoft.Json.Formatting.None);
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.Game.Game918KissRegister, new { request.UserId, request._918KissUserName, APIResponse = response, Password });
            }
        }

        #endregion Kiss Register API

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