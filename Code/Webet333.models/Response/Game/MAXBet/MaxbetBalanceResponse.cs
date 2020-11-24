using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.MAXBet
{
    public partial class MaxbetBalanceResponse
    {
        [JsonProperty("error_code")]
        public long ErrorCode { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("Data")]
        public List<Datum> Data { get; set; }
    }

    public partial class Datum
    {
        [JsonProperty("vendor_member_id")]
        public string VendorMemberId { get; set; }

        [JsonProperty("balance")]
        public string Balance { get; set; }

        [JsonProperty("bonus_balance")]
        public string BonusBalance { get; set; }

        [JsonProperty("outstanding")]
        public string Outstanding { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }

        [JsonProperty("error_code ")]
        public long ErrorCode { get; set; }
    }
}
