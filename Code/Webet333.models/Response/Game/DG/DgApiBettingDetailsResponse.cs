using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.DG
{
    public class Poker
    {
        public string banker { get; set; }
        public string player { get; set; }
    }

    public class DGResult
    {
        public string result { get; set; }
        public Poker poker { get; set; }
    }

    public class DGBetDetail
    {
        public decimal? banker { get; set; }
        public decimal? bankerW { get; set; }
    }

    public class Lists
    {
        public long id { get; set; }
        public int tableId { get; set; }
        public int shoeId { get; set; }
        public int playId { get; set; }
        public int lobbyId { get; set; }
        public int gameType { get; set; }
        public int gameId { get; set; }
        public int memberId { get; set; }
        public int parentId { get; set; }
        public string betTime { get; set; }
        public string calTime { get; set; }
        public decimal winOrLoss { get; set; }
        public decimal balanceBefore { get; set; }
        public decimal betPoints { get; set; }
        public decimal betPointsz { get; set; }
        public decimal availableBet { get; set; }
        public string userName { get; set; }
        public string result { get; set; }
        public string betDetail { get; set; }
        public string ip { get; set; }
        public string ext { get; set; }
        public int isRevocation { get; set; }
        public int currencyId { get; set; }
        public int deviceType { get; set; }
        public int roadid { get; set; }
        public int pluginid { get; set; }
    }

    public class DgApiBettingDetailsResponse
    {
        public int codeId { get; set; }
        public string token { get; set; }
        public string random { get; set; }
        public List<Lists> list { get; set; }
    }

    public class DgBettingDetailsResponse
    {
        public long id { get; set; }
        public int tableId { get; set; }
        public int shoeId { get; set; }
        public int playId { get; set; }
        public int lobbyId { get; set; }
        public int gameType { get; set; }
        public int gameId { get; set; }
        public int memberId { get; set; }
        public int parentId { get; set; }
        public DateTime betTime { get; set; }
        public DateTime calTime { get; set; }
        public decimal winOrLoss { get; set; }
        public decimal balanceBefore { get; set; }
        public decimal betPoints { get; set; }
        public decimal betPointsz { get; set; }
        public decimal availableBet { get; set; }
        public string userName { get; set; }
        public string ip { get; set; }
        public string ext { get; set; }
        public int isRevocation { get; set; }
        public int currencyId { get; set; }
        public int deviceType { get; set; }
        public int roadid { get; set; }
        public int pluginid { get; set; }
        public string result { get; set; }
        public string pokerBanker { get; set; }
        public string pokerPlayer { get; set; }
        public decimal? betDetailsBanker { get; set; }
        public decimal? betDetailsBankerW { get; set; }
    }
}
