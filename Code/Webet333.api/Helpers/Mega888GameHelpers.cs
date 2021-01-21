using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Response.Game.Mega888;

namespace Webet333.api.Helpers
{
    public class Mega888GameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        public Mega888GameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion

        #region Call Register API of Mega888

        internal static async Task<dynamic> CallRegisterAPI(string username)
        {
            var random = Guid.NewGuid().ToString();

            var url = $"{GameConst.Mega888.BaseUrl}{GameConst.Mega888.Register}"
                        + $"?random={random}"
                        + $"&sn={GameConst.Mega888.SN}"
                        + $"&agentLoginId={GameConst.Mega888.AgentLoginId}"
                        + $"&nickname={username}"
                        + $"&method={GameConst.Mega888.Register}"
                        + $"&digest={SecurityHelpers.MD5EncrptText(random + GameConst.Mega888.SN + GameConst.Mega888.SecretKey)}";

            return await GameHelpers.CallThirdPartyApi(url);
        }

        #endregion

        #region Call Withdraw Deposit API of Mega888

        internal static async Task<Mega888DepositWithdrawResponse> CallWithdrawDepositAPI(string Mega888LoginId, decimal Amount)
        {
            var random = Guid.NewGuid().ToString();

            var bizId = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

            var url = $"{GameConst.Mega888.BaseUrl}{GameConst.Mega888.DepositWithdraw}"
                       + $"?random={random}"
                       + $"&sn={GameConst.Mega888.SN}"
                       + $"&agentLoginId={GameConst.Mega888.AgentLoginId}"
                       + $"&loginId={Mega888LoginId}"
                       + $"&amount={Amount}"
                       + $"&bizId={bizId}"
                       + $"&checkBizId=1"
                       + $"&method={GameConst.Mega888.DepositWithdraw}"
                       + $"&digest={SecurityHelpers.MD5EncrptText(random + GameConst.Mega888.SN + Mega888LoginId + Amount + GameConst.Mega888.SecretKey)}";

            return JsonConvert.DeserializeObject<Mega888DepositWithdrawResponse>(await GameHelpers.CallThirdPartyApi(url, null));
        }

        #endregion

        #region Call Logout API of Mega888

        internal static async Task<dynamic> CallLogoutAPI(string Mega888LoginId)
        {
            var random = Guid.NewGuid().ToString();

            var url = $"{GameConst.Mega888.BaseUrl}{GameConst.Mega888.logout}"
                      + $"?random={random}"
                      + $"&sn={GameConst.Mega888.SN}"
                      + $"&loginId={Mega888LoginId}"
                      + $"&method={GameConst.Mega888.logout}"
                      + $"&digest={SecurityHelpers.MD5EncrptText(random + GameConst.Mega888.SN + Mega888LoginId + GameConst.Mega888.SecretKey)}";

            return JsonConvert.DeserializeObject(await GameHelpers.CallThirdPartyApi(url, null));
        }

        #endregion

        #region Mega888 game Register

        public async Task<dynamic> Mega888Insert(Mega888ApiRegisterResponse request, string userid, string response)
        {
            using (var respository = new DapperRepository<dynamic>(Connection))
            {
                var result = await respository.FindAsync(StoredProcConsts.Mega888.Register, new { userid, GameUserId = request.result.userId, LoginId = request.result.loginId, RegType = request.result.regType, response });
                return result;
            }
        }

        #endregion Mega888 game Register

        #region Mega888 Game Login Check

        public async Task<dynamic> Mega888LoginCheck(String loginId, string password)
        {
            using (var respository = new DapperRepository<dynamic>(Connection))
            {
                var result = await respository.FindAsync(StoredProcConsts.Mega888.LoginCheck, new { loginId, password = SecurityHelpers.EncryptPassword(password) });
                return result;
            }
        }

        #endregion Mega888 Game Login Check

        #region Mega888 Response Method

        public static Mega888LoginResponse Mega888LoginResponse(string id, string success, string msg)
        {
            var response = new Mega888LoginResponse
            {
                id = id,
                error = null,
                jsonrpc = "2.0",
                result = new Results
                {
                    success = success,
                    sessionId = null,
                    msg = msg
                }
            };

            if (success.Equals("1"))
                response.result.sessionId = Guid.NewGuid().ToString("N").ToUpper();

            return response;
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
