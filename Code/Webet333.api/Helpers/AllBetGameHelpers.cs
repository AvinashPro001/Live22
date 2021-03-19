using Newtonsoft.Json;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request.Game.AllBet;
using Webet333.models.Response.Game;
using Webet333.models.Response.Game.AllBet;

namespace Webet333.api.Helpers
{
    public class AllBetGameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public AllBetGameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion Local Variables

        #region Randon Number Genrate

        public static string genrateNumber()
        {
            Random generator = new Random();
            String r = generator.Next(0, 999999).ToString("D13");
            return r;
        }

        #endregion Randon Number Genrate

        #region Random Number

        public static string Random()
        {
            RNGCryptoServiceProvider csp = new RNGCryptoServiceProvider();
            byte[] byteCsp = new byte[5];
            csp.GetBytes(byteCsp);
            return BitConverter.ToString(byteCsp);
        }

        #endregion Random Number

        #region Call Third Party API and Encrpt Data

        public static async Task<string> CallAPI(string Url, string Parameter, bool Method = true)
        {
            try
            {
                var DesEncryptionData = SecurityHelpers.TripleDESEncrptText(Parameter, GameConst.AllBet.DESKey);
                var sign = SecurityHelpers.AllBetMD5Base64(DesEncryptionData + GameConst.AllBet.MD5Key);
                string QueryString = "propertyId=" + GameConst.AllBet.PropertyId + "&data=" + System.Web.HttpUtility.UrlEncode(DesEncryptionData) + "&sign=" + System.Web.HttpUtility.UrlEncode(sign);

                HttpWebRequest request = WebRequest.Create(Url) as HttpWebRequest;

                if (Method)
                {
                    request.Method = "POST";
                    request.ContentType = "application/x-www-form-urlencoded";

                    byte[] payload = Encoding.UTF8.GetBytes(QueryString);
                    request.ContentLength = payload.Length;

                    Stream outStream = request.GetRequestStream();
                    outStream.Write(payload, 0, payload.Length);
                    outStream.Close();
                }
                HttpWebResponse response = request.GetResponse() as HttpWebResponse;

                Stream responseStream = response.GetResponseStream();
                StreamReader reader = new StreamReader(responseStream, Encoding.UTF8);
                var result = reader.ReadToEnd();
                reader.Close();
                responseStream.Close();
                return result;
            }
            catch (WebException ex)
            {
                HttpWebResponse response = ex.Response as HttpWebResponse;
                Stream responseStream = response.GetResponseStream();
                StreamReader reader = new StreamReader(responseStream, Encoding.UTF8);
                var result = reader.ReadToEnd();
                reader.Close();
                responseStream.Close();
                return result;
            }
        }

        #endregion Call Third Party API and Encrpt Data

        #region Call Register Third Party API

        public static async Task<AllBetRegisterResponse> RegisterCallAPI(string Username, string Password)
        {
            Username = Regex.Replace(Username, @"[^0-9a-zA-Z]+", "");
            Password = Regex.Replace(Password, @"[^0-9a-zA-Z]+", "");
            if (Password.Length > 12)
                Password = Password.Substring(0, 12);

            var Parameter = $"random={Random()}&agent={GameConst.AllBet.Agent}&client={Username}&password={Password}&orHallRebate=0";
            var Url = $"{GameConst.AllBet.Url}{GameConst.AllBet.Register}";
            return JsonConvert.DeserializeObject<AllBetRegisterResponse>(await CallAPI(Url, Parameter));
        }

        #endregion Call Register Third Party API

        #region Call Change Password Third Party API

        public static async Task<dynamic> ChangePasswordCallAPI(string Username, string Password)
        {
            Username = Regex.Replace(Username, @"[^0-9a-zA-Z]+", "");
            Password = Regex.Replace(Password, @"[^0-9a-zA-Z]+", "");
            if (Password.Length > 12)
                Password = Password.Substring(0, 12);

            var Parameter = $"random={Random()}&client={Username}&newPassword={Password}";
            var Url = $"{GameConst.AllBet.Url}{GameConst.AllBet.ChangePassword}";
            return JsonConvert.DeserializeObject<AllBetRegisterResponse>(await CallAPI(Url, Parameter));
        }

        #endregion Call Change Password Third Party API

        #region Call Deposit Withdraw Third Party API

        public static async Task<AllBetRegisterResponse> DepositWithdrawCallAPI(string Username, int method, decimal Amount)
        {
            Username = Regex.Replace(Username, @"[^0-9a-zA-Z]+", "");
            var Parameter = $"random={Random()}&agent={GameConst.AllBet.Agent}&sn={GameConst.AllBet.PropertyId + genrateNumber()}&client={Username}&operFlag={method}&credit={Amount}";
            var Url = $"{GameConst.AllBet.Url}{GameConst.AllBet.transfer}";
            return JsonConvert.DeserializeObject<AllBetRegisterResponse>(await CallAPI(Url, Parameter));
        }

        #endregion Call Deposit Withdraw Third Party API

        #region Call Login Third Party API

        public static async Task<AllbetGameLoginResponse> LoginCallAPI(string Username, string Password, string LanguageCode, int AppType)
        {
            Username = Regex.Replace(Username, @"[^0-9a-zA-Z]+", "");
            Password = Regex.Replace(Password, @"[^0-9a-zA-Z]+", "");
            if (Password.Length > 12)
            {
                Password = Password.Substring(0, 12);
            }

            var Parameter = $"random={Random()}&client={Username}&password={Password}&language={LanguageCode}&appType={AppType}";
            var Url = $"{GameConst.AllBet.Url}{GameConst.AllBet.Login}";
            return JsonConvert.DeserializeObject<AllbetGameLoginResponse>(await CallAPI(Url, Parameter));
        }

        #endregion Call Login Third Party API

        #region Call Betting Details Third Party API

        public static async Task<AllBetServicesResponse> BettingDetailsCallAPI(string StartTime = null, string EndTime = null)
        {
            if (StartTime == null)
                StartTime = DateTime.Now.AddMinutes(-5).ToString("yyyy-MM-dd HH:mm:ss");
            if (EndTime == null)
                EndTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            var Parameter = $"random={Random()}&startTime={StartTime}&endTime={EndTime}&agent={GameConst.AllBet.Agent}";
            var Url = $"{GameConst.AllBet.Url}{GameConst.AllBet.BettingDetails}";
            return JsonConvert.DeserializeObject<AllBetServicesResponse>(await CallAPI(Url, Parameter));
        }

        #endregion Call Betting Details Third Party API

        #region Call Betting Details Third Party API

        public static async Task<dynamic> BettingDetailsByUserCallAPI(string StartTime = null, string EndTime = null, string Username = null)
        {
            if (StartTime == null)
                StartTime = DateTime.Now.AddMinutes(-5).ToString("yyyy-MM-dd HH:mm:ss");
            if (EndTime == null)
                EndTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            var Parameter = $"random={Random()}&client={Username}&startTime={StartTime}&endTime={EndTime}&pageIndex=1&pageSize=100";
            var Url = $"{GameConst.AllBet.Url}{GameConst.AllBet.BettingDetailsByUser}";
            return JsonConvert.DeserializeObject(await CallAPI(Url, Parameter));
        }

        #endregion Call Betting Details Third Party API

        #region AllBet game Register

        internal async Task AllBetRegister(string UserId, string Username, string Response)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.AllBet.Register, new { UserId, Username, Response });
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