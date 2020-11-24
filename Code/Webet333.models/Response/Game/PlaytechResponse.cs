using System.Collections.Generic;

namespace Webet333.models.Response.Game
{
    public class Result
    {
        public string PLAYERNAME { get; set; }
        public string WINDOWCODE { get; set; }
        public string GAMEID { get; set; }
        public string GAMECODE { get; set; }
        public string GAMETYPE { get; set; }
        public string GAMENAME { get; set; }
        public string SESSIONID { get; set; }
        public string CURRENCYCODE { get; set; }
        public string BET { get; set; }
        public string WIN { get; set; }
        public string PROGRESSIVEBET { get; set; }
        public string PROGRESSIVEWIN { get; set; }
        public string BALANCE { get; set; }
        public string CURRENTBET { get; set; }
        public string GAMEDATE { get; set; }
        public string LIVENETWORK { get; set; }
    }

  
    public class PlaytechResponse
    {
        public Pagination pagination { get; set; }
        public List<Result> result { get; set; }
    }
    
    public class Pagination
    {
        public int currentPage { get; set; }
        public int totalPages { get; set; }
        public int itemsPerPage { get; set; }
        public int totalCount { get; set; }
    }
}
