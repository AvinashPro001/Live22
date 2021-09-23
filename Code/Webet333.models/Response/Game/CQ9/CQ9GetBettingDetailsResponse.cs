using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Webet333.models.Response.Game.CQ9
{
    public class CQ9GetBettingDetailsResponse : CQ9DefaultResponse
    {
        [JsonProperty("data")]
        public CQ9GetBettingDetailsResponseData Data { get; set; }
    }

    public class CQ9GetBettingDetailsResponseData
    {
        [JsonProperty("totalsize")]
        public long Totalsize { get; set; }

        [JsonProperty("data")]
        public List<CQ9GetBettingDetailsResponseDataData> Data { get; set; }
    }

    public class CQ9GetBettingDetailsResponseDataData
    {
        [JsonProperty("gameHall")]
        public string GameHall { get; set; }

        [JsonProperty("gameType")]
        public string GameType { get; set; }

        [JsonProperty("gamePlat")]
        public string GamePlat { get; set; }

        [JsonProperty("gameCode")]
        public string GameCode { get; set; }

        [JsonProperty("account")]
        public string Account { get; set; }

        [JsonProperty("round")]
        public string Round { get; set; }

        [JsonProperty("balance")]
        public decimal Balance { get; set; }

        [JsonProperty("win")]
        public decimal Win { get; set; }

        [JsonProperty("bet")]
        public decimal Bet { get; set; }

        [JsonProperty("validBet")]
        public decimal ValidBet { get; set; }

        [JsonProperty("jackpot")]
        public decimal Jackpot { get; set; }

        [JsonProperty("jackpotContribution")]
        public dynamic JackpotContribution { get; set; }

        [JsonProperty("jackpotType")]
        public string JackpotType { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("endroundTime")]
        public DateTimeOffset EndroundTime { get; set; }

        [JsonProperty("createTime")]
        public DateTimeOffset CreateTime { get; set; }

        [JsonProperty("betTime")]
        public DateTimeOffset BetTime { get; set; }

        [JsonProperty("detail")]
        public dynamic Detail { get; set; }

        [JsonProperty("singleRowBet")]
        public bool SingleRowBet { get; set; }

        [JsonProperty("gameRole")]
        public string GameRole { get; set; }

        [JsonProperty("bankerType")]
        public string BankerType { get; set; }

        [JsonProperty("rake")]
        public decimal Rake { get; set; }

        [JsonProperty("roomFee")]
        public long RoomFee { get; set; }

        [JsonProperty("tableType")]
        public string TableType { get; set; }

        [JsonProperty("tableId")]
        public string TableId { get; set; }

        [JsonProperty("roundNumber")]
        public string RoundNumber { get; set; }

        [JsonProperty("betType")]
        public object BetType { get; set; }

        [JsonProperty("gameResult")]
        public dynamic GameResult { get; set; }
    }

    //public class Gameresult
    //{
    //    [JsonProperty("points")]
    //    public object Points { get; set; }

    //    [JsonProperty("cards")]
    //    public object Cards { get; set; }
    //}
}