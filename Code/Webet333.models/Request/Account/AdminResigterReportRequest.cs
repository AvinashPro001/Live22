using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Account
{
    public class AdminResigterReportRequest
    {
        public string FromDate { get; set; }

        public string ToDate { get; set; }

        public string OTPVerified { get; set; }
    }
}
