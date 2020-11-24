using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game.MaxBet
{
    public class GameMaxBetRegisterRequest
    {
        [JsonProperty(PropertyName = "userid")]
        public string UserId { get; set; }


        [JsonProperty(PropertyName = "firstname")]
        public string Firstname { get; set; }


        [JsonProperty(PropertyName = "lastname")]
        public string Lastname { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "username")]
        public string Username { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "currency")]
        public int Currency { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "maxtransfer")]
        public decimal maxtransfer { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "mintransfer")]
        public decimal mintransfer { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "custominfo1")]
        public string Custominfo1 { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "custominfo2")]
        public string Custominfo2 { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "custominfo3")]
        public string Custominfo3 { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "custominfo4")]
        public string Custominfo4 { get; set; }

        [JsonIgnore]
        [JsonProperty(PropertyName = "custominfo5")]
        public string Custominfo5 { get; set; }
    }
}
