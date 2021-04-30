using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using System.Web;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Response.Game.AG;

namespace Webet333.api.Helpers
{
    public class AGGameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        public AGGameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion Local Variables

        #region Call Register API of AG game

        internal static async Task<AgRegisterResponse> CallRegisterAPI(string username, string bettingLimit)
        {
            var url = $"{GameConst.AG.baseURL}{GameConst.AG.CreateUser}" +
                      $"?vendor_id={GameConst.AG.VendorId}" +
                      $"&operator_id={GameConst.AG.OperatorId}" +
                      $"&currency={GameConst.AG.Currency}" +
                      $"&odd_type={bettingLimit}" +
                      $"&user_id={username}";

            return JsonConvert.DeserializeObject<AgRegisterResponse>(await GameHelpers.CallThirdPartyApi(url));
        }

        #endregion Call Register API of AG game

        #region Call Login API of AG game

        internal static async Task<AgRegisterResponse> CallLoginAPI(string username, string bettingLimit, string gameType, string langCode)
        {
            var url = $"{GameConst.AG.baseURL}{GameConst.AG.ForwardGame}" +
                      $"?vendor_id={GameConst.AG.VendorId}" +
                      $"&operator_id={GameConst.AG.OperatorId}" +
                      $"&currency={GameConst.AG.Currency}" +
                      $"&game_type={gameType}" +
                      $"&lang={langCode}" +
                      $"&odd_type={bettingLimit}" +
                      $"&user_id={username}&dm=http://www.webet333.com/";


            return JsonConvert.DeserializeObject<AGLoginResponse>(await GameHelpers.CallThirdPartyApi(url));
        }

        #endregion Call Login API of AG game

        #region GameAG

        internal async Task GameAGRegister(string UserId, string AGUserName, string APIResponse)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Game.GameAGRegister, new { UserId, AGUserName, APIResponse });
            }
        }

        #endregion GameAG

        #region DG game Bet Limit

        internal async Task<dynamic> AGBetLimit(string BetLimit, string adminId = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.AddOrUpdateAsync(
                    StoredProcConsts.Global.UpdateGlobalParamters,
                    new
                    {
                        Value = BetLimit,
                        Name = "AGLimit",
                        adminId
                    });

                return result;
            }
        }

        #endregion DG game Bet Limit

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