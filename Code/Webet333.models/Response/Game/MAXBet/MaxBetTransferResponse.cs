using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.MAXBet
{
    public  class MaxBetTransferResponse
    {
        [JsonProperty("error_code")]
        public long ErrorCode { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("Data")]
        public Data Data { get; set; }
    }

    public partial class Data
    {
        [JsonProperty("trans_id")]
        public long TransId { get; set; }

        [JsonProperty("before_amount")]
        public decimal BeforeAmount { get; set; }

        [JsonProperty("after_amount")]
        public decimal AfterAmount { get; set; }

        [JsonProperty("status")]
        public long Status { get; set; }
    }
}
