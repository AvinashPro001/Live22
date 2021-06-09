using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.Joker
{
    public class JokerGameListResponse
    {
        [JsonProperty("ListGames")]
        public List<ListGame> ListGames { get; set; }
    }

    public class ListGame
    {
        [JsonProperty("GameType")]
        public string GameType { get; set; }

        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("GameOCode")]
        public string GameOCode { get; set; }

        [JsonProperty("GameCode")]
        public string GameCode { get; set; }

        [JsonProperty("GameName")]
        public string GameName { get; set; }

        [JsonProperty("Specials")]
        public string Specials { get; set; }

        [JsonProperty("Technology")]
        public string Technology { get; set; }

        [JsonProperty("SupportedPlatForms")]
        public string SupportedPlatForms { get; set; }

        [JsonProperty("Order")]
        public int Order { get; set; }

        [JsonProperty("DefaultWidth")]
        public int DefaultWidth { get; set; }

        [JsonProperty("DefaultHeight")]
        public int DefaultHeight { get; set; }

        [JsonProperty("Image1")]
        public string Image1 { get; set; }

        [JsonProperty("Image2")]
        public string Image2 { get; set; }

        [JsonProperty("FreeSpin")]
        public bool FreeSpin { get; set; }
    }

}
