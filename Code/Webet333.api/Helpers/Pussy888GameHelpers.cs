using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request.Game;
using Webet333.models.Response.Account;
using Webet333.models.Response.Game;
using Webet333.models.Response.Game.Pussy888;

namespace Webet333.api.Helpers
{
    public class Pussy888GameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public Pussy888GameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion

        #region Randon Password Genrate
        public static string genratePassword()
        {
            string charsetOne = "ABCDEFGHIJKLMNOPQRSTUVWXTZ", charsetTwo = "abcdefghiklmnopqrstuvwxyz", charsetThree = "@", charsetFour = "0123456789", randomstring = "";
            Random rand = new Random();

            for (int i = 0; i < 3; i++)
            {
                int rnumOne = (int)Math.Floor(rand.NextDouble() * charsetOne.Length);
                randomstring += charsetOne.Substring(rnumOne, 1);
            }

            for (int i = 0; i < 3; i++)
            {
                int rnumTwo = (int)Math.Floor(rand.NextDouble() * charsetTwo.Length);
                randomstring += charsetTwo.Substring(rnumTwo, 1);
            }

            int rnumThree = (int)Math.Floor(rand.NextDouble() * charsetThree.Length);
            randomstring += charsetThree.Substring(rnumThree, 1);

            for (int i = 0; i < 3; i++)
            {
                int rnumFour = (int)Math.Floor(rand.NextDouble() * charsetFour.Length);
                randomstring += charsetFour.Substring(rnumFour, 1);
            }

            return randomstring;
        }

        #endregion

        #region Randon Password Genrate
        public static string genrate6DigitPassword()
        {
            string charsetOne = "0123456789", charsetTwo = "0123456789", randomstring = "";
            Random rand = new Random();

            for (int i = 0; i < 3; i++)
            {
                int rnumOne = (int)Math.Floor(rand.NextDouble() * charsetOne.Length);
                randomstring += charsetOne.Substring(rnumOne, 1);
            }

            for (int i = 0; i < 3; i++)
            {
                int rnumTwo = (int)Math.Floor(rand.NextDouble() * charsetTwo.Length);
                randomstring += charsetTwo.Substring(rnumTwo, 1);
            }

            return randomstring;
        }

        #endregion

        #region Pussy888 Game Register API

