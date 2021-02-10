using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.User
{
    public class WinloseReportResponse
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "promotionTitle")]
        public string PromotionTitle { get; set; }

        [JsonProperty(PropertyName ="username")]
        public string UserName { get; set; }

        [JsonProperty(PropertyName = "created")]
        public string Created { get; set; }

        [JsonProperty(PropertyName = "totalDeposit")]
        public decimal TotalDeposit { get; set; }

        [JsonProperty(PropertyName = "totalWithdraw")]
        public decimal TotalWithdraw { get; set; }

        [JsonProperty(PropertyName = "winlose")]
        public decimal WinLose { get; set; }

        [JsonProperty(PropertyName = "totalBonus")]
        public decimal TotalBonus { get; set; }
    }
}
