using Newtonsoft.Json;
using System;

namespace Webet333.models.Response.Game.CQ9
{
    public class CQ9DefaultResponse
    {
        [JsonProperty("status")]
        public CQ9DefaultResponseStatus Status { get; set; }
    }

    public class CQ9DefaultResponseStatus
    {
        [JsonProperty("code")]
        public string Code { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("datetime")]
        public DateTimeOffset Datetime { get; set; }

        [JsonProperty("traceCode")]
        public string TraceCode { get; set; }
    }
}