using Newtonsoft.Json;

namespace Webet333.models.Response.Account
{
    public class OtpResponse
    {
        public string Message { get; set; }

        public int ErrorCode { get; set; }

        [JsonIgnore]
        public int? OTP { get; set; }
    }

    public class OTPResponseWithSMSApiResponse:OtpResponse
    {
        public string response { get; set; }
    }
}