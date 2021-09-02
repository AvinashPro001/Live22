using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Request.Game;
using Webet333.models.Response.Game.CQ9;
using CQ9Const = Webet333.models.Constants.GameConst.CQ9;
using SPConst = Webet333.models.Constants.StoredProcConsts;

namespace Webet333.api.Helpers
{
    public class CQ9GameHelpers : IDisposable
    {
        #region Local Variables & Constructor

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public CQ9GameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion Local Variables & Constructor

        #region Call API

        internal static async Task<dynamic> CallGETAPIAsync(string EndPoient)
        {
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(CQ9Const.APIURL);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Add("Authorization", CQ9Const.APIToken);

                using (HttpResponseMessage httpResponseMessage = await client.GetAsync(EndPoient))
                {
                    var responseString = await httpResponseMessage.Content.ReadAsStringAsync();

                    return responseString;
                }
            }
        }

        internal static async Task<dynamic> CallPostAPIAsync(string EndPoient, dynamic Model)
        {
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(CQ9Const.APIURL);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Add("Authorization", CQ9Const.APIToken);

                var stringContent = new StringContent(Model, Encoding.UTF8, "application/x-www-form-urlencoded");

                using (HttpResponseMessage httpResponseMessage = await client.PostAsync(EndPoient, stringContent))
                {
                    var responseString = await httpResponseMessage.Content.ReadAsStringAsync();

                    return responseString;
                }
            }
        }

        #endregion Call API

        #region Call Register 3rd Party API

        internal async Task<CQ9RegisterResponse> CallRegisterPlayerAPI(string Username, string Password, string Nickname)
        {
            string model = $"account={Username}&" +
                $"password={Password}&" +
                $"nickname={Nickname}";

            string temp = await CallPostAPIAsync(CQ9Const.EndPoint.Register, model);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<CQ9RegisterResponse>(temp);

            return DeserializeAPIResult;
        }

        #endregion Call Register 3rd Party API

        #region CQ9 Game Register

        internal async Task CQ9Register(string UserId, string Username, string Nickname, string Password, string Response)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    SPConst.CQ9.Register,
                    new
                    {
                        UserId,
                        Username,
                        Nickname,
                        Password,
                        Response
                    });
            }
        }

        #endregion CQ9 Game Register

        #region Call Update Password 3rd Party API

        internal async Task<CQ9UpdatePasswordResponse> CallUpdatePasswordAPI(string Username, string Password)
        {
            string model = $"account={Username}&" +
                $"password={Password}";

            string temp = await CallPostAPIAsync(CQ9Const.EndPoint.UpdatePassword, model);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<CQ9UpdatePasswordResponse>(temp);

            return DeserializeAPIResult;
        }

        #endregion Call Update Password 3rd Party API

        #region CQ9 Update Password

        internal async Task GamePlayUpdatePassword(string UserId, string Password)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    SPConst.CQ9.PasswordUpdate,
                    new
                    {
                        UserId,
                        Password
                    });
            }
        }

        #endregion CQ9 Update Password

        #region Call Login 3rd Party API

        internal static async Task<CQ9LoginResponse> CallLoginAPI(string Username, string Password)
        {
            string model = $"account={Username}&" +
                $"password={Password}";

            string temp = await CallPostAPIAsync(CQ9Const.EndPoint.Login, model);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<CQ9LoginResponse>(temp);

            return DeserializeAPIResult;
        }

        #endregion Call Login 3rd Party API

        #region Call Get the game Lobby/table URL 3rd Party API

        internal static async Task<CQ9GetLoginURLResponse> CallGetLoginURLAPI(string Token, string Language, string EndPoint, bool IsSlot = true, string Gameplat = null)
        {
            string model;

            if (IsSlot)
                model = $"usertoken={Token}&" +
                    $"lang={Language}";
            else
                model = $"usertoken={Token}&" +
                    $"gamehall={CQ9Const.GameHall}&" +
                    $"gamecode={CQ9Const.GameCode}&" +
                    $"gameplat={Gameplat}&" +
                    $"lang={Language}&" +
                    $"app=N&" +     //  Optional
                    $"detect=N";    //  Optional

            string temp = await CallPostAPIAsync(EndPoint, model);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<CQ9GetLoginURLResponse>(temp);

            return DeserializeAPIResult;
        }

        #endregion Call Get the game Lobby/table URL 3rd Party API

        #region Call Withdraw & Deposit 3rd Party API

        internal static async Task<CQ9DepositWithdrawResponse> CallTransferAPI(string Username, decimal Amount, string EndPoint)
        {
            string model = $"account={Username}&" +
                $"mtcode={Guid.NewGuid()}&" +
                $"amount={Amount}";

            string temp = await CallPostAPIAsync(EndPoint, model);

            var DeserializeAPIResult = JsonConvert.DeserializeObject<CQ9DepositWithdrawResponse>(temp);

            return DeserializeAPIResult;
        }

        #endregion Call Withdraw & Deposit 3rd Party API

        #region Call Betting Details 3rd Party API

        internal static async Task<CQ9GetBettingDetailsResponse> CallBettingDetailsAPI(GlobalBettingDetailsRequest request)
        {
            CQ9GetBettingDetailsResponse result = new CQ9GetBettingDetailsResponse();

            long count = 1, page = 1, pagesize = 20000;
            string timezone = "-04:00";
            string timeFormate = "yyyy-MM-ddTHH:mm:ss.fff";

            string startTime = request.FromDate.ToString($"{timeFormate}{timezone}");
            string endTime = request.ToDate.ToString($"{timeFormate}{timezone}");

            for (int i = 0; i < count; i++)
            {
                string model = $"starttime={startTime}&" +
                    $"endtime={endTime}&" +
                    $"page={i + page}&" +
                    //$"account={}&" +
                    $"pagesize={pagesize}";

                string temp = await CallGETAPIAsync($"{CQ9Const.EndPoint.GetBettingDetails}?{model}");

                var tempResult = JsonConvert.DeserializeObject<CQ9GetBettingDetailsResponse>(temp);

                if (result.Data == null) result = tempResult;
                else result.Data.Data.AddRange(tempResult.Data.Data);

                if (i == 0 &&
                    result != null &&
                    result.Data != null &&
                    result.Data.Totalsize > 1)
                {
                    var total = result.Data.Totalsize;
                    var totalPages = GenericHelpers.CalculateTotalPages(total, (int)pagesize);

                    count = totalPages;
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
            if (dispose) Connection = string.Empty;
        }

        #endregion House Keeping
    }
}