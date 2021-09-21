using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.User
{
    public class VIPLevelReportSelectResponse
    {
        [JsonProperty("id")]
        public Guid? Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("userName")]
        public string UserName { get; set; }

        [JsonProperty("VIPLavelName")]
        public string VipLavelName { get; set; }

        [JsonProperty("VIPLevelModified")]
        public DateTime VipLevelModified { get; set; }

        [JsonProperty("totalDepositAmount")]
        public decimal TotalDepositAmount { get; set; }

        [JsonProperty("totalDepositCount")]
        public long TotalDepositCount { get; set; }

        [JsonProperty("totalWithdrawAmount")]
        public decimal TotalWithdrawAmount { get; set; }

        [JsonProperty("totalWithdrawCount")]
        public long TotalWithdrawCount { get; set; }

        [JsonProperty("totalBonusAmount")]
        public decimal TotalBonusAmount { get; set; }

        [JsonProperty("totalWinLoseAmount")]
        public decimal TotalWinLoseAmount { get; set; }

        [JsonProperty("created")]
        public DateTime Created { get; set; }

        [JsonProperty("total")]
        public int Total { get; set; }

        [JsonProperty("offSet")]
        public int OffSet { get; set; }
    }
}