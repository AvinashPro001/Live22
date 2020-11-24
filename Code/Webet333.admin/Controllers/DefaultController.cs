using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Xml;

namespace Webet333.web.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class DefaultController : ControllerBase
    {
        private static readonly HttpClient client = new HttpClient();

        [HttpPost]
        public async Task<string> Get([FromBody]defaultRequest request)
        {

            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            httpResponseMessage = await client.GetAsync(request.url);
            var responseString = await httpResponseMessage.Content.ReadAsStringAsync();
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(responseString);
            string jsonText = JsonConvert.SerializeXmlNode(doc);
            return jsonText;

        }
    }

    public class defaultRequest
    {
        public string url { get; set; }
    }
}
