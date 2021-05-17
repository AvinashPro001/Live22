using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Response.Game.YEEBET;

namespace Webet333.api.Helpers
{
    public class YEEBETGameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public YEEBETGameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion Local Variables

        #region Call Register 3rd Party API

        public static async Task<YEEBETResponse> RegisterCallAPI(string Username)
        {
            var temp = $"appid={GameConst.YEEBET.APPId}&" +
                $"returnurl={GameConst.YEEBET.ReturnURL}&" +
                $"username={Username}";

            var tempMD5 = SecurityHelpers.MD5EncrptText($"{temp}&key={GameConst.YEEBET.SecretKey}");

            var Parameter = $"{temp}&sign={tempMD5}";

            var Url = $"{GameConst.YEEBET.Url}{GameConst.YEEBET.Register}?{Parameter}";

            return JsonConvert.DeserializeObject<YEEBETResponse>(await GameHelpers.CallThirdPartyApi(Url));
        }

        #endregion Call Register 3rd Party API

        #region YEEBET Game Register

        internal async Task WMRegister(string UserId, string Username, string Response)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.YEEBET.Register, new { UserId, Username, Response });
            }
        }

        #endregion YEEBET Game Register

        #region Call Login 3rd Party API

        public static async Task<YEEBETResponse> LoginCallAPI(string Username, int Language, int Clienttype)
        {
            var temp = $"appid={GameConst.YEEBET.APPId}&" +
                $"clienttype={Clienttype}&" +
                $"currency={GameConst.YEEBET.Currency}&" +
                $"iscreate={GameConst.YEEBET.IsCreate}&" +
                $"language={Language}&" +
                $"returnurl={GameConst.YEEBET.ReturnURL}&" +
                $"username={Username}";

            var tempMD5 = SecurityHelpers.MD5EncrptText($"{temp}&key={GameConst.YEEBET.SecretKey}");

            var Parameter = $"{temp}&sign={tempMD5}";

            var Url = $"{GameConst.YEEBET.Url}{GameConst.YEEBET.Login}?{Parameter}";

            return JsonConvert.DeserializeObject<YEEBETResponse>(await GameHelpers.CallThirdPartyApi(Url));
        }

        #endregion Call Login 3rd Party API

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