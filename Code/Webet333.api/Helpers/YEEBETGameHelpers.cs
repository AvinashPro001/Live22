using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request.Game.YeeBet;
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

            var Url = $"{GameConst.YEEBET.Url}{GameConst.YEEBET.InterfaceName.Register}?{Parameter}";

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

            var Url = $"{GameConst.YEEBET.Url}{GameConst.YEEBET.InterfaceName.Login}?{Parameter}";

            return JsonConvert.DeserializeObject<YEEBETResponse>(await GameHelpers.CallThirdPartyApi(Url));
        }

        #endregion Call Login 3rd Party API

        #region Deposit & Withdrawal

        internal static async Task<YEEBETDepositWithdrawalResponse> TransferBalanceAsync(string Username, decimal Amount)
        {
            var temp = $"amount={Amount}&" +
                $"appid={GameConst.YEEBET.APPId}&" +
                $"username={Username}";

            var tempMD5 = SecurityHelpers.MD5EncrptText($"{temp}&key={GameConst.YEEBET.SecretKey}");

            var Parameter = $"{temp}&sign={tempMD5}";

            var Url = $"{GameConst.YEEBET.Url}{GameConst.YEEBET.InterfaceName.DepositWithdrawal}?{Parameter}";

            return JsonConvert.DeserializeObject<YEEBETDepositWithdrawalResponse>(await GameHelpers.CallThirdPartyApi(Url));
        }

        #endregion Deposit & Withdrawal

        #region Call Betting Details 3rd Party API

        public static async Task<YEEBETBettingDetailsResponse> BettingDetailsCallAPI()
        {
            var temp = $"appid={GameConst.YEEBET.APPId}&" +
               $"size={GameConst.YEEBET.BettingDetailsSize}";

            var tempMD5 = SecurityHelpers.MD5EncrptText($"{temp}&key={GameConst.YEEBET.SecretKey}");

            var Parameter = $"{temp}&sign={tempMD5}";

            var Url = $"{GameConst.YEEBET.Url}{GameConst.YEEBET.InterfaceName.GetBettingDetails}?{Parameter}";

            return JsonConvert.DeserializeObject<YEEBETBettingDetailsResponse>(await GameHelpers.CallThirdPartyApi(Url));
        }

        #endregion Call Betting Details 3rd Party API

        #region Call Remove Betting Details 3rd Party API

        public static async Task<YEEBETBettingDetailsResponse> RemoveBettingDetailsCallAPI(List<int> Ids)
        {
            if (Ids.Any())
            {
                var tempIds = JsonConvert.SerializeObject(Ids);
                tempIds = tempIds.Substring(1, tempIds.Length - 2);     //  Remove [].

                var temp = $"appid={GameConst.YEEBET.APPId}&" +
                    $"ids={tempIds}";

                var tempMD5 = SecurityHelpers.MD5EncrptText($"{temp}&key={GameConst.YEEBET.SecretKey}");

                var Parameter = $"{temp}&sign={tempMD5}";

                var Url = $"{GameConst.YEEBET.Url}{GameConst.YEEBET.InterfaceName.RemoveGetBettingDetails}?{Parameter}";

                return JsonConvert.DeserializeObject<YEEBETBettingDetailsResponse>(await GameHelpers.CallThirdPartyApi(Url));
            }

            return new YEEBETBettingDetailsResponse();
        }

        #endregion Call Remove Betting Details 3rd Party API

        #region Call Get Bet Limit 3rd Party API

        internal async Task<YeeBetGetBetLimitResponse> GetBetLimitAsync()
        {
            var temp = $"appid={GameConst.YEEBET.APPId}";

            var tempMD5 = SecurityHelpers.MD5EncrptText($"{temp}&key={GameConst.YEEBET.SecretKey}");

            var Parameter = $"{temp}&sign={tempMD5}";

            var Url = $"{GameConst.YEEBET.Url}{GameConst.YEEBET.InterfaceName.GetBetLimit}?{Parameter}";

            var result = JsonConvert.DeserializeObject<YeeBetGetBetLimitResponse>(await GameHelpers.CallThirdPartyApi(Url));

            return result;
        }

        internal List<YeeBetGetBetLimitResponseArray> AddNameInGetBetLimitResponse(YeeBetGetBetLimitResponseArray[] response)
        {
            for (int i = 0; i < response.Count(); i++)
            {
                response[i].Name += i + 1;
            }

            return response.ToList();
        }

        internal async Task SaveGetBetLimitAsync(List<YeeBetGetBetLimitResponseArray> response)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.YEEBET.SaveGetBetLimit, response);
            }
        }

        #endregion Call Get Bet Limit 3rd Party API

        #region Call Set Bet Limit 3rd Party API

        public static async Task<YEEBETResponse> SetBetLimitAsync(YeeBetSetBetLimitRequest request)
        {
            var temp = $"appid={GameConst.YEEBET.APPId}&" +
                $"qids={request.QIds}&" +
                $"username={request.Username}";

            var tempMD5 = SecurityHelpers.MD5EncrptText($"{temp}&key={GameConst.YEEBET.SecretKey}");

            var Parameter = $"{temp}&sign={tempMD5}";

            var Url = $"{GameConst.YEEBET.Url}{GameConst.YEEBET.InterfaceName.SetBetLimit}?{Parameter}";

            return JsonConvert.DeserializeObject<YEEBETResponse>(await GameHelpers.CallThirdPartyApi(Url));
        }

        #endregion Call Set Bet Limit 3rd Party API

        #region Set BetLimit And Deposit Amount For User

        internal async Task SetBetLimitAndDepositAmountAsync(List<SetBetLimitAndDepositAmountRequest> request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.YEEBET.SetBetlimitDepositAmount, request);
            }
        }

        #endregion Set BetLimit And Deposit Amount For User

        #region Update BetLimit And Deposit Amount For User

        internal async Task UpdateBetLimitAndDepositAmountAsync(List<SetBetLimitAndDepositAmountUpdateRequest> request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.YEEBET.SetBetlimitDepositAmount, request);
            }
        }

        #endregion Update BetLimit And Deposit Amount For User

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