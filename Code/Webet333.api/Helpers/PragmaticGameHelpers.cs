using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Response.Game.Pragmatic;

namespace Webet333.api.Helpers
{
    public class PragmaticGameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public PragmaticGameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion Local Variables

        #region Call Third Party API and Encrpt Data

        public static async Task<string> CallAPI(string Url, string Parameter, bool Method = true)
        {
            try
            {
                var hash = $"&hash={SecurityHelpers.MD5EncrptText(Parameter + GameConst.Pragmatic.SecretKey)}";
                var QueryString = Parameter + hash;

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

        public static async Task<PragmaticRegisterResponse> RegisterCallAPI(string Username)
        {
            var Parameter = $"currency={GameConst.Pragmatic.Currency}&externalPlayerId={Username}&secureLogin={GameConst.Pragmatic.SecureLogin}";
            var Url = $"{GameConst.Pragmatic.Url}{GameConst.Pragmatic.Register}";
            return JsonConvert.DeserializeObject<PragmaticRegisterResponse>(await CallAPI(Url, Parameter));
        }

        #endregion Call Register Third Party API

        #region Call Login Third Party API

        public static async Task<dynamic> LoginCallAPI(string Username, string langCode, string platform, string GameId = "vs7776secrets")
        {
            string lobbyURL, Cashier;
            if (platform == "MOBILE")
            {
                lobbyURL = GameConst.BaseUrl + "Mobile/PragmaticGame";
                Cashier = GameConst.BaseUrl + "Mobile/Deposit";
            }
            else
            {
                lobbyURL = GameConst.BaseUrl + "Information/PragmaticGame";
                Cashier = GameConst.BaseUrl + "Account/Profile";
            }

            var Parameter = $"cashier={Cashier}" +
                $"&externalPlayerId={Username}" +
                $"&gameId={GameId}" +
                $"&language={langCode}" +
                $"&lobbyURL={lobbyURL}" +
                $"&platform={platform}" +
                $"&secureLogin={GameConst.Pragmatic.SecureLogin}";
            var Url = $"{GameConst.Pragmatic.Url}{GameConst.Pragmatic.Login}";
            return JsonConvert.DeserializeObject<dynamic>(await CallAPI(Url, Parameter));
        }

        #endregion Call Login Third Party API

        #region Call Transfer Third Party API

        public static async Task<PragmaticTransferResponse> TransferBalance(string Username, decimal Amount)
        {
            var transid = Guid.NewGuid();
            var Parameter = $"amount={Amount}&externalPlayerId={Username}&externalTransactionId={transid}&secureLogin={GameConst.Pragmatic.SecureLogin}";
            var Url = $"{GameConst.Pragmatic.Url}{GameConst.Pragmatic.transfer}";
            return JsonConvert.DeserializeObject<PragmaticTransferResponse>(await CallAPI(Url, Parameter));
        }

        #endregion Call Transfer Third Party API

        #region Call Game List Third Party API

        public static async Task<PragmaticGameList> GameListCallAPI()
        {
            var Parameter = $"secureLogin={GameConst.Pragmatic.SecureLogin}";
            var Url = $"{GameConst.Pragmatic.Url}{GameConst.Pragmatic.GameList}";
            return JsonConvert.DeserializeObject<PragmaticGameList>(await CallAPI(Url, Parameter));
        }

        #endregion Call Game List Third Party API

        #region Call Broken status Third Party API

        public static async Task<PragmaticBrokenStatusResponse> BrokenStatus(string Username)
        {
            var Parameter = $"login={GameConst.Pragmatic.SecureLogin}&password={GameConst.Pragmatic.SecretKey}&playerId={Username}";
            var Url = $"{GameConst.Pragmatic.BettingDetailsUrl}{GameConst.Pragmatic.BrokenStatus}?{Parameter}";
            return JsonConvert.DeserializeObject<PragmaticBrokenStatusResponse>(await GameHelpers.CallGetMethodThirdPartyApi(Url));
        }

        #endregion Call Broken status Third Party API

        #region Call Game Betting Details Third Party API

        public static async Task<List<PragmaticBettingDetailsResponse>> BettingDetails(long timestamp)
        {
            var Url = $"{GameConst.Pragmatic.BettingDetailsUrl}{GameConst.Pragmatic.BettingDetails}?login={GameConst.Pragmatic.SecureLogin}&password={GameConst.Pragmatic.SecretKey}&timepoint={timestamp}";
            var result = await GameHelpers.CallGetMethodThirdPartyApi(Url);
            var data = result.Split("\n");
            var columnsName = data[1].Split(",");

            DataTable csvData = new DataTable();

            foreach (string column in columnsName)
            {
                DataColumn datecolumn = new DataColumn(column);
                datecolumn.AllowDBNull = true;
                csvData.Columns.Add(datecolumn);
            }

            if (data.Length > 3)
                for (int i = 2; i < data.Length - 1; i++)
                    csvData.Rows.Add(data[i].Split(","));

            var tableDataAsString = JsonConvert.SerializeObject(csvData);
            return JsonConvert.DeserializeObject<List<PragmaticBettingDetailsResponse>>(tableDataAsString);
        }

        #endregion Call Game Betting Details Third Party API

        #region Pragmatic game Register

        internal async Task PragmaticRegister(string UserId, string Username, string Response)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Pragmatic.Register, new { UserId, Username, Response });
            }
        }

        #endregion Pragmatic game Register

        #region Pragmatic Broken status

        internal async Task PragmaticBrokenStatus(string Username, string Status, string Response)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Pragmatic.BrokenStatus, new { Username, Status, Response });
            }
        }

        #endregion Pragmatic Broken status

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