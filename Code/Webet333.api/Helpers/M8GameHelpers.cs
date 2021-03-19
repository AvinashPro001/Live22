using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Xml;
using Webet333.dapper;
using Webet333.models.Constants;
using Webet333.models.Request.Game;
using Webet333.models.Request.Game.M8;
using Webet333.models.Response.Game.M8;

namespace Webet333.api.Helpers
{
    public class M8GameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public M8GameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion Local Variables

        public static async Task<string> CallAPI(string Url)
        {
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            httpResponseMessage = await client.GetAsync(Url);
            var responseString = await httpResponseMessage.Content.ReadAsStringAsync();
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(responseString);
            string jsonText = JsonConvert.SerializeXmlNode(doc);
            return jsonText;
        }

        #region Global Variable Select

        internal async Task<M8SetLimitRequest> M8DefaultLimitSelect()
        {
            using (var repository = new DapperRepository<M8SetLimitRequest>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.Game.M8GetLimit, new { });
            }
        }

        #endregion Global Variable Select

        #region Call M8 Game Register API

        internal static async Task<M8RegisterResponse> CallRegisterAPI(string Username)
        {
            var url = $"{GameConst.M8.baseURL}?action={GameConst.M8.CreateUser}&secret={GameConst.M8.Secret}&agent={GameConst.M8.agent}&username={Username}";
            return JsonConvert.DeserializeObject<M8RegisterResponse>(await CallAPI(url));
        }

        #endregion Call M8 Game Register API

        #region M8 Game Register API

        internal async Task<dynamic> GameM8Register(GameM8RegisterRequest request)
        {
            string response = request.APIResponse.ToString(Newtonsoft.Json.Formatting.None);
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.Game.GameM8Register, new { request.UserId, request.M8UserName, APIResponse = response });
            }
        }

        #endregion M8 Game Register API

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