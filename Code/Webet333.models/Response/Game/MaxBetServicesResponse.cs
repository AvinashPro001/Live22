using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Webet333.models.Response.Game
{

  public partial class MaxBetServicesResponse
    {
        [JsonProperty("error_code")]
        public long ErrorCode { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("Data")]
        public Data Data { get; set; }
    }

    public class Data
    {
        [JsonProperty("last_version_key")]
        public long LastVersionKey { get; set; }

        [JsonProperty("BetDetails")]
        public List<BetDetail> BetDetails { get; set; }

        [JsonProperty("BetNumberDetails")]
        public List<BetNumberDetails> BetNumberDetails { get; set; }
    }

    public partial class BetDetail
    {
        [JsonProperty("trans_id")]
        public long TransId { get; set; }

        [JsonProperty("vendor_member_id")]
        public string VendorMemberId { get; set; }

        [JsonProperty("operator_id")]
        public string OperatorId { get; set; }

        [JsonProperty("league_id")]
        public long LeagueId { get; set; }

        [JsonProperty("match_id")]
        public long MatchId { get; set; }

        [JsonProperty("home_id")]
        public long HomeId { get; set; }

        [JsonProperty("away_id")]
        public long AwayId { get; set; }

        [JsonProperty("match_datetime")]
        public string MatchDatetime { get; set; }

        [JsonProperty("sport_type")]
        public long SportType { get; set; }

        [JsonProperty("bet_type")]
        public long BetType { get; set; }

        [JsonProperty("parlay_ref_no")]
        public long ParlayRefNo { get; set; }

        [JsonProperty("odds")]
        public double Odds { get; set; }

        [JsonProperty("stake")]
        public long Stake { get; set; }

        [JsonProperty("transaction_time")]
        public string TransactionTime { get; set; }

        [JsonProperty("ticket_status")]
        public string TicketStatus { get; set; }

        [JsonProperty("winlost_amount")]
        public long WinlostAmount { get; set; }

        [JsonProperty("after_amount")]
        public double AfterAmount { get; set; }

        [JsonProperty("currency")]
        public long Currency { get; set; }

        [JsonProperty("winlost_datetime")]
        public string WinlostDatetime { get; set; }

        [JsonProperty("odds_type")]
        public long OddsType { get; set; }

        [JsonProperty("bet_team")]
        public string BetTeam { get; set; }

        [JsonProperty("isLucky")]
        public string IsLucky { get; set; }

        [JsonProperty("home_hdp")]
        public long HomeHdp { get; set; }

        [JsonProperty("away_hdp")]
        public long AwayHdp { get; set; }

        [JsonProperty("hdp")]
        public object Hdp { get; set; }

        [JsonProperty("betfrom")]
        public string Betfrom { get; set; }

        [JsonProperty("islive")]
        public string Islive { get; set; }

        [JsonProperty("home_score")]
        public object HomeScore { get; set; }

        [JsonProperty("away_score")]
        public object AwayScore { get; set; }

        [JsonProperty("settlement_time")]
        public object SettlementTime { get; set; }

        [JsonProperty("customInfo1")]
        public string CustomInfo1 { get; set; }

        [JsonProperty("customInfo2")]
        public string CustomInfo2 { get; set; }

        [JsonProperty("customInfo3")]
        public string CustomInfo3 { get; set; }

        [JsonProperty("customInfo4")]
        public string CustomInfo4 { get; set; }

        [JsonProperty("customInfo5")]
        public string CustomInfo5 { get; set; }

        [JsonProperty("ba_status")]
        public string BaStatus { get; set; }

        [JsonProperty("version_key")]
        public long VersionKey { get; set; }

        [JsonProperty("ParlayData")]
        public object ParlayData { get; set; }

        [JsonProperty("JsonString")]
        public object JsonString { get; set; }
    }

    public partial class BetNumberDetails
    {
        [JsonProperty("trans_id")]
        public long TransId { get; set; }

        [JsonProperty("vendor_member_id")]
        public string VendorMemberId { get; set; }

        [JsonProperty("operator_id")]
        public string OperatorId { get; set; }

        [JsonProperty("match_id")]
        public long MatchId { get; set; }
       
        [JsonProperty("sport_type")]
        public long SportType { get; set; }

        [JsonProperty("bet_type")]
        public long BetType { get; set; }

        [JsonProperty("odds")]
        public double Odds { get; set; }

        [JsonProperty("stake")]
        public long Stake { get; set; }

        [JsonProperty("transaction_time")]
        public string TransactionTime { get; set; }

        [JsonProperty("ticket_status")]
        public string TicketStatus { get; set; }

        [JsonProperty("winlost_amount")]
        public long WinlostAmount { get; set; }

        [JsonProperty("after_amount")]
        public double AfterAmount { get; set; }

        [JsonProperty("currency")]
        public long Currency { get; set; }

        [JsonProperty("winlost_datetime")]
        public string WinlostDatetime { get; set; }

        [JsonProperty("odds_type")]
        public long OddsType { get; set; }

        [JsonProperty("bet_team")]
        public string BetTeam { get; set; }

        [JsonProperty("isLucky")]
        public string IsLucky { get; set; }

        [JsonProperty("betfrom")]
        public string Betfrom { get; set; }

        [JsonProperty("islive")]
        public string Islive { get; set; }

        [JsonProperty("last_ball_no")]
        public object LastBallNo { get; set; }

        [JsonProperty("customInfo1")]
        public string CustomInfo1 { get; set; }

        [JsonProperty("customInfo2")]
        public string CustomInfo2 { get; set; }

        [JsonProperty("customInfo3")]
        public string CustomInfo3 { get; set; }

        [JsonProperty("customInfo4")]
        public string CustomInfo4 { get; set; }

        [JsonProperty("customInfo5")]
        public string CustomInfo5 { get; set; }

        [JsonProperty("JsonString")]
        public object JsonString { get; set; }

    }
}
