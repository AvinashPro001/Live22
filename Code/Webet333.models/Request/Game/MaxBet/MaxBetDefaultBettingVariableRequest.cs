using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Game.MaxBet
{
    public class MaxBetDefaultBettingVariableRequest
    {
        [JsonProperty(PropertyName = "sportmin")]
        public string sportMin { get; set; }

        [JsonProperty(PropertyName = "sportmax")]
        public string sportMax { get; set; }

        [JsonProperty(PropertyName = "sportmatch")]
        public string sportMatch { get; set; }

        [JsonProperty(PropertyName = "othersportmin")]
        public string otherSportMin { get; set; }

        [JsonProperty(PropertyName = "othersportmax")]
        public string otherSportMax { get; set; }

        [JsonProperty(PropertyName = "othersportmatch")]
        public string otherSportMatch { get; set; }

        [JsonProperty(PropertyName = "othersportball")]
        public string otherSportBall { get; set; }

        [JsonProperty(PropertyName = "maxparleymin")]
        public string maxParleyMin { get; set; }

        [JsonProperty(PropertyName = "maxparleymax")]
        public string maxParleyMax { get; set; }

        [JsonProperty(PropertyName = "maxparleymatch")]
        public string maxParleyMatch { get; set; }

        [JsonProperty(PropertyName = "maxbetSportsType1Min")]
        public string MaxbetSportsType1Min { get; set; }

        [JsonProperty(PropertyName = "maxbetSportsType1Match")]
        public string MaxbetSportsType1Match { get; set; }

        [JsonProperty(PropertyName = "maxbetSportsType1Max")]
        public string MaxbetSportsType1Max { get; set; }
    }
}
