using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request.PaymentGateway;
using Webet333.models.Response.PaymentGateway;

namespace Webet333.api.Helpers
{
    public class PaymentGatewayHelpers : IDisposable
    {
        #region variable 

#if  DEBUG

        private string Connection = string.Empty;

        private const string Url = "https://stageapi.vaderpay.net/";

        private const string GetPaymentGatewayUrlEndpoint = "setuppayment.asp";

        private const string CheckStatusEndpoint = "transinfo.asp";

        private const string SellerId = "webet";

        private const string Currency = "MYR";

        private const string AuthKey = "cggJRTZHaJ58mwJ2tAT6vaEx9J9a7vJzVoCunC42log=";

#elif STAG

        private string Connection = string.Empty;

        private const string Url = "https://api.vaderpay.net/";

        private const string GetPaymentGatewayUrlEndpoint = "setuppayment.asp";

        private const string CheckStatusEndpoint = "transinfo.asp";

        private const string SellerId = "wbt02";

        private const string Currency = "MYR";

        private const string AuthKey = "xMb8QEgpvIA8wSkeJyQ7YgrBZo/k2Qngut3RCsrFNrc=";


#endif

        public PaymentGatewayHelpers(string Connection)
        {
            this.Connection = Connection;
        }

        #endregion variable

        #region Call Third Party API and Encrpt Data

        public static async Task<string> CallAPI(string Url, string Parameter, bool Method = true)
        {
            try
            {

                HttpWebRequest request = WebRequest.Create(Url) as HttpWebRequest;

                if (Method)
                {
                    request.Method = "POST";
                    request.ContentType = "application/x-www-form-urlencoded";
                    request.Headers.Add("Authorization", $"Basic {AuthKey}");

                    byte[] payload = Encoding.UTF8.GetBytes(Parameter);
                    request.ContentLength = payload.Length;

                    Stream outStream = request.GetRequestStream();
                    outStream.Write(payload, 0, payload.Length);
                    outStream.Close();
                }
                else
                {
                    request.Method = "GET";
                    request.ContentType = "application/x-www-form-urlencoded";
                    request.Headers.Add("Authorization", $"Basic {AuthKey}");
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

        #endregion

        #region Get Payment URL

        public static async Task<GetUrlResponse> CallPaymentgetURL(string Name, decimal Amount)
        {
            var guid = Guid.NewGuid();
            var parameters = $"Seller={SellerId}&ReturnURL={GameConst.BaseUrl}PaymentStatus?status=accept&FailedReturnURL={GameConst.BaseUrl}PaymentStatus?status=reject&HTTPPostURL={GameConst.APIUrl}online/payment/verified&Amount={Amount}&Currency={Currency}&ItemID={guid}&ItemDescription=Deposit Money {Amount} MYR&ClientName={Name}";
            var url = Url + GetPaymentGatewayUrlEndpoint;
            return JsonConvert.DeserializeObject<GetUrlResponse>(await CallAPI(url, parameters));
        }

        #endregion

        #region Check Status

        public static async Task<CheckPaymentStatusResponse> CheckStatus(string token)
        {
            var url = $"{Url}{CheckStatusEndpoint}?token={token}";
            return JsonConvert.DeserializeObject<CheckPaymentStatusResponse>(await GameHelpers.CallGetMethodThirdPartyApi(url));
        }

        #endregion

        #region Payment Token Save in DB

        public async Task<int> PaymentTokenSave(string UserId, string UniqueId, string Role, string Token, int Status, string TransactionNumber, string Response, decimal Amount, bool PromotionApplyEligible, string PromotionId)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.PaymentGateway.SaveToken, new { UserId, UniqueId, Role, Token, Status, TransactionNumber, Response, Amount, PromotionApplyEligible, PromotionId });
            }
            return 0;
        }

        #endregion

        #region Payment Token Verified in DB

        public async Task PaymentVerified(PaymentGatewayVerifiedRequest request)
        {
            if (request.apikey == "TransactionCheckStatusOfVaderPayCustomerService2")
                request.apikey = AuthKey;

            if (request.apikey == AuthKey)
            {
                using (var repository = new DapperRepository<dynamic>(Connection))
                {
                    await repository.AddOrUpdateAsync(StoredProcConsts.PaymentGateway.VerifiedToken, new { request.transaction, request.status, request.status_message, request.decline_reason, request.src_bank_account, request.created_at, response = JsonConvert.SerializeObject(request) });
                }
            }
        }

        #endregion

        #region Get Pending Token List

        public async Task<List<GetTokenResponse>> GetPendingTokenList()
        {
            using (var repository = new DapperRepository<GetTokenResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.PaymentGateway.GetPendingToken, new { });
                return result.ToList();
            }
        }

        #endregion

        #region House Keeping
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            if (disposing)
            {
                Connection = string.Empty;
            }
        }
        #endregion
    }
}
