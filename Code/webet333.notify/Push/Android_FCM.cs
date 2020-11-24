using Webet333.logs.interfaces;
using Webet333.models.Configs;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Net;
using System.Text;

namespace Webet333.notify.Push
{
    public class Android_FCM
    {
        private ILogManager LogManager { get; set; }
        private PushConfig PushConfig { get; set; }

        public Android_FCM(ILogManager LogManager, PushConfig PushConfig)
        {
            this.LogManager = LogManager;
            this.PushConfig = PushConfig;
        }

        /// <summary>
        /// Send push notification to android device.
        /// </summary>
        /// <param name="data">Data in Json format</param>
        /// <param name="Token"></param>
        public void Send(string data, string Token)
        {
            try
            {
                WebRequest tRequest = WebRequest.Create(PushConfig.Android.HostName);
                tRequest.Method = "post";
                tRequest.ContentType = "application/json";
                Byte[] byteArray = Encoding.UTF8.GetBytes(data);
                tRequest.Headers.Add(string.Format("Authorization: key={0}", PushConfig.Android.ApplicationId));
                tRequest.Headers.Add(string.Format("Sender: id={0}", PushConfig.Android.SenderId));
                tRequest.ContentLength = byteArray.Length;
                using (Stream dataStream = tRequest.GetRequestStream())
                {
                    dataStream.Write(byteArray, 0, byteArray.Length);
                    using (WebResponse tResponse = tRequest.GetResponse())
                    {
                        using (Stream dataStreamResponse = tResponse.GetResponseStream())
                        {
                            using (StreamReader tReader = new StreamReader(dataStreamResponse))
                            {
                                String sResponseFromServer = tReader.ReadToEnd();
                                string str = sResponseFromServer;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                this.LogManager.LogError(JsonConvert.SerializeObject(new { class_name = this.GetType().Name, exception = ex }));
            }
        }
    }
}
