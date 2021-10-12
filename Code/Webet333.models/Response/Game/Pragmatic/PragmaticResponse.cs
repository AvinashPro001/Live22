using System.Collections.Generic;

namespace Webet333.models.Response.Game.Pragmatic
{
    public class PragmaticResponse
    {
        public string error { get; set; }

        public string description { get; set; }
    }

    public class PragmaticRegisterResponse : PragmaticResponse
    {
        public int playerId { get; set; }
    }

    public class PragmaticBalanceResponse : PragmaticResponse
    {
        public decimal balance { get; set; }
    }

    public class PragmaticTransferResponse : PragmaticBalanceResponse
    {
        public string transactionId { get; set; }
    }

    public class PragmaticGameList : PragmaticResponse
    {
        public List<GameList> gameList { get; set; }
    }

    public class GameList
    {
        public string gameID { get; set; }

        public string gameName { get; set; }

        public string ImagePath { get; set; }

        public string gameTypeID { get; set; }
    }
}