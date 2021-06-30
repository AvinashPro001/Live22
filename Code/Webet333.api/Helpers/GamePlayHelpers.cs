using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request.Game.GamePlay;
using Webet333.models.Response.Game.GamePlay;

namespace Webet333.api.Helpers
{
    public class GamePlayHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public GamePlayHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion Local Variables

        #region Call Register 3rd Party API

        internal async Task<GamePlayRegisterResponse> CallRegisterPlayerAPI(string Username, string Password)
        {
            GamePlayRegisterRequest model = new GamePlayRegisterRequest
            {
                Currency = GameConst.GamePlay.Currency,
                Method = GameConst.GamePlay.Method.Register,
                Password = Password,
                Username = Username
            };

            string JSON = JsonConvert.SerializeObject(model);

            var DESEncrpt = SecurityHelpers.GamePlayDESEncrptText(JSON, GameConst.GamePlay.DESKey);

            string sign = SecurityHelpers.GamePlaySHA256HashText($"{DESEncrpt}{GameConst.GamePlay.SHA256Key}");

            string data = $"merchant_code={HttpUtility.UrlEncode(GameConst.GamePlay.MerchantCode)}&" +
                $"params={HttpUtility.UrlEncode(DESEncrpt)}&" +
                $"sign={HttpUtility.UrlEncode(sign)}";

            var URL = $"{GameConst.GamePlay.URL}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/x-www-form-urlencoded");

            var APIResult = await GameHelpers.CallThirdPartyApi(URL, stringContent);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<GamePlayRegisterResponse>(APIResult);

            return DeserializeAPIResult;
        }

        #endregion Call Register 3rd Party API

        #region GamePlay Game Register

        internal async Task GamePlayRegister(string UserId, string Username, string Password, string Response)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.GamePlay.Register,
                    new
                    {
                        UserId,
                        Username,
                        Password,
                        Response
                    });
            }
        }

        #endregion GamePlay Game Register

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