using Webet333.models.Enums;

namespace Webet333.notify.interfaces.Email
{
    public interface IMessages
    {
        void SendEmail(string email, string subject, string body);

        void SendSms();

        void SendPush(string data, string Token, DeviceEnums Android);
    }
}