using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using Webet333.api.Helpers;

namespace Webet333.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DefaultController : ControllerBase
    {
        private IHostingEnvironment _hostingEnvironment;

        private static readonly HttpClient client = new HttpClient();

        public DefaultController(IHostingEnvironment environment)
        {
            _hostingEnvironment = environment;
        }

        [HttpPost]
        public async Task<string> Get([FromBody] defaultRequest request)
        {
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            httpResponseMessage = await client.GetAsync(request.url);
            var responseString = await httpResponseMessage.Content.ReadAsStringAsync();
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(responseString);
            string jsonText = JsonConvert.SerializeXmlNode(doc);
            return jsonText;
        }

        [HttpPost("playtech")]
        public async Task<string> GetPlaytech([FromBody] defaultRequest request)
        {
            string rURL = request.url;
            DefaultHelper defaultHelper = new DefaultHelper(_hostingEnvironment);
            return await defaultHelper.PlaytechAPICertificate(rURL);
        }

        [HttpPost("ag")]
        public async Task<string> GetAg([FromBody] defaultRequest request)
        {
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            httpResponseMessage = await client.PostAsync(request.url, null);
            var responseString = await httpResponseMessage.Content.ReadAsStringAsync();
            return responseString;
        }

        [HttpPost("joker")]
        public async Task<string> GetJoker([FromBody] defaultRequestJoker request)
        {
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            var stringContent = new StringContent(request.model, UnicodeEncoding.UTF8, "application/x-www-form-urlencoded");
            httpResponseMessage = await client.PostAsync(request.url, stringContent);
            var responseString = await httpResponseMessage.Content.ReadAsStringAsync();
            return responseString;
        }

        public class defaultRequest
        {
            public string url { get; set; }
        }

        public class defaultRequestJoker : defaultRequest
        {
            public string model { get; set; }
        }
    }
}