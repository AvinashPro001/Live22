using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request.Game;
using Webet333.models.Response;
using Webet333.models.Response.Game.Live22;

namespace Webet333.api.Helpers
{
    public class Live22GameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public Live22GameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion Local Variables

        #region Call Live 22 Random Username API

   //     internal static async Task<Live22RandomUsernameResponse> Live22RandomUsername()
   //     {
			//string Live22Balance = null;
			//var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
			//var Live22URL = $"{GameConst.Live22.baseURL}getBalance.aspx?" +
			//				$"operatorcode={GameConst.Live22.OperatorCode}" +
			//				$"providercode={GameConst.Live22.ProviderCode}" +
			//$"&username={Live22UserName}" +
			//$"&time={timestamp}" +
			//$"&password={password}" +
			//  $"&signature={SecurityHelpers.MD5EncrptText(GameConst.Live22.OperatorCode.ToLower() + password.ToLower() + GameConst.Live22.ProviderCode.ToLower() + Live22UserName + GameConst.Live22.SecretKey.ToLower()).ToUpper()}";

			//dynamic apiResult = JsonConvert.DeserializeObject<Live22RandomUsernameResponse>(await GameHelpers.CallThirdPartyApi(Live22URL, null));

			//return null ; // apiResult;
   //     }

        #endregion Call Live 22 Random Username API

        #region Call Live 22 Register API

        internal static async Task<Live22RegisterResponse> Live22Register(string Username)
        {
            //<API_URL>/createMember.aspx?operatorcode=xxx&username=xxx&signature=xxx
            //Signature = MD5(operatorcode + username +secret_key), then convert to uppercase.


            var Live22URL = ($"{GameConst.Live22.baseURL}createMember.aspx?" +
                             $"operatorcode={GameConst.Live22.OperatorCode}" +
                             $"&username={Username}" +
                             $"&signature={SecurityHelpers.MD5EncrptText(GameConst.Live22.OperatorCode + Username+ GameConst.Live22.SecretKey).ToUpper()}");

           dynamic apiResult = JsonConvert.DeserializeObject<Live22RegisterResponse>(await GameHelpers.CallThirdPartyApi(Live22URL, null));

            return apiResult;
        }

        #endregion Call Live 22 Register API

        #region Live 22 Register API

        internal async Task<dynamic> GameLive22Register(GameLive22RegisterRequest request, string Password)
        {
            string response = request.APIResponse.ToString(Newtonsoft.Json.Formatting.None);
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.Game.GameLive22Register, new { request.UserId, request.Live22UserName, APIResponse = response, Password });
            }
        }

        #endregion Live 22 Register API


        public static async Task<dynamic> Live22gameLaunch(string Live22UserName, string password)
        {
            //ignature = MD5(operatorcode + password + providercode + type + username + secret_key),

            // MD5(operatorcode + providercode + secret_key), then convert to uppercase 加
            var referenceid = Guid.NewGuid().ToString("N").Substring(0, 20);
            var url = $"{GameConst.Live22.baseURL}launchGames.aspx?" +
                            $"operatorcode={GameConst.Live22.OperatorCode}" +
                            $"&providercode={GameConst.Live22.providerCode}" +
                            $"&userName={Live22UserName}" +
                            $"&password={password}" +
                            $"&type=SL" +
                            $"&signature={SecurityHelpers.MD5EncrptText(GameConst.Live22.OperatorCode + password + GameConst.Live22.providerCode + "SL" + Live22UserName + GameConst.Live22.SecretKey).ToUpper()}";

            var res = JsonConvert.DeserializeObject<GameLaunchResponse>(await CallThirdPartyApi(url, null));
            return res;



            
        }

        public static async Task<string> CallThirdPartyApi(string url, StringContent stringContent = null)
        {
            try
            {
                var httpResponseMessage = await client.PostAsync(url, stringContent);
                var response = await httpResponseMessage.Content.ReadAsStringAsync();
                return response;
            }
            catch (Exception ex)
            {
                return String.Empty;
            }
        }

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


