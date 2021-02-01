using Newtonsoft.Json;
using System.Collections.Generic;

namespace Webet333.models.Response.Game.Mega888
{
    public class Mega888PlayerLogResponse
    {
        [JsonProperty("msg")]
        public string Msg { get; set; }

        [JsonProperty("success")]
        public bool Success { get; set; }

        [JsonProperty("ViewTYPE")]
        public int ViewTYPE { get; set; }

        [JsonProperty("results")]
        public List<Mega888PlayerLogResult> Results { get; set; }

        [JsonProperty("total")]
        public int Total { get; set; }
    }

    public class Mega888PlayerLogResult
    {
        [JsonProperty("BeginBlance")]
        public string BeginBlance { get; set; }

        [JsonProperty("ClassID")]
        public int ClassID { get; set; }

        [JsonProperty("CreateTime")]
        public string CreateTime { get; set; }

        [JsonProperty("EndBlance")]
        public string EndBlance { get; set; }

        [JsonProperty("GameID")]
        public int GameID { get; set; }

        [JsonProperty("GameName")]
        public string GameName { get; set; }

        [JsonProperty("LineNum")]
        public int LineNum { get; set; }

        [JsonProperty("LogDataStr")]
        public string LogDataStr { get; set; }

        [JsonProperty("LogDataType")]
        public int LogDataType { get; set; }

        [JsonProperty("RoundNO")]
        public int RoundNO { get; set; }

        [JsonProperty("Rownum")]
        public int Rownum { get; set; }

        [JsonProperty("TableID")]
        public int TableID { get; set; }

        [JsonProperty("Win")]
        public string Win { get; set; }

        [JsonProperty("bet")]
        public string Bet { get; set; }

        [JsonProperty("id")]
        public long Id { get; set; }
    }

}
