using System;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Xml.Linq;
using Webet333.dapper;
using Webet333.models.Constants;

namespace Webet333.api.Helpers
{
    public class SAGameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public SAGameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion

        #region Call Register API of SA game

        internal static async Task<XDocument> CallAPIRegister(string username)
        {
            username = Regex.Replace(username, @"[^0-9a-zA-Z]+", "");
            if (username.Length > 20)
            {
                username = username.Substring(0, 20);
            }
            var time = DateTime.Now.ToString("yyyyMMddhhmmss");
            var qs = $"method={GameConst.SAConst.RegisterMethod}" +
                    $"&Key={GameConst.SAConst.SecretKey}" +
                    $"&Time={time}" +
                    $"&Username={username}" +
                    $"&CurrencyType={GameConst.SAConst.Curency}";

            var q = HttpUtility.UrlEncode(SecurityHelpers.DESEncrptText(qs, GameConst.SAConst.DESEncrptKey));
            var s = SecurityHelpers.MD5EncrptText(qs + GameConst.SAConst.MD5Key + time + GameConst.SAConst.SecretKey);

            var url = $"{GameConst.SAConst.APIURL}?q={q}&s={s}";
            var stringContent = new StringContent($"q={q}&s={s}", Encoding.UTF8, "application/x-www-form-urlencoded");
            return XDocument.Parse(await GameHelpers.CallThirdPartyApi(url, stringContent));
        }

        #endregion

        #region Call Login API of SA game

        internal static async Task<XDocument> CallAPILogin(string username)
        {
            username = Regex.Replace(username, @"[^0-9a-zA-Z]+", "");
            if (username.Length > 20)
            {
                username = username.Substring(0, 20);
            }
            var time = DateTime.Now.ToString("yyyyMMddhhmmss");
            var qs = $"method={GameConst.SAConst.LoginMethod}" +
                    $"&Key={GameConst.SAConst.SecretKey}" +
                    $"&Time={time}" +
                    $"&Username={username}" +
                    $"&CurrencyType={GameConst.SAConst.Curency}";

            var tokenQ = HttpUtility.UrlEncode(SecurityHelpers.DESEncrptText(qs, GameConst.SAConst.DESEncrptKey));
            var tokenS = SecurityHelpers.MD5EncrptText(qs + GameConst.SAConst.MD5Key + time + GameConst.SAConst.SecretKey);

            var tokenUrl = $"{GameConst.SAConst.APIURL}?q={tokenQ}&s={tokenS}";
            var stringContent = new StringContent($"q={tokenQ}&s={tokenS}", Encoding.UTF8, "application/x-www-form-urlencoded");
            return XDocument.Parse(await GameHelpers.CallThirdPartyApi(tokenUrl, stringContent));

        }

        #endregion

        #region Call Deposit API of SA game

        internal static async Task<XDocument> CallAPIDeposit(string username,decimal Amount)
        {
            username = Regex.Replace(username, @"[^0-9a-zA-Z]+", "");
            if (username.Length > 20)
            {
                username = username.Substring(0, 20);
            }

            var time = DateTime.Now.ToString("yyyyMMddhhmmss");
            var qs = $"method={GameConst.SAConst.DepositMethod}" +
                    $"&Key={GameConst.SAConst.SecretKey}" +
                    $"&Time={time}" +
                    $"&OrderId=IN{time}{username}" +
                    $"&Username={username}" +
                    $"&CreditAmount={Amount}";

            var q = HttpUtility.UrlEncode(SecurityHelpers.DESEncrptText(qs, GameConst.SAConst.DESEncrptKey));
            var s = SecurityHelpers.MD5EncrptText(qs + GameConst.SAConst.MD5Key + time + GameConst.SAConst.SecretKey);

            var url = $"{GameConst.SAConst.APIURL}?q={q}&s={s}";

            var stringContent = new StringContent($"q={q}&s={s}", Encoding.UTF8, "application/x-www-form-urlencoded");
            return XDocument.Parse(await GameHelpers.CallThirdPartyApi(url,stringContent));
        }

        #endregion

        #region Call Withdraw API of SA game

        internal static async Task<XDocument> CallAPIWithdraw(string username, decimal Amount)
        {
            username = Regex.Replace(username, @"[^0-9a-zA-Z]+", "");
            if (username.Length > 20)
            {
                username = username.Substring(0, 20);
            }

            var time = DateTime.Now.ToString("yyyyMMddhhmmss");
            var qs = $"method={GameConst.SAConst.WithdrawMethod}" +
                    $"&Key={GameConst.SAConst.SecretKey}" +
                    $"&Time={time}" +
                    $"&OrderId=OUT{time}{username}" +
                    $"&Username={username}" +
                    $"&DebitAmount={Amount}";

            var q = HttpUtility.UrlEncode(SecurityHelpers.DESEncrptText(qs, GameConst.SAConst.DESEncrptKey));
            var s = SecurityHelpers.MD5EncrptText(qs + GameConst.SAConst.MD5Key + time + GameConst.SAConst.SecretKey);

            var url = $"{GameConst.SAConst.APIURL}?q={q}&s={s}";

            var stringContent = new StringContent($"q={q}&s={s}", Encoding.UTF8, "application/x-www-form-urlencoded");

            return XDocument.Parse(await GameHelpers.CallThirdPartyApi(url, stringContent));
        }

        #endregion

        #region SA Register
        internal async Task<dynamic> SARegister(string Username, string Response, string UserId)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.SA.Register, new { Username, Response, UserId });
                return result;
            }

        }
        #endregion

        #region House Keeping

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            if (disposing)
            {
                Connection = string.Empty;
            }
        }

        #endregion House Keeping
    }
}
