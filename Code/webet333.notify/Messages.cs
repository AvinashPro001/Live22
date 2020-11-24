using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using System;
using Webet333.logs.interfaces;
using Webet333.models.Configs;
using Webet333.models.Enums;
using Webet333.notify.interfaces.Email;
using Webet333.queue;

namespace Webet333.notify
{
    public class Messages : IMessages
    {
        private EmailConfig EmailConfig { get; set; }
        private AppConfig AppConfig { get; set; }
        private ILogManager Logger { get; set; }
        private PushConfig PushConfig { get; set; }
        private IHostingEnvironment HostingEnvironment { get; set; }
        private SerialQueue Queue { get; set; }

        public Messages(IOptions<EmailConfig> EmailConfigOption, IOptions<PushConfig> PushConfigOptions, ILogManager logger, IHostingEnvironment HostingEnvironment, IOptions<AppConfig> AppConfigOption, SerialQueue Queue)
        {
            this.EmailConfig = EmailConfigOption.Value;
            this.AppConfig = AppConfigOption.Value;
            this.PushConfig = PushConfigOptions.Value;
            this.HostingEnvironment = HostingEnvironment;
            this.Logger = logger;
            this.Queue = Queue;
        }

        public void SendEmail(string email, string subject, string body)
        {
            Queue.Enqueue(() =>
            {
                using (Email.SendEmailViaSmtp smtp = new Email.SendEmailViaSmtp(EmailConfig, AppConfig, Logger))
                {
                    smtp.Send(email, subject, body);
                }
            });
        }

        /// <summary>
        /// Send Push notification to all the devices. [Currently Android and iPhone]
        /// </summary>
        /// <param name="data">Data in Json format</param>
        /// <param name="Token">Device token generate by Mobile Application</param>
        /// <param name="Device">Device Type Like, Android, iPhone</param>
        public void SendPush(string data, string Token, DeviceEnums Device)
        {
            Queue.Enqueue(() =>
            {
                switch (Device)
                {
                    case (DeviceEnums.Android):
                        Push.Android_FCM android = new Push.Android_FCM(Logger, PushConfig);
                        android.Send(Token, data);
                        break;

                    case (DeviceEnums.iOS):
                        Push.Apple_APNS apple = new Push.Apple_APNS(HostingEnvironment, Logger, PushConfig);
                        apple.Send(data, Token);
                        break;
                }
            });
        }

        public void SendSms()
        {
            Queue.Enqueue(() =>
            {
                throw new NotImplementedException();
            });
        }
    }
}
