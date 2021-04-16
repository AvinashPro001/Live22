using Newtonsoft.Json;
using System;

namespace Webet333.models.Response
{
    public class FreeCreditEventSelectResponse
    {
        public Guid FreeCreditEventId { get; set; }

        public string FreeCreditEventName { get; set; }

        public Guid UserGroupId { get; set; }

        public string UserGroupName { get; set; }

        public int UnCompleted { get; set; }

        public int Completed { get; set; }

        public dynamic UserList { get; set; }

        public dynamic Terms { get; set; }
    }

    public class FreeCreditEventSelectUserListResponse
    {
        [JsonProperty("UserId")]
        public long UserId { get; set; }

        [JsonProperty("Username")]
        public string Username { get; set; }

        [JsonProperty("WinLossAmount")]
        public double WinLossAmount { get; set; }

        [JsonProperty("FreeCredit")]
        public double FreeCredit { get; set; }
    }

    public class FreeCreditEventSelectTermsResponse
    {
        [JsonProperty("TermId")]
        public Guid TermId { get; set; }

        [JsonProperty("TermFromAmount")]
        public decimal TermFromAmount { get; set; }

        [JsonProperty("TermToAmount")]
        public decimal TermToAmount { get; set; }

        [JsonProperty("TermFreeCreditAmount")]
        public decimal TermFreeCreditAmount { get; set; }
    }
}