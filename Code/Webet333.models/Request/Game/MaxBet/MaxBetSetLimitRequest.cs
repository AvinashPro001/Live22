using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game.MaxBet
{
    public class MaxBetSetLimitRequest
    {
        [Required]
        [JsonProperty(PropertyName = "sportmin")]
        public string sportMin { get; set; }

        [Required]
        [JsonProperty(PropertyName = "sportmax")]
        public string sportMax { get; set; }

        [Required]
        [JsonProperty(PropertyName = "sportmatch")]
        public string sportMatch { get; set; }

        [Required]
        [JsonProperty(PropertyName = "othersportmin")]
        public string otherSportMin { get; set; }

        [Required]
        [JsonProperty(PropertyName = "othersportmax")]
        public string otherSportMax { get; set; }

        [Required]
        [JsonProperty(PropertyName = "othersportmatch")]
        public string otherSportMatch { get; set; }

        [Required]
        [JsonProperty(PropertyName = "othersportball")]
        public string otherSportBall { get; set; }

        [Required]
        [JsonProperty(PropertyName = "maxparleymin")]
        public string maxParleyMin { get; set; }

        [Required]
        [JsonProperty(PropertyName = "maxparleymax")]
        public string maxParleyMax { get; set; }

        [Required]
        [JsonProperty(PropertyName = "maxparleymatch")]
        public string maxParleyMatch { get; set; }

        [Required]
        [JsonProperty(PropertyName = "maxbetSportsType1Min")]
        public string MaxbetSportsType1Min { get; set; }

        [Required]
        [JsonProperty(PropertyName = "maxbetSportsType1Match")]
        public string MaxbetSportsType1Match { get; set; }

        [Required]
        [JsonProperty(PropertyName = "maxbetSportsType1Max")]
        public string MaxbetSportsType1Max { get; set; }
    }


    public class JsonStringMaxBetLimit
    {
        public string sport_type { get; set; }
        public decimal min_bet { get; set; }
        public decimal max_bet { get; set; }
        public decimal max_bet_per_match { get; set; }
        public decimal? max_bet_per_ball { get; set; }
    }
}
