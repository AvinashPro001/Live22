using Microsoft.Extensions.Localization;
using Webet333.api.Controllers.Base;
using Webet333.models.Constants;
using Webet333.models.Response.Account;
using Webet333.notify.interfaces.Email;

namespace Webet333.api.Helpers
{
    public class EmailHelpers
    {
        private IStringLocalizer<BaseController> Localizer { get; set; }
        private IMessages Messages { get; set; }

        public EmailHelpers(IStringLocalizer<BaseController> Localizer, IMessages Messages)
        {
            this.Localizer = Localizer;
            this.Messages = Messages;
        }

        #region Send Account related mail
        public void SendAccountEmail(ProfileResponse user, string url, string typeEnums)
        {
            switch (typeEnums)
            {
                case EmailTypeConst.ConfirmEmail:
                    SendEmail(user.Email, $"{Localizer["email_sub_confirm_email"].Value} | {Localizer["app_name"].Value}", $"Hi {user.Name}, <br /><br />Thanks a lot for registering with {Localizer["app_name"].Value}, Please <a href='{url}'>click here</a> to confirm your email.<br /><br />Thank You.");
                    break;

                case EmailTypeConst.ResetPassword:
                    SendEmail(user.Email, $"{Localizer["email_sub_reset_password"].Value} | {Localizer["app_name"].Value}", $"Hi {user.Name}, <br /><br />We have recieved request to reset your {Localizer["app_name"].Value} account password, Please <a href='{url}'>click here</a> to reset your password.<br /><br />Thank You.");
                    break;

                case EmailTypeConst.ChangeEmail:
                    SendEmail(user.Email, $"{Localizer["email_sub_change_email"].Value} | {Localizer["app_name"].Value}", $"Hi {user.Name},<br /><br />Thank you for updating your email. Please confirm the email by clicking this link:<br /><a href='{url}'>click here</a> to confirm your new email.<br /><br />Thank You.");
                    break;

                case EmailTypeConst.ChangePassword:
                    SendEmail(user.Email, $"{Localizer["email_sub_change_password"].Value} | {Localizer["app_name"].Value}", $"Hi {user.Name}, <br /><br />Your password for the {Localizer["app_name"].Value} account has been updated recently. Ignore this email if you have made this changes, contact {Localizer["app_name"].Value} if you have not made this changes.<br /><br />Thank You.");
                    break;

                case EmailTypeConst.AdminInvite:
                    SendEmail(user.Email, $"{Localizer["email_sub_admin_invite"].Value} | {Localizer["app_name"].Value}", $"Hi {user.Name}, <br /><br />You are invited to manage the {Localizer["app_name"].Value},  Please <a href='{url}'>click here</a> to set a password of your account.<br /><br />Thank You.");
                    break;
            }
        }
        #endregion

        private void SendEmail(string email, string subject, string body) => Messages.SendEmail(email, subject, body);
    }
}