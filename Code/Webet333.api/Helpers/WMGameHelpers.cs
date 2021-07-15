using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Response.Game.WM;

namespace Webet333.api.Helpers
{
    public class WMGameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public WMGameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion Local Variables

        #region Call Register Third Party API

        public static async Task<WMResponse> RegisterCallAPI(string Username, string Password)
        {
            var Parameter =
                $"cmd={GameConst.WM.Register}" +
                $"&vendorId={GameConst.WM.vendorId}" +
                $"&signature={GameConst.WM.Signature}" +
                $"&user={Username}" +
                $"&password={Password}" +
                $"&username={Username}";
            var Url = $"{GameConst.WM.Url}?{Parameter}";
            return JsonConvert.DeserializeObject<WMResponse>(await GameHelpers.CallThirdPartyApi(Url));
        }

        #endregion Call Register Third Party API

        #region Call Login Third Party API

        public static async Task<WMResponse> LoginCallAPI(string Username, string Password, int lang, int ui)
        {
            var Parameter =
                $"cmd={GameConst.WM.Login}" +
                $"&vendorId={GameConst.WM.vendorId}" +
                $"&signature={GameConst.WM.Signature}" +
                $"&user={Username}" +
                $"&password={Password}" +
                $"&ui={ui}" +
                $"&returnurl={GameConst.BaseUrl}" +
                $"&lang={lang}";

            var Url = $"{GameConst.WM.Url}?{Parameter}";
            return JsonConvert.DeserializeObject<WMResponse>(await GameHelpers.CallThirdPartyApi(Url));
        }

        #endregion Call Login Third Party API

        #region Call TransferBalance Third Party API

        public static async Task<WMTransferbalanceResponse> TransferCallAPI(string Username, Decimal Amount)
        {
            var Parameter =
                $"cmd={GameConst.WM.transfer}" +
                $"&vendorId={GameConst.WM.vendorId}" +
                $"&signature={GameConst.WM.Signature}" +
                $"&user={Username}" +
                $"&money={Amount}" +
                $"&order={Guid.NewGuid().ToString().Replace("-", "").ToUpper()}" +
                $"&syslang=1";
            var Url = $"{GameConst.WM.Url}?{Parameter}";
            return JsonConvert.DeserializeObject<WMTransferbalanceResponse>(await GameHelpers.CallThirdPartyApi(Url));
        }

        #endregion Call TransferBalance Third Party API

        #region Call Betting Details Third Party API

        public static async Task<WMBettingDetailsResponse> BettingDetailsCallAPI(string startTime = null, string endTime = null, string user = null)
        {
            var time = DateTime.Now;

            if (startTime == null)
                startTime = time.AddMinutes(-5).ToString("yyyyMMddHHmmss");
            if (endTime == null)
                endTime = time.ToString("yyyyMMddHHmmss");
            var Parameter =
                $"cmd={GameConst.WM.BettingDetails}" +
                $"&vendorId={GameConst.WM.vendorId}" +
                $"&signature={GameConst.WM.Signature}";

            if (user != null)
                Parameter += $"&user={user}";

            Parameter += $"&startTime={startTime}" +
                $"&endTime={endTime}" +
                $"&timetype=1" +
                $"&datatype=0" +
                $"&syslang=1";
            var Url = $"{GameConst.WM.Url}?{Parameter}";
            return JsonConvert.DeserializeObject<WMBettingDetailsResponse>(await GameHelpers.CallThirdPartyApi(Url));
        }

        #endregion Call Betting Details Third Party API

        #region Call Change Password Third Party API

        public static async Task<WMResponse> ChangePasswordCallAPI(string Username, string NewPassword)
        {
            var Parameter =
                $"cmd={GameConst.WM.ChangePassword}" +
                $"&vendorId={GameConst.WM.vendorId}" +
                $"&signature={GameConst.WM.Signature}" +
                $"&user={Username}" +
                $"&newpassword={NewPassword}" +
                $"&syslang=1";
            var Url = $"{GameConst.WM.Url}?{Parameter}";
            return JsonConvert.DeserializeObject<WMResponse>(await GameHelpers.CallThirdPartyApi(Url));
        }

        #endregion Call Change Password Third Party API

        #region AllBet game Register

        internal async Task WMRegister(string UserId, string Username, string Response)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.WM.Register, new { UserId, Username, Response });
            }
        }

        #endregion AllBet game Register

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