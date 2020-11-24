using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.PaymentGateway
{
    public class GetUrlResponse
    {
        public string transaction { get; set; }
        public int status { get; set; }
        public string token { get; set; }
        public string redirect_to { get; set; }
        public decimal amount { get; set; }
        public string currency { get; set; }
    }
}
