﻿namespace Webet333.models.Response.Account
{
    public class OtpResponse
    {
        public string Message { get; set; }

        public int ErrorCode { get; set; }

        public int? OTP { get; set; }
    }
}