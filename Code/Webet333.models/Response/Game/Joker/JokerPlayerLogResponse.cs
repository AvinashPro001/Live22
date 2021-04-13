using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Webet333.models.Response.Game.Joker
{
    public class Jackpot
    {
        [JsonProperty("OCode")]
        public string OCode { get; set; }

        [JsonProperty("Username")]
        public string Username { get; set; }

        [JsonProperty("GameCode")]
        public string GameCode { get; set; }

        [JsonProperty("Description")]
        public string Description { get; set; }

        [JsonProperty("RoundID")]
        public string RoundID { get; set; }

        [JsonProperty("Amount")]
        public decimal Amount { get; set; }

        [JsonProperty("FreeAmount")]
        public decimal FreeAmount { get; set; }

        [JsonProperty("Result")]
        public decimal Result { get; set; }

        [JsonProperty("Time")]
        public DateTime Time { get; set; }

        [JsonProperty("Details")]
        public string Details { get; set; }

        [JsonProperty("AppID")]
        public string AppID { get; set; }

        [JsonProperty("CurrencyCode")]
        public string CurrencyCode { get; set; }

        [JsonProperty("Type")]
        public string Type { get; set; }

        [JsonProperty("TransactionOCode")]
        public string TransactionOCode { get; set; }
    }

    public class Game
    {
        [JsonProperty("OCode")]
        public string OCode { get; set; }

        [JsonProperty("Username")]
        public string Username { get; set; }

        [JsonProperty("GameCode")]
        public string GameCode { get; set; }

        [JsonProperty("Description")]
        public string Description { get; set; }

        [JsonProperty("RoundID")]
        public string RoundID { get; set; }

        [JsonProperty("Amount")]
        public decimal Amount { get; set; }

        [JsonProperty("FreeAmount")]
        public decimal FreeAmount { get; set; }

        [JsonProperty("Result")]
        public decimal Result { get; set; }

        [JsonProperty("Time")]
        public DateTime Time { get; set; }

        [JsonProperty("Details")]
        public string Details { get; set; }

        [JsonProperty("AppID")]
        public string AppID { get; set; }

        [JsonProperty("CurrencyCode")]
        public string CurrencyCode { get; set; }

        [JsonProperty("Type")]
        public string Type { get; set; }

        [JsonProperty("TransactionOCode")]
        public string TransactionOCode { get; set; }
    }

    public class JokerPlayerLogData
    {
        [JsonProperty("Jackpot")]
        public List<Jackpot> Jackpot { get; set; }

        [JsonProperty("Game")]
        public List<Game> Game { get; set; }
    }

    public class Game2
    {
        [JsonProperty("GameCode")]
        public string GameCode { get; set; }

        [JsonProperty("GameName")]
        public string GameName { get; set; }

        [JsonProperty("GameType")]
        public string GameType { get; set; }
    }

    public class JokerPlayerLogResponse
    {
        [JsonProperty("data")]
        public JokerPlayerLogData Data { get; set; }

        [JsonProperty("nextId")]
        public string NextId { get; set; }

        [JsonProperty("games")]
        public List<Game2> Games { get; set; }
    }
}