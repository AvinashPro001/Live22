using Webet333.logs.interfaces;
using Webet333.models.Configs;
using Newtonsoft.Json;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;

namespace Webet333.notify.Email
{
    public class SendEmailViaSmtp: IDisposable
    {
        #region Local Variables
        private EmailConfig emailConfig;
        private AppConfig appConfig;
        private readonly ILogManager Logger;
        #endregion

        #region SendEmailViaSmtp
        public SendEmailViaSmtp(EmailConfig configuration, AppConfig appConfig, ILogManager logger)
        {
            this.appConfig = appConfig;
            this.emailConfig = configuration;
            this.Logger = logger;
        }
        #endregion

        #region Send
        public async void Send(string email, string subject, string body)
        {
            if(string.IsNullOrEmpty(email))
                throw new Exception($"Email can not be null.");
            if (string.IsNullOrEmpty(emailConfig.Domain))
                throw new Exception($"Please specify the Domain in AppSettings.");
            if (string.IsNullOrEmpty(emailConfig.Email))
                throw new Exception($"Please specify the Email in AppSettings.");
            if (string.IsNullOrEmpty(emailConfig.Password))
                throw new Exception($"Please specify the Password in AppSettings.");
            if (string.IsNullOrEmpty(emailConfig.Port.ToString()))
                throw new Exception($"Please specify the Port in AppSettings.");
            try
            {
                var apiKey = emailConfig.Password;
                var client = new SendGridClient(apiKey);
                var msg = new SendGridMessage()
                {
                    From = new EmailAddress(emailConfig.SenderEmail, emailConfig.SenderName),
                    Subject = subject,
                    HtmlContent = DesignEmail(appConfig, subject, body)
                };
                msg.AddTo(new EmailAddress(email, email));
                var response = await client.SendEmailAsync(msg);
            }
            catch (Exception ex)
            {
                this.Logger.LogError(JsonConvert.SerializeObject(new { class_name = this.GetType().Name, exception = ex }));
            }
        }
        #endregion

        #region Design Email
        public string DesignEmail(AppConfig appConfig, string Subject, string Body)
        {
            return $"<table width='100%' border='0' cellspacing='0' cellpadding='0' bgcolor='#ffffff' align='center' style='max-width:600px;padding-top:0px;font-family:Open Sans;font-weight:normal;font-size:14px;line-height:19px;color:#444444;border-collapse:collapse;background-color:#ffffff!important'> <tbody> <tr> <td> <table width='100%' border='0' cellspacing='0' cellpadding='0' bgcolor='#f5f5f5' style='background-color:#f5f5f5!important;font-family:Open Sans;font-weight:normal;font-size:14px;line-height:19px;color:#444444;border-collapse:collapse;border:1px solid #dddddd'> <tbody> <tr> <td width='4%'>&nbsp;</td><td height='76' width='92%'>{appConfig.Name} - {appConfig.TagLine}</td><td width='4%'>&nbsp;</td></tr></tbody> </table> <table width='100%' border='0' cellspacing='0' cellpadding='0' bgcolor='#ffffff' style='font-family:Open Sans;font-weight:normal;font-size:14px;line-height:19px;color:#444444;border-collapse:collapse;background-color:#ffffff!important;border-left:1px solid #dddddd;border-right:1px solid #dddddd'> <tbody> <tr> <td width='4%'></td><td width='92%' valign='top' style='padding:0 0 13px 0'> <table width='100%' border='0' cellspacing='0' cellpadding='0' style='font-family:Open Sans;border-collapse:collapse;color:#444444'> <tbody> <tr> <td valign='top' style='font-size:14px;padding:20px 0 0 0'></td></tr><tr> <td valign='top' style='font-size:30px;padding:5px 0;line-height:35px'> <strong>{Subject}</strong> </td></tr></tbody> </table> <p style='line-height:20px!important;font-size:16px!important;margin-bottom:0!important;margin-bottom:0'> </p><div style='font-family:Open Sans;font-size:15px'>{Body}</div><p></p></td><td width='4%'></td></tr></tbody> </table> <table width='100%' cellspacing='0' cellpadding='0' border='0' style='font-family:Open Sans;font-weight:normal;font-size:14px;line-height:19px;color:#444444;border-collapse:collapse;border-left:1px solid #dddddd;border-right:1px solid #dddddd'> <tbody> <tr> <td width='4%'></td><td width='92%'> <p style='font-family:Open Sans;font-weight:normal;font-size:14px;line-height:19px;margin-top:0!important;margin-bottom:0!important;color:#444444'>Happy buying,<br /><strong>{appConfig.Name}</strong> </p></td><td width='4%'></td></tr><tr> <td height='35' colspan='3'></td></tr></tbody> </table> <table width='100%' border='0' cellspacing='0' cellpadding='0' style='border:1px solid #dddddd;font-family:Open Sans;font-weight:normal;font-size:14px;line-height:19px;color:#444444;border-collapse:collapse;background-color:#f5f5f5!important' bgcolor='#f5f5f5'> <tbody> <tr> <td width='4%'></td><td width='92%' align='left' valign='middle' style='padding:13px 0'>{appConfig.Footer}</td><td width='4%'></td></tr></tbody> </table> </td></tr></tbody></table>";
        }
        #endregion

        #region House Keeping
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            if(disposing)
            {
                emailConfig = null;
                appConfig = null;
            }
        }
        #endregion
    }
}
