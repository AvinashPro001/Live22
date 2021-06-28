using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Webet333.models.Response.Game.SBO
{
    public class SBOBettingDetailsResponse : SBODefaultResponse
    {
        [JsonProperty("result")]
        public List<SBOBettingDetailsResponseResult> Result { get; set; }
    }

    public class SBOBettingDetailsResponseResult
    {
        [JsonProperty("subBet")]
        public dynamic SubBet { get; set; }

        [JsonProperty("sportsType")]
        public string SportsType { get; set; }

        [JsonProperty("odds")]
        public decimal Odds { get; set; }

        [JsonProperty("oddsStyle")]
        public string OddsStyle { get; set; }

        [JsonProperty("actualStake")]
        public decimal ActualStake { get; set; }

        [JsonProperty("turnover")]
        public decimal Turnover { get; set; }

        [JsonProperty("isHalfWonLose")]
        public bool IsHalfWonLose { get; set; }

        [JsonProperty("isLive")]
        public bool IsLive { get; set; }

        [JsonProperty("maxWinWithoutActualStake")]
        public decimal MaxWinWithoutActualStake { get; set; }

        [JsonProperty("ip")]
        public string Ip { get; set; }

        [JsonProperty("isSystemTagRisky")]
        public bool IsSystemTagRisky { get; set; }

        [JsonProperty("isCustomerTagRisky")]
        public bool IsCustomerTagRisky { get; set; }

        [JsonProperty("orderTime")]
        public DateTime OrderTime { get; set; }

        [JsonProperty("modifyDate")]
        public DateTime ModifyDate { get; set; }

        [JsonProperty("settleTime")]
        public DateTime SettleTime { get; set; }

        [JsonProperty("winLostDate")]
        public DateTime WinLostDate { get; set; }

        [JsonProperty("refNo")]
        public string RefNo { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }

        [JsonProperty("stake")]
        public decimal Stake { get; set; }

        [JsonProperty("winLost")]
        public decimal WinLost { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("topDownline")]
        public string TopDownline { get; set; }
    }

    //public class SubBet
    //{
    //    [JsonProperty("betOption")]
    //    public string BetOption { get; set; }

    //    [JsonProperty("marketType")]
    //    public string MarketType { get; set; }

    //    [JsonProperty("sportType")]
    //    public string SportType { get; set; }

    //    [JsonProperty("hdp")]
    //    public double Hdp { get; set; }

    //    [JsonProperty("odds")]
    //    public decimal Odds { get; set; }

    //    [JsonProperty("league")]
    //    public string League { get; set; }

    //    [JsonProperty("match")]
    //    public string Match { get; set; }

    //    [JsonProperty("status")]
    //    public string Status { get; set; }

    //    [JsonProperty("winlostDate")]
    //    public DateTime WinlostDate { get; set; }

    //    [JsonProperty("liveScore")]
    //    public string LiveScore { get; set; }

    //    [JsonProperty("htScore")]
    //    public string HtScore { get; set; }

    //    [JsonProperty("ftScore")]
    //    public string FtScore { get; set; }

    //    [JsonProperty("customeizedBetType")]
    //    public string CustomeizedBetType { get; set; }

    //    [JsonProperty("kickOffTime")]
    //    public DateTime KickOffTime { get; set; }
    //}
}