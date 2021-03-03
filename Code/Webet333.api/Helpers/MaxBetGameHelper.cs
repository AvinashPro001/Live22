using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Webet333.api.Helpers.SexyBaccarat;
using Webet333.dapper;
using Webet333.models;
using Webet333.models.Constants;
using Webet333.models.Mapping.Game;
using Webet333.models.Request.Game.MaxBet;
using Webet333.models.Response;
using Webet333.models.Response.Game.MAXBet;

namespace Webet333.api.Helpers
{
    public class MaxBetGameHelper : IDisposable
    {
        #region Local Variables
        private string Connection = string.Empty;

        public MaxBetGameHelper(string Connection = null)
        {
            this.Connection = Connection;
        }
        #endregion 

        #region Call Maxbet Game Register API

        internal static async Task<ThirdPartyAPIResponse> CallMaxbetRegisterAPI(GameMaxBetRegisterRequest request)
        {
            var parameter = $"vendor_id={GameConst.MaxBet.VendorId}" +
           $"&Vendor_Member_ID={request.Username}" +
           $"&OperatorId={GameConst.MaxBet.OperatorId}" +
           $"&FirstName={request.Firstname}" +
           $"&LastName={request.Lastname}" +
           $"&UserName={request.Username}" +
           $"&OddsType={GameConst.MaxBet.OddsType}" +
           $"&Currency={GameConst.MaxBet.Currency}" +
           $"&MaxTransfer={request.maxtransfer}" +
           $"&MinTransfer={request.mintransfer}";

            var url = $"{GameConst.MaxBet.baseURL}CreateMember?{parameter}";

            var responseString = await CallThirdPartyApi(url, parameter);
            return JsonConvert.DeserializeObject<ThirdPartyAPIResponse>(responseString);
        }

        #endregion 

        #region Call Maxbet Game Login API

        internal static async Task<MaxbetLoginResponse> CallMaxbetLoginAPI(string VendorMemberId)
        {
            var parameter = $"vendor_id={GameConst.MaxBet.VendorId}" +
              $"&vendor_member_id={VendorMemberId}" +
              $"&domain=www.webet333.com";
            var url = $"{GameConst.MaxBet.baseURL}Login?{parameter}";

            var responseString = await CallThirdPartyApi(url, parameter);
            return JsonConvert.DeserializeObject<MaxbetLoginResponse>(responseString);
        }

        #endregion 

        #region Call Maxbet Game Deposit Withdraw API

        internal static async Task<MaxBetTransferResponse> CallMaxbetDepsoitWithdrawAPI(string VendorMemberId, decimal amount, int Method)
        {
            var update = new GameMaxBetRegisterRequest
            {
                mintransfer = 1,
                maxtransfer = 999999999
            };
            await CallMaxbetUpdateAPI(update, VendorMemberId);

            var TransId = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

            var parameter = $"vendor_id={GameConst.MaxBet.VendorId}" +
              $"&vendor_member_id={VendorMemberId}" +
              $"&vendor_trans_id=WB3_{TransId}" +
              $"&amount={amount}" +
              $"&currency={GameConst.MaxBet.Currency}" +
              $"&direction={Method}" +
              $"&wallet_id={GameConst.MaxBet.WalletId}";

            var url = $"{GameConst.MaxBet.baseURL}FundTransfer?{parameter}";

            var responseString = await CallThirdPartyApi(url, parameter);
            return JsonConvert.DeserializeObject<MaxBetTransferResponse>(responseString);
        }

        #endregion 

        #region Call Maxbet Game Update API

        internal static async Task<ThirdPartyAPIResponse> CallMaxbetUpdateAPI(GameMaxBetRegisterRequest request, string vendorMemberId)
        {
            var parameter = $"vendor_id={GameConst.MaxBet.VendorId}"
                    + $"&vendor_member_id={vendorMemberId}"
                    + $"&operatorid={GameConst.MaxBet.OperatorId}"
                    + $"&oddstype={GameConst.MaxBet.OddsType}"
                    + $"&currency=20";

            if (request.Firstname != null)
                parameter += $"&firstname={request.Firstname}";

            if (request.Username != null)
                parameter += $"&lastname={request.Lastname}";

            if (request.Username != null)
                parameter += $"&username={request.Username}";

            if (request.maxtransfer != 0)
                parameter += $"&maxtransfer={request.maxtransfer}";

            if (request.mintransfer != 0)
                parameter += $"&mintransfer={request.mintransfer}";

            var url = $"{GameConst.MaxBet.baseURL}UpdateMember?{parameter}";


            var responseString = await CallThirdPartyApi(url, parameter);
            return JsonConvert.DeserializeObject<ThirdPartyAPIResponse>(responseString);
        }

