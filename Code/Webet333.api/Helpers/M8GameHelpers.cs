using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Xml;
using Webet333.models.Constants;
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

        #endregion

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

        #region M8 Game Register API

        internal static async Task<M8RegisterResponse> CallRegisterAPI(string Username)
        {
            var url = $"{GameConst.M8.baseURL}?action={GameConst.M8.CreateUser}&secret={GameConst.M8.Secret}&agent={GameConst.M8.agent}&username={Username}";
            return JsonConvert.DeserializeObject<M8RegisterResponse>(await CallAPI(url));
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
