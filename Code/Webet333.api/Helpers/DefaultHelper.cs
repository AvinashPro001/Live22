using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace Webet333.api.Helpers
{
    public class DefaultHelper
    {
        private IHostingEnvironment _hostingEnvironment;

        public DefaultHelper(IHostingEnvironment environment)
        {
            _hostingEnvironment = environment;
        }

        public async Task<string> PlaytechAPICertificate(string Url, bool result = false, bool returnResult = false)
        {
            HttpWebRequest Request = (HttpWebRequest)WebRequest.Create(Url);
            HttpWebResponse Response = null;

            Request.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
            Request.Headers.Add("Cache-Control", "max-age=0");
            Request.KeepAlive = true;
            Request.Headers.Add("Keep-Alive", "timeout=5, max=100");
            Request.Headers.Add("Accept-Charset", "ISO-8859-1,utf-8;q=0.7,*;q=0.3");
            Request.Headers.Add("Accept-Language", "es-ES,es;q=0.8");
            Request.Headers.Add("Pragma", "");
            Request.Headers.Add("X_ENTITY_KEY", "f13fec2c9cf27139bf0d68cf212b1573f55c51f4ab6534f212ca7251ccb81957a376f6f0b99e5d8487cde4d809b5a3ac5522bc6e4c7fa10c7bbd07d302999ad6");
            Request.Method = "POST";

            Request.ContentType = "application/x-www-form-urlencoded";

            var path = Path.Combine(_hostingEnvironment.WebRootPath, "MYRWFF88.p12");

            Request.ClientCertificates.Add(new X509Certificate2(path, "vrinkiv4HfXj7flP", X509KeyStorageFlags.MachineKeySet));
            ServicePointManager.ServerCertificateValidationCallback = CertificateValidationCallBack;
            Response = (HttpWebResponse)await Request.GetResponseAsync();
            StreamReader reader = new StreamReader(Response.GetResponseStream());
            String retData = reader.ReadToEnd();

            JObject jObject = JObject.Parse(retData);

            if (returnResult)
                return retData;

            JToken jresult = null;
            IDictionary<string, JToken> dictionary = jObject;
            if (dictionary.ContainsKey("result"))
            {
                jresult = jObject["result"];
                if (result)
                    jresult = jObject.ToString();
            }
            if (dictionary.ContainsKey("error"))
            {
                jresult = jObject["error"];
            }
            retData = null;
            jObject = null;

            bool CertificateValidationCallBack(object sender, X509Certificate certificate, X509Chain chain, System.Net.Security.SslPolicyErrors sslPolicyErrors)
            {
                if (sslPolicyErrors == System.Net.Security.SslPolicyErrors.None)
                    return true;

                if ((sslPolicyErrors & System.Net.Security.SslPolicyErrors.RemoteCertificateChainErrors) != 0)
                {
                    if (chain != null && chain.ChainStatus != null)
                    {
                        foreach (X509ChainStatus status in chain.ChainStatus)
                        {
                            if ((certificate.Subject == certificate.Issuer) && (status.Status == X509ChainStatusFlags.UntrustedRoot))
                                continue;
                            else
                            {
                                if (status.Status != X509ChainStatusFlags.NoError)
                                    return false;
                            }
                        }
                    }
                    return true;
                }
                else
                    return false;
            }
            return jresult.ToString();
        }
    }
}