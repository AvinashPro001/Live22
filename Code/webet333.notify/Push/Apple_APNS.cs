using Microsoft.AspNetCore.Hosting;
using Webet333.logs.interfaces;
using Webet333.models.Configs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Security;
using System.Net.Sockets;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace Webet333.notify.Push
{
    public class Apple_APNS
    {
        private IHostingEnvironment HostingEnvironment { get; set; }
        private ILogManager LogManager { get; set; }
        private PushConfig PushConfig { get; set; }

        public Apple_APNS(IHostingEnvironment HostingEnvironment, ILogManager LogManager, PushConfig PushConfig)
        {
            this.HostingEnvironment = HostingEnvironment;
            this.LogManager = LogManager;
            this.PushConfig = PushConfig;
        }

        /// <summary>
        /// Send push notification to Apple device.
        /// </summary>
        /// <param name="payload">Payload in Json format</param>
        /// <param name="token"></param>
        public void Send(string payload, string token)
        {
            int port = 2195;
            string certificatePath = Path.Combine(HostingEnvironment.WebRootPath, PushConfig.Apple.CertificatePath);
            X509Certificate2 clientCertificate = new X509Certificate2(certificatePath, PushConfig.Apple.Password, X509KeyStorageFlags.MachineKeySet);
            X509Certificate2Collection certificatesCollection = new X509Certificate2Collection(clientCertificate);
            TcpClient client = new TcpClient(PushConfig.Apple.HostName, port);
            SslStream sslStream = new SslStream(client.GetStream(), false, new RemoteCertificateValidationCallback(ValidateServerCertificate), null);
            try
            {
#pragma warning disable 612, 618
                sslStream.AuthenticateAsClient(PushConfig.Apple.HostName, certificatesCollection, enabledSslProtocols: SslProtocols.Default, checkCertificateRevocation: false);
            }
            catch (AuthenticationException ex)
            {
                LogManager.LogError(JsonConvert.SerializeObject(new { class_name = this.GetType().Name, exception = ex }));
                client.Close();
                return;
            }
            MemoryStream memoryStream = new MemoryStream();
            BinaryWriter writer = new BinaryWriter(memoryStream);

            writer.Write((byte)0);
            writer.Write((byte)0);
            writer.Write((byte)32);

            byte[] b0 = HexString2Bytes(token);
            WriteMultiLineByteArray(b0);

            writer.Write(b0);

            writer.Write((byte)0); //First byte of payload length; (big-endian first byte)
            writer.Write((byte)payload.Length);     //payload length (big-endian second byte)

            byte[] b1 = Encoding.UTF8.GetBytes(payload);
            writer.Write(b1);
            writer.Flush();

            byte[] array = memoryStream.ToArray();
            try
            {
                sslStream.Write(array);
                sslStream.Flush();
            }
            catch (Exception ex)
            {
                LogManager.LogError(JsonConvert.SerializeObject(new { class_name = this.GetType().Name, exception = ex }));
            }
            client.Close();
        }

        private byte[] HexString2Bytes(string hexString)
        {
            if (hexString == null) return null;
            int len = hexString.Length;
            if (len % 2 == 1) return null;
            int len_half = len / 2;
            byte[] bs = new byte[len_half];
            try
            {
                for (int i = 0; i != len_half; i++)
                {
                    bs[i] = (byte)Int32.Parse(hexString.Substring(i * 2, 2), System.Globalization.NumberStyles.HexNumber);
                }
            }
            catch (Exception ex)
            {
                LogManager.LogError(JsonConvert.SerializeObject(new { class_name = this.GetType().Name, exception = ex }));
            }
            return bs;
        }

        private bool ValidateServerCertificate(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            if (sslPolicyErrors == SslPolicyErrors.None)
                return true;
            LogManager.LogError(JsonConvert.SerializeObject(new { class_name = this.GetType().Name, exception = $"Certificate error: {sslPolicyErrors}" }));
            return false;
        }

        private static void WriteMultiLineByteArray(byte[] bytes)
        {
            const int rowSize = 20;
            int iter;
            for (iter = 0; iter < bytes.Length - rowSize; iter += rowSize)
            {
                BitConverter.ToString(bytes, iter, rowSize);
            }
            BitConverter.ToString(bytes, iter);
        }
    }
}
