using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Entities;
using Webet333.models.Request.Game;
using Webet333.models.Response.Game.AG;

namespace Webet333.api.Helpers
{
    public class AGGameHelpers: IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        public AGGameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion 

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

        #endregion 

        #region Call Login API of AG game

        internal static async Task<AgRegisterResponse> CallLoginAPI(string username, string bettingLimit,string gameType,string langCode)
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

        #endregion

        #region GameAG

        internal async Task GameAGRegister(string UserId,string AGUserName,string APIResponse)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Game.GameAGRegister, new { UserId, AGUserName, APIResponse});
            }
        }

        #endregion GameAG

        #region DG game Bet Limit

        internal async Task<dynamic> AGBetLimit(string BetLimit, string adminId = null, string description = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.AddOrUpdateAsync(
                    StoredProcConsts.Global.UpdateGlobalParamters,
                    new
                    {
                        Value = BetLimit,
                        Name = "AGLimit",
                        adminId,
                        description
                    });

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