        #endregion 

        #region Call Maxbet Game Set Betting Limit API

        internal static async Task<string> CallMaxbetBettingLimitsUpdateAPI(List<JsonStringMaxBetLimit> setlimit, string vendorMemberId)
        {
            var parameter = $"vendor_id={GameConst.MaxBet.VendorId}"
                + $"&vendor_member_id={vendorMemberId}"
                + $"&bet_setting={JsonConvert.SerializeObject(setlimit)}"
                + $"&operatorid={GameConst.MaxBet.OperatorId}";

            var url = $@"{GameConst.MaxBet.baseURL}SetMemberBetSetting";

            return await CallThirdPartyApi(url, parameter);
        }

        #endregion 

        #region Call Maxbet Game Set Betting Limit API for All User

        internal static async Task<ThirdPartyAPIResponse> CallMaxbetBettingLimitsAllUser(List<JsonStringMaxBetLimit> setlimit)
        {
            var parameter = $"vendor_id={GameConst.MaxBet.VendorId}"
                + $"&currency=2"
                + $"&bet_setting={JsonConvert.SerializeObject(setlimit)}"
                + $"&operatorid={GameConst.MaxBet.OperatorId}";

            var url = $@"{GameConst.MaxBet.baseURL}SetMemberBetSettingBySubsidiary";

            return JsonConvert.DeserializeObject<ThirdPartyAPIResponse>( await CallThirdPartyApi(url, parameter));
        }

        #endregion 