        internal static async Task<UserRegisterResponse> CallRegisterAPI(string MobileNo, string Name, string Pass)
        {
            //var Password = genratePassword();
            var Password = "Wb3@" + Pass;

            if (Password.Length > 14)
                Password = Password.Substring(0, 14);

            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            var RandomUsernameUrl = $"{GameConst.Pussy888.BaseUrl}{GameConst.Pussy888.RandomUsername}" +
                $"&userName={GameConst.Pussy888.agent}" +
                $"&UserAreaId=1" +
                $"&time={timestamp}" +
                $"&authcode={GameConst.Pussy888.AuthCode}" +
                $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Pussy888.AuthCode.ToLower() + GameConst.Pussy888.agent + timestamp + GameConst.Pussy888.SecertKey.ToLower()).ToUpper()}";

            var randomUsernameResponse = JsonConvert.DeserializeObject<RandomUsernameResponse>(await GameHelpers.CallThirdPartyApi(RandomUsernameUrl));

            if (randomUsernameResponse.code == 0)
            {
                var username = randomUsernameResponse.account;
                var url = $"{GameConst.Pussy888.BaseUrl}{GameConst.Pussy888.Register}" +
                    $"&agent={GameConst.Pussy888.agent}" +
                    $"&PassWd={Password}" +
                    $"&userName={username}" +
                    $"&Name={Name}" +
                    $"&Tel={MobileNo}" +
                    $"&Memo=New User Created" +
                    $"&UserType=1" +
                    $"&time={timestamp}" +
                    $"&pwdtype=1" +
                    $"&authcode={GameConst.Pussy888.AuthCode}" +
                    $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Pussy888.AuthCode.ToLower() + username + timestamp + GameConst.Pussy888.SecertKey.ToLower()).ToUpper()}";
                var response = JsonConvert.DeserializeObject<UserResponseAPI>(await GameHelpers.CallThirdPartyApi(url));
                if (response.code == 0)
                {
                    return new UserRegisterResponse
                    {
                        Code = response.code,
                        Message = response.msg,
                        Username = username,
                        Password = Password,
                        Success = response.success,
                        Type = response.type
                    };
                }
                else
                {
                    return new UserRegisterResponse
                    {
                        Code = response.code,
                        Message = response.msg,
                        Success = response.success
                    };
                }
            }
            else
            {
                return new UserRegisterResponse
                {
                    Code = randomUsernameResponse.code,
                    Message = randomUsernameResponse.msg,
                    Success = randomUsernameResponse.success
                };
            }
        }

        #endregion

        #region Pussy888 Game Transfer API

        internal static async Task<TransferMoneyResponse> CallTransferAPI(string Username, decimal Amount)
        {
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            var DisableUserUrl = $"{GameConst.Pussy888.BaseUrl}{GameConst.Pussy888.DisableUser}" +
                $"&userName={Username}" +
                $"&time={timestamp}" +
                $"&authcode={GameConst.Pussy888.AuthCode}" +
                $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Pussy888.AuthCode.ToLower() + Username + timestamp + GameConst.Pussy888.SecertKey.ToLower()).ToUpper()}";

            var DisableUser = JsonConvert.DeserializeObject<UserResponseAPI>(await GameHelpers.CallThirdPartyApi(DisableUserUrl));
            if (DisableUser.code == 0)
            {
                var url = $"{GameConst.Pussy888.BaseUrl}{GameConst.Pussy888.TransferMoney}" +
                             $"&scoreNum={Amount}" +
                             $"&userName={Username}" +
                             $"&ActionUser={GameConst.Pussy888.agent}" +
                             $"&ActionIp=192.0.1" +
                             $"&time={timestamp}" +
                             $"&authcode={GameConst.Pussy888.AuthCode}" +
                             $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Pussy888.AuthCode.ToLower() + Username + timestamp + GameConst.Pussy888.SecertKey.ToLower()).ToUpper()}";
                var response = JsonConvert.DeserializeObject<TransferMoneyResponse>(await GameHelpers.CallThirdPartyApi(url));
                return response;
            }
            else
            {
                return new TransferMoneyResponse
                {
                    code = DisableUser.code,
                    msg = DisableUser.msg,
                    success = DisableUser.success
                };
            }
        }

        #endregion

        #region Pussy888 game password reset API
        internal async Task<Kiss918PasswordResetResponse> Pussy888GamePasswordReset(ProfileResponse request, string NewPassword)
        {

            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            var url = $"{GameConst.Pussy888.BaseUrl}ashx/account/account.ashx?action=editUser" +
                   $"&userName={request.UserNamePussy888}" +
                   $"&OldPassWd={request.PasswordPussy888}" +
                   $"&PassWd={NewPassword}" +
                   $"&Name={request.UserName}" +
                   $"&time={timestamp}" +
                   $"&authcode={GameConst.Pussy888.AuthCode}" +
                   $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Pussy888.AuthCode.ToLower() + request.UserNamePussy888 + timestamp + GameConst.Pussy888.SecertKey.ToLower()).ToUpper()}" +
                   $"&pwdtype=1";
            var response = JsonConvert.DeserializeObject<Kiss918PasswordResetResponse>(await GameHelpers.CallThirdPartyApi(url));
            return response;
        }
        #endregion Pussy888 game password reset

        #region Pussy888 game Register

        internal async Task Pussy888Register(string UserId, string GameUsername, string GamePassword, string APIResponse)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Pussy888.Register, new { UserId, GameUsername, GamePassword, APIResponse });
            }
        }

        #endregion

        #region Pussy888 game Password Update

        internal async Task Pussy888PasswordUpdate(string UserId, string Password)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Pussy888.PasswordUpdate, new { UserId, Password });
            }
        }

        #endregion

        #region GET ALL Pussy GAME USERS

        public async Task<List<Kiss918GamePasswordResetResponse>> GetAllPussy888Usersname()
        {
            using (var repository = new DapperRepository<Kiss918GamePasswordResetResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Pussy888.Pussy888UserPasswordResetSelect, new { });
                return result.ToList(); ;
            }
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
