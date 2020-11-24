using Newtonsoft.Json;

namespace Webet333.models.Response.Game
{



    public class Leaguename
    {
        [JsonProperty(PropertyName = "#cdata-section")]
        public string __invalid_name_cdata_section { get; set; }
    }

    public class Homename
    {
        [JsonProperty(PropertyName = "#cdata-section")]
        public string __invalid_name__cdata_section { get; set; }
    }

    public class Awayname
    {
        [JsonProperty(PropertyName = "#cdata-section")]
        public string __invalid_name__cdata_section { get; set; }
    }

    public class M8ServicesResponse
    {
        public string fid { get; set; }
        public string id { get; set; }
        public string t { get; set; }
        public string u { get; set; }
        public string b { get; set; }
        public string w { get; set; }
        public string a { get; set; }
        public string c { get; set; }
        public string ip { get; set; }
        public string league { get; set; }
        public string home { get; set; }
        public string away { get; set; }
        public string status { get; set; }
        public string game { get; set; }
        public string odds { get; set; }
        public string side { get; set; }
        public string info { get; set; }
        public string half { get; set; }
        public string trandate { get; set; }
        public string workdate { get; set; }
        public string matchdate { get; set; }
        public string runscore { get; set; }
        public string score { get; set; }
        public string htscore { get; set; }
        public string flg { get; set; }
        public string res { get; set; }
        public string sportstype { get; set; }
        public string oddstype { get; set; }
        public string matchdatetime { get; set; }
        public string curcode { get; set; }
        public Leaguename leaguename { get; set; }
        public Homename homename { get; set; }
        public Awayname awayname { get; set; }
    }
}
