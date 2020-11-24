using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.Kiss918
{
    public class PlayerGameLogResult
    {
        public string BeginBlance { get; set; }
        public int ClassID { get; set; }
        public string CreateTime { get; set; }
        public string EndBlance { get; set; }
        public int GameID { get; set; }
        public string GameName { get; set; }
        public int LineNum { get; set; }
        public string LogDataStr { get; set; }
        public int LogDataType { get; set; }
        public int RoundNO { get; set; }
        public int Rownum { get; set; }
        public int TableID { get; set; }
        public string Win { get; set; }
        public string bet { get; set; }
        public int cday { get; set; }
        public int cno { get; set; }
        public int id { get; set; }
        public string uuid { get; set; }
    }

    public class Kiss918PlayerGameLogResponse
    {
        public int ViewTYPE { get; set; }
        public int code { get; set; }
        public string currMoney { get; set; }
        public string fg { get; set; }
        public int getcount { get; set; }
        public string msg { get; set; }
        public int pageindex { get; set; }
        public int pagesize { get; set; }
        public List<PlayerGameLogResult> results { get; set; }
        public bool success { get; set; }
        public int total { get; set; }
    }


}
