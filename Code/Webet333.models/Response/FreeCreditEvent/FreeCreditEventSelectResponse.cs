using Newtonsoft.Json;
using System;

namespace Webet333.models.Response
{
    public class FreeCreditEventSelectResponse
    {
        [JsonProperty("freeCreditEventId")]
        public Guid FreeCreditEventId { get; set; }

        [JsonProperty("freeCreditEventName")]
        public string FreeCreditEventName { get; set; }

        [JsonProperty("userGroupId")]
        public Guid UserGroupId { get; set; }

        [JsonProperty("userGroupName")]
        public string UserGroupName { get; set; }

        [JsonProperty("totalUsers")]
        public int TotalUsers { get; set; }

        [JsonProperty("completed")]
        public int Completed { get; set; }

        [JsonProperty("userList")]
        public dynamic UserList { get; set; }

        [JsonProperty("terms")]
        public dynamic Terms { get; set; }
    }

    public class FreeCreditEventSelectUserListResponse
    {
        [JsonProperty("userId")]
        public long UserId { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("winLossAmount")]
        public double WinLossAmount { get; set; }

        [JsonProperty("freeCredit")]
        public double FreeCredit { get; set; }
    }

    public class FreeCreditEventSelectTermsResponse
    {
        [JsonProperty("termId")]
        public Guid TermId { get; set; }

        [JsonProperty("FromAmount")]
        public decimal TermFromAmount { get; set; }

        [JsonProperty("ToAmount")]
        public decimal TermToAmount { get; set; }

        [JsonProperty("FreeCreditAmount")]
        public decimal TermFreeCreditAmount { get; set; }
    }
}