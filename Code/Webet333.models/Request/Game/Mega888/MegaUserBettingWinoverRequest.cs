using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Webet333.models.Request.Game.Mega888
{
    public class MegaUserBettingWinoverRequest
    {
        [Required]
        [JsonProperty(PropertyName = "promotionApplyId")]
        public string PromotionApplyId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "mega888Username")]
        public string Mega888Username { get; set; }

        [Required]
        [JsonProperty(PropertyName = "startTime")]
        public DateTime StartTime { get; set; }
    }
}