        #region Max Bet Game Token Update
        internal async Task<dynamic> MaxBetTokenUpdate(GameMaxBetTokenUpdateRequest request, string userId)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.AddOrUpdateAsync(StoredProcConsts.MaxBetGame.MaxBetTokenUpdate, new { request.Token, userId });
            }
        }

        #endregion

        #region GameMaxBet Register
        internal async Task<dynamic> GameMaxBetRegister(string vendorMemberId, string userId, string Response)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                dynamic user = await repository.FindAsync(StoredProcConsts.MaxBetGame.GameMaxBetRegister, new { vendorMemberId, userId, Response });
                return user;
            }
        }
        #endregion 

        #region Get Max Global Parameters

        internal async Task<MaxBetGlobalVariableResponse> GetMaxBetGlobalParameters()
        {
            using (var repository = new DapperRepository<MaxBetGlobalVariableResponse>(Connection))
            {
                var result = await repository.FindAsync(StoredProcConsts.MaxBetGame.GetMaxBetDefaultLimit, new { });
                return result;
            }
        }
        #endregion 

        #region MaxBet Find User using token

        internal async Task<MaxBetFindUserTokenResponse> FindUserMaxBetToken(string token)
        {
            using (var repository = new DapperRepository<MaxBetFindUserTokenResponse>(Connection))
            {
                var user = await repository.FindAsync(StoredProcConsts.MaxBetGame.MaxBetGetUserByToken, new { token });
                return user;
            }

        }

        #endregion 

        #region Find Users on UserId

        public async Task<List<MaxbetVendorMemberIdResponse>> GetAllUserVendorIdList(string userId = null)
        {
            using (var GetProfileRepository = new DapperRepository<MaxbetVendorMemberIdResponse>(Connection))
            {
                var users = await GetProfileRepository.GetDataAsync(StoredProcConsts.MaxBetGame.GetUserVendorIdList, new { userId });
                return users.ToList();
            }
        }

        #endregion Find Users on UserId

        #region Set All user Min Max Limit

        public async Task GetAllUserMinMaxLimit(List<MaxbetVendorMemberIdResponse> request, decimal Min, decimal Max)
        {
            var req = new GameMaxBetRegisterRequest
            {
                mintransfer = Min,
                maxtransfer = Max
            };
            foreach (var user in request)
            {
                await CallMaxbetUpdateAPI(req, user.VendorMemberId);
            }

        }

        #endregion Find Users on UserId

        #region Find Users From Game

        public async Task<dynamic> FindUsersGame(string gameName = null, string userId = null)
        {
            using (var GetProfileRepository = new DapperRepository<dynamic>(Connection))
            {
                dynamic users = await GetProfileRepository.FindAsync(StoredProcConsts.Game.GameGetProfile, new { GameName = gameName, UserId = userId });
                return users;
            }
        }

        #endregion Find Users From Game

        #region Get List of Max Bet Users which have setlimit is false
        public async Task<List<MaxbetUserDetailsResponse>> GetUsersList()
        {
            using (var repository = new DapperRepository<MaxbetUserDetailsResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.MaxBetGame.GetUserList, new { });
                return result.ToList();
            }
        }
        #endregion 

        #region set setlimit true of MaxBetUser or reset limit
        internal async Task MaxBetSetLimit(bool SetLimit, string Id = null, string adminId = null, string description = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.GetDataAsync(
                    StoredProcConsts.MaxBetGame.SetLimit,
                    new
                    {
                        Id,
                        SetLimit,
                        adminId,
                        description
                    });
            }
        }
        #endregion 

        #region set setlimit true of MaxBetUser
        internal async Task<dynamic> MaxBetSetGlobalVariable(string maxValue, string minValue, string adminId = null, string description = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.GetDataAsync(
                    StoredProcConsts.Global.UpdateGlobalParamters,
                    new
                    {
                        Value = minValue,
                        Name = "MaxBetMinimum",
                        adminId,
                        description
                    });

                return await repository.GetDataAsync(
                    StoredProcConsts.Global.UpdateGlobalParamters,
                    new
                    {
                        Value = maxValue,
                        Name = "MaxBetMaximum",
                        adminId,
                        description
                    });
            }
        }
        #endregion 

        #region Xml Return With Declaration
        internal static ContentResult XmlReturnWithDeclaration(string message = null, string StatusCode = null, string venderMemberId = null)
        {

            string xml = $@"<?xml version=""1.0"" encoding=""UTF-8""?><authenticate version=""2.0""><vendor_member_id>{venderMemberId}</vendor_member_id><status_code>{StatusCode}</status_code><message>{message}</message></authenticate>";

            return new ContentResult
            {
                ContentType = "application/xml",
                Content = xml,
                StatusCode = 200
            };
        }
        #endregion Xml Return With Declaration

        #region set default betting limit of MaxBetUser
        internal async Task<dynamic> DefaultBettingLimit(MaxBetDefaultBettingVariableRequest request)
        {
            var map = new MaxBetDefaultBettingLimitMapping();
            var response = map.Map(request);
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.AddOrUpdateAsync(StoredProcConsts.Global.UpdateGlobalParamters, response);
            }
        }
        #endregion 

        public static string RandomString(string text = null)
        {
            int size = 1;
            char[] chars = "1234567890".ToCharArray();
            byte[] data = new byte[size];

            using (RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider())
            {
                crypto.GetBytes(data);
            }

            StringBuilder result = new StringBuilder(size);

            foreach (byte b in data)
            {
                result.Append(chars[b % (chars.Length)]);
            }

            return (result.ToString());
        }

        internal static async Task<string> CallThirdPartyApi(string Url, string Parameter)
        {

            var data = Encoding.ASCII.GetBytes(Parameter);
            var request = WebRequest.Create(new Uri(Url)) as HttpWebRequest;
            if (request == null) throw new Exception("Non HTTP WebRequest");
            request.Method = "POST";
            request.Timeout = 15000;
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = data.Length;
            var reqStream = request.GetRequestStream();
            reqStream.Write(data, 0, data.Length);
            reqStream.Close();

            var response = request.GetResponse();
            var resStream = response.GetResponseStream();
            var resStreamReader = new StreamReader(resStream);
            var resString = resStreamReader.ReadToEnd();
            return resString;

        }

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
