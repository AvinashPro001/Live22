using Newtonsoft.Json;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request.Game;
using Webet333.models.Request.Game.GamePlay;
using Webet333.models.Response.Game.GamePlay;
using GamePlayConst = Webet333.models.Constants.GameConst.GamePlay;

namespace Webet333.api.Helpers
{
    public class GamePlayGameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public GamePlayGameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion Local Variables

        #region Call API

        private static readonly string USER_AGENT = "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36";

        private static readonly string CONTENT_TYPE = "application/x-www-form-urlencoded; charset=UTF-8";

        private static async Task<string> HttpPostAsync(string url, string data)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);

            CookieContainer cContainer = new CookieContainer();
            request.Method = "POST";
            request.CookieContainer = cContainer;
            if (!string.IsNullOrEmpty(USER_AGENT)) request.UserAgent = USER_AGENT;

            request.ContentType = CONTENT_TYPE;

            byte[] bytes = Encoding.UTF8.GetBytes(data);
            request.ContentLength = bytes.Length;

            string result = string.Empty;
            try
            {
                using (Stream os = await request.GetRequestStreamAsync())
                {
                    await os.WriteAsync(bytes, 0, bytes.Length);
                    using (WebResponse response = await request.GetResponseAsync())
                    using (Stream responseStream = response.GetResponseStream())
                    using (StreamReader sr = new StreamReader(responseStream, Encoding.UTF8))
                    {
                        result = sr.ReadToEnd().Trim();
                    }
                }
            }
            catch (WebException wex)
            {
                result = "Error: " + wex.Message;
            }

            return result;
        }

        #endregion Call API

        #region Manage Game Play API Request

        internal static async Task<string> ManageRequestAsync(dynamic model)
        {
            string JSON = JsonConvert.SerializeObject(model);

            var DESEncrpt = SecurityHelpers.GamePlayDESEncrptText(JSON, GamePlayConst.DESKey);

            string sign = SecurityHelpers.GamePlaySHA256HashText($"{DESEncrpt}{GamePlayConst.SHA256Key}");

            string data = $"merchant_code={HttpUtility.UrlEncode(GamePlayConst.MerchantCode)}&" +
                $"params={HttpUtility.UrlEncode(DESEncrpt)}&" +
                $"sign={HttpUtility.UrlEncode(sign)}";

            var URL = $"{GamePlayConst.APIURL}";

            var APIResult = await HttpPostAsync(URL, data);

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

        internal static async Task<GamePlayGameListResponse> CallGetGameListAPI(string Language, string GameType)
        {
            GamePlayGetGameListAPIRequest model = new GamePlayGetGameListAPIRequest
            {
                ClientType = GamePlayConst.ClientType.All,
                GameType = GameType,
                Language = Language,
                Method = GamePlayConst.Method.GetGameList,
                Page = 1,
                PageSize = int.MaxValue,
                Platform = GamePlayConst.Platform.All,
                ProductType = GamePlayConst.ProductType
            };

            string temp = await ManageRequestAsync(model);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<GamePlayGameListResponse>(temp);

            var callGetGameInageAPI = CallGetGameImageAPI(DeserializeAPIResult, Language);

            return callGetGameInageAPI;
        }

        #endregion Call Game List API 3rd Party API

        #region Manage Game Image

        private static GamePlayGameListResponse CallGetGameImageAPI(GamePlayGameListResponse GameList, string Language)
        {
            //string languageCode = Language == GamePlayConst.LanguageCode.TraditionalChinese ? GamePlayConst.LanguageCode.SimplifiedChinese : GamePlayConst.LanguageCode.English;
            string languageCode = GamePlayConst.LanguageCode.English;

            if (GameList.Games.Any())
            {
                GameList.Games.ForEach(x => x.ImageURL = string.Format(GamePlayConst.ImageURLWithLanguage, GamePlayConst.ProductName, languageCode, x.TcgGameCode));
            }

            return GameList;
        }

        #endregion Manage Game Image

        #region Call Transfer 3rd Party API

        internal static async Task<GamePlayTransferAPIResponse> CallTransferAPI(string Username, decimal Amount, string FundType)
        {
            GamePlayTransferAPIRequest model = new GamePlayTransferAPIRequest
            {
                Amount = Amount,
                FundType = FundType,
                Method = GamePlayConst.Method.Transfer,
                ProductType = GamePlayConst.ProductType,
                ReferenceNo = Guid.NewGuid().ToString(),
                Username = Username
            };

            string temp = await ManageRequestAsync(model);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<GamePlayTransferAPIResponse>(temp);

            return DeserializeAPIResult;
        }

        #endregion Call Transfer 3rd Party API

        #region Call Betting Details 3rd Party API

        internal static async Task<GamePlayGetBettingDetailsAPIResponse> CallBettingDetailsAPI(PragmaticBettingDetailsRequest request)
        {
            string dates = request.StartTimeStamp.ToString("yyyyMMddHHmm");
            GamePlayGetBettingDetailsAPIResponse result = new GamePlayGetBettingDetailsAPIResponse();

            long count = 1;

            for (int i = 0; i < count; i++)
            {
                GamePlayGetBettingDetailsAPIRequest model = new GamePlayGetBettingDetailsAPIRequest
                {
                    BatchName = dates,
                    Method = GamePlayConst.Method.GetBettingDetails,
                    Page = i + 1
                };

                string temp = await ManageRequestAsync(model);

                var tempResult = JsonConvert.DeserializeObject<GamePlayGetBettingDetailsAPIResponse>(temp);

                if (result.Details == null) result = tempResult;
                else result.Details.AddRange(tempResult.Details);

                if (i == 0 &&
                    result != null &&
                    result.PageInfo != null &&
                    result.PageInfo.TotalCount > 1)
                {
                    count = result.PageInfo.TotalCount;
                }
            }

            return result;
        }

        #endregion Call Betting Details 3rd Party API

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