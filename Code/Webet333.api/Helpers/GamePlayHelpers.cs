using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request.Game.GamePlay;
using Webet333.models.Response.Game.GamePlay;
using GamePlayConst = Webet333.models.Constants.GameConst.GamePlay;

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

        #region Manage Game Play API Request

        private static async Task<string> ManageRequestAsync(dynamic model)
        {
            string JSON = JsonConvert.SerializeObject(model);

            var DESEncrpt = SecurityHelpers.GamePlayDESEncrptText(JSON, GamePlayConst.DESKey);

            string sign = SecurityHelpers.GamePlaySHA256HashText($"{DESEncrpt}{GamePlayConst.SHA256Key}");

            string data = $"merchant_code={GamePlayConst.MerchantCode}&" +
                $"params={DESEncrpt}&" +
                $"sign={sign}";

            var URL = $"{GamePlayConst.URL}";

            var stringContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/x-www-form-urlencoded");

            var APIResult = await GameHelpers.CallThirdPartyApi(URL, stringContent);

            return APIResult;
        }

        #endregion Manage Game Play API Request

        #region Call Register 3rd Party API

        internal async Task<GamePlayDefaultResponse> CallRegisterPlayerAPI(string Username, string Password)
        {
            GamePlayRegisterRequest model = new GamePlayRegisterRequest
            {
                Currency = GamePlayConst.Currency,
                Method = GamePlayConst.Method.Register,
                Password = Password,
                Username = Username
            };

            string temp = await ManageRequestAsync(model);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<GamePlayDefaultResponse>(temp);

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

        #region Call Update Password 3rd Party API

        internal async Task<GamePlayDefaultResponse> CallUpdatePasswordAPI(string Username, string Password)
        {
            GamePlayUpdatePasswordRequest model = new GamePlayUpdatePasswordRequest
            {
                Method = GamePlayConst.Method.UpdatePassword,
                Password = Password,
                Username = Username
            };

            string temp = await ManageRequestAsync(model);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<GamePlayDefaultResponse>(temp);

            return DeserializeAPIResult;
        }

        #endregion Call Update Password 3rd Party API

        #region GamePlay Game Register

        internal async Task GamePlayUpdatePassword(string UserId, string Password)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.GamePlay.PasswordUpdate,
                    new
                    {
                        UserId,
                        Password
                    });
            }
        }

        #endregion GamePlay Game Register

        #region Call Launch Game API 3rd Party API

        internal static async Task<GamePlayLoginResponse> CallLaunchGameAPI(
            string Username,
            string Language,
            string Platform,
            string GameCode)
        {
            GamePlayLoginAPIRequest model = new GamePlayLoginAPIRequest
            {
                BackURL = GamePlayConst.BackURL.Live,
                GameCode = GameCode,
                GameMode = GamePlayConst.GameMode.Real,
                Language = Language,
                Method = GamePlayConst.Method.Login,
                Platform = Platform,
                ProductType = GamePlayConst.ProductType,
                Username = Username
            };

            string temp = await ManageRequestAsync(model);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<GamePlayLoginResponse>(temp);

            return DeserializeAPIResult;
        }

        #endregion Call Launch Game API 3rd Party API

        #region Call Game List API 3rd Party API

        internal static async Task<GamePlayLoginResponse> CallGetGameListAPI(string Language, string GameType)
        {
            GamePlayGetGameListAPIRequest model = new GamePlayGetGameListAPIRequest
            {
                ClientType = GamePlayConst.ClientType.ComputerWeb,
                GameType = GameType,
                Language = Language,
                Method = GamePlayConst.Method.GetGameList,
                Page = 1,
                PageSize = int.MaxValue,
                Platform = GamePlayConst.Platform.All,
                ProductType = GamePlayConst.ProductType
            };

            string temp = await ManageRequestAsync(model);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<GamePlayLoginResponse>(temp);

            return DeserializeAPIResult;
        }

        #endregion Call Game List API 3rd Party API

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