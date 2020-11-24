using System;
using System.Net.Mail;
using System.Text.RegularExpressions;
using Webet333.api.Filters;

namespace Webet333.api.Helpers
{
    public class SystemHelpers
    {
        public DateTime ConvertToDatetime(double milliseconds)
        {
            TimeSpan time = TimeSpan.FromMilliseconds(milliseconds);
            return new DateTime(1970, 1, 1) + time;
        }

        public bool IsValidEmail(string emailaddress)
        {
            try
            {
                if (!string.IsNullOrEmpty(emailaddress))
                {
                    MailAddress m = new MailAddress(emailaddress);
                }
                return true;
            }
            catch (FormatException)
            {
                throw new ApiException("error_invalid_email", 400);
            }
        }

        public bool IsValidMobile(String strNumber)
        {
            if (!string.IsNullOrEmpty(strNumber))
            {
                Regex mobilePattern = new Regex(@"^[+]?[0-9-]*$");
                if (!mobilePattern.IsMatch(strNumber))
                    throw new ApiException("error_invalid_mobile_no", 400);
            }
            return true;
        }
    }
}
